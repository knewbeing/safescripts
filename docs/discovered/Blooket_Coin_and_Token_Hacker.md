---
title: "Blooket Coin and Token Hacker"
---

# Blooket Coin and Token Hacker



<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Blooket_Coin_and_Token_Hacker.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.0**　　发现时间：**2026-04-16**　　来源：[GreasyFork](https://greasyfork.org/scripts/516991-blooket-coin-and-token-hacker) <Badge type="tip" text="GreasyFork" />　　安装量：**10,504**　　评分：👍1 / 👎0

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

**风险等级**：🟢 SAFE　　**安全评分**：97/100　　**分析时间**：2026-05-11

> 该 UserScript 仅在本地操作页面内容，不进行任何数据外传、隐私采集、远程代码执行或供应链依赖。未检测到高危或关键安全风险。主要操作为通过 prompt 获取用户输入并更新页面文本内容，未涉及敏感 API、网络请求或代码混淆。整体安全性高。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**🟡 LOW** — DOM XSS  
> 脚本通过 prompt 获取用户输入，但未将用户输入直接插入 innerHTML/outerHTML，仅用于文本内容和 alert，无 XSS 风险。  
> 位置：addCoinsAndTokens()  
> 建议：如需插入 HTML，需进行转义。当前实现安全。

**🟡 LOW** — Data Transmission  
> 脚本未使用任何网络请求或外部通信 API，无数据外传行为。  
> 位置：全局  
> 建议：保持此状态，勿添加外部通信代码。

**🟡 LOW** — Permission Usage  
> 脚本未申请任何 @grant 权限，实际代码也未使用 GM_* API，权限申请合理。  
> 位置：元数据  
> 建议：保持最小权限原则。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/516991-blooket-coin-and-token-hacker)*
