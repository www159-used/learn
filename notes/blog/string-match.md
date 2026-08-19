---
title: "字符串匹配算法"
date: 2026-07-07

category: "算法"
---

这节将讨论字符串匹配的前世今生。

因此新开一篇，也当作是复习。

使用略微形式化的风格。

## 写在前面

串即字符串。

定义模式串`Pattern`（后文简称$P$）。
定义输入串`Input`（后文简称$I$）。目标是找到$I$中所有$P$出现的位置。

记 $|P| = m$，$|I| = n$。

定义$P[i]$为$P$中第$i$个字符串，从0开始。

定义$P[i..j]$为$P$中第$i$到$j-1$个字符串，前闭后开。

定义字符串相等中缀运算$=$

## 朴素匹配

朴素匹配（Brute Force）逐个尝试 `I` 中的每个起始位置，看从该位置起是否与 `P` 完全相等。

```python
def brute_force(input_str: str, pattern: str) -> list[int]:
    """返回 pattern 在 input_str 中所有起始下标（左闭）。"""
    n, m = len(input_str), len(pattern)
    if m == 0:
        return list(range(n + 1))
    if m > n:
        return []

    positions = []
    for i in range(n - m + 1):
        if all(input_str[i + k] == pattern[k] for k in range(m)):
            positions.append(i)
    return positions
```

时间复杂度O(mn)，空间复杂度O(1)。

## kmp

参考数据结构课程，经典中的经典。

核心问题：发生失配时，能否利用已经匹配的部分，知道模式串下一次应该从哪里继续，而不让输入串回退？

### next表

对模式串的每个前缀 $P[0..i]$，$next(i)$ 表示它的最长相等真前缀的**末尾下标**。


$$
next(i)
=
\max\left(
\left\{
j\ \middle|\
0\le j<i,\ 
P[0..j]=P[i-j..i]
\right\}
\cup\{-1\}
\right)
$$

如果不存在非空的相等前后缀，就令 $next(i)=-1$。

例如 $P=\text{ababaca}$：

| $i$ | 0 | 1 | 2 | 3 | 4 | 5 | 6 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| $P[i]$ | a | b | a | b | a | c | a |
| $next(i)$ | -1 | -1 | 0 | 1 | 2 | -1 | 0 |

以 $i=4$ 为例，当前前缀是 `ababa`：

```text
真前缀：a, ab, aba, abab
真后缀：a, ba, aba, baba
```

最长的相等项是 `aba`，它在模式串中的末尾下标为 2，所以 $next(4)=2$。

### 计算next表

假设已经算出了 $next(0),next(1),\ldots,next(i-1)$，令 $j=next(i-1)$。此时 $P[0..j]$ 是 $P[0..i-1]$ 的最长匹配后缀。

- 如果 $P[i]=P[j+1]$，原来的前后缀都能延长一个字符，所以 $next(i)=j+1$。
- 如果不相等，当前候选失败。下一个可能的候选，是 $P[0..j]$ 自身的最长相等前后缀，因此令 $j=next(j)$ 继续尝试。
- 如果一直退到 $j=-1$ 仍不相等，则 $next(i)=-1$。

可以用递归函数 $F(i,j)$ 表示从候选长度 $j$ 开始尝试：

$$
F(i,j)=
\begin{cases}
j+1, & P[i]=P[j+1] \\
F(i,next(j)), & P[i]\neq P[j+1]\land j\ge 0 \\
-1, & P[i]\neq P[j+1]\land j=-1
\end{cases}
$$

`next` 的递推算法：

$$
\begin{cases}
next(0)=-1 \\
next(i)=F(i,next(i-1)), & 1\le i<m
\end{cases}
$$

其中第二种情况可能递归多次，对应代码中的 `while` 循环。实现时把函数在各个下标上的值存入数组 `next_`，所以数学上的 $next(i)$ 对应代码中的 `next_[i]`。

```python
def build_next(pattern: str) -> list[int]:
    next_ = [-1] * len(pattern)
    j = -1

    for i in range(1, len(pattern)):
        while j >= 0 and pattern[i] != pattern[j + 1]:
            j = next_[j]

        if pattern[i] == pattern[j + 1]:
            j += 1

        next_[i] = j

    return next_
```

### 匹配

扫描输入串时，`j` 表示模式串已匹配部分的末尾下标；因此已经匹配的字符数是 $j+1$，下一个要比较的是 `pattern[j + 1]`。

当 `input_str[i] != pattern[j + 1]` 时，不移动输入串的下标 `i`，只令 $j=next(j)$。这相当于保留已经匹配部分的最长后缀，并把它当作下一次匹配的前缀。

