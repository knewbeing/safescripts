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

**风险等级**：🔴 HIGH　　**安全评分**：47/100　　**分析时间**：2026-07-27

> Duolingo DuoHacker 用户脚本存在严重的数据外传风险，连接多个第三方域名并申请高权限。虽然当前代码未见明显隐私采集和代码混淆，但供应链风险和权限滥用问题突出。建议严格限制外部连接、移除未使用权限、仅使用官方 CDN 并固定资源版本。整体安全风险较高，不建议在生产环境使用。

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
> 脚本申请 GM_xmlhttpRequest 权限，并声明 @connect 多个第三方域名，包括 duohacker.io.vn、raw.githubusercontent.com、greasyfork.org 等，存在数据外传风险。虽然部分为资源加载，但部分为自有域名，可能用于数据收集或追踪。  
> 位置：元数据 @grant/@connect，代码 GM_xmlhttpRequest  
> 建议：限制仅连接 Duolingo 官方域名，避免连接第三方资源服务器，明确数据传输内容。

**🟠 MEDIUM** — 隐私采集  
> 脚本通过 localStorage.getItem 读取本地存储，虽然目前仅用于语言选择，但后续可能扩展为隐私数据采集。  
> 位置：代码 var _lang = localStorage.getItem(_I18N_KEY) || 'vi';  
> 建议：仅存储非敏感数据，避免读取/写入用户隐私信息。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请 GM_xmlhttpRequest 高权限，但当前代码段未见实际调用，存在权限滥用风险。  
> 位置：元数据 @grant GM_xmlhttpRequest  
> 建议：仅申请实际需要的权限，移除未使用的高权限。

**🟠 MEDIUM** — 供应链风险  
> 脚本声明 @connect assets.duohacker.io.vn 和 font.duohacker.io.vn 等非官方 CDN，存在供应链风险，资源可能被篡改。  
> 位置：元数据 @connect  
> 建议：仅使用官方可信 CDN，固定资源版本哈希。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/561041-duolingo-duohacker)*
