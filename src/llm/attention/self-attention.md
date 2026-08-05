# 自注意力

自注意力是transformer的核心

前置知识：
- token
- 词向量


## decoder单头注意力计算
训练从推理开始

这里仅讲解decoder，decoder是现在llm的主流。endec注重翻译领域

{{#drawio path="src/llm/attention/assets/self-attention-kqv.drawio" page=0}}

假设输入了一串token $T$
$$
\begin{matrix}
T = [t_1 & t_2 & \ldots &t_n]
\end{matrix}
$$

transformer为每个位置的token，计算之前每个token的注意力分数

$$

$$

## ref
1. []
