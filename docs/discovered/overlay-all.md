---
title: "CAMP-XT: All-in-One Installer"
---

# CAMP-XT: All-in-One Installer



<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/overlay-all.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.0.11**　　发现时间：**2026-04-16**　　来源：[camp-plus/camp-xt](https://github.com/camp-plus/camp-xt) <Badge type="tip" text="GitHub" />

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

**风险等级**：🟡 LOW　　**安全评分**：89/100　　**分析时间**：2026-07-13

> 该脚本未检测到数据外传、隐私采集、远程代码执行、代码混淆或 DOM XSS 风险。主要风险为 @require 加载的第三方库未锁定版本，存在一定供应链风险。整体安全性较高，建议关注依赖库的版本锁定。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ⚠️ 存在风险 |

### 发现的问题

**🟠 MEDIUM** — Supply Chain Risk  
> @require 加载的 camp-utils.js 和 camp-overlay.js 来自 jsdelivr CDN，指向 GitHub main 分支，未锁定具体 commit 或版本哈希，存在供应链污染风险。  
> 位置：@require 元数据  
> 建议：建议将 @require 链接固定为特定 commit 哈希，避免 main 分支变更导致供应链攻击。

**🟡 LOW** — Content Injection  
> 脚本通过 document.execCommand('insertText', ...) 向 Gmail 邮件正文插入模板文本，涉及对页面内容的写入，但未发现对用户输入的读取或外传。  
> 位置：camp-insert-template handler  
> 建议：确认插入内容安全，避免插入不可信内容。

**🟡 LOW** — Permissions  
> 脚本未使用任何 @grant 权限，实际代码也未调用 GM_* API，权限申请合理。  
> 位置：@grant 元数据  
> 建议：无。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://raw.githubusercontent.com/camp-plus/camp-xt/d73930202a0c451c7c733658d6697f55635c05e9/scripts/overlay-all.user.js)*
