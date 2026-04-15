---
title: 智谱 GLM Coding 特惠订购抢购助手
---

# 智谱 GLM Coding 特惠订购抢购助手

`抢购助手`  `按钮解禁`  `库存绕过`  `前端修改`  `智谱 GLM Coding`  `购物辅助`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/智谱_GLM_Coding_特惠订购抢购助手.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**6.3.8**　　发现时间：**2026-04-15**　　来源：[GreasyFork](https://greasyfork.org/scripts/571507-%E6%99%BA%E8%B0%B1-glm-coding-%E7%89%B9%E6%83%A0%E8%AE%A2%E8%B4%AD%E6%8A%A2%E8%B4%AD%E5%8A%A9%E6%89%8B) <Badge type="tip" text="GreasyFork" />　　安装量：**1,271**　　评分：👍1 / 👎0

## 功能介绍

本脚本用于解除智谱 GLM Coding 订购页面中购买按钮的禁用状态，使按钮看起来可点击。它通过修改页面前端数据，绕过售罄限制，提升抢购体验，但不改变后台实际库存和逻辑。适合想尝试抢购但按钮被禁用的用户使用。

## 适用网站

- 智谱官网
- 智谱 GLM Coding 订购页面

## 使用方法

1. 安装脚本后，打开智谱官网或 GLM Coding 订购页面。
2. 页面加载时，脚本自动解除购买按钮禁用状态。
3. 此时按钮显示为可点击，用户可尝试下单。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| — | 无特殊权限 |

## 安全分析

**风险等级**：🟢 SAFE　　**分析时间**：2026-04-15

> 该脚本主要通过劫持 JSON.parse、fetch 和 XMLHttpRequest 来篡改页面中售罄状态相关数据，使按钮显示为可点击状态。未发现任何数据外传、隐私采集、远程代码执行或权限滥用行为，代码清晰且无混淆，未加载外部依赖。整体风险等级为安全。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本中拦截并修改了 Fetch 和 XMLHttpRequest 的响应数据，但未发起任何外部网络请求，也未将数据发送到第三方服务器。  
> 位置：代码中 window.fetch 和 XMLHttpRequest 重写部分  
> 建议：确认无外部数据发送，保持当前实现。

**⛔ CRITICAL** — 隐私采集  
> 脚本未读取 document.cookie、localStorage、sessionStorage，也未监听键盘事件或读取表单字段，未访问浏览器指纹相关 API。  
> 位置：整体代码  
> 建议：无隐私采集行为，符合安全要求。

**🔴 HIGH** — 远程代码执行  
> 脚本未使用 eval、new Function、setTimeout(string) 等远程代码执行方式，也未通过 @require 或动态 script 标签加载远程 JS。  
> 位置：整体代码  
> 建议：无远程代码执行风险。

**🔴 HIGH** — 权限滥用  
> 脚本未申请任何权限（@grant none），且代码中未使用任何需要权限的 API，权限申请与使用匹配。  
> 位置：元数据与代码  
> 建议：无权限滥用风险。

**🟠 MEDIUM** — 敏感 API 调用  
> 脚本未调用敏感 API，如 navigator.geolocation、RTCPeerConnection、MediaDevices、Clipboard API 等。  
> 位置：整体代码  
> 建议：无敏感 API 调用风险。

**🟠 MEDIUM** — 代码混淆  
> 代码结构清晰，无明显混淆、base64 解码或字符串拼接执行特征。  
> 位置：整体代码  
> 建议：代码可读性良好，无混淆风险。

**🟡 LOW** — 外部依赖  
> 脚本未使用 @require 加载任何外部依赖。  
> 位置：元数据  
> 建议：无外部依赖风险。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/571507-%E6%99%BA%E8%B0%B1-glm-coding-%E7%89%B9%E6%83%A0%E8%AE%A2%E8%B4%AD%E6%8A%A2%E8%B4%AD%E5%8A%A9%E6%89%8B)*
