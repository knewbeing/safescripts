---
title: "网页限制解除(改)"
---

# 网页限制解除(改)



<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Remove_web_limits_modified.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**4.4.8**　　发现时间：**2026-04-16**　　来源：[GreasyFork](https://greasyfork.org/scripts/28497-%E7%BD%91%E9%A1%B5%E9%99%90%E5%88%B6%E8%A7%A3%E9%99%A4-%E6%94%B9) <Badge type="tip" text="GreasyFork" />　　安装量：**2,227,060**　　评分：👍3997 / 👎0

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

**风险等级**：🟡 LOW　　**安全评分**：84/100　　**分析时间**：2026-06-22

> 该脚本主要用于解除网页上的复制、剪切、选择文本、右键菜单等限制。未检测到数据外传、隐私采集、远程代码执行、代码混淆、DOM XSS、供应链风险等高危行为。存在申请未使用的高权限（@connect、GM_xmlhttpRequest），建议精简权限以提升安全性。整体风险较低。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 @connect eemm.me 权限，但代码中未发现实际的数据外传或 GM_xmlhttpRequest/fetch/其他网络请求到该域名的实现。  
> 位置：元数据 @connect  
> 建议：如无实际用途，建议移除 @connect 权限，减少潜在攻击面。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 GM_xmlhttpRequest 权限，但代码中未发现实际使用。  
> 位置：元数据 @grant  
> 建议：如无实际用途，建议移除 GM_xmlhttpRequest 权限。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/28497-%E7%BD%91%E9%A1%B5%E9%99%90%E5%88%B6%E8%A7%A3%E9%99%A4-%E6%94%B9)*
