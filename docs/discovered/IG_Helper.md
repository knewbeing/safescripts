---
title: "IG小助手"
---

# IG小助手

`Instagram`  `下载工具`  `图片视频保存`  `社交媒体`  `一键操作`  `浏览增强`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/IG_Helper.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**4.0.3**　　发现时间：**2026-06-22**　　来源：[GreasyFork](https://greasyfork.org/scripts/404535-ig-helper) <Badge type="tip" text="GreasyFork" />　　安装量：**48,472**　　评分：👍125 / 👎6

## 功能介绍

本脚本可让你在Instagram上一键下载帖子中的照片和视频，包括快拍、Reels和头像。操作简单，无需额外工具即可保存喜欢的内容。

## 适用网站

- Instagram

## 使用方法

1. 安装脚本后，打开Instagram网站。
2. 浏览帖子、快拍、Reels或个人主页。
3. 点击新增的下载按钮即可保存照片或视频。
4. 下载内容会自动保存到你的设备。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_addStyle` | 用于动态添加或修改页面样式，让下载按钮更美观。 |
| `GM_getResourceText` | 获取脚本内置资源文本，如样式表或本地化信息。 |
| `GM_getValue` | 读取用户设置或脚本存储的数据。 |
| `GM_info` | 获取当前脚本的相关信息，如版本号。 |
| `GM_notification` | 在浏览器显示通知，提示下载完成等信息。 |
| `GM_openInTab` | 在新标签页打开链接，方便预览或下载内容。 |
| `GM_registerMenuCommand` | 注册菜单命令，允许用户通过浏览器菜单操作脚本。 |
| `GM_setValue` | 保存用户设置或脚本数据。 |
| `GM_unregisterMenuCommand` | 注销菜单命令，移除不需要的操作项。 |
| `GM_xmlhttpRequest` | 发起跨域网络请求，获取图片或视频资源。 |

## 安全分析

**风险等级**：🟡 LOW　　**安全评分**：89/100　　**分析时间**：2026-06-22

> The IG Helper script is generally safe. It does not exfiltrate user data, collect sensitive information, or execute remote code unsafely. All external resources are loaded from trusted CDNs with SRI hashes. There is mild permission over-claim, but no critical or high-severity risks detected.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**🟠 MEDIUM** — Permission Over-claim  
> The script requests a wide set of @grant permissions, including GM_openInTab, GM_notification, and GM_xmlhttpRequest, but not all are used in the visible code. This is a mild permission over-claim.  
> 位置：Metadata  
> 建议：Restrict @grant to only those APIs actually used in the script.

**🟡 LOW** — Network Permissions  
> The script requests GM_xmlhttpRequest permission and @connect to cdn.jsdelivr.net, i.instagram.com, and raw.githubusercontent.com. However, all network requests are limited to Instagram's own API and trusted CDNs for resources and libraries. No evidence of user data or page content being sent to third-party servers.  
> 位置：Metadata and code  
> 建议：Continue to monitor for any future changes that may introduce data exfiltration.

**🟡 LOW** — Supply Chain  
> The script uses @require to load third-party libraries (mediabunny and jQuery) from official CDNs with SRI hashes, which mitigates supply chain risk.  
> 位置：Metadata  
> 建议：Continue to pin versions and hashes for all external dependencies.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/404535-ig-helper)*
