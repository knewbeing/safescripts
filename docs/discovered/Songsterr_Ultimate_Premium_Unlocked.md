---
title: "Songsterr高级功能解锁"
---

# Songsterr高级功能解锁

`音乐`  `吉他谱`  `功能解锁`  `下载导出`  `Songsterr`  `高级功能`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Songsterr_Ultimate_Premium_Unlocked.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**5.1.1**　　发现时间：**2026-07-06**　　来源：[GreasyFork](https://greasyfork.org/scripts/564818-songsterr-ultimate-premium-unlocked) <Badge type="tip" text="GreasyFork" />　　安装量：**4,480**　　评分：👍5 / 👎1

## 功能介绍

此脚本可在 Songsterr 网站上解锁所有 Plus（高级）功能，包括速度调节、循环播放、独奏、静音和无暂停，还支持原生导出吉他谱（.gp 和 .midi 文件）。用户无需付费即可体验高级功能。

## 适用网站

- Songsterr

## 使用方法

1. 1. 安装脚本后，打开 Songsterr 网站。
2. 2. 选择你喜欢的乐谱，所有高级功能会自动解锁。
3. 3. 可直接调整速度、循环、独奏、静音等设置。
4. 4. 点击导出按钮即可下载 .gp 或 .midi 格式的乐谱。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `unsafeWindow` | 允许脚本访问和修改网页中的全局变量，便于功能解锁。 |
| `GM_xmlhttpRequest` | 用于跨域请求下载或导出吉他谱文件。 |
| `GM_addStyle` | 允许脚本动态添加自定义样式，优化界面显示。 |

## 安全分析

**风险等级**：🟠 MEDIUM　　**安全评分**：76/100　　**分析时间**：2026-07-27

> 该脚本未检测到数据外传、远程代码执行、代码混淆、DOM XSS、敏感 API 调用等高危行为。主要风险为申请了未实际使用的高权限（GM_xmlhttpRequest、unsafeWindow）、声明 @connect 到第三方域，以及依赖第三方库。当前版本未采集敏感隐私数据，仅使用 localStorage 存储配置。建议移除未用权限，持续关注依赖库安全，避免后续扩展引入高危行为。

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
> 申请了 GM_xmlhttpRequest 权限，并声明 @connect 到两个 cloudfront.net 域，但代码未实际调用 GM_xmlhttpRequest 或其他网络请求。若后续版本加入数据外传，风险提升。  
> 位置：元数据 @grant/@connect  
> 建议：仅申请实际需要的权限，移除未使用的高权限和 @connect 域。

**🟠 MEDIUM** — 隐私采集  
> 脚本通过 localStorage 读取和写入日志开关、YouTube 音频模式等配置，但未采集敏感隐私数据（如 cookie、表单、剪贴板等）。  
> 位置：LOG_KEY/localStorage  
> 建议：确保仅存储非敏感配置，避免后续扩展隐私采集。

**🟠 MEDIUM** — 供应链风险  
> 使用 @require 加载第三方库 alphaTab.min.js，来源为 jsdelivr 官方 CDN，版本号固定（1.8.1），供应链风险较低。  
> 位置：@require  
> 建议：持续关注依赖库安全，避免加载未知来源或可变版本。

**🟠 MEDIUM** — 权限滥用  
> 申请了 unsafeWindow 权限，允许脚本与页面全局对象交互，存在被页面脚本利用的风险。  
> 位置：元数据 @grant  
> 建议：仅在确实需要时申请 unsafeWindow，避免滥用。

**🟡 LOW** — 远程代码执行/混淆  
> 未检测到 eval、new Function、setTimeout(string)、setInterval(string) 等远程代码执行风险，也未检测到代码混淆。  
> 位置：主代码段  
> 建议：保持代码透明，避免后续引入动态执行或混淆。

**🟡 LOW** — 通用安全  
> 未检测到 DOM XSS、注入、敏感 API 调用、WebSocket、剪贴板读取、iframe 风险等。  
> 位置：主代码段  
> 建议：继续保持安全开发，避免后续引入相关风险。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/564818-songsterr-ultimate-premium-unlocked)*
