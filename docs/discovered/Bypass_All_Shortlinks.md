---
title: 旁路全部短链接
---

# 旁路全部短链接

`短链接绕过`  `广告屏蔽`  `自动跳转`  `视频下载`  `浏览器脚本`  `用户脚本`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Bypass_All_Shortlinks.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**96.7**　　发现时间：**2026-04-15**　　来源：[GreasyFork](https://greasyfork.org/scripts/431691-bypass-all-shortlinks) <Badge type="tip" text="GreasyFork" />　　安装量：**464,335**　　评分：👍574 / 👎89

## 功能介绍

本脚本自动绕过各种短链接和链接缩短服务，直接跳转到目标页面。它能跳过广告平台如AdFly，屏蔽烦人的广告和弹窗，阻止广告拦截检测，并支持自动下载文件和YouTube视频。使用后浏览体验更流畅，无需手动关闭广告或等待跳转。

## 适用网站

- 所有支持短链接的网站（除部分知名大站和金融、教育、政府等安全站点）

## 使用方法

1. 安装脚本后，访问任何短链接网站。
2. 脚本会自动跳过短链接和广告，直接跳转目标页面。
3. 遇到YouTube视频或文件时，自动开始下载。
4. 可通过脚本菜单调整设置和功能。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_setValue` | 存储和读取脚本设置和数据 |
| `GM_getValue` | 读取脚本设置和数据 |
| `GM_addStyle` | 添加自定义样式美化页面 |
| `GM_openInTab` | 在新标签页打开链接 |
| `GM_setClipboard` | 复制内容到剪贴板 |
| `GM_xmlhttpRequest` | 发送跨域网络请求获取数据 |
| `window.onurlchange` | 监听浏览器地址变化事件 |
| `GM_registerMenuCommand` | 注册菜单命令，方便用户操作脚本 |

## 安全分析

**风险等级**：🟠 MEDIUM　　**分析时间**：2026-04-15

> The script requests network resources from trusted third-party domains for updates and icons, and uses GM_xmlhttpRequest and GM_setClipboard which may handle user data. No direct privacy invasive data collection such as cookie or form reading or keyboard event listening is detected. No remote code execution or permission abuse is found. External dependencies are from trusted sources with version pinning. Overall, the script poses a medium security risk primarily due to network requests and clipboard access.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：https://update.greasyfork.org, https://i.ibb.co） |
| 隐私采集 | ✅ 未检测到 |

### 发现的问题

**⛔ CRITICAL** — Data Transmission  
> Script uses GM_xmlhttpRequest and @require to load remote resources from greasyfork.org and i.ibb.co, which are third-party domains. However, these are standard update and icon URLs and do not appear to transmit user data.  
> 位置：@require and GM_xmlhttpRequest usage in script  
> 建议：Verify the trustworthiness of the @require URL and monitor network requests to ensure no sensitive user data is transmitted.

**⛔ CRITICAL** — Data Transmission  
> Script reads and modifies clipboard via GM_setClipboard, which may access user clipboard data.  
> 位置：GM_setClipboard usage  
> 建议：Ensure clipboard data is handled securely and not sent to external servers.

**⛔ CRITICAL** — Privacy Collection  
> Script does not explicitly read document.cookie, localStorage, or sessionStorage, nor does it listen to keyboard events or access form input values.  
> 位置：Code analysis  
> 建议：No action needed as no privacy invasive data collection detected.

**🔴 HIGH** — Remote Code Execution  
> No use of eval(), new Function(), setTimeout(string), or dynamic script injection detected.  
> 位置：Code analysis  
> 建议：No action needed.

**🔴 HIGH** — Permission Abuse  
> @grant permissions include GM_setValue, GM_getValue, GM_addStyle, GM_openInTab, GM_setClipboard, GM_xmlhttpRequest, window.onurlchange, GM_registerMenuCommand. All appear to be used appropriately in the script context.  
> 位置：@grant metadata vs code usage  
> 建议：No excessive permissions detected.

**🟠 MEDIUM** — Sensitive API Call  
> No sensitive APIs such as navigator.geolocation, RTCPeerConnection, MediaDevices, or Clipboard API (except GM_setClipboard) are used.  
> 位置：Code analysis  
> 建议：No action needed.

**🟠 MEDIUM** — Code Obfuscation  
> No evidence of code obfuscation, base64 decoding, or string concatenation for code execution found.  
> 位置：Code analysis  
> 建议：No action needed.

**🟡 LOW** — External Dependency  
> @require loads MonkeyConfig Mod.js from greasyfork.org with a fixed version number, which is a trusted source and version pinning reduces supply chain risk.  
> 位置：@require metadata  
> 建议：Maintain version pinning and verify source trustworthiness.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/431691-bypass-all-shortlinks)*
