---
title: Discord消息批量删除器
---

# Discord消息批量删除器

`Discord`  `消息管理`  `批量删除`  `聊天清理`  `用户脚本`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/deleteDiscordMessages.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**5.2.6**　　发现时间：**2026-04-15**　　来源：[victornpb/undiscord](https://github.com/victornpb/undiscord) <Badge type="tip" text="GitHub" />

## 功能介绍

该脚本可以帮助用户批量删除Discord频道或私信中的所有消息。安装后，用户可以快速清理聊天记录，节省手动删除的时间。操作简单，适合需要大量清理消息的Discord用户。

## 适用网站

- Discord官网
- Discord频道页面
- Discord登录页

## 使用方法

1. 安装脚本后打开Discord网页版。
2. 进入需要清理消息的频道或私信页面。
3. 使用脚本提供的界面或按钮开始批量删除消息。
4. 等待脚本自动完成消息删除操作。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `none` | 脚本不需要额外权限即可运行。 |

## 安全分析

**风险等级**：🟢 SAFE　　**分析时间**：2026-04-15

> 该 UserScript 主要功能为批量删除 Discord 消息，未发现任何数据外传、隐私采集、远程代码执行或权限滥用行为，代码清晰且无混淆，未加载外部依赖，整体安全性良好。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本未使用任何网络请求接口（如 GM_xmlhttpRequest、fetch、XMLHttpRequest、navigator.sendBeacon），无数据外传行为。  
> 位置：全脚本  
> 建议：无需修改，保持无外传行为。

**⛔ CRITICAL** — 隐私采集  
> 脚本未读取 document.cookie、localStorage、sessionStorage，未监听键盘事件，也未访问浏览器指纹相关API。  
> 位置：全脚本  
> 建议：无需修改，保持不采集用户隐私。

**🔴 HIGH** — 远程代码执行  
> 脚本未使用 eval、new Function、setTimeout(string) 等远程代码执行相关API，且未通过 @require 或动态 script 标签加载远程JS。  
> 位置：全脚本  
> 建议：无远程代码执行风险，保持当前实现。

**🔴 HIGH** — 权限滥用  
> 脚本声明 @grant none，且代码中未使用任何高权限API，权限申请合理。  
> 位置：元数据与代码  
> 建议：无权限滥用风险。

**🟠 MEDIUM** — 敏感 API 调用  
> 脚本未调用 navigator.geolocation、RTCPeerConnection、MediaDevices、Clipboard API 等敏感API。  
> 位置：全脚本  
> 建议：无敏感API调用风险。

**🟠 MEDIUM** — 代码混淆  
> 脚本代码未发现明显混淆特征，无 base64 解码执行或字符串拼接执行。  
> 位置：全脚本  
> 建议：代码清晰，便于审计。

**🟡 LOW** — 外部依赖  
> 脚本未通过 @require 加载任何外部依赖库。  
> 位置：元数据  
> 建议：无外部依赖风险。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://raw.githubusercontent.com/victornpb/undiscord/f73f615aaeceae65d38ad5dd065950f2ed5c6dc8/deleteDiscordMessages.user.js)*
