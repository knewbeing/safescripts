---
title: "Ping.Sx 增强"
---

# Ping.Sx 增强

`IP工具`  `批量复制`  `页面增强`  `Ping.Sx`  `效率提升`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Ping_Sx-Enhanced.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.0.3**　　发现时间：**2026-05-18**　　来源：[XIU2/UserScript](https://github.com/XIU2/UserScript) <Badge type="tip" text="GitHub" />

## 功能介绍

本脚本为 Ping.Sx 网站提供增强功能，包括一键复制所有 IP 地址、点击 IP 链接直接复制而非跳转、以及通过右键点击页面两侧空白处快速返回顶部。让批量操作和页面浏览更加高效便捷。

## 适用网站

- Ping.Sx

## 使用方法

1. 安装脚本后，访问 Ping.Sx 网站的 ping、dig 或 check-port 页面。
2. 点击新增的“一键复制所有 IP”按钮，即可快速复制所有 IP 地址。
3. 点击 IP 链接时，自动复制 IP 而不是跳转。
4. 右键点击页面两侧空白区域，可快速返回页面顶部。
5. 如需切换 IP 复制的分隔方式，可在脚本菜单中设置。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_setClipboard` | 用于将复制的 IP 地址内容写入剪贴板。 |
| `GM_registerMenuCommand` | 在脚本菜单中添加自定义命令，方便切换复制分隔方式。 |
| `GM_unregisterMenuCommand` | 移除已注册的菜单命令，避免重复。 |
| `GM_getValue` | 读取和保存用户设置（如复制分隔符）。 |
| `GM_setValue` | 保存用户自定义设置（如分隔符偏好）。 |
| `window.onurlchange` | 监听网页地址变化，确保功能在页面切换时依然可用。 |

## 安全分析

::: info 等待分析
安全分析将在下次流水线运行时自动更新。
:::

---

*由 SafeScripts 自动发现 · [查看原始来源](https://raw.githubusercontent.com/XIU2/UserScript/de4fcb506ced59aa0c6637ab7c52a2594fa050ed/Ping.Sx-Enhanced.user.js)*
