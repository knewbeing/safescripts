---
title: Discord消息批量删除助手
---

# Discord消息批量删除助手

`消息管理`  `批量删除`  `Discord`  `聊天清理`  `用户脚本`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Undiscord.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**5.2.6**　　发现时间：**2026-04-15**　　来源：[GreasyFork](https://greasyfork.org/scripts/406540-undiscord) <Badge type="tip" text="GreasyFork" />　　安装量：**552,898**　　评分：👍50 / 👎8

## 功能介绍

该脚本可以帮助用户批量删除Discord频道或私信中的所有消息。使用后，用户可以快速清理聊天记录，节省手动删除的时间。操作简单，适合需要大量清理消息的用户。

## 适用网站

- Discord官网
- Discord频道页面
- Discord登录页

## 使用方法

1. 安装脚本后，打开Discord网页版并登录账号。
2. 进入需要清理消息的频道或私信页面。
3. 根据脚本界面提示，执行批量删除操作。
4. 等待脚本自动完成消息删除。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `none` | 脚本不需要额外权限即可运行。 |

## 安全分析

**风险等级**：🟢 SAFE　　**分析时间**：2026-04-15

> 该UserScript未发现任何数据外传、隐私采集、远程代码执行或权限滥用行为，代码清晰且无混淆，未加载外部依赖，整体安全性高。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本未使用任何网络请求相关API（如GM_xmlhttpRequest、fetch、XMLHttpRequest等），无数据外传行为。  
> 位置：全脚本  
> 建议：无

**⛔ CRITICAL** — 隐私采集  
> 脚本未读取document.cookie、localStorage、sessionStorage，也未监听键盘事件或读取表单字段值，无隐私采集行为。  
> 位置：全脚本  
> 建议：无

**🔴 HIGH** — 远程代码执行  
> 脚本未使用eval、new Function、setTimeout字符串参数或动态加载远程脚本，无远程代码执行风险。  
> 位置：全脚本  
> 建议：无

**🔴 HIGH** — 权限滥用  
> 脚本未声明任何权限（@grant none），且代码中未使用任何高权限API，无权限滥用。  
> 位置：元数据与代码  
> 建议：无

**🟠 MEDIUM** — 敏感API调用  
> 脚本未调用navigator.geolocation、RTCPeerConnection、MediaDevices、Clipboard API等敏感API。  
> 位置：全脚本  
> 建议：无

**🟠 MEDIUM** — 代码混淆  
> 脚本代码未发现明显混淆、base64解码或字符串拼接执行特征。  
> 位置：全脚本  
> 建议：无

**🟡 LOW** — 外部依赖  
> 脚本未通过@require加载任何外部依赖，所有代码均内嵌，降低供应链风险。  
> 位置：元数据  
> 建议：无

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/406540-undiscord)*
