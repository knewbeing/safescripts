---
title: "Nexus免等待增强版"
---

# Nexus免等待增强版

`下载加速`  `自动化`  `Nexus Mods`  `跳过等待`  `游戏模组`  `页面优化`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Nexus_No_Wait.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**2.1.6**　　发现时间：**2026-06-01**　　来源：[GreasyFork](https://greasyfork.org/scripts/519037-nexus-no-wait) <Badge type="tip" text="GreasyFork" />　　安装量：**13,077**　　评分：👍28 / 👎2

## 功能介绍

本脚本可以跳过 Nexus Mods 网站上的下载倒计时，自动开始下载，并支持多种下载方式（手动、Vortex、MO2、NMM）。还可自动关闭下载页面、跳过下载前的要求提示，并隐藏会员推广内容。

## 适用网站

- Nexus Mods

## 使用方法

1. 安装脚本后，访问 Nexus Mods 网站。
2. 选择你想下载的模组，点击下载按钮。
3. 下载会自动开始，无需等待倒计时。
4. 下载完成后页面可自动关闭。
5. 如需更改设置，可在油猴菜单中调整。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_getValue` | 用于读取用户设置，例如是否自动下载。 |
| `GM_setValue` | 用于保存用户设置，如自定义脚本行为。 |
| `GM.xmlHttpRequest` | 用于发起网络请求，获取下载链接或处理文件。 |
| `GM_xmlhttpRequest` | 用于发起网络请求，获取下载链接或处理文件。 |
| `GM_info` | 获取当前脚本的信息，如版本号。 |
| `GM_addStyle` | 用于添加自定义样式，优化页面显示。 |
| `GM_registerMenuCommand` | 在脚本菜单中添加命令，方便用户操作。 |

## 安全分析

**风险等级**：🟢 SAFE　　**安全评分**：100/100　　**分析时间**：2026-06-01

> 该脚本主要用于提升 Nexus Mods 下载体验，未发现数据外传、隐私采集、远程代码执行、代码混淆、DOM XSS、权限滥用、敏感 API 滥用、供应链或 iframe 风险。网络请求仅限于 nexusmods.com 官方域名和 raw.githubusercontent.com（音频文件），无用户数据外传。整体安全性高，建议继续保持良好安全实践。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — 数据外传检查  
> 使用 GM.xmlHttpRequest/GM_xmlhttpRequest 进行网络请求，仅限于 nexusmods.com 和 raw.githubusercontent.com，无发现向第三方服务器外传用户数据。  
> 位置：gmRequest, getDownloadUrl, normalizeDownloadUrl  
> 建议：确保请求内容不包含敏感用户数据，且目标域名可信。

**⛔ CRITICAL** — 隐私采集检查  
> 未发现 document.cookie、localStorage、sessionStorage、IndexedDB、剪贴板读取、键盘监听、表单读取等隐私采集行为。  
> 位置：全局  
> 建议：保持不采集用户隐私数据。

**🔴 HIGH** — 远程代码执行检查  
> 未发现 eval、new Function、setTimeout(string)、setInterval(string)、动态 script 标签、@require 动态远程 JS、document.write 插入脚本等远程代码执行风险。  
> 位置：全局  
> 建议：继续避免使用动态代码执行相关 API。

**🔴 HIGH** — 代码混淆检查  
> 未发现代码混淆、base64 解码执行、字符串数组混淆、unicode 混淆或高度压缩单行代码。  
> 位置：全局  
> 建议：保持代码可读性，便于安全审计。

**🔴 HIGH** — DOM XSS 检查  
> 未发现将用户输入或 URL 参数直接插入 innerHTML/outerHTML，未见 document.write 注入不可信内容，未见 iframe src 为 javascript:。  
> 位置：全局  
> 建议：继续避免 DOM XSS 风险。

**🟠 MEDIUM** — 权限滥用检查  
> @grant 权限与实际代码使用基本匹配，未见高权限滥用。  
> 位置：元数据与全局  
> 建议：如未使用 GM_download、GM_openInTab 等高权限，建议不申请。

**🟠 MEDIUM** — 敏感 API 检查  
> 未发现敏感 API（地理位置、RTCPeerConnection、摄像头/麦克风、剪贴板读取、通知）调用。  
> 位置：全局  
> 建议：继续避免敏感 API 滥用。

**🟠 MEDIUM** — 供应链风险检查  
> @require 未使用，第三方库仅通过 @connect raw.githubusercontent.com 加载音频文件，来源可信。  
> 位置：元数据  
> 建议：如需第三方库，建议锁定版本哈希并使用官方 CDN。

**🟡 LOW** — ClickJacking/iframe 检查  
> 未发现修改 frame 保护策略或创建隐藏 iframe 用于数据提取。  
> 位置：全局  
> 建议：继续避免 ClickJacking/iframe 风险。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/519037-nexus-no-wait)*
