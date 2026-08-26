---
title: "旋转位置编码 RoPE"
date: 2026-08-24

category: "LLM"
series: attention-a-day
---



$$
S = \frac{QK^{\mathsf{T}}}{\sqrt{d_k}}
$$

位置信息编码在 embedding 里：$X = E + P$。记录了绝对信息

绝对位置编码的不足：

1. 训练和推理的长度不一样，token的绝对位置也不一样，外推性差
2. 

相对位置编码`RoPE`不修改embedding，而是通过旋转KQ：

$$
S = \frac{\tilde{Q}\tilde{K}^{\mathsf{T}}}{\sqrt{d_k}}
$$

## 1. 计算RoPE

假设输入（不带绝对位置信息）：

$$
X = E \in \mathbb{R}^{3 \times 4}
$$

计算kqv：

$$
Q = XW_Q,\quad K = XW_K,\quad V = XW_V
$$

$$
Q, K, V \in \mathbb{R}^{3 \times 2}
$$

得到：

$$
Q =
\begin{bmatrix}
q_0 \\
q_1 \\
q_2
\end{bmatrix},
\quad
K =
\begin{bmatrix}
k_0 \\
k_1 \\
k_2
\end{bmatrix}
$$

每个向量都是平面上的一个点。位置 $t$ 对应角度 $\theta_t = t\cdot\omega$，用旋转矩阵把它转过去：

$$
R_t
=
\begin{bmatrix}
\cos\theta_t & -\sin\theta_t \\
\sin\theta_t & \cos\theta_t
\end{bmatrix}
$$

$$
\tilde{q}_t = R_t\, q_t,\qquad
\tilde{k}_t = R_t\, k_t
$$

三个位置分别转：

$$
\tilde{q}_0 = R_0 q_0,\quad
\tilde{q}_1 = R_1 q_1,\quad
\tilde{q}_2 = R_2 q_2
$$

$K$ 同样操作。$V$ 不旋转。

然后照常打分：

$$
S = \frac{\tilde{Q}\tilde{K}^{\mathsf{T}}}{\sqrt{d_k}},
\quad
A = \operatorname{softmax}(S + M),
\quad
O = AV
$$

多头时每个头各自转自己的 $Q_i$、$K_i$，再代入第 2 章的 $\operatorname{head}_i$。

$q_m$ 转了 $m\omega$，$k_n$ 转了 $n\omega$。两点积里两个旋转合成一次，转角只剩 $(n-m)\omega$。

## 2. 头宽不是 2 的时候

实际 $d_k$ 常常是 64、128。不能整段当作一个平面，就把最后一维拆成 $d_k/2$ 对，每一对按上面的二维方式转，各用一个频率：

$$
\omega_i = \mathrm{base}^{-2i/d_k}
$$

高频对近邻敏感，低频对更远的间隔仍有区分度。计算步骤不变：先投影，再按对旋转 $Q$、$K$，再打分。

## 3. Prefill 与 Decode

公式与第 1 章相同，只是 $Q$、$K$ 先转再进 $QK^{\mathsf{T}}$。

Prefill 三个 token 用 $R_0,R_1,R_2$，一次转完再算整张 $S$。

Decode 第 $t$ 步只来一个新 token，旋转用全局下标 $t$。prompt 长度为 3 时，第一个生成 token 用 $R_3$，不是 $R_0$。写入 KV Cache 的 $k$ 已经转过，不必重算；当前 $\tilde{q}_t$ 直接和缓存里的 $\tilde{K}_{\le t}$ 打分。

## 4. 小结

- 位置从「加在 $X$ 上」改成「旋转 $Q$、$K$」。
- $V$ 和 mask 不变。
- 点积依赖相对间隔 $m-n$。
- Decode 按全局位置旋转；缓存中的 $K$ 已是旋转后的结果。

下一章把多头末尾提到的 GQA 展开：Query 头多于 KV 组时，公式与 KV Cache 形状怎么变。
