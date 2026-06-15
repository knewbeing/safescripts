---
title: "Nexus免等待增强版"
---

# Nexus免等待增强版

`下载加速`  `自动化`  `Nexus Mods`  `跳过等待`  `页面优化`  `游戏模组`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Nexus_No_Wait.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**2.1.6**　　发现时间：**2026-06-15**　　来源：[GreasyFork](https://greasyfork.org/scripts/519037-nexus-no-wait) <Badge type="tip" text="GreasyFork" />　　安装量：**14,128**　　评分：👍30 / 👎2

## 功能介绍

本脚本可自动跳过 Nexus Mods 网站上的下载等待倒计时，自动开始下载，并支持多种下载方式（手动、Vortex、MO2、NMM）。还可自动关闭下载页面、跳过下载前的要求提示，并隐藏会员推广信息。

## 适用网站

- Nexus Mods

## 使用方法

1. 安装脚本后，访问 Nexus Mods 网站。
2. 选择你想下载的模组，点击下载按钮。
3. 下载会自动开始，无需等待倒计时。
4. 下载完成后页面可自动关闭，无需手动操作。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_getValue` | 用于读取脚本配置和用户设置。 |
| `GM_setValue` | 用于保存脚本配置和用户设置。 |
| `GM.xmlHttpRequest` | 用于发送网络请求，获取文件或数据。 |
| `GM_xmlhttpRequest` | 用于发送网络请求，获取文件或数据。 |
| `GM_info` | 用于获取当前脚本的基本信息。 |
| `GM_addStyle` | 用于添加自定义样式，优化页面显示。 |
| `GM_registerMenuCommand` | 用于在浏览器菜单中添加脚本功能入口。 |

## 安全分析

**风险等级**：🟢 SAFE　　**安全评分**：100/100　　**分析时间**：2026-06-15

> 该脚本仅与 Nexus Mods 官方域名和 GitHub 静态资源交互，无隐私采集、远程代码执行、混淆、XSS、权限滥用、敏感 API 调用、供应链风险等安全问题。整体安全性高，适合公开使用。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本使用 GM.xmlHttpRequest 和 fetch 发起网络请求，仅针对 Nexus Mods 官方域名和 GitHub 静态资源。未发现向第三方服务器发送用户数据或页面内容。  
> 位置：gmRequest, getDownloadUrl, normalizeDownloadUrl  
> 建议：确保请求目标仅限可信域名，避免携带敏感用户数据。

**⛔ CRITICAL** — 隐私采集  
> 脚本未读取 document.cookie、localStorage、sessionStorage、IndexedDB，也未监听键盘输入或表单字段，未发现隐私采集行为。  
> 位置：全局  
> 建议：保持现有设计，避免后续添加隐私采集代码。

**🔴 HIGH** — 远程代码执行  
> 未发现 eval、new Function、setTimeout(string)、setInterval(string) 等远程代码执行风险。未动态加载外部 JS，仅加载音频资源。  
> 位置：全局  
> 建议：避免后续引入动态代码执行或远程脚本加载。

**🔴 HIGH** — 代码混淆  
> 代码未混淆，无 base64/unicode/字符串数组映射等混淆特征，结构清晰。  
> 位置：全局  
> 建议：保持代码可读性，便于社区审查。

**🔴 HIGH** — DOM XSS / 注入  
> 未发现将用户输入或 URL 参数直接插入 innerHTML/outerHTML，未发现 document.write 注入风险。  
> 位置：全局  
> 建议：如需插入内容，务必进行转义。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 GM.xmlHttpRequest、GM_getValue、GM_setValue、GM_info、GM_addStyle、GM_registerMenuCommand 权限，均有实际使用。未发现权限滥用。  
> 位置：元数据 @grant  
> 建议：仅申请实际需要的权限。

**🟠 MEDIUM** — 敏感 API 调用  
> 未调用敏感 API（地理位置、摄像头、剪贴板等）。  
> 位置：全局  
> 建议：避免后续添加敏感 API 调用。

**🟠 MEDIUM** — 供应链风险  
> @require 未使用，第三方库未引入，供应链风险低。  
> 位置：元数据  
> 建议：如需引入第三方库，建议固定版本哈希并使用官方 CDN。

**🟡 LOW** — ClickJacking / iframe 风险  
> 未修改 frame 保护策略，未创建隐藏 iframe。  
> 位置：全局  
> 建议：如需使用 iframe，需明确用途并防范 ClickJacking。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/519037-nexus-no-wait)*
