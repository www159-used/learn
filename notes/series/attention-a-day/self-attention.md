---
title: "自注意力"
date: 2026-08-05

category: "LLM"
series: attention-a-day
seriesOrder: 1
---

自注意力是transformer的核心

当今主流的自注意力计算通常经历以下步骤：

1. 自然语言向量化
2. prefill
3. decode

![自注意力推理流程状态机](/assets/attention-inference-states.svg)

## 1. Token 向量化

假设输入了一串文本

```txt
我的名字是
```

首先经过分词，得到最小单元token
```
我的 名字 是
```

记三个 token 组成的序列矩阵为：

$$
T =
\begin{bmatrix}
t_0 \\
t_1 \\
t_2
\end{bmatrix}
$$

分词器会把 token 映射到词表中的整数 ID：

$$
\begin{matrix}
\text{IDs} = [314 & 926 & 72]
\end{matrix}
$$

ID 本身只是一个编号。用它从可训练的 embedding 表中查出每个 token 的向量，得到词向量矩阵 $E_{token}$：

$$
E_{token} \in \mathbb{R}^{3 \times 4}
$$

Transformer 还需要知道 token 的顺序，因此为每个位置加上位置向量 $P$：

$$
\begin{matrix}
X = E_{token} + P \\
X \in \mathbb{R}^{3 \times 4}
\end{matrix}
$$

下图给出了从文本到注意力层输入 $X$ 的完整路径：

![token 向量化](/assets/token-vectorization.svg)

其中每一行对应一个 token；后面的注意力计算图将以这个 $X$ 作为输入。

## 2. 自注意力block的工作原理

下面先建立因果自注意力的共同数学公式。prefill 和 decode 的执行方式不同，但都围绕 Q、K、V、causal mask 和加权求和展开。

上一节得到 Transformer 的输入矩阵：

$$
X \in \mathbb{R}^{3 \times 4}
$$

3 行分别对应 $T$ 中的 $t_0$、$t_1$、$t_2$，每行有 4 个特征。

首先用三组可训练参数，将整张 $X$ 并行投影为 Q、K、V：

$$
Q = XW_Q,\quad K = XW_K,\quad V = XW_V
$$

这里 $W_Q, W_K, W_V \in \mathbb{R}^{4 \times 2}$，因此：

$$
Q, K, V \in \mathbb{R}^{3 \times 2}
$$

将三个矩阵按行记为：

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
\end{bmatrix},
\quad
V =
\begin{bmatrix}
v_0 \\
v_1 \\
v_2
\end{bmatrix}
$$

其中 $q_i$、$k_i$、$v_i$ 分别是 Q、K、V 的第 $i$ 行，对应 $T$ 中的 $t_i$。

可以把它们理解为：

- Q：当前 token 想寻找什么信息。
- K：当前 token 可以提供什么索引线索。
- V：当前 token 实际携带的内容。

![self-attention KQV](/assets/self-attention-kqv.svg)

图将 $T$ 的三行注意力计算按行列出。三条行共享同一组 Q、K、V，并行执行相同的分数、遮罩、softmax 和加权求和步骤。

Q 的第 $i$ 行 $q_i$ 与全部 K 匹配，得到第 $i$ 行分数：

$$
s_i = \frac{q_iK^T}{\sqrt{d_k}}
$$

三条 $s_i$ 拼成完整的分数矩阵：

$$
S = \frac{QK^T}{\sqrt{d_k}} \in \mathbb{R}^{3 \times 3}
$$

$S_{ij}$ 表示第 $i$ 个 token 对第 $j$ 个 token 的匹配分数。

decoder 模式下，每一个token只能注意之前出现的token，因此我们为score增加一个掩码mask：

$$
\begin{matrix}
t_0: [0 & -\infty & -\infty] \\
t_1: [0 & 0 & -\infty] \\
t_2: [0 & 0 & 0]
\end{matrix}
$$

拼接成下三角 causal mask $M$。它加在分数上：允许的位置加 0，未来位置加 $-\infty$。Q、K、V 的投影已经完成；mask 在分数阶段确定每一行的可见范围。
接着通过softmax将分数归一化

$$
A = \operatorname{softmax}(S + M)
$$

softmax 逐行执行，未来位置的权重变为 0

$$
o_i = a_iV
$$

三条 $o_i$ 组成 $O \in \mathbb{R}^{3 \times 2}$，包含了每个token对上下文的自注意力

### MLP/FFN

上面的 $O = AV$ 只是注意力子层的输出，还不是完整 Transformer Block 的输出。注意力之后通常还会经过输出投影、残差连接和 MLP（Multi-Layer Perceptron，也叫 FFN）。

以常见的 pre-LN 结构为例：

$$
H_l' =
H_l +
\operatorname{Attention}(\operatorname{LN}(H_l))
$$

