---
title: "智谱 GLM Coding 特惠订购抢购助手"
---

# 智谱 GLM Coding 特惠订购抢购助手

`抢购助手`  `前端优化`  `智谱GLM`  `订购辅助`  `按钮解锁`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/智谱_GLM_Coding_特惠订购抢购助手.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**6.6.7**　　发现时间：**2026-06-29**　　来源：[GreasyFork](https://greasyfork.org/scripts/571507-%E6%99%BA%E8%B0%B1-glm-coding-%E7%89%B9%E6%83%A0%E8%AE%A2%E8%B4%AD%E6%8A%A2%E8%B4%AD%E5%8A%A9%E6%89%8B) <Badge type="tip" text="GreasyFork" />　　安装量：**5,672**　　评分：👍15 / 👎5

## 功能介绍

本脚本用于智谱 GLM Coding 订购页面，自动去除按钮的不可点击状态，让抢购按钮变为可点击。仅改变页面前端显示，不影响实际购买流程。适合辅助抢购和体验教程。

## 适用网站

- 智谱大模型官网

## 使用方法

1. 安装脚本后，访问智谱 GLM Coding 订购页面。
2. 页面上的抢购或购买按钮会自动变为可点击状态。
3. 如需下单，按正常流程操作即可。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `none` | 脚本无需特殊权限，仅操作页面内容。 |

## 安全分析

**风险等级**：🟢 SAFE　　**安全评分**：100/100　　**分析时间**：2026-07-27

> 该脚本仅修改页面和接口返回的本地数据，未涉及任何数据外传、隐私采集、远程代码执行、混淆、DOM XSS、权限滥用、敏感 API、供应链或 iframe 风险。安全性极高，适合公开使用。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本通过劫持 JSON.parse、fetch、XMLHttpRequest，仅修改本地数据和响应内容，没有向任何第三方服务器发送数据，也未携带用户数据、页面内容或 Cookie。  
> 位置：全局  
> 建议：保持现有行为，不要添加任何数据外传逻辑。

**⛔ CRITICAL** — 隐私采集  
> 脚本未读取 document.cookie、localStorage、sessionStorage、IndexedDB，也未监听键盘输入、表单字段或剪贴板内容。  
> 位置：全局  
> 建议：继续避免任何隐私采集行为。

**🔴 HIGH** — 远程代码执行  
> 脚本未使用 eval、new Function、setTimeout(string)、setInterval(string)，也未通过 innerHTML/outerHTML 插入脚本或动态加载远程 JS。  
> 位置：全局  
> 建议：继续避免远程代码执行相关风险。

**🔴 HIGH** — 代码混淆  
> 代码未混淆，无 base64/unicode/字符串数组映射等混淆特征，代码结构清晰。  
> 位置：全局  
> 建议：保持代码可读性，避免混淆。

**🔴 HIGH** — DOM XSS / 注入  
> 脚本未将用户输入或 URL 参数直接插入 innerHTML/outerHTML，也未操作 iframe src 或 document.write 注入不可信内容。  
> 位置：全局  
> 建议：继续避免 DOM XSS/注入风险。

**🟠 MEDIUM** — 权限滥用  
> 脚本未申请任何 Tampermonkey/Greasemonkey权限（@grant none），无权限滥用风险。  
> 位置：元数据  
> 建议：仅申请必要权限，避免高权限滥用。

**🟠 MEDIUM** — 敏感 API 调用  
> 脚本未调用敏感 API（如 geolocation、RTCPeerConnection、MediaDevices、Clipboard、Notification）。  
> 位置：全局  
> 建议：继续避免敏感 API 调用。

**🟠 MEDIUM** — 供应链风险  
> 脚本未通过 @require 加载任何第三方库，无供应链风险。  
> 位置：元数据  
> 建议：如需加载第三方库，建议固定版本并使用官方 CDN。

**🟡 LOW** — ClickJacking / iframe 风险  
> 脚本未修改 frame 保护策略，也未创建隐藏 iframe 用于数据提取。  
> 位置：全局  
> 建议：继续避免 ClickJacking/iframe 风险。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/571507-%E6%99%BA%E8%B0%B1-glm-coding-%E7%89%B9%E6%83%A0%E8%AE%A2%E8%B4%AD%E6%8A%A2%E8%B4%AD%E5%8A%A9%E6%89%8B)*
