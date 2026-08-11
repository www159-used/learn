---
title: "有限群论基础习题"
date: 2026-08-05

category: "数学"

series: group-theory
seriesOrder: 4
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
todo 循环群，数论，超纲

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
还没学？
$$
即证明\forall g，|g| = 4 \implies \\
\forall a，b\in g，ab = ba \\
$$
