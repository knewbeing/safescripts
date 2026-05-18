---
title: "Nexus免等待下载增强版"
---

# Nexus免等待下载增强版

`下载加速`  `Nexus Mods`  `自动化`  `去广告`  `辅助工具`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Nexus_No_Wait.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**2.1.6**　　发现时间：**2026-05-18**　　来源：[GreasyFork](https://greasyfork.org/scripts/519037-nexus-no-wait) <Badge type="tip" text="GreasyFork" />　　安装量：**12,050**　　评分：👍26 / 👎2

## 功能介绍

本脚本可自动跳过 Nexus Mods 网站上的下载等待时间，自动开始下载，并支持多种下载方式（如手动、Vortex、MO2、NMM）。还能自动关闭下载页面、跳过依赖提示、隐藏会员推广等，提升下载体验。

## 适用网站

- Nexus Mods

## 使用方法

1. 1. 安装脚本后，访问 Nexus Mods 网站。
2. 2. 在下载页面，等待自动跳过倒计时并自动开始下载。
3. 3. 下载完成后，页面可自动关闭，无需手动操作。
4. 4. 如需调整功能，可在油猴菜单中找到脚本设置。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_getValue` | 用于读取和保存脚本的设置。 |
| `GM_setValue` | 用于保存用户的个性化设置。 |
| `GM.xmlHttpRequest` | 用于在脚本中发起网络请求，获取或操作网站数据。 |
| `GM_xmlhttpRequest` | 与 GM.xmlHttpRequest 类似，兼容不同环境下的网络请求。 |
| `GM_info` | 获取当前脚本的相关信息，如版本号。 |
| `GM_addStyle` | 为网页添加自定义样式，优化界面显示。 |
| `GM_registerMenuCommand` | 在油猴菜单中添加自定义命令，方便用户操作。 |

## 安全分析

::: info 等待分析
安全分析将在下次流水线运行时自动更新。
:::

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/519037-nexus-no-wait)*
