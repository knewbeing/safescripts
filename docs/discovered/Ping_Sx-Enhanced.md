---
title: "Ping.Sx 增强"
---

# Ping.Sx 增强

`IP工具`  `页面增强`  `效率提升`  `Ping.Sx`  `复制助手`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Ping_Sx-Enhanced.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.0.3**　　发现时间：**2026-05-11**　　来源：[XIU2/UserScript](https://github.com/XIU2/UserScript) <Badge type="tip" text="GitHub" />

## 功能介绍

本脚本为 Ping.Sx 网站提供增强功能，包括一键复制所有 IP 地址、点击 IP 链接直接复制而不是跳转、以及通过右键点击页面空白处快速返回顶部。让 IP 信息的获取和页面操作更加便捷高效。

## 适用网站

- Ping.Sx

## 使用方法

1. 安装脚本后，访问 Ping.Sx 网站相关页面。
2. 点击新增的“一键复制所有 IP”按钮即可复制全部 IP。
3. 点击 IP 链接会直接复制 IP 而不是跳转。
4. 右键点击页面两侧空白处可快速回到页面顶部。
5. 可在脚本菜单中切换 IP 复制的分隔方式。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_setClipboard` | 允许脚本将内容复制到剪贴板，方便一键复制 IP。 |
| `GM_registerMenuCommand` | 在脚本菜单中添加自定义命令，便于切换复制格式等操作。 |
| `GM_unregisterMenuCommand` | 移除脚本菜单中的自定义命令，保持菜单整洁。 |
| `GM_getValue` | 获取和保存脚本的设置参数，如复制分隔符等。 |
| `GM_setValue` | 设置和保存脚本的参数配置。 |
| `window.onurlchange` | 监听页面网址变化，确保脚本在页面切换时依然生效。 |

## 安全分析

::: info 等待分析
安全分析将在下次流水线运行时自动更新。
:::

---

*由 SafeScripts 自动发现 · [查看原始来源](https://raw.githubusercontent.com/XIU2/UserScript/2de66ae0fb5e64439204b800db29ad925245a357/Ping.Sx-Enhanced.user.js)*
