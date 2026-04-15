---
title: Ping.Sx增强
---

# Ping.Sx增强

`网页增强`  `IP复制`  `快捷操作`  `Ping工具`  `用户脚本`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Ping_Sx-Enhanced.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.0.3**　　发现时间：**2026-04-15**　　来源：[XIU2/UserScript](https://github.com/XIU2/UserScript)

## 功能介绍

该脚本为Ping.Sx网站提供增强功能，支持一键复制页面上所有IP地址。点击IP链接时不会跳转，而是直接复制IP，避免误操作。右键点击页面右侧空白区域可快速返回页面顶部，提升浏览体验。

## 适用网站

- Ping.Sx网站的ping页面
- Ping.Sx网站的dig页面
- Ping.Sx网站的check-port页面

## 使用方法

1. 安装脚本后访问Ping.Sx的ping、dig或check-port页面。
2. 页面会自动显示一键复制所有IP的功能按钮。
3. 点击IP链接时会复制IP而非跳转。
4. 右键点击页面右侧空白区域即可快速回到顶部。
5. 通过脚本菜单切换复制IP的分隔格式。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_setClipboard` | 用于将复制的IP地址写入系统剪贴板。 |
| `GM_registerMenuCommand` | 注册自定义菜单命令，方便用户切换设置。 |
| `GM_unregisterMenuCommand` | 注销已注册的菜单命令，避免重复注册。 |
| `GM_getValue` | 读取脚本存储的用户设置，如复制IP的分隔方式。 |
| `GM_setValue` | 保存用户设置，如复制IP的分隔方式。 |
| `window.onurlchange` | 监听页面URL变化，确保脚本在单页应用中正常工作。 |

## 安全分析

::: info 等待分析
安全分析将在下次流水线运行时自动更新。
:::

---

*由 SafeScripts 自动发现 · [查看原始来源](https://raw.githubusercontent.com/XIU2/UserScript/86f2efed3ac31316f59099bc66116033679aa824/Ping.Sx-Enhanced.user.js)*
