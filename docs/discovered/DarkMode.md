---
title: 护眼模式
---

# 护眼模式

`护眼模式`  `夜间模式`  `暗黑模式`  `网页美化`  `浏览器脚本`  `全网通用`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/DarkMode.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.5.7**　　发现时间：**2026-04-15**　　来源：[XIU2/UserScript](https://github.com/XIU2/UserScript)

## 功能介绍

本脚本提供简单有效的全网通用护眼模式，支持夜间模式、暗黑模式和深色模式。安装后自动为网页应用护眼配色，减轻眼睛疲劳。支持自定义设置和通知提醒，提升浏览舒适度。

## 适用网站

- 所有网站（除B站直播间）

## 使用方法

1. 安装脚本后，刷新或打开任意网页。
2. 脚本自动启用护眼模式，网页背景变暗，文字更柔和。
3. 通过浏览器扩展菜单可调整护眼模式设置。
4. 关闭或卸载脚本即可恢复默认网页样式。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_registerMenuCommand` | 用于在脚本菜单中注册自定义命令，方便用户操作。 |
| `GM_unregisterMenuCommand` | 用于注销之前注册的菜单命令，保持菜单整洁。 |
| `GM_openInTab` | 允许脚本在新标签页打开链接，方便跳转。 |
| `GM_getValue` | 用于读取脚本保存的用户设置和数据。 |
| `GM_setValue` | 用于保存用户的设置和数据，保持个性化配置。 |
| `GM_notification` | 用于显示桌面通知，提醒用户脚本状态或操作结果。 |

## 安全分析

::: info 等待分析
安全分析将在下次流水线运行时自动更新。
:::

---

*由 SafeScripts 自动发现 · [查看原始来源](https://raw.githubusercontent.com/XIU2/UserScript/86f2efed3ac31316f59099bc66116033679aa824/DarkMode.user.js)*
