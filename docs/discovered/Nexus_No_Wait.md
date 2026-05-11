---
title: "Nexus 无等待增强版"
---

# Nexus 无等待增强版

`下载加速`  `自动化`  `Nexus Mods`  `跳过等待`  `页面优化`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Nexus_No_Wait.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**2.1.2**　　发现时间：**2026-05-11**　　来源：[GreasyFork](https://greasyfork.org/scripts/519037-nexus-no-wait) <Badge type="tip" text="GreasyFork" />　　安装量：**11,514**　　评分：👍20 / 👎2

## 功能介绍

本脚本可自动跳过 Nexus Mods 网站的下载等待时间，自动开始下载，并支持多种下载方式（如手动、Vortex、MO2、NMM）。还可自动关闭下载页面、跳过前置需求提示，并隐藏部分推广内容。让你在 Nexus Mods 上下载文件更加快捷高效。

## 适用网站

- Nexus Mods

## 使用方法

1. 1. 安装脚本后，访问 Nexus Mods 网站。
2. 2. 在下载页面，脚本会自动跳过等待并开始下载。
3. 3. 下载完成后，部分页面会自动关闭，无需手动操作。
4. 4. 如需调整脚本设置，可在脚本管理器中修改。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_getValue` | 用于读取用户的脚本设置。 |
| `GM_setValue` | 用于保存用户的脚本设置。 |
| `GM.xmlHttpRequest` | 用于发起跨域网络请求，提升兼容性。 |
| `GM_xmlhttpRequest` | 用于发起跨域网络请求，兼容不同环境。 |
| `GM_info` | 获取当前脚本的相关信息。 |
| `GM_addStyle` | 为页面添加自定义样式。 |
| `GM_listValues` | 列出所有已保存的脚本设置项。 |
| `GM_deleteValue` | 删除指定的脚本设置项。 |

## 安全分析

::: info 等待分析
安全分析将在下次流水线运行时自动更新。
:::

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/519037-nexus-no-wait)*
