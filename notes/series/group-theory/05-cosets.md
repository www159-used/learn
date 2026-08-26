---
title: "群的陪集分解"
date: 2026-08-14
category: "数学"
series: group-theory
---

## 问题背景

教材写的很明白，陪集分解是为了研究不相交子群的抽象工具

接着通过一步步证明找出子群，元素阶的规律

比如整数群$\mathbb{Z}$和7的倍数构成的群$7\mathbb{Z}$，显然$7\mathbb{Z}\le \mathbb{Z}$

因此$\mathbb{Z}$表示成陪集分解形式：

$$
\mathbb{Z} = \{i\mid 1+i,i\in 7\mathbb{Z}\} \cup \ldots \cup \{i\mid 6+i,i\in 7\mathbb{Z}\}
$$

## 陪集定义

设群$G$的子群$H$，$a$是G中的一个元素。

定义$Ha$是右陪集
$$
aH = \{ha \mid h \in H\}
$$

同理$aH$是左陪集

## 性质

1. Ha和H的元素个数一样

2. $Ha = H \iff a \in H$
    
    证明充分性
    
    $Ha = H \implies \exists h_1, h_2 \in H, h_1a = h_2$

    移项得
    
    $a=h_2h_1^{-1}$

    而

    $h_2h_1^{-1} \in H$

    所以

    $a \in H$

    证明充分性
    
    $a\in H \implies \forall h \in H, ha \in H$
    
    由陪集定义得
    
    $Ha = \{ha \mid h \in H\} = H$

3. $a\in Ha$

    即证明
    $\forall h, \exists h', ha=h' \implies a\in H$

    由条件得
    $a=h^{-1}h'\in H$

    恒成立

    a可以称为$Ha$的陪集代表

4. $\exists H,a,\forall b \in Ha \implies Ha = Hb$

    证明

    由条件得

    $b = ha$ 
    
    $Hb = Hha = Ha$

5. $Ha = Hb \iff ab^{-1} \in H$

    充分性：
    
    $\exists h_a,h_b,a,b, \quad h_aa = h_bb \implies ab^{-1}\in H$
    
    由条件得

    $a = h_a^{-1}h_bb$
    
    $ab^{-1} = h_a^{-1}b_b \in H$
    
    必要性：

    $ab^{-1}\in H \implies Ha = Hb$
    
    由条件和定理2得

    $Hab^{-1} = H$

    变形得
    $Ha = Hb$

6. $\forall Ha,Hb \implies Ha = Hb \lor Ha \cap Hb = \emptyset$

## 陪集分解

由陪集的性质可知，$G$可以写成子群$H$右陪集的并：
$$
G = \bigcup_{i=1}^rHa_i
$$
其中$r$被称为$H$对$G$的指数，写作$\mid G \colon H \mid$

显然陪集的并是空集

$$
\bigcap_{i=1}^rHa_i = \emptyset
$$

类似的左陪集也有相同的性质，左右陪集的指数是相等的。

## 拉格朗日定理

群论最重要的定理之一

$$
\mid G \mid = \mid H \mid \cdot \mid G \colon H \mid
$$

由1和陪集指数性质可证

## 拉格朗日定理推论

有限阶群$G$，每个元素的阶都是$\mid G \mid$的因子

$\forall x \in G, x^{ord(G)} = e$

证明：

$$
\exists a \in G, ord(a) = m \\

令H = \langle a \rangle \le G \\

有\mid H \mid = m \\

由拉格朗日定理得：m \mid ord(G)
$$

## 陪集定理

设
$$
G \ge H \ge k
$$

有

1. $\mid G \colon K \mid = \mid G \colon H \mid \cdot \mid H \colon K \mid$

2.
$$
G = \bigcup_{i=1}^m Hg_i, H = \bigcup_{i=i}^l Kh_i \implies G = \bigcup_{i=1}^m {\bigcup_{j=1}^l Kh_jg_i} \land Kh_1g_1 = K
$$

3. 
$$
G = \bigcup_{i=1}^mKa_i \implies
存在某种排列\tau，使得\forall i, H_i = \bigcup_{i=1}^mKa_{\tau(i)}\
$$

证明略  