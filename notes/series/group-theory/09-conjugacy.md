---
title: "共轭子群和共轭元素"
date: 2026-09-01
category: "数学"
series: group-theory
---

第7章提到陪集置换表示不一定同构，

根据第8章的同构核定理，来研究陪集置换表示同构的条件

## 共轭子群

设陪集置换映射：
$$
\varphi \mapsto \begin{pmatrix}Hx_i\\ Hx_ia\end{pmatrix}
$$

首先构造同态象的单位元

设所有满足同态象为单位元的元素$a$

即$a$是$w_e$的逆象

$a = \omega_e^{\varphi^{-1}}$

a对所有陪集都是恒等置换

$a^{\varphi} = \omega_e = 
\begin{pmatrix}
Hx_i \\ Hx_ia
\end{pmatrix}
, i = 1, 2, \cdots r
$

$Hx_i = Hx_ia$

$H = Hx_iax_i^{-1}, i = 1, 2, \cdots r$

由陪集的性质：

$x_iax_i^{-1} \in H, i = 1, 2, \cdots r$

设$x_i a x_i^{-1} = h_i \in H, i = 1, 2, \cdots r$

$a = x_i^{-1}h_ix_i \in x_i^{-1}Hx_i, i = 1, 2, \cdots r$

由同态核的定义得：

$K = \bigcap_{i=1}^r x_i^{-1}Hx_i$

若同构，则$K = \{e\}$

## 