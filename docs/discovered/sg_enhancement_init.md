---
title: "SteamGifts增强插件"
---

# SteamGifts增强插件

`SteamGifts`  `网站增强`  `游戏抽奖`  `浏览优化`  `福利工具`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/sg_enhancement_init.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**2.3**　　发现时间：**2026-06-22**　　来源：[rossengeorgiev/sg-enhancement-addon](https://github.com/rossengeorgiev/sg-enhancement-addon) <Badge type="tip" text="GitHub" />

## 功能介绍

本脚本为SteamGifts网站提供增强功能，让用户浏览游戏赠品更高效。它会自动加载额外的脚本，提升网站使用体验。适合经常参与SteamGifts抽奖的用户。

## 适用网站

- SteamGifts

## 使用方法

1. 安装脚本后，访问SteamGifts网站。
2. 脚本会自动加载增强功能，无需额外操作。
3. 浏览和参与游戏赠品时体验更便捷的界面。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| — | 无特殊权限 |

## 安全分析

**风险等级**：🔴 HIGH　　**安全评分**：77/100　　**分析时间**：2026-07-27

> 该脚本主要风险在于动态加载远程 JS 文件且未固定版本，存在远程代码执行和供应链风险。未检测到数据外传、隐私采集、代码混淆或 DOM XSS。建议本地化依赖或使用可信 CDN 并固定版本哈希，并强制使用 HTTPS。整体安全评分为 77，风险等级为 HIGH。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ⚠️ 存在风险 |

### 发现的问题

**🔴 HIGH** — Remote Code Execution  
> 脚本通过动态 script 标签加载远程 JavaScript 文件，且未固定版本哈希，存在远程代码执行风险。  
> 位置：document.body.appendChild(script) with script.src = 'http://rossengeorgiev.github.com/sg-enhancement-addon/sg_enhancement_addon_base.js'  
> 建议：建议将依赖的 JS 文件本地化或使用可信 CDN 并固定版本哈希，避免远程代码变更导致供应链攻击。

**🟠 MEDIUM** — Supply Chain Risk  
> 脚本未使用 HTTPS 加载远程 JS，存在中间人攻击风险。  
> 位置：script.src = 'http://rossengeorgiev.github.com/sg-enhancement-addon/sg_enhancement_addon_base.js'  
> 建议：建议使用 HTTPS 协议加载所有远程资源。

**🟡 LOW** — DOM Manipulation  
> 脚本通过 innerHTML/outerHTML 插入 script 标签，但未直接插入用户输入，XSS 风险较低。  
> 位置：document.body.appendChild(script)  
> 建议：确保插入内容来源可信，避免后续代码注入风险。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://raw.githubusercontent.com/rossengeorgiev/sg-enhancement-addon/6db1836d00336a5207ec67ca59a56275d7ae6665/sg_enhancement_init.user.js)*
