---
title: "Picviewer CE+"
---

# Picviewer CE+

`图片增强`  `批量下载`  `网页工具`  `图片管理`  `效率提升`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Picviewer_CE.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**2026.2.6.1**　　发现时间：**2026-04-20**　　来源：[GreasyFork](https://greasyfork.org/scripts/24204-picviewer-ce) <Badge type="tip" text="GreasyFork" />　　安装量：**303,520**　　评分：👍1367 / 👎1

## 功能介绍

Picviewer CE+ 是一款强大的在线看图工具，支持图片弹出大图、缩放、旋转、翻转等操作。还可以批量保存网页上的图片，提升浏览和管理图片的效率。适用于绝大多数网页，操作便捷。

## 适用网站

- 所有网站（部分特殊网站除外，如Toodledo、Google地图、Mega、OneDrive等）

## 使用方法

1. 1. 安装脚本后，访问包含图片的网页。
2. 2. 鼠标悬停或点击图片，会自动弹出大图查看窗口。
3. 3. 可在弹窗中对图片进行缩放、旋转、翻转等操作。
4. 4. 如需批量保存图片，可使用脚本菜单或相关按钮一键下载。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_getValue/GM.setValue/GM.deleteValue/GM.getValue/GM.setValue/GM.deleteValue` | 用于存储和读取脚本的设置和数据。 |
| `GM_addStyle/GM.addStyle` | 为网页添加自定义样式，优化图片查看体验。 |
| `GM_openInTab/GM.openInTab` | 在新标签页打开图片或链接，方便查看原图。 |
| `GM_setClipboard/GM.setClipboard` | 将图片地址或内容复制到剪贴板。 |
| `GM_xmlhttpRequest/GM.xmlHttpRequest` | 实现跨域网络请求，获取图片或相关数据。 |
| `GM_registerMenuCommand/GM.registerMenuCommand` | 在脚本菜单中添加功能入口，便于用户操作。 |
| `GM_notification/GM.notification` | 发送桌面通知，提醒用户操作结果。 |
| `GM_download` | 支持批量下载网页图片到本地。 |
| `unsafeWindow` | 允许脚本访问网页的原始窗口对象，增强功能兼容性。 |

## 安全分析

::: info 等待分析
安全分析将在下次流水线运行时自动更新。
:::

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/24204-picviewer-ce)*
