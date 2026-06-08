---
title: "Nexus免等待增强版"
---

# Nexus免等待增强版

`下载加速`  `自动化`  `Nexus Mods`  `跳过等待`  `页面优化`  `工具增强`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Nexus_No_Wait.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**2.1.6**　　发现时间：**2026-06-08**　　来源：[GreasyFork](https://greasyfork.org/scripts/519037-nexus-no-wait) <Badge type="tip" text="GreasyFork" />　　安装量：**13,600**　　评分：👍29 / 👎2

## 功能介绍

本脚本可自动跳过 Nexus Mods 网站的下载等待时间，自动开始下载，并支持多种下载方式。它还能自动关闭下载页面，跳过下载前的要求提示，并隐藏会员推广内容。

## 适用网站

- Nexus Mods

## 使用方法

1. 安装脚本后，访问 Nexus Mods 网站。
2. 选择你想下载的文件，脚本会自动跳过等待并开始下载。
3. 下载完成后，页面会自动关闭（可配置）。
4. 如需更改设置，可在油猴菜单中找到脚本选项。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_getValue` | 用于获取和保存脚本的配置设置。 |
| `GM_setValue` | 用于保存用户的配置选项。 |
| `GM.xmlHttpRequest` | 用于发送网络请求，获取下载链接或处理页面数据。 |
| `GM_xmlhttpRequest` | 用于发送网络请求，功能类似于 GM.xmlHttpRequest。 |
| `GM_info` | 用于获取当前脚本的信息，如版本号。 |
| `GM_addStyle` | 用于添加自定义样式，让页面显示更友好。 |
| `GM_registerMenuCommand` | 用于注册菜单命令，方便用户手动操作或重置设置。 |

## 安全分析

**风险等级**：🟡 LOW　　**安全评分**：89/100　　**分析时间**：2026-06-08

> The script automates download flows on Nexus Mods, skipping countdowns and handling download links. It does not collect or transmit user data, does not use eval or dynamic code execution, and does not manipulate the DOM in a way that introduces XSS risk. The only external network requests are to Nexus Mods and GitHub for an error sound. The main risk is a minor supply chain concern with the audio file. Overall, the script is safe for use.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ⚠️ 存在风险 |

### 发现的问题

**🟠 MEDIUM** — Supply Chain  
> The script loads an error sound from raw.githubusercontent.com. This is a trusted source, but supply chain risk exists if the file is replaced upstream.  
> 位置：cfg.ErrorSoundUrl  
> 建议：Pin to a specific commit hash or version if possible to prevent supply chain attacks.

**🟡 LOW** — Network Request  
> The script uses GM.xmlHttpRequest/GM_xmlhttpRequest and fetch to communicate with *.nexusmods.com and raw.githubusercontent.com. All requests are related to Nexus Mods download automation and error sound fetching. No evidence of user data, cookies, or page content being sent to third-party servers beyond the intended domains.  
> 位置：gmRequest, fetch, ErrorSoundUrl  
> 建议：Ensure requests are strictly limited to necessary endpoints and do not include sensitive user data.

**🟡 LOW** — Permission Usage  
> The script requests GM.xmlHttpRequest/GM_xmlhttpRequest permission, but only uses them for Nexus Mods and GitHub raw content. No evidence of over-privileged or unused permissions.  
> 位置：Metadata block  
> 建议：Review permissions periodically to ensure no unnecessary grants are present.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/519037-nexus-no-wait)*
