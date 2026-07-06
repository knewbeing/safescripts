---
title: "啊猫-操作面板"
---

# 啊猫-操作面板

`操作面板`  `页面增强`  `直播网站`  `交互工具`  `数据展示`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/AC-Panel.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.0**　　发现时间：**2026-07-06**　　来源：[langren1353/GM_script](https://github.com/langren1353/GM_script) <Badge type="tip" text="GitHub" />

## 功能介绍

本脚本会在90dao直播网站页面上添加一个操作面板，方便用户快速操作和查看数据。面板可显示信息并通过按钮进行简单交互，如计数。

## 适用网站

- 90dao直播

## 使用方法

1. 安装脚本后，访问90dao直播网站。
2. 页面右下角会出现一个操作面板。
3. 点击面板上的按钮可增加计数并显示相关信息。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_setClipboard` | 允许脚本将内容复制到剪贴板，方便用户快速复制信息。 |

## 安全分析

**风险等级**：🟡 LOW　　**安全评分**：92/100　　**分析时间**：2026-07-06

> 该脚本未检测到数据外传、隐私采集、远程代码执行、代码混淆、DOM XSS、权限滥用、敏感 API 调用等高风险行为。唯一风险为 @require 加载第三方库时未固定版本哈希，存在一定供应链风险。整体安全性较高，建议关注依赖库的来源与版本固定。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ⚠️ 存在风险 |

### 发现的问题

**🟠 MEDIUM** — Supply Chain Risk  
> @require 加载第三方库 VueEntry.js，来源为 greasyfork.org 的 update CDN，未固定版本哈希，存在供应链风险。  
> 位置：@require https://update.greasyfork.org/scripts/503097/1424938/VueEntry.js  
> 建议：建议使用官方 CDN 并固定版本哈希，避免 update CDN 可能的供应链污染。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://raw.githubusercontent.com/langren1353/GM_script/2d93f39fd1dd61c477a147fae583c259cbbc00fd/AC-Panel.user.js)*
