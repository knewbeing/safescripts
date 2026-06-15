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

**风险等级**：⛔ CRITICAL　　**安全评分**：67/100　　**分析时间**：2026-06-15

> 该脚本通过 GM_xmlhttpRequest 向第三方服务器发起请求，存在数据外传风险。未发现隐私采集、代码混淆、DOM XSS、远程代码执行等高风险行为。供应链风险需关注远程服务器内容安全。总体安全评分为 67，建议仅在可信环境下使用，并关注远程接口安全性。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：http://xbaidu.ntaow.com/newcss/sogoukey.php） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ⚠️ 存在风险 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本通过 GM_xmlhttpRequest 向第三方服务器 xbaidu.ntaow.com 发起 GET 请求，可能泄露用户的页面访问行为。  
> 位置：GM_xmlhttpRequest 调用  
> 建议：仅允许请求可信、必要的第三方接口，避免携带敏感数据。建议明确说明用途并限制请求内容。

**🟠 MEDIUM** — 供应链风险  
> 脚本未采集用户隐私数据，但通过网络请求获取外部内容，需警惕远程内容的安全性。  
> 位置：GM_xmlhttpRequest onload 回调  
> 建议：确保远程服务器返回内容安全且无恶意代码。

**🟡 LOW** — 权限滥用  
> 脚本申请了 GM_xmlhttpRequest 权限，实际代码中有使用，未发现权限滥用。  
> 位置：@grant GM_xmlhttpRequest  
> 建议：仅申请实际需要的权限。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://raw.githubusercontent.com/langren1353/GM_script/75950f3060eab08874180f6ab428465e2b63afb4/temp/SearchBlock.user.js)*
