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

**风险等级**：🟡 LOW　　**安全评分**：85/100　　**分析时间**：2026-06-15

> Duolingo DuoHacker 用户脚本当前版本未检测到数据外传、隐私采集、远程代码执行、代码混淆、DOM XSS、供应链风险等高危行为。主要风险为申请了高权限（GM_xmlhttpRequest）和多个 @connect 域名但未实际使用，建议后续代码补全时严格审查网络请求与数据传输。整体安全风险较低，安全评分为85分。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 GM_xmlhttpRequest 权限，并声明了多个 @connect 域名，但完整代码未包含任何实际网络请求逻辑（如 GM_xmlhttpRequest、fetch、WebSocket 等）。如后续代码补全或更新，需重点关注数据外传行为。  
> 位置：元数据与代码头部  
> 建议：仅申请实际需要的 @grant/@connect 权限，避免高权限滥用。后续代码如涉及网络请求，需严格审查数据传输内容与目的地。

**🟡 LOW** — 隐私采集  
> 脚本未包含任何隐私采集代码（如读取 cookie、localStorage、sessionStorage、IndexedDB、剪贴板、表单、键盘监听等）。  
> 位置：完整代码  
> 建议：保持不采集用户隐私数据，后续如需采集需明确告知用户并最小化范围。

**🟡 LOW** — 远程代码执行  
> 脚本未包含远程代码执行相关风险（如 eval、new Function、setTimeout(string)、setInterval(string)、动态 script 标签等）。  
> 位置：完整代码  
> 建议：避免使用动态执行代码方式，确保所有依赖库来源可信且版本固定。

**🟡 LOW** — 代码混淆  
> 脚本未包含代码混淆、压缩、base64/unicode编码等混淆特征。  
> 位置：完整代码  
> 建议：保持代码可读性，避免混淆以便社区审查。

**🟡 LOW** — DOM XSS  
> 脚本未包含 DOM XSS 或注入风险（如未转义用户输入插入 innerHTML、document.write、iframe src 操作等）。  
> 位置：完整代码  
> 建议：如后续涉及 DOM 操作，需对用户输入进行严格转义。

**🟡 LOW** — 供应链风险  
> 脚本通过 @require fonts.googleapis.com 加载字体，但未涉及第三方 JS 依赖。字体 CDN可信，未见供应链风险。  
> 位置：元数据  
> 建议：如后续加载第三方 JS，需固定版本并使用官方 CDN。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/561041-duolingo-duohacker)*
