---
title: 百度搜狗谷歌搜索结果重定向优化
---

# 百度搜狗谷歌搜索结果重定向优化

`搜索优化`  `去重定向`  `网页加速`  `百度`  `谷歌`  `搜狗`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Lite-AC-Baidu-SoGou-Google-NoRedirect.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**11.0**　　发现时间：**2026-04-15**　　来源：[langren1353/GM_script](https://github.com/langren1353/GM_script)

## 功能介绍

本脚本自动绕过百度、搜狗、谷歌等搜索引擎结果中的跳转链接，直接打开目标网页，提升访问速度和体验。它还修复了部分搜索结果页面的重定向问题，减少页面卡顿。适合经常使用这些搜索引擎的用户。

## 适用网站

- 百度
- 搜狗
- 必应
- 谷歌
- 百度知道

## 使用方法

1. 安装脚本后，访问百度、搜狗、谷歌等支持的网站。
2. 在搜索结果页面点击链接时，脚本自动跳过中间跳转，直接打开目标网页。
3. 无需额外操作，脚本自动生效。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_xmlhttpRequest` | 允许脚本发送跨域网络请求以获取真实链接地址。 |

## 安全分析

**风险等级**：🟡 LOW　　**分析时间**：2026-04-15

> 该脚本主要功能为去除百度、搜狗、谷歌等搜索引擎的重定向，直接访问真实链接。使用了GM_xmlhttpRequest向百度服务器请求真实地址，未发现向第三方服务器发送用户数据的行为。未采集用户隐私信息，未使用远程代码执行手段，权限申请合理，代码无混淆，外部依赖可信。整体风险较低。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：www.baidu.com） |
| 隐私采集 | ✅ 未检测到 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本使用了GM_xmlhttpRequest向www.baidu.com发起GET请求，用于获取重定向的真实地址。请求仅限于@connect声明的www.baidu.com，未发现向第三方服务器发送用户数据的行为。  
> 位置：resetURL函数内的GM_xmlhttpRequest调用  
> 建议：确认请求内容不包含敏感用户数据，且请求目标可信。

**⛔ CRITICAL** — 隐私采集  
> 脚本未读取document.cookie、localStorage、sessionStorage，未监听键盘输入事件，也未访问浏览器指纹相关API。  
> 位置：整体代码  
> 建议：无

**🔴 HIGH** — 远程代码执行  
> 脚本未使用eval、new Function、setTimeout字符串形式执行代码，也未通过@require或动态script标签加载远程JS。  
> 位置：整体代码  
> 建议：无

**🔴 HIGH** — 权限滥用  
> 脚本申请了GM_xmlhttpRequest权限，且代码中确实使用了该权限，未发现未使用的高权限申请。  
> 位置：元数据与代码权限声明  
> 建议：无

**🟠 MEDIUM** — 敏感API调用  
> 脚本未调用navigator.geolocation、RTCPeerConnection、MediaDevices、Clipboard API等敏感API。  
> 位置：整体代码  
> 建议：无

**🟠 MEDIUM** — 代码混淆  
> 代码结构清晰，未发现明显的代码混淆、base64解码执行或字符串拼接执行等混淆特征。  
> 位置：整体代码  
> 建议：无

**🟡 LOW** — 外部依赖  
> 脚本未通过@require加载外部依赖，@icon和@home-url均为可信来源。  
> 位置：元数据  
> 建议：无

---

*由 SafeScripts 自动发现 · [查看原始来源](https://raw.githubusercontent.com/langren1353/GM_script/75950f3060eab08874180f6ab428465e2b63afb4/Lite-AC-Baidu-SoGou-Google-NoRedirect.user.js)*
