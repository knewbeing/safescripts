---
title: "蛋壳射击自动瞄准+透视"
---

# 蛋壳射击自动瞄准+透视

`游戏辅助`  `自动瞄准`  `透视`  `射击游戏`  `Shell Shockers`  `增强体验`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Shell_Shockers_Aimbot_ESP.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**2.0**　　发现时间：**2026-05-25**　　来源：[GreasyFork](https://greasyfork.org/scripts/578477-shell-shockers-aimbot-esp) <Badge type="tip" text="GreasyFork" />　　安装量：**268**　　评分：👍2 / 👎1

## 功能介绍

本脚本为 shellshock.io 游戏提供自动瞄准和透视功能。按住鼠标右键可自动锁定最近的敌人，按 V 键可切换红色透视框和射线（可穿墙显示敌人），按 ` 键可显示或隐藏设置菜单。

## 适用网站

- Shell Shockers

## 使用方法

1. 安装脚本后，进入 shellshock.io 游戏页面。
2. 按住鼠标右键自动瞄准最近敌人。
3. 按 V 键切换透视显示敌人位置。
4. 按 ` 键打开或关闭设置菜单。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `unsafeWindow` | 允许脚本访问和修改网页的全局变量，实现高级功能。 |

## 安全分析

**风险等级**：🟡 LOW　　**安全评分**：89/100　　**分析时间**：2026-07-13

> 该脚本未检测到数据外传、远程代码执行、代码混淆、DOM XSS 或 WebSocket 使用。主要风险为申请了 unsafeWindow 权限（中等风险），但当前用途有限。localStorage 仅用于存储设置，无敏感信息。@require 的第三方库来源可信且锁定版本。整体安全风险较低，但建议定期复查权限申请和依赖库。

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
> 使用了 @grant unsafeWindow，允许脚本访问页面上下文，可能被滥用，但当前代码仅用于设置标志位。  
> 位置：元数据 @grant unsafeWindow 及 saveSettings()、初始化部分  
> 建议：仅在必要时申请 unsafeWindow，避免滥用，定期复查其用途。

**🟡 LOW** — 隐私采集  
> 通过 localStorage 存储和读取设置，但未发现敏感信息（如账号、密码、cookie）被存储。  
> 位置：localStorage 相关代码（SETTINGS_KEY、saveSettings、初始化）  
> 建议：确保不存储敏感信息，避免与其他脚本共享存储空间。

**🟡 LOW** — 供应链风险  
> @require 加载了 babylonjs，来源为 jsdelivr 官方 CDN，且指定了明确版本。  
> 位置：@require https://cdn.jsdelivr.net/npm/babylonjs@7.15.0/babylon.min.js  
> 建议：继续使用可信 CDN 并锁定版本，避免使用未知来源。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/578477-shell-shockers-aimbot-esp)*
