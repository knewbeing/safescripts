---
title: "Ping.Sx 增强"
---

# Ping.Sx 增强

`IP工具`  `页面增强`  `快捷操作`  `复制功能`  `网络工具`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Ping_Sx-Enhanced.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.0.3**　　发现时间：**2026-04-27**　　来源：[XIU2/UserScript](https://github.com/XIU2/UserScript) <Badge type="tip" text="GitHub" />

## 功能介绍

本脚本为 Ping.Sx 网站提供增强功能，包括一键复制所有 IP 地址、将 IP 链接变为复制而非跳转、以及在页面两侧空白处右键快速回到顶部。

## 适用网站

- Ping.Sx

## 使用方法

1. 安装脚本后，访问 Ping.Sx 网站相关页面。
2. 页面会新增一键复制所有 IP 的按钮。
3. 点击 IP 链接会直接复制 IP，而不是跳转。
4. 在页面两侧空白处右键即可快速回到顶部。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_setClipboard` | 允许脚本将内容复制到剪贴板，方便一键复制 IP。 |
| `GM_registerMenuCommand` | 允许脚本在菜单中添加自定义命令，方便用户切换功能。 |
| `GM_unregisterMenuCommand` | 允许脚本移除自定义菜单命令，管理菜单项。 |
| `GM_getValue` | 允许脚本读取本地存储的设置，如分隔方式。 |
| `GM_setValue` | 允许脚本保存设置到本地，如分隔方式。 |
| `window.onurlchange` | 允许脚本监听网址变化，适应页面切换。 |

## 安全分析

::: info 等待分析
安全分析将在下次流水线运行时自动更新。
:::

---

*由 SafeScripts 自动发现 · [查看原始来源](https://raw.githubusercontent.com/XIU2/UserScript/34a53d6207ac534d42d443d9b951eeaa920c3cef/Ping.Sx-Enhanced.user.js)*
