---
title: "有限群论基础习题"
date: 2026-08-05

category: "数学"

series: group-theory
---

整体归纳法和代入法，没啥难度

- [ ] 引入 Rocq 来证明群论习题

# ex1.1
如果r = 2
$$
要证明
(a_1 \cdot a_2)^{-1} = a_2^{-1} \cdot a_1^{-1} \\

就要证明 e = a_2^{-1} \cdot a_1^{-1} \cdot (a_1 \cdot a_2)\\

就要证明 a_1 \cdot a_2 = a_1 \cdot a_2 \\

恒成立
$$

如果存在k，k >= 2，有
$$
(a_1 \cdot a_2 \ldots a_k)^{-1} = a_k^{-1} \ldots a_2^{-1} \cdot a_1^{-1} \\
$$
对于r = k + 1
$$
要证明 
(a_1 \cdot a_2 \ldots a_k \cdot a_{k+1})^{-1} = a_{k+1}^{-1} \cdot a_k^{-1} \ldots a_2^{-1} \cdot a_1^{-1} \\
就要证明 (a_1 \cdot a_2 \ldots a_k \cdot a_{k+1})^{-1} = a_{k+1}^{-1} \cdot (a_1 \cdot a_2 \ldots a_k)^{-1} \\
就要证明 a_1 \cdot a_2 \ldots a_k \cdot a_{k+1} = a_1 \cdot a_2 \ldots a_k \cdot a_{k+1} \\
恒成立
$$

# ex1.2

$$
即证明 \forall a \in G，a^2 = e \implies \\
\forall a，b \in G，a \cdot b = b \cdot a \\
就要证明 a \cdot b \cdot a \cdot b = b \cdot a \cdot a \cdot b \\
就要证明 (a \cdot b) ^ 2 = e \\
恒成立
$$

# ex1.3

若a，b有1个是无限阶，显然1，2恒成立

假设a，b的有限阶，且分别为$o_a$，$o_b$

## ex1.3.1

$$

化简得 a^{-k} = e \\
e = a^k \\
由阶的性质得到 k = o_a \\
(a^{-1}ba)^k = e \\
展开得a^{-1}b^ka = e \\
得到b^k = e\\
由阶的性质得到k = o_b
$$

## ex1.3.2
$$ 
ab = a(ba)a^{-1} \\
代入1得恒成立
$$

# ex1.4

$$
已知a^n = e \\
要证明a^m的阶为n/\gcd(m,n) \\
设ord(a^m) = k，则(a^m)^k = e \\
设d=\gcd(m，n)，n = n_1d, m = m_1d \\
即证明a^m的阶为n_1 \\
(a^m)^{n_1} = a^{m_1dn_1} = (a^n)^{m_1}=e 恒成立 \\
由阶的性质得到k \mid n_1 \\
由阶的性质得n \mid mk \\
即n_1 \mid m_1k \\
由条件得\gcd(n_1，m_1) = 1 \\
则 n_1 \mid k \\
k = n_1
$$

# ex1.5
即证明：
$\forall a,b \in G, ab = ba, ord(a) = l, ord(b) = m, \langle a \rangle \cap \langle b \rangle = e \implies ord(ab) = [l, m]$ 
成立

证明:

由条件得: (l, m) = 1

假设 $(ab)^r = e$

由条件得:

$(ab)^r = abab\cdots ab = a^rb^r = e$

因为$a^r = b^{-r}$

$a^r \in \langle a \rangle$

$b^{-r} \in \langle b \rangle$

由条件得$a^r = e$, $b^{-r} = e$

得$l \mid r \land m \mid r$

由阶的性质得$r = [l, m]$

# ex1.6
$$
(b^{-1}ab)^2 = b^{-1}eb = e \\
且b^{-1}ab \neq e \\
则b^{-1}ab的阶为2 \\
由于g中阶为2的元素只有a\\
b^{-1}ab = a \\
得ab = ba
$$

