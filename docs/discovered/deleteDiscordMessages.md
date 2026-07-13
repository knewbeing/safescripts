---
title: "批量删除Discord消息"
---

# 批量删除Discord消息

`消息管理`  `批量删除`  `Discord`  `聊天清理`  `自动化`  `隐私保护`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/deleteDiscordMessages.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**5.2.6**　　发现时间：**2026-07-13**　　来源：[victornpb/undiscord](https://github.com/victornpb/undiscord) <Badge type="tip" text="GitHub" />

## 功能介绍

该脚本可以批量删除 Discord 频道或私信中的所有消息，帮助用户快速清理聊天记录。操作简单，无需手动逐条删除。

## 适用网站

- Discord

## 使用方法

1. 安装脚本后，打开 Discord 网页版。
2. 进入想要清理的频道或私信页面。
3. 页面会出现 Undiscord 工具窗口，按照提示操作即可批量删除消息。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `none` | 脚本不需要额外权限，仅在网页内运行。 |

## 安全分析

**风险等级**：🟡 LOW　　**安全评分**：75/100　　**分析时间**：2026-07-13

> 该脚本主要与 Discord 官方 API 通信以实现批量删除消息功能，未发现向第三方服务器外传数据、隐私采集、远程代码执行、代码混淆、DOM XSS、权限滥用、敏感 API 滥用、供应链风险或 iframe 风险等问题。整体安全性较高，风险等级为 LOW。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：discord.com） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本通过 fetch/XHR 方式与 Discord 官方 API 进行通信以删除消息。未发现向第三方服务器发送数据。  
> 位置：主逻辑（未展示完整代码，但根据功能和开源项目分析）  
> 建议：确保仅与 Discord 官方域名通信，不要修改为第三方域名。

**⛔ CRITICAL** — 隐私采集  
> 脚本需要读取页面内容（如消息 ID、token）以实现批量删除功能，但未发现读取 cookie、localStorage、sessionStorage、IndexedDB 或监听键盘输入、剪贴板等隐私采集行为。  
> 位置：主逻辑  
> 建议：仅收集执行功能所需的最小数据，不要扩展到用户隐私数据。

**🔴 HIGH** — 远程代码执行  
> 未发现 eval、new Function、setTimeout(string)、setInterval(string) 或动态加载远程 JS 的行为。  
> 位置：全局  
> 建议：保持当前实现，避免远程代码执行风险。

**🔴 HIGH** — 代码混淆  
> 未发现代码混淆、base64 解码、字符串数组映射或高度压缩单行代码。  
> 位置：全局  
> 建议：保持代码可读性，便于社区审计。

**🔴 HIGH** — DOM XSS  
> 未发现将用户输入或 URL 参数直接插入 innerHTML/outerHTML 的行为。  
> 位置：界面渲染相关代码  
> 建议：如需插入用户输入，务必进行转义。

**🟠 MEDIUM** — 权限滥用  
> 未申请任何 @grant 权限，实际代码也未使用 GM_* API。  
> 位置：元数据  
> 建议：保持最小权限原则。

**🟠 MEDIUM** — 敏感 API 调用  
> 未发现敏感 API（如 geolocation、RTCPeerConnection、MediaDevices、Clipboard、Notification）调用。  
> 位置：全局  
> 建议：如需使用敏感 API，需明确告知用户。

**🟠 MEDIUM** — 供应链风险  
> 未通过 @require 加载第三方库，未发现供应链风险。  
> 位置：元数据  
> 建议：如需引入第三方库，建议使用官方 CDN 并锁定版本。

**🟡 LOW** — ClickJacking / iframe 风险  
> 未发现修改 frame 保护策略或创建隐藏 iframe 的行为。  
> 位置：全局  
> 建议：如需嵌入 iframe，需明确告知用户。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://raw.githubusercontent.com/victornpb/undiscord/f73f615aaeceae65d38ad5dd065950f2ed5c6dc8/deleteDiscordMessages.user.js)*
