---
title: "CSDN优化"
---

# CSDN优化



<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/managed/CSDN_E4_BC_98_E5_8C_96.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**2026.5.2**　　最后更新：**2026-05-04**

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

**风险等级**：🟡 LOW　　**安全评分**：84/100　　**分析时间**：2026-05-11

> 该脚本主要用于优化 CSDN 站点体验，未检测到数据外传、隐私采集、远程代码执行、代码混淆或 DOM XSS 风险。所有网络权限仅限 CSDN 官方域名，依赖库均锁定版本。存在部分未使用的高权限申请（如 GM_xmlhttpRequest），建议最小化权限。整体风险较低，建议定期复查依赖库安全性。

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
> @grant 申请了 GM_xmlhttpRequest 权限，但主代码未见实际外传或第三方数据请求实现，且 @connect 仅限 csdn 官方域名。  
> 位置：元数据与主代码  
> 建议：如无实际用途建议移除高权限 @grant，或确保仅用于必要的 CSDN 官方接口。

**🟠 MEDIUM** — 供应链风险  
> 脚本通过 @require 加载了多个第三方库，均来自 jsdelivr CDN，并且部分为作者自有仓库（如 CoverUMD），但均已锁定具体版本或 commit 哈希。  
> 位置：@require  
> 建议：继续保持版本锁定，定期检查依赖库安全性。

---

*文档由 SafeScripts 自动生成 · [查看原始脚本](https://update.greasyfork.org/scripts/406136/CSDN%E4%BC%98%E5%8C%96.user.js)*
