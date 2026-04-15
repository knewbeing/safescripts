---
title: Discord消息批量删除助手
---

# Discord消息批量删除助手

`消息管理`  `批量删除`  `Discord`  `聊天清理`  `用户脚本`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/deleteDiscordMessages.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**5.2.6**　　发现时间：**2026-04-15**　　来源：[victornpb/undiscord](https://github.com/victornpb/undiscord)

## 功能介绍

该脚本可以帮助用户批量删除Discord频道或私信中的所有消息。使用后，用户可以快速清理聊天记录，节省手动删除的时间。适用于Discord网页版，操作简单方便。

## 适用网站

- Discord官网
- Discord频道页面
- Discord登录页面

## 使用方法

1. 安装Tampermonkey或类似的用户脚本管理器。
2. 导入并启用该脚本。
3. 打开Discord网页版并进入目标频道或私信。
4. 使用脚本提供的界面批量删除消息。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `none` | 脚本不需要额外权限，直接在网页上运行。 |

## 安全分析

**风险等级**：🟢 SAFE　　**分析时间**：2026-04-15

> 该 UserScript 未检测到任何数据外传和隐私采集行为，未使用远程代码执行方式，权限申请合理且无滥用，未调用敏感 API，代码无混淆，且无外部依赖。整体安全性良好。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本未检测到任何网络请求相关代码，如 GM_xmlhttpRequest、fetch、XMLHttpRequest 或 navigator.sendBeacon，且 @grant 为 none，说明无数据外传行为。  
> 位置：全脚本  
> 建议：确认无隐式网络请求，确保无数据上传。

**⛔ CRITICAL** — 隐私采集  
> 脚本未读取 document.cookie、localStorage、sessionStorage，也未监听键盘事件或读取表单字段，未访问浏览器指纹相关 API。  
> 位置：全脚本  
> 建议：保持不采集用户隐私数据，避免监听敏感事件。

**🔴 HIGH** — 远程代码执行  
> 脚本未使用 eval、new Function、setTimeout(string) 等远程代码执行方式，且无 @require 加载远程脚本。  
> 位置：全脚本  
> 建议：避免动态执行不可信代码。

**🔴 HIGH** — 权限滥用  
> @grant 声明为 none，且脚本未使用任何高权限 API，权限申请合理，无滥用。  
> 位置：元数据  
> 建议：保持权限最小化原则。

**🟠 MEDIUM** — 敏感 API 调用  
> 脚本未调用 navigator.geolocation、RTCPeerConnection、MediaDevices、Clipboard API 等敏感 API。  
> 位置：全脚本  
> 建议：避免调用敏感 API 以保护用户隐私。

**🟠 MEDIUM** — 代码混淆  
> 脚本代码未发现明显混淆特征，无 base64 解码执行或复杂字符串拼接执行。  
> 位置：全脚本  
> 建议：保持代码清晰，便于安全审计。

**🟡 LOW** — 外部依赖  
> 脚本无 @require 加载外部依赖，所有资源均为官方或可信来源。  
> 位置：元数据  
> 建议：确保外部依赖来源可信且版本固定。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://raw.githubusercontent.com/victornpb/undiscord/f73f615aaeceae65d38ad5dd065950f2ed5c6dc8/deleteDiscordMessages.user.js)*
