---
title: "优化搜索结果重定向"
---

# 优化搜索结果重定向

`搜索优化`  `去重定向`  `隐私保护`  `广告屏蔽`  `效率提升`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Lite-AC-Baidu-SoGou-Google-NoRedirect.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**11.0**　　发现时间：**2026-07-06**　　来源：[langren1353/GM_script](https://github.com/langren1353/GM_script) <Badge type="tip" text="GitHub" />

## 功能介绍

本脚本可以自动去除百度、搜狗、谷歌等搜索结果中的跳转链接，让你点击搜索结果时直接访问原始网页，提升访问速度并保护隐私。部分情况下还能去除广告和优化favicon显示。

## 适用网站

- 百度搜索
- 百度知道
- 搜狗搜索
- Bing搜索
- 谷歌搜索

## 使用方法

1. 1. 安装脚本后，打开百度、搜狗、谷歌、Bing等搜索页面。
2. 2. 搜索任意内容，点击结果时会直接跳转到真实网页，无需额外操作。
3. 3. 如遇广告或跳转问题，刷新页面即可。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_xmlhttpRequest` | 允许脚本发起跨域网络请求，用于获取真实网页地址。 |

## 安全分析

**风险等级**：🟡 LOW　　**安全评分**：97/100　　**分析时间**：2026-07-06

> 该脚本主要用于绕过搜索引擎重定向，直接访问真实目标链接。仅向 baidu.com 和 sogou.com 发起 GET 请求解析目标地址，不涉及用户敏感数据或隐私采集。未发现远程代码执行、代码混淆、DOM XSS、权限滥用、敏感 API 调用、供应链风险或 iframe 风险。整体安全性较高，建议持续保持代码可读性和权限最小化原则。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：www.baidu.com, baidu.com, sogou.com） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本使用 GM_xmlhttpRequest 发起 GET 请求到 baidu.com 和 sogou.com，用于解析真实目标链接。请求内容为重定向链接本身，不包含用户敏感数据或 cookie。未发现数据外传到非搜索引擎域名。  
> 位置：resetURL() 和 GM_xmlhttpRequest 调用  
> 建议：确保请求仅用于解析重定向，避免携带用户敏感信息。若未来扩展功能，需严格限制目标域名。

**⛔ CRITICAL** — 隐私采集  
> 脚本未读取 cookie、localStorage、sessionStorage、IndexedDB，也未监听键盘输入或表单字段，未访问指纹 API，未读取剪贴板内容。  
> 位置：全局代码审查  
> 建议：保持现有行为，勿添加隐私采集功能。

**🔴 HIGH** — 远程代码执行  
> 未发现 eval、new Function、setTimeout(string)、setInterval(string) 等远程代码执行风险。未动态加载外部脚本。  
> 位置：全局代码审查  
> 建议：继续避免动态执行字符串代码。

**🔴 HIGH** — 代码混淆  
> 代码未混淆，无 base64 解码、字符串数组映射、unicode 混淆或高度压缩单行代码。  
> 位置：全局代码审查  
> 建议：保持代码可读性，便于社区审查。

**🔴 HIGH** — DOM XSS / 注入  
> 未发现将用户输入或 URL 参数直接插入 innerHTML/outerHTML，未使用 document.write() 插入不可信内容，未操作 iframe src 为 javascript: 协议。  
> 位置：全局代码审查  
> 建议：继续避免 DOM 注入风险。

**🟠 MEDIUM** — 权限滥用  
> 仅申请 GM_xmlhttpRequest 权限，实际代码中有使用，未发现权限滥用或未使用高权限申请。  
> 位置：元数据与代码对比  
> 建议：仅申请必要权限。

**🟠 MEDIUM** — 敏感 API 调用  
> 未调用敏感 API（如 geolocation、RTCPeerConnection、MediaDevices、Clipboard、Notification）。  
> 位置：全局代码审查  
> 建议：避免添加敏感 API 调用。

**🟠 MEDIUM** — 供应链风险  
> 未使用 @require 加载第三方库，无供应链风险。  
> 位置：元数据  
> 建议：如需引入第三方库，建议固定版本哈希并使用官方 CDN。

**🟡 LOW** — ClickJacking / iframe 风险  
> 未修改 frame 保护策略，未创建隐藏 iframe 用于数据提取。  
> 位置：全局代码审查  
> 建议：继续避免 iframe 风险。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://raw.githubusercontent.com/langren1353/GM_script/2d93f39fd1dd61c477a147fae583c259cbbc00fd/Lite-AC-Baidu-SoGou-Google-NoRedirect.user.js)*
