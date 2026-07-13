---
title: "Youtube 工具 多合一本地下載 MP4、MP3"
---

# Youtube 工具 多合一本地下載 MP4、MP3

`YouTube工具`  `视频下载`  `音频下载`  `多合一`  `高质量`  `恢复踩数`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Youtube_Tools_All_in_one_local_download_mp3_mp4_HIGT_QUALITY_return_dislikes_and.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**2.4.3.2**　　发现时间：**2026-07-06**　　来源：[GreasyFork](https://greasyfork.org/scripts/460680-youtube-tools-all-in-one-local-download-mp3-mp4-higt-quality-return-dislikes-and-more) <Badge type="tip" text="GreasyFork" />　　安装量：**192,742**　　评分：👍116 / 👎40

## 功能介绍

本脚本为YouTube提供多合一工具，支持本地下载视频（MP4）和音频（MP3），无需外部服务。还可恢复视频的“踩”数显示，提升使用体验。

## 适用网站

- YouTube

## 使用方法

1. 安装脚本后，打开YouTube网站。
2. 在视频页面会出现下载MP4和MP3按钮。
3. 点击按钮即可下载对应格式的文件。
4. 踩数（不喜欢）会自动恢复显示，无需额外操作。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_info` | 获取当前脚本的相关信息，如版本和作者。 |
| `GM_addStyle` | 为页面添加自定义样式，让工具界面更美观。 |
| `GM_setValue` | 在浏览器本地存储和读取脚本设置或数据。 |
| `GM_getValue` | 在浏览器本地读取脚本设置或数据。 |
| `unsafeWindow` | 允许脚本访问和操作页面的全局对象，增强功能。 |
| `GM_registerMenuCommand` | 在油猴菜单中添加自定义命令，方便用户操作。 |

## 安全分析

**风险等级**：🔴 HIGH　　**安全评分**：50/100　　**分析时间**：2026-07-13

> 该脚本存在较高安全风险，主要体现在与多个第三方 API 通信，可能外传用户行为数据（如视频 ID、页面 URL），并申请了 unsafeWindow 高权限。未发现明显的代码混淆、远程代码执行或 DOM XSS 风险。建议仅在信任脚本作者和 API 服务的前提下使用，并注意个人隐私保护。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：https://returnyoutubedislikeapi.com, https://translate.googleapis.com, https://p.savenow.to） |
| 隐私采集 | ❌ 检测到（API 请求可能包含视频 ID、页面 URL 等用户行为数据） |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本通过 fetch/GM_xmlhttpRequest 等方式与多个第三方 API 通信，包括 returnyoutubedislikeapi.com、translate.googleapis.com、p.savenow.to、p.lbserver.xyz、dubs.io，可能传递视频 ID、页面信息等数据。  
> 位置：全局常量定义及后续 API 调用  
> 建议：仅允许必要的 API 通信，明确告知用户数据用途，避免传递敏感信息。

**⛔ CRITICAL** — 数据外传  
> 脚本未发现明显的隐私采集（如读取 cookie、localStorage、监听键盘输入等），但部分 API 请求可能间接传递用户行为数据（如视频 ID、页面 URL）。  
> 位置：API 调用参数构造处  
> 建议：确保不上传用户敏感信息，API 请求参数应最小化。

**🔴 HIGH** — 远程代码执行  
> 脚本未发现 eval、new Function、setTimeout(string) 等远程代码执行风险。  
> 位置：全局  
> 建议：保持此安全实践。

**🔴 HIGH** — 代码混淆  
> 脚本未发现明显的代码混淆、base64 解码、字符串数组混淆等。  
> 位置：全局  
> 建议：保持代码可读性，便于安全审计。

**🟠 MEDIUM** — 供应链风险  
> @require 加载了第三方库 iziToast，来源为 jsdelivr 官方 CDN，版本已锁定。  
> 位置：元数据 @require  
> 建议：建议定期检查依赖安全性。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 unsafeWindow 权限，存在一定安全隐患（可访问页面全局作用域，增加攻击面）。  
> 位置：元数据 @grant  
> 建议：如非必要，建议移除 unsafeWindow 权限。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/460680-youtube-tools-all-in-one-local-download-mp3-mp4-higt-quality-return-dislikes-and-more)*
