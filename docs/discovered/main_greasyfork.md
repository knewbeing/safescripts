---
title: GitHub 中文化插件
---

# GitHub 中文化插件

`中文化`  `GitHub`  `界面翻译`  `用户脚本`  `实时翻译`  `开发辅助`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/main_greasyfork.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.9.2-2026-04-08**　　发现时间：**2026-04-15**　　来源：[maboloshi/github-chinese](https://github.com/maboloshi/github-chinese) <Badge type="tip" text="GitHub" />

## 功能介绍

本脚本将 GitHub 网站的部分菜单和内容翻译成中文，提升中文用户的使用体验。它会自动检测页面变化并实时替换界面文本。支持 GitHub 主站、技能页面、Gist 以及状态页。

## 适用网站

- GitHub
- GitHub Skills
- GitHub Gist
- GitHub 状态页

## 使用方法

1. 安装 Tampermonkey 或其他支持的用户脚本管理器。
2. 在脚本市场或源码页面安装本脚本。
3. 访问 GitHub 及相关页面时，界面会自动显示中文翻译。
4. 可通过脚本菜单进行相关设置和更新操作。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_xmlhttpRequest` | 用于发送跨域请求获取翻译数据或更新内容。 |
| `GM_getValue` | 用于读取脚本的本地存储设置。 |
| `GM_setValue` | 用于保存脚本的本地存储设置。 |
| `GM_registerMenuCommand` | 用于在脚本菜单中注册自定义命令，方便用户操作。 |
| `GM_unregisterMenuCommand` | 用于注销已注册的菜单命令。 |
| `GM_notification` | 用于显示桌面通知提醒用户。 |

## 安全分析

**风险等级**：🟡 LOW　　**分析时间**：2026-04-15

> 该脚本主要用于翻译 GitHub 界面文本，无数据外传和隐私采集行为。存在未使用的 GM_xmlhttpRequest 权限和 @connect 域名，建议移除以降低权限风险。整体代码无远程代码执行和敏感 API 调用风险，外部依赖可信，风险等级为低。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |

### 发现的问题

**⛔ CRITICAL** — 隐私采集  
> 脚本未读取 document.cookie、localStorage、sessionStorage，也未监听键盘输入事件，未访问浏览器指纹相关 API，隐私采集行为未发现。  
> 位置：主脚本  
> 建议：无

**🔴 HIGH** — 权限滥用  
> 脚本申请了 GM_xmlhttpRequest 权限和 @connect www.iflyrec.com，但代码中未发现任何网络请求行为，存在权限滥用风险。  
> 位置：元数据和主脚本  
> 建议：移除未使用的 GM_xmlhttpRequest 权限和无用的 @connect 域名，减少权限暴露。

**🔴 HIGH** — 远程代码执行  
> 脚本未使用 eval、new Function、setTimeout(string)、innerHTML 执行远程代码，也未通过 @require 或动态 script 标签加载远程 JS（@require 指向可信 GreasyFork），无远程代码执行风险。  
> 位置：主脚本及元数据  
> 建议：无

**🟠 MEDIUM** — 敏感 API 调用  
> 脚本未调用敏感 API 如 navigator.geolocation、RTCPeerConnection、MediaDevices、Clipboard API 等。  
> 位置：主脚本  
> 建议：无

**🟠 MEDIUM** — 代码混淆  
> 代码结构清晰，无明显混淆、base64 解码执行或字符串拼接执行特征。  
> 位置：主脚本  
> 建议：无

**🟡 LOW** — 外部依赖  
> @require 加载的第三方库来源于 GreasyFork，可信且版本固定。  
> 位置：元数据  
> 建议：无

---

*由 SafeScripts 自动发现 · [查看原始来源](https://raw.githubusercontent.com/maboloshi/github-chinese/2635cb959e88c263108a99e022b3ddd5e9818838/main(greasyfork).user.js)*
