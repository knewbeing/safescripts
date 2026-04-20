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

**风险等级**：⛔ CRITICAL　　**安全评分**：50/100　　**分析时间**：2026-04-20

> 该脚本主要通过第三方加速代理服务器实现 Github 文件高速下载，存在数据外传风险（CRITICAL），用户的下载行为和请求内容可能被第三方记录。未检测到主动隐私采集、远程代码执行、代码混淆、DOM XSS、供应链风险等问题。建议用户谨慎使用第三方加速节点，避免下载敏感或私有仓库内容。整体安全评分为 50，风险等级为 CRITICAL。脚本不建议用于敏感场景。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：https://gh.h233.eu.org/https://github.com, https://rapidgit.jjda.de5.net/https://github.com, https://gh.ddlc.top/https://github.com） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本通过构造下载链接，将用户请求重定向到第三方加速代理服务器（如 gh.h233.eu.org、gh-proxy.org 等），存在数据外传风险。虽然主要用于下载 Github 文件，但用户的下载行为、请求内容可能被第三方服务器记录。  
> 位置：download_url_us 数组及相关下载逻辑  
> 建议：警告用户可能存在隐私泄露风险，建议仅使用可信加速节点。避免在下载敏感或私有仓库内容时使用第三方加速。

**🟠 MEDIUM** — 隐私采集  
> 脚本未检测到主动采集用户隐私数据（如 cookie、localStorage、剪贴板、表单输入等），但通过 GM_getValue/GM_setValue 存储用户配置。  
> 位置：GM_getValue/GM_setValue  
> 建议：确认存储内容仅为配置项，不含敏感信息。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 GM_openInTab、GM_notification、GM_setClipboard 等权限，部分权限（如 GM_openInTab）可被滥用，但实际用途为打开下载链接、通知和复制链接，未发现滥用。  
> 位置：元数据 @grant  
> 建议：定期复查权限申请，避免不必要的高权限。

**🟡 LOW** — 远程代码执行  
> 脚本未使用 eval、new Function、setTimeout(string)、setInterval(string) 等动态代码执行方式，也未通过 innerHTML/outerHTML 插入外部脚本。  
> 位置：全局代码  
> 建议：保持当前安全实践，避免后续引入动态代码执行。

**🟡 LOW** — 代码混淆  
> 脚本未检测到代码混淆、base64 解码、字符串映射或高度压缩代码。  
> 位置：全局代码  
> 建议：保持代码可读性，便于社区审查。

**🟡 LOW** — DOM XSS  
> 脚本未检测到 DOM XSS 风险（未直接将用户输入插入 innerHTML/outerHTML）。  
> 位置：全局代码  
> 建议：继续避免直接插入用户输入到 DOM。

**🟡 LOW** — 敏感 API 调用  
> 脚本未调用敏感 API（如 geolocation、RTCPeerConnection、MediaDevices、Clipboard API 读取、Notification API 滥用）。  
> 位置：全局代码  
> 建议：继续避免敏感 API 调用。

**🟡 LOW** — 供应链风险  
> 脚本未通过 @require 加载第三方库，未发现供应链风险。  
> 位置：元数据  
> 建议：如需引入第三方库，建议固定版本哈希并使用官方 CDN。

**🟡 LOW** — ClickJacking / iframe 风险  
> 脚本未修改 frame 保护策略，也未创建隐藏 iframe 用于数据提取。  
> 位置：全局代码  
> 建议：继续避免 iframe 风险。

---

*文档由 SafeScripts 自动生成 · [查看原始脚本](https://update.greasyfork.org/scripts/412245/Github%20%E5%A2%9E%E5%BC%BA%20-%20%E9%AB%98%E9%80%9F%E4%B8%8B%E8%BD%BD.user.js)*
