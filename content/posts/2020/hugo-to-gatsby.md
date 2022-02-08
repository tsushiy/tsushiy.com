---
template: "post"
date: 2020-03-05
title: "HugoからGatsbyに乗り換えた"
cover: "../../covers/gatsbyjs-icon.png"
category: "Tech"
tags:
---

サイトのビルドをHugoからGatsbyに変えました。

> Gatsby is a free and open source framework based on React that helps developers build blazing fast websites and apps (https://www.gatsbyjs.org/)

Gatsbyを使うと、とにかく速いサイトが出来上がります。[Gatsbyのサイト](https://www.gatsbyjs.org/)も[Gatsbyで生成](https://github.com/gatsbyjs/gatsby/tree/master/www)されてます。

# Hugoの所感

今まで使っていたHugoは、ビルドが爆速で、公開されてるテーマも多くて便利です。

ただ、テーマをカスタマイズして使うのは手間で、Hugo特有のShortcode形式でHTMLを部品に分けて書くことに馴染めませんでした。
予め用意したHTMLテンプレートをMarkdownに埋め込めるShortcodeは便利ですが、MarkdownがHugoに依存してしまうのは嬉しくないので積極的には使いませんでした。

# 乗り換えてみて

* SPAになり、ページ遷移がスムーズ
* Reactのエコシステムの多くを使えるので楽にモダンなサイトが作れる
  * Reactそのままという訳ではなく、GatsbyのPluginを併用しないと期待した動作にならなかったりするので注意

GatsbyもHugoと同様にstarterが色々公開されていて、それを使うと手っ取り早く作れます。  
このサイトは[Gatsby Advanced Starter](https://github.com/vagr9k/gatsby-advanced-starter/)をベースに作りました。

このブログのリポジトリ: [tsushiy/tsushiy.com](https://github.com/tsushiy/tsushiy.com)
