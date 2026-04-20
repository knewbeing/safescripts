---
title: GitHub增强 - 高速下载
---

# GitHub增强 - 高速下载

`GitHub增强`  `高速下载`  `文件管理`  `公益加速`  `项目下载`  `用户脚本`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/managed/GithubEnhanced-High-Speed-Download.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**2.6.37**　　最后更新：**2026-04-15**

## 功能介绍

该脚本为GitHub提供高速下载功能，支持Git Clone/SSH、Release、Raw文件及代码压缩包等多种文件类型的快速下载。它利用公益加速源提升下载速度，并支持项目列表中的单文件快捷下载。安装后可显著提升GitHub相关资源的下载效率。

## 适用网站

- GitHub
- hub.whtrys.space
- dgithub.xyz
- kkgithub.com
- github.site
- github.store
- bgithub.xyz

## 使用方法

1. 安装脚本后访问GitHub相关页面。
2. 在页面菜单或脚本菜单中选择高速下载选项。
3. 根据需要选择下载方式（Git Clone、Release、Raw等）。
4. 脚本自动使用公益加速源加快下载速度。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_registerMenuCommand` | 添加自定义菜单命令，方便用户操作脚本功能 |
| `GM_unregisterMenuCommand` | 移除已注册的菜单命令，管理菜单项 |
| `GM_openInTab` | 在新标签页打开链接，用于快速访问下载地址 |
| `GM_getValue` | 读取脚本存储的数据，保存用户设置 |
| `GM_setValue` | 保存数据到脚本存储，保持用户配置 |
| `GM_notification` | 显示桌面通知，提醒下载状态或操作结果 |
| `GM_setClipboard` | 将内容复制到剪贴板，方便用户粘贴下载链接等信息 |
| `window.onurlchange` | 监听URL变化，动态响应页面内容变化 |

## 安全分析

**风险等级**：🟢 SAFE　　**安全评分**：100/100　　**分析时间**：2026-04-20

> 该 UserScript 仅包含元数据，无任何实际代码逻辑，因此不存在数据外传、隐私采集、远程代码执行、代码混淆、DOM XSS、权限滥用、敏感 API 调用、供应链风险或 iframe 风险。安全评分为满分 100，风险等级 SAFE。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 未发现安全问题 ✅

---

*文档由 SafeScripts 自动生成 · [查看原始脚本](https://raw.githubusercontent.com/XIU2/UserScript/master/GithubEnhanced-High-Speed-Download.user.js)*