```python
def kmp(input_str: str, pattern: str) -> list[int]:
    n, m = len(input_str), len(pattern)
    if m == 0:
        return list(range(n + 1))
    if m > n:
        return []

    next_ = build_next(pattern)
    positions = []
    j = -1

    for i, ch in enumerate(input_str):
        while j >= 0 and ch != pattern[j + 1]:
            j = next_[j]

        if ch == pattern[j + 1]:
            j += 1

        if j == m - 1:
            positions.append(i - m + 1)
            # 继续寻找允许重叠的下一个匹配
            j = next_[j]

    return positions
```

构造 `next` 表需要 $O(m)$，扫描输入串需要 $O(n)$，因此总时间复杂度为 $O(m+n)$，空间复杂度为 $O(m)$。

## shift-or和shift-and

Shift-And 和 Shift-Or 是**位并行**字符串匹配算法：用一个整数的每一位，表示模式串某个前缀是否匹配。一次移位和按位运算，就能同时推进模式串的所有前缀。

### Shift-And

先看更直观的 Shift-And。令状态 `state` 的第 $k$ 位表示：

> `state[k] = 1` 当且仅当 $P[0..k]$ 与当前输入位置结尾的后缀相等。

再为每个字符 $c$ 建立掩码 `mask[c]`：

$$
mask[c]_k = 1 \iff P[k] = c
$$

读入字符 `c` 时，状态更新为：

```text
state = ((state << 1) | 1) & mask[c]
```

这三个操作分别表示：

1. `state << 1`：原来匹配到 $P[k-1]$ 的状态，尝试继续匹配 $P[k]$；
2. `| 1`：允许从当前位置重新开始匹配 $P[0]$；
3. `& mask[c]`：只保留模式串当前位置确实等于 `c` 的状态。

例如 $P=\text{aba}$，从右向左分别是第 0、1、2 位：

```text
mask['a'] = 101
mask['b'] = 010
```

扫描 $I=\text{ababa}$：

| 读入字符 | `state` | 含义 |
| --- | --- | --- |
| `a` | `001` | 匹配前缀 `a` |
| `b` | `010` | 匹配前缀 `ab` |
| `a` | `101` | 最高位为 1，匹配到 `aba` |
| `b` | `010` | 匹配前缀 `ab` |
| `a` | `101` | 再次匹配到 `aba` |

所以只要第 $m-1$ 位为 1，就找到了一个完整匹配。

```python
def shift_and(input_str: str, pattern: str) -> list[int]:
    n, m = len(input_str), len(pattern)
    if m == 0:
        return list(range(n + 1))
    if m > n:
        return []

    # mask[c] 的第 i 位为 1，当且仅当 pattern[i] == c
    mask: dict[str, int] = {}
    for i, ch in enumerate(pattern):
        mask[ch] = mask.get(ch, 0) | (1 << i)

    state = 0
    full = 1 << (m - 1)
    positions = []

    for i, ch in enumerate(input_str):
        state = ((state << 1) | 1) & mask.get(ch, 0)
        if state & full:
            positions.append(i - m + 1)

    return positions
```

### Shift-Or

Shift-Or 是同一个思路的反相表示。令状态 `state` 的第 $k$ 位表示：

> `state[k] = 0` 当且仅当 $P[0..k]$ 与当前输入位置结尾的后缀相等。

再为每个字符 $c$ 建立掩码 `mask[c]`：

$$
mask[c]_k = 0 \iff P[k] = c
$$

这和 Shift-And 正好相反：Shift-And 用 1 表示匹配，Shift-Or 用 0 表示匹配。

初始时还没有匹配任何前缀，因此 `state` 的所有位都是 1。读入字符 `c` 时，状态更新为：

```text
state = (state << 1) | mask[c]
```

这两个操作分别表示：

1. `state << 1`：原来匹配到 $P[k-1]$ 的状态，尝试继续匹配 $P[k]$。左移后最低位自动补 0，也就允许从当前位置重新开始匹配 $P[0]$；
2. `| mask[c]`：按位或只有在两边都是 0 时结果才是 0。因此，只有“前一个前缀已经匹配”并且“当前位置字符也相等”，新的前缀才保持匹配。

例如 $P=\text{aba}$，从右向左分别是第 0、1、2 位：

```text
mask['a'] = 010
mask['b'] = 101
```

扫描 $I=\text{ababa}$ 时，只看 `state` 的低 3 位：

