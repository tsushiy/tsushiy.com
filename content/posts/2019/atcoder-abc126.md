---
template: "post"
date: 2019-05-20
title: "AtCoder ABC 126 F"
emoji: 🐎
category: "競プロ"
tags:
  - AtCoder
---

問題 <https://atcoder.jp/contests/abc126/tasks>

# F - XOR Matching

## 問題

以下を満たす長さ$2^{M+1}$の数列$a$を構築せよ。

* $a$は$0$以上$2^M$未満の整数をそれぞれちょうど2つずつ含む。
* 任意の$a_i=a_j$を満たす$i, j$について、その範囲の要素の総XORが$K$である。

## 解法

$M\neq 1$のとき、$2^M$までの総XORが0となるので、$K<2^M$であれば、

```text
0 1 ... K-1 K+1 ... 2^M-1 K 2^M-1 ... K+1 K-1 ... 1 0 K
```

として構築できる。

$M=3, K=4$の例

```text
0 1 2 3 5 6 7 4 7 6 5 3 2 1 0 4
```

$K\ge 2^M$だと構築できず、$M=1$だけコーナーケース。

重要：$2^M$未満の総XORは0

```python
m, k = list(map(int, input().split()))

if m==1:
  if k==0:
    print("0 0 1 1")
  else:
    print(-1)
  exit()

if k>=2**m:
  print(-1)
  exit()

ans = []
for i in range(2**m):
  if i==k:
    continue
  ans.append(i)
ans.append(k)
for i in range(2**m-1, -1, -1):
  if i==k:
    continue
  ans.append(i)
ans.append(k)
print(*ans)
```
