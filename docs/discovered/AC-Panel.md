---
title: "啊猫-操作面板"
---

# 啊猫-操作面板

`操作面板`  `页面增强`  `数据展示`  `快捷操作`  `直播网站`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/AC-Panel.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.0**　　发现时间：**2026-06-08**　　来源：[langren1353/GM_script](https://github.com/langren1353/GM_script) <Badge type="tip" text="GitHub" />

## 功能介绍

本脚本会在90dao直播网站页面添加一个操作面板，方便用户快速操作和查看数据。面板包含按钮和数据显示，提升使用体验。

## 适用网站

- 90dao直播

## 使用方法

1. 安装脚本后，访问90dao直播网站。
2. 页面右下角会出现一个操作面板。
3. 点击面板上的按钮可以增加计数并显示数据。
4. 如需复制信息，可使用面板相关功能。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_setClipboard` | 允许脚本将内容复制到剪贴板，方便用户快速复制信息。 |

## 安全分析

**风险等级**：🟢 SAFE　　**安全评分**：100/100　　**分析时间**：2026-06-08

> 该脚本仅在页面插入一个简单的 Vue 面板用于本地交互，不涉及任何网络请求、隐私数据采集、远程代码执行或混淆行为。唯一的外部依赖（VueEntry.js）来源于 GreasyFork 官方 CDN，且未检测到供应链风险。未发现权限滥用或敏感 API 调用。整体安全性高。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 未发现安全问题 ✅

---

*由 SafeScripts 自动发现 · [查看原始来源](https://raw.githubusercontent.com/langren1353/GM_script/75950f3060eab08874180f6ab428465e2b63afb4/AC-Panel.user.js)*
