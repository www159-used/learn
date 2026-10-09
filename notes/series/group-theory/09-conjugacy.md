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

### 性质

定义子群的共轭关系
$$
\forall H_1, H_2 \le G, \exists a \in G, a^{-1}H_1a = H_2 \iff H_1和H_2共轭
$$

可以证明共轭关系是等价关系

所以$G$可以划分成若干等价共轭子群集合，称为共轭子群类

共轭子群类中所有子群有相同的阶和指数

## 正规化子

在计算共轭子群类时，我们会碰到共轭计算等于自身的元素，这一节讨论这些元素构成的集合

定义子集$N_G(H) = \{x \mid x^{-1}Hx = H \}$

### 性质

1. $N_G(H) \le G$

    证明：
    
    $\forall a,b \in N_G(H)$

    有$a, b \in G$
    
    $a^{-1}Ha = H$

    $bHb^{-1} = H$

    $a^{-1}bHb^{-1}a = (b^{-1}a)^{-1}H(b^{-1}a) = H$
    
    得

    $b^{-1}a \in N_G(H)$
    
    由子群充要条件得证明恒成立
2.  $H \le N_G(H)$ 

    证明：
    
    $\forall a,b \in H$
    
    $a^{-1}Ha = H$

    $b^{-1}Hb = H$
    
    即 $a,b \in N_G(H)$
    
    显然有$ab^{-1} \in H$
    
    证明恒成立

3. $H$的共轭子群数等于$N_G(H)$在$G$中的指数$\mid G \colon N_G(H)\mid$

    证明:

    $\forall a,b \in G$

    $a^{-1}Ha = b^{-1}Hb$

    $(ab^{-1})^{-1}Hab^{-1} = H$
    
    所以$ab^{-1} \in N_G(H)$
    
    所以$a,b$在$N_G(H)$同一个右陪集中
    
## 共轭元素

设$a \in G$，满足$x^{-1}bx = a$

则$a$和$b$共轭

元素共轭关系也是等价关系

共轭的元素组成共轭元素类

设共轭元素类的元素个数为$n_i$

有$\mid G \mid = \sum_{i=1}^n n_i$

定义中心化子$Z_G(a) = \{x \mid x^{-1}ax = a\}$

### 性质

1. $Z_G(a) \le G$

2. a的共轭元素个数等于$\mid Z_G(a) \colon G \mid$

