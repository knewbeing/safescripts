---
title: "Torn物品市场商店助手"
---

# Torn物品市场商店助手

`Torn`  `游戏辅助`  `物品市场`  `商店管理`  `信息展示`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Bazaars_in_Item_Market_Powered_by_TornW3B.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**3.26**　　发现时间：**2026-05-18**　　来源：[GreasyFork](https://greasyfork.org/scripts/527616-bazaars-in-item-market-powered-by-tornw3b) <Badge type="tip" text="GreasyFork" />　　安装量：**8,325**　　评分：👍2 / 👎0

## 功能介绍

本脚本为 Torn 游戏的物品市场页面增加了个人商店（Bazaar）商品展示，并提供排序功能。用户可以更方便地浏览和筛选市场中的个人商店商品。

## 适用网站

- Torn 游戏物品市场页面
- Torn 游戏个人商店页面

## 使用方法

1. 安装脚本后，进入 Torn 的物品市场或个人商店页面。
2. 页面会自动显示所有个人商店（Bazaar）的商品列表。
3. 可使用新增的排序控件，对商品进行筛选和排序。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM.xmlHttpRequest` | 允许脚本向外部服务器请求数据，用于获取和展示商店信息。 |
| `GM_setValue` | 用于在本地保存用户的设置或缓存数据。 |
| `GM_getValue` | 用于读取本地保存的设置或缓存数据。 |
| `GM_deleteValue` | 用于删除本地保存的设置或缓存数据。 |
| `GM_listValues` | 用于列出所有本地保存的设置或缓存数据的键名。 |
| `GM.setValue` | 用于以新版API方式保存本地数据。 |
| `GM.getValue` | 用于以新版API方式读取本地数据。 |
| `GM.deleteValue` | 用于以新版API方式删除本地数据。 |
| `GM.listValues` | 用于以新版API方式列出所有本地数据的键名。 |

## 安全分析

**风险等级**：🟡 LOW　　**安全评分**：72/100　　**分析时间**：2026-05-18

> 该脚本主要通过 GM.xmlHttpRequest 访问 weav3r.dev 获取市场数据，未发现上传用户敏感信息或 Cookie。未采集隐私、无远程代码执行、无混淆、无 XSS 风险。权限申请略有冗余，建议精简。整体安全风险较低。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：weav3r.dev） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本通过 GM.xmlHttpRequest 访问 weav3r.dev，但未发现携带用户敏感数据或 Cookie，仅用于获取市场数据。  
> 位置：GM.xmlHttpRequest 调用（@connect weav3r.dev）  
> 建议：确保仅请求公开 API，不上传用户敏感信息。

**⛔ CRITICAL** — 隐私采集  
> 脚本使用 GM_setValue/GM_getValue 及 localStorage 存储设置，无敏感信息采集。未监听键盘、未读取表单、未访问指纹 API。  
> 位置：全局设置管理相关代码  
> 建议：继续避免采集用户隐私数据。

**🔴 HIGH** — 远程代码执行  
> 未发现 eval、new Function、setTimeout(string) 等远程代码执行风险。未动态加载远程 JS。  
> 位置：全局  
> 建议：保持当前实现，避免引入动态代码执行。

**🔴 HIGH** — 代码混淆  
> 未发现代码混淆、base64 解码、字符串数组映射或高度压缩单行代码。  
> 位置：全局  
> 建议：保持代码可读性，便于安全审计。

**🔴 HIGH** — DOM XSS / 注入  
> 未发现将用户输入或 URL 参数直接插入 innerHTML/outerHTML。未见 document.write() 注入。  
> 位置：全局  
> 建议：如后续需插入用户数据，务必转义。

**🟠 MEDIUM** — 权限滥用  
> @grant 权限与实际使用基本匹配，但部分 GM.*Value 权限存在冗余（如 GM_listValues 未实际调用）。  
> 位置：元数据 @grant  
> 建议：移除未使用的高权限申请，最小化权限集。

**🟠 MEDIUM** — 敏感 API 调用  
> 未调用 geolocation、RTCPeerConnection、MediaDevices、Clipboard API、Notification API 等敏感接口。  
> 位置：全局  
> 建议：如需使用敏感 API，需明确告知用户。

**🟠 MEDIUM** — 供应链风险  
> @require 未使用第三方库，无供应链风险。  
> 位置：元数据  
> 建议：如需引入第三方库，建议使用官方 CDN 并锁定版本。

**🟡 LOW** — ClickJacking / iframe 风险  
> 未见修改 frame 保护策略或创建隐藏 iframe。  
> 位置：全局  
> 建议：如需嵌入 iframe，需评估 ClickJacking 风险。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/527616-bazaars-in-item-market-powered-by-tornw3b)*
