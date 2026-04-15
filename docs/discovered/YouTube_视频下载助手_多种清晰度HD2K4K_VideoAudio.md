---
title: YouTube视频下载助手
---

# YouTube视频下载助手

`视频下载`  `YouTube`  `高清视频`  `字幕下载`  `短视频下载`  `免费无广告`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/YouTube_视频下载助手_多种清晰度HD2K4K_VideoAudio.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.5.1**　　发现时间：**2026-04-15**　　来源：[GreasyFork](https://greasyfork.org/scripts/521434-youtube-%E8%A7%86%E9%A2%91%E4%B8%8B%E8%BD%BD%E5%8A%A9%E6%89%8B-%E5%A4%9A%E7%A7%8D%E6%B8%85%E6%99%B0%E5%BA%A6hd-2k-4k-video-audio) <Badge type="tip" text="GreasyFork" />　　安装量：**36,726**　　评分：👍22 / 👎8

## 功能介绍

这是一款免费的YouTube视频下载助手，支持下载1080P、2K等多种高清画质的视频。它还能下载视频字幕，支持视频和音频分离下载，还能下载YouTube短视频（Shorts）。使用过程中无广告，操作简单方便。

## 适用网站

- YouTube

## 使用方法

1. 安装脚本后打开YouTube网站
2. 在视频播放页面会自动显示下载按钮
3. 点击下载按钮选择所需清晰度和格式
4. 选择是否下载字幕或分离音视频
5. 等待下载完成即可保存视频

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_addStyle` | 用于向页面添加自定义样式，使下载按钮美观易用 |
| `GM_xmlhttpRequest` | 用于跨域请求，获取视频下载链接和相关数据 |
| `GM_getValue` | 用于存储和读取用户设置或缓存数据 |
| `GM_setValue` | 用于保存用户设置或缓存数据 |

## 安全分析

**风险等级**：🔴 HIGH　　**分析时间**：2026-04-15

> 该脚本主要功能为在YouTube页面插入下载按钮，点击后跳转至第三方域名进行视频下载。存在用户视频URL外传至第三方域名的风险，且申请了未使用的GM_xmlhttpRequest权限。未发现隐私采集、远程代码执行及敏感API调用行为。建议开发者明确告知用户数据外传情况，并清理未使用权限以降低风险。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：saveanyyoutube.com） |
| 隐私采集 | ✅ 未检测到 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本通过点击下载按钮时，将当前YouTube视频页面的URL替换域名为第三方域名（saveanyyoutube.com）并打开新窗口，存在用户数据（视频URL）外传风险。  
> 位置：createDownloadButton函数中的downloadButton点击事件处理器  
> 建议：建议明确告知用户数据将被发送至第三方域名，或避免自动跳转第三方域名以保护用户隐私。

**⛔ CRITICAL** — 隐私采集  
> 脚本未检测到对document.cookie、localStorage、sessionStorage的读取，也未监听键盘输入事件，未访问浏览器指纹相关API。  
> 位置：全局代码  
> 建议：无

**🔴 HIGH** — 远程代码执行  
> 脚本未使用eval、new Function、setTimeout字符串形式执行代码，也未动态加载远程脚本，@require的第三方库为官方CDN且版本固定。  
> 位置：全局代码  
> 建议：无

**🔴 HIGH** — 权限滥用  
> 脚本申请了GM_xmlhttpRequest权限，但代码中未检测到使用该API的调用，存在权限滥用风险。  
> 位置：元数据@grant和代码不匹配  
> 建议：建议移除未使用的GM_xmlhttpRequest权限申请，减少权限暴露。

**🟠 MEDIUM** — 敏感API调用  
> 脚本未调用敏感API如navigator.geolocation、RTCPeerConnection、MediaDevices、Clipboard API。  
> 位置：全局代码  
> 建议：无

**🟠 MEDIUM** — 代码混淆  
> 脚本代码结构清晰，无明显混淆、base64解码或字符串拼接执行特征。  
> 位置：全局代码  
> 建议：无

**🟡 LOW** — 外部依赖  
> @require加载的sweetalert2库来自官方jsdelivr CDN，且指定了版本号，可信且安全。  
> 位置：元数据@require  
> 建议：无

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/521434-youtube-%E8%A7%86%E9%A2%91%E4%B8%8B%E8%BD%BD%E5%8A%A9%E6%89%8B-%E5%A4%9A%E7%A7%8D%E6%B8%85%E6%99%B0%E5%BA%A6hd-2k-4k-video-audio)*
