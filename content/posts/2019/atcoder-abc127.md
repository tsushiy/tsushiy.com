---
date: 2019-05-27
title: "AtCoder ABC 127 D, E, F"
emoji: 🐎
template: "post"
category: "競プロ"
tags:
  - AtCoder
---
問題 <https://atcoder.jp/contests/abc127/tasks>

# D - Integer Cards

最も小さいものを最も大きいもので書き換えていくのが最適。  
$A$を昇順、$(B, C)$を$C$の降順でソートして順に見ていけばいい。

```python
n, m = list(map(int, input().split()))
a = list(map(int, input().split()))
a.sort()
b = [list(map(int, input().split())) for i in range(m)]
b.sort(key=lambda x: x[1], reverse=True)

from bisect import bisect_left
cur = 0
ans = 0
for e in b:
  t = bisect_left(a, e[1])
  if t>=cur:
    ans += min(t-cur, e[0])*e[1]
    cur += min(t-cur, e[0])
while cur<len(a):
  ans += a[cur]
  cur += 1
print(ans)
```

# E - Cell Distance

## 問題

$N$行$M$列のマス目に$K$個の駒を置く。  
任意の2駒の間のコストは、$x$座標の差の絶対値と$y$座標の差の絶対値の和で表される。  
駒の全ての配置のコストの総和を求めよ。

## 解法

$x$軸方向と$y$軸方向は独立に考えていい。  
任意の2点間のコストは、他の地点に$K-2$個の駒を置いたときの$\binom{N*M-2}{K-2}$通りに影響する。  
また、2点間の差が$d$になるパターンは、1次元で考えたときの$(M-d)$通りと、2つの駒それぞれが$y$座標のどこにあるかの$N*N$通りを掛けて、$(M-d)N^2$通りある。  
これを全部の$d$について足し合わせる。

```python
n, m, k = list(map(int, input().split()))

MAX = 2*10**5+1
MOD = 10**9+7
fact = [0 for i in range(MAX)]
inv = [0 for i in range(MAX)]
invfact = [0 for i in range(MAX)]

def comb_build(n):
  fact[0] = inv[0] = invfact[0] = 1
  fact[1] = inv[1] = invfact[1] = 1
  for i in range(2, n):
    fact[i] = fact[i-1]*i%MOD
    inv[i] = inv[MOD%i]*(MOD-MOD//i)%MOD
    invfact[i] = invfact[i-1]*inv[i]%MOD

def nCk(n, k):
  if n<k or n<0 or k<0:
    return 0
  return (((fact[n]*invfact[k])%MOD)*invfact[n-k])%MOD

comb_build(MAX)
ans = 0
t = nCk(n*m-2, k-2)
for i in range(1, n+1):
  ans += (((i*(n-i)*m*m)%MOD)*t)%MOD
for i in range(1, m+1):
  ans += (((i*(m-i)*n*n)%MOD)*t)%MOD
print(ans%MOD)
```

# F - Absolute Minima

## 問題

関数$f(x)$があり、はじめ、$f(x)=0$である。

$Q$個のクエリが与えられる。  
更新クエリでは、$g(x)=f(x)+|x-a|+b$として$f(x)$を$g(x)$で置き換える。  
求値クエリでは、$f(x)$の最小値を与える$x$で最小のものと、$f(x)$の最小値を出力せよ。

## 考えたこと

式を眺めると中央値で最小になることがわかるが、中央値の管理の仕方がわからない。

## 解法

maxheapとminheapの2つを使って前半と後半に分けて管理することで中央値の管理ができる。  
最小値は前半の総和と後半の総和を求めておけば計算できる。

```python
from heapq import heappop, heappush
Q = int(input())
maxh = []
minh = []
sum1 = sum2 = b = med = 0
for i in range(Q):
  q = list(map(int, input().split()))
  if q[0]==1:
    b += q[2]
    if len(maxh)==0 or q[1]<-maxh[0]:
      heappush(maxh, -q[1])
      sum1 += q[1]
      if len(maxh)>len(minh)+1:
        t = -heappop(maxh)
        heappush(minh, t)
        sum1 -= t
        sum2 += t
    else:
      heappush(minh, q[1])
      sum2 += q[1]
      if len(maxh)<len(minh):
        t = heappop(minh)
        heappush(maxh, -t)
        sum1 += t
        sum2 -= t
    med = -maxh[0]
  else:
    ans = len(maxh)*med-sum1+sum2-len(minh)*med+b
    print(med, ans)
```
