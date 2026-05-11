---
title: "AC-baidu-重定向优化百度搜狗谷歌必应搜索_favicon_双列"
---

# AC-baidu-重定向优化百度搜狗谷歌必应搜索_favicon_双列



<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/AC-baidu-重定向优化百度搜狗谷歌必应搜索_favicon_双列.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**27.19**　　发现时间：**2026-04-20**　　来源：[GreasyFork](https://greasyfork.org/scripts/14178-ac-baidu-%E9%87%8D%E5%AE%9A%E5%90%91%E4%BC%98%E5%8C%96%E7%99%BE%E5%BA%A6%E6%90%9C%E7%8B%97%E8%B0%B7%E6%AD%8C%E5%BF%85%E5%BA%94%E6%90%9C%E7%B4%A2-favicon-%E5%8F%8C%E5%88%97) <Badge type="tip" text="GreasyFork" />　　安装量：**3,424,168**　　评分：👍7635 / 👎34

## 功能介绍



## 适用网站

- 通用

## 使用方法

- 请参阅脚本说明

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| — | 无特殊权限 |

## 安全分析

**风险等级**：⛔ CRITICAL　　**安全评分**：34/100　　**分析时间**：2026-05-11

> 该脚本存在严重的安全隐患，主要体现在元数据层面的 @connect *（允许任意域名跨域请求）和 GM_xmlhttpRequest 权限的组合，理论上可被用于数据外传。脚本还申请了 unsafeWindow 权限，增加了与页面 JS 互操作的攻击面。此外，@require 和 @resource 加载的第三方库和样式文件未锁定哈希，存在供应链污染风险。未发现明显的隐私采集、代码混淆或 DOM XSS 问题。建议严格限制 @connect 域名、精简权限申请，并锁定所有外部依赖的版本或哈希。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ⚠️ 存在风险 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> @connect * 允许任意域名的网络请求，存在数据外传潜在风险，尤其是 GM_xmlhttpRequest 可被用于外传数据。  
> 位置：元数据 @connect *  
> 建议：严格限制 @connect 域名范围，移除 *，仅保留实际需要访问的可信域名。

**🔴 HIGH** — 权限滥用  
> 脚本申请了 GM_xmlhttpRequest 权限，理论上可进行任意跨域请求，结合 @connect * 存在高风险。  
> 位置：元数据 @grant GM_xmlhttpRequest  
> 建议：仅在确有必要时申请 GM_xmlhttpRequest，并配合严格的 @connect 域名白名单。

**🔴 HIGH** — 权限滥用  
> 脚本申请了 unsafeWindow 权限，可能导致与页面 JS 互操作，存在被页面注入恶意代码的风险。  
> 位置：元数据 @grant unsafeWindow  
> 建议：如非必要，移除 unsafeWindow 权限，或确保所有与 unsafeWindow 的交互均有严格校验。

**🟠 MEDIUM** — 供应链风险  
> 脚本通过 @require 加载了第三方库（less.js、vue.js），但未锁定版本哈希，存在供应链污染风险。  
> 位置：元数据 @require  
> 建议：使用可信 CDN 并锁定具体版本或哈希，避免加载可变内容。

**🟠 MEDIUM** — 供应链风险  
> 脚本通过 @resource 加载了多个 less/css 文件，部分来源为自定义域名（如 ibaidu.tujidu.com），存在供应链风险。  
> 位置：元数据 @resource  
> 建议：确保所有资源来源可信，优先使用官方或知名 CDN，必要时校验内容完整性。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了大量 GM_* 权限（如 GM_getValue、GM_setValue、GM_addValueChangeListener 等），部分可能未实际使用，存在权限滥用嫌疑。  
> 位置：元数据 @grant  
> 建议：仅申请实际使用的权限，移除冗余权限。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/14178-ac-baidu-%E9%87%8D%E5%AE%9A%E5%90%91%E4%BC%98%E5%8C%96%E7%99%BE%E5%BA%A6%E6%90%9C%E7%8B%97%E8%B0%B7%E6%AD%8C%E5%BF%85%E5%BA%94%E6%90%9C%E7%B4%A2-favicon-%E5%8F%8C%E5%88%97)*
