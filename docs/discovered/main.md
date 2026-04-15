---
title: GitHub 中文化插件
---

# GitHub 中文化插件

`界面中文化`  `GitHub增强`  `翻译工具`  `用户脚本`  `开发者辅助`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/main.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.9.3-2026-04-12**　　发现时间：**2026-04-15**　　来源：[maboloshi/github-chinese](https://github.com/maboloshi/github-chinese) <Badge type="tip" text="GitHub" />

## 功能介绍

本脚本将GitHub界面中的部分菜单和内容翻译成中文，提升中文用户的使用体验。支持GitHub主站及相关子站点的中文化显示。用户无需额外操作，安装后自动生效。

## 适用网站

- GitHub主站
- GitHub技能页面
- GitHub Gist
- GitHub教育页面
- GitHub状态页面

## 使用方法

1. 安装脚本后，访问GitHub相关页面即可自动显示中文界面。
2. 如需调整设置，可通过Tampermonkey菜单中的脚本命令进行操作。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_xmlhttpRequest` | 用于发送跨域网络请求获取翻译内容 |
| `GM_getValue` | 用于读取脚本的本地存储配置 |
| `GM_setValue` | 用于保存脚本的本地存储配置 |
| `GM_registerMenuCommand` | 用于注册菜单命令，方便用户操作脚本功能 |
| `GM_unregisterMenuCommand` | 用于注销菜单命令 |
| `GM_notification` | 用于显示桌面通知提示用户 |

## 安全分析

::: info 等待分析
安全分析将在下次流水线运行时自动更新。
:::

---

*由 SafeScripts 自动发现 · [查看原始来源](https://raw.githubusercontent.com/maboloshi/github-chinese/2635cb959e88c263108a99e022b3ddd5e9818838/main.user.js)*
