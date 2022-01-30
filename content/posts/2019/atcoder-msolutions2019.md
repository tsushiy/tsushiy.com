---
template: "post"
date: 2019-06-06
title: "AtCoder M-SOLUTIONS プロコンオープン C, D, E"
emoji: 🐎
category: "競プロ"
tags:
  - AtCoder
---

問題 <https://atcoder.jp/contests/m-solutions2019/tasks>

# C - Best-of-(2n-1)

## 問題

高橋くんと青木くんの一方が$N$回勝つまでゲームをする。  
1回ゲームを行ったとき、高橋くんの勝率は$\frac{A}{100}$, 青木くんの勝率は$\frac{B}{100}$, 引き分けの確率は$\frac{C}{100}$である。
ゲームが行われる回数の期待値を求めよ。

## 解法

ゲームがちょうど$M$回行われる確率を考える。これは、$M\le N-1$または$2N\le M$のとき、$0$となる。

まずは引き分けの無い場合を考えると、高橋くんが$M-1$回までで$N-1$回勝利し、$M$回目のゲームで高橋くんが勝利する場合を数え上げればいい。青木くんの場合も同様。

$$
\binom{M-1}{N-1} \left(\left(\frac{A}{100}\right)^N \left(\frac{B}{100}\right)^{M-N} + \left(\frac{A}{100}\right)^{M-N} \left(\frac{B}{100}\right)^{N}\right)
$$

引き分けのある場合も、引き分けでないゲームについては分母を$A+B$にすることで、引き分けが無い場合と同様に考えることができる。  

引き分けの確率は$c/100$であるため、引き分けでないゲームが起きるまでのゲームの回数の期待値は、$\frac{1}{1-c/100}$となる。
期待値の線形性から、$M$回引き分けでないゲームが行われる間に行われる全体のゲームの回数の期待値は、$M\cdot\frac{1}{1-c/100}$となる。  
したがって、求める答えは、

$$
\sum_{M=N}^{2N-1}\binom{M-1}{N-1} \left(\left(\frac{A}{A+B}\right)^N \left(\frac{B}{A+B}\right)^{M-N} + \left(\frac{A}{A+B}\right)^{M-N} \left(\frac{B}{A+B}\right)^{N}\right)M\cdot\frac{1}{1-c/100}
$$

```python
n, A, B, c = list(map(int, input().split()))

MOD = 10**9+7
MAX = 200000
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
a = A*pow(A+B, MOD-2, MOD)%MOD
b = B*pow(A+B, MOD-2, MOD)%MOD
c = 100*pow(100-c, MOD-2, MOD)%MOD

for i in range(n, 2*n):
  t1 = pow(a, n, MOD)%MOD*pow(b, i-n, MOD)%MOD
  t2 = pow(a, i-n, MOD)%MOD*pow(b, n, MOD)%MOD
  ans += nCk(i-1, n-1)*(t1+t2)%MOD*i*c%MOD
  ans %= MOD

print(ans)
```

# D - Maximum Sum of Minimum

スコアの小さいものの影響範囲を一番小さくしたいので、葉から貪欲に最も小さいコストを割り当てていく。

```python
import sys
from collections import defaultdict
sys.setrecursionlimit(10**7)

n = int(input())
graph = defaultdict(list)
edge = []
for i in range(n-1):
  a, b = list(map(int, input().split()))
  edge.append((a, b))
  graph[a].append(b)
  graph[b].append(a)
c = list(map(int, input().split()))
c.sort(reverse=True)
visited = [0 for i in range(n+1)]
ans = [0 for i in range(n+1)]
score = 0

def dfs(x):
  visited[x] = 1
  for next_ in graph[x]:
    if visited[next_]:
      continue
    dfs(next_)
  if all(visited[i] for i in graph[x]):
    ans[x] = c.pop()
    return
  visited[x] = 0

dfs(1)
for a, b in edge:
  score += min(ans[a], ans[b])
print(score)
print(*ans[1:])
```

# E - Product of Arithmetic Progression

## 問題

初項$x$, 公差$d$, 項数$n$の数列のすべての項の積を求めよ。  
この形式のクエリが$Q$個与えられる。

## 解法

$x=0$または$d=0$のとき、答えは$x^n$

$d\neq 1$の場合は、各項を$d$で割ることで、$d=1$の形にすることができる。  
このとき、答えは$d^n\cdot(x/d+n-1)!/(x/d-1)!$  
MOD演算上で$(x/d+n-1)\ge 1000003$であれば答えは$0$になる。

```python
MOD = 1000003
MAX = MOD
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

comb_build(MAX)

q = int(input())
for i in range(q):
  x, d, n = list(map(int, input().split()))
  if x==0 or d==0:
    print(pow(x, n, MOD))
    continue

  x = x*pow(d, MOD-2, MOD)%MOD
  if x+n-1>=MOD:
    print(0)
  else:
    ans = pow(d, n, MOD)*fact[x+n-1]*invfact[x-1]%MOD
    print(ans)
```
