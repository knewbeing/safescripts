---
title: "Github增强"
---

# Github增强

`下载加速`  `Github增强`  `文件管理`  `快捷操作`  `开发工具`  `公益加速`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/github-enhancement.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**0.0.2**　　发现时间：**2026-06-22**　　来源：[pdone/jset](https://github.com/pdone/jset) <Badge type="tip" text="GitHub" />

## 功能介绍

本脚本为 Github 网站提供高速下载功能，包括 Git Clone/SSH、Release、Raw、Code(ZIP) 等文件的加速下载。支持项目列表中单文件的快捷下载，提升文件获取效率。

## 适用网站

- Github

## 使用方法

1. 安装脚本后，访问 Github 网站。
2. 在项目页面或文件列表中，会出现加速下载按钮。
3. 点击相应按钮即可高速下载文件或项目。
4. 可在脚本菜单中调整相关功能设置。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_registerMenuCommand` | 用于在脚本菜单中添加自定义命令，方便用户操作。 |
| `GM_unregisterMenuCommand` | 用于移除脚本菜单中的命令。 |
| `GM_openInTab` | 允许脚本在新标签页打开链接，便于下载或查看文件。 |
| `GM_getValue` | 用于存储和读取用户的配置或偏好设置。 |
| `GM_setValue` | 用于保存用户的配置或偏好设置。 |
| `GM_notification` | 在桌面弹出通知，提醒用户操作结果。 |
| `GM_setClipboard` | 将内容复制到剪贴板，方便用户快速获取下载链接。 |
| `window.onurlchange` | 监听页面地址变化，确保脚本在页面切换时正常工作。 |

## 安全分析

::: info 等待分析
安全分析将在下次流水线运行时自动更新。
:::

---

*由 SafeScripts 自动发现 · [查看原始来源](https://raw.githubusercontent.com/pdone/jset/4ceee304614b90219ecdf58633516b71f49511d1/src/github-enhancement.user.js)*
