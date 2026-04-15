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

> The script is designed to bypass shortlink services and includes multiple permissions to perform its functions. It makes network requests to trusted update and resource servers but does not appear to transmit user data to unknown third parties. No privacy-invasive behaviors such as cookie or form data reading or keyboard event listening were detected. No dynamic code execution or suspicious obfuscation is present. Permissions requested align with the script's functionality. Overall, the script poses a medium security risk primarily due to network requests and broad permissions but no critical privacy violations or remote code execution risks were found.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：https://update.greasyfork.org, https://i.ibb.co） |
| 隐私采集 | ✅ 未检测到 |

### 发现的问题

**⛔ CRITICAL** — Data Transmission  
> The script uses GM_xmlhttpRequest and @require to load external resources from greasyfork.org and i.ibb.co. These are third-party domains but are commonly used for script updates and icons. No evidence of user data being sent to unknown third-party servers.  
> 位置：@require and GM_xmlhttpRequest usage  
> 建议：Verify the trustworthiness of the external resources and monitor network requests to ensure no sensitive data is leaked.

**⛔ CRITICAL** — Privacy Collection  
> No evidence found that the script reads document.cookie, localStorage, sessionStorage, or listens to keyboard input events. No access to form fields or browser fingerprinting APIs detected.  
> 位置：Script code  
> 建议：Ensure no future code additions introduce privacy-invasive behaviors.

**🔴 HIGH** — Permissions Abuse  
> The script requests multiple high-level permissions such as GM_setValue, GM_getValue, GM_addStyle, GM_openInTab, GM_setClipboard, GM_xmlhttpRequest, GM_registerMenuCommand, and window.onurlchange. The code uses these permissions appropriately for its functionality (bypassing shortlinks, opening tabs, clipboard operations, etc.). No unused or excessive permissions detected.  
> 位置：@grant metadata and script code  
> 建议：Maintain minimal required permissions and review periodically.

**🔴 HIGH** — Remote Code Execution  
> The script does not use eval(), new Function(), setTimeout(string), or innerHTML to execute remote code. The @require script is loaded from a trusted source with a fixed version number, reducing risk of supply chain attacks.  
> 位置：Script code and @require metadata  
> 建议：Continue avoiding dynamic code execution and ensure @require URLs are from trusted sources with fixed versions.

**🟠 MEDIUM** — Sensitive API Call  
> No usage of sensitive APIs such as navigator.geolocation, RTCPeerConnection, MediaDevices, or Clipboard API beyond GM_setClipboard which is granted and used legitimately.  
> 位置：Script code and @grant metadata  
> 建议：Monitor usage of sensitive APIs to prevent abuse.

**🟠 MEDIUM** — Code Obfuscation  
> No signs of code obfuscation, base64 decoding, or suspicious string concatenation for code execution found in the script.  
> 位置：Script code  
> 建议：Maintain code transparency for easier security audits.

**🟡 LOW** — External Dependency  
> The external dependency @require is loaded from greasyfork.org with a fixed version number, which is a trusted source for user scripts. The icon is loaded from i.ibb.co, a common image hosting service. No other external dependencies detected.  
> 位置：@require and @icon metadata  
> 建议：Continue to use trusted sources and fixed versions for dependencies.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/431691-bypass-all-shortlinks)*
