---
title: "Torn战争信息增强"
---

# Torn战争信息增强

`游戏辅助`  `信息高亮`  `状态显示`  `数据排序`  `Torn`  `帮派管理`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Torn_War_Stuff_Enhanced.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.12**　　发现时间：**2026-04-27**　　来源：[GreasyFork](https://greasyfork.org/scripts/529238-torn-war-stuff-enhanced) <Badge type="tip" text="GreasyFork" />　　安装量：**5,753**　　评分：👍1 / 👎0

## 功能介绍

本脚本用于在 Torn 游戏的帮派战争页面显示成员的旅行状态和住院时间，并可按住院时间排序。它还通过颜色高亮不同状态，方便玩家快速了解成员情况。

## 适用网站

- Torn 城市游戏

## 使用方法

1. 安装脚本后，进入 Torn 的帮派页面。
2. 首次使用时，通过菜单命令设置你的 Torn 公共 API 密钥。
3. 页面会自动显示成员的旅行状态和住院时间。
4. 你可以根据住院时间对成员列表进行排序。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_addStyle` | 用于添加自定义样式，让页面显示更直观。 |
| `GM_registerMenuCommand` | 允许用户通过菜单设置 API 密钥，获取帮派信息。 |
| `GM_xmlhttpRequest` | 用于向 Torn 游戏的 API 请求数据，获取成员状态。 |

## 安全分析

::: info 等待分析
安全分析将在下次流水线运行时自动更新。
:::

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/529238-torn-war-stuff-enhanced)*
