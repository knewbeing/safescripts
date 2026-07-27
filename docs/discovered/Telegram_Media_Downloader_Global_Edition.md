---
title: "Telegram 媒体下载器 全球版"
---

# Telegram 媒体下载器 全球版

`下载工具`  `Telegram`  `图片处理`  `视频下载`  `网页增强`  `跨平台`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Telegram_Media_Downloader_Global_Edition.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.0.0**　　发现时间：**2026-04-27**　　来源：[GreasyFork](https://greasyfork.org/scripts/573418-telegram-media-downloader-global-edition) <Badge type="tip" text="GreasyFork" />　　安装量：**642**　　评分：👍0 / 👎0

## 功能介绍

本脚本可绕过限制，一键下载 Telegram 网页版中的视频和图片。支持保存原图、图片压缩及转换为 PNG 格式，方便用户保存和管理媒体文件。

## 适用网站

- Telegram网页版

## 使用方法

1. 1. 安装 Tampermonkey 插件并添加本脚本。
2. 2. 打开 Telegram 网页版（web.telegram.org 等）。
3. 3. 在聊天或频道页面，点击新增的下载按钮即可保存视频或图片。
4. 4. 可选择保存原图、压缩图片或转换为 PNG 格式。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `unsafeWindow` | 允许脚本访问和操作网页中的全局对象，以实现下载和界面增强功能。 |

## 安全分析

**风险等级**：🟡 LOW　　**安全评分**：64/100　　**分析时间**：2026-07-27

> 该脚本仅包含元数据，无实际功能代码，不存在数据外传、隐私采集、远程代码执行、混淆、DOM XSS、供应链风险等高危行为。唯一风险为申请了未使用的 unsafeWindow 权限，建议移除。整体安全风险极低。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本未包含任何网络请求代码（如 GM_xmlhttpRequest、fetch、XMLHttpRequest、WebSocket、EventSource），不存在数据外传行为。  
> 位置：完整代码  
> 建议：保持现有状态，勿添加外部数据传输逻辑。

**⛔ CRITICAL** — 隐私采集  
> 脚本未包含任何隐私采集代码（如 document.cookie、localStorage、sessionStorage、IndexedDB、剪贴板读取、键盘监听等）。  
> 位置：完整代码  
> 建议：保持现有状态，勿添加隐私采集逻辑。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 unsafeWindow 权限，但实际代码未使用该权限。  
> 位置：元数据 @grant unsafeWindow  
> 建议：移除未使用的高权限申请，减少潜在攻击面。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/573418-telegram-media-downloader-global-edition)*
