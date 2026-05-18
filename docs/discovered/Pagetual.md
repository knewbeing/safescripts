---
title: "东方永页机"
---

# 东方永页机

`自动翻页`  `无限滚动`  `网页增强`  `通用脚本`  `效率工具`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Pagetual.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.9.37.131**　　发现时间：**2026-05-18**　　来源：[GreasyFork](https://greasyfork.org/scripts/438684-pagetual) <Badge type="tip" text="GreasyFork" />　　安装量：**458,332**　　评分：👍625 / 👎2

## 功能介绍

本脚本可自动检测网页的分页内容，在你浏览到页面底部时自动加载并拼接下一页，实现无限滚动，无需手动翻页。支持绝大多数网站，无需额外设置。

## 适用网站

- 所有网站

## 使用方法

1. 1. 安装脚本后，访问任意带有分页的网页。
2. 2. 向下滚动页面，脚本会自动加载下一页内容，无需手动点击翻页。
3. 3. 如需设置或暂停自动翻页，可通过油猴脚本菜单进行操作。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_xmlhttpRequest` | 用于跨域请求下一页内容，实现自动翻页。 |
| `GM_registerMenuCommand` | 在脚本菜单中添加自定义命令，方便用户操作。 |
| `GM_notification` | 在页面上弹出通知，提示用户相关信息。 |
| `GM_getValue` | 读取脚本本地存储的数据，用于保存设置等。 |
| `GM_setValue` | 保存设置或数据到本地，便于个性化配置。 |
| `GM_addStyle` | 为网页动态添加自定义样式，优化显示效果。 |
| `GM_openInTab` | 在新标签页打开链接，方便查看内容。 |
| `GM_deleteValue` | 删除本地保存的数据，清理设置。 |
| `GM_info` | 获取当前脚本的相关信息。 |
| `GM_setClipboard` | 将内容复制到剪贴板，便于分享。 |
| `GM.xmlHttpRequest` | 与 GM_* 功能类似，为兼容不同环境提供支持。 |
| `GM.registerMenuCommand` | 与 GM_* 功能类似，为兼容不同环境提供支持。 |
| `GM.notification` | 与 GM_* 功能类似，为兼容不同环境提供支持。 |
| `GM.getValue` | 与 GM_* 功能类似，为兼容不同环境提供支持。 |
| `GM.setValue` | 与 GM_* 功能类似，为兼容不同环境提供支持。 |
| `GM.addStyle` | 与 GM_* 功能类似，为兼容不同环境提供支持。 |
| `GM.openInTab` | 与 GM_* 功能类似，为兼容不同环境提供支持。 |
| `GM.deleteValue` | 与 GM_* 功能类似，为兼容不同环境提供支持。 |
| `GM.info` | 与 GM_* 功能类似，为兼容不同环境提供支持。 |
| `GM.setClipboard` | 与 GM_* 功能类似，为兼容不同环境提供支持。 |

## 安全分析

::: info 等待分析
安全分析将在下次流水线运行时自动更新。
:::

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/438684-pagetual)*
