---
title: 旁路全部短链接
---

# 旁路全部短链接

`短链接绕过`  `广告屏蔽`  `自动跳转`  `视频下载`  `浏览器脚本`  `用户脚本`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Bypass_All_Shortlinks.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**96.7**　　发现时间：**2026-04-15**　　来源：[GreasyFork](https://greasyfork.org/scripts/431691-bypass-all-shortlinks) <Badge type="tip" text="GreasyFork" />　　安装量：**464,335**　　评分：👍574 / 👎89

## 功能介绍

本脚本自动绕过各种短链接和链接缩短服务，直接跳转到目标页面。它能跳过广告平台如AdFly，屏蔽烦人的广告和弹窗，阻止广告拦截检测，并支持自动下载文件和YouTube视频。使用后浏览体验更流畅，无需手动关闭广告或等待跳转。

## 适用网站

- 所有支持短链接的网站（除部分知名大站和金融、教育、政府等安全站点）

## 使用方法

1. 安装脚本后，访问任何短链接网站。
2. 脚本会自动跳过短链接和广告，直接跳转目标页面。
3. 遇到YouTube视频或文件时，自动开始下载。
4. 可通过脚本菜单调整设置和功能。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_setValue` | 存储和读取脚本设置和数据 |
| `GM_getValue` | 读取脚本设置和数据 |
| `GM_addStyle` | 添加自定义样式美化页面 |
| `GM_openInTab` | 在新标签页打开链接 |
| `GM_setClipboard` | 复制内容到剪贴板 |
| `GM_xmlhttpRequest` | 发送跨域网络请求获取数据 |
| `window.onurlchange` | 监听浏览器地址变化事件 |
| `GM_registerMenuCommand` | 注册菜单命令，方便用户操作脚本 |

## 安全分析

**风险等级**：🟡 LOW　　**分析时间**：2026-04-15

> 该脚本主要功能为绕过短链接和广告，自动跳过烦人的链接缩短器和广告，自动下载文件和视频。脚本使用了GM_xmlhttpRequest和@require加载远程脚本，存在数据外传行为，但请求目标为可信的更新服务器和图标托管服务器，未发现上传用户敏感数据。未发现隐私采集、远程代码执行风险和权限滥用。整体风险等级为低。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：https://update.greasyfork.org, https://i.ibb.co） |
| 隐私采集 | ✅ 未检测到 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本使用了GM_xmlhttpRequest进行网络请求，且@require加载了远程脚本，存在数据外传风险。请求目标主要为GreasyFork更新服务器和图标托管服务器，未发现明显的用户敏感数据上传。  
> 位置：GM_xmlhttpRequest调用及@require远程脚本加载  
> 建议：确认远程脚本来源可信，避免上传用户敏感数据。

**⛔ CRITICAL** — 隐私采集  
> 脚本未发现读取document.cookie、localStorage、sessionStorage，未监听键盘事件，未读取表单字段，未访问浏览器指纹相关API。  
> 位置：代码整体  
> 建议：无

**🔴 HIGH** — 远程代码执行  
> 未发现eval、new Function、setTimeout字符串执行、innerHTML执行远程内容，@require加载的远程脚本为可信GreasyFork更新地址。  
> 位置：代码整体  
> 建议：无

**🔴 HIGH** — 权限滥用  
> 脚本申请了多个GM_*权限，均在代码中有合理使用，未发现权限滥用。  
> 位置：元数据@grant声明与代码使用  
> 建议：无

**🟠 MEDIUM** — 敏感API调用  
> 未发现使用navigator.geolocation、RTCPeerConnection、MediaDevices、Clipboard API等敏感API。  
> 位置：代码整体  
> 建议：无

**🟠 MEDIUM** — 代码混淆  
> 未发现明显代码混淆、base64解码执行或字符串拼接执行。  
> 位置：代码整体  
> 建议：无

**🟡 LOW** — 外部依赖  
> @require加载的第三方库来源为GreasyFork官方更新地址，版本固定，来源可信。  
> 位置：@require声明  
> 建议：无

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/431691-bypass-all-shortlinks)*
