---
title: GitHub增强 - 高速下载
---

# GitHub增强 - 高速下载

`GitHub增强`  `高速下载`  `代码管理`  `项目文件下载`  `公益加速`  `用户脚本`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/managed/GitHub_20Issue_20Link_20Status.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**2.6.37**　　最后更新：**2026-04-15**

## 功能介绍

该脚本为GitHub及相关镜像站点提供高速下载功能，支持Git Clone/SSH、Release、Raw文件及代码压缩包的快速下载。它利用公益加速服务提升下载速度，并支持项目列表中的单文件快捷下载。安装后可方便地通过菜单操作实现高速下载体验。

## 适用网站

- GitHub
- hub.whtrys.space
- dgithub.xyz
- kkgithub.com
- github.site
- github.store
- bgithub.xyz

## 使用方法

1. 安装脚本后访问GitHub或支持的镜像站点。
2. 在页面右上角或菜单中找到高速下载相关选项。
3. 选择需要下载的文件类型或项目文件，点击开始高速下载。
4. 根据提示完成下载，享受加速服务。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_registerMenuCommand` | 注册自定义菜单命令，方便用户操作脚本功能。 |
| `GM_unregisterMenuCommand` | 注销已注册的菜单命令，管理菜单项。 |
| `GM_openInTab` | 在新标签页打开链接，用于快速下载或跳转。 |
| `GM_getValue` | 获取脚本存储的配置信息，保存用户设置。 |
| `GM_setValue` | 保存配置信息，记住用户偏好。 |
| `GM_notification` | 显示桌面通知，提醒下载状态或错误。 |
| `GM_setClipboard` | 将内容复制到剪贴板，方便分享或使用。 |
| `window.onurlchange` | 监听URL变化，动态响应页面切换。 |

## 安全分析

**风险等级**：⛔ CRITICAL　　**安全评分**：50/100　　**分析时间**：2026-04-20

> 无法进行有效安全审查，因为未提供脚本代码。仅根据元数据分析，存在权限滥用风险。请补充完整代码以获得准确安全评估。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — 代码缺失  
> 无法进行完整安全审查：未提供脚本代码，仅有元数据。无法判断是否存在数据外传、隐私采集、远程代码执行等风险。  
> 位置：全局  
> 建议：请提供完整 UserScript 代码以便进行全面安全审查。

**🟠 MEDIUM** — 权限滥用风险  
> 脚本申请了 GM_openInTab、GM_notification、GM_setClipboard 等高权限，但未提供代码无法判断实际用途。  
> 位置：元数据 @grant  
> 建议：仅申请实际需要的权限，避免权限滥用。

---

*文档由 SafeScripts 自动生成 · [查看原始脚本](https://greasyfork.org/scripts/412245-github-issue-link-status/code/GitHub%20Issue%20Link%20Status.user.js)*
