---
title: "群同态"
date: 2026-08-31
category: "数学"
series: group-theory
---

上一章末尾提到的陪集置换表示$S_{GH}$就是$G$的同态

## 同态的定义

同构满足双射

同态是更一般的映射

设$\varphi$是$G$到$H$的同态映射

$\forall a, b \in G, (ab)^{\varphi} = a^{\varphi}b^{\varphi} \iff G \sim H$

## 同态性质

1. $e^{\varphi} = e'$

    证明：
    
    $ (e^{\varphi})^2 = e^{\varphi} = e^{\varphi}e'$
    
    $e^{\varphi} = e'$
    
2. $(a^{-1})^{\varphi} = (a^{\varphi})^{-1}$
3. $ord(a) = k \implies ord(a^{\varphi}) \mid k$

    证明：

    设$a^{\varphi}$的阶$m$

    $(a^{\varphi})^k = (a^k)^{\varphi} = e^{\varphi} = e'$
    
    得$m \mid k$
    
4.  $\forall a,b \in G, ab = ba \implies a^{\varphi}b^{\varphi} = b^{\varphi}a^{\varphi}$ 

5. $\forall A \le G, A^{\varphi} \le H$
6. $B \le H$，记$B$的逆象$B^{\varphi^{-1}}$：

    $\{a \mid a^{\varphi} \in B\}$
    
    有$B^{\varphi^{-1}} \le G$
    
## 同态的核

定义$B = \{e'\}$的逆象为$\varphi$的核。记作$\ker \varphi$

### 定理

1. $\varphi是满同态映射，且\ker \varphi = \{e\} \iff \varphi是同构映射$

2. $a^{\varphi} = b^{\varphi} \iff a,b \in Kx$

