---
title: "东方永页机"
---

# 东方永页机

`自动翻页`  `无限滚动`  `网页增强`  `阅读优化`  `通用脚本`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Pagetual.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.9.37.131**　　发现时间：**2026-04-20**　　来源：[GreasyFork](https://greasyfork.org/scripts/438684-pagetual) <Badge type="tip" text="GreasyFork" />　　安装量：**457,165**　　评分：👍623 / 👎2

## 功能介绍

本脚本可让网页实现自动翻页，无需手动点击“下一页”，内容会自动加载并拼接到当前页面底部。支持几乎所有分页网站，无需额外设置。适合阅读论坛、新闻、搜索结果等多页内容时使用。

## 适用网站

- 所有网站

## 使用方法

1. 安装脚本后，访问任何带分页的网页。
2. 向下滚动页面，脚本会自动加载并拼接下一页内容。
3. 无需手动点击“下一页”按钮，内容会连续显示。
4. 如需设置或暂停功能，可通过浏览器油猴菜单操作。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_xmlhttpRequest` | 用于跨域加载下一页内容，实现自动翻页功能。 |
| `GM_registerMenuCommand` | 在脚本菜单中添加自定义命令，方便用户操作。 |
| `GM_notification` | 在页面右下角弹出通知，提示翻页状态等信息。 |
| `GM_getValue` | 保存用户设置或脚本状态，便于下次使用。 |
| `GM_setValue` | 存储用户设置或脚本状态。 |
| `GM_addStyle` | 为页面添加自定义样式，优化拼接内容显示。 |
| `GM_openInTab` | 在新标签页打开链接，辅助部分功能。 |
| `GM_deleteValue` | 删除已保存的数据。 |
| `GM_info` | 获取当前脚本的相关信息。 |
| `GM_setClipboard` | 将内容复制到剪贴板，方便用户操作。 |
| `GM.xmlHttpRequest` | 与 GM_xmlhttpRequest 类似，兼容不同环境的跨域请求。 |
| `GM.registerMenuCommand` | 与 GM_registerMenuCommand 类似，兼容不同环境的菜单命令。 |
| `GM.notification` | 与 GM_notification 类似，兼容不同环境的通知。 |
| `GM.getValue` | 与 GM_getValue 类似，兼容不同环境的数据读取。 |
| `GM.setValue` | 与 GM_setValue 类似，兼容不同环境的数据保存。 |
| `GM.addStyle` | 与 GM_addStyle 类似，兼容不同环境的样式添加。 |
| `GM.openInTab` | 与 GM_openInTab 类似，兼容不同环境的新标签页打开。 |
| `GM.deleteValue` | 与 GM_deleteValue 类似，兼容不同环境的数据删除。 |
| `GM.info` | 与 GM_info 类似，兼容不同环境的脚本信息获取。 |
| `GM.setClipboard` | 与 GM_setClipboard 类似，兼容不同环境的剪贴板操作。 |

## 安全分析

::: info 等待分析
安全分析将在下次流水线运行时自动更新。
:::

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/438684-pagetual)*
