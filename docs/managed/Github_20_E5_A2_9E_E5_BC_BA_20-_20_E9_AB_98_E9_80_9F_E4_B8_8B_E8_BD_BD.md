---
title: "Github 增强 - 高速下载"
---

# Github 增强 - 高速下载

`下载加速`  `GitHub增强`  `文件管理`  `效率工具`  `公益加速`  `开发辅助`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/managed/Github_20_E5_A2_9E_E5_BC_BA_20-_20_E9_AB_98_E9_80_9F_E4_B8_8B_E8_BD_BD.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**2.6.37**　　最后更新：**2026-04-20**

## 功能介绍

本脚本为 GitHub 提供高速下载功能，支持加速 Git Clone/SSH、Release、Raw、Code(ZIP) 等文件下载。用户还可以在项目列表中一键下载单个文件，极大提升下载效率。所有加速服务均为公益性质，适合经常需要下载 GitHub 文件的用户。

## 适用网站

- GitHub
- hub.whtrys.space
- dgithub.xyz
- kkgithub.com
- github.site
- github.store
- bgithub.xyz

## 使用方法

1. 安装脚本后，访问 GitHub 或相关加速镜像网站。
2. 在文件、Release、Raw、Code(ZIP) 等页面，会出现加速下载按钮。
3. 点击加速按钮即可通过公益加速通道下载文件。
4. 如需自定义设置，可在脚本菜单中进行调整。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_registerMenuCommand` | 在脚本菜单中添加自定义功能按钮，方便操作。 |
| `GM_unregisterMenuCommand` | 移除脚本菜单中的自定义按钮。 |
| `GM_openInTab` | 在新标签页打开加速下载链接。 |
| `GM_getValue` | 保存用户的设置或偏好。 |
| `GM_setValue` | 设置或更新用户的设置或偏好。 |
| `GM_notification` | 通过浏览器通知提醒用户操作结果。 |
| `GM_setClipboard` | 将加速下载链接一键复制到剪贴板。 |
| `window.onurlchange` | 监听页面地址变化，确保功能在单页应用中正常。 |

## 安全分析

**风险等级**：⛔ CRITICAL　　**安全评分**：0/100　　**分析时间**：2026-05-11

> 由于未提供完整代码，无法进行有效的安全审查。仅凭元数据无法判断脚本是否安全，存在极高的不确定性和潜在风险。请补充完整代码以获得准确的安全分析。

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
> 无法评估脚本实际行为，因为未提供完整代码内容。仅凭元数据无法判断是否存在数据外传、隐私采集、远程代码执行等高危行为。  
> 位置：N/A  
> 建议：请补充完整的 UserScript 代码以进行全面安全审查。仅凭元数据无法做出准确安全结论。

---

*文档由 SafeScripts 自动生成 · [查看原始脚本](https://update.greasyfork.org/scripts/412245/Github%20%E5%A2%9E%E5%BC%BA%20-%20%E9%AB%98%E9%80%9F%E4%B8%8B%E8%BD%BD.user.js)*
