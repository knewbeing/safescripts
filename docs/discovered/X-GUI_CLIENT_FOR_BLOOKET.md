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

**风险等级**：🟡 LOW　　**安全评分**：81/100　　**分析时间**：2026-07-27

> 该脚本主要用于页面美化和用户界面增强，未检测到数据外传、远程代码执行、敏感 API 调用、代码混淆或供应链风险。仅存在 localStorage 用户偏好存储和隐藏 iframe 创建，整体安全风险较低。建议持续关注后续版本是否引入网络请求、敏感数据采集或动态代码执行。当前安全评分为81，风险等级为LOW。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ❌ 检测到（localStorage: 存储弹窗关闭状态、主题、快捷键等用户偏好） |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — data transmission  
> 脚本未检测到网络请求（fetch、GM_xmlhttpRequest、WebSocket等）向第三方服务器发送数据。  
> 位置：window.fetch.call patch  
> 建议：如后续添加网络请求，需明确目的并限制数据类型。

**🔴 HIGH** — remote code execution  
> 脚本未检测到 eval、new Function、setTimeout(string)、setInterval(string)等远程代码执行风险。  
> 位置：全局代码  
> 建议：避免动态执行字符串代码，防止 RCE。

**🔴 HIGH** — obfuscation  
> 脚本未检测到代码混淆（base64、字符串数组映射、unicode混淆等），代码结构清晰。  
> 位置：全局代码  
> 建议：保持代码可读性，避免混淆。

**🟠 MEDIUM** — privacy collection  
> 脚本多次访问 localStorage，存储和读取用户偏好设置（如弹窗关闭状态、主题、快捷键等）。未检测到敏感数据采集或外传。  
> 位置：localStorage.getItem()/setItem()  
> 建议：确保仅存储非敏感数据，避免存储密码、token等敏感信息。

**🟠 MEDIUM** — sensitive API  
> 脚本未检测到敏感 API 调用（地理位置、摄像头、剪贴板等）。  
> 位置：全局代码  
> 建议：如需调用敏感 API，需征得用户明确同意。

**🟠 MEDIUM** — supply chain  
> 脚本未通过 @require 加载第三方库，无供应链风险。  
> 位置：// @require 缺失  
> 建议：如需加载第三方库，建议使用官方 CDN 并固定版本。

**🟡 LOW** — iframe risk  
> 脚本创建隐藏 iframe 并插入页面，可能用于数据提取或绕过同源策略，但未检测到数据外传行为。  
> 位置：(() => { let iframe = document.querySelector("iframe"); ... })  
> 建议：避免创建隐藏 iframe，除非有明确安全用途。若用于数据提取需严格限制访问内容。

**🟡 LOW** — DOM XSS  
> 脚本通过 innerHTML 插入静态 HTML 内容（弹窗、GUI），但未检测到用户输入或 URL 参数直接插入，XSS 风险较低。  
> 位置：box.innerHTML, gui.style, styles.innerHTML  
> 建议：如后续插入动态内容，需对用户输入进行转义。

**🟡 LOW** — permission  
> 脚本未申请任何 Tampermonkey/Greasemonkey权限（@grant none），权限滥用风险低。  
> 位置：// @grant none  
> 建议：保持最小权限原则，避免申请不必要的高权限。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/553301-x-gui-client-for-blooket)*
