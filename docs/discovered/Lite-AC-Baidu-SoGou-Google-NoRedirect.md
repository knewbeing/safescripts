---
title: 百度搜狗谷歌搜索结果重定向优化
---

# 百度搜狗谷歌搜索结果重定向优化

`搜索优化`  `去重定向`  `网页加速`  `浏览器脚本`  `广告屏蔽`  `搜索引擎`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Lite-AC-Baidu-SoGou-Google-NoRedirect.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**11.0**　　发现时间：**2026-04-15**　　来源：[langren1353/GM_script](https://github.com/langren1353/GM_script)

## 功能介绍

本脚本自动绕过百度、搜狗、谷歌等搜索引擎结果中的跳转链接，直接访问目标网页，提升浏览速度和体验。它还修复了部分搜索结果页面的重定向问题，减少页面卡顿。适合经常使用这些搜索引擎的用户。

## 适用网站

- 百度搜索
- 搜狗搜索
- 必应搜索
- 谷歌搜索
- 百度知道

## 使用方法

1. 安装脚本后，访问百度、搜狗、谷歌等支持的网站。
2. 搜索结果中的链接将自动跳过中间重定向，直接打开目标网页。
3. 无需额外操作，脚本自动生效。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_xmlhttpRequest` | 允许脚本发送跨域网络请求以获取真实链接地址。 |

## 安全分析

**风险等级**：🟡 LOW　　**分析时间**：2026-04-15

> 该脚本主要功能为去除百度、搜狗、谷歌等搜索引擎的重定向，直接访问真实链接。脚本通过GM_xmlhttpRequest向百度域名发起请求获取真实地址，未发现向第三方服务器发送数据或采集用户隐私的行为。代码未使用远程代码执行手段，权限申请合理，未调用敏感API，代码无混淆且无外部依赖。整体风险较低，属于安全的用户脚本。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：www.baidu.com） |
| 隐私采集 | ✅ 未检测到 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本使用了GM_xmlhttpRequest向www.baidu.com发起GET请求，用于获取重定向的真实地址。请求仅限于百度域名，未发现向第三方服务器发送用户数据的行为。  
> 位置：resetURL函数中GM_xmlhttpRequest调用  
> 建议：确认请求的URL仅限于百度及搜狗等信任域名，避免泄露用户隐私。

**⛔ CRITICAL** — 隐私采集  
> 脚本未读取document.cookie、localStorage、sessionStorage，未监听键盘输入事件，也未访问浏览器指纹相关API。  
> 位置：整体代码分析  
> 建议：无隐私采集行为，保持现状。

**🔴 HIGH** — 远程代码执行  
> 脚本未使用eval、new Function、setTimeout字符串形式执行代码，也未通过@require或动态script标签加载远程JS。  
> 位置：整体代码分析  
> 建议：无远程代码执行风险。

**🔴 HIGH** — 权限滥用  
> 脚本申请了GM_xmlhttpRequest权限，且代码中确实使用了该权限，权限申请与使用匹配。  
> 位置：@grant与代码使用对比  
> 建议：权限申请合理，无滥用。

**🟠 MEDIUM** — 敏感API调用  
> 脚本未调用navigator.geolocation、RTCPeerConnection、MediaDevices、Clipboard API等敏感API。  
> 位置：整体代码分析  
> 建议：无敏感API调用风险。

**🟠 MEDIUM** — 代码混淆  
> 代码未发现明显混淆特征，未使用base64解码执行或复杂字符串拼接执行。  
> 位置：整体代码分析  
> 建议：代码清晰，易于审计。

**🟡 LOW** — 外部依赖  
> 脚本未通过@require加载任何外部依赖库，所有代码均为内嵌实现。  
> 位置：元数据@require字段  
> 建议：无外部依赖风险。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://raw.githubusercontent.com/langren1353/GM_script/75950f3060eab08874180f6ab428465e2b63afb4/Lite-AC-Baidu-SoGou-Google-NoRedirect.user.js)*
