---
title: "Nexus免等待下载增强"
---

# Nexus免等待下载增强

`下载加速`  `自动化`  `Nexus Mods`  `跳过等待`  `工具增强`  `游戏模组`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Nexus_No_Wait.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**2.1.8**　　发现时间：**2026-07-06**　　来源：[GreasyFork](https://greasyfork.org/scripts/519037-nexus-no-wait) <Badge type="tip" text="GreasyFork" />　　安装量：**15,899**　　评分：👍31 / 👎2

## 功能介绍

本脚本可自动跳过 Nexus Mods 网站的下载等待时间，自动开始下载文件，并支持多种下载方式（手动、Vortex、MO2、NMM）。还可自动关闭下载页面、跳过下载前的要求提示，并隐藏会员推广信息。

## 适用网站

- Nexus Mods

## 使用方法

1. 安装脚本后，访问 Nexus Mods 网站。
2. 选择你需要下载的模组，点击下载按钮。
3. 下载会自动开始，无需等待倒计时。
4. 下载完成后页面可自动关闭，无需手动操作。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_getValue` | 用于读取用户配置，记住脚本设置。 |
| `GM_setValue` | 用于保存用户配置，存储脚本设置。 |
| `GM.xmlHttpRequest` | 用于发送网络请求，获取文件或数据。 |
| `GM_xmlhttpRequest` | 用于发送网络请求，获取文件或数据。 |
| `GM_info` | 用于获取脚本自身信息，如版本号。 |
| `GM_addStyle` | 用于添加自定义样式，优化页面显示。 |
| `GM_registerMenuCommand` | 用于在菜单中添加脚本功能入口，方便用户操作。 |
| `GM_download` | 用于直接下载文件，提升下载体验。 |

## 安全分析

**风险等级**：🟢 SAFE　　**安全评分**：100/100　　**分析时间**：2026-07-06

> 该脚本仅与 Nexus Mods 官方域名和 GitHub 静态资源交互，不采集用户隐私数据、不执行远程代码、不混淆、不存在 DOM 注入和 iframe 风险。所有权限均有实际用途，未发现供应链风险。整体安全性高，适合公开使用。

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
> 脚本使用 GM_xmlhttpRequest 和 fetch 进行网络请求，但仅限于 Nexus Mods 官方域名和 GitHub 静态资源，未发现向第三方服务器发送用户数据或页面内容。  
> 位置：gmRequest(), fetch() 调用  
> 建议：确保请求目标仅为受信任域名，避免携带敏感用户数据。

**⛔ CRITICAL** — 隐私采集  
> 脚本未监听键盘输入、未读取表单字段、未访问剪贴板、未收集指纹信息，仅使用 GM_getValue/GM_setValue 存储配置，未涉及隐私采集。  
> 位置：全局代码  
> 建议：继续保持不采集用户隐私数据。

**🔴 HIGH** — 远程代码执行  
> 未发现 eval、new Function、setTimeout(string)、setInterval(string) 等远程代码执行风险，也未动态加载外部脚本。  
> 位置：全局代码  
> 建议：避免任何动态代码执行和远程脚本加载。

**🔴 HIGH** — 代码混淆  
> 代码未混淆，无 base64 解码、字符串数组映射、unicode 混淆或高度压缩单行代码。  
> 位置：全局代码  
> 建议：保持代码可读性，便于安全审查。

**🔴 HIGH** — DOM XSS / 注入  
> 未发现将用户输入或 URL 参数直接插入 innerHTML/outerHTML，未发现 document.write 注入或 iframe src 操作。  
> 位置：全局代码  
> 建议：继续避免 DOM XSS 注入风险。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 GM_download、GM_xmlhttpRequest、GM_getValue、GM_setValue 等权限，均有实际使用，未发现权限滥用。  
> 位置：元数据 @grant  
> 建议：仅申请实际需要的权限。

**🟠 MEDIUM** — 敏感 API 调用  
> 脚本未调用敏感 API（如 geolocation、RTCPeerConnection、MediaDevices、Clipboard、Notification）。  
> 位置：全局代码  
> 建议：避免调用敏感 API，除非必要且用户知情。

**🟠 MEDIUM** — 供应链风险  
> 未使用 @require 加载第三方库，所有依赖均为内置代码，无供应链风险。  
> 位置：元数据  
> 建议：如需加载第三方库，建议使用官方 CDN 并固定版本哈希。

**🟡 LOW** — ClickJacking / iframe 风险  
> 未修改 frame 保护策略，未创建隐藏 iframe 用于数据提取。  
> 位置：全局代码  
> 建议：继续避免 iframe 风险和 ClickJacking。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/519037-nexus-no-wait)*
