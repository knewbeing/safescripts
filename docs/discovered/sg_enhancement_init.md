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

**风险等级**：⛔ CRITICAL　　**安全评分**：60/100　　**分析时间**：2026-07-13

> This user script dynamically loads and executes a remote JavaScript file from an external server (GitHub Pages) without version pinning or integrity checks. This introduces a critical remote code execution and supply chain risk, as the contents of the loaded script can change at any time and are not auditable from this code. No direct data exfiltration or privacy collection is present in the visible code, but the remote script could perform such actions. The script does not use obfuscation, nor does it directly manipulate user data or the DOM in a risky way. However, the dynamic remote code loading is a critical security concern.

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ⚠️ 存在风险 |

### 发现的问题

**⛔ CRITICAL** — Remote Code Execution  
> The script dynamically loads and executes a remote JavaScript file from an external server (GitHub Pages) using a script tag. The loaded code is not version-pinned or hash-locked, and its contents are not visible in this review.  
> 位置：Line: script.src assignment and appendChild  
> 建议：Pin the external script to a specific version or hash, and audit the remote script for security. Avoid loading remote scripts dynamically unless absolutely necessary.

**🔴 HIGH** — Remote Code Execution  
> The script uses document.createElement('script') and sets the src to an external URL, which can lead to remote code execution if the external resource is compromised.  
> 位置：Line: script.src assignment and appendChild  
> 建议：Bundle and audit all code locally within the user script, or use a trusted CDN with version pinning.

**🟠 MEDIUM** — Supply Chain Risk  
> The @require directive is not used, but the script loads code from a variable URL (GitHub Pages), which is not a canonical CDN and can change at any time.  
> 位置：Metadata and script.src  
> 建议：Use official, versioned CDNs for third-party libraries and avoid loading from personal GitHub Pages.

---

*由 SafeScripts 自动发现 · [查看原始来源](https://raw.githubusercontent.com/rossengeorgiev/sg-enhancement-addon/6db1836d00336a5207ec67ca59a56275d7ae6665/sg_enhancement_init.user.js)*
