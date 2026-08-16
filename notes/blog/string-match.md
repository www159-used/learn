---
title: "字符串匹配算法"
date: 2026-07-07

category: "算法"
---

这节将讨论字符串匹配的前世今生。

感谢[OI WIKI](https://oi-wiki.org/string/bm/)

稍微晦涩了一点。
以及rust雌小鬼让我汗颜。

因此新开一篇，也当作是复习。

使用略微形式化的风格。

问题：

串即字符串。

定义模式串`Pattern`（后文简称`P`）。
定义输入串`Input`（后文简称`I`）。找到`I`中所有`P`出现的位置。

记 `|P| = m`，`|I| = n`。

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

参考数据结构课程，这里简单讲一遍。
todo: 简单过一遍

时间复杂度O(m+n)，空间复杂度O(m)。

## shift-or和shift-and

基于位的匹配算法，适合短模式串。
可以向量化。工业界泛用，但是学术界没有存在感。

```python
def shift_or(input_str: str, pattern: str) -> list[int]:
    n, m = len(input_str), len(pattern)
    if m == 0:
        return list(range(n + 1))
    if m > n:
        return []

    # mask[c] 的第 i 位为 0 当且仅当 pattern[i] == c；未出现的字符为全 1
    mask: dict[str, int] = {ch: -1 for ch in set(input_str) | set(pattern)}
    for i, ch in enumerate(pattern):
        mask[ch] &= ~(1 << i)

    state = -1  # 初始全 1
    positions = []

    for i, ch in enumerate(input_str):
        state = (state << 1) | mask.get(ch, -1)
        if (state & (1 << (m - 1))) == 0:
            positions.append(i - m + 1)

    return positions

def shift_and(input_str: str, pattern: str) -> list[int]:
    n, m = len(input_str), len(pattern)
    if m == 0:
        return list(range(n + 1))
    if m > n:
        return []

    # mask[c] 的第 i 位为 1 当且仅当 pattern[i] == c
    mask: dict[str, int] = {}
    for i, ch in enumerate(pattern):
        mask[ch] = mask.get(ch, 0) | (1 << i)

    state = 0
    full = 1 << (m - 1)  # 第 m-1 位置 1 表示完整匹配
    positions = []

    for i, ch in enumerate(input_str):
        state = ((state << 1) | 1) & mask.get(ch, 0)
        if state & full:
            positions.append(i - m + 1)

    return positions
```

时间复杂度O(n)，空间复杂度O(n^2)。


## boyer-moore

bm是当今最高效的匹配算法。利用后缀信息来减少没必要的匹配

todo: 占个坑