# ex1.7
$$
即证明\forall g，|g| = 4 \implies \\
\forall a，b\in g，ab = ba \\   
$$
证明：

假设4阶群$g$ $\exists a,b \in g, ab \ne ba$

设$g$中元素为$e, a, b, c$

1. $ab = e$

    由条件得 $ba = c$

    变形得
$$
即证明\forall g，|g| = 4 \implies \\
\forall a，b\in g，ab = ba \\   
$$
证明：

假设4阶群$g$ $\exists a,b \in g, ab \ne ba$

设$g$中元素为$e, a, b, c$

1. 设 $ab = e$

    由条件得 $ba = c$

    变形得
    $$
    \begin{cases}
    a = b^{-1}\\
    a = b^{-1}c
    \end{cases}
    $$
    
    联立得
    $b^{-1} = b^{-1}c$
    
    $c = e$

    与条件矛盾
2. 设$ab = c$
    同1

故假设不成立

# ex1.8

## 1
$$
\sigma = (1,4,5)(2,6)\\
\tau = (1,6,3)(2,4)
$$

## 2
$$
\begin{aligned}
\sigma \tau 
&= (1,4,5)(2,6)(1,6,3)(2,4) \\

& 1 \to 4 \to 2 \\
& 2 \to 6 \to 3 \\
& 3 \to 1 \\
& 4 \to 5 \\
& 5 \to 1 \to 6 \\
& 6 \to 2 \to 4 \\

&得(1,2,3)(4,5,6) \\
\\
\tau \sigma
&= (1,6,3)(2,4)(1,4,5)(2,6) \\

&1 \to 6 \to 2 \\
&2 \to 4 \to 5 \\
&3 \to 1 \to 4 \\
&4 \to 2 \to 6 \\
&5 \to 1 \\
&6 \to 3 \\
&得(1,2,5)(3,4,6) \\
\\

\sigma^{-1} 
&= ((1,4,5)(2,6))^{-1} \\
&= (2,6)^{-1}(1,4,5)^{-1} \\
&= (6,2)(5,4,1) \\
\\

\sigma^{2}
&= (1,4,5)(1,4,5)(2,6)(2,6) \\
&= (1,5,4) \\
\\

\sigma^{3} 
&= e\cdot(2,6)^3 \\
&= (2,6) \\
\\

\tau^{-1}\sigma\tau
&= (2,4)^{-1}(1,6,3)^{-1}(1,4,5)(2,6)(1,6,3)(2,4) \\
&= (2,4)(1,3,6)(1,4,5)(2,6)(1,6,3)(2,4) \\
&1 \to 1 \\
&2 \to 5 \\
&3 \to 4 \\
&4 \to 3 \\
&5 \to 6 \\
&6 \to 2 \\
&得(2,5,6)(3,4) \\
\\
&共轭算法：\\
& \tau(1) = 6 \\
& \tau(4) = 2 \\
& \tau(5) = 5 \\
& \tau(2) = 4 \\
& \tau(6) = 3 \\
&得(6,2,5)(4,3) \\
\end{aligned}
$$

# ex1.9

$$
\begin{aligned}
\sigma &= (1,4,2,3) \\
\tau &= (1,2,3,4) \\
\\
x 
&= \sigma^{-1}\tau \\
&= (3,2,4,1)(1,2,3,4) \\
&= (1,4) \\
\\

y 
&= \tau \sigma^{-1} \\
&= (1,2,3,4)(3,2,4,1) \\
&= (1,4,3)\\
\end{aligned}
$$

# ex1.10
证明：

1. 假设$\sigma$是对换，即$r=2$

    不妨设对换$\sigma = (\sigma_1, \sigma_2)$

    计算$\tau^{-1}\sigma\tau$
    
    1. 如果$\tau$和$\sigma$不相交，恒成立

    2. 只相交1个元素，设在位置$\sigma_1$相交
        
        1. $\tau(\sigma_1)\cdots \sigma_2$
        2. $\sigma_2 \cdots \tau(\sigma_1)$

        成立

    3. 相交2个元素

        1. $\tau(\sigma_1)\cdots \sigma_2$
        2. $\sigma_2 \cdots \tau(\sigma_1)$
        3. $\tau(\sigma_2) \cdots \tau(\sigma_1)$

        成立
        
