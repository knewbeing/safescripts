---
title: "FF评分侦查器V2"
---

# FF评分侦查器V2

`游戏辅助`  `信息展示`  `Torn`  `帮派战争`  `玩家评分`  `网页增强`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/FF_Scouter_V2.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**3.0.1**　　发现时间：**2026-07-06**　　来源：[GreasyFork](https://greasyfork.org/scripts/535292-ff-scouter-v2) <Badge type="tip" text="GreasyFork" />　　安装量：**18,764**　　评分：👍3 / 👎5

## 功能介绍

此脚本在 Torn 游戏网站上显示目标玩家的预期 Fair Fight 分数和帮派战争状态，帮助玩家更好地评估攻击目标。信息会直接集成在页面相关位置，方便查看。

## 适用网站

- Torn 城市游戏

## 使用方法

1. 安装脚本后，访问 Torn 游戏网站。
2. 在玩家或帮派相关页面，会自动显示 Fair Fight 分数和战争状态。
3. 无需额外操作，信息会集成在页面内。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_xmlhttpRequest` | 允许脚本通过网络请求获取外部数据（如 Fair Fight 分数）。 |
| `unsafeWindow` | 允许脚本访问和修改网页的全局变量，增强页面交互能力。 |

## 安全分析

**风险等级**：⛔ CRITICAL　　**安全评分**：75/100　　**分析时间**：2026-07-06

> 脚本存在数据外传风险，主要通过 GM_xmlhttpRequest 向 ffscouter.com 发起请求，可能涉及用户数据。未检测到隐私采集、远程代码执行、代码混淆、DOM XSS、敏感 API 调用、供应链风险等其他高风险行为。建议明确请求内容，避免发送敏感信息，并限制权限申请。整体安全评分为 75，风险等级为 CRITICAL。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：ffscouter.com） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — Data Transmission  
> 脚本通过 GM_xmlhttpRequest 向 ffscouter.com 发起网络请求，可能携带用户数据或页面内容，存在数据外传风险。  
> 位置：GM_xmlhttpRequest 调用，@connect ffscouter.com  
> 建议：明确请求内容，避免发送敏感用户数据。建议仅发送必要的非敏感信息，并在文档中说明用途。

**🟠 MEDIUM** — Permission Abuse  
> 脚本申请了 GM_xmlhttpRequest 和 unsafeWindow 权限，GM_xmlhttpRequest 用于跨域请求，unsafeWindow 可访问页面上下文，存在权限滥用风险。  
> 位置：@grant GM_xmlhttpRequest, @grant unsafeWindow  
> 建议：仅申请实际需要的权限，避免滥用 unsafeWindow，限制其访问范围。

**🟡 LOW** — Remote Code Execution  
> 未检测到远程代码执行、eval、动态 script 加载等高风险行为。  
> 位置：全局代码审查  
> 建议：保持代码透明，避免动态加载和执行外部代码。

**🟡 LOW** — Privacy Collection  
> 未检测到隐私采集行为，如读取 cookie、localStorage、表单、剪贴板等。  
> 位置：全局代码审查  
> 建议：继续保持不采集用户隐私数据。

**🟡 LOW** — Obfuscation  
> 未检测到代码混淆、base64 解码、字符串映射、unicode 混淆等行为。  
> 位置：全局代码审查  
> 建议：保持代码可读性，避免混淆。

**🟡 LOW** — DOM XSS  
> 未检测到 DOM XSS 或注入风险，未直接插入用户输入到 innerHTML。  
> 位置：全局代码审查  
> 建议：继续保持安全的 DOM 操作。

**🟡 LOW** — Sensitive API  
> 未检测到敏感 API 调用，如 geolocation、RTCPeerConnection、MediaDevices、Clipboard、Notification。  
> 位置：全局代码审查  
> 建议：避免调用敏感 API，除非有明确用途。

**🟡 LOW** — Supply Chain  
> 未检测到供应链风险，未使用 @require 加载第三方库。  
> 位置：元数据区  
> 建议：如需加载第三方库，建议使用官方 CDN 并固定版本。

**🟡 LOW** — ClickJacking  
> 未检测到 ClickJacking 或 iframe 风险，未修改 frame 保护策略或创建隐藏 iframe。  
> 位置：全局代码审查  
> 建议：继续保持安全的 iframe 使用。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/535292-ff-scouter-v2)*
