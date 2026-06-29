---
title: "Nexus免等待增强版"
---

# Nexus免等待增强版

`下载加速`  `自动化`  `Nexus Mods`  `广告屏蔽`  `页面优化`  `游戏模组`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Nexus_No_Wait.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**2.1.8**　　发现时间：**2026-06-29**　　来源：[GreasyFork](https://greasyfork.org/scripts/519037-nexus-no-wait) <Badge type="tip" text="GreasyFork" />　　安装量：**15,230**　　评分：👍31 / 👎2

## 功能介绍

本脚本用于加速 Nexus Mods 网站的下载流程，自动跳过等待倒计时，自动开始下载，并支持多种下载方式（手动/Vortex/MO2/NMM）。还可自动关闭下载页面，跳过依赖提示，减少广告干扰。

## 适用网站

- Nexus Mods

## 使用方法

1. 安装脚本后，访问 Nexus Mods 网站。
2. 选择需要下载的模组，点击下载按钮。
3. 脚本会自动跳过等待，直接开始下载。
4. 下载完成后页面可自动关闭，无需手动操作。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_getValue` | 用于读取用户配置，如自动下载设置。 |
| `GM_setValue` | 用于保存用户配置，如自定义脚本行为。 |
| `GM.xmlHttpRequest` | 用于发送网络请求，获取文件或数据。 |
| `GM_xmlhttpRequest` | 用于发送网络请求，兼容不同环境。 |
| `GM_info` | 用于获取当前脚本信息，如版本号。 |
| `GM_addStyle` | 用于添加自定义样式，优化页面显示。 |
| `GM_registerMenuCommand` | 用于在脚本菜单中添加自定义命令，方便用户操作。 |
| `GM_download` | 用于直接下载文件，提升下载体验。 |

## 安全分析

**风险等级**：🟡 LOW　　**安全评分**：89/100　　**分析时间**：2026-06-29

> 该脚本主要与 Nexus Mods 官方域名通信，未发现隐私采集、远程代码执行、代码混淆、DOM XSS 等高危行为。权限申请合理，唯一中等风险为 GM_download 可能未使用。整体安全性高，建议关注未来代码变更及权限最小化。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：*.nexusmods.com, files.nexus-cdn.com, *.nexus-cdn.com） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本使用 GM_xmlhttpRequest/GM.xmlHttpRequest 和 fetch 进行网络请求，目标均为 Nexus Mods 官方域名或 raw.githubusercontent.com（用于资源加载），未发现向第三方或未知域名发送用户数据。  
> 位置：gmRequest, getDownloadUrl, normalizeDownloadUrl, fetch 调用  
> 建议：确保仅与受信任的官方域名通信，避免未来代码变更引入第三方数据外传。

**⛔ CRITICAL** — 隐私采集  
> 脚本未监听键盘输入、未读取表单字段、未访问指纹 API、未读取剪贴板内容，仅通过 GM_getValue/GM_setValue 读写配置，无隐私采集行为。  
> 位置：loadConfig, cleanResetConfig  
> 建议：保持当前实现，避免未来引入隐私采集代码。

**🔴 HIGH** — 远程代码执行  
> 未发现 eval、new Function、setTimeout(string)、setInterval(string)、动态 script 标签、document.write 等远程代码执行风险。  
> 位置：全局  
> 建议：保持当前实现，避免引入动态代码执行。

**🔴 HIGH** — 代码混淆  
> 未发现代码混淆、base64 解码、字符串数组映射、unicode 混淆或高度压缩单行代码。  
> 位置：全局  
> 建议：保持代码可读性，便于安全审计。

**🔴 HIGH** — DOM XSS  
> 未发现将用户输入或 URL 参数直接插入 innerHTML/outerHTML，未发现 document.write 注入，未操作 iframe src 为 javascript: 协议。  
> 位置：全局  
> 建议：保持当前实现，避免引入 DOM XSS 风险。

**🟠 MEDIUM** — 权限滥用  
> @grant 申请了 GM_download，但实际代码未见明显使用（可能后续代码有用），其余权限均有对应使用。  
> 位置：元数据 @grant  
> 建议：如 GM_download 未使用，建议移除以减少权限暴露。

**🟠 MEDIUM** — 供应链风险  
> @require 未使用，所有依赖均为本地实现或官方域名资源。raw.githubusercontent.com 仅用于加载音频资源。  
> 位置：元数据 @require, ErrorSoundUrl  
> 建议：如需加载第三方库，建议固定版本并使用可信 CDN。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/519037-nexus-no-wait)*
