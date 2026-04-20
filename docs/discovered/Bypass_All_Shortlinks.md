---
title: "旁路全部短链接"
---

# 旁路全部短链接

`短链接跳过`  `广告屏蔽`  `自动跳转`  `弹窗拦截`  `下载增强`  `网页优化`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Bypass_All_Shortlinks.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**96.7**　　发现时间：**2026-04-20**　　来源：[GreasyFork](https://greasyfork.org/scripts/431691-bypass-all-shortlinks) <Badge type="tip" text="GreasyFork" />　　安装量：**465,111**　　评分：👍577 / 👎89

## 功能介绍

本脚本可自动跳过各种短链接和跳转广告，直接带你访问目标网页，无需手动等待或点击。它还能自动跳过AdFly、烦人的广告、弹窗和提示，并阻止广告屏蔽检测。部分情况下还能自动下载文件、Flickr图片和YouTube视频。

## 适用网站

- 所有网站（除部分主流网站如百度、谷歌、B站、淘宝、微信、支付宝、亚马逊、PayPal、Facebook、Twitter、抖音、知乎等）

## 使用方法

1. 1. 安装脚本后，无需额外设置，自动在支持的网站生效。
2. 2. 访问含短链接或跳转广告的页面，脚本会自动为你跳转到目标地址。
3. 3. 如遇弹窗、广告或下载需求，脚本会自动处理，无需手动操作。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_setValue` | 用于在脚本中保存设置或数据。 |
| `GM_getValue` | 用于读取脚本保存的数据。 |
| `GM_addStyle` | 允许脚本自定义页面样式。 |
| `GM_openInTab` | 在新标签页打开链接。 |
| `GM_setClipboard` | 将内容复制到剪贴板。 |
| `GM_xmlhttpRequest` | 用于跨域请求网络数据，跳过短链时可能用到。 |
| `window.onurlchange` | 监听页面地址变化，适配单页应用。 |
| `GM_registerMenuCommand` | 在脚本菜单中添加自定义功能入口。 |

## 安全分析

**风险等级**：🔴 HIGH　　**安全评分**：32/100　　**分析时间**：2026-04-20

> The script 'Bypass All Shortlinks' requests broad permissions and interacts with third-party shortlink domains, potentially transmitting user data and exposing privacy risks. It also loads external code without version pinning, and its DOM manipulation logic may be vulnerable to XSS if not properly sanitized. The script is not recommended for use in sensitive environments without further review and hardening.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：Shortlink domains (varies, potentially third-party), External APIs (potentially, depending on shortlink bypass logic)） |
| 隐私采集 | ❌ 检测到（Possible reading of cookies, localStorage, or sessionStorage to extract shortlink tokens or bypass mechanisms.） |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ❌ 存在风险 |
| 供应链风险 | ⚠️ 存在风险 |

### 发现的问题

**⛔ CRITICAL** — Data Exfiltration  
> Script uses GM_xmlhttpRequest to interact with external shortlink services, potentially transmitting user data, cookies, or page context to third-party domains.  
> 位置：Main script logic (not fully visible, but inferred from purpose and grants)  
> 建议：Ensure only minimal, non-sensitive data is sent; avoid transmitting cookies or user-identifiable information.

**🔴 HIGH** — DOM XSS  
> Potential DOM XSS risk: script likely manipulates innerHTML/outerHTML to inject destination links or bypass mechanisms, which could be vulnerable if user input or URL parameters are not sanitized.  
> 位置：Main script logic (not fully visible, but inferred from purpose)  
> 建议：Sanitize all user-controlled input before inserting into DOM.

**🟠 MEDIUM** — Permission Abuse  
> Script requests GM_openInTab, GM_setClipboard, GM_xmlhttpRequest, and window.onurlchange grants, which are high-privilege and can be abused if not strictly controlled.  
> 位置：Metadata block  
> 建议：Reduce granted permissions to only those strictly necessary for functionality.

**🟠 MEDIUM** — Supply Chain Risk  
> Script loads external code via @require from update.greasyfork.org, which is not version-hashed and could be replaced or tampered with.  
> 位置：Metadata block (@require)  
> 建议：Pin @require to a version hash or trusted CDN; verify integrity of external dependencies.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/431691-bypass-all-shortlinks)*
