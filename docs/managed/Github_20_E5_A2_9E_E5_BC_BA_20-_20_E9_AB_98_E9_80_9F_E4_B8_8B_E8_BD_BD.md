---
title: "Github增强 - 高速下载"
---

# Github增强 - 高速下载

`下载加速`  `Github增强`  `代码管理`  `资源获取`  `公益加速`  `开发工具`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/managed/Github_20_E5_A2_9E_E5_BC_BA_20-_20_E9_AB_98_E9_80_9F_E4_B8_8B_E8_BD_BD.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**2.6.38**　　最后更新：**2026-06-01**

## 功能介绍

本脚本为Github提供高速下载功能，支持加速Git Clone/SSH、Release、Raw、Code(ZIP)等文件的下载，并可在项目列表中快速下载单个文件。通过公益加速源提升下载速度，方便用户获取代码和资源。

## 适用网站

- Github
- bgithub加速镜像

## 使用方法

1. 安装脚本后，访问Github或bgithub加速镜像网站。
2. 在项目页面会出现高速下载按钮或菜单。
3. 点击相关按钮即可通过加速源下载代码、文件或Release资源。
4. 如需更换加速源或反馈问题，可在菜单中操作。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_registerMenuCommand` | 用于在浏览器菜单中添加自定义命令，方便用户操作。 |
| `GM_unregisterMenuCommand` | 用于移除自定义菜单命令，保持菜单整洁。 |
| `GM_openInTab` | 允许脚本在新标签页打开链接，便于下载或查看文件。 |
| `GM_getValue` | 用于存储和读取用户设置，如加速源选择等。 |
| `GM_setValue` | 用于保存用户偏好设置，提升使用体验。 |
| `GM_notification` | 在下载完成或操作时弹出通知，提醒用户。 |
| `GM_setClipboard` | 一键复制下载链接到剪贴板，方便粘贴使用。 |
| `window.onurlchange` | 监听网址变化，确保功能在页面切换时持续有效。 |

## 安全分析

**风险等级**：🟠 MEDIUM　　**安全评分**：75/100　　**分析时间**：2026-06-08

> 该脚本主要通过将 Github 下载请求重定向到多个第三方公益加速节点实现高速下载。未检测到隐私采集、远程代码执行、代码混淆、DOM XSS、供应链等高危风险。主要安全关注点为数据外传：所有通过加速节点下载的内容、请求、甚至可能的账号相关资源，都会经过第三方服务器，存在被记录、篡改或泄露的理论风险。建议用户下载敏感或私有内容时谨慎使用。整体安全性中等，适合公开仓库文件加速下载场景。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：https://gh.h233.eu.org, https://rapidgit.jjda.de5.net, https://gh.ddlc.top） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本通过构造加速下载链接，将用户的 Github 下载请求重定向到第三方加速节点（如 gh.h233.eu.org、ghproxy.net 等），涉及页面内容的外部传输。  
> 位置：download_url_us, clone_url, raw_url 等数组及相关逻辑  
> 建议：提醒用户这些加速节点为第三方服务，下载敏感内容需谨慎，建议在代码注释和文档中明确风险。

**⛔ CRITICAL** — 隐私采集  
> 脚本未检测到主动收集用户隐私数据（如 cookie、localStorage、表单、指纹等）或监听键盘输入等行为。  
> 位置：全局  
> 建议：保持现状，勿添加隐私采集逻辑。

**🔴 HIGH** — 远程代码执行  
> 脚本未检测到 eval、new Function、setTimeout(string)、setInterval(string) 等远程代码执行风险，也未动态加载远程 JS。  
> 位置：全局  
> 建议：保持现状，勿添加动态代码执行逻辑。

**🔴 HIGH** — 代码混淆  
> 脚本未检测到明显的代码混淆、base64 解码、字符串数组映射或高度压缩代码。  
> 位置：全局  
> 建议：保持代码可读性，便于社区审计。

**🔴 HIGH** — DOM XSS / 注入  
> 脚本未检测到 DOM XSS 风险（如用户输入直接插入 innerHTML/outerHTML），也未操作 iframe src 为 javascript:。  
> 位置：全局  
> 建议：继续避免不安全的 DOM 操作。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 GM_openInTab、GM_notification、GM_setClipboard 等权限，均有实际用途（如打开新标签、通知、复制下载链接），未发现权限滥用。  
> 位置：元数据 @grant  
> 建议：仅申请实际需要的权限，定期复查。

**🟠 MEDIUM** — 敏感 API 调用  
> 脚本未检测到敏感 API（如 geolocation、RTCPeerConnection、MediaDevices、Clipboard API 读取、Notification 滥用）调用。  
> 位置：全局  
> 建议：继续避免敏感 API 滥用。

**🟠 MEDIUM** — 供应链风险  
> 脚本未使用 @require 加载第三方库，无供应链风险。  
> 位置：元数据  
> 建议：如需引入第三方库，建议使用可信官方 CDN 并锁定版本。

**🟡 LOW** — ClickJacking / iframe 风险  
> 脚本未检测到修改 frame 保护策略或创建隐藏 iframe 用于数据提取。  
> 位置：全局  
> 建议：继续避免相关风险。

---

*文档由 SafeScripts 自动生成 · [查看原始脚本](https://update.greasyfork.org/scripts/412245/Github%20%E5%A2%9E%E5%BC%BA%20-%20%E9%AB%98%E9%80%9F%E4%B8%8B%E8%BD%BD.user.js)*
