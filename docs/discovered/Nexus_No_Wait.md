---
title: "Nexus免等待增强版"
---

# Nexus免等待增强版

`下载加速`  `自动化`  `Nexus Mods`  `跳过等待`  `工具增强`  `页面优化`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Nexus_No_Wait.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**2.1.1**　　发现时间：**2026-04-27**　　来源：[GreasyFork](https://greasyfork.org/scripts/519037-nexus-no-wait) <Badge type="tip" text="GreasyFork" />　　安装量：**10,367**　　评分：👍17 / 👎2

## 功能介绍

本脚本可自动跳过 Nexus Mods 网站的下载等待时间，自动开始下载，并支持多种下载方式（手动/Vortex/MO2/NMM）。它还能自动关闭下载页面、跳过文件需求提示、处理归档文件，并隐藏会员推广信息。

## 适用网站

- Nexus Mods

## 使用方法

1. 安装脚本后，访问 Nexus Mods 网站。
2. 在下载页面，等待时间会被自动跳过，下载自动开始。
3. 下载完成后，页面可自动关闭。
4. 如需调整功能，可在脚本设置中修改配置。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_getValue` | 用于读取用户配置数据。 |
| `GM_setValue` | 用于保存用户配置数据。 |
| `GM.xmlHttpRequest` | 用于发起网络请求，获取下载链接或数据。 |
| `GM_xmlhttpRequest` | 用于发起网络请求，兼容旧版脚本。 |
| `GM_info` | 用于获取当前脚本的信息，如版本号。 |
| `GM_addStyle` | 用于动态添加自定义样式，优化页面显示。 |
| `GM_listValues` | 用于列出所有已保存的配置项。 |
| `GM_deleteValue` | 用于删除指定的配置项。 |

## 安全分析

::: info 等待分析
安全分析将在下次流水线运行时自动更新。
:::

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/519037-nexus-no-wait)*
