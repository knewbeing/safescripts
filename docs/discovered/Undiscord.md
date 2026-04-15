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

> 该UserScript未发现任何数据外传或隐私采集行为，未使用远程代码执行手段，权限申请合理且无滥用，未调用敏感API，代码无混淆且无外部依赖，整体安全性高。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本未使用任何网络请求API（如GM_xmlhttpRequest、fetch、XMLHttpRequest等），无数据外传行为。  
> 位置：全脚本  
> 建议：无需修改，保持无外传行为。

**⛔ CRITICAL** — 隐私采集  
> 脚本未读取document.cookie、localStorage、sessionStorage，也未监听键盘事件或读取表单字段，无隐私采集行为。  
> 位置：全脚本  
> 建议：无需修改，保持无隐私采集行为。

**🔴 HIGH** — 远程代码执行  
> 脚本未使用eval、new Function、setTimeout字符串参数或动态加载远程脚本，无远程代码执行风险。  
> 位置：全脚本  
> 建议：无需修改，避免引入远程代码执行。

**🔴 HIGH** — 权限滥用  
> 脚本声明@grant none，且代码中未使用任何高权限API，权限申请合理，无权限滥用。  
> 位置：元数据与代码  
> 建议：无需修改，权限申请与使用匹配。

**🟠 MEDIUM** — 敏感API调用  
> 脚本未调用navigator.geolocation、RTCPeerConnection、MediaDevices、Clipboard API等敏感API。  
> 位置：全脚本  
> 建议：无需修改，避免调用敏感API。

**🟠 MEDIUM** — 代码混淆  
> 脚本代码未发现明显混淆、base64解码或字符串拼接执行特征，代码清晰。  
> 位置：全脚本  
> 建议：保持代码清晰，避免混淆。

**🟡 LOW** — 外部依赖  
> 脚本无@require字段，无外部依赖，避免供应链风险。  
> 位置：元数据  
> 建议：保持无外部依赖或使用可信固定版本依赖。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/406540-undiscord)*
