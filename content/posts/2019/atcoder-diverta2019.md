---
template: "post"
date: 2019-05-13
title: "AtCoder diverta 2019 E"
emoji: 🐎
category: "競プロ"
tags:
  - AtCoder
---

# E. XOR Partitioning

## 問題

<https://atcoder.jp/contests/diverta2019/tasks/diverta2019_e>

長さ$N$の数列$A$に0個以上の仕切りを入れたときに各区間のXORが等しくなるような分割の仕方の個数を$10^9+7$で割った余りを求めよ。

## 解法

$b$を$A$の累積XORをとった数列とする。

$b$を左から見ていって仕切りを入れる場所を選ぶ。  
区間のXORが$X$であると決め打つと、$X, 0, X, 0, ...$としか選べないことがわかる。  
したがって、$b_n=X≠0$のとき、$X, 0, X, 0, ..., X$となるように選べばよい。

$b_n=0$のとき、$b$に出現する全ての$X$について考えなければいけない。  
$X=0$のときは、$b$中の0の個数を$z$として、$2^{z-1}$となる。  
$X≠0$のときは、全ての$X$について全探索すると間に合わないが、状態遷移に$b$中の$0, X$以外の値が関係しないため$O(N)$のDPで求められる。

$b_i$を順番に見ていったとき、  
$\textrm{dp}[0][b_i]$を、$b_n=X=b_i≠0$のときの通り数とする(現在$b_i$を見ていて、そこで終わる場合)。  
$\textrm{dp}[1][b_i]$を、$b_n=0, X=b_i$のときの通り数とする(現在$b_i$を見ていて、あとに0が来て終わる場合)。  

$cnt$を$b_i$を以前に見つけた位置から現在の$b_i$までの間の0の個数とすると、  
$$\textrm{dp}[0][b_i] += \textrm{dp}[1][b_i]*cnt$$
$$\textrm{dp}[1][b_i] += \textrm{dp}[0][b_i]$$
と表せる。

したがって、  
$b_n=0$のとき、答えは$\textrm{dp}[0][b_n]$  
$b_n≠0$のとき、答えは$2^{z-1}+\sum_x \textrm{dp}[1][x]$

```python
n = int(input())
a = list(map(int, input().split()))
s = [0 for i in range(n)]
s[0] = a[0]
for i in range(1, n):
  s[i] = s[i-1]^a[i]

MOD = 10**9+7
dp = [[not j for i in range(1<<20)] for j in range(2)]
cnt = [0 for i in range(1<<20)]
z = 0
for i in range(n):
  if s[i]==0:
    z += 1
  dp[0][s[i]] = (dp[0][s[i]]+dp[1][s[i]]*(z-cnt[s[i]])%MOD)%MOD
  dp[1][s[i]] = (dp[1][s[i]]+dp[0][s[i]])%MOD
  cnt[s[i]] = z

if s[n-1]:
  print(dp[0][s[n-1]])
else:
  ans = pow(2, z-1, MOD)
  for i in range(1, 1<<20):
    ans = (ans+dp[1][i])%MOD
  print(ans)
```
