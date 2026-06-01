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

**风险等级**：🔴 HIGH　　**安全评分**：44/100　　**分析时间**：2026-06-01

> 该脚本存在严重的权限滥用问题，@connect * 允许任意外联，结合 GM_xmlhttpRequest 权限，理论上可外传任意数据，属于高危设计。虽然当前片段未见实际数据外传和隐私收集代码，但供应链风险和权限冗余也较为突出。建议严格限制 @connect 域名、精简权限、锁定依赖版本，并定期审查依赖资源。未发现代码混淆、DOM XSS、WebSocket、隐私采集等直接高危实现。整体风险评级为 HIGH，不建议在敏感环境下使用。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ⚠️ 存在风险 |

### 发现的问题

**⛔ CRITICAL** — 权限滥用/潜在数据外传  
> @connect * 允许任意域名的网络请求，存在数据外传的高风险窗口，虽然代码片段未见实际外传实现，但权限极高。  
> 位置：元数据 @connect  
> 建议：移除 @connect *，仅保留实际需要的域名，最小化外联权限。

**🔴 HIGH** — 权限滥用  
> 脚本申请了 GM_xmlhttpRequest 权限，具备跨域请求能力，结合 @connect *，理论上可外传任意数据。  
> 位置：元数据 @grant  
> 建议：仅在确有必要时申请 GM_xmlhttpRequest，并严格限制 @connect 域名。

**🟠 MEDIUM** — 供应链风险  
> 脚本通过 @require 加载 less.js 和 vue.runtime.global.prod.js，来源为 registry.npmmirror.com，虽然为知名镜像，但未锁定哈希，存在供应链污染风险。  
> 位置：元数据 @require  
> 建议：建议使用官方 CDN 并锁定具体版本或哈希，避免依赖被篡改。

**🟠 MEDIUM** — 供应链风险  
> 脚本通过 @resource 加载多个 .less 和 .css 文件，部分来源为 ibaidu.tujidu.com、gitcode.net 等非官方 CDN，存在供应链风险。  
> 位置：元数据 @resource  
> 建议：建议仅使用可信赖的官方 CDN，并校验资源完整性。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了大量 GM_* 权限（如 GM_setValue, GM_getValue, GM_addValueChangeListener, unsafeWindow 等），部分权限未在片段代码中实际使用，存在权限冗余。  
> 位置：元数据 @grant  
> 建议：仅申请实际使用的权限，减少攻击面。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/14178-ac-baidu-%E9%87%8D%E5%AE%9A%E5%90%91%E4%BC%98%E5%8C%96%E7%99%BE%E5%BA%A6%E6%90%9C%E7%8B%97%E8%B0%B7%E6%AD%8C%E5%BF%85%E5%BA%94%E6%90%9C%E7%B4%A2-favicon-%E5%8F%8C%E5%88%97)*
