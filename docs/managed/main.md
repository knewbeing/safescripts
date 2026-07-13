---
title: "GitHub 中文化插件"
---

# GitHub 中文化插件

`GitHub`  `界面翻译`  `中文化`  `开发者工具`  `提升体验`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/managed/main.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.9.4.4-2026-07-11**　　最后更新：**2026-07-13**

## 功能介绍

本脚本将 GitHub 网站的部分菜单和内容翻译为中文，提升中文用户的使用体验。支持多个 GitHub 相关子站点，自动翻译界面文本。

## 适用网站

- GitHub
- GitHub Skills
- GitHub Gist
- GitHub Education
- GitHub Status

## 使用方法

1. 安装脚本后，访问 GitHub 及相关子站点。
2. 界面部分菜单和内容会自动显示为中文。
3. 如需调整设置，可通过油猴菜单进行操作。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_addStyle` | 用于添加自定义样式，让翻译内容显示更美观。 |
| `GM_xmlhttpRequest` | 用于发送网络请求，获取翻译结果。 |
| `GM_getValue` | 用于读取用户设置，如翻译偏好。 |
| `GM_setValue` | 用于保存用户设置，如语言选择。 |
| `GM_registerMenuCommand` | 用于在脚本菜单中添加自定义操作按钮。 |
| `GM_unregisterMenuCommand` | 用于移除脚本菜单中的自定义操作按钮。 |
| `GM_notification` | 用于在浏览器中弹出通知，提醒用户脚本状态或操作结果。 |

## 安全分析

**风险等级**：🟠 MEDIUM　　**安全评分**：67/100　　**分析时间**：2026-07-13

> 该脚本主要功能为本地化 GitHub 界面，核心逻辑为 DOM 遍历和文本替换。唯一的外部数据传输为用户主动触发的翻译请求，目标为 iflyrec.com 官方接口，未发现自动上传页面内容、cookie、表单、指纹等隐私数据。未检测到 eval、代码混淆、DOM XSS、敏感 API 滥用等高危行为。供应链风险主要在于 @require 的 JS 文件未锁定哈希。整体风险为中等，建议关注第三方依赖的安全性。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：https://fanyi.iflyrec.com） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ⚠️ 存在风险 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本通过 GM_xmlhttpRequest 向 https://fanyi.iflyrec.com/TJHZTranslationService/v2/textAutoTranslation 发送翻译请求，内容为用户主动点击翻译按钮后选中的文本。  
> 位置：CONFIG.TRANS_ENGINES.iflyrec, translateText()（locals.js 可能实现）  
> 建议：确保仅发送用户主动请求的内容，不自动上传页面内容或敏感信息。

**🟠 MEDIUM** — 供应链风险  
> @require 加载的 locals.js 文件托管于 raw.githubusercontent.com，属于官方 GitHub 静态资源，但未锁定具体 commit 哈希，存在被篡改的理论风险。  
> 位置：@require https://raw.githubusercontent.com/maboloshi/github-chinese/gh-pages/locals.js?v1.9.4.4-2026-07-11  
> 建议：建议锁定为具体 commit 哈希，防止供应链污染。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 GM_xmlhttpRequest 权限，但仅用于翻译接口调用，未发现其他高权限滥用。  
> 位置：@grant GM_xmlhttpRequest  
> 建议：如无其他用途，可考虑按需精简权限。

---

*文档由 SafeScripts 自动生成 · [查看原始脚本](https://raw.githubusercontent.com/maboloshi/github-chinese/gh-pages/main.user.js)*
