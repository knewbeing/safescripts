---
title: "多邻国 DuoHacker"
---

# 多邻国 DuoHacker

`多邻国`  `学习辅助`  `自动刷分`  `解锁高级`  `免费工具`  `语言学习`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Duolingo_DuoHacker.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**2026.06.21**　　发现时间：**2026-07-06**　　来源：[GreasyFork](https://greasyfork.org/scripts/561041-duolingo-duohacker) <Badge type="tip" text="GreasyFork" />　　安装量：**4,708**　　评分：👍117 / 👎47

## 功能介绍

本脚本是多邻国的辅助工具，支持自动刷经验值（XP）、宝石和连胜，还能免费解锁 Duolingo Max 高级功能。让用户更轻松提升等级和获取奖励，无需付费即可体验高级内容。

## 适用网站

- 多邻国官网
- 多邻国中国站

## 使用方法

1. 安装 Tampermonkey 插件。
2. 在 Tampermonkey 中添加本脚本。
3. 打开多邻国网站，脚本自动运行。
4. 根据页面提示选择需要的辅助功能。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_xmlhttpRequest` | 允许脚本发送网络请求，获取或提交数据。 |
| `GM_addStyle` | 允许脚本自定义和添加页面样式。 |

## 安全分析

**风险等级**：⛔ CRITICAL　　**安全评分**：47/100　　**分析时间**：2026-07-06

> Duolingo DuoHacker 用户脚本存在严重的数据外传风险，允许连接多个第三方域名（如 assets.duohacker.io.vn），可能导致用户数据泄露。未检测到隐私采集、远程代码执行、代码混淆、DOM XSS、敏感 API 调用等高风险行为。建议移除非官方域名连接，仅允许 Duolingo 官方域名，提升安全性。当前安全评分为 47，风险等级为 CRITICAL。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：duolingo.com, stories.duolingo.com, goals-api.duolingo.com） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本申请了 GM_xmlhttpRequest 权限，并允许连接多个第三方域名，包括 assets.duohacker.io.vn 和 font.duohacker.io.vn。这些非官方 Duolingo 域名可能用于数据外传或统计行为，存在数据泄露风险。  
> 位置：元数据 @grant GM_xmlhttpRequest, @connect assets.duohacker.io.vn, @connect font.duohacker.io.vn  
> 建议：限制连接目标，仅允许 Duolingo 官方域名，移除非必要的第三方连接。

**🟠 MEDIUM** — 隐私采集  
> 脚本读取 localStorage（_lang = localStorage.getItem(_I18N_KEY)），但未发现读取 cookie、sessionStorage、IndexedDB、表单字段或剪贴板内容。未检测到隐私采集行为。  
> 位置：代码行：var _lang = localStorage.getItem(_I18N_KEY) || 'vi';  
> 建议：确保后续代码不涉及敏感隐私数据读取与外传。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 GM_addStyle 权限，但未发现滥用高权限行为。GM_xmlhttpRequest 权限与实际代码用途相符。  
> 位置：元数据 @grant GM_addStyle  
> 建议：仅申请实际需要的权限，避免权限滥用。

**🟡 LOW** — 远程代码执行  
> 脚本未使用 eval、new Function、setTimeout(string)、setInterval(string)，也未动态加载远程 JS（如 @require 或 script 标签）。  
> 位置：完整代码（已审查）  
> 建议：保持代码执行安全，避免远程代码注入。

**🟡 LOW** — 代码混淆  
> 未发现代码混淆、base64 解码、字符串数组映射或高度压缩单行代码。  
> 位置：完整代码（已审查）  
> 建议：保持代码可读性，防止混淆隐藏恶意行为。

**🟡 LOW** — DOM XSS / 注入  
> 未发现 DOM XSS 风险，未将用户输入或 URL 参数直接插入 innerHTML/outerHTML。  
> 位置：完整代码（已审查）  
> 建议：继续保持安全的 DOM 操作，避免注入风险。

**🟡 LOW** — 敏感 API 调用  
> 未检测到敏感 API 调用（如 geolocation、RTCPeerConnection、MediaDevices、Clipboard、Notification）。  
> 位置：完整代码（已审查）  
> 建议：避免调用敏感 API，保护用户隐私。

**🟡 LOW** — 供应链风险  
> 脚本未使用 @require 加载第三方库，未发现供应链风险。  
> 位置：元数据（无 @require）  
> 建议：如需加载第三方库，建议固定版本哈希并使用官方 CDN。

**🟡 LOW** — ClickJacking / iframe 风险  
> 未发现修改 frame 保护策略或创建隐藏 iframe 用于数据提取。  
> 位置：完整代码（已审查）  
> 建议：避免 iframe 滥用，防止 ClickJacking。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/561041-duolingo-duohacker)*
