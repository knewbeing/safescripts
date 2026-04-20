---
title: "Ping.Sx 增强"
---

# Ping.Sx 增强

`IP工具`  `网站增强`  `效率提升`  `Ping.Sx`  `一键复制`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Ping_Sx-Enhanced.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.0.3**　　发现时间：**2026-04-20**　　来源：[XIU2/UserScript](https://github.com/XIU2/UserScript) <Badge type="tip" text="GitHub" />

## 功能介绍

本脚本为 Ping.Sx 网站提供增强功能：支持一键复制所有 IP 地址，点击 IP 链接可直接复制而不是跳转，右键点击页面两侧空白区域可快速回到顶部。让网站操作更高效便捷。

## 适用网站

- Ping.Sx

## 使用方法

1. 安装脚本后，访问 Ping.Sx 网站相关页面。
2. 点击新增的“一键复制所有 IP”按钮即可复制全部 IP。
3. 点击 IP 链接会直接复制 IP，不会跳转页面。
4. 右键点击页面两侧空白区域可快速返回顶部。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_setClipboard` | 允许脚本将内容复制到剪贴板，便于一键复制 IP。 |
| `GM_registerMenuCommand` | 允许脚本在用户脚本菜单中添加自定义命令，方便切换设置。 |
| `GM_unregisterMenuCommand` | 允许脚本移除已注册的菜单命令，便于动态更新菜单。 |
| `GM_getValue` | 允许脚本读取本地存储的设置，如分隔符选项。 |
| `GM_setValue` | 允许脚本保存设置到本地，实现个性化配置。 |
| `window.onurlchange` | 允许脚本监听网址变化，确保功能在页面切换时依然有效。 |

## 安全分析

::: info 等待分析
安全分析将在下次流水线运行时自动更新。
:::

---

*由 SafeScripts 自动发现 · [查看原始来源](https://raw.githubusercontent.com/XIU2/UserScript/86f2efed3ac31316f59099bc66116033679aa824/Ping.Sx-Enhanced.user.js)*
