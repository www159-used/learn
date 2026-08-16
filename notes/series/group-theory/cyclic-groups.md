---
title: "循环群"
date: 2026-08-14
category: "数学"
series: group-theory
seriesOrder: 4
---

## 循环群的定义

设 $G$ 是一个群，$a \in G$。

由元素 $a$ 的所有整数次幂组成的集合记为：

$$
\langle a \rangle = \{a^n \mid n \in \mathbb{Z}\}
$$

如果群 $G$ 中的每个元素都可以写成 $a$ 的整数次幂：

$$
G = \langle a \rangle
$$

则称 $G$ 为循环群，称 $a$ 为 $G$ 的一个生成元。

这里约定：

$$
a^0 = e,\qquad a^{-n} = (a^{-1})^n
$$

## 定理：生成的集合是子群

集合 $\langle a \rangle$ 本身是 $G$ 的子群。

任取 $a^m, a^n \in \langle a \rangle$：

$$
a^m(a^n)^{-1}
= a^m a^{-n}
= a^{m-n}
\in \langle a \rangle
$$

根据子群判定法：

$$ƒ
\langle a \rangle \le G
$$

## 定理：循环群一定是交换群

设 $x,y \in \langle a \rangle$，则存在 $m,n \in \mathbb{Z}$，使得：

$$
x = a^m,\qquad y = a^n
$$

于是：

$$
xy = a^m a^n = a^{m+n}
$$

而：

$$
yx = a^n a^m = a^{n+m}
$$

因为整数加法满足交换律，所以：

$$
xy = yx
$$

因此循环群一定是交换群。

## 有限循环群和无限循环群

如果存在正整数 $r$，使得：

$$
a^r = e
$$

则 $a$ 是有限阶元素。设 $a$ 的阶为 $r$，那么：

$$
\langle a \rangle
= \{e,a,a^2,\ldots,a^{r-1}\}
$$

并且：

$$
|\langle a \rangle| = r
$$

如果不存在这样的正整数，则称 $a$ 为无限阶元素，此时：

$$
\langle a \rangle
= \{\ldots,a^{-2},a^{-1},e,a,a^2,\ldots\}
$$



## 有限阶循环群性质
设 $a$ 的阶为 $r$。对于任意整数 $m,n$：

$$
a^m = a^n \iff r \mid (m-n)
$$

因此，有限循环群中的幂只需要考虑指数对 $r$ 取模后的结果。

例如，在 $\langle a\rangle$ 中：

$$
a^{r+3} = a^3
$$
设 $a$ 的阶为 $r$。对于任意整数 $m,n$：

$$
a^m = a^n \iff r \mid (m-n)
$$

因此，有限循环群中的幂只需要考虑指数对 $r$ 取模后的结果。

例如，在 $\langle a\rangle$ 中：

$$
a^{r+3} = a^3
$$

设 $G = \langle a\rangle$，且 $|G|=r$。

元素 $a^k$ 也是生成元，当且仅当：

$$
\gcd(k,r)=1
$$


证明如下。元素 $a^k$ 生成的子群为：

$$
\langle a^k\rangle
= \{a^{km}\mid m\in\mathbb{Z}\}
$$

由于 $a^k\in\langle a\rangle$，总有：

$$
\langle a^k\rangle\subseteq\langle a\rangle
$$

因此，$a^k$ 是 $\langle a\rangle$ 的生成元，当且仅当 $a$ 能够表示成
$a^k$ 的某个整数次幂。也就是：

$$
a^k\text{ 是生成元}
\iff
\exists m\in\mathbb{Z},\ (a^k)^m=a
$$

进一步：

$$
(a^k)^m=a
\iff
a^{km}=a
\iff
km \equiv 1 \pmod r
$$

同余式表示存在整数 $s$，使得：

$$
km-1=sr
$$

也就是：

$$
km-sr=1
$$

根据 Bézout 定理，这个整数方程有解，当且仅当：

$$
\gcd(k,r)=1
$$

所以 $r$ 阶循环群的生成元个数为欧拉函数 $\varphi(r)$。

## 无限阶循环群性质

设 $G=\langle a\rangle$ 是无限循环群。由于 $a$ 是无限阶元素，对于任意整数
$m,n$，都有：

$$
a^m=a^n \iff m=n
$$

也就是说，无限循环群中的不同指数会产生不同的元素。

### 定理：无限循环群只有两个生成元

无限循环群 $G=\langle a\rangle$ 的生成元只有：

$$
a \quad\text{和}\quad a^{-1}
$$

证明如下。假设 $a^k$ 也是 $G$ 的生成元，那么 $a$ 必须能够表示成
$a^k$ 的某个整数次幂。因此存在整数 $m$，使得：

$$
(a^k)^m=a
$$

整理指数：

$$
a^{km}=a
$$

因为 $a$ 是无限阶元素，不同的指数不会得到同一个元素，所以：

$$
km=1
$$

整数方程 $km=1$ 只有两组解：

$$
(k,m)=(1,1)\quad\text{或}\quad(k,m)=(-1,-1)
$$

所以 $k=1$ 或 $k=-1$。

反过来：

$$
\langle a\rangle=G
$$

显然 $a$ 是生成元；而：

$$
\langle a^{-1}\rangle
=\{(a^{-1})^m\mid m\in\mathbb Z\}
=\{a^{-m}\mid m\in\mathbb Z\}
=\langle a\rangle
$$

