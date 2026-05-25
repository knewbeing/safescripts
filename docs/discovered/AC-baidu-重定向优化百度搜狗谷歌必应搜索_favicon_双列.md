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

**风险等级**：🔴 HIGH　　**安全评分**：47/100　　**分析时间**：2026-05-25

> 该脚本未发现实际敏感数据外传、隐私采集、远程代码执行、DOM XSS 或代码混淆行为，但元数据中存在严重权限滥用（@connect *）、供应链风险（第三方库和样式文件来源不可信），以及部分未使用的高权限申请。建议收紧权限、优化供应链安全。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ⚠️ 存在风险 |

### 发现的问题

**⛔ CRITICAL** — Permission Risk  
> @connect * 允许任意域名的网络请求，存在数据外传风险，虽然代码未见实际敏感数据外传，但此权限极高。  
> 位置：UserScript metadata (@connect *)  
> 建议：移除 @connect *，只保留实际需要的域名，避免潜在数据外传。

**🟠 MEDIUM** — Permission Abuse  
> 大量 @grant 权限申请（GM_xmlhttpRequest、unsafeWindow等），部分未在代码中实际使用，存在权限滥用风险。  
> 位置：UserScript metadata (@grant)  
> 建议：仅申请实际需要的权限，移除未使用的高权限项。

**🟠 MEDIUM** — Supply Chain Risk  
> @require 加载第三方库（less.js、vue.js）来源为 registry.npmmirror.com，非官方CDN，存在供应链风险。  
> 位置：UserScript metadata (@require)  
> 建议：建议使用官方CDN并固定版本哈希，避免供应链污染。

**🟠 MEDIUM** — Supply Chain Risk  
> @resource 加载大量样式文件，部分来源为 ibaidu.tujidu.com 和 gitcode.net，非官方域名，存在供应链风险。  
> 位置：UserScript metadata (@resource)  
> 建议：建议使用可信官方源并固定版本，避免样式文件被篡改。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/14178-ac-baidu-%E9%87%8D%E5%AE%9A%E5%90%91%E4%BC%98%E5%8C%96%E7%99%BE%E5%BA%A6%E6%90%9C%E7%8B%97%E8%B0%B7%E6%AD%8C%E5%BF%85%E5%BA%94%E6%90%9C%E7%B4%A2-favicon-%E5%8F%8C%E5%88%97)*
