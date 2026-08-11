---
title: "bloom 过滤器"
date: 2026-07-04

category: "算法"
---

假如你维护了一个server。

有一天发现每次请求都查一次db太慢了，于是套了一层缓存。
缓存的实现是loading cache。

然后过了几天发现，大量的请求一直在查一个不存在的资源导致cache miss。

bloom过滤器可以解决这类问题。

## 原理

```python
import hashlib


class BloomFilter:
    """可能存在误判（假阳性），但不存在漏判（假阴性）。"""

    def __init__(self, size: int, hash_count: int = 3) -> None:
        self.size = size
        self.hash_count = hash_count
        self.bits = bytearray((size + 7) // 8)

    def _indexes(self, item: str) -> list[int]:
        indexes = []
        for i in range(self.hash_count):
            digest = hashlib.blake2b(f"{item}:{i}".encode(), digest_size=8).digest()
            indexes.append(int.from_bytes(digest, "big") % self.size)
        return indexes

    def add(self, item: str) -> None:
        for idx in self._indexes(item):
            self.bits[idx // 8] |= 1 << (idx % 8)

    def might_contain(self, item: str) -> bool:
        for idx in self._indexes(item):
            if not (self.bits[idx // 8] & (1 << (idx % 8))):
                return False
        return True


if __name__ == "__main__":
    bf = BloomFilter(size=1024, hash_count=3)
    for key in ("user:42", "user:99"):
        bf.add(key)

    print(bf.might_contain("user:42"))   # True
    print(bf.might_contain("user:404"))  # False，大概率不存在
```

## 测试与验证

### Case 说明
模拟文章开头提到的“缓存穿透”场景。假设数据库中只存在 `user:42` 和 `user:99` 两个有效用户，恶意请求或错误请求一直在试图访问不存在的 `user:404`。我们希望通过 Bloom Filter 在请求到达缓存或数据库前将其拦截。

### 测试方式
1. 初始化一个容量为 `1024` 位、哈希次数为 `3` 的 Bloom Filter 实例。
2. 将已知存在的资源键（`user:42` 和 `user:99`）通过 `add` 方法录入过滤器中。
3. 分别模拟正常请求和异常请求，调用 `might_contain` 方法判断资源是否存在：
   - **正常请求**：查询已录入的 `user:42`。
   - **异常请求**：查询未录入的 `user:404`。

### 验证方式
将上述 Python 代码保存并运行，观察终端输出结果：
- 第一行输出应为 `True`：表示 `user:42` **可能存在**，请求被放行去查缓存/DB（且一定会命中）。
- 第二行输出应为 `False`：表示 `user:404` **绝对不存在**，直接在 Bloom Filter 层拒绝该请求。

这一结果验证了 Bloom Filter 能够通过少量内存开销，有效拦截不存在的资源请求，保护了底层的缓存和数据库。

## 数学证明

假设使用 $k$ 次哈希，位图（Bit Array）长度为 $m$，共插入 $n$ 个元素。
我们来计算误判率（False Positive Rate），即查询一个不存在的元素时，其对应的 $k$ 个位置恰好全为 1 的概率。

1. **单个位未被置 1 的概率**
   一次哈希将某一位设为 1 的概率是 $\frac{1}{m}$，所以该位未被置 1 的概率为：
   $$ 1 - \frac{1}{m} $$

2. **经过 k 次哈希后，单个位仍未被置 1 的概率**
   $$ \left( 1 - \frac{1}{m} \right)^k $$

3. **插入 n 个元素后，单个位仍未被置 1 的概率**
   $$ \left( 1 - \frac{1}{m} \right)^{kn} $$

4. **利用极限近似化简**
   当 $m$ 较大时，利用重要极限 $\lim_{x \to \infty} (1 - \frac{1}{x})^x = e^{-1}$：
   $$ \left( 1 - \frac{1}{m} \right)^{kn} = \left( \left( 1 - \frac{1}{m} \right)^m \right)^{kn/m} \approx e^{-\frac{kn}{m}} $$

5. **单个位被置 1 的概率**
   $$ 1 - e^{-\frac{kn}{m}} $$

6. **误判率（False Positive Rate）**
   查询不存在的元素时，假阳性发生的条件是这 $k$ 个位置都被置为 1。其概率（记为 $\epsilon$）近似为：
   $$ \epsilon \approx \left( 1 - e^{-\frac{kn}{m}} \right)^k $$

通过求导可以得出，当 $n$ 和 $m$ 固定时，使得误判率 $\epsilon$ 最小的最优哈希次数 $k$ 为：
$$ k = \frac{m}{n} \ln 2 \approx 0.693 \frac{m}{n} $$
