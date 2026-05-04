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

**风险等级**：🟡 LOW　　**安全评分**：81/100　　**分析时间**：2026-05-04

> 该脚本主要用于页面优化和广告屏蔽，未检测到数据外传、隐私采集、远程代码执行、代码混淆或 DOM XSS 风险。所有网络请求仅限 CSDN 官方域名，且未见实际数据上报代码。第三方依赖均为固定版本，供应链风险较低。部分高权限申请未实际使用，建议精简。整体安全风险较低，适合公开使用。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**🟠 MEDIUM** — 供应链风险  
> @require 加载了多个第三方库，部分为作者自建仓库（CoverUMD），其余为 npm 包通过 jsdelivr CDN加载，均为固定版本哈希。  
> 位置：元数据 @require  
> 建议：建议定期审查 CoverUMD 仓库代码，确保无供应链污染。npm 包建议只用官方源。

**🟠 MEDIUM** — 权限滥用  
> 申请了 GM_xmlhttpRequest 权限，但主代码未见实际调用，且 @connect 仅限 csdn 官方域名。  
> 位置：元数据 @grant/@connect  
> 建议：如无实际使用 GM_xmlhttpRequest，建议移除该权限。

**🟠 MEDIUM** — 权限滥用  
> 申请了 unsafeWindow 权限，但主代码仅做 window 兼容处理，未见敏感操作。  
> 位置：元数据 @grant  
> 建议：如无必要，建议移除 unsafeWindow 权限。

---

*文档由 SafeScripts 自动生成 · [查看原始脚本](https://update.greasyfork.org/scripts/406136/CSDN%E4%BC%98%E5%8C%96.user.js)*
