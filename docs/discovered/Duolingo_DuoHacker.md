---
title: "多邻国 DuoHacker"
---

# 多邻国 DuoHacker

`多邻国`  `学习辅助`  `自动刷分`  `解锁高级`  `语言学习`  `脚本工具`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Duolingo_DuoHacker.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**2026.05.25**　　发现时间：**2026-05-25**　　来源：[GreasyFork](https://greasyfork.org/scripts/561041-duolingo-duohacker) <Badge type="tip" text="GreasyFork" />　　安装量：**3,070**　　评分：👍107 / 👎47

## 功能介绍

本脚本是多邻国的辅助工具，支持自动刷经验值（XP）、宝石和连胜，还能免费解锁 Duolingo Max 高级功能。安装后可轻松提升学习进度，无需手动操作。

## 适用网站

- 多邻国官网
- 多邻国中国站

## 使用方法

1. 1. 安装 Tampermonkey 插件并添加本脚本。
2. 2. 打开多邻国官网或中国站，页面会自动加载辅助功能。
3. 3. 按页面提示操作，即可自动刷 XP、宝石和连胜。
4. 4. Duolingo Max 功能会自动解锁，无需额外设置。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_xmlhttpRequest` | 允许脚本发送网络请求，获取或提交数据。 |
| `GM_addStyle` | 允许脚本添加自定义样式，优化界面显示。 |

## 安全分析

**风险等级**：⛔ CRITICAL　　**安全评分**：39/100　　**分析时间**：2026-05-25

> Duolingo DuoHacker 用户脚本存在严重的数据外传风险，允许与多个非官方第三方域通信（如 api.twisk.fun、raw.githubusercontent.com、greasyfork.org），可能导致用户数据泄露或被追踪。此外，脚本申请了高权限但主代码段未见实际使用，存在权限滥用和供应链风险。未发现隐私采集、远程代码执行、代码混淆或 DOM XSS 风险。建议严格限制网络请求目标，仅允许官方域名，并移除未使用的高权限。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：duolingo.com, stories.duolingo.com, goals-api.duolingo.com） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ⚠️ 存在风险 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本申请了 GM_xmlhttpRequest 权限，并声明 @connect 到多个第三方域，包括 api.twisk.fun、raw.githubusercontent.com、greasyfork.org 等。这些域非 Duolingo 官方，存在数据外传风险。  
> 位置：UserScript 元数据 @grant/@connect  
> 建议：限制 @connect 仅允许 Duolingo 官方域，移除非必要的第三方域名，避免用户数据外传。

**⛔ CRITICAL** — 数据外传  
> 脚本允许与 api.twisk.fun 进行网络通信，该域名非 Duolingo 官方，可能用于统计、追踪或数据上报。  
> 位置：UserScript 元数据 @connect  
> 建议：移除 api.twisk.fun 的 @connect 权限，或明确说明用途并公开代码实现。

**🟠 MEDIUM** — 供应链风险  
> 脚本允许与 raw.githubusercontent.com、greasyfork.org 等第三方域通信，存在供应链风险，可能被用于加载远程代码或数据。  
> 位置：UserScript 元数据 @connect  
> 建议：仅允许可信 CDN 和官方域名，避免供应链污染。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 GM_xmlhttpRequest 权限，但主代码段未见实际使用，存在权限滥用风险。  
> 位置：UserScript 元数据 @grant  
> 建议：仅申请实际需要的权限，移除未使用的高权限。

**🟡 LOW** — 数据外传  
> 脚本动态插入 Google Fonts 字体（fonts.googleapis.com），可能泄露用户访问行为。  
> 位置：document.head.appendChild(_fontLink)  
> 建议：如无必要，避免加载外部字体资源，或在隐私政策中说明。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/561041-duolingo-duohacker)*
