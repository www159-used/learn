---
title: "旋转位置编码 RoPE"
date: 2026-08-24

category: "LLM"
series: attention-a-day
seriesOrder: 3
---

todo: 审稿

第 1 章把位置信息写成绝对位置向量，加在 embedding 上：

$$
X = E_{\text{token}} + P
$$

现代 LLM（包括 nanochat）通常**不再**这样加 $P$。位置改在投影出 $Q$、$K$ 之后、打分之前，用**旋转**写进每个头的特征里。这就是 RoPE（Rotary Position Embedding）。

$V$ 一般不旋转：内容向量本身不必带位置相位；相对位置只需要影响「谁和谁匹配」的分数。

## 1. 为什么要换掉绝对位置

绝对位置 $P$ 有两个别扭处：

1. **外推差**：训练最长看到长度 $L$，推理到 $L+1$ 时，$P_{L}$ 从未出现过。
2. **相对关系间接**：注意力真正关心的往往是「两个 token 相距多远」，而不是「各自绝对编号是几」。$E+P$ 把绝对编号写进 $X$，模型要自己学出相对差。

RoPE 的目标：让第 $m$ 个 query 与第 $n$ 个 key 的点积，主要依赖相对位移 $m-n$，而不是绝对坐标本身。

## 2. 二维上的旋转

先看最简单的头宽：$d_k=2$。把一个向量看成平面上的点 $(x_1,x_2)$。位置 $t$ 对应角度 $\theta_t$，旋转矩阵：

$$
R_t
=
\begin{bmatrix}
\cos\theta_t & -\sin\theta_t \\
\sin\theta_t & \cos\theta_t
\end{bmatrix}
$$

（教材写法；nanochat 实现里旋转方向取了转置约定，只影响符号，相对点积性质不变。）

对 query / key：

$$
\tilde{q}_t = R_t\, q_t,\qquad
\tilde{k}_t = R_t\, k_t
$$

位置 $m$ 与 $n$ 的匹配分数：

$$
\tilde{q}_m^{\mathsf{T}}\tilde{k}_n
=
q_m^{\mathsf{T}}
\bigl(R_m^{\mathsf{T}} R_n\bigr)
k_n
=
q_m^{\mathsf{T}}
R_{n-m}\,
k_n
$$

括号里只剩相对位移 $n-m$。这就是 RoPE 的核心几何事实：**先各自按绝对位置旋转，点积自动变成相对位置的函数。**

## 3. 更高维：两两一组

实际 $d_k$ 往往是 64、128。RoPE 把最后一维拆成 $d_k/2$ 个二维平面，第 $i$ 对用自己的频率 $\theta^{(i)}$：

$$
\theta^{(i)} = t \cdot \omega_i,\qquad
\omega_i = \mathrm{base}^{-2i/d_k}
$$

nanochat 默认 $\mathrm{base}=100000$，并预计算整段序列的 $\cos,\sin$ 缓存。对每个位置 $t$，把头向量切成前后两半 $x_1,x_2$，再按对旋转：

$$
\begin{aligned}
y_1 &= x_1\cos\theta + x_2\sin\theta \\
y_2 &= -x_1\sin\theta + x_2\cos\theta
\end{aligned}
$$

拼回 $\tilde{x}=[y_1;y_2]$。不同频率对负责不同尺度的相对距离：高频对近邻敏感，低频对更远的间隔仍有区分度。

## 4. 放回注意力公式

多头里，每个头各自对 $Q_i$、$K_i$ 做 RoPE，再打分：

$$
\operatorname{head}_i
=
\operatorname{softmax}
\left(
\frac{\tilde{Q}_i\tilde{K}_i^{\mathsf{T}}}{\sqrt{d_k}}+M
\right)
V_i
$$

因果 mask $M$、softmax、对 $V$ 的加权都不变。变的只是：$Q$、$K$ 在进 $QK^{\mathsf{T}}$ 之前先按位置旋转。

对照第 1 章的数据流：

| 步骤 | 绝对位置（第 1 章） | RoPE |
|---|---|---|
| embedding | $X=E+P$ | $X=E$（可再加 Norm） |
| 投影 | $Q,K,V=XW$ | 相同 |
| 位置注入 | 已在 $X$ 里 | 旋转 $Q$、$K$ |
| 打分 | $QK^{\mathsf{T}}/\sqrt{d_k}$ | $\tilde{Q}\tilde{K}^{\mathsf{T}}/\sqrt{d_k}$ |

## 5. Prefill 与 Decode

Prefill：序列位置是 $0,1,\ldots,T-1$。每个位置用对应的 $\cos_t,\sin_t$ 旋转自己的 $q_t$、$k_t$。整段并行，和算完整 $QK^{\mathsf{T}}$ 一样。

Decode：第 $t$ 步只来一个新 token。要注意两件事：

1. **旋转用的是绝对下标 $t$**，不是「本步是第几个新 token」。KV Cache 里旧的 $k$ 在写入时已经按当时的位置旋好转好了，不必重算。
2. nanochat 里用缓存偏移取 RoPE 切片：若当前 cache 长度为 $T_0$，本步长度 $T$，则取

$$
\cos[:,\,T_0:T_0+T],\quad
\sin[:,\,T_0:T_0+T]
$$

这样 decode 单 token 时用的是位置 $T_0$ 的旋转，与训练时「第 $T_0$ 个位置」一致。

历史 $Q$ 仍然不缓存；历史 $K$ 已是 $\tilde{k}$，当前 $\tilde{q}_t$ 直接与缓存中的 $\tilde{K}_{\le t}$ 打分即可。

## 6. 和 nanochat 的对应

阅读 `nanochat/gpt.py` 时可按这条线对齐：

1. `_precompute_rotary_embeddings`：按 `base` 与 `head_dim` 生成整段 $\cos/\sin$。
2. `forward`：训练从 $0$ 切开；有 KV Cache 时用 `kv_cache.get_pos()` 做 $T_0$ 偏移。
3. `apply_rotary_emb`：把每个头的最后一维对半切开再旋转。
4. 随后才是 QK Norm、Flash Attention。

实验笔记里试过 Partial RoPE（只旋转部分维度）等变体，默认路径仍是整头旋转。细节以代码为准，概念上记住：**位置在 Q/K 上旋转，不在 embedding 上相加。**

## 7. 小结

- RoPE 用旋转把位置写进 $Q$、$K$，使点积依赖相对位移。
- $V$ 通常不旋转；causal mask 与多头结构不变。
- Prefill 按 $0\ldots T-1$ 旋转；Decode 按全局位置 $t$ 旋转，缓存中的 $K$ 已是旋转后的结果。

下一章把多头末尾提到的 GQA 展开：Query 头多于 KV 组时，公式与 KV Cache 形状怎么变。