| 读入字符 | `state` | 含义 |
| --- | --- | --- |
| 初始 | `111` | 没有前缀匹配 |
| `a` | `110` | 第 0 位为 0，匹配前缀 `a` |
| `b` | `101` | 第 1 位为 0，匹配前缀 `ab` |
| `a` | `010` | 最高位为 0，匹配到 `aba` |
| `b` | `101` | 匹配前缀 `ab` |
| `a` | `010` | 再次匹配到 `aba` |

所以只要第 $m-1$ 位为 0，就找到了一个完整匹配。

代码中的 `state = -1` 表示所有位初始为 1；`mask.get(ch, -1)` 表示模式串中没有字符 `ch` 时，所有位置都不匹配。

```python
def shift_or(input_str: str, pattern: str) -> list[int]:
    n, m = len(input_str), len(pattern)
    if m == 0:
        return list(range(n + 1))
    if m > n:
        return []

    # mask[c] 的第 i 位为 0，当且仅当 pattern[i] == c
    mask: dict[str, int] = {}
    for i, ch in enumerate(pattern):
        mask[ch] = mask.get(ch, -1) & ~(1 << i)

    state = -1
    full = 1 << (m - 1)
    positions = []

    for i, ch in enumerate(input_str):
        state = (state << 1) | mask.get(ch, -1)
        if (state & full) == 0:
            positions.append(i - m + 1)

    return positions
```


## boyer-moore

bm是当今最高效的匹配算法，将适配后缀信息利用到了极致

oiwiki按照论文脉络展开，比较晦涩

按照其他科普文的顺序展开

设 $I$ 和 $P$ 从右往左匹配时，输入串的位置 $n'$ 与模式串的位置 $m'$ 失配。下面在代码中分别用 `bad_char = I[n']` 和 `mismatch_index = m'` 表示坏字符与模式串的失配位置。

### 坏字符规则

输入串中导致失配的字符 `bad_char` 称为坏字符。

在模式串失配位置的左侧，寻找坏字符最靠右的一次出现，并将它与输入串中的坏字符对齐。若不存在，则直接越过坏字符。

```python
def bad_character_shift(
    pattern: str,
    mismatch_index: int,
    bad_char: str,
) -> int:
    # 只搜索 pattern[0:mismatch_index]
    last = pattern.rfind(bad_char, 0, mismatch_index)

    # last == -1 时，结果自然是 mismatch_index + 1
    return mismatch_index - last
```

### 好后缀规则

失配位置右侧已经匹配的部分称为好后缀，即 `pattern[mismatch_index + 1:]`。注意，好后缀不包含失配字符。

好后缀规则分为两步。

#### 1. 寻找好后缀的另一次完整出现

从模式串末尾之前寻找好后缀的另一次出现。搜索范围排除最后一个字符，是为了排除原始好后缀；另一次出现仍然可以与它重叠。

#### 2. 找不到完整出现时，使用前后缀对齐

若找不到完整出现，则从长到短检查好后缀的各个后缀，寻找同时也是模式串前缀的最长一段。

完整规则可以直接写成：

```python
def good_suffix_shift(pattern: str, mismatch_index: int) -> int:
    m = len(pattern)
    suffix = pattern[mismatch_index + 1:]

    # 最右侧字符立即失配，没有好后缀信息
    if not suffix:
        return 1

    # 在原始好后缀之前寻找另一段完整出现。
    # rfind 的结束位置不包含 m - 1，因此不会找到末尾的原始好后缀。
    occurrence = pattern.rfind(suffix, 0, m - 1)
    if occurrence != -1:
        return mismatch_index + 1 - occurrence

    # 找不到完整出现：将好后缀的最长后缀与模式串前缀对齐
    for length in range(len(suffix) - 1, 0, -1):
        if suffix[-length:] == pattern[:length]:
            return m - length

    # 连一个字符的前后缀都无法对齐
    return m
```

例如 $P=\text{ABCDAB}$，若在 $m'=2$ 处失配，则好后缀为 `DAB`。模式串左侧没有另一段完整的 `DAB`，但好后缀的后缀 `AB` 同时也是模式串的前缀，所以 $k=2$，模式串向右移动 $m-k=6-2=4$ 位。

实际移动时，同时计算两个规则，取较大的安全位移：

```python
bad_shift = bad_character_shift(pattern, mismatch_index, bad_char)
good_shift = good_suffix_shift(pattern, mismatch_index)
start += max(bad_shift, good_shift)
```

这里的函数直接搜索字符串，目的是说明规则。完整 BM 实现通常会预先生成坏字符表与好后缀表，避免每次失配都重新搜索。

### 工程实践

