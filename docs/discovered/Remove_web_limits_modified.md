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

**风险等级**：🟡 LOW　　**安全评分**：89/100　　**分析时间**：2026-06-08

> 该脚本主要用于解除网页的复制、剪切、选择文本、右键菜单等限制。未检测到数据外传、隐私采集、远程代码执行、代码混淆、DOM XSS、供应链风险等高危行为。存在申请未使用的高权限（GM_xmlhttpRequest、GM_setClipboard），建议移除。整体风险较低。

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
> 脚本申请了 GM_xmlhttpRequest 权限，但实际代码未使用。  
> 位置：元数据与全局  
> 建议：移除未使用的高权限申请，减少攻击面。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 GM_setClipboard 权限，但实际代码未使用。  
> 位置：元数据与全局  
> 建议：移除未使用的高权限申请，减少攻击面。

**🟡 LOW** — 潜在数据外传风险  
> 脚本声明了 @connect eemm.me 但实际代码未发现任何 GM_xmlhttpRequest、fetch、WebSocket、EventSource、sendBeacon 等网络请求代码。  
> 位置：元数据与全局  
> 建议：如未来添加网络请求，需严格限制目标和数据内容。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/28497-%E7%BD%91%E9%A1%B5%E9%99%90%E5%88%B6%E8%A7%A3%E9%99%A4-%E6%94%B9)*
