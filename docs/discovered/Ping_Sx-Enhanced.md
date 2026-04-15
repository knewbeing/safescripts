---
title: Ping.Sx增强
---

# Ping.Sx增强

`网页增强`  `IP复制`  `Ping.Sx`  `快捷操作`  `用户脚本`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Ping_Sx-Enhanced.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.0.3**　　发现时间：**2026-04-15**　　来源：[XIU2/UserScript](https://github.com/XIU2/UserScript)

## 功能介绍

该脚本为Ping.Sx网站提供增强功能，支持一键复制页面上的所有IP地址。点击IP链接时不会跳转，而是直接复制IP，避免误操作。右键点击页面右侧空白区域可快速返回页面顶部，提升浏览体验。

## 适用网站

- Ping.Sx网站的ping页面
- Ping.Sx网站的dig页面
- Ping.Sx网站的check-port页面

## 使用方法

1. 安装脚本后打开Ping.Sx网站的ping、dig或check-port页面。
2. 点击页面上的IP地址即可复制该IP，而非跳转。
3. 使用菜单命令切换复制IP时的分隔格式（换行或逗号）。
4. 右键点击页面右侧空白区域快速返回页面顶部。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_setClipboard` | 允许脚本将内容复制到剪贴板，方便一键复制IP地址。 |
| `GM_registerMenuCommand` | 允许脚本在用户脚本菜单中注册自定义命令，方便切换复制格式。 |
| `GM_unregisterMenuCommand` | 允许脚本注销之前注册的菜单命令，保证菜单命令的更新。 |
| `GM_getValue` | 允许脚本读取本地存储的设置，如复制IP的分隔方式。 |
| `GM_setValue` | 允许脚本保存设置到本地存储，记忆用户偏好。 |
| `window.onurlchange` | 允许脚本监听页面URL变化，适应单页应用的页面切换。 |

## 安全分析

::: info 等待分析
安全分析将在下次流水线运行时自动更新。
:::

---

*由 SafeScripts 自动发现 · [查看原始来源](https://raw.githubusercontent.com/XIU2/UserScript/86f2efed3ac31316f59099bc66116033679aa824/Ping.Sx-Enhanced.user.js)*
