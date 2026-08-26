---
title: "同构"
date: 2026-08-26
category: "数学"
series: group-theory
---

定义同构

定义映射$\varphi$，群$G$的元素一一映射$G_1$，$\forall a,b \in G, (ab)^{\varphi} = a^{\varphi}b^{\varphi}$

称为$G$和$G_1$同构

写作$G \cong G_1$

## 同构性质

1. $G$的单位元$e$， $G_1$的单位元$e_1$, $e^{\varphi} = e_1$

2. $\forall a \in G, (a^{-1})^{\varphi} = (a^{\varphi})^{-1}$

3. $\forall a \in G, ord(a) = ord(a^{\varphi})$

    证明：
    
     设 $n = \mathrm{ord}(a)$, $m = \mathrm{ord}(a^{\varphi})$
     
     由 $(a^n)^{\varphi} = (a^{\varphi})^n = e_1$ 得$m \mid n$
    
    $(a^m)^{\varphi} = e_1 = \varphi(e)$
    
    由 $\varphi$ 单射得 $a^m = e$，故 $n \mid m$
    
      因此 $\mathrm{ord}(a^{\varphi}) = m  = n$

4. $\forall a, b \in G, ab = ba \implies a^{\varphi}b^{\varphi} = b^{\varphi}a^{\varphi}$


5. $\forall H \le G \iff H^{\varphi} \le G_1$

