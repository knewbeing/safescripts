---
title: "AC-有道取词+翻译-库文件"
---

# AC-有道取词+翻译-库文件

`翻译`  `取词`  `辅助脚本`  `有道`  `API支持`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/SearchBlock.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.8**　　发现时间：**2026-06-15**　　来源：[langren1353/GM_script](https://github.com/langren1353/GM_script) <Badge type="tip" text="GitHub" />

## 功能介绍

本脚本是有道取词和翻译功能的库文件，不能直接使用。它用于获取和更新搜狗API的密钥，为其他取词和翻译脚本提供支持。

## 适用网站

- 所有网站

## 使用方法

1. 安装后无需操作，此脚本作为其他取词翻译脚本的依赖库。
2. 请搭配主脚本使用，单独安装无效。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_xmlhttpRequest` | 允许脚本发送网络请求，获取搜狗API密钥。 |

## 安全分析

**风险等级**：⛔ CRITICAL　　**安全评分**：75/100　　**分析时间**：2026-06-22

> 该脚本作为库文件，核心行为是通过 GM_xmlhttpRequest 请求第三方服务器 xbaidu.ntaow.com 获取 key 并赋值给变量。未发现隐私采集、远程代码执行、代码混淆、DOM XSS 等高危行为。主要风险在于数据外传，因其请求第三方服务器，存在潜在的数据泄露风险。建议仅在可信环境下使用，并确保第三方服务器安全可信。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：xbaidu.ntaow.com） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本通过 GM_xmlhttpRequest 发送 GET 请求到第三方服务器 xbaidu.ntaow.com，获取内容并赋值给变量 SoGouKey。  
> 位置：GM_xmlhttpRequest 调用  
> 建议：仅在可信环境下使用，避免传递敏感用户数据。建议明确说明用途并限制为必要的 API 域名。

**🟡 LOW** — 权限滥用  
> @grant 仅申请了 GM_xmlhttpRequest，未发现权限滥用。  
> 位置：元数据 @grant  
> 建议：无实际问题。

**🟡 LOW** — 权限滥用  
> @connect 仅允许 xbaidu.ntaow.com，未发现多余高权限。  
> 位置：元数据 @connect  
> 建议：无实际问题。

**🟡 LOW** — 代码安全  
> 未发现代码混淆、eval、远程代码执行、DOM XSS、隐私采集、供应链风险等其他高危行为。  
> 位置：全局  
> 建议：保持代码简洁透明，避免后续引入高危操作。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://raw.githubusercontent.com/langren1353/GM_script/75950f3060eab08874180f6ab428465e2b63afb4/temp/SearchBlock.user.js)*
