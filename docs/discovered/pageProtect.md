---
title: "页面保护模式（双重验证+持久锁定）"
---

# 页面保护模式（双重验证+持久锁定）

`安全`  `隐私保护`  `页面锁定`  `双重验证`  `防偷窥`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/pageProtect.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**7.0**　　发现时间：**2026-06-08**　　来源：[limbopro/Adblock4limbo](https://github.com/limbopro/Adblock4limbo) <Badge type="tip" text="GitHub" />

## 功能介绍

本脚本为网页添加保护模式，访问页面时需通过双重验证才能解锁内容。锁定状态下页面内容会被隐藏，只有输入正确密码后才能查看。支持持久锁定，防止他人未经授权访问。

## 适用网站

- 所有网站

## 使用方法

1. 安装脚本后，首次访问页面会提示设置密码。
2. 页面锁定时，需输入密码进行验证才能解锁。
3. 如需重新锁定页面，可在脚本设置中操作。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `none` | 脚本不需要额外权限，仅操作本地存储和页面样式。 |

## 安全分析

**风险等级**：🟠 MEDIUM　　**安全评分**：84/100　　**分析时间**：2026-07-27

> 该脚本未检测到任何数据外传、远程代码执行、代码混淆、DOM XSS、权限滥用、敏感 API 调用、供应链风险或 iframe 风险。唯一的安全隐患是将用户输入的密码明文存储在 localStorage，存在一定隐私风险，但未外传。整体安全性较高，建议对密码进行哈希处理以提升隐私保护。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ❌ 检测到（存储用户输入的密码到 localStorage（明文）, 读取用户输入的密码进行验证） |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**🟠 MEDIUM** — 隐私采集  
> 脚本会将用户设置的密码（以及锁定状态）存储在 localStorage 中，未加密。虽然未外传，但本地存储明文密码存在一定隐私风险。  
> 位置：localStorage.setItem(KEY_PWD, val1)  
> 建议：建议对密码进行哈希处理（如 SHA-256），避免明文存储。

**🟠 MEDIUM** — 隐私采集  
> 脚本会读取和写入 localStorage，涉及用户输入的密码和锁定状态。  
> 位置：localStorage.getItem(KEY_PWD), localStorage.setItem(KEY_PWD, val1)  
> 建议：如无必要，避免存储敏感信息；如需存储，建议加密或哈希。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://raw.githubusercontent.com/limbopro/Adblock4limbo/44674b73b0134dfaa8322984bca4a8b966428bf6/Adguard/pageProtect.user.js)*
