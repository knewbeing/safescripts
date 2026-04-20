---
title: "Torn战争信息增强"
---

# Torn战争信息增强

`游戏辅助`  `信息增强`  `Torn`  `界面优化`  `数据可视化`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Torn_War_Stuff_Enhanced.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.12**　　发现时间：**2026-04-20**　　来源：[GreasyFork](https://greasyfork.org/scripts/529238-torn-war-stuff-enhanced) <Badge type="tip" text="GreasyFork" />　　安装量：**5,446**　　评分：👍1 / 👎0

## 功能介绍

本脚本用于在 Torn 游戏的派系战争页面显示对方成员的旅行状态和住院时间，并可按住院时间排序。它还会高亮显示状态不同的成员，方便玩家快速获取关键信息。

## 适用网站

- Torn 游戏派系页面

## 使用方法

1. 安装脚本后，进入 Torn 的派系页面。
2. 首次使用时，点击脚本菜单中的“Set Api Key”并输入你的 Torn 公共 API 密钥。
3. 刷新页面后，派系成员列表会显示旅行状态和住院时间，并可按住院时间排序。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_addStyle` | 用于动态添加自定义样式，让页面显示更直观。 |
| `GM_registerMenuCommand` | 在脚本菜单中添加“设置 API Key”选项，方便用户输入 Torn API 密钥。 |
| `GM_xmlhttpRequest` | 用于向 Torn 官方 API 请求数据，获取最新的成员状态信息。 |

## 安全分析

::: info 等待分析
安全分析将在下次流水线运行时自动更新。
:::

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/529238-torn-war-stuff-enhanced)*
