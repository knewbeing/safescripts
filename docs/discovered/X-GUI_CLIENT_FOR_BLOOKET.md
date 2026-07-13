---
title: "X-GUI CLIENT FOR BLOOKET"
---

# X-GUI CLIENT FOR BLOOKET



<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/X-GUI_CLIENT_FOR_BLOOKET.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**6.10x**　　发现时间：**2026-04-16**　　来源：[GreasyFork](https://greasyfork.org/scripts/553301-x-gui-client-for-blooket) <Badge type="tip" text="GreasyFork" />　　安装量：**7,150**　　评分：👍14 / 👎0

## 功能介绍



## 适用网站

- 通用

## 使用方法

- 请参阅脚本说明

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| — | 无特殊权限 |

## 安全分析

**风险等级**：🟡 LOW　　**安全评分**：82/100　　**分析时间**：2026-07-13

> 该脚本主要实现了弹窗欢迎界面和 GUI 相关功能，未检测到任何数据外传、隐私采集、远程代码执行、代码混淆、DOM XSS、权限滥用、敏感 API 调用、供应链风险或 iframe 风险。仅使用 localStorage 存储设置，未与外部服务器通信。整体安全风险极低。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**🟡 LOW** — localStorage usage  
> 使用 localStorage 记录用户设置和弹窗关闭状态，但未检测到外传行为。  
> 位置：localStorage.getItem/setItem  
> 建议：无风险，注意不要存储敏感信息。

**🟡 LOW** — DOM manipulation  
> 脚本动态创建和插入 DOM 元素（如弹窗、GUI），但未检测到将用户输入或 URL 参数直接插入 innerHTML。  
> 位置：box.innerHTML, gui.style, document.createElement  
> 建议：保持对用户输入的严格转义，防止未来引入 XSS。

**🟡 LOW** — network request  
> 脚本未检测到任何网络请求（fetch、XMLHttpRequest、WebSocket、sendBeacon、EventSource）用于数据外传。  
> 位置：全局  
> 建议：保持现状，勿添加外传逻辑。

**🟡 LOW** — code execution  
> 未检测到 eval、new Function、setTimeout(string)、setInterval(string) 等远程代码执行高危函数。  
> 位置：全局  
> 建议：保持现状，勿引入动态执行代码。

**🟡 LOW** — supply chain  
> 未检测到 @require 或动态加载远程 JS，无供应链风险。  
> 位置：元数据区  
> 建议：如需引入第三方库，请使用可信 CDN 并锁定版本。

**🟡 LOW** — obfuscation  
> 未检测到代码混淆、base64 解码、字符串数组混淆或高度压缩代码。  
> 位置：全局  
> 建议：保持代码可读性，便于安全审计。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/553301-x-gui-client-for-blooket)*
