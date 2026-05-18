---
title: "公平对战分数助手"
---

# 公平对战分数助手

`游戏辅助`  `Torn`  `对战分析`  `帮派管理`  `数据展示`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/FF_Scouter_V2.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**2.76**　　发现时间：**2026-05-18**　　来源：[GreasyFork](https://greasyfork.org/scripts/535292-ff-scouter-v2) <Badge type="tip" text="GreasyFork" />　　安装量：**15,220**　　评分：👍3 / 👎2

## 功能介绍

本脚本可在 Torn 游戏网站上显示你与目标玩家的 Fair Fight（公平对战）分数预估，并展示帮派战争状态。让你更方便地评估对手实力和当前帮派战况。

## 适用网站

- Torn 城市（Torn.com）

## 使用方法

1. 1. 安装脚本后，登录 Torn 游戏网站。
2. 2. 浏览玩家或帮派页面时，系统会自动显示 Fair Fight 分数和帮派战争状态。
3. 3. 如需调整设置，可在油猴脚本菜单中找到相关选项。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_xmlhttpRequest` | 用于向外部网站（如 ffscouter.com）请求数据，获取对战分数和状态信息。 |
| `GM_setValue` | 用于在本地保存脚本设置或缓存数据，提升使用体验。 |
| `GM_getValue` | 用于读取本地保存的数据，如用户设置或缓存内容。 |
| `GM_listValues` | 用于获取所有本地保存的数据键名，方便管理和清理缓存。 |
| `GM_deleteValue` | 用于删除本地保存的数据，清理无用缓存。 |
| `GM_registerMenuCommand` | 用于在油猴菜单中添加自定义命令，方便用户手动操作脚本功能。 |
| `GM_addStyle` | 用于为页面添加自定义样式，使脚本内容更美观易用。 |

## 安全分析

**风险等级**：🟠 MEDIUM　　**安全评分**：75/100　　**分析时间**：2026-05-18

> FF Scouter V2 主要安全风险为通过 GM_xmlhttpRequest 向 ffscouter.com 外传数据（如用户 ID、目标信息等），属于 CRITICAL 级别。未发现隐私采集、远程代码执行、代码混淆、DOM XSS、权限滥用、敏感 API 滥用、供应链风险或 iframe 风险。建议开发者公开数据用途并最小化传输内容。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：ffscouter.com） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本通过 GM_xmlhttpRequest 向 ffscouter.com 发送请求，可能包含用户数据（如 Torn 用户 ID、目标信息等），存在数据外传风险。  
> 位置：多处 GM_xmlhttpRequest 调用（通过 @connect ffscouter.com）  
> 建议：明确告知用户数据用途，最小化传输内容，建议在隐私政策中说明。

**🟡 LOW** — 隐私采集  
> 脚本申请了 GM_setValue、GM_getValue、GM_listValues、GM_deleteValue 权限，但未发现敏感信息（如 cookie、localStorage、sessionStorage、IndexedDB、表单、剪贴板、指纹）被采集。  
> 位置：全局  
> 建议：继续避免采集敏感隐私信息。

**🟡 LOW** — 远程代码执行  
> 脚本未发现 eval、new Function、setTimeout(string)、setInterval(string) 等动态执行代码方式，也未见动态 script 标签或 @require 加载远程 JS。  
> 位置：全局  
> 建议：保持当前实现，避免远程代码执行风险。

**🟡 LOW** — 代码混淆  
> 脚本未发现明显的代码混淆、base64 解码、字符串数组映射或高度压缩单行代码。  
> 位置：全局  
> 建议：保持代码可读性，便于社区审计。

**🟡 LOW** — DOM XSS  
> 脚本未发现将用户输入或 URL 参数直接插入 innerHTML/outerHTML，未见 document.write() 注入不可信内容。  
> 位置：全局  
> 建议：继续避免 DOM XSS 风险。

**🟡 LOW** — 权限滥用  
> 脚本申请了 GM_registerMenuCommand、GM_addStyle 等权限，均有实际使用，未见权限滥用。  
> 位置：元数据与全局  
> 建议：仅申请实际需要的权限。

**🟡 LOW** — 敏感 API 调用  
> 脚本未调用敏感 API（如 geolocation、RTCPeerConnection、MediaDevices、Clipboard、Notification）。  
> 位置：全局  
> 建议：继续避免敏感 API 滥用。

**🟡 LOW** — 供应链风险  
> 未见 @require 加载第三方库，供应链风险较低。  
> 位置：元数据  
> 建议：如需加载第三方库，建议使用官方 CDN 并锁定版本哈希。

**🟡 LOW** — ClickJacking/iframe  
> 脚本未见修改 frame 保护策略或创建隐藏 iframe。  
> 位置：全局  
> 建议：继续避免 ClickJacking/iframe 风险。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/535292-ff-scouter-v2)*
