---
date: 2019-06-11
title: "AtCoder ABC 129 E, F"
emoji: 🐎
template: "post"
category: "競プロ"
tags:
  - AtCoder
---

問題 <https://atcoder.jp/contests/abc129/tasks>

# E - Sum Equals Xor

## 問題

正整数$L$が与えられる。  
$a+b\leq L$ かつ $a+b=a\textrm{ XOR }b$ であるような非負整数$a, b$の組の数を求めよ。

## 解法

桁DPする。

ある桁に注目したとき、条件を満たす$(a,b)$のその桁の値は$(0, 0), (0, 1), (1, 0)$のいずれかになる。

$L$を上位桁から見ていく。  
注目している桁が0のとき、$a+b\leq L$以下が確定していれば、$(a,b)$はいずれの値もとれる。確定していなければ、$(0, 0)$しかとれない。  
注目している桁が1のとき、$(a,b)$はいずれの値もとれる。$a+b\leq L$以下が確定していなければ、$(0, 0)$をとれば$a+b\leq L$以下が確定。

```python
l = input()
MOD = 10**9+7
dp = [[0 for i in range(len(l)+1)] for i in range(2)]
dp[0][0] = 1

for i in range(1, len(l)+1):
  if l[i-1]=="0":
    dp[0][i] = (dp[0][i]+dp[0][i-1])%MOD
    dp[1][i] = (dp[1][i]+dp[1][i-1])%MOD
    dp[1][i] = (dp[1][i]+dp[1][i-1]*2)%MOD
  else:
    dp[0][i] = (dp[0][i]+dp[0][i-1]*2)%MOD
    dp[1][i] = (dp[1][i]+dp[0][i-1])%MOD
    dp[1][i] = (dp[1][i]+dp[1][i-1])%MOD
    dp[1][i] = (dp[1][i]+dp[1][i-1]*2)%MOD

print((dp[0][len(l)]+dp[1][len(l)])%MOD)
```

# F - Takahashi's Basics in Education and Learning

## 問題

項数$N$, 初項$A$, 公差$B$の等差数列がある。  
この数列の各項を十進法表記で順につなげて読んで出来る整数を、$M$で割ったあまりを求めよ。

## 解法

$d$桁の要素$C_d$値を$X$の末尾につなげる操作は、$X$を$10^d$倍して要素$s$を加え、$s=s+B$とする操作を$C_d$回繰り返すものと言える。  
これは、行列の積の形にでき、各$d$について行列を累乗して掛け合わせれば答えが求まる。

```python
class Matrix:

  def __init__(self, mat, mod=10**9+7):
    assert(len(mat) and len(mat[0]))
    from copy import deepcopy
    self.MOD = mod
    self.mat = deepcopy(mat)

  def matunit(n, mod=10**9+7):
    return Matrix([[(x==y) for x in range(n)] for y in range(n)], mod)

  def __mul__(self, other):
    assert(len(self.mat[0])==len(other.mat))
    h = len(self.mat)
    w = len(other.mat[0])
    ret = [[0 for _ in range(w)] for _ in range(h)]
    for y in range(h):
      for z in range(len(other.mat)):
        for x in range(w):
          ret[y][x] += self.mat[y][z]*other.mat[z][x]
    for y in range(h):
      for x in range(w):
        ret[y][x] %= self.MOD
    return Matrix(ret, mod=self.MOD)

  def __pow__(self, k):
    assert(len(self.mat)==len(self.mat[0]))
    from copy import deepcopy
    ret = Matrix.matunit(len(self.mat), self.MOD)
    n = Matrix(deepcopy(self.mat), mod=self.MOD)
    while k:
      if k&1:
        ret = ret * n
      n = n * n
      k >>= 1
    return ret

L, A, B, M = list(map(int, input().split()))

d = [0 for i in range(20)]
for i in range(1, 19):
  l = -1
  r = L
  while r-l>1:
    m = (l+r)//2
    if len(str(A+B*m))>i:
      r = m
    else:
      l = m
  d[i] = r

x = Matrix([[0, A, 1]], mod=M)
for i in range(1, 19):
  dt = d[i]-d[i-1]
  y = Matrix([[10**i, 0, 0], [1, 1, 0], [0, B, 1]], mod=M)
  y = y ** dt
  x *= y
print(x.mat[0][0])
```
