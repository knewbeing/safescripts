---
title: "GitHub 中文化插件"
---

# GitHub 中文化插件

`GitHub`  `界面翻译`  `中文化`  `开发者工具`  `网页增强`  `自动翻译`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/managed/main.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.9.4.4-2026-06-21**　　最后更新：**2026-06-22**

## 功能介绍

本脚本将 GitHub 网站的部分菜单和内容翻译为中文，提升中文用户的使用体验。支持多个 GitHub 相关子站点，自动替换界面文本。部分内容可调用在线翻译服务进行翻译。

## 适用网站

- GitHub
- GitHub Skills
- GitHub Gist
- GitHub Education
- GitHub Status

## 使用方法

1. 安装脚本后，访问 GitHub 及相关子站点。
2. 页面菜单和部分内容会自动显示为中文。
3. 如需手动操作或调整设置，可在浏览器脚本菜单中找到相关选项。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_addStyle` | 用于添加或修改页面样式，让翻译内容显示更美观。 |
| `GM_xmlhttpRequest` | 用于调用在线翻译接口，将英文内容翻译为中文。 |
| `GM_getValue` | 用于保存用户设置，如翻译偏好等。 |
| `GM_setValue` | 用于存储用户设置，如语言选择。 |
| `GM_registerMenuCommand` | 用于在脚本菜单中添加操作按钮，方便用户手动操作。 |
| `GM_unregisterMenuCommand` | 用于移除脚本菜单中的操作按钮。 |
| `GM_notification` | 用于在页面弹出通知，提醒用户翻译结果或操作提示。 |

## 安全分析

**风险等级**：🟠 MEDIUM　　**安全评分**：67/100　　**分析时间**：2026-06-22

> 该脚本主要功能为 GitHub 界面汉化，未发现明显的隐私采集、远程代码执行或混淆行为。存在向第三方翻译接口发送用户选中文本的外传行为，且依赖的 @require 文件未锁定哈希，存在一定供应链风险。总体风险为中等，建议关注依赖安全和最小化数据外传。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：fanyi.iflyrec.com） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ⚠️ 存在风险 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本通过 GM_xmlhttpRequest 向 fanyi.iflyrec.com 发送翻译请求，可能传输用户选中的文本内容。  
> 位置：TRANS_ENGINES.iflyrec / 相关翻译函数（未在片段中完全展示）  
> 建议：确保仅发送用户主动请求翻译的内容，不要自动上传页面内容或敏感信息。

**🟠 MEDIUM** — 供应链风险  
> @require 加载的第三方库（locals.js）来自 raw.githubusercontent.com，未锁定具体 commit 或哈希，存在供应链污染风险。  
> 位置：@require https://raw.githubusercontent.com/maboloshi/github-chinese/gh-pages/locals.js?v1.9.4.4-2026-06-21  
> 建议：建议使用固定 commit 哈希的 CDN 地址，确保依赖内容不可被篡改。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 GM_xmlhttpRequest 权限，但主逻辑未见其他外联用途，建议最小化权限。  
> 位置：@grant GM_xmlhttpRequest  
> 建议：如仅用于翻译接口，可保留；否则建议移除未使用的高权限。

---

*文档由 SafeScripts 自动生成 · [查看原始脚本](https://raw.githubusercontent.com/maboloshi/github-chinese/gh-pages/main.user.js)*
