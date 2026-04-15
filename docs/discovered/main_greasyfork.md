---
title: GitHub 中文化插件
---

# GitHub 中文化插件

`中文化`  `GitHub`  `界面翻译`  `用户脚本`  `网页增强`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/main_greasyfork.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.9.2-2026-04-08**　　发现时间：**2026-04-15**　　来源：[maboloshi/github-chinese](https://github.com/maboloshi/github-chinese) <Badge type="tip" text="GitHub" />

## 功能介绍

本脚本将 GitHub 网站及相关页面的部分菜单和内容翻译成中文，提升中文用户的使用体验。它自动检测页面变化，实时替换英文文本为对应的中文。用户无需手动操作，安装后即可享受中文界面。

## 适用网站

- GitHub
- GitHub Skills
- GitHub Gist
- GitHub 状态页

## 使用方法

1. 安装 Tampermonkey 或其他支持的用户脚本管理器。
2. 导入并启用本脚本。
3. 打开 GitHub 或相关页面，界面自动显示中文。
4. 如需调整设置，可通过脚本菜单操作。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_xmlhttpRequest` | 允许脚本发送跨域网络请求以获取翻译数据。 |
| `GM_getValue` | 允许脚本读取本地存储的设置和数据。 |
| `GM_setValue` | 允许脚本保存设置和数据到本地存储。 |
| `GM_registerMenuCommand` | 允许脚本在菜单中注册自定义命令，方便用户操作。 |
| `GM_unregisterMenuCommand` | 允许脚本注销已注册的菜单命令。 |
| `GM_notification` | 允许脚本显示桌面通知提醒用户。 |

## 安全分析

::: info 等待分析
安全分析将在下次流水线运行时自动更新。
:::

---

*由 SafeScripts 自动发现 · [查看原始来源](https://raw.githubusercontent.com/maboloshi/github-chinese/2635cb959e88c263108a99e022b3ddd5e9818838/main(greasyfork).user.js)*
