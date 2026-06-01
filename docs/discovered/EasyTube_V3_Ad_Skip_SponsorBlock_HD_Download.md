---
title: "EasyTube V3 — Ad Skip, SponsorBlock & HD Download⬇️🚀"
---

# EasyTube V3 — Ad Skip, SponsorBlock & HD Download⬇️🚀



<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/EasyTube_V3_Ad_Skip_SponsorBlock_HD_Download.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**3.0.0**　　发现时间：**2026-04-20**　　来源：[GreasyFork](https://greasyfork.org/scripts/561432-easytube-v3-ad-skip-sponsorblock-hd-download) <Badge type="tip" text="GreasyFork" />　　安装量：**4,970**　　评分：👍5 / 👎2

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

**风险等级**：🟠 MEDIUM　　**安全评分**：75/100　　**分析时间**：2026-06-01

> 脚本核心功能涉及与 SponsorBlock API 及多个 Cobalt 实例的网络通信，存在数据外传风险（如视频 ID、SponsorBlock 查询、下载请求等）。未发现隐私采集、远程代码执行、代码混淆、DOM XSS、权限滥用、敏感 API 调用、供应链或 iframe 风险。建议用户知悉其与第三方服务器通信，避免在敏感环境下使用。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：sponsor.ajay.app, co.wuk.sh, cobalt.api.timelessnesses.me） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本通过 GM_xmlhttpRequest 访问 SponsorBlock API（sponsor.ajay.app）和多个 Cobalt 实例（co.wuk.sh、cobalt.api.timelessnesses.me、api.cobalt.tools），用于获取 SponsorBlock 片段和视频下载服务。虽然这些用途与功能描述一致，但属于第三方服务器，存在数据外传风险。  
> 位置：CFG.sbApi, CFG.cobaltInstances, GM_xmlhttpRequest 调用  
> 建议：仅允许可信 API 域名，明确告知用户外部通信内容，避免发送敏感信息。

**⛔ CRITICAL** — 隐私采集（未发现问题，仅说明）  
> 脚本使用 GM_setValue/GM_getValue 持久化用户设置，但未发现读取 cookie、localStorage、sessionStorage、IndexedDB、表单字段、剪贴板或监听键盘输入等隐私采集行为。  
> 位置：S, save()  
> 建议：继续避免收集用户敏感信息。

**🔴 HIGH** — 远程代码执行（未发现问题，仅说明）  
> 未发现 eval、new Function、setTimeout(string)、setInterval(string)、动态 script 标签、@require 或 document.write 执行远程代码。  
> 位置：全局  
> 建议：保持不使用远程代码执行相关 API。

**🔴 HIGH** — 代码混淆（未发现问题，仅说明）  
> 未发现代码混淆、base64 解码、字符串数组映射或高度压缩单行代码。  
> 位置：全局  
> 建议：保持代码可读性，便于安全审计。

**🔴 HIGH** — DOM XSS/注入（未发现问题，仅说明）  
> 未发现将用户输入或 URL 参数直接插入 innerHTML/outerHTML，未见 document.write 注入不可信内容。  
> 位置：全局  
> 建议：继续避免 DOM XSS 风险。

**🟠 MEDIUM** — 权限滥用（未发现问题，仅说明）  
> @grant 申请了 GM_addStyle、GM_xmlhttpRequest、GM_setValue、GM_getValue，均有实际使用，无权限滥用。  
> 位置：元数据 @grant  
> 建议：仅申请实际需要的权限。

**🟠 MEDIUM** — 敏感 API 调用（未发现问题，仅说明）  
> 未发现敏感 API（如 geolocation、RTCPeerConnection、MediaDevices、Clipboard API、Notification API）调用。  
> 位置：全局  
> 建议：避免调用敏感 API。

**🟠 MEDIUM** — 供应链风险（未发现问题，仅说明）  
> 未使用 @require 加载第三方库，无供应链风险。  
> 位置：元数据 @require  
> 建议：如需第三方库，建议使用官方 CDN 并锁定版本哈希。

**🟡 LOW** — ClickJacking/iframe 风险（未发现问题，仅说明）  
> 未见修改 frame 保护策略或创建隐藏 iframe。  
> 位置：全局  
> 建议：继续避免 ClickJacking/iframe 风险。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/561432-easytube-v3-ad-skip-sponsorblock-hd-download)*
