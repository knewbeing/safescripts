---
title: "WEXI Veck.io CRACKED by Terra"
---

# WEXI Veck.io CRACKED by Terra



<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/WEXI_Veckio_CRACKED_by_Terra.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.2.1**　　发现时间：**2026-04-20**　　来源：[GreasyFork](https://greasyfork.org/scripts/574026-wexi-veck-io-cracked-by-terra) <Badge type="tip" text="GreasyFork" />　　安装量：**198**　　评分：👍0 / 👎0

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

**风险等级**：🟠 MEDIUM　　**安全评分**：69/100　　**分析时间**：2026-07-13

> 该脚本未检测到数据外传、追踪或 WebSocket 行为，也未发现 DOM XSS 或代码混淆。主要安全风险为动态远程代码执行（fetch + new Function），这可能导致任意代码注入和执行。脚本会操作 localStorage 和 IndexedDB，但未发现敏感数据外传。建议移除动态代码执行逻辑，仅加载受信任的本地代码。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ❌ 检测到（写入 localStorage（wx_user_key）） |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**🔴 HIGH** — 远程代码执行  
> 动态加载并执行远程 JavaScript 代码，使用 fetch + new Function 实现远程代码执行。  
> 位置：loadscript(url) 函数  
> 建议：禁止动态执行远程代码，或仅允许加载已知可信、带哈希校验的脚本。

**🔴 HIGH** — 远程代码执行  
> 使用 new Function 执行任意字符串，属于高危动态代码执行。  
> 位置：loadscript(url) 函数  
> 建议：避免使用 new Function，改为静态代码或受信任的模块。

**🟠 MEDIUM** — 敏感 API 调用  
> 脚本会删除 IndexedDB 的 UnityCache 数据库，可能影响用户本地缓存。  
> 位置：indexedDB.deleteDatabase("UnityCache")  
> 建议：仅在必要时清理缓存，并告知用户。

**🟠 MEDIUM** — 隐私采集  
> 脚本会向 localStorage 写入 wx_user_key，但未发现敏感信息读取或外传。  
> 位置：localStorage.setItem('wx_user_key', input)  
> 建议：确保不存储敏感信息，或加密存储。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/574026-wexi-veck-io-cracked-by-terra)*
