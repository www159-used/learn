---
title: "置换群"
date: 2026-08-05
category: "数学"
series: group-theory
---

设一堆文字构成集合 $\Omega$：

$$
\Omega = \{\alpha_1 \quad \alpha_2 \ldots \alpha_n\}
$$

定义置换操作为 $\sigma$。一次有序排列的置换可以写作：

$$
\sigma =
\begin{pmatrix}
\alpha_1 & \alpha_2 & \ldots & \alpha_n \\
\alpha_1^\sigma & \alpha_2^\sigma & \ldots & \alpha_n^\sigma \\
\end{pmatrix}
$$

可以简写成：

$$
\sigma = \begin{pmatrix}\alpha_i \\ \alpha_i^\sigma\end{pmatrix}
$$

为了方便表示，每次置换开始时，都对 $n$ 个元素从 1 开始标号：

$$
1 \quad 2 \quad 3 \ldots n
$$

观察得到 $n$ 元置换的个数为 $n!$，即 $n$ 元排列数。

定义 $n$ 元置换构成的集合为 $S_n$。

从集合变成群还差几样东西：

## 乘法运算

定义置换乘法。对于两个置换 $\sigma$、$\tau$，定义 $\sigma \cdot \tau$ 为两个置换的连续作用。

类似函数的连续作用，满足右结合。

### 单位元

定义 $e$ 为自身到自身的恒等置换，即不置换。

### 结合律

置换是对集合 $S$ 的映射。由集合和映射的性质，置换作用满足结合律。

---

$n$ 元恒等置换和置换乘法组成 $n$ 元对称群。

## 轮换

定义轮换：

$$
\begin{pmatrix}
1 & 2 & 3
\end{pmatrix}
$$

表示把元素 $1$ 送到 $2$，把 $2$ 送到 $3$，把 $3$ 送到 $1$：

$$
1\mapsto 2,\qquad 2\mapsto 3,\qquad 3\mapsto 1
$$

这里的 $1,2,3$ 是被置换的元素，不是位置编号。没写进括号的元素都不动。

如果一个置换只让 $m$ 个元素沿一个圈移动，其余元素固定，则称为 $m$-轮换：

- $m = 1$：恒等置换。
- $m = 2$：只对调两个元素，称为对换。

轮换的起点可以任意：

$$
\begin{pmatrix}
\alpha_1 & \alpha_2 & \ldots & \alpha_m
\end{pmatrix}
=
\begin{pmatrix}
\alpha_{i+1} & \ldots & \alpha_m & \alpha_1 & \alpha_2 & \ldots & \alpha_i
\end{pmatrix}
(i \le m)
$$

如果2个轮换的元素各不相同，则定义为两个轮换不相交

不相交的轮换可以交换

定理：
置换可以表示成不相交轮换的乘积，且形式唯一。
证明略

## 置换阶定理

置换的阶是不相交轮换阶的最小公倍数

证明:
$$

$$

## 置换奇偶性

轮换可以表示成若干个对换的乘积

>这是很显然的，(1,2,3)就是1到2，2到3，3到1。本身就可以拆成(2,3)(1,2)。但是对换不唯一。

我们定义轮换的奇偶性为$ord(\sigma)-1$的奇偶性，
由于置换的轮换表示定理，置换的奇偶性由其分解的对换个数的奇偶性确定
