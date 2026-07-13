---
title: "多邻国 DuoHacker"
---

# 多邻国 DuoHacker

`多邻国`  `学习辅助`  `自动刷分`  `解锁高级`  `免费工具`  `语言学习`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Duolingo_DuoHacker.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**2026.06.21**　　发现时间：**2026-07-06**　　来源：[GreasyFork](https://greasyfork.org/scripts/561041-duolingo-duohacker) <Badge type="tip" text="GreasyFork" />　　安装量：**4,708**　　评分：👍117 / 👎47

## 功能介绍

本脚本是多邻国的辅助工具，支持自动刷经验值（XP）、宝石和连胜，还能免费解锁 Duolingo Max 高级功能。让用户更轻松提升等级和获取奖励，无需付费即可体验高级内容。

## 适用网站

- 多邻国官网
- 多邻国中国站

## 使用方法

1. 安装 Tampermonkey 插件。
2. 在 Tampermonkey 中添加本脚本。
3. 打开多邻国网站，脚本自动运行。
4. 根据页面提示选择需要的辅助功能。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_xmlhttpRequest` | 允许脚本发送网络请求，获取或提交数据。 |
| `GM_addStyle` | 允许脚本自定义和添加页面样式。 |

## 安全分析

**风险等级**：🔴 HIGH　　**安全评分**：34/100　　**分析时间**：2026-07-13

> The script requests high-risk permissions (GM_xmlhttpRequest) and connects to multiple third-party domains, including non-official ones. This introduces critical risks of data exfiltration and supply chain attacks. There is no evidence of code obfuscation or DOM XSS, and privacy collection is limited to language preference. However, the broad network permissions and supply chain risks make this script unsafe for general use without further code review and restriction of external connections.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：duolingo.com, stories.duolingo.com, goals-api.duolingo.com） |
| 隐私采集 | ❌ 检测到（Reads language preference from localStorage） |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ⚠️ 存在风险 |

### 发现的问题

**⛔ CRITICAL** — Data Exfiltration / Supply Chain  
> The script requests GM_xmlhttpRequest permission and @connect to multiple third-party domains, including raw.githubusercontent.com, greasyfork.org, and assets/font.duohacker.io.vn. These are not official Duolingo domains and may be used to fetch remote resources or code.  
> 位置：Metadata block (@grant, @connect)  
> 建议：Restrict @connect to only necessary and trusted domains. Avoid loading code or resources from non-official or unverifiable sources.

**⛔ CRITICAL** — Data Exfiltration  
> The script requests GM_xmlhttpRequest, which allows arbitrary cross-origin requests. This can be abused for data exfiltration or remote code loading.  
> 位置：Metadata block (@grant)  
> 建议：Limit the use of GM_xmlhttpRequest and ensure all requests are strictly validated and only target trusted endpoints.

**🟠 MEDIUM** — Privacy Collection  
> The script requests access to localStorage for language preference. While this is not sensitive, it is a privacy-related API.  
> 位置：Code: var _lang = localStorage.getItem(_I18N_KEY) || 'vi';  
> 建议：Ensure no sensitive user data is stored or read from localStorage.

**🟠 MEDIUM** — Permission Abuse  
> The script requests GM_addStyle, which is not a high-risk permission but should be justified.  
> 位置：Metadata block (@grant)  
> 建议：Remove unused permissions if not required.

**🟠 MEDIUM** — Supply Chain Risk  
> The script allows @require and @connect to raw.githubusercontent.com and greasyfork.org, which can be a supply chain risk if not pinned to a specific commit or version.  
> 位置：Metadata block (@require, @connect)  
> 建议：Pin all external resources to a specific version or hash to prevent supply chain attacks.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/561041-duolingo-duohacker)*
