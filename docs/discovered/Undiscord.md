---
title: Discord消息批量删除器
---

# Discord消息批量删除器

`消息管理`  `批量删除`  `Discord`  `聊天清理`  `用户脚本`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Undiscord.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**5.2.6**　　发现时间：**2026-04-15**　　来源：[GreasyFork](https://greasyfork.org/scripts/406540-undiscord) <Badge type="tip" text="GreasyFork" />　　安装量：**552,898**　　评分：👍50 / 👎8

## 功能介绍

该脚本用于在Discord频道或私信中批量删除所有消息，帮助用户快速清理聊天记录。安装后可直接在Discord网页端使用，无需额外权限。操作简单，适合需要大量删除消息的用户。

## 适用网站

- Discord官网
- Discord频道页面
- Discord登录页面

## 使用方法

1. 安装脚本后打开Discord网页版。
2. 进入任意频道或私信页面。
3. 使用脚本提供的界面或按钮批量删除消息。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `none` | 脚本不需要额外权限，直接运行即可。 |

## 安全分析

**风险等级**：🟢 SAFE　　**分析时间**：2026-04-15

> 该UserScript未发现任何数据外传、隐私采集、远程代码执行或权限滥用行为，代码清晰无混淆，且未加载外部依赖，整体安全性高。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本未使用任何网络请求相关API（如 GM_xmlhttpRequest、fetch、XMLHttpRequest、navigator.sendBeacon），不存在数据外传行为。  
> 位置：全脚本  
> 建议：无

**⛔ CRITICAL** — 隐私采集  
> 脚本未读取 document.cookie、localStorage、sessionStorage，未监听键盘输入事件，也未访问浏览器指纹相关API。  
> 位置：全脚本  
> 建议：无

**🔴 HIGH** — 远程代码执行  
> 脚本未使用 eval、new Function、setTimeout(string)、innerHTML执行远程内容，且未通过 @require 或动态 script 标签加载远程JS。  
> 位置：全脚本  
> 建议：无

**🔴 HIGH** — 权限滥用  
> 脚本声明 @grant none，且代码中未使用任何高权限API，权限申请合理，无滥用。  
> 位置：元数据与代码  
> 建议：无

**🟠 MEDIUM** — 敏感API调用  
> 脚本未调用敏感API如 navigator.geolocation、RTCPeerConnection、MediaDevices、Clipboard API。  
> 位置：全脚本  
> 建议：无

**🟠 MEDIUM** — 代码混淆  
> 脚本代码未发现明显混淆特征，无 base64 解码执行或字符串拼接执行。  
> 位置：全脚本  
> 建议：无

**🟡 LOW** — 外部依赖  
> 脚本未使用 @require 加载任何外部依赖，所有代码均内嵌，避免供应链风险。  
> 位置：元数据  
> 建议：无

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/406540-undiscord)*
