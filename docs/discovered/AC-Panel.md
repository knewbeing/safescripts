---
title: 啊猫操作面板
---

# 啊猫操作面板

`操作面板`  `数据展示`  `交互增强`  `直播平台`  `剪贴板操作`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/AC-Panel.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.0**　　发现时间：**2026-04-15**　　来源：[langren1353/GM_script](https://github.com/langren1353/GM_script)

## 功能介绍

本脚本在90dao直播平台页面底部添加一个操作面板，方便用户快速查看和操作。面板显示一个可点击按钮，点击后计数器会增加，实时显示当前计数。适合需要简单交互和数据展示的场景。

## 适用网站

- 90dao直播平台

## 使用方法

1. 安装脚本后，打开90dao直播平台首页。
2. 页面底部会自动出现一个操作面板。
3. 点击面板中的按钮，计数器数字会增加。
4. 可根据需要使用面板进行快速操作和查看信息。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_setClipboard` | 允许脚本将内容复制到剪贴板，方便快速复制信息。 |

## 安全分析

**风险等级**：🟢 SAFE　　**分析时间**：2026-04-15

> 该脚本仅在指定页面插入一个简单的Vue组件面板，未发现任何网络请求、用户数据读取或远程代码执行行为。@grant 权限与代码使用一致，@require 来源可信且固定版本。整体无安全风险。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |

### 未发现安全问题 ✅

---

*由 SafeScripts 自动发现 · [查看原始来源](https://raw.githubusercontent.com/langren1353/GM_script/75950f3060eab08874180f6ab428465e2b63afb4/AC-Panel.user.js)*
