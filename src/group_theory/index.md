# 群论入门

群论从入门到放弃

最近迷上了分形，局部特征就像子群？

通过简单入门来打破幻想

顺着[有限群论基础](./有限群论基础.pdf)
结合[近世代数](./moderna.pdf)

需要简单数论，离散数学作为基础

## 什么是群

设$G$为非空集合，$\cdot$为集合运算

满足以下性质则是群：
1. 结合律
    $$
    (a \cdot b) \cdot c = a \cdot (b \cdot c)
    $$
2. 存在单位元

    对$G$中任意元素$a$，存在$e$
    $$
    a \cdot e = e \cdot a = a
    $$
3. 存在逆元

    G中存在元素，记作$a^{-1}$，满足
    $$
    a^{-1} \cdot a  = a \cdot a^{-1} = e
    $$

特殊的，如果满足交换律，则是阿贝尔群或者交换群
$$
a \cdot b = b \cdot a
$$

## 幂

为了方便书写，将n个元素a运算表示为$a^n$

约定$a^0 = e$，$a^{-n} = (a ^ {-1})^n$

由结合律可知，群的幂满足指数幂运算

$$
a^n \cdot a^m = a^{n + m} \\
(a^n)^m = a ^ {nm}
$$

## 阶

若群$G$中的个数有限，则称$G$中元素的个数为阶

若群$G$存在k，满足$a^k = e$，则$a$被称为*有限阶元素*，且$k$被称为元素$a$的阶，否则为*无限阶元素*

对于有限阶元素a，若其阶为k，有如下性质
$$
a^l = e \iff k \mid l \\
a^l = a^m \iff k \mid l - m
$$
对于无限阶元素a
$$
a^l = a^m \iff l = m
$$

若群$G$所有元素都是有限阶元素，则称为周期群 

## 置换群

设一堆文字构成集合$\Omega$
$$
\Omega = \{\alpha_1 \quad \alpha_2 \ldots \alpha_n \}
$$
我们定义置换操作为$\sigma$，下面是一次有序排列的置换的写法
$$
\sigma = 
\begin{pmatrix}
\alpha_1 & \alpha_2 & \ldots & \alpha_n \\
\alpha_1^\sigma & \alpha_2^\sigma & \ldots & \alpha_n^\sigma \\
\end{pmatrix}
$$
可以简写成
$$
\sigma = \begin{pmatrix}\alpha_i \\ \alpha_i^\sigma\end{pmatrix}
$$


为了方便表示，每次一置换操作开始，我们都对n个元素从1开始标号，
$$
1 \quad 2 \quad 3 \ldots n
$$
然后置换

观察得到n元置换的的个数为$n!$，即n元排列数

定义n元置换构成的集合为$S_n$

从集合变成群还差几样东西

### 运算

定义置换乘法。对于2个置换$\sigma$ $\tau$，定义$\sigma\cdot\tau$为两个置换的连续作用

类似函数的连续作用，满足右结合

### 单位元

定义$e$为自身到自身的恒等置换，即不置换

### 结合律

置换是对集合S的映射。
由集合和映射的性质，置换作用满足结合律

---
n元恒等置换和置换乘法组成n元对称群

## 轮换

定义轮换
$$
\begin{pmatrix}
1 & 2 & 3
\end{pmatrix}
$$
为将1放到2，将2放到3，将3放到1

如果n元置换中只有连续m个元素发生轮换，则称为m-轮换

- m = 1
    恒等置换
- m = 2
    只交换两个元素的位置，定义为对换

轮换的起点可以任意
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