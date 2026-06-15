---
title: "HTML5 视频音频默认音量"
---

# HTML5 视频音频默认音量

`音量控制`  `视频优化`  `音频优化`  `网页增强`  `隐私保护`  `自动化`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/HTML5Volume.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.0.5**　　发现时间：**2026-06-15**　　来源：[XIU2/UserScript](https://github.com/XIU2/UserScript) <Badge type="tip" text="GitHub" />

## 功能介绍

本脚本自动将网页上的 HTML5 视频和音频的默认音量设置为较低值，避免被突然的高音量吓到。它还能为每个网站分别记住你调整后的音量，下次访问自动恢复。

## 适用网站

- 所有网站

## 使用方法

1. 安装脚本后，访问任意含视频或音频的网页。
2. 播放视频或音频时，默认音量会自动降低。
3. 如需调整默认音量，可通过浏览器脚本菜单进行设置。
4. 每个网站的音量设置会自动记忆，无需重复调整。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_registerMenuCommand` | 用于在脚本菜单中添加自定义操作按钮，方便用户设置音量。 |
| `GM_unregisterMenuCommand` | 用于移除脚本菜单中的自定义操作按钮。 |
| `GM_openInTab` | 用于在新标签页打开相关页面，比如帮助或设置页面。 |
| `GM_getValue` | 用于读取已保存的每个网站的音量设置。 |
| `GM_setValue` | 用于保存你在某个网站调整的音量，下次自动应用。 |
| `GM_notification` | 用于弹出通知提示，比如设置成功等消息。 |

## 安全分析

**风险等级**：🟢 SAFE　　**安全评分**：92/100　　**分析时间**：2026-06-15

> 该脚本未检测到任何数据外传、隐私采集、远程代码执行、代码混淆、DOM XSS、敏感 API 调用、供应链风险或 iframe 风险。唯一中等风险为 GM_openInTab 权限申请，但实际用途安全。整体安全性高，适合公开使用。

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
> 未检测到任何网络请求、WebSocket、fetch、GM_xmlhttpRequest 等数据外传行为。  
> 位置：全局代码  
> 建议：保持无数据外传风险。

**🟠 MEDIUM** — 权限滥用  
> 申请了 GM_openInTab 权限，但仅用于打开反馈页面（github/greasyfork），无敏感数据传递。  
> 位置：GM_openInTab 调用  
> 建议：确认无敏感数据传递，建议仅申请必要权限。

**🟡 LOW** — 隐私采集  
> 脚本通过 GM_getValue/GM_setValue 和 localStorage 存储音量设置，无敏感数据采集行为。  
> 位置：GM_getValue, GM_setValue, localStorage  
> 建议：确认仅存储音量相关数据，避免存储敏感信息。

**🟡 LOW** — 远程代码执行  
> 脚本未使用 eval、new Function、setTimeout(string)、setInterval(string) 等动态代码执行方式。  
> 位置：全局代码  
> 建议：保持无远程代码执行风险。

**🟡 LOW** — 代码混淆  
> 未检测到代码混淆、base64、字符串数组映射、unicode混淆等。  
> 位置：全局代码  
> 建议：保持代码可读性。

**🟡 LOW** — DOM XSS  
> 未检测到 DOM XSS 或注入风险，未直接插入用户输入到 innerHTML/outerHTML。  
> 位置：全局代码  
> 建议：保持安全的 DOM 操作。

**🟡 LOW** — 敏感 API  
> 未检测到敏感 API 调用（如 geolocation、RTCPeerConnection、MediaDevices、Clipboard、Notification 除 GM_notification）。  
> 位置：全局代码  
> 建议：保持无敏感 API 滥用。

**🟡 LOW** — 供应链风险  
> 未检测到供应链风险，未使用 @require 加载第三方库。  
> 位置：元数据  
> 建议：保持无供应链风险。

**🟡 LOW** — ClickJacking/iframe  
> 未检测到 ClickJacking 或 iframe 风险，未修改 frame 保护策略或创建隐藏 iframe。  
> 位置：全局代码  
> 建议：保持无 iframe 风险。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://raw.githubusercontent.com/XIU2/UserScript/d8fcb017ba7108be3b9813667e63b7f28cbf6424/HTML5Volume.user.js)*
