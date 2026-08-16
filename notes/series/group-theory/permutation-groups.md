---
title: "置换群"
date: 2026-08-05
category: "数学"
series: group-theory
seriesOrder: 2
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

为将 1 放到 2，将 2 放到 3，将 3 放到 1。

如果 $n$ 元置换中只有连续 $m$ 个元素发生轮换，则称为 $m$-轮换：

- $m = 1$：恒等置换。
- $m = 2$：只交换两个元素的位置，定义为对换。

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

>这是很显然的，(1,2,3)就是1到2，2到3。本身就可以拆成(1,2)(2,3)。但是对换不唯一。我可以插入对偶对换(1,2)(2,3)(3,2)(2,3)。或者表示成其他的对换(1,3)(1,2)

我们定义轮换的奇偶性为$ord(\sigma)-1$的奇偶性，
由于置换的轮换表示定理，置换的奇偶性由其分解的对换个数的奇偶性确定


