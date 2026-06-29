---
title: "密码显示助手"
---

# 密码显示助手

`密码显示`  `表单增强`  `网页辅助`  `快捷操作`  `隐私管理`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/managed/Password-Revealer.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.5.0**　　最后更新：**2026-06-22**

## 功能介绍

本脚本可让网页上的密码输入框内容变得可见。支持聚焦显示、悬浮预览、双击切换和始终可见四种模式。用户可通过菜单或快捷键（Meta/Ctrl+Alt+P）切换显示方式，方便查看和管理密码。

## 适用网站

- 所有网站

## 使用方法

1. 安装脚本后，打开任何包含密码输入框的网页。
2. 根据需要，聚焦、悬浮、双击或始终显示密码内容。
3. 通过浏览器菜单或按下快捷键（Meta/Ctrl+Alt+P）切换显示模式。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_getValue` | 用于读取用户设置，例如当前显示模式。 |
| `GM_setValue` | 用于保存用户设置，如显示模式的切换。 |
| `GM_registerMenuCommand` | 用于在浏览器菜单中添加切换显示模式的选项。 |
| `GM_unregisterMenuCommand` | 用于移除菜单中的选项。 |
| `GM_addStyle` | 用于添加自定义样式，让提示和显示效果更美观。 |

## 安全分析

**风险等级**：🟠 MEDIUM　　**安全评分**：92/100　　**分析时间**：2026-06-29

> 该脚本不会外传任何数据，也未检测到远程代码执行、代码混淆、DOM XSS、供应链等高危风险。主要风险为会在所有网页上暴露密码输入框内容，属于敏感表单字段读取，但未发现数据泄露。建议仅在信任环境下使用。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ❌ 检测到（读取并切换 <input type='password'> 字段内容） |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**🟠 MEDIUM** — 敏感表单字段读取  
> 脚本会遍历页面所有 <input type='password'> 元素，并在不同模式下将其 type 属性切换为 'text'，以显示密码内容。此行为涉及对敏感表单字段的读取和展示，但未发现数据被外传。  
> 位置：主逻辑（事件监听与 type 切换）  
> 建议：提醒用户此脚本会暴露页面所有密码输入框内容，勿在不信任的环境下使用。

**🟡 LOW** — 权限申请与使用  
> 脚本申请了 GM_getValue、GM_setValue、GM_registerMenuCommand、GM_unregisterMenuCommand、GM_addStyle 权限，均有实际使用，无权限滥用。  
> 位置：@grant 元数据与主逻辑  
> 建议：无。

**🟡 LOW** — 数据外传检查  
> 脚本未检测到任何网络请求、WebSocket、数据外传、统计或追踪行为。  
> 位置：全局  
> 建议：无。

**🟡 LOW** — 远程代码执行检查  
> 未检测到 eval、new Function、setTimeout(string)、setInterval(string)、动态 script 标签、@require、document.write 等远程代码执行风险。  
> 位置：全局  
> 建议：无。

**🟡 LOW** — 代码混淆检查  
> 未检测到代码混淆、base64 解码、字符串数组映射、unicode 混淆或高度压缩代码。  
> 位置：全局  
> 建议：无。

**🟡 LOW** — DOM XSS 检查  
> 未检测到 DOM XSS 风险，未将用户输入或 URL 参数直接插入 innerHTML/outerHTML。  
> 位置：全局  
> 建议：无。

**🟡 LOW** — 敏感 API 检查  
> 未检测到敏感 API（如 geolocation、RTCPeerConnection、MediaDevices、Clipboard API、Notification API）调用。  
> 位置：全局  
> 建议：无。

**🟡 LOW** — 供应链风险检查  
> 未检测到 @require 加载第三方库，无供应链风险。  
> 位置：元数据  
> 建议：无。

**🟡 LOW** — ClickJacking/iframe 检查  
> 未检测到脚本修改 frame 保护策略或创建隐藏 iframe。  
> 位置：全局  
> 建议：无。

---

*文档由 SafeScripts 自动生成 · [查看原始脚本](https://raw.githubusercontent.com/MiPoNianYou/UserScripts/main/Scripts/Password-Revealer.user.js)*
