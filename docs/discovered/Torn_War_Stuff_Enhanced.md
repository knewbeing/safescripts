---
title: "Torn战争信息增强"
---

# Torn战争信息增强

`游戏辅助`  `信息展示`  `状态管理`  `Torn`  `帮派管理`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Torn_War_Stuff_Enhanced.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**2.0**　　发现时间：**2026-07-06**　　来源：[GreasyFork](https://greasyfork.org/scripts/529238-torn-war-stuff-enhanced) <Badge type="tip" text="GreasyFork" />　　安装量：**8,655**　　评分：👍1 / 👎0

## 功能介绍

本脚本在 Torn 游戏的帮派战争页面显示玩家的旅行状态和住院时间，并支持按住院时间排序，方便管理和查看成员状态。

## 适用网站

- Torn 城市游戏

## 使用方法

1. 安装脚本后，进入 Torn 的帮派页面。
2. 页面会自动显示成员的旅行状态和住院时间。
3. 可根据住院时间对成员列表进行排序，无需额外操作。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_addStyle` | 用于添加自定义样式，让页面显示更美观。 |
| `GM_registerMenuCommand` | 允许在脚本菜单中添加自定义命令，方便用户操作。 |
| `GM_xmlhttpRequest` | 用于向外部接口（如 Torn API）发送网络请求，获取玩家状态信息。 |
| `unsafeWindow` | 允许脚本访问和操作页面的原始窗口对象，增强功能。 |

## 安全分析

::: info 等待分析
安全分析将在下次流水线运行时自动更新。
:::

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/529238-torn-war-stuff-enhanced)*
