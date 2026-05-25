---
title: "Github 增强 - 高速下载"
---

# Github 增强 - 高速下载

`下载加速`  `GitHub增强`  `文件管理`  `效率工具`  `公益加速`  `开发辅助`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/managed/Github_20_E5_A2_9E_E5_BC_BA_20-_20_E9_AB_98_E9_80_9F_E4_B8_8B_E8_BD_BD.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**2.6.37**　　最后更新：**2026-04-20**

## 功能介绍

本脚本为 GitHub 提供高速下载功能，支持加速 Git Clone/SSH、Release、Raw、Code(ZIP) 等文件下载。用户还可以在项目列表中一键下载单个文件，极大提升下载效率。所有加速服务均为公益性质，适合经常需要下载 GitHub 文件的用户。

## 适用网站

- GitHub
- hub.whtrys.space
- dgithub.xyz
- kkgithub.com
- github.site
- github.store
- bgithub.xyz

## 使用方法

1. 安装脚本后，访问 GitHub 或相关加速镜像网站。
2. 在文件、Release、Raw、Code(ZIP) 等页面，会出现加速下载按钮。
3. 点击加速按钮即可通过公益加速通道下载文件。
4. 如需自定义设置，可在脚本菜单中进行调整。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_registerMenuCommand` | 在脚本菜单中添加自定义功能按钮，方便操作。 |
| `GM_unregisterMenuCommand` | 移除脚本菜单中的自定义按钮。 |
| `GM_openInTab` | 在新标签页打开加速下载链接。 |
| `GM_getValue` | 保存用户的设置或偏好。 |
| `GM_setValue` | 设置或更新用户的设置或偏好。 |
| `GM_notification` | 通过浏览器通知提醒用户操作结果。 |
| `GM_setClipboard` | 将加速下载链接一键复制到剪贴板。 |
| `window.onurlchange` | 监听页面地址变化，确保功能在单页应用中正常。 |

## 安全分析

**风险等级**：⛔ CRITICAL　　**安全评分**：27/100　　**分析时间**：2026-05-25

> 该脚本通过 @match 匹配多个非官方加速域名，存在严重的数据外传和供应链风险。由于未提供完整代码，无法进一步确认隐私采集、远程代码执行、代码混淆等风险。建议补充完整代码并严格限制数据传输目标，仅允许官方或可信域名。当前安全评分较低，不建议在敏感环境下使用。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：hub.whtrys.space, dgithub.xyz, kkgithub.com） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ⚠️ 存在风险 |

### 发现的问题

**⛔ CRITICAL** — Data Transmission  
> 脚本通过 @match 匹配多个第三方加速域名，可能将用户的下载请求、GitHub 文件、甚至 Cookie 等数据转发到这些非官方服务器，存在数据外传风险。  
> 位置：元数据 @match  
> 建议：仅允许官方 CDN 或可信域名，避免将用户数据转发到未知第三方服务器。

**⛔ CRITICAL** — Privacy Collection  
> 脚本未提供完整代码，无法确认是否存在隐私采集行为，如读取 cookie、localStorage、表单数据等，但存在潜在风险。  
> 位置：代码缺失  
> 建议：补充完整代码以便进一步审查，确保不采集用户敏感信息。

**🔴 HIGH** — Remote Code Execution  
> 脚本未提供完整代码，无法确认是否存在远程代码执行风险，如 eval、动态 script 加载等。  
> 位置：代码缺失  
> 建议：补充完整代码以便进一步审查，避免使用 eval、动态加载未固定版本的第三方库。

**🔴 HIGH** — Obfuscation  
> 脚本未提供完整代码，无法确认是否存在代码混淆行为。  
> 位置：代码缺失  
> 建议：补充完整代码以便进一步审查，避免使用混淆技术。

**🟠 MEDIUM** — Permission Abuse  
> 脚本申请了 GM_openInTab、GM_notification、GM_setClipboard 等高权限，但未提供代码说明实际用途，存在权限滥用风险。  
> 位置：元数据 @grant  
> 建议：仅申请实际需要的权限，避免滥用高权限。

**🟠 MEDIUM** — Supply Chain Risk  
> 脚本通过 @require 加载第三方库的风险未体现，但通过 @match 访问多个非官方域名，存在供应链风险。  
> 位置：元数据 @match  
> 建议：仅使用官方或可信 CDN，避免供应链污染。

---

*文档由 SafeScripts 自动生成 · [查看原始脚本](https://update.greasyfork.org/scripts/412245/Github%20%E5%A2%9E%E5%BC%BA%20-%20%E9%AB%98%E9%80%9F%E4%B8%8B%E8%BD%BD.user.js)*
