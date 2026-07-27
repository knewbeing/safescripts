---
title: "Github增强"
---

# Github增强

`下载加速`  `Github增强`  `文件管理`  `快捷操作`  `开发工具`  `公益加速`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/github-enhancement.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**0.0.2**　　发现时间：**2026-06-22**　　来源：[pdone/jset](https://github.com/pdone/jset) <Badge type="tip" text="GitHub" />

## 功能介绍

本脚本为 Github 网站提供高速下载功能，包括 Git Clone/SSH、Release、Raw、Code(ZIP) 等文件的加速下载。支持项目列表中单文件的快捷下载，提升文件获取效率。

## 适用网站

- Github

## 使用方法

1. 安装脚本后，访问 Github 网站。
2. 在项目页面或文件列表中，会出现加速下载按钮。
3. 点击相应按钮即可高速下载文件或项目。
4. 可在脚本菜单中调整相关功能设置。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_registerMenuCommand` | 用于在脚本菜单中添加自定义命令，方便用户操作。 |
| `GM_unregisterMenuCommand` | 用于移除脚本菜单中的命令。 |
| `GM_openInTab` | 允许脚本在新标签页打开链接，便于下载或查看文件。 |
| `GM_getValue` | 用于存储和读取用户的配置或偏好设置。 |
| `GM_setValue` | 用于保存用户的配置或偏好设置。 |
| `GM_notification` | 在桌面弹出通知，提醒用户操作结果。 |
| `GM_setClipboard` | 将内容复制到剪贴板，方便用户快速获取下载链接。 |
| `window.onurlchange` | 监听页面地址变化，确保脚本在页面切换时正常工作。 |

## 安全分析

**风险等级**：🟡 LOW　　**安全评分**：89/100　　**分析时间**：2026-07-27

> 该脚本主要为 Github 页面插入加速下载链接，未检测到自动数据外传、隐私采集、远程代码执行、代码混淆或 DOM XSS 风险。唯一中等风险为申请了部分高权限（GM_openInTab、GM_setClipboard），但实际用途安全。整体安全性较高，建议后续功能扩展时继续遵循最小权限原则。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**🟠 MEDIUM** — 权限滥用风险  
> 脚本申请了 GM_openInTab、GM_notification、GM_setClipboard 等权限，但实际仅用于菜单反馈和通知，无滥用迹象。  
> 位置：元数据 @grant 与菜单命令逻辑  
> 建议：如后续扩展功能，需最小化权限申请。

**🟡 LOW** — 数据外传风险  
> 脚本未检测到任何网络请求（如 fetch、GM_xmlhttpRequest、XMLHttpRequest、WebSocket、EventSource），仅构建加速下载链接并插入页面。链接目标为第三方加速服务，但无自动数据外传行为。  
> 位置：URLS.* 变量和页面插入逻辑  
> 建议：如后续添加自动下载或数据上报功能，需严格限制数据类型和目的地。

**🟡 LOW** — 隐私采集风险  
> 脚本未读取 cookie、localStorage、sessionStorage、IndexedDB，也未监听键盘输入、表单字段或剪贴板内容。  
> 位置：全局代码与工具函数  
> 建议：保持现有行为，勿添加隐私采集逻辑。

**🟡 LOW** — 远程代码执行风险  
> 未检测到 eval、new Function、setTimeout(string)、setInterval(string) 或动态 script 标签加载远程 JS。  
> 位置：全局代码  
> 建议：避免引入远程代码执行相关 API。

**🟡 LOW** — 代码混淆风险  
> 代码未混淆，无 base64 解码、字符串数组映射或 unicode 混淆特征。  
> 位置：全局代码  
> 建议：保持代码可读性，勿混淆。

**🟡 LOW** — DOM XSS/注入风险  
> 未检测到用户输入或 URL 参数直接插入 innerHTML/outerHTML，未使用 document.write()，未操作 iframe src。  
> 位置：页面插入逻辑  
> 建议：如后续插入用户输入，需严格转义。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://raw.githubusercontent.com/pdone/jset/4ceee304614b90219ecdf58633516b71f49511d1/src/github-enhancement.user.js)*
