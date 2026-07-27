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

**风险等级**：🔴 HIGH　　**安全评分**：47/100　　**分析时间**：2026-07-27

> 该脚本存在严重的数据外传风险，涉及多个第三方 API，可能会传递用户数据。未发现明显隐私采集、远程代码执行、代码混淆或 DOM XSS 风险。供应链风险和权限滥用为中等。建议用户谨慎使用，尤其关注数据外传行为。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：https://returnyoutubedislikeapi.com, https://translate.googleapis.com, https://p.savenow.to） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本通过 fetch/GM_xmlhttpRequest 等方式与多个第三方 API 通信，包括 returnyoutubedislikeapi.com、translate.googleapis.com、savenow.to、lbserver.xyz、dubs.io，可能会传递用户数据（如视频ID、页面内容等）。  
> 位置：apiDislikes, apiGoogleTranslate, API_URL_AUDIO_VIDEO, DUBS_START_ENDPOINT, DUBS_STATUS_ENDPOINT  
> 建议：仅在必要时调用第三方 API，避免传递敏感用户数据，明确告知用户数据用途。

**🟠 MEDIUM** — 隐私采集  
> 脚本访问和操作 localStorage、sessionStorage、GM_setValue、GM_getValue，可能涉及用户偏好或数据存储，但未发现直接采集敏感隐私数据。  
> 位置：GM_setValue, GM_getValue  
> 建议：确保仅存储必要的非敏感数据，避免存储用户隐私信息。

**🟠 MEDIUM** — 供应链风险  
> 脚本通过 @require 加载第三方库 iziToast，来源为 jsdelivr 官方 CDN，版本号已固定。  
> 位置：@require https://cdn.jsdelivr.net/npm/izitoast@1.4.0/dist/js/iziToast.min.js  
> 建议：保持第三方库来源可信且版本固定，定期检查依赖安全性。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 unsafeWindow 权限，但代码未发现实际使用 unsafeWindow 的高风险操作。  
> 位置：@grant unsafeWindow  
> 建议：仅在必要时申请 unsafeWindow 权限，避免滥用。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/460680-youtube-tools-all-in-one-local-download-mp3-mp4-higt-quality-return-dislikes-and-more)*
