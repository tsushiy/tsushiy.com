---
date: 2019-05-29
title: "AtCoder ABC 128 D, E, F"
emoji: 🐎
template: "post"
category: "競プロ"
tags:
  - AtCoder
---

問題 <https://atcoder.jp/contests/abc128/tasks>

# D - equeue

詰める操作は最後にまとめて行えばいい。  
右からA個、左からB個取り、K-A-B個を負で絶対値の大きいものから詰め直す。  
A, Bについて全探索で間に合う。

```python
n, k = list(map(int, input().split()))
v = list(map(int, input().split()))
ans = 0

from heapq import heappush, heappop
for i in range(1, k+1): #i個取り出す
  for j in range(0, i+1): #左からj個取り出す
    minus = []
    l = min(n, j)
    r = min(n-l, i-l)
    cur = 0
    for ll in range(l):
      cur += v[ll]
      if v[ll]<0:
        heappush(minus, v[ll])
    for rr in range(r):
      cur += v[n-rr-1]
      if v[n-rr-1]<0:
        heappush(minus, v[n-rr-1])
    rm = k-l-r
    while rm>0 and len(minus)>0:
      rm -= 1
      cur -= heappop(minus)
    ans = max(ans, cur)
print(ans)
```

# E - Roadwork

## 問題

東西に続く通りで$N$回工事が行われる。  
$i$番目の工事は時刻$S_i-0.5$から$T_i-0.5$まで$X_i$を通行止めにする。  
$i$番目の人は時刻$D_i$に座標0を出発し、通行止めに差し掛かったら、そこで止まる。  
$Q$人それぞれが進む距離を求めよ。

## 解法

$X$でソートして、$S_i-X_i$から$T_i-X_i$までの時間にスタートする人の到達距離を順に決めていく。  
決めた人を2回見ないように工夫すると間に合う。

```python
from bisect import bisect_left
import sys
n, Q = [int(x) for x in sys.stdin.readline().split()]
stx = [[int(x) for x in sys.stdin.readline().split()] for i in range(n)]
q = [int(sys.stdin.readline()) for i in range(Q)]
stx.sort(key=lambda x: x[2])
ans = [-1 for i in range(Q)]
skip = [-1 for i in range(Q)]

for (s, t, x) in stx:
  begin = bisect_left(q, s-x)
  end = bisect_left(q, t-x)
  while begin<end:
    if skip[begin]==-1:
      ans[begin] = x
      skip[begin] = end
      begin += 1
    else:
      begin = skip[begin]
for e in ans:
  print(e)
```

入力を`list(map(int, input().split()))`にしたらPyPyはTLE、Pythonは1946msで、`sys.stdin.readline()`にしたらPyPyで1240ms、Pythonで1294msだった。

# F - Frog Jump

## 問題

$N$個の蓮が一列に浮かんでいて、それぞれに得点$s_i$が与えられている。  
初め座標0におり、以下の手順でゲームを行う。  
一度踏んだ座標は消滅する。

1. 正の整数$A, B$を決める。
2. 位置$i$を$A$進め、得点を$s_i$増加させる。
3. 位置$i$を$B$戻り、得点を$s_i$増加させる。 

最適に$A, Bを$決めたときの最終得点を求めよ。

## 解法

同じマスを踏んだ場合や、[0, $N-1$]をはみ出た場合は最適にならないので除外していい。

最終的に$N-1$にいるので、[0, $N-1$]の間で踏むマスは左右対称になる。  
つまり、$k=A-B$として、左と右からそれぞれ$k$マス置きのマスを踏めることになる。  

一見$O(N^2)$っぽいけどループの中が調和級数になるので、$O(N\log N)$でできる。  

```python
n = int(input())
s = list(map(int, input().split()))
ans = 0
for i in range(1, n):
  l = 0
  r = n-1
  cur = 0
  while True:
    l += i
    r -= i
    if l>=n or r<=i or (r%i==0 and r<=l):
      break
    cur += s[l] + s[r]
    ans = max(ans, cur)
print(ans)
```
