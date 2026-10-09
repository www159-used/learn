---
title: "正规子群"
date: 2026-09-07
category: "数学"
series: group-theory
---

已知同态的核

$K = \{x \mid x^{\varphi} = e_1 \}, K \le G$

因为$a^{\varphi}K^{\varphi} = K^{\varphi}a^{\varphi} = a^{\varphi}$

所以$aK = Ka, a \in G$

我们定义左陪集和右陪集相等的子群H为正规子群

记作$H \trianglelefteq G$

特殊的，真正规子群记作$H \triangleleft G$

## 正规子群的判定

1. 指数为2的子群一定正规

    可以得到交错群一定是对称群的正规子群

2. $H \trianglelefteq G \iff \forall a \in G, a^{-1}Ha = H$，共轭子群类只有自己一个元素

3. 由2和正规化子的定义，$H \trianglelefteq G \iff N_G(H) = G$

4. $H \trianglelefteq G \iff \forall g \in G, \forall h \in H, g^{-1}hg \in H$

5. $\forall h \in H, h所在的共轭元素类 \subseteq H$

## 其他性质

定义$H \le G, Z_G(H) = \bigcap_{h \in H} Z_G(h)$

称为$H$在$G$内的中心化子

定理: $Z_G(H) \le N_G(H)$

证明：

由定义得$Z_G(H) \subseteq N_G(H)$

$\forall a,b \in Z_G(H)$

易证$ab^{-1} \in Z_G(H)$

定理：$Z_G(H) \trianglelefteq N_G(H)$

证明：

$\forall z \in Z_G(H), \forall h \in H, \exists g \in N_G(H)$

$(g^{-1}zg)^{-1}h(g^{-1}zg) = g^{-1}z^{-1}ghg^{-1}zg = h$

由$Z_G(H)$定义得：

$g^{-1}zg \in Z_G(H)$

由正规子群判定4，证明恒成立

## 习题

### 1

$\forall A, G,H , A \le G, H \trianglelefteq G \implies A \cap H \trianglelefteq A$

证明：

$\forall x \in A \cap H, \forall a \in A$

有$a^{-1}xa \in A \cap H$

证明恒成立

### 2

取$a_1,a_2,h_1,h_2$

$a_1h_1(a_2h_2)^{-1} = a_1h_1h_2^{-1}a_2^{-1}$

由题设得$a,h$可交换

因为$a_1a_2^{-1} \in A, h_1h_2^{-1} \in H$

即上式等于$(a_1a_2^{-1})(h_1h_2^{-1}) \in AH$

所以$AH \le G$

由正规子群定义

$\forall a \in A, aH = Ha$

显然有$AH = HA$