完整 BM 需要同时预处理坏字符表和好后缀表。工程中常用更简单的变体，以放弃部分移动信息为代价，减少预处理和实现复杂度。

#### BMH

Boyer–Moore–Horspool 只保留类似坏字符的移动规则，不再根据实际失配位置和好后缀计算位移。

设当前窗口为 $I[s..s+m-1]$。BMH 仍然从右向左比较，但无论在哪里失配，都观察当前窗口最右侧的字符：

$$
c=I[s+m-1]
$$

为了保证窗口向右移动，预处理时只搜索 $P[0..m-2]$，不包含模式串的最后一个字符：

$$
shift_{BMH}(c)=
\begin{cases}
m-1-last\_pos(c,P[0..m-2]), & c\in P[0..m-2] \\
m, & c\notin P[0..m-2]
\end{cases}
$$

例如 $P=\text{ABCD}$：

| 字符 | `A` | `B` | `C` | 其他字符 |
| --- | --- | --- | --- | --- |
| 位移 | 3 | 2 | 1 | 4 |

字符越靠近模式串右侧，位移越小；字符不在模式串中时，可以直接移动整个模式串长度。

```python
def boyer_moore_horspool(input_str: str, pattern: str) -> list[int]:
    n, m = len(input_str), len(pattern)
    if m == 0:
        return list(range(n + 1))
    if m > n:
        return []

    # 默认移动 m；相同字符只保留最靠右的一次出现
    shift: dict[str, int] = {}
    for i in range(m - 1):
        shift[pattern[i]] = m - 1 - i

    positions = []
    start = 0

    while start <= n - m:
        j = m - 1
        while j >= 0 and pattern[j] == input_str[start + j]:
            j -= 1

        if j < 0:
            positions.append(start)

        end_char = input_str[start + m - 1]
        start += shift.get(end_char, m)

    return positions
```

#### BMS

这里将 Boyer–Moore–Sunday（通常直接称为 Sunday 或 Quick Search）记作 BMS。

BMS 在当前窗口中完成比较后，不观察失配字符，也不观察窗口末尾字符，而是观察**窗口右侧的下一个字符**：

$$
c=I[s+m]
$$

下一次窗口一定包含这个字符，或者直接越过它：

- 若 $c$ 出现在模式串中，将模式串中最靠右的 $c$ 与它对齐；
- 若 $c$ 不在模式串中，下一次匹配可以直接从它的右侧开始。

因此：

$$
shift_{BMS}(c)=
\begin{cases}
m-last\_pos(c,P), & c\in P \\
m+1, & c\notin P
\end{cases}
$$

仍以 $P=\text{ABCD}$ 为例：

| 窗口后字符 | `A` | `B` | `C` | `D` | 其他字符 |
| --- | --- | --- | --- | --- | --- |
| 位移 | 4 | 3 | 2 | 1 | 5 |

```python
def boyer_moore_sunday(input_str: str, pattern: str) -> list[int]:
    n, m = len(input_str), len(pattern)
    if m == 0:
        return list(range(n + 1))
    if m > n:
        return []

    # 默认移动 m + 1；相同字符只保留最靠右的一次出现
    shift: dict[str, int] = {}
    for i, ch in enumerate(pattern):
        shift[ch] = m - i

    positions = []
    start = 0

    while start <= n - m:
        j = m - 1
        while j >= 0 and pattern[j] == input_str[start + j]:
            j -= 1

        if j < 0:
            positions.append(start)

        # 当前窗口已经抵达输入串末尾，没有“窗口后字符”
        if start + m >= n:
            break

        next_char = input_str[start + m]
        start += shift.get(next_char, m + 1)

    return positions
```

BMH 和 BMS 的预处理都是 $O(m)$，额外空间与模式串中不同字符的数量有关。两者最坏时间复杂度仍为 $O(nm)$，但在普通文本上经常可以一次跳过多个字符，实现也比完整 BM 简单。

todo: trie ac

## ref

1. [OI WIKI](https://oi-wiki.org/string/bm/) https://oi-wiki.org/string/bm/

2. [4.5 Boyer Moore 算法](https://algo.itcharge.cn/04_string/04_05_string_boyer_moore/) https://algo.itcharge.cn/04_string/04_05_string_boyer_moore/

3. [图解BM（Boyer-Moore）字符串匹配算法+代码实现](https://www.cnblogs.com/lin0/p/16246135.html) https://www.cnblogs.com/lin0/p/16246135.html

4. [shift-and,shift-or算法](https://www.cnblogs.com/waby/p/15857139.html) https://www.cnblogs.com/waby/p/15857139.html