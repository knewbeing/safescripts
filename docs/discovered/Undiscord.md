---
title: Discord消息批量删除助手
---

# Discord消息批量删除助手

`Discord`  `消息管理`  `批量删除`  `聊天清理`  `用户脚本`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Undiscord.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**5.2.6**　　发现时间：**2026-04-15**　　来源：[GreasyFork](https://greasyfork.org/scripts/406540-undiscord) <Badge type="tip" text="GreasyFork" />　　安装量：**552,892**　　评分：👍50 / 👎8

## 功能介绍

该脚本可以帮助用户批量删除Discord频道或私信中的所有消息。使用后，用户可以快速清理聊天记录，节省手动删除的时间。适合需要清理大量消息的Discord用户。

## 适用网站

- Discord官网
- Discord频道页面
- Discord登录页面

## 使用方法

1. 安装脚本后，打开Discord网页版并登录账号。
2. 进入需要清理消息的频道或私信页面。
3. 根据脚本界面提示操作，批量删除该频道或私信中的消息。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `none` | 脚本不需要额外权限即可运行。 |

## 安全分析

**风险等级**：🟢 SAFE　　**分析时间**：2026-04-15

> 该脚本无数据外传和隐私采集行为，不存在远程代码执行风险，权限申请合理，无敏感API调用，代码未混淆且无外部依赖，整体安全性高。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本未使用任何网络请求API（如 GM_xmlhttpRequest、fetch、XMLHttpRequest、navigator.sendBeacon），无数据外传行为。  
> 位置：全脚本  
> 建议：无需修改，保持无外传行为。

**⛔ CRITICAL** — 隐私采集  
> 脚本未读取 document.cookie、localStorage、sessionStorage，未监听键盘事件，未访问表单字段值，未使用浏览器指纹相关API。  
> 位置：全脚本  
> 建议：无需修改，保持无隐私采集行为。

**🔴 HIGH** — 远程代码执行  
> 脚本未使用 eval、new Function、setTimeout(string)、innerHTML 执行远程内容，且未通过 @require 或动态 script 标签加载远程 JS。  
> 位置：全脚本  
> 建议：无需修改，避免远程代码执行风险。

**🔴 HIGH** — 权限滥用  
> 脚本声明 @grant none，且代码中未使用任何高权限API，权限申请合理。  
> 位置：元数据与代码  
> 建议：无需修改，权限申请符合实际需求。

**🟠 MEDIUM** — 敏感API调用  
> 脚本未调用敏感API如 navigator.geolocation、RTCPeerConnection、MediaDevices、Clipboard API。  
> 位置：全脚本  
> 建议：无需修改，避免敏感API滥用。

**🟠 MEDIUM** — 代码混淆  
> 脚本代码未发现明显混淆特征，无 base64 解码执行或字符串拼接执行。  
> 位置：全脚本  
> 建议：保持代码清晰，避免混淆。

**🟡 LOW** — 外部依赖  
> 脚本未使用 @require 加载任何外部依赖库。  
> 位置：元数据  
> 建议：无需修改，避免供应链风险。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/406540-undiscord)*