$$
H_{l+1} =
H_l' +
\operatorname{MLP}(\operatorname{LN}(H_l'))
$$

这里的 LN 是 LayerNorm。pre-LN 的含义是：在 Attention 和 MLP 子层之前先做归一化，再通过残差连接保留原始 hidden state：

![Pre-LN Transformer Block](/assets/pre-ln-block.svg)

LayerNorm 会对每个 token 内部的特征维度做归一化，不会混合不同 token 的信息。另一种布局是 post-LN，把 LayerNorm 放在残差连接之后；现代 LLM 通常使用 pre-LN，或使用功能相近的 RMSNorm。

MLP 的基本形式是：

$$
\operatorname{MLP}(x)
=
W_2\sigma(W_1x+b_1)+b_2
$$

它通常先把特征维度从 $d_{model}$ 扩展到 $d_{ff}$，再映射回 $d_{model}$：

$$
d_{model}\rightarrow d_{ff}\rightarrow d_{model}
$$

MLP 对每个 token 独立计算，使用同一组参数，不直接混合不同 token 的信息。Attention 负责 token 之间的信息交流，MLP 负责加工每个 token 自身的特征。现代 LLM 也常使用 SwiGLU 等门控 MLP，但仍属于 FFN 子层。

在当前的简化例子中，$O \in \mathbb{R}^{3 \times 2}$；完整的多头注意力通常先通过输出投影 $W_O$ 映射回 $d_{model}$，再进入残差连接和 MLP。经过多层 Transformer Block 后，最后一层的 hidden state 才会交给 LM Head。

## 3. prefill

上面的完整矩阵计算就是 prefill 阶段的执行方式。模型第一次接收一整段 prompt 时：

1. 一次性得到所有 token 的 $X$，并并行投影出完整的 $Q$、$K$、$V$。
2. 通过 $QK^T$ 一次性计算所有 token 两两之间的匹配分数。
3. 使用下三角 causal mask，保证第 $i$ 个 token 只能使用 $k_0,\ldots,k_i$ 和 $v_0,\ldots,v_i$。
4. 每个注意力输出经过 MLP，得到下一层的 hidden state；重复多层后，得到整段 prompt 的最终表示。

## 4. decode

### LM Head

经过最后一层 Transformer Block 后，当前位置得到一个 hidden state：

$$
h_t \in \mathbb{R}^{d_{model}}
$$

LM Head 通常是一个线性投影，把 hidden state 映射到整个词表：

$$
z_t = h_tW_{lm}+b
$$

其中：

$$
W_{lm}\in\mathbb{R}^{d_{model}\times |V|},
\quad
z_t\in\mathbb{R}^{|V|}
$$

$|V|$ 是词表大小，$z_t$ 中的每个分量称为一个 logit，表示对应 token 的未归一化分数。经过 softmax 后得到概率分布：

$$
p_t=\operatorname{softmax}(z_t)
$$

然后通过贪心选择或采样策略得到下一个 token ID：

$$
\operatorname{id}_{t+1}=\operatorname{Select}(p_t)
$$

这个 token ID 有两条用途：

- 作为文本输出的一部分，通过 tokenizer 转换成人类可读的文本；
- 查 embedding 表，作为下一轮 decode 的输入。

如果选出的 ID 对应特殊 token $\text{<EOF>}$，生成过程停止。LM Head 不是 Attention Head；有些模型会让 LM Head 和输入 Embedding 共享权重，但这不是必须的。

---

prefill 完成后，prompt 中最后一个位置的输出经过 LM Head，得到下一个 token 的概率分布。模型选择概率最高的 token，或按照采样策略选出第一个输出 token；如果它是 $\text{<EOF>}$，生成过程立即停止。

否则，这个 token 作为当前 token，进入逐 token 的 decode 循环。每一轮只处理一个当前 token：

1. 将当前 token 向量化，得到当前层的 $x_t$。
2. 在每一层中计算当前 token 的 $q_t$、$k_t$、$v_t$，并完成 Attention。
3. 将 $k_t$、$v_t$ 追加到 KV Cache，当前 $q_t$ 查询 prompt 和之前生成 token 的 K/V：

$$
o_t =
\operatorname{softmax}
\left(
\frac{q_tK_{\leq t}^{T}}{\sqrt{d_k}}
\right)
V_{\leq t}
$$

其中 $K_{\leq t}$ 和 $V_{\leq t}$ 包含 prompt 以及已经生成的 token。历史 Q 不需要缓存，因为它们对应的输出已经计算完成。

当前层的注意力输出还要经过 MLP 和残差连接，得到下一层的 hidden state。只有经过所有 Transformer 层后，当前 token 的最终 hidden state 才会送入 LM Head。

当前 token 经过所有 Transformer 层后，再通过 LM Head 得到下一个 token：

- 如果下一个 token 是 $\text{<EOF>}$，生成过程停止；
- 否则把它作为下一轮 decode 的输入，继续循环。

因此，decode 阶段不再对整段序列重新计算完整的 $QK^T$，而是使用当前的 $q_t$ 查询不断增长的 KV Cache。因果约束也由 Cache 中只包含当前及历史 token 这一范围保证。

## 5. 总结
