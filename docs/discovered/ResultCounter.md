---
title: 搜索结果自动加序号
---

# 搜索结果自动加序号

`搜索结果增强`  `序号标记`  `多搜索引擎支持`  `浏览器辅助`  `用户体验提升`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/ResultCounter.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**2017.7.21**　　发现时间：**2026-04-15**　　来源：[langren1353/GM_script](https://github.com/langren1353/GM_script)

## 功能介绍

本脚本会在百度、谷歌、必应等多个搜索引擎及相关网站的搜索结果前自动添加序号，方便用户快速识别和定位搜索条目。安装后无需额外操作，打开搜索结果页面即可看到序号显示。支持多种主流搜索平台，提升浏览搜索结果的效率。

## 适用网站

- 百度搜索
- 百度新闻
- 百度知道
- 百度文库
- 百度视频
- 百度贴吧搜索
- 百度图片
- 谷歌搜索
- 必应搜索
- 搜狗搜索
- 360搜索
- 有道搜索
- 卡饭论坛

## 使用方法

1. 安装脚本后，打开支持的搜索引擎或相关网站。
2. 在搜索结果页面，自动为每条搜索结果添加序号，无需手动操作。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| — | 无特殊权限 |

## 安全分析

**风险等级**：🟢 SAFE　　**分析时间**：2026-04-15

> 该脚本仅在指定搜索引擎页面为搜索结果添加序号，通过 DOM 操作实现，无任何网络请求或用户数据读取行为。未发现远程代码执行、权限滥用、隐私采集或敏感 API 调用等安全风险，整体安全性良好。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本未检测到任何网络请求相关代码，未使用 GM_xmlhttpRequest、fetch、XMLHttpRequest 或 navigator.sendBeacon 等接口。  
> 位置：全脚本  
> 建议：无需修改，确认无数据外传行为。

**⛔ CRITICAL** — 隐私采集  
> 脚本未读取 document.cookie、localStorage、sessionStorage，也未监听键盘输入事件，未访问表单字段值或浏览器指纹相关 API。  
> 位置：全脚本  
> 建议：无需修改，确认无隐私采集行为。

**🔴 HIGH** — 远程代码执行  
> 脚本未使用 eval、new Function、setTimeout(string)、innerHTML 执行远程内容，也未通过 @require 或动态 script 标签加载远程 JS。  
> 位置：全脚本  
> 建议：无远程代码执行风险。

**🔴 HIGH** — 权限滥用  
> 脚本未声明 @grant 权限，且代码中未使用任何 GM_* API，权限申请与使用匹配，无权限滥用。  
> 位置：元数据与代码  
> 建议：无权限滥用风险。

**🟠 MEDIUM** — 敏感 API 调用  
> 脚本未调用 navigator.geolocation、RTCPeerConnection、MediaDevices、Clipboard API 等敏感 API。  
> 位置：全脚本  
> 建议：无敏感 API 调用风险。

**🟠 MEDIUM** — 代码混淆  
> 脚本代码结构清晰，无明显混淆、base64 解码或字符串拼接执行特征。  
> 位置：全脚本  
> 建议：无混淆风险。

**🟡 LOW** — 外部依赖  
> 脚本未使用 @require 加载任何外部依赖。  
> 位置：元数据  
> 建议：无外部依赖风险。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://raw.githubusercontent.com/langren1353/GM_script/75950f3060eab08874180f6ab428465e2b63afb4/ResultCounter.user.js)*
