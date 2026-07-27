---
title: "批量删除Discord消息"
---

# 批量删除Discord消息

`批量删除`  `消息管理`  `Discord`  `聊天清理`  `自动化`  `隐私保护`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Undiscord.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**5.2.6**　　发现时间：**2026-07-06**　　来源：[GreasyFork](https://greasyfork.org/scripts/406540-undiscord) <Badge type="tip" text="GreasyFork" />　　安装量：**567,959**　　评分：👍51 / 👎8

## 功能介绍

本脚本可以批量删除 Discord 频道或私信中的所有消息，帮助用户快速清理聊天记录。操作简单，无需手动逐条删除。

## 适用网站

- Discord

## 使用方法

1. 安装 Tampermonkey 插件。
2. 添加本脚本到 Tampermonkey。
3. 打开 Discord 网站并登录账号。
4. 在频道或私信页面会出现批量删除工具窗口，按提示操作即可。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| — | 无特殊权限 |

## 安全分析

**风险等级**：🟠 MEDIUM　　**安全评分**：67/100　　**分析时间**：2026-07-27

> Undiscord 脚本仅与 Discord 官方 API 通信，未向第三方服务器外传数据。脚本需访问敏感信息（消息内容、token等），但仅用于本地批量删除操作。无远程代码执行、代码混淆、DOM XSS、权限滥用、供应链风险等问题。整体安全性较高，但因涉及敏感数据操作，建议用户谨慎使用。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：https://discord.com/api） |
| 隐私采集 | ❌ 检测到（读取用户消息内容, 读取频道ID, 读取用户token） |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本通过 fetch/XHR 向 Discord 官方 API 发起批量删除消息请求，未向第三方服务器发送数据。  
> 位置：核心删除逻辑（fetch/HTTP请求部分）  
> 建议：确保仅与 Discord 官方 API 通信，避免向非官方域名发送用户数据。

**⛔ CRITICAL** — 隐私采集  
> 脚本会读取页面中的用户消息、频道ID、token等敏感信息用于批量删除操作，但不会外传至第三方。  
> 位置：消息收集与删除逻辑  
> 建议：提醒用户此脚本需访问敏感数据，仅用于本地操作，勿用于第三方脚本。

**🔴 HIGH** — 远程代码执行  
> 脚本未使用 eval、new Function、setTimeout(string)、setInterval(string) 等动态代码执行方式。  
> 位置：全局代码审查  
> 建议：保持无远程代码执行风险。

**🔴 HIGH** — 代码混淆  
> 脚本未混淆，代码结构清晰，无 base64/unicode/字符串数组混淆特征。  
> 位置：全局代码审查  
> 建议：保持代码可读性，便于社区审查。

**🔴 HIGH** — DOM XSS / 注入  
> 脚本未将用户输入或 URL 参数直接插入 innerHTML/outerHTML，未发现 DOM XSS 风险。  
> 位置：UI渲染部分  
> 建议：继续避免直接插入用户输入。

**🟠 MEDIUM** — 权限滥用  
> 脚本未申请任何 GM_* 权限，@grant 为 none。  
> 位置：元数据头部  
> 建议：仅申请必要权限，避免权限滥用。

**🟠 MEDIUM** — 敏感 API 调用  
> 脚本未调用敏感 API（如 geolocation、RTCPeerConnection、MediaDevices、Clipboard、Notification）。  
> 位置：全局代码审查  
> 建议：继续避免敏感 API 滥用。

**🟠 MEDIUM** — 供应链风险  
> 脚本未通过 @require 加载第三方库，无供应链风险。  
> 位置：元数据头部  
> 建议：如需引入第三方库，建议固定版本哈希并使用官方 CDN。

**🟡 LOW** — ClickJacking / iframe 风险  
> 脚本未修改 frame 保护策略，也未创建隐藏 iframe 用于数据提取。  
> 位置：全局代码审查  
> 建议：继续避免 iframe 风险。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/406540-undiscord)*
