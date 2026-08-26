---
title: "群和交换群"
date: 2026-08-05
category: "数学"
series: group-theory
---

群论从入门到放弃。

通过简单入门来打破幻想。

顺着[有限群论基础](/pdfs/有限群论基础.pdf)，结合[近世代数](/pdfs/moderna.pdf)。

## 什么是群

设 $G$ 为非空集合，$\cdot$ 为集合运算。

满足以下性质则是群：

0. 群的基本定义
$$
\forall a, b \in G \\
a \cdot b \in G
$$

1. 结合律

   $$
   \forall a, b, c \in G \\
   (a \cdot b) \cdot c = a \cdot (b \cdot c)
   $$

2. 存在单位元
   
   $$
   \forall a \in G, \exists e \\
   a \cdot e = e \cdot a = a
   $$

3. 存在逆元

   定义逆元$a^{-1}$：

   $$
   \forall a \in G, \exists a^{-1} \\
   a^{-1} \cdot a = a \cdot a^{-1} = e
   $$

特殊地，若还满足交换律，则称为阿贝尔群或交换群：

$$
\forall a, b \in G \\
a \cdot b = b \cdot a
$$

## 幂

为了方便书写，将 $n$ 个元素 $a$ 连续运算表示为 $a^n$。

约定 $a^0 = e$，$a^{-n} = (a^{-1})^n$。

由结合律可知，群的幂满足指数运算：

$$
\forall a \in G \\
a^n \cdot a^m = a^{n + m} \\
(a^n)^m = a^{nm}
$$

## 阶

若群 $G$ 中元素个数有限，则称元素个数为群 $G$ 的阶。

若群 $G$ 存在正整数 $k$，满足 $a^k = e$，则 $a$ 被称为有限阶元素，否则称为无限阶元素。

若存在最小的 $k$ 使得 $a^k = e$，定义$k$为元素$a$的阶

假设$a$的阶为$k$：

$$
a^l = e \iff k \mid l \\
a^l = a^m \iff k \mid (l - m)
$$

对于无限阶元素：

$$
a^l = a^m \iff l = m
$$

若群 $G$ 所有元素都是有限阶元素，则称为周期群。
