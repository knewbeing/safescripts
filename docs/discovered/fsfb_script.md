---
title: "Agma.io增强脚本"
---

# Agma.io增强脚本

`游戏辅助`  `网页游戏`  `自动化`  `快捷操作`  `增强功能`  `Agma.io`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/fsfb_script.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.6.5**　　发现时间：**2026-06-29**　　来源：[GreasyFork](https://greasyfork.org/scripts/446564-fsfb-script) <Badge type="tip" text="GreasyFork" />　　安装量：**59,969**　　评分：👍5 / 👎1

## 功能介绍

该脚本为 Agma.io 游戏提供增强功能，包括快速分裂、秘密机器人包、线分锁定等多种实用特性，帮助玩家更高效地操作和体验游戏。安装后可通过菜单和快捷键使用这些功能。

## 适用网站

- Agma.io

## 使用方法

1. 安装脚本后，进入 Agma.io 网站。
2. 根据提示或菜单，选择需要的增强功能。
3. 可使用快捷键或菜单命令快速切换和操作。
4. 如需个性化设置，可在菜单中调整相关选项。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `unsafeWindow` | 允许脚本访问和修改网页的全局变量，增强与游戏的交互能力。 |
| `GM_setValue` | 用于保存用户的设置或偏好，保证功能个性化。 |
| `GM_getValue` | 用于读取用户保存的设置，实现持久化配置。 |
| `GM_xmlhttpRequest` | 允许脚本发送网络请求，如获取数据或更新信息。 |
| `GM_registerMenuCommand` | 在浏览器菜单中添加自定义命令，方便用户操作脚本功能。 |
| `GM_unregisterMenuCommand` | 允许移除自定义菜单命令，保持菜单整洁。 |

## 安全分析

**风险等级**：🟠 MEDIUM　　**安全评分**：49/100　　**分析时间**：2026-07-27

> 脚本存在数据外传（CRITICAL），远程代码执行（HIGH）、权限滥用和供应链风险（MEDIUM）。未发现隐私采集、代码混淆、DOM XSS、敏感 API 调用、ClickJacking/iframe 风险。建议限制外部请求、审查 unsafeWindow 使用、固定第三方依赖版本。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：translate.google.com, greasyfork.org） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ⚠️ 存在风险 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本通过 GM_xmlhttpRequest 允许向 translate.google.com 和 greasyfork.org 发起网络请求。未发现携带敏感用户数据，但存在外部通信。  
> 位置：元数据 @connect 和 GM_xmlhttpRequest 权限  
> 建议：确保所有请求内容不包含敏感信息，限制请求目的地。

**🔴 HIGH** — 远程代码执行  
> 脚本申请了 unsafeWindow 权限，允许访问页面全局对象，存在潜在远程代码执行风险。  
> 位置：元数据 @grant unsafeWindow  
> 建议：仅在必要时使用 unsafeWindow，避免滥用。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 GM_xmlhttpRequest 权限，但实际代码未发现主动向非官方或未知第三方域名发送数据。  
> 位置：元数据 @grant GM_xmlhttpRequest  
> 建议：限制 GM_xmlhttpRequest 的使用范围，避免敏感数据泄露。

**🟠 MEDIUM** — 供应链风险  
> 脚本通过 @require 加载 greasyfork.org 上的 fsfb facts.js，来源可信，但未固定版本哈希，存在供应链风险。  
> 位置：元数据 @require  
> 建议：建议使用固定版本哈希或官方 CDN，避免供应链污染。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/446564-fsfb-script)*
