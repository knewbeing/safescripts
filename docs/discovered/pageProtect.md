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

**风险等级**：🟡 LOW　　**安全评分**：97/100　　**分析时间**：2026-07-13

> 该脚本实现了本地页面锁定和双重验证功能，所有敏感数据（如密码）均存储于 localStorage，未发现任何外部数据传输、远程代码执行、代码混淆或 DOM XSS 风险。仅涉及本地密码输入和状态管理，未申请任何 GM_* 权限。整体安全性高，隐私风险极低。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ❌ 检测到（Reads and writes password and lock status to localStorage (keys: privateProtect, nsfw_status, is_locked), Reads input values from password fields for local authentication） |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 未发现安全问题 ✅

---

*由 SafeScripts 自动发现 · [查看原始来源](https://raw.githubusercontent.com/limbopro/Adblock4limbo/44674b73b0134dfaa8322984bca4a8b966428bf6/Adguard/pageProtect.user.js)*
