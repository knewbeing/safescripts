---
title: YouTube改进 – 布局与视频增强
---

# YouTube改进 – 布局与视频增强

`视频增强`  `布局优化`  `主题切换`  `视频下载`  `截图功能`  `快进控制`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/YouTube_Improvements_Layout_Video_Enhancer.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.1.4**　　发现时间：**2026-04-15**　　来源：[GreasyFork](https://greasyfork.org/scripts/560618-youtube-improvements-layout-video-enhancer) <Badge type="tip" text="GreasyFork" />　　安装量：**28,050**　　评分：👍16 / 👎8

## 功能介绍

该脚本为YouTube提供多项实用增强功能，包括优化视频详情页的布局，支持视频下载和截图，允许用户切换深色与浅色主题，并提供视频快进控制等。使用后，观看体验更加便捷和个性化。

## 适用网站

- YouTube

## 使用方法

1. 安装脚本后，访问YouTube网站。
2. 在视频详情页体验优化后的布局和功能。
3. 使用菜单或页面按钮下载视频或截图。
4. 切换深色/浅色主题，调整观看风格。
5. 使用快进控制更方便地浏览视频内容。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_registerMenuCommand` | 添加自定义菜单命令，方便用户操作脚本功能。 |
| `GM_openInTab` | 在新标签页打开链接或页面。 |
| `GM.openInTab` | 在新标签页打开链接或页面（新版API）。 |
| `GM_addStyle` | 添加自定义样式，调整页面布局和外观。 |
| `GM_setValue` | 保存脚本设置或数据。 |
| `GM_getValue` | 读取脚本保存的设置或数据。 |
| `GM_deleteValue` | 删除脚本保存的数据。 |
| `GM_xmlhttpRequest` | 发送跨域请求，获取视频或相关数据。 |
| `unsafeWindow` | 访问页面的全局变量和函数，增强脚本与页面的交互。 |
| `GM_download` | 下载视频或文件到本地。 |
| `GM_setClipboard` | 复制文本到剪贴板，方便分享或保存。 |
| `GM_addElement` | 动态添加页面元素，增强页面功能。 |

## 安全分析

**风险等级**：🟠 MEDIUM　　**分析时间**：2026-04-15

> 该脚本为 YouTube 提供多项功能增强，申请了多项权限以支持视频下载、截图、主题切换等功能。存在网络请求行为，可能向第三方服务器发送数据，需确认请求目标可信且无隐私泄露。未发现远程代码执行和权限滥用风险，代码未混淆，未使用外部依赖。整体风险为中等，建议用户关注网络请求目标和隐私保护。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：greasyfork.org, update.greasyfork.org） |
| 隐私采集 | ❌ 检测到（可能访问 document.cookie、localStorage 以实现功能, 未发现监听键盘输入或读取表单字段的行为, 未发现异常访问浏览器指纹相关 API） |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本使用了 GM_xmlhttpRequest 和 GM_download 等权限，可能会向第三方服务器发送请求或下载视频文件。需要确认请求目标是否为可信服务器，且无用户隐私数据泄露风险。  
> 位置：脚本中 GM_xmlhttpRequest 和 GM_download 调用处  
> 建议：确认所有网络请求目标为可信服务器，避免向未知第三方发送用户数据。

**⛔ CRITICAL** — 隐私采集  
> 脚本可能访问了 document.cookie、localStorage 或监听了键盘事件以增强功能，但未发现明显的隐私数据采集行为。  
> 位置：脚本中对 document.cookie、localStorage、事件监听的使用  
> 建议：确保不采集或上传用户敏感信息，避免监听敏感输入。

**🔴 HIGH** — 远程代码执行  
> 脚本未使用 eval、new Function、setTimeout(string) 等远程代码执行方式，且未通过 @require 加载远程脚本。  
> 位置：脚本主体代码  
> 建议：保持代码执行安全，避免动态执行不可信代码。

**🔴 HIGH** — 权限滥用  
> 脚本申请了较多权限（如 GM_xmlhttpRequest、GM_download、GM_setClipboard、unsafeWindow 等），但实际使用均合理，未发现权限滥用。  
> 位置：元数据 @grant 与代码使用对比  
> 建议：定期审查权限使用，避免申请未使用或滥用高权限。

**🟠 MEDIUM** — 敏感 API 调用  
> 未发现对敏感 API（如 navigator.geolocation、RTCPeerConnection、MediaDevices、Clipboard API）异常调用。  
> 位置：脚本主体代码  
> 建议：继续监控敏感 API 使用，避免隐私泄露。

**🟠 MEDIUM** — 代码混淆  
> 脚本代码未见明显混淆或通过 base64 解码执行代码的行为。  
> 位置：脚本主体代码  
> 建议：保持代码清晰，便于安全审计。

**🟡 LOW** — 外部依赖  
> @require 未使用，脚本无外部依赖。  
> 位置：元数据 @require  
> 建议：如未来添加依赖，确保来源可信且版本固定。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/560618-youtube-improvements-layout-video-enhancer)*
