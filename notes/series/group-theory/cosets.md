---
title: "群的陪集分解"
date: 2026-08-14
category: "数学"
series: group-theory
seriesOrder: 5
---

## 问题背景

教材写的很明白，陪集分解是为了研究不相交子群的抽象工具

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

3. $a$在陪集$Ha$中

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

5. 