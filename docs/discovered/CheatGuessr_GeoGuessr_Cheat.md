---
title: "CheatGuessr | GeoGuessr Cheat"
---

# CheatGuessr | GeoGuessr Cheat



<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/CheatGuessr_GeoGuessr_Cheat.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.2**　　发现时间：**2026-05-04**　　来源：[GreasyFork](https://greasyfork.org/scripts/525302-cheatguessr-geoguessr-cheat) <Badge type="tip" text="GreasyFork" />　　安装量：**9,421**　　评分：👍4 / 👎4

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

**风险等级**：⛔ CRITICAL　　**安全评分**：25/100　　**分析时间**：2026-05-25

> 该脚本存在数据外传（地理坐标发送到第三方 API）、隐私采集（拦截游戏数据、存储设置）、权限滥用（申请未用 GM_webRequest），安全风险较高。建议移除未用权限、明确用户数据用途、避免敏感信息外传。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：https://nominatim.openstreetmap.org/reverse） |
| 隐私采集 | ❌ 检测到（拦截 XMLHttpRequest 获取地理坐标, 读取/写入 localStorage 保存设置） |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本通过 fetch 向 https://nominatim.openstreetmap.org/reverse 发送地理坐标数据，可能涉及用户隐私（游戏位置数据）。  
> 位置：fetchLocationDetails() 函数  
> 建议：明确告知用户数据用途，避免发送敏感信息到第三方，或允许用户自定义 API。

**⛔ CRITICAL** — 隐私采集  
> 脚本拦截 XMLHttpRequest，解析响应内容中的地理坐标信息，属于隐私采集行为（但未外传）。  
> 位置：XMLHttpRequest.prototype.open 重写  
> 建议：仅在本地处理数据，避免采集敏感信息或外传。

**⛔ CRITICAL** — 隐私采集  
> 脚本读取和写入 localStorage 用于保存设置，属于隐私采集（但未外传）。  
> 位置：loadSettings()/saveSettings()  
> 建议：确保仅存储非敏感数据，避免存储用户身份信息。

**🔴 HIGH** — 远程代码执行  
> 脚本未使用 eval/new Function/setTimeout(string) 等远程代码执行方式，未检测到高风险代码执行。  
> 位置：全局代码审查  
> 建议：保持当前安全实践，避免动态执行外部代码。

**🔴 HIGH** — 代码混淆  
> 脚本未检测到代码混淆、base64 解码、字符串映射等混淆特征。  
> 位置：全局代码审查  
> 建议：保持代码可读性，避免混淆。

**🔴 HIGH** — DOM XSS / 注入  
> 脚本未检测到 DOM XSS 或注入风险，未将用户输入直接插入 innerHTML。  
> 位置：toggleSettingsModal()  
> 建议：如需插入用户输入，务必进行转义。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 GM_webRequest 权限，但实际代码未使用该 API，属于权限滥用。  
> 位置：元数据 @grant  
> 建议：移除未使用的高权限申请，减少攻击面。

**🟠 MEDIUM** — 敏感 API 调用  
> 脚本未调用敏感 API（如 geolocation、RTCPeerConnection、MediaDevices、Clipboard、Notification）。  
> 位置：全局代码审查  
> 建议：保持当前安全实践。

**🟠 MEDIUM** — 供应链风险  
> 脚本未通过 @require 加载第三方库，无供应链风险。  
> 位置：元数据 @require  
> 建议：如需加载第三方库，建议固定版本哈希并使用官方 CDN。

**🟡 LOW** — ClickJacking / iframe 风险  
> 脚本未修改 frame 保护策略，也未创建隐藏 iframe 用于数据提取。  
> 位置：mapsFromCoords()  
> 建议：如需使用 iframe，避免用于隐私数据提取。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/525302-cheatguessr-geoguessr-cheat)*
