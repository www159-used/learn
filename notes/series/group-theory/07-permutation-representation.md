---
title: "群的置换表示"
date: 2026-08-28
category: "数学"
series: group-theory
---

任何群都和一个置换群同构。

## 右正则表示

设$G = \{e, a_1 \cdots a_n\}$

取$a_i\in G$，依次右乘$G$中的元素

$
\begin{aligned}
&e \quad &a_1 \quad &\cdots \quad &a_n \\
&a_i \quad  &a_1a_i \quad &\cdots \quad &a_na_i
\end{aligned}
$

右乘得到的元素互不相通且都是$G$的元素

所以这是一个置换，简写：

$
a \\
aa_i
$

记作$\sigma_i$

显然$e$作用后的置换是恒等置换

将$n$个元素分别作用，得到一个置换群

$R_G = \{\sigma_1, \cdots \sigma_n\}$

$R_G \cong G$

证明：

设$a_i^{\varphi} = \sigma_i$

$(a_ia_j)^{\varphi}$可以表示成置换

$
a \\
aa_ia_j
$

和$\sigma_i\sigma_j$

$
\begin{aligned}
&a \\
&aa_i
\end{aligned}
\cdot
\begin{aligned}
&a \\
&aa_j \\
\end{aligned}
$

相等

所以同构

### caylay定理

n阶群都和一个n元置换群同构

## 左正则表示

类比右正则，左正则的一个置换$\sigma_i$为

$
a \\
a_i^{-1}a
$

同样的，左正则群$L_G\cong G$

证明：

$(a_ia_j)^{\varphi}$可以表示成置换

$
a \\
a_j^{-1}a_i^{-1}a
$

和$\sigma_i\sigma_j$

$
\begin{aligned}
&a \\
&a_i^{-1}a
\end{aligned}
\cdot
\begin{aligned}
&a \\
&a_j^{-1}a \\
\end{aligned}
$

相等

所以同构

## 陪集置换表示

如果群的元素比较多，如果每个元素算一个n元置换，我们可能表示成置换会比较复杂。而且$n!$远大于$n$

可以考虑使用对子群的陪集分解的位置交换来简化，简化成$r$元置换

$S_{GH} \cong G$