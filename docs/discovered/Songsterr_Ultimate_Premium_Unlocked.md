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

**风险等级**：🟡 LOW　　**安全评分**：84/100　　**分析时间**：2026-07-13

> 该脚本未检测到数据外传、隐私采集、远程代码执行、代码混淆、DOM XSS 等高危行为。主要风险为申请了 GM_xmlhttpRequest 和 unsafeWindow 权限，但主代码未实际使用 GM_xmlhttpRequest，且 @require 的第三方库来源可信。整体安全风险较低，但建议最小化权限申请。

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
> @grant 申请了 GM_xmlhttpRequest 权限，但主代码未检测到实际使用。若后续代码有使用，需关注数据外传风险。  
> 位置：元数据 @grant  
> 建议：仅申请实际需要的权限，避免权限滥用。

**🟠 MEDIUM** — 权限滥用  
> @grant 申请了 unsafeWindow 权限，可能导致脚本可访问页面全局对象，增加潜在攻击面。  
> 位置：元数据 @grant  
> 建议：仅在确有必要时申请 unsafeWindow，并确保代码安全。

**🟠 MEDIUM** — 供应链风险  
> @require 加载了第三方库 alphaTab，来源为 jsdelivr 官方 CDN，且指定了明确版本号，供应链风险较低。  
> 位置：元数据 @require  
> 建议：建议定期检查依赖库安全性，确保 CDN 未被污染。

**🟡 LOW** — 隐私采集  
> 脚本通过 localStorage 记录日志开关和 YouTube 音频模式，但未检测到敏感信息采集。  
> 位置：main code  
> 建议：确保不采集用户敏感信息。

**🟡 LOW** — 安全性良好  
> 脚本未检测到任何网络请求、数据外传、WebSocket、EventSource、键盘监听、表单读取、eval、new Function、字符串混淆、DOM XSS、敏感 API 调用等高危行为。  
> 位置：main code  
> 建议：继续保持代码简洁透明。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/564818-songsterr-ultimate-premium-unlocked)*
