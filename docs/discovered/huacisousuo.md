---
title: "Limbopro 网页划词搜索神器"
---

# Limbopro 网页划词搜索神器

`划词搜索`  `网页增强`  `多平台适用`  `影视搜索`  `谷歌搜索`  `番号搜索`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/huacisousuo.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.3**　　发现时间：**2026-06-08**　　来源：[limbopro/Adblock4limbo](https://github.com/limbopro/Adblock4limbo) <Badge type="tip" text="GitHub" />

## 功能介绍

本脚本让你在网页上选中文字后，快速通过谷歌、影视、番号等搜索引擎进行搜索。界面适配手机和电脑，操作简单，搜索按钮以链接形式展示。

## 适用网站

- 所有HTTPS网页

## 使用方法

1. 安装脚本后，打开任意HTTPS网页。
2. 用鼠标或手指选中你想搜索的文字。
3. 弹出的搜索菜单会显示不同搜索选项。
4. 点击对应链接即可跳转到相关搜索结果页面。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `none` | 脚本无需特殊权限，仅操作网页内容。 |

## 安全分析

**风险等级**：🟡 LOW　　**安全评分**：97/100　　**分析时间**：2026-07-27

> 该脚本仅监听用户划词并生成搜索链接，通过 a 标签跳转，无主动数据外传、隐私采集、远程代码执行、混淆、XSS、权限滥用、敏感 API 调用、供应链或 iframe 风险。整体安全性高，风险极低。建议用户注意不要选中敏感信息进行搜索。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**🟡 LOW** — 数据外传  
> 脚本将用户选中的文本拼接到搜索 URL 并通过 a 标签跳转，但未通过 fetch、GM_xmlhttpRequest 等主动网络请求发送数据。  
> 位置：btns.forEach(b => { if (b.dataset.url) { b.href = b.dataset.url + encodeURIComponent(text); } });  
> 建议：确保目标搜索页面可信，避免用户敏感信息被误传。仅通过 a 标签跳转，风险较低。

**🟡 LOW** — 隐私采集  
> 脚本监听 selectionchange 事件，读取用户选中的文本，但未主动采集或外传隐私数据。  
> 位置：document.addEventListener('selectionchange', ...)  
> 建议：避免将敏感信息（如密码、身份证号等）选中后跳转到第三方搜索。

**🟡 LOW** — 远程代码执行  
> 脚本未使用 eval、new Function、setTimeout(string)、setInterval(string) 等远程代码执行方式。  
> 位置：全局  
> 建议：保持当前实现，避免动态执行字符串代码。

**🟡 LOW** — 代码混淆  
> 脚本未使用混淆、压缩、base64 编码或字符串映射等混淆技术。  
> 位置：全局  
> 建议：保持代码可读性，便于安全审查。

**🟡 LOW** — DOM XSS / 注入  
> 脚本未将用户输入直接插入 innerHTML/outerHTML，未发现 DOM XSS 风险。  
> 位置：全局  
> 建议：如需插入用户输入到 DOM，需进行转义。

**🟡 LOW** — 权限滥用  
> 脚本未申请任何 @grant 权限，未滥用敏感权限。  
> 位置：元数据 @grant none  
> 建议：保持最小权限原则。

**🟡 LOW** — 敏感 API 调用  
> 脚本未调用敏感 API（如 geolocation、RTCPeerConnection、MediaDevices、Clipboard、Notification）。  
> 位置：全局  
> 建议：如需调用敏感 API，需征得用户同意。

**🟡 LOW** — 供应链风险  
> 脚本未通过 @require 加载第三方库，无供应链风险。  
> 位置：元数据 @require none  
> 建议：如需引入第三方库，建议使用官方 CDN 并固定版本。

**🟡 LOW** — ClickJacking / iframe 风险  
> 脚本未修改 frame 保护策略，也未创建隐藏 iframe 用于数据提取。  
> 位置：全局  
> 建议：保持当前实现，避免 iframe 滥用。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://raw.githubusercontent.com/limbopro/Adblock4limbo/44674b73b0134dfaa8322984bca4a8b966428bf6/Adguard/huacisousuo.user.js)*
