---
template: "post"
date: 2019-12-29
title: "AtCoder AGC 041 A, B, C"
emoji: 🐎
category: "競プロ"
tags:
  - AtCoder
---

# A. Table Tennis Training

## 概要

[問題](https://atcoder.jp/contests/agc041/tasks/agc041_a)

$2N$人の選手が、$N$台の卓で試合をする。  
勝った選手は1つ前の卓に、負けた選手は1つ後ろの卓に移動する。
卓1で勝った選手と卓$N$で負けた選手は留まる。  
$A$番目の卓と$B$番目の卓で試合を始める2人の選手が自分の勝敗を自由にできるとき、
この2人が試合をするまでに最小何試合必要か。

## 解法

$A$と$B$の差が偶数であれば、お互いに近づくのが最短。  
そうでないとき、左端か右端で1回だけ留まってからお互いに近づくのが最短。

```cpp
int main() {
  long long n, a, b; cin>>n>>a>>b;

  long long d = b - a, l = a-1, r = n-b;
  long long ans = LLINF;

  if (d % 2 == 0) ans = min(ans, d / 2);
  else {
    ans = min(ans, l + 1 + d / 2);
    ans = min(ans, r + 1 + d / 2);
  }

  print(ans);

  return 0;
}
```

# B. Voting Judges

## 概要

[問題](https://atcoder.jp/contests/agc041/tasks/agc041_b)

$N$問の問題があり、問題$i$のスコアは$A_i$である。
$M$人のジャッジが好きな$V$問に投票し、それらのスコアを1ずつ上げる。  
投票が終わったあと、$N$問のうちスコアの高い$P$問が採用される。
同スコアのものの採用順序はジャッジ長が任意に採用する。  
採用される可能性を持つ問題は何問あるか。

## 解法

スコア$T$を持つ問題が採用される可能性がある（ない）とき、スコア$T+1$以上（$T-1$以下）の問題は採用される可能性がある（ない）。  
ので、ソートして何番目にスコアの大きい問題まで採用される可能性があるかを二分探索する。

問題$i$が採用される可能性があるかを考える。  
まず、$i$に$M$人が投票する。このとき、$A_i + M$よりスコアの大きい問題が$X$個とすると、$X \geq P$であれば$i$は採用される可能性がない。

次に、$i$のスコアが$P$位以内であることを保ちつつ、投票していく。

1. $A_i + M$よりスコアの大きい問題$X$個それぞれに$M$人が投票する。
2. $A_i + M$とスコアの等しい問題について、$X+Y \lt P$であるような最大の$Y$個まで、$M$人が投票する。
3. $A_i + M$よりスコアの小さい問題$j$について、${\rm min}(M, A_i - A_j)$ずつ投票する。

これで投票数を最大化でき、このときに投票数が$M \times V$以上であれば採用される可能性があり、未満であれば採用される可能性はない。

```cpp
int main() {
  int n; cin>>n;
  long long m, v, p; cin>>m>>v>>p;
  vector<long long> a(n);
  rep(i, n) cin>>a[i];
  sort(a.begin(), a.end());

  int ng = -1, ok = n;
  while (ng + 1 < ok) {
    int mid = (ng + ok) / 2;
    bool good = true;
    int x = a[mid] + m;

    int large_idx = lower_bound(a.begin(), a.end(), x+1) - a.begin();
    int large = n - large_idx;
    if (large >= p) good = false;

    int same_idx = lower_bound(a.begin(), a.end(), x) - a.begin();
    int rem_prob = p - (n - same_idx + 1);
    long long rem_vote = m * (v - 1 - large);
    int same = large_idx - same_idx;
    rep(i, same) {
      if (large + i + 1 >= p) break;
      if (rem_prob > 0) {
        rem_vote -= m;
        --rem_prob;
      }
    }
    RREP(i, same_idx, 0) {
      if (i == mid) continue;
      if (rem_prob > 0) {
        rem_vote -= m;
        --rem_prob;
      } else {
        rem_vote -= min(m, x - a[i]);
      }
    }
    if (rem_vote > 0) good = false;

    if (good) ok = mid;
    else ng = mid;
  }

  print(n - ok);

  return 0;
}
```

# C. Domino Quality

## 概要

[問題](https://atcoder.jp/contests/agc041/tasks/agc041_c)

$N$行$N$列の盤面に、$1 \times 2$の大きさのドミノ牌を何枚か置こうとしている。  
盤面の各行（列）について、その行（列）の1マス以上を占める牌の数をその行（列）のクオリティとする。  
どの行、列のクオリティも等しくなるような牌の置き方を求めよ。

## 解法

とりあえず実験してみる。  
$N=2$のとき、クオリティが等しくなるような置き方は存在しない。  
$N=3$のとき、クオリティが$1, 2$になるような置き方が存在。  
$N=4, 5, 6, 7$のとき、クオリティが$3$になるような置き方が存在。

盤面を正方形領域に区切って、斜めに構成していけばよさそう。  
$N \geq 4$のとき、$4 \times 4$ずつ斜めに当てはめていって、残った$y \times y\ ( 4 \leq y \leq 7)$の領域を最後に当てはめればいい。

```cpp
vector<string> b3 = {
  "aa.",
  "..b",
  "..b"
};
vector<string> b4 = {
  "abcc",
  "abdd",
  "eegh",
  "ffgh"
};
vector<string> b5 = {
  ".aabc",
  "d..bc",
  "d.eef",
  "ggh.f",
  "iihjj"
};
vector<string> b6 = {
  "aabcc.",
  "d.b..f",
  "dee..f",
  "gg.hhi",
  "..jk.i",
  "..jkll"
};
vector<string> b7 = {
  "abbcc..",
  "a.dee..",
  "ffd..gg",
  "hi...jj",
  "hi...kk",
  "..lmn..",
  "..lmn.."
};

void fill(int k, int x, vector<string> &board) {
  if (k == 4) rep(i, 4) rep(j, 4) board[x+i][x+j] = b4[i][j];
  if (k == 5) rep(i, 5) rep(j, 5) board[x+i][x+j] = b5[i][j];
  if (k == 6) rep(i, 6) rep(j, 6) board[x+i][x+j] = b6[i][j];
  if (k == 7) rep(i, 7) rep(j, 7) board[x+i][x+j] = b7[i][j];
}

int main() {
  int n; cin>>n;
  vector<string> board(n, string(n, '.'));

  if (n == 2) {
    print(-1);
  } else if (n == 3) {
    print(b3);
  } else {
    int r = n % 4 + 4;
    int m = (n - r) / 4;
    rep(i, m) fill(4, i*4, board);
    fill(r, m*4, board);
    print(board);
  }

  return 0;
}
```
