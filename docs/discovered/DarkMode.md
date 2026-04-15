---
title: 护眼模式
---

# 护眼模式

`护眼模式`  `夜间模式`  `暗黑模式`  `网页美化`  `全网通用`  `用户脚本`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/DarkMode.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.5.7**　　发现时间：**2026-04-15**　　来源：[XIU2/UserScript](https://github.com/XIU2/UserScript)

## 功能介绍

本脚本提供简单有效的全网通用护眼模式，支持夜间模式、暗黑模式和深色模式。安装后自动为网页应用护眼配色，减少眼睛疲劳。用户可通过菜单命令切换和设置护眼模式。

## 适用网站

- 所有网站（除哔哩哔哩直播间）

## 使用方法

1. 安装脚本后，刷新网页即可自动启用护眼模式。
2. 点击浏览器扩展图标或右键菜单，使用脚本提供的菜单命令切换模式。
3. 根据需要调整设置，脚本会记住您的选择。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_registerMenuCommand` | 添加自定义菜单命令，方便用户操作脚本功能。 |
| `GM_unregisterMenuCommand` | 移除已注册的菜单命令，管理菜单项。 |
| `GM_openInTab` | 在新标签页打开链接，方便跳转相关页面。 |
| `GM_getValue` | 获取脚本存储的设置数据，保存用户偏好。 |
| `GM_setValue` | 保存脚本设置数据，记住用户选择。 |
| `GM_notification` | 显示桌面通知，提醒用户脚本状态。 |

## 安全分析

::: info 等待分析
安全分析将在下次流水线运行时自动更新。
:::

---

*由 SafeScripts 自动发现 · [查看原始来源](https://raw.githubusercontent.com/XIU2/UserScript/86f2efed3ac31316f59099bc66116033679aa824/DarkMode.user.js)*
