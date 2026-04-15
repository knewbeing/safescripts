---
title: 啊猫操作面板
---

# 啊猫操作面板

`操作面板`  `交互增强`  `直播平台`  `数据展示`  `快捷操作`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/AC-Panel.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.0**　　发现时间：**2026-04-15**　　来源：[langren1353/GM_script](https://github.com/langren1353/GM_script) <Badge type="tip" text="GitHub" />

## 功能介绍

本脚本在90道直播平台页面添加一个操作面板，方便用户快速执行操作和查看数据。面板显示一个可点击按钮，点击后数字计数会增加，提升交互体验。适合需要简单快捷操作的用户。

## 适用网站

- 90道直播平台

## 使用方法

1. 安装脚本后打开90道直播平台页面。
2. 页面底部会出现一个操作面板。
3. 点击面板上的按钮，数字计数会增加。
4. 通过面板快速查看和操作相关数据。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_setClipboard` | 允许脚本将内容复制到剪贴板，方便快速复制信息。 |

## 安全分析

**风险等级**：🟢 SAFE　　**分析时间**：2026-04-15

> 该脚本仅在指定页面插入一个简单的Vue组件面板，未发现任何网络请求、用户数据读取或远程代码执行行为。@require加载的VueEntry.js来源可信，且版本固定。权限仅申请了GM_setClipboard且实际使用合理，无权限滥用。整体代码清晰无混淆，未使用敏感API。该脚本安全，无安全风险。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |

### 未发现安全问题 ✅

---

*由 SafeScripts 自动发现 · [查看原始来源](https://raw.githubusercontent.com/langren1353/GM_script/75950f3060eab08874180f6ab428465e2b63afb4/AC-Panel.user.js)*
