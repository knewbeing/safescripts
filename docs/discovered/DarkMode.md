---
title: "护眼模式"
---

# 护眼模式

`护眼`  `暗黑模式`  `夜间模式`  `网页美化`  `全网通用`  `用户体验`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/DarkMode.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.5.8**　　发现时间：**2026-06-15**　　来源：[XIU2/UserScript](https://github.com/XIU2/UserScript) <Badge type="tip" text="GitHub" />

## 功能介绍

本脚本为全网提供护眼模式（暗黑/夜间/深色模式），自动将网页背景变暗，减少眼睛疲劳。适用于大多数网站，简单有效。

## 适用网站

- 全网（所有网站）
- 不适用于B站直播

## 使用方法

1. 安装脚本后，网页会自动切换为暗色护眼模式。
2. 如需手动开关或调整，可在浏览器油猴菜单中找到相关命令。
3. 设置会自动保存，下次访问网页无需重复操作。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_registerMenuCommand` | 用于在浏览器菜单中添加脚本功能入口，方便用户操作。 |
| `GM_unregisterMenuCommand` | 用于移除已添加的菜单命令。 |
| `GM_openInTab` | 用于在新标签页打开链接，便于访问相关页面。 |
| `GM_getValue` | 用于保存脚本设置，如护眼模式开关状态。 |
| `GM_setValue` | 用于修改和存储脚本配置。 |
| `GM_notification` | 用于弹出通知提醒用户操作结果或状态。 |

## 安全分析

**风险等级**：🟢 SAFE　　**安全评分**：100/100　　**分析时间**：2026-07-06

> 该脚本仅用于页面样式调整和菜单交互，无任何数据外传、隐私采集、远程代码执行、代码混淆、DOM XSS、供应链风险或 iframe 风险。权限申请合理，整体安全性极高。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本未检测到任何网络请求（如 GM_xmlhttpRequest、fetch、XMLHttpRequest、WebSocket、EventSource），不存在数据外传行为。  
> 位置：全局  
> 建议：保持现有状态，避免添加任何外部数据传输逻辑。

**⛔ CRITICAL** — 隐私采集  
> 脚本未访问 document.cookie、localStorage、sessionStorage、IndexedDB，也未监听键盘输入或读取表单字段，未涉及隐私采集。  
> 位置：全局  
> 建议：保持现有状态，避免添加任何隐私采集逻辑。

**🔴 HIGH** — 远程代码执行  
> 脚本未使用 eval、new Function、setTimeout(string)、setInterval(string)，也未通过 innerHTML/outerHTML 插入外部脚本或动态加载远程 JS。  
> 位置：全局  
> 建议：保持现有状态，避免引入远程代码执行风险。

**🔴 HIGH** — 代码混淆  
> 脚本未检测到任何代码混淆（如 base64 解码、字符串数组映射、unicode 混淆、高度压缩单行代码）。  
> 位置：全局  
> 建议：保持代码可读性，避免混淆。

**🔴 HIGH** — DOM XSS / 注入  
> 脚本未将用户输入或 URL 参数直接插入 innerHTML/outerHTML，未检测到 DOM XSS 或注入风险。  
> 位置：全局  
> 建议：保持现有状态，避免插入不可信内容。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 GM_openInTab、GM_notification 等权限，但实际仅用于菜单功能和通知，无滥用行为。  
> 位置：元数据 @grant  
> 建议：如无必要可减少高权限申请，当前用途合理。

**🟠 MEDIUM** — 敏感 API 调用  
> 脚本未调用敏感 API（如 geolocation、RTCPeerConnection、MediaDevices、Clipboard API、Notification API），仅使用 GM_notification 发送通知。  
> 位置：全局  
> 建议：保持现有状态，避免调用敏感 API。

**🟠 MEDIUM** — 供应链风险  
> 脚本未通过 @require 加载任何第三方库，无供应链风险。  
> 位置：元数据 @require  
> 建议：保持现有状态，避免引入不可信第三方库。

**🟡 LOW** — ClickJacking / iframe 风险  
> 脚本未修改 frame 保护策略，也未创建隐藏 iframe 用于数据提取。  
> 位置：全局  
> 建议：保持现有状态，避免 iframe 风险。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://raw.githubusercontent.com/XIU2/UserScript/d8fcb017ba7108be3b9813667e63b7f28cbf6424/DarkMode.user.js)*
