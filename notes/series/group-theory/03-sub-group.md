---
title: "子群"
date: 2026-08-05
category: "数学"
series: group-theory
---
## 子群

如果$G$的子集$H$满足对于$G$的运算构成一个群，则$H$为$G$的子群

## 子群的判定

$$
\forall a, b \in H \implies \\
ab^{-1} \in H
$$

对于有限子群

$$
\forall a, b \in H \implies \\
ab \in H
$$

## 例题
$$
G是一个群，则对于Z(G) \\
Z(G) = \{a \mid ax = xa \quad x\in G\} \\
则Z(G) \le G \\

证明: \\
设\exists a, b \in Z(G) \\
就要证明ab^{-1}x = xab^{-1} 恒成立 \\
ab^{-1}x = axb^{-1}=(ax)b^{-1}=(xa)b^{-1}=xab^{-1} \\
恒成立
$$
