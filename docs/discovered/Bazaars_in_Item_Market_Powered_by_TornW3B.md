---
title: "物品市场集市浏览增强"
---

# 物品市场集市浏览增强

`游戏辅助`  `商品浏览`  `集市管理`  `数据排序`  `Torn`  `用户体验优化`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Bazaars_in_Item_Market_Powered_by_TornW3B.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**3.26**　　发现时间：**2026-05-25**　　来源：[GreasyFork](https://greasyfork.org/scripts/527616-bazaars-in-item-market-powered-by-tornw3b) <Badge type="tip" text="GreasyFork" />　　安装量：**8,648**　　评分：👍2 / 👎0

## 功能介绍

本脚本在 Torn 游戏的物品市场页面显示各个玩家的集市（Bazaar）商品列表，并提供排序功能，方便用户浏览和筛选商品。

## 适用网站

- Torn 城市游戏

## 使用方法

1. 安装脚本后，打开 Torn 游戏的物品市场或集市页面。
2. 页面会自动显示集市商品列表及排序按钮。
3. 点击排序按钮，可按价格等条件筛选商品。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM.xmlHttpRequest` | 用于发送网络请求，获取集市商品数据。 |
| `GM_setValue` | 用于保存用户的设置或脚本数据。 |
| `GM_getValue` | 用于读取用户的设置或脚本数据。 |
| `GM_deleteValue` | 用于删除用户的设置或脚本数据。 |
| `GM_listValues` | 用于列出所有已保存的脚本数据键。 |
| `GM.setValue` | 用于保存用户的设置或脚本数据（新版API）。 |
| `GM.getValue` | 用于读取用户的设置或脚本数据（新版API）。 |
| `GM.deleteValue` | 用于删除用户的设置或脚本数据（新版API）。 |
| `GM.listValues` | 用于列出所有已保存的脚本数据键（新版API）。 |

## 安全分析

**风险等级**：🔴 HIGH　　**安全评分**：67/100　　**分析时间**：2026-06-15

> 脚本主要风险为通过 GM.xmlHttpRequest 与 weav3r.dev 通信，存在数据外传风险。未发现远程代码执行、混淆、DOM XSS、敏感 API 调用等高危问题。localStorage 用于存储设置，风险较低。建议明确请求内容，减少权限申请。整体安全性中等偏高，但因数据外传扣分，安全评分为 67。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：weav3r.dev） |
| 隐私采集 | ❌ 检测到（localStorage 用于存储脚本设置） |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本通过 GM.xmlHttpRequest 访问 weav3r.dev，可能传递用户行为或页面数据。  
> 位置：GM.xmlHttpRequest 调用（@connect weav3r.dev）  
> 建议：明确检查请求内容，确保不包含敏感用户数据、Cookie、页面内容。建议在文档中声明用途。

**🟠 MEDIUM** — 隐私采集  
> 脚本使用 localStorage 存储和读取设置数据，部分 GM_*Value 兼容实现涉及 localStorage。  
> 位置：GM_getValue, GM_setValue, GM_deleteValue, GM_listValues 兼容实现  
> 建议：确保存储内容不包含敏感信息（如密码、token）。当前仅存储脚本设置，风险较低。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 GM.xmlHttpRequest、GM_setValue 等高权限，但实际代码未使用 GM_download、GM_openInTab。  
> 位置：@grant 元数据  
> 建议：建议仅申请实际使用的权限，减少权限滥用风险。

**🟡 LOW** — 远程代码执行  
> 未发现远程代码执行相关风险（未使用 eval、new Function、动态 script 标签等）。  
> 位置：全局代码审查  
> 建议：保持当前实现，避免动态执行外部代码。

**🟡 LOW** — 代码混淆  
> 未发现代码混淆、压缩或 base64/unicode 混淆特征。  
> 位置：全局代码审查  
> 建议：保持代码可读性，便于社区审查。

**🟡 LOW** — DOM XSS  
> 未发现 DOM XSS 或注入风险，未直接插入用户输入到 innerHTML。  
> 位置：全局代码审查  
> 建议：继续避免直接插入用户输入到 DOM。

**🟡 LOW** — 敏感 API 调用  
> 未发现敏感 API 调用（如 geolocation、RTCPeerConnection、MediaDevices、Clipboard API）。  
> 位置：全局代码审查  
> 建议：保持当前实现，避免调用敏感 API。

**🟡 LOW** — 供应链风险  
> 未使用 @require 加载第三方库，无供应链风险。  
> 位置：元数据 @require  
> 建议：如需加载第三方库，建议使用官方 CDN 并固定版本。

**🟡 LOW** — ClickJacking/iframe  
> 未发现 ClickJacking 或 iframe 风险。  
> 位置：全局代码审查  
> 建议：继续避免创建隐藏 iframe 或修改 frame 保护策略。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/527616-bazaars-in-item-market-powered-by-tornw3b)*
