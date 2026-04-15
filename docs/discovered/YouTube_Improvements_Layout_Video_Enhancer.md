---
title: YouTube改进 – 布局与视频增强
---

# YouTube改进 – 布局与视频增强

`视频增强`  `布局优化`  `主题切换`  `视频下载`  `截图功能`  `快进控制`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/YouTube_Improvements_Layout_Video_Enhancer.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.1.4**　　发现时间：**2026-04-15**　　来源：[GreasyFork](https://greasyfork.org/scripts/560618-youtube-improvements-layout-video-enhancer) <Badge type="tip" text="GreasyFork" />　　安装量：**28,061**　　评分：👍16 / 👎8

## 功能介绍

本脚本为YouTube提供多项实用增强功能，包括优化视频详情页布局，支持视频下载和截图，提供深色与浅色主题切换，以及视频快进控制等。使用后可提升观看体验和操作便捷性。

## 适用网站

- YouTube

## 使用方法

1. 安装脚本后打开YouTube网站。
2. 在视频详情页享受优化布局和新增功能。
3. 使用菜单或页面按钮进行视频下载、截图等操作。
4. 通过脚本提供的开关切换深色或浅色主题。
5. 使用快进控制按钮快速调整视频播放进度。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_registerMenuCommand` | 添加自定义菜单命令，方便用户操作脚本功能。 |
| `GM_openInTab` | 在新标签页打开链接或页面。 |
| `GM.openInTab` | 在新标签页打开链接或页面（新版API）。 |
| `GM_addStyle` | 添加自定义样式，调整页面外观。 |
| `GM_setValue` | 保存脚本设置或数据。 |
| `GM_getValue` | 读取脚本保存的设置或数据。 |
| `GM_deleteValue` | 删除保存的设置或数据。 |
| `GM_xmlhttpRequest` | 发送跨域网络请求，获取视频或相关数据。 |
| `unsafeWindow` | 访问页面的全局变量和函数，增强脚本与页面交互。 |
| `GM_download` | 下载视频或文件到本地。 |
| `GM_setClipboard` | 复制文本到剪贴板，方便分享或保存。 |
| `GM_addElement` | 动态添加页面元素，增强页面功能。 |

## 安全分析

**风险等级**：🟠 MEDIUM　　**分析时间**：2026-04-15

> 该脚本为YouTube提供多项增强功能，申请了多项权限，包括网络请求、本地存储、剪贴板操作等。存在数据外传和隐私采集的可能，需重点审查网络请求目标和数据处理逻辑。未发现明显远程代码执行风险，但需注意动态元素添加和下载功能的安全性。整体风险等级为中等，建议用户谨慎使用并关注更新。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：greasyfork.org, update.greasyfork.org） |
| 隐私采集 | ❌ 检测到（脚本可能访问document.cookie、localStorage、sessionStorage用于功能实现。, 脚本可能监听键盘事件以实现快捷键功能。, 脚本可能读取表单字段值以增强用户体验。） |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本使用了GM_xmlhttpRequest权限，可能用于网络请求。需要确认请求目标是否为第三方服务器以及是否携带用户数据。  
> 位置：@grant GM_xmlhttpRequest  
> 建议：审查所有网络请求代码，确保请求仅发送到可信服务器且不泄露用户隐私。

**⛔ CRITICAL** — 数据外传  
> 脚本申请了GM_setClipboard权限，可能涉及剪贴板操作，需确认是否有敏感数据写入剪贴板。  
> 位置：@grant GM_setClipboard  
> 建议：确认剪贴板操作不会泄露用户隐私或敏感信息。

**⛔ CRITICAL** — 隐私采集  
> 脚本申请了unsafeWindow权限，可能访问页面上下文，需确认是否读取或篡改敏感数据。  
> 位置：@grant unsafeWindow  
> 建议：审查unsafeWindow的使用，避免访问或泄露敏感信息。

**⛔ CRITICAL** — 隐私采集  
> 脚本申请了GM_setValue、GM_getValue、GM_deleteValue权限，涉及本地存储操作，需确认存储内容不包含敏感信息。  
> 位置：@grant GM_setValue, GM_getValue, GM_deleteValue  
> 建议：确认本地存储数据安全且不包含敏感信息。

**🔴 HIGH** — 远程代码执行  
> 脚本申请了GM_addElement权限，可能动态添加元素，需确认不会注入恶意脚本。  
> 位置：@grant GM_addElement  
> 建议：审查动态元素添加代码，避免XSS风险。

**🟠 MEDIUM** — 敏感API调用  
> 脚本申请了GM_openInTab和GM.openInTab权限，可能打开新标签页，需确认不会被用于钓鱼或恶意跳转。  
> 位置：@grant GM_openInTab, GM.openInTab  
> 建议：确认打开的新标签页链接安全且可信。

**🟠 MEDIUM** — 敏感API调用  
> 脚本申请了GM_download权限，涉及文件下载，需确认下载内容安全且来源可信。  
> 位置：@grant GM_download  
> 建议：确认下载文件安全，避免恶意文件。

**🟡 LOW** — 权限滥用  
> 脚本申请了GM_registerMenuCommand权限，允许注册菜单命令，需确认不会误导用户执行危险操作。  
> 位置：@grant GM_registerMenuCommand  
> 建议：确认菜单命令安全且明确。

**🟡 LOW** — 权限滥用  
> 脚本申请了GM_addStyle权限，用于添加样式，风险较低。  
> 位置：@grant GM_addStyle  
> 建议：无特殊风险。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/560618-youtube-improvements-layout-video-enhancer)*
