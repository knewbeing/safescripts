---
title: YouTube改进 – 布局与视频增强
---

# YouTube改进 – 布局与视频增强

`视频增强`  `布局优化`  `视频下载`  `截图工具`  `主题切换`  `快进控制`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/YouTube_Improvements_Layout_Video_Enhancer.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.1.4**　　发现时间：**2026-04-15**　　来源：[GreasyFork](https://greasyfork.org/scripts/560618-youtube-improvements-layout-video-enhancer) <Badge type="tip" text="GreasyFork" />　　安装量：**28,061**　　评分：👍16 / 👎8

## 功能介绍

本脚本为YouTube提供多项实用功能，包括优化视频详情页布局，支持视频下载和截图，提供深色/浅色主题切换，以及视频快进控制等，提升观看体验。

## 适用网站

- YouTube

## 使用方法

1. 安装脚本后打开YouTube网站。
2. 在视频详情页享受优化的布局和增强功能。
3. 使用菜单或按钮进行视频下载、截图等操作。
4. 通过切换按钮切换深色或浅色主题。
5. 使用快进控制更方便地调整播放进度。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_registerMenuCommand` | 添加自定义菜单命令，方便操作脚本功能。 |
| `GM_openInTab` | 在新标签页打开链接或页面。 |
| `GM.openInTab` | 在新标签页打开链接或页面（兼容写法）。 |
| `GM_addStyle` | 添加自定义样式，调整页面布局和外观。 |
| `GM_setValue` | 保存脚本设置或数据。 |
| `GM_getValue` | 读取脚本保存的设置或数据。 |
| `GM_deleteValue` | 删除保存的设置或数据。 |
| `GM_xmlhttpRequest` | 发送跨域请求，获取视频数据等。 |
| `unsafeWindow` | 访问页面的全局变量和函数，增强脚本功能。 |
| `GM_download` | 下载视频或文件到本地。 |
| `GM_setClipboard` | 复制文本到剪贴板，方便分享或保存。 |
| `GM_addElement` | 动态添加页面元素，增强界面交互。 |

## 安全分析

**风险等级**：🟠 MEDIUM　　**分析时间**：2026-04-15

> 该脚本为 YouTube 提供多项增强功能，涉及视频下载、截图、主题切换等。脚本会访问本地存储和监听键盘事件，且使用了 GM_xmlhttpRequest 和 GM_download 进行网络请求和文件下载。未发现远程代码执行和权限滥用风险。建议确认所有网络请求目标可信，避免上传敏感数据。整体风险等级为中等。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：greasyfork.org） |
| 隐私采集 | ❌ 检测到（访问 localStorage 和 sessionStorage 存储用户设置, 监听键盘事件（keydown、keyup、input）实现快捷键功能） |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本使用了 GM_xmlhttpRequest 和 GM_download 等权限，可能会向第三方服务器发送请求或下载视频文件。需要确认请求目标是否为可信服务器，且无用户敏感数据上传。  
> 位置：代码中使用 GM_xmlhttpRequest、GM_download  
> 建议：确认所有网络请求目标为可信服务器，避免上传用户敏感数据。

**⛔ CRITICAL** — 隐私采集  
> 脚本读取和操作了 localStorage 和 sessionStorage，用于存储用户设置。  
> 位置：代码中访问 localStorage、sessionStorage  
> 建议：确保不存储敏感信息，避免泄露用户隐私。

**⛔ CRITICAL** — 隐私采集  
> 脚本监听了键盘事件（keydown、keyup、input）以实现快捷键和输入功能。  
> 位置：代码中监听键盘事件  
> 建议：避免监听敏感输入内容，如密码等。

**🔴 HIGH** — 权限滥用  
> 脚本通过 @grant 申请了多个权限，包括 GM_xmlhttpRequest、GM_download、GM_setClipboard、unsafeWindow 等，实际代码中均有使用。  
> 位置：元数据 @grant 权限声明与代码使用情况  
> 建议：权限申请合理，无明显滥用。

**🔴 HIGH** — 远程代码执行  
> 脚本未使用 eval、new Function、setTimeout(string) 等远程代码执行方式，也未动态加载远程脚本。  
> 位置：代码中无远程代码执行相关调用  
> 建议：保持代码安全，避免动态执行不可信代码。

**🟠 MEDIUM** — 敏感 API 调用  
> 脚本使用了 Clipboard API（GM_setClipboard）用于复制功能。  
> 位置：代码中使用 GM_setClipboard  
> 建议：确保复制内容安全，避免泄露用户隐私。

**🟠 MEDIUM** — 代码混淆  
> 代码未发现明显混淆或 base64 解码执行等混淆特征。  
> 位置：代码整体  
> 建议：保持代码清晰，便于安全审计。

**🟡 LOW** — 外部依赖  
> @require 未声明外部依赖，所有代码均内置，避免供应链风险。  
> 位置：元数据 @require  
> 建议：继续保持依赖来源可信和版本固定。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/560618-youtube-improvements-layout-video-enhancer)*
