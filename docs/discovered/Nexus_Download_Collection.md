---
title: "Nexus合集一键下载"
---

# Nexus合集一键下载

`模组下载`  `批量操作`  `游戏工具`  `Nexus Mods`  `效率提升`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Nexus_Download_Collection.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**0.9.10**　　发现时间：**2026-06-29**　　来源：[GreasyFork](https://greasyfork.org/scripts/483337-nexus-download-collection) <Badge type="tip" text="GreasyFork" />　　安装量：**21,160**　　评分：👍83 / 👎6

## 功能介绍

本脚本让你在 Nexus Mods 网站上，一键下载某个合集中的所有模组，无需逐个操作。适合需要批量下载模组的用户，提升下载效率。

## 适用网站

- Nexus Mods

## 使用方法

1. 安装脚本后，访问 Nexus Mods 网站。
2. 进入你想下载的模组合集页面。
3. 页面会出现“一键下载合集”按钮，点击即可批量下载所有模组。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM.xmlHttpRequest` | 允许脚本通过浏览器发送网络请求，获取模组信息和下载链接。 |
| `GM_xmlhttpRequest` | 允许脚本通过浏览器发送网络请求，获取模组信息和下载链接。 |
| `GM_setValue` | 允许脚本保存设置或下载进度到本地。 |
| `GM_getValue` | 允许脚本读取本地保存的设置或下载进度。 |
| `GM.setValue` | 允许脚本保存设置或下载进度到本地。 |
| `GM.getValue` | 允许脚本读取本地保存的设置或下载进度。 |
| `GM_addStyle` | 允许脚本自定义页面样式，让操作界面更美观。 |

## 安全分析

**风险等级**：🟡 LOW　　**安全评分**：67/100　　**分析时间**：2026-06-29

> The script transmits data only to Nexus Mods' own APIs, which is expected for its functionality. No evidence of privacy-invasive data collection, remote code execution, code obfuscation, or DOM XSS was found. There is some permission over-claiming in the @grant block. No supply chain or iframe/clickjacking risks detected. Overall, the script is low risk for its intended use.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：api-router.nexusmods.com, www.nexusmods.com） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — Data Transmission  
> The script sends POST requests to https://api-router.nexusmods.com/graphql and https://www.nexusmods.com/Core/Libs/Common/Managers/Downloads?GenerateDownloadUrl, including cookies (credentials: include). These are first-party requests to Nexus Mods, matching the @connect domain.  
> 位置：fetchMods(), fetchDownloadLink()  
> 建议：Ensure no sensitive user data outside of Nexus Mods context is sent. The requests are expected for the script's function.

**🟠 MEDIUM** — Permission Abuse  
> The script requests broad GM_* permissions (GM.xmlHttpRequest, GM_xmlhttpRequest, GM_setValue, GM_getValue, GM.setValue, GM.getValue, GM_addStyle), but only uses GM_addStyle and GM.getValue/GM.setValue in the provided code. GM.xmlHttpRequest is not used in the visible code.  
> 位置：Metadata block  
> 建议：Remove unused @grant permissions to reduce attack surface.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/483337-nexus-download-collection)*