2. 假设$k >=2 $, 有$\tau^{-1}\sigma\tau=(\sigma_1^{\tau}\cdots \sigma_k^{\tau})$

    对于$r = k + 1$
    
    得$(\sigma_1 \cdots \alpha_k,\sigma_{k+1}) = (\sigma_1 \cdots \sigma_k)(\sigma_1,\sigma_{k+1})$
    
    即证明$\tau^{-1}(\sigma_1 \dots \sigma_{k+1})\tau = \tau^{-1}(\sigma_1 \cdots \sigma_k)\tau \cdot \tau^{-1}(\sigma_1,\sigma_{k+1})\tau = (\sigma_1^{\tau} \cdots \sigma_k^{\tau}, \sigma_{k+1}^{\tau})$成立

    由1，递推条件以及
    $(\sigma_1^{\tau} \cdots \alpha_k^{\tau},\sigma_{k+1}^{\tau}) = (\sigma_1^{\tau} \cdots \sigma_k^{\tau})(\sigma_1^{\tau},\sigma_{k+1}^{\tau})$
    
    
    恒成立

3. 对于一般置换$\sigma$，我们以$m$个不相交的轮换表示:

    $\Pi_{i=1}^m\sigma_i$

    记$\tau$作用到轮换$\sigma_i$为$\sigma_i^{\tau}$

    即$\sigma_i^{\tau} = (\sigma_{i1}^{\tau}\cdots\sigma_{ij}^{\tau})$

    即证明$\tau^{-1}\sigma\tau=\prod_{i=1}^m\sigma_i^{\tau}$成立

    由2得$\tau^{-1}\sigma_i\tau = \sigma_i^{\tau}$

    变形左边$\tau^{-1}\sigma\tau=\prod_{i=1}^m\tau^{-1}\sigma_i\tau = \prod_{i=1}^m \sigma_i^{\tau}$

    恒成立

由1，2，3得恒成立
# ex1.11

即证明：
$\exists a \in S_n,n \gt 2, \forall x \in S_n, xa = ax$
不成立

假设存在a使命题成立

即$\forall x \in S_n, xa=ax$

使用轮换形式：$a=\prod_{i=1}^ma_i$，因为n>2，故m>1

因为n>2，可以构造$x = a_1'a'$，使得$a_1'$和$a_1$相交

因为x和a相交，所以无法交换

所以不存在a使命题成立

故证明恒成立

# ex1.12

由置换奇偶性的性质

可以得到$\sigma$的奇偶性和$\sum{l_i - 1}$的奇偶性一致

即证明$\sum_{i=1}^s{l_i - 1}$和$\sum_{i=1}^s{l_i} + s$奇偶性一致

变形右边得$\sum_{i=1}^s{l_i+1}$

恒成立

# ex1.13

$\forall H \le G, \forall a\in G, ord(a)=n, a^m \in H, (n, m) = 1 \implies a\in H$

证明：

由条件得

$\exist k, km \equiv 1 \pmod n $

即$a^{km} = a$

因为 $a^m \in H$

则 $a^{km} = (a^m)^k \in H$

得 $a \in H$


# ex 1.14

由拉格朗日定理，设群$G$阶为素数

则$\forall a \in G, ord(a) = 1 \lor ord(a) = \mid G \mid$

可得除了$e$之外的所有元素阶都为$\mid G \mid$

即任取$G$中除单位元一个元素$a$

$\langle a \rangle$的阶为$\mid G \mid$且

$\forall x \in \langle a \rangle, x \in G$

故$G$是循环群

# ex 1.15

充分性：

假设$G$没有非平凡子群

则取$G$中任一元素$a$

