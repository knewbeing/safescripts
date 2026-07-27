---
title: "Ping.Sx 增强"
---

# Ping.Sx 增强

`IP工具`  `复制增强`  `页面优化`  `实用脚本`  `网络工具`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Ping_Sx-Enhanced.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.0.3**　　发现时间：**2026-07-27**　　来源：[XIU2/UserScript](https://github.com/XIU2/UserScript) <Badge type="tip" text="GitHub" />

## 功能介绍

本脚本为 Ping.Sx 网站提供增强功能，包括一键复制所有 IP、点击 IP 链接直接复制而非跳转、以及在页面两侧空白处右键快速回到顶部。

## 适用网站

- Ping.Sx

## 使用方法

1. 安装脚本后，访问 Ping.Sx 网站相关页面。
2. 点击新增的一键复制按钮即可复制所有 IP。
3. 点击 IP 链接会直接复制 IP，而不是跳转。
4. 在页面两侧空白处右键可快速回到顶部。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_setClipboard` | 用于将 IP 地址内容复制到剪贴板。 |
| `GM_registerMenuCommand` | 用于在浏览器菜单中添加自定义操作按钮。 |
| `GM_unregisterMenuCommand` | 用于移除自定义菜单按钮。 |
| `GM_getValue` | 用于获取和保存脚本设置，如复制分隔方式。 |
| `GM_setValue` | 用于保存脚本设置，如复制分隔方式。 |
| `window.onurlchange` | 用于监听页面地址变化，保证功能在页面切换时正常。 |

## 安全分析

**风险等级**：🟢 SAFE　　**安全评分**：92/100　　**分析时间**：2026-07-27

> 该脚本未发现任何数据外传、隐私采集、远程代码执行、代码混淆、DOM XSS、敏感 API 调用、供应链风险或 iframe 风险。仅存在权限申请略多（GM_getValue/GM_setValue），但实际用途安全。整体安全性极高，适合公开使用。

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
> 脚本申请了 GM_getValue 和 GM_setValue 权限，但仅用于存储和切换菜单分隔符配置，无敏感数据存储。  
> 位置：元数据 @grant 和 registerMenuCommand 相关代码  
> 建议：无风险，但建议仅申请实际需要的权限。

**🟡 LOW** — 数据外传  
> 脚本未使用任何网络请求、WebSocket、fetch、GM_xmlhttpRequest 等数据外传 API。  
> 位置：全局代码审查  
> 建议：保持现状，无需改进。

**🟡 LOW** — 隐私采集  
> 脚本未监听键盘输入、未读取 cookie/localStorage/sessionStorage/IndexedDB、未访问指纹 API、未读取剪贴板内容。  
> 位置：全局代码审查  
> 建议：保持现状，无需改进。

**🟡 LOW** — 远程代码执行  
> 脚本未使用 eval、new Function、setTimeout(string)、setInterval(string)、innerHTML/outerHTML 插入脚本、document.write、动态加载远程 JS。  
> 位置：全局代码审查  
> 建议：保持现状，无需改进。

**🟡 LOW** — 代码混淆  
> 脚本未发现混淆特征，无 atob/btoa、字符串数组映射、unicode 混淆、压缩单行代码。  
> 位置：全局代码审查  
> 建议：保持现状，无需改进。

**🟡 LOW** — DOM XSS / 注入  
> 脚本未将用户输入或 URL 参数直接插入 innerHTML/outerHTML，未操作 iframe src，未使用 document.write。  
> 位置：全局代码审查  
> 建议：保持现状，无需改进。

**🟡 LOW** — 敏感 API 调用  
> 脚本未调用敏感 API（如 geolocation、RTCPeerConnection、MediaDevices、Notification、Clipboard API 读取）。  
> 位置：全局代码审查  
> 建议：保持现状，无需改进。

**🟡 LOW** — 供应链风险  
> 脚本未通过 @require 加载任何第三方库，无供应链风险。  
> 位置：元数据 @require  
> 建议：保持现状，无需改进。

**🟡 LOW** — ClickJacking / iframe 风险  
> 脚本未修改 frame 保护策略，未创建隐藏 iframe 用于数据提取。  
> 位置：全局代码审查  
> 建议：保持现状，无需改进。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://raw.githubusercontent.com/XIU2/UserScript/a4d1659b7d9cdcb5d9e55a81bb14e85e875e3f49/Ping.Sx-Enhanced.user.js)*
