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

**风险等级**：🔴 HIGH　　**安全评分**：35/100　　**分析时间**：2026-07-27

> FF Scouter V2 存在数据外传风险（向 ffscouter.com 发起网络请求），并申请了 unsafeWindow 高权限，可能导致远程代码执行和权限滥用。未见明显隐私采集、DOM XSS、供应链风险，但部分代码压缩可读性较差。建议详细审查外部通信内容，并限制高权限使用。

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
> 脚本通过 GM_xmlhttpRequest 向 ffscouter.com 发起网络请求，可能会携带用户数据或页面内容。@connect 仅允许 ffscouter.com，未见其他第三方，但未明确请求内容，存在数据外传风险。  
> 位置：GM_xmlhttpRequest 调用，@connect ffscouter.com  
> 建议：详细审查请求参数和响应处理，确保不发送敏感用户数据。建议在文档中明确数据用途和隐私政策。

**🔴 HIGH** — 远程代码执行/权限滥用  
> 脚本申请了 unsafeWindow 权限，允许访问页面原生 JS 环境，存在远程代码执行和权限滥用风险。  
> 位置：@grant unsafeWindow  
> 建议：仅在确实需要时使用 unsafeWindow，避免滥用。建议移除或限制其使用范围。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 GM_xmlhttpRequest 权限，属于高权限操作，实际代码中确实使用该权限。  
> 位置：@grant GM_xmlhttpRequest  
> 建议：确保 GM_xmlhttpRequest 仅用于必要的外部通信，避免发送敏感信息。

**🟠 MEDIUM** — 代码混淆  
> 脚本未见混淆、eval、动态 script 加载等明显远程代码执行风险，但部分代码高度压缩（如 importCSS 部分），可读性较差。  
> 位置：importCSS 函数及其调用  
> 建议：建议提供可读源码或注释，提升代码透明度。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/535292-ff-scouter-v2)*
