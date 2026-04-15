---
title: 旁路全部短链接
---

# 旁路全部短链接

`短链接绕过`  `广告屏蔽`  `自动跳转`  `视频下载`  `浏览器辅助`  `用户脚本`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Bypass_All_Shortlinks.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**96.7**　　发现时间：**2026-04-15**　　来源：[GreasyFork](https://greasyfork.org/scripts/431691-bypass-all-shortlinks) <Badge type="tip" text="GreasyFork" />　　安装量：**464,330**　　评分：👍574 / 👎89

## 功能介绍

本脚本自动绕过各种短链接和链接缩短服务，直接跳转到目标页面。它能跳过烦人的广告和弹窗，阻止广告拦截检测，并支持自动下载文件和YouTube视频。使用后浏览体验更流畅，无需手动关闭广告或等待跳转。

## 适用网站

- 所有网站（除部分知名大站和教育、政府等机构网站）

## 使用方法

1. 安装脚本后自动生效，无需额外操作。
2. 访问含短链接的网站时，脚本会自动跳过中间页。
3. 遇到广告或弹窗时，脚本会自动屏蔽。
4. 支持自动下载文件和YouTube视频，提升使用体验。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_setValue` | 存储和读取脚本设置和数据 |
| `GM_getValue` | 读取脚本设置和数据 |
| `GM_addStyle` | 添加自定义样式以美化页面或隐藏元素 |
| `GM_openInTab` | 在新标签页打开链接 |
| `GM_setClipboard` | 将内容复制到剪贴板 |
| `GM_xmlhttpRequest` | 发送跨域网络请求，获取跳转目标等数据 |
| `window.onurlchange` | 监听浏览器地址变化，及时处理跳转 |
| `GM_registerMenuCommand` | 注册菜单命令，方便用户操作脚本功能 |

## 安全分析

**风险等级**：🔴 HIGH　　**分析时间**：2026-04-15

> The script bypasses shortlink services and automates navigation and downloads. It uses network requests to third-party servers and accesses clipboard data, which poses critical risks of data transmission and privacy collection. It also requests multiple high-level permissions and loads external dependencies without version pinning. Overall, the script carries a high security risk and requires careful review before use.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：https://update.greasyfork.org, https://i.ibb.co） |
| 隐私采集 | ❌ 检测到（Uses GM_setClipboard which can access clipboard data, No explicit reading of document.cookie, localStorage, sessionStorage detected in provided snippet, No explicit keyboard event listeners detected in provided snippet） |

### 发现的问题

**⛔ CRITICAL** — Data Transmission  
> The script uses GM_xmlhttpRequest and @require to load external resources from update.greasyfork.org, which is a third-party server. This may involve data transmission outside the user's domain.  
> 位置：@require and GM_xmlhttpRequest usage in script  
> 建议：Ensure that the external resources are from trusted sources and do not leak sensitive user data. Avoid unnecessary data transmission to third-party servers.

**⛔ CRITICAL** — Privacy Collection  
> The script reads and manipulates clipboard via GM_setClipboard, which may access sensitive user data.  
> 位置：GM_setClipboard usage  
> 建议：Verify that clipboard data is handled securely and not sent to external servers without user consent.

**🔴 HIGH** — Permission Abuse  
> The script requests multiple high-level permissions such as GM_xmlhttpRequest, GM_setClipboard, GM_openInTab, GM_registerMenuCommand, but the actual code usage is not fully visible in the snippet. Potential permission over-privilege may exist.  
> 位置：@grant declarations  
> 建议：Review actual code usage to ensure all granted permissions are necessary and justified.

**🟡 LOW** — External Dependency  
> The script loads external dependency MonkeyConfig Mod.js from a third-party URL without version pinning, which may pose supply chain risks.  
> 位置：@require https://update.greasyfork.org/scripts/528923/1588272/MonkeyConfig%20Mod.js  
> 建议：Pin exact versions and verify the integrity of external dependencies to avoid supply chain attacks.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/431691-bypass-all-shortlinks)*
