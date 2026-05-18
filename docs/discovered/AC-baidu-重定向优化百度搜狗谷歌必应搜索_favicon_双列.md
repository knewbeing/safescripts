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

**风险等级**：🔴 HIGH　　**安全评分**：44/100　　**分析时间**：2026-05-18

> 该脚本主要功能为优化搜索引擎重定向和界面样式，但存在严重的安全隐患。最关键问题为 @connect * 及 GM_xmlhttpRequest 权限组合，允许任意数据外传，理论上可被滥用为隐私泄露或恶意行为。脚本未检测到明显的隐私采集、代码混淆或 DOM XSS 问题，但存在供应链风险和权限滥用。建议严格限制网络请求目标、精简权限、并确保所有外部依赖来源可信。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：*） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ⚠️ 存在风险 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本通过 @connect * 允许任意域名的网络请求，存在数据外传的高风险。虽然主功能为重定向优化，但未限制目标域名，理论上可外传任意数据。  
> 位置：元数据 @connect *  
> 建议：移除 @connect *，仅保留实际需要访问的域名。

**⛔ CRITICAL** — 数据外传  
> 脚本申请了 GM_xmlhttpRequest 权限，结合 @connect *，可向任意域名发送请求，存在数据外传风险。  
> 位置：元数据 @grant GM_xmlhttpRequest  
> 建议：限制 @connect 域名范围，代码中应严格校验请求目标。

**🟠 MEDIUM** — 供应链风险  
> 脚本通过 @require 加载了 less.js 和 vue.runtime.global.prod.js，来源为 registry.npmmirror.com，虽然为知名镜像，但未锁定哈希，存在供应链被污染的可能。  
> 位置：元数据 @require  
> 建议：建议使用官方 CDN 并锁定具体版本哈希，或自行托管已审核的文件。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了大量 GM_* 权限（如 GM_getValue、GM_setValue、GM_addValueChangeListener、unsafeWindow 等），部分权限未必全部用到，存在权限滥用嫌疑。  
> 位置：元数据 @grant  
> 建议：仅申请实际使用的最小权限集，移除未用权限。

**🟠 MEDIUM** — 供应链风险  
> 脚本通过 @resource 加载了多个 less/css 文件，部分来源为 ibaidu.tujidu.com 和 gitcode.net，非官方 CDN，存在供应链风险。  
> 位置：元数据 @resource  
> 建议：建议托管在可信赖的官方 CDN 或自行托管，确保资源安全。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/14178-ac-baidu-%E9%87%8D%E5%AE%9A%E5%90%91%E4%BC%98%E5%8C%96%E7%99%BE%E5%BA%A6%E6%90%9C%E7%8B%97%E8%B0%B7%E6%AD%8C%E5%BF%85%E5%BA%94%E6%90%9C%E7%B4%A2-favicon-%E5%8F%8C%E5%88%97)*
