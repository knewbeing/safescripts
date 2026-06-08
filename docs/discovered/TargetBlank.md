---
title: "新标签页打开链接"
---

# 新标签页打开链接

`浏览增强`  `新标签页`  `网页链接`  `通用脚本`  `用户体验`  `自动化`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/TargetBlank.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.0.9**　　发现时间：**2026-06-08**　　来源：[XIU2/UserScript](https://github.com/XIU2/UserScript) <Badge type="tip" text="GitHub" />

## 功能介绍

本脚本会自动将网页中的所有链接设置为新标签页打开，避免当前页面被覆盖。适用于大多数网站，提升浏览体验。

## 适用网站

- 所有网站（除谷歌账号登录页面）

## 使用方法

1. 安装脚本后，访问任意网站。
2. 点击网页中的任意链接，都会在新标签页打开。
3. 无需额外设置，自动生效。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `none` | 脚本不需要额外权限，仅在网页内操作链接。 |

## 安全分析

**风险等级**：🟢 SAFE　　**安全评分**：100/100　　**分析时间**：2026-06-08

> 该脚本仅修改页面中所有链接的 target 属性为 '_blank'，以便在新标签页中打开链接。未检测到任何数据外传、隐私采集、远程代码执行、代码混淆、DOM XSS、权限滥用、敏感 API 调用、供应链风险或 iframe 风险。脚本结构清晰，未申请任何 @grant 权限，安全性高。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 未发现安全问题 ✅

---

*由 SafeScripts 自动发现 · [查看原始来源](https://raw.githubusercontent.com/XIU2/UserScript/d8fcb017ba7108be3b9813667e63b7f28cbf6424/TargetBlank.user.js)*
