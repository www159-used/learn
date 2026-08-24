---
title: "多头注意力"
date: 2026-08-23

category: "LLM"
series: attention-a-day
seriesOrder: 2
---

上一章用单头把因果自注意力讲完了。实际 Transformer 很少只用一套 Q、K、V，而是使用多头，并行计算多次注意力，再拼接成自注意力的结果

假设输入的矩阵：

$$
X \in \mathbb{R}^{3 \times 4}
$$

三个 token，每个 $d_{model}=4$。取 $h=2$ 个头，每个头的宽度：

$$
d_k = d_{model}/h = 2
$$

## 1. 多头注意力的原理

单头只有一套匹配方式。三个 token 的关系可能同时包含：

- 语法：谁修饰谁
- 指代：代词指向哪个名词
- 位置：谁离当前 token 更近

一套 $W_Q,W_K,W_V$ 很难同时学好这些关系。多头把 $d_{model}$ 拆成若干个子空间，每个头各自投影、各自打分、各自加权；最后再拼回去。

每个头分别计算自注意力：

$$
\operatorname{head}_i
=
\operatorname{softmax}
\left(
\frac{Q_iK_i^T}{\sqrt{d_k}}+M
\right)
V_i
$$

## 2. 投影计算

第 $i$ 个头有自己的三组参数：

$$
Q_i = XW_Q^i,\quad
K_i = XW_K^i,\quad
V_i = XW_V^i
$$

$$
W_Q^i,W_K^i,W_V^i \in \mathbb{R}^{4 \times 2}
$$

因此每个头得到：

$$
Q_i,K_i,V_i \in \mathbb{R}^{3 \times 2}
$$

实现上常常先用更大的矩阵一次投影，再按头切开：

$$
Q = XW_Q \in \mathbb{R}^{3 \times 4}
\quad
\rightarrow
\quad
Q_1,Q_2 \in \mathbb{R}^{3 \times 2}
$$

数学上等价于每个头各乘一组 $W_Q^i$。

两个头并行算出：

$$
O_1,O_2 \in \mathbb{R}^{3 \times 2}
$$

## 3. 拼接与输出投影

多个头的输出沿特征维拼接：

$$
\operatorname{Concat}(O_1,O_2)
=
\begin{bmatrix}
O_1 & | & O_2
\end{bmatrix}
\in \mathbb{R}^{3 \times 4}
$$

再乘输出投影，把多个子空间混回 $d_{model}$：

$$
O = \operatorname{Concat}(O_1,O_2)\,W_O,
\quad
W_O \in \mathbb{R}^{4 \times 4}
$$

上一章单头例子里，$O\in\mathbb{R}^{3\times 2}$，进入残差前还缺一步回到 $d_{model}$。多头拼接后宽度已经是 4，再经 $W_O$ 得到：

$$
O \in \mathbb{R}^{3 \times 4}
$$

之后才是残差、LayerNorm 和 MLP。$W_O$ 属于注意力子层，不属于 MLP。

![多头注意力](/assets/multi-head-attention.svg)

完整写法：

$$
\operatorname{MHA}(X)
=
\operatorname{Concat}(\operatorname{head}_1,\ldots,\operatorname{head}_h)\,W_O
$$

## 4. 维度对照

| 量 | 形状 | 含义 |
|---|---|---|
| $X$ | $3\times 4$ | 3 个 token，$d_{model}=4$ |
| 每个头的 $Q_i,K_i,V_i$ | $3\times 2$ | 行仍对齐 token，列是头内宽度 |
| 每个头的 $O_i$ | $3\times 2$ | 单头注意力输出 |
| $\operatorname{Concat}$ | $3\times 4$ | 两个头沿特征维拼回 |
| $W_O$ | $4\times 4$ | 把各头结果混成一层输出 |
| $O$ | $3\times 4$ | 注意力子层输出，可与 $X$ 做残差 |

约束只有三条：

1. 同一个头里，Q 与 K 的列数必须相同，才能打分。
2. 各头 $O_i$ 的列数加起来，通常等于 $d_{model}$，这样拼接后能直接接 $W_O$ 和残差。
3. $d_k$ 不必等于 $d_{model}$；多头时常见取 $d_k=d_{model}/h$。

## 5. Prefill 与 Decode

Prefill 和 Decode 的执行方式与上一章相同，只是每一层变成 $h$ 套并行计算：

- Prefill：每个头对整段 prompt 并行算出 $Q_i,K_i,V_i$，各自加 causal mask，再拼接、$W_O$。
- Decode：每个头只算当前 token 的 $q_t^i,k_t^i,v_t^i$，把 $k_t^i,v_t^i$ 追加到**该头自己的** KV Cache。
- 历史 Q 仍然不缓存。
- MLP 仍然逐 token 独立计算，不读 KV Cache。

因此，标准 MHA 的 KV Cache 大约是单头的 $h$ 倍。后续的 MQA、GQA 就是在减这一项。

## 6. MHA、MQA、GQA

多头还可以让若干个 Query 头共享同一组 K/V：

| 名称 | Query 头 | Key/Value 组 | 典型用途 |
|---|---|---|---|
| MHA | $h$ | $h$ | 原始 Transformer |
| GQA | $h$ | $g$，且 $1<g<h$ | 多数现代 LLM |
| MQA | $h$ | $1$ | 进一步压缩 KV Cache |

Query 头数不变，模型仍能从多个角度提问；共享 K/V 后，Decode 时要缓存的历史状态变少。注意力公式本身不变，变的是 K/V 是否按头独立存储。
