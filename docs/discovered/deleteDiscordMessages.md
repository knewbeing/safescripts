---
title: Discord消息批量删除助手
---

# Discord消息批量删除助手

`Discord`  `消息管理`  `批量删除`  `聊天清理`  `用户脚本`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/deleteDiscordMessages.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**5.2.6**　　发现时间：**2026-04-15**　　来源：[victornpb/undiscord](https://github.com/victornpb/undiscord) <Badge type="tip" text="GitHub" />

## 功能介绍

该脚本用于在Discord的频道或私信中批量删除所有消息，帮助用户快速清理聊天记录。安装后，用户可以一键清空指定频道或私信中的消息，操作简单高效。无需额外权限，安全可靠。

## 适用网站

- Discord官网
- Discord频道页面
- Discord登录页面

## 使用方法

1. 安装Tampermonkey或其他支持UserScript的浏览器扩展。
2. 安装本脚本后打开Discord网站并登录账号。
3. 进入需要清理消息的频道或私信页面。
4. 使用脚本提供的界面或按钮执行批量删除操作。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `none` | 脚本不需要额外权限，直接运行即可。 |

## 安全分析

**风险等级**：🟢 SAFE　　**分析时间**：2026-04-15

> 该UserScript未检测到任何数据外传或隐私采集行为，未使用远程代码执行手段，权限申请合理且无滥用，未调用敏感API，代码无混淆，且无外部依赖风险。整体安全性良好。

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
> 脚本未读取document.cookie、localStorage、sessionStorage，未监听键盘事件，未访问表单字段，未调用浏览器指纹相关API。  
> 位置：全脚本  
> 建议：无需修改，保持无隐私采集行为。

**🔴 HIGH** — 远程代码执行  
> 脚本未使用eval、new Function、setTimeout字符串参数、innerHTML执行远程代码，且无@require或动态加载远程脚本。  
> 位置：全脚本  
> 建议：无需修改，避免远程代码执行风险。

**🔴 HIGH** — 权限滥用  
> 脚本声明@grant none，且代码中未使用任何高权限API，权限申请合理，无滥用。  
> 位置：元数据与代码  
> 建议：无需修改，权限申请与使用匹配。

**🟠 MEDIUM** — 敏感API调用  
> 脚本未调用navigator.geolocation、RTCPeerConnection、MediaDevices、Clipboard API等敏感API。  
> 位置：全脚本  
> 建议：无需修改，避免敏感API调用。

**🟠 MEDIUM** — 代码混淆  
> 脚本代码未发现明显混淆特征，无base64解码执行或字符串拼接执行。  
> 位置：全脚本  
> 建议：保持代码清晰，避免混淆。

**🟡 LOW** — 外部依赖  
> 脚本无@require加载外部依赖，所有资源均为官方或可信来源，且无版本固定问题。  
> 位置：元数据  
> 建议：继续保持依赖来源可信及版本管理。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://raw.githubusercontent.com/victornpb/undiscord/f73f615aaeceae65d38ad5dd065950f2ed5c6dc8/deleteDiscordMessages.user.js)*
