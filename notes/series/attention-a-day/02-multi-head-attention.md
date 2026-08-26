---
title: "多头注意力"
date: 2026-08-23

category: "LLM"
series: attention-a-day
---

实际 Transformer 很少只用一套 Q、K、V，而是使用多头，并行计算多次注意力，再拼接成完整的自注意力矩阵


## 1. 多头注意力的原理

单头只有一套匹配方式。三个 token 的关系可能同时包含：

- 语法：谁修饰谁
- 指代：代词指向哪个名词
- 位置：谁离当前 token 更近

单头自注意力 $W_Q,W_K,W_V$ 很难同时学好这些关系。多头把 $d_{model}$ 拆成若干个子空间，每个头各自投影、各自打分、各自加权；最后再拼回去。


## 2. 多头注意力计算
假设输入的矩阵：

$$
X \in \mathbb{R}^{3 \times 4}
$$

三个 token，每个 $d_{model}=4$。取 $h=2$ 个头，每个头的宽度：

$$
d_k = d_{model}/h = 2
$$

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

两个头并行算出：

$$
O_1,O_2 \in \mathbb{R}^{3 \times 2}
$$

多个头的输出沿特征维拼接：

$$
\operatorname{Concat}(O_1,O_2)
=
\begin{bmatrix}
O_1 & | & O_2
\end{bmatrix}
\in \mathbb{R}^{3 \times 4}
$$

再乘输出投影，把多个子空间混合成全局信息：

$$
O = \operatorname{Concat}(O_1,O_2)\,W_O,
\quad
W_O \in \mathbb{R}^{4 \times 4}
$$

![多头注意力](/assets/multi-head-attention.svg)

完整写法：

$$
\operatorname{MHA}(X)
=
\operatorname{Concat}(\operatorname{head}_1,\ldots,\operatorname{head}_h)\,W_O
$$

## 4. MHA、MQA、GQA

为了降低复杂度，工程上多头还可以让若干个 Query 头共享同一组 K/V：

| 名称 | Query 头 | Key/Value 组 | 典型用途 |
|---|---|---|---|
| MHA | $h$ | $h$ | 原始 Transformer |
| GQA | $h$ | $g$，且 $1<g<h$ | 多数现代 LLM |
| MQA | $h$ | $1$ | 进一步压缩 KV Cache |