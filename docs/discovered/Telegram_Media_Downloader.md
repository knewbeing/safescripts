---
title: Telegram受限图片视频下载器
---

# Telegram受限图片视频下载器

`Telegram`  `媒体下载`  `私密频道`  `图片视频`  `语音消息`  `网页脚本`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Telegram_Media_Downloader.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.212**　　发现时间：**2026-04-15**　　来源：[GreasyFork](https://greasyfork.org/scripts/446342-telegram-media-downloader) <Badge type="tip" text="GreasyFork" />　　安装量：**200,861**　　评分：👍188 / 👎43

## 功能介绍

本脚本允许用户在Telegram网页版中下载私密频道内被禁止下载的图片、GIF、视频和语音消息。它绕过了频道对内容保存的限制，方便用户保存重要的多媒体文件。使用简单，无需额外操作即可启用下载功能。

## 适用网站

- Telegram网页版

## 使用方法

1. 安装Tampermonkey扩展并导入本脚本。
2. 打开Telegram网页版并登录账号。
3. 进入私密频道浏览媒体内容。
4. 点击新增的下载按钮保存图片、视频或语音消息。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `无特殊权限声明` | 允许脚本在网页中运行并操作页面内容以实现下载功能 |

## 安全分析

**风险等级**：🟡 LOW　　**分析时间**：2026-04-15

> 该脚本主要功能为从 Telegram 官方网页下载受限媒体内容。网络请求仅限于 Telegram 官方域名，未发现向第三方服务器发送数据或采集用户隐私的行为。未使用动态代码执行或远程脚本加载，权限申请合理且无滥用。整体代码无混淆，未依赖外部库。综合评估风险等级为低。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：https://web.telegram.org, https://webk.telegram.org, https://webz.telegram.org） |
| 隐私采集 | ✅ 未检测到 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本中使用了 fetch 进行网络请求，目标均为 Telegram 官方域名，用于下载媒体内容。未发现向第三方服务器发送用户数据的行为。  
> 位置：函数 tel_download_video 中的 fetch 调用  
> 建议：确认请求仅限于 Telegram 官方域名，避免向未知第三方发送数据。

**⛔ CRITICAL** — 隐私采集  
> 脚本未读取 document.cookie、localStorage、sessionStorage，也未监听键盘事件或读取表单字段值。未发现访问浏览器指纹相关 API 的行为。  
> 位置：整体脚本  
> 建议：无

**🔴 HIGH** — 远程代码执行  
> 脚本未使用 eval、new Function、setTimeout(string) 等动态代码执行方法。未通过 @require 或动态 script 标签加载远程 JS。  
> 位置：整体脚本  
> 建议：无

**🔴 HIGH** — 权限滥用  
> 脚本未声明 @grant 权限，且代码中未使用 GM_* 等特殊权限接口，权限申请与使用匹配，无滥用。  
> 位置：元数据与代码  
> 建议：无

**🟠 MEDIUM** — 敏感 API 调用  
> 未检测到使用 navigator.geolocation、RTCPeerConnection、MediaDevices、Clipboard API 等敏感 API。  
> 位置：整体脚本  
> 建议：无

**🟠 MEDIUM** — 代码混淆  
> 代码结构清晰，未发现明显的混淆、base64 解码执行或字符串拼接执行特征。  
> 位置：整体脚本  
> 建议：无

**🟡 LOW** — 外部依赖  
> 脚本未使用 @require 加载外部依赖，所有代码均为本地实现。  
> 位置：元数据  
> 建议：无

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/446342-telegram-media-downloader)*
