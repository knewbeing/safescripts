---
title: Telegram受限图片视频下载器
---

# Telegram受限图片视频下载器

`下载工具`  `Telegram`  `媒体保存`  `私密频道`  `网页脚本`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Telegram_Media_Downloader.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.212**　　发现时间：**2026-04-15**　　来源：[GreasyFork](https://greasyfork.org/scripts/446342-telegram-media-downloader) <Badge type="tip" text="GreasyFork" />　　安装量：**200,868**　　评分：👍188 / 👎43

## 功能介绍

本脚本允许用户在Telegram网页版中下载私密频道内被禁止下载的图片、GIF、视频和语音消息。它绕过频道的下载限制，方便用户保存内容。使用简单，安装后即可在聊天界面直接下载受限媒体。

## 适用网站

- Telegram网页版

## 使用方法

1. 安装Tampermonkey或类似的用户脚本管理器。
2. 在管理器中添加并启用本脚本。
3. 打开Telegram网页版并登录账号。
4. 进入私密频道，点击媒体旁的下载按钮即可保存文件。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `无特殊权限，仅在网页环境下执行` | 允许脚本在网页中运行并操作页面内容 |

## 安全分析

**风险等级**：🟡 LOW　　**分析时间**：2026-04-15

> 该脚本主要功能为从 Telegram 官方网页下载受限媒体内容，未发现向第三方服务器发送用户数据或采集用户隐私的行为。代码未使用远程代码执行手段，权限申请合理，且无敏感 API 调用和代码混淆。外部资源来源可信。整体风险较低。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：https://update.greasyfork.org, https://img.icons8.com） |
| 隐私采集 | ✅ 未检测到 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本中使用了 fetch 进行网络请求，目标为 Telegram 官方域名（web.telegram.org 等）和更新服务器（update.greasyfork.org），未发现向第三方服务器发送用户数据的行为。  
> 位置：代码中 fetch 请求部分  
> 建议：确认所有请求均为官方或可信服务器，避免向未知第三方服务器发送数据。

**⛔ CRITICAL** — 隐私采集  
> 脚本未读取 document.cookie、localStorage、sessionStorage，也未监听键盘输入事件或读取表单字段值。  
> 位置：全脚本  
> 建议：无建议，隐私采集行为未发现。

**🔴 HIGH** — 远程代码执行  
> 脚本未使用 eval、new Function、setTimeout(string) 等远程代码执行相关函数，也未通过 @require 或动态 script 标签加载远程 JS。  
> 位置：全脚本  
> 建议：保持代码安全，避免动态执行不可信代码。

**🔴 HIGH** — 权限滥用  
> 脚本未声明 @grant 权限，且代码中未使用 GM_* 等特殊权限接口，权限申请与使用匹配，无滥用。  
> 位置：元数据与代码  
> 建议：无建议。

**🟠 MEDIUM** — 敏感 API 调用  
> 脚本未调用 navigator.geolocation、RTCPeerConnection、MediaDevices、Clipboard API 等敏感 API。  
> 位置：全脚本  
> 建议：无建议。

**🟠 MEDIUM** — 代码混淆  
> 代码结构清晰，无明显混淆、base64 解码或字符串拼接执行特征。  
> 位置：全脚本  
> 建议：保持代码可读性，避免混淆带来的安全隐患。

**🟡 LOW** — 外部依赖  
> 脚本未使用 @require 加载外部依赖，所有资源均来自官方或可信来源（GitHub、Greasy Fork、icons8）。  
> 位置：元数据  
> 建议：确保外部资源来源可信且版本固定，防止供应链攻击。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/446342-telegram-media-downloader)*
