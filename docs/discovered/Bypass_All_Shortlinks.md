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

> The script requests multiple permissions and uses GM_xmlhttpRequest indicating network communication with third-party servers, which poses a critical data transmission risk. No explicit privacy-invasive behaviors like cookie or storage reading or keyboard event listening were detected. No remote code execution or dynamic script injection was found. Permissions requested appear consistent with functionality. External dependencies are from trusted sources with fixed versions. Overall, the script has a medium risk level primarily due to potential data transmission.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：third-party domains potentially contacted via GM_xmlhttpRequest） |
| 隐私采集 | ✅ 未检测到 |

### 发现的问题

**⛔ CRITICAL** — Data Transmission  
> The script uses GM_xmlhttpRequest to perform network requests which may send user data to third-party servers. The exact endpoints and data sent are not fully visible in the provided snippet, but the presence of GM_xmlhttpRequest indicates potential data transmission.  
> 位置：Script code using GM_xmlhttpRequest  
> 建议：Review all network requests to ensure no sensitive user data is sent to untrusted third-party servers. Limit requests to trusted domains only.

**⛔ CRITICAL** — Privacy Collection  
> The script reads and manipulates document content to bypass shortlinks and ads, but no explicit reading of document.cookie, localStorage, or sessionStorage was found in the visible code. No event listeners for keyboard input were detected in the snippet.  
> 位置：Script main code  
> 建议：Verify that no hidden or obfuscated code reads cookies, storage, or listens to keyboard events to protect user privacy.

**🔴 HIGH** — Remote Code Execution  
> The script does not use eval(), new Function(), or setTimeout with string arguments in the visible code. No dynamic script injection or remote code loading besides the @require from a known GreasyFork URL was detected.  
> 位置：Script main code and metadata  
> 建议：Avoid dynamic code execution and loading scripts from untrusted sources to prevent remote code execution risks.

**🔴 HIGH** — Permission Abuse  
> The script requests multiple @grant permissions including GM_xmlhttpRequest, GM_setClipboard, GM_openInTab, GM_registerMenuCommand, GM_setValue, GM_getValue, GM_addStyle, and window.onurlchange. The usage of these permissions appears consistent with the script's functionality to bypass shortlinks, open tabs, and manage settings.  
> 位置：Script metadata and code  
> 建议：Ensure all granted permissions are necessary and used appropriately to minimize permission abuse.

**🟠 MEDIUM** — Sensitive API Call  
> No usage of sensitive APIs like navigator.geolocation, RTCPeerConnection, MediaDevices, or Clipboard API (except GM_setClipboard which is a granted permission) was detected in the visible code.  
> 位置：Script main code  
> 建议：Monitor usage of sensitive APIs to prevent privacy leaks.

**🟠 MEDIUM** — Code Obfuscation  
> No obvious code obfuscation, base64 decoding, or string concatenation for code execution was found in the visible code.  
> 位置：Script main code  
> 建议：Maintain code transparency to facilitate security reviews.

**🟡 LOW** — External Dependency  
> The script @require loads MonkeyConfig Mod.js from a GreasyFork update URL, which is a known and trusted source. The version is fixed by the URL path containing a specific script ID and version number, reducing supply chain risks.  
> 位置：Script metadata @require  
> 建议：Continue to use fixed versions from trusted sources for external dependencies.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/431691-bypass-all-shortlinks)*
