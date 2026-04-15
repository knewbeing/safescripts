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

> 该UserScript未发现任何数据外传和隐私采集行为，未使用远程代码执行手段，权限申请合理且无滥用，未调用敏感API，代码无混淆，且无外部依赖。整体安全性良好。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本未使用任何网络请求API（如GM_xmlhttpRequest、fetch、XMLHttpRequest、navigator.sendBeacon），无数据外传行为。  
> 位置：全脚本  
> 建议：无需修改，保持无外传行为。

**⛔ CRITICAL** — 隐私采集  
> 脚本未读取document.cookie、localStorage、sessionStorage，也未监听键盘事件或读取表单字段值，无隐私采集行为。  
> 位置：全脚本  
> 建议：无需修改，保持无隐私采集行为。

**🔴 HIGH** — 远程代码执行  
> 脚本未使用eval、new Function、setTimeout字符串参数或innerHTML执行远程代码，也未通过@require或动态script标签加载远程JS，无远程代码执行风险。  
> 位置：全脚本  
> 建议：无需修改，保持无远程代码执行风险。

**🔴 HIGH** — 权限滥用  
> 脚本声明@grant none，且代码中未使用任何高权限API，权限申请合理，无权限滥用。  
> 位置：元数据及代码  
> 建议：无需修改。

**🟠 MEDIUM** — 敏感API调用  
> 脚本未调用navigator.geolocation、RTCPeerConnection、MediaDevices、Clipboard API等敏感API。  
> 位置：全脚本  
> 建议：无需修改。

**🟠 MEDIUM** — 代码混淆  
> 脚本代码未发现明显混淆、base64解码执行或字符串拼接执行特征。  
> 位置：全脚本  
> 建议：无需修改。

**🟡 LOW** — 外部依赖  
> 脚本未使用@require加载任何外部依赖库。  
> 位置：元数据  
> 建议：无需修改。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://raw.githubusercontent.com/victornpb/undiscord/f73f615aaeceae65d38ad5dd065950f2ed5c6dc8/deleteDiscordMessages.user.js)*