因此 $a^{-1}$ 也是生成元。

例如，$a^2$ 不能生成 $a$，因为如果存在整数 $m$ 使：

$$
(a^2)^m=a
$$

则必须有 $2m=1$，但这个方程没有整数解。类似地，$a^{-2}$ 也不是生成元。

这也可以通过同构来理解。无限循环群满足：

$$
G\cong(\mathbb Z,+)
$$

同构关系为：

$$
n\longmapsto a^n
$$

在整数加法群中，只有 $1$ 和 $-1$ 能生成整个 $\mathbb Z$，因此在 $G$
中对应的生成元也只有 $a$ 和 $a^{-1}$。

## 循环群的子群

设 $G=\langle a\rangle$，$H\leq G$。因为 $G$ 中的每个元素都是 $a$ 的某个
整数次幂，所以 $H$ 中的元素也都可以写成：

$$
a^n,\qquad n\in\mathbb{Z}
$$

### 定理：循环群的每个子群都是循环群

如果 $H$ 是 $G=\langle a\rangle$ 的子群，那么 $H$ 也是循环群。

证明如下。先考虑 $H\neq\{e\}$ 的情形，定义：

$$
S=\{n\in\mathbb{Z}\mid a^n\in H\}
$$

由于 $H$ 不是平凡子群，$S$ 中存在正整数。取 $S$ 中最小的正整数，
记为 $d$。于是：

$$
a^d\in H
$$

任取 $a^n\in H$。根据带余除法，可以写成：

$$
n=qd+r,\qquad 0\leq r<d
$$

于是：

$$
a^r=a^{n-qd}=a^n(a^d)^{-q}\in H
$$

由于 $d$ 是 $S$ 中最小的正整数，只能有 $r=0$。因此 $n=qd$，从而：

$$
a^n=(a^d)^q
$$

这说明 $H$ 中的每个元素都属于 $\langle a^d\rangle$。另一方面，
$a^d\in H$，所以它的所有整数次幂也都在 $H$ 中。因此：

$$
H=\langle a^d\rangle
$$

如果 $H=\{e\}$，则可以写成：

$$
H=\langle e\rangle=\langle a^0\rangle
$$

所以循环群的每个子群都是循环群。

### 无限循环群的子群

设 $G=\langle a\rangle$ 是无限循环群。此时它的所有子群都可以写成：

$$
\langle a^d\rangle,\qquad d\in\mathbb{Z}_{\geq 0}
$$

其中：

- $d=0$ 时，$\langle a^0\rangle=\{e\}$；
- $d>0$ 时，$\langle a^d\rangle$ 是无限循环群。

例如：

$$
\langle a^2\rangle
=\{\ldots,a^{-4},a^{-2},e,a^2,a^4,\ldots\}
$$

它只包含指数为偶数的幂，所以不包含 $a$。

类似地：

$$
\langle a^3\rangle
=\{\ldots,a^{-6},a^{-3},e,a^3,a^6,\ldots\}
$$

在无限循环群中，不同的非负整数 $d$ 对应不同的子群。

### 有限循环群的子群

设 $G=\langle a\rangle$，且 $|G|=n$。此时每个子群都可以写成：

$$
H=\langle a^d\rangle
$$

其中 $d$ 是 $n$ 的正因数：

$$
d\mid n
$$

这是因为 $a^n=e\in H$，所以 $n\in S$。将 $n$ 除以 $d$ 时，前面的
带余除法论证说明余数必须为 $0$，因此 $d\mid n$。

子群 $\langle a^d\rangle$ 中的元素为：

$$
\langle a^d\rangle
=\{e,a^d,a^{2d},\ldots,a^{(\frac nd-1)d}\}
$$

其阶为：

$$
|\langle a^d\rangle|=\frac nd
$$

因此，有限循环群的子群与 $n$ 的正因数一一对应：

$$
d\mid n
\quad\longleftrightarrow\quad
\langle a^d\rangle
$$

如果想要寻找阶为 $d$ 的子群，其中 $d\mid n$，则应该取：

$$
\left\langle a^{\frac nd}\right\rangle
$$

因为：

$$
\left|\left\langle a^{\frac nd}\right\rangle\right|
=\frac{n}{n/d}
=d
$$

例如，若 $|G|=12$，则其子群为：

$$
\langle a\rangle,\quad
\langle a^2\rangle,\quad
\langle a^3\rangle,\quad
\langle a^4\rangle,\quad
\langle a^6\rangle,\quad
\langle a^{12}\rangle
$$

它们的阶分别为：

$$
12,\ 6,\ 4,\ 3,\ 2,\ 1
$$

因此，$12$ 阶循环群共有 $\tau(12)=6$ 个子群，其中 $\tau$ 表示正因数
的个数。



## 典型例子

### 整数加法群

整数加法群 $\mathbb{Z}$ 是循环群：

$$
\mathbb{Z} = \langle 1\rangle
$$

这里的群运算是加法，$1$ 的“幂”对应整数倍：

$$
n\cdot 1 = n
$$

$-1$ 也是 $\mathbb{Z}$ 的生成元。

### 模 $r$ 加法群

模 $r$ 的加法群 $\mathbb{Z}/r\mathbb{Z}$ 也是循环群：

$$
\mathbb{Z}/r\mathbb{Z}
= \langle \overline{1}\rangle
$$

它有 $r$ 个元素，生成元为所有满足 $\gcd(k,r)=1$ 的 $\overline{k}$。