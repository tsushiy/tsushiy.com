---
date: 2019-12-30
title: "AtCoder ABC 149 D, E, F"
emoji: 🐎
template: "post"
category: "競プロ"
tags:
  - AtCoder
---

# D. Prediction and Restriction

## 概要

[問題](https://atcoder.jp/contests/abc149/tasks/abc149_d)

ゲームの筐体と$N$回じゃんけんを行う。筐体が出す手は予め全てわかっている。  
プレイヤーがグーで勝ったら$R$点、チョキで勝ったら$S$点、パーで勝ったら$P$点を得られる。ただし、$K$回前のじゃんけんで出した手は出せない。  
ゲーム終了までに最大で何点得られるか。

## 解法

$K$回前に出した手のみに依存するため、$K$個のグループに分けて、
$i, i+K, i+2K, ... , (i+1), (i+1)+K, ...$のように考える。  
グループの中での最大の点数をDP[グループの中で何番目の手か][前回何の手を出したか]で計算していく。

```cpp
int main() {
  int n, k; cin>>n>>k;
  int r, s, p; cin>>r>>s>>p;
  string t; cin>>t;

  int ans = 0;
  rep(i, k) {
    int cur = i;
    int j = 0;
    vector<vector<int>> dp(n/k+10, vector<int>(4, 0));
    if (t[cur] == 'r') dp[j][3] = p;
    if (t[cur] == 's') dp[j][1] = r;
    if (t[cur] == 'p') dp[j][2] = s;
    cur += k;
    ++j;
    while (cur < n) {
      if (t[cur] == 'r') {
        dp[j][1] = max(dp[j-1][2], dp[j-1][3]);
        dp[j][2] = max(dp[j-1][1], dp[j-1][3]);
        dp[j][3] = max(dp[j-1][1] + p, dp[j-1][2] + p);
      }
      if (t[cur] == 's') {
        dp[j][1] = max(dp[j-1][2] + r, dp[j-1][3] + r);
        dp[j][2] = max(dp[j-1][1], dp[j-1][3]);
        dp[j][3] = max(dp[j-1][1], dp[j-1][2]);
      }
      if (t[cur] == 'p') {
        dp[j][1] = max(dp[j-1][2], dp[j-1][3]);
        dp[j][2] = max(dp[j-1][1] + s, dp[j-1][3] + s);
        dp[j][3] = max(dp[j-1][1], dp[j-1][2]);
      }
      cur += k;
      ++j;
    }
    int res = 0;
    rep(l, 4) res = max(res, dp[j-1][l]);
    ans += res;
  }
  print(ans);

  return 0;
}
```

# E. Handshake

## 概要

[問題](https://atcoder.jp/contests/abc149/tasks/abc149_e)

$N$人のゲストがおり、$i$人目のパワーは$A_i$である。  
左手で$x$と、右手で$y$と握手したとき、幸福度が$A_x+A_y$上がる。ただし、全く同じ握手を二回以上行ってはいけない。  
$M$回の握手の後に得られる幸福度の最大値を求めよ。

## 解法

まず、二分探索で$X$以上の幸福度を得られる握手が$M$通り以上あるような最大の$X$を求める。  
次に、$X$以上の幸福度を得られる握手全てを足したときの幸福度を求める。  
このとき、$M$より$T$回多く握手してしまっていたら、幸福度から$T \times X$引けばよい。（なぜなら、$X+1$以上の幸福度を得られる握手は$M$通り未満であるため）

```cpp
int main() {
  long long n, m; cin>>n>>m;
  vector<long long> a(n);
  rep(i, n) cin>>a[i];
  sort(a.begin(), a.end());

  vector<long long> acc(n+1, 0);
  rep(i, n) acc[i+1] = a[i] + acc[i];

  long long ok = 0, ng = LLINF;
  while (ok + 1 < ng) {
    long long mid = (ok + ng) / 2;
    long long cnt = 0;
    rep(i, n) {
      cnt += a.end() - lower_bound(a.begin(), a.end(), mid - a[i]);
    }
    if (cnt < m) ng = mid;
    else ok = mid;
  }

  long long ans = 0;
  long long cnt = 0;
  rep(i, n) {
    int idx = lower_bound(a.begin(), a.end(), ok - a[i]) - a.begin();
    cnt += n - idx;
    if (idx < n) ans += a[i] * (n-idx) + (acc[n] - acc[idx]);
  }
  if (cnt > m) ans -= ok * (cnt - m);
  print(ans);

  return 0;
}
```

# F. Surrounded Nodes

## 概要

[問題](https://atcoder.jp/contests/abc149/tasks/abc149_f)

$N$頂点の木が与えられる。$i$番目の辺は頂点$A_i$と$B_i$を結ぶ。  
$T$の各頂点を、それぞれ確率$1 / 2$で黒く、$1 / 2$で白く塗り、黒く塗られた頂点を全て含む最小の部分木を$S$とする。  
$S$に含まれる白く塗られた頂点の個数の期待値を求めよ。

## 解法

頂点$v$について、$v$を取り除いたときにできる部分木を$T_1, T_2, ...$とする。  
ここで、各$i$について、  
($T\_{i-1}$までの部分木に含まれる頂点がすべて白である確率)×($v$が白である確率)×
($T_i$に含まれる頂点の少なくとも1つが黒である確率)×($T\_{i+1}$以降の部分木に含まれる頂点の少なくとも1つが黒である確率)  
を求め、全ての$i$について足し合わせると、$v$が$S$に含まれる確率が求まる。  
これを全ての$v$について足し合わせればよい。

```cpp
int n;

int dfs(int par, int cur, vector<vector<int>> &graph, vector<vector<int>> &sub) {
  int sz = 1;
  for (auto nx: graph[cur]) {
    if (nx == par) continue;
    int t = dfs(cur, nx, graph, sub);
    sub[cur].emplace_back(t);
    sz += t;
  }
  if (sz != n) sub[cur].emplace_back(n - sz);
  return sz;
}

int main() {
  cin>>n;
  vector<vector<int>> graph(n), sub(n);
  rep(i, n-1) {
    int a, b; cin>>a>>b; --a; --b;
    graph[a].emplace_back(b);
    graph[b].emplace_back(a);
  }

  dfs(-1, 0, graph, sub);

  Mint<> ans = 0;
  rep(i, n) {
    int acc = 0;
    Mint<> t = 0;
    rep(j, sub[i].size()-1) {
      t += Mint<>(2).inv().pow(acc) *
           (Mint<>(1) - Mint<>(2).inv().pow(sub[i][j])) *
           Mint<>(2).inv() *
           (Mint<>(1) - Mint<>(2).inv().pow(n-1-acc-sub[i][j]));
      acc += sub[i][j];
    }
    ans += t;
  }
  print(ans);

  return 0;
}
```
