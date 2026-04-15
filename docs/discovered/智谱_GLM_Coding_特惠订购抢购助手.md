---
title: 智谱 GLM Coding 特惠订购抢购助手
---

# 智谱 GLM Coding 特惠订购抢购助手

`抢购助手`  `按钮解禁`  `库存修改`  `前端优化`  `智谱 GLM Coding`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/智谱_GLM_Coding_特惠订购抢购助手.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**6.3.8**　　发现时间：**2026-04-15**　　来源：[GreasyFork](https://greasyfork.org/scripts/571507-%E6%99%BA%E8%B0%B1-glm-coding-%E7%89%B9%E6%83%A0%E8%AE%A2%E8%B4%AD%E6%8A%A2%E8%B4%AD%E5%8A%A9%E6%89%8B) <Badge type="tip" text="GreasyFork" />　　安装量：**1,271**　　评分：👍1 / 👎0

## 功能介绍

本脚本用于解除智谱 GLM Coding 订购页面中购买按钮的禁用状态，使按钮看起来可点击。它通过修改页面前端数据，将售罄状态改为有货，提升抢购体验，但不改变后台实际库存。

## 适用网站

- 智谱官网
- 智谱 GLM Coding 订购页面

## 使用方法

1. 安装脚本后，打开智谱 GLM Coding 订购页面。
2. 页面加载时，脚本自动解除购买按钮禁用状态。
3. 此时按钮显示为可点击，提升抢购成功率。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| — | 无特殊权限 |

## 安全分析

**风险等级**：🟢 SAFE　　**分析时间**：2026-04-15

> 该脚本主要通过重写 JSON.parse、fetch 和 XMLHttpRequest 来篡改页面返回的售罄状态数据，使按钮显示为可点击状态。未发现任何数据外传、隐私采集、远程代码执行或权限滥用行为，代码清晰无混淆，且无外部依赖。整体风险等级为安全。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本中重写了 JSON.parse、fetch 和 XMLHttpRequest 的行为，拦截并修改了响应数据，但没有发起任何新的网络请求，也未将数据发送到第三方服务器。  
> 位置：全脚本  
> 建议：确认无数据外传行为，保持当前实现。

**⛔ CRITICAL** — 隐私采集  
> 脚本未读取 document.cookie、localStorage、sessionStorage，未监听键盘事件，也未访问表单字段或浏览器指纹相关 API。  
> 位置：全脚本  
> 建议：无隐私采集行为，符合安全要求。

**🔴 HIGH** — 远程代码执行  
> 脚本未使用 eval、new Function、setTimeout(string) 等远程代码执行方式，也未通过 @require 或动态 script 标签加载远程 JS。  
> 位置：全脚本  
> 建议：保持无远程代码执行风险。

**🔴 HIGH** — 权限滥用  
> 脚本声明 @grant none，且代码中未使用任何 GM_* 权限接口，权限申请与实际使用一致。  
> 位置：元数据与代码  
> 建议：无权限滥用。

**🟠 MEDIUM** — 敏感 API 调用  
> 脚本未调用 navigator.geolocation、RTCPeerConnection、MediaDevices、Clipboard API 等敏感 API。  
> 位置：全脚本  
> 建议：无敏感 API 调用风险。

**🟠 MEDIUM** — 代码混淆  
> 脚本代码清晰，无混淆、无 base64 解码执行或字符串拼接执行。  
> 位置：全脚本  
> 建议：代码可读性良好，无混淆风险。

**🟡 LOW** — 外部依赖  
> 脚本未通过 @require 加载任何外部依赖库。  
> 位置：元数据  
> 建议：无外部依赖风险。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/571507-%E6%99%BA%E8%B0%B1-glm-coding-%E7%89%B9%E6%83%A0%E8%AE%A2%E8%B4%AD%E6%8A%A2%E8%B4%AD%E5%8A%A9%E6%89%8B)*