1. $a = e$

    $\langle a \rangle$为e，满足条件

2. $a \ne e$

    要让$\mid \langle a \rangle \mid = \mid G \mid$
    
    则 $ord(a) = \mid G \mid$
    
    由拉格朗日定理得，$\mid G \mid$为素数，由ex1.14得G为素数阶循环群

必要性：

恒成立

# ex1.16

证明：

假设$G$有2个$q$阶子群

由拉格朗日定理得

对某个$q$阶子群$H$的指数$r$为$p$

1. p = 2

    设子群分别是$H$,$K$
    

    但是$G$还有子群$e$和$G$

    也就是说$\mid H \mid \ne \mid G \mid$
    
    假设不成立

2. p > 2 假设不成立


由1，2得假设不成立

得证明成立

# ex1.17

即证明

$A \subset G, A \ne \emptyset, AA \subseteq A \iff A \le G$

证明：

充分性：

由条件得：

$\forall a, b \in A, ab \in A$

根据子群判定条件必要性，充分性成立

必要性：

由子群判定条件充分性，

$\forall a, b \in A, ab \in A$

得必要性成立

故证明恒成立

# ex1.18

即证明$A \le G, B \le G, AB = BA \iff AB \le G$

证明：

由题设得

$\forall a_1, a_2 \in A, a_1a_2^{-1} \in A$

$\forall b_1, b_2 \in B, b_1b_2^{-1} \in B$

充分性：

由条件得：

$\forall a \in A, \forall b \in B, ab \in AB, ba \in AB$

$\forall m, n \in AB$

要证明$mn^{-1} \in AB$

不妨令$m = a_1b_1$, $n = a_2b_2$

$mn^{-1} = a_1b_1b_2^{-1}a_2^{-1}$


由条件得
$b = b_1b_2^{-1} \in B$

下面要证明

$a_1ba_2^{-1} \in AB$成立

因为$b\in B, a_2^{-1} \in A$


令$ba_2^{-1} = a_3b_3$

$a_1ba_2^{-1} = a_1a_3b_3$

$a_1a_3 \in A$
$b_3 \in B$

所以$mn^{-1} = a_1a_3b_3 \in AB$恒成立

必要性：

由条件得$AB \le G$，即证$AB = BA$

先证$BA \subseteq AB$：

任取$ba \in BA$，则$a^{-1}b^{-1} \in AB$

因为$AB \le G$，有$(a^{-1}b^{-1})^{-1} \in AB$

即$ba \in AB$

再证$AB \subseteq BA$：

任取$ab \in AB$，因为$AB \le G$，有$(ab)^{-1} = b^{-1}a^{-1} \in AB$

设$b^{-1}a^{-1} = a'b'$，其中$a' \in A$，$b' \in B$

则$ab = (a'b')^{-1} = (b')^{-1}(a')^{-1} \in BA$

故$AB = BA$

# ex 1.19

证明

由条件得$A \subseteq C, B\cap C \subseteq C$

所以$A(B \cap C) \subseteq C$

而$B \cap C \subseteq B$

得$A(B \cap C) \subseteq AB$

所以$A(B \cap C) \subseteq AB \cap C$

下面要证明$AB \cap C \subseteq A(B \cap C)$成立

取$a \in A, b \in B, x = ab \in AB \cap C$

$a \in A且A\in C$

因为$x \in AB \cap C$

所以$x \in C恒成立$

$b = a^{-1}x \in C$

得$b \in B \cap C$

所以$x = ab, a \in A, b \in B \cap C$

由集合积的定义得

$x \in A(B \cap C)$

即$AB \cap C \subseteq A(B \cap C)$恒成立

故证明恒成立

# ex1.20

由题设得，设$h \in H, g \in \complement_G^H$

$G = Hh \cup Hg$

$G = hH \cup gH$

$Hh = hH = H$

故$Hg = gH$恒成立

故证明恒成立

# ex 1.21

$\mid S_4 \mid = 24$

$\mid K \mid = 4$
