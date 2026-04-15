---
title: GitHub 中文化插件
---

# GitHub 中文化插件

`界面中文化`  `GitHub`  `翻译`  `用户脚本`  `页面增强`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/main_greasyfork.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.9.2-2026-04-08**　　发现时间：**2026-04-15**　　来源：[maboloshi/github-chinese](https://github.com/maboloshi/github-chinese) <Badge type="tip" text="GitHub" />

## 功能介绍

该脚本将 GitHub 网站的部分菜单和内容翻译成中文，提升中文用户的使用体验。它会自动监测页面变化并实时替换界面文本。支持 GitHub 主站、技能页、Gist 以及状态页。

## 适用网站

- GitHub
- GitHub Skills
- GitHub Gist
- GitHub 状态页

## 使用方法

1. 安装 Tampermonkey 或其他支持的用户脚本管理器。
2. 在脚本管理器中添加并启用本脚本。
3. 访问 GitHub 及相关页面时，界面会自动显示中文翻译。
4. 可通过脚本菜单进行相关设置和操作。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_xmlhttpRequest` | 用于发送跨域请求获取翻译数据或更新内容。 |
| `GM_getValue` | 用于读取脚本的本地存储设置。 |
| `GM_setValue` | 用于保存脚本的本地存储设置。 |
| `GM_registerMenuCommand` | 用于在脚本菜单中注册自定义命令，方便用户操作。 |
| `GM_unregisterMenuCommand` | 用于注销已注册的菜单命令。 |
| `GM_notification` | 用于显示桌面通知提醒用户。 |

## 安全分析

**风险等级**：🟠 MEDIUM　　**分析时间**：2026-04-15

> 该脚本主要用于GitHub界面中文化，未发现隐私采集行为和远程代码执行风险。存在声明了GM_xmlhttpRequest权限和@connect www.iflyrec.com，但代码中未实际使用网络请求，存在潜在数据外传风险和权限滥用。@require依赖来源可信且版本固定。建议开发者确认是否需要访问第三方服务器，若无必要应移除相关权限和连接声明以降低风险。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：www.iflyrec.com） |
| 隐私采集 | ✅ 未检测到 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本声明了GM_xmlhttpRequest权限和@connect www.iflyrec.com，但代码中未发现实际使用GM_xmlhttpRequest或其他网络请求发送数据到该第三方服务器，存在潜在数据外传风险。  
> 位置：元数据和脚本主体  
> 建议：确认脚本是否确实需要访问www.iflyrec.com，若无必要应移除相关权限和@connect声明。

**⛔ CRITICAL** — 隐私采集  
> 脚本未发现读取document.cookie、localStorage、sessionStorage，未监听键盘事件，也未访问浏览器指纹相关API，未读取表单字段值，隐私采集行为未发现。  
> 位置：脚本主体  
> 建议：无

**🔴 HIGH** — 远程代码执行  
> 脚本未使用eval、new Function、setTimeout字符串参数、innerHTML执行远程代码，且@require加载的远程脚本来自greasyfork.org可信源，未发现远程代码执行风险。  
> 位置：脚本主体和元数据@require  
> 建议：无

**🔴 HIGH** — 权限滥用  
> 脚本申请了GM_xmlhttpRequest权限，但代码中未实际使用该权限，存在权限滥用风险。  
> 位置：元数据和脚本主体  
> 建议：移除未使用的GM_xmlhttpRequest权限申请。

**🟠 MEDIUM** — 敏感API调用  
> 未发现使用navigator.geolocation、RTCPeerConnection、MediaDevices、Clipboard API等敏感API。  
> 位置：脚本主体  
> 建议：无

**🟠 MEDIUM** — 代码混淆  
> 未发现代码混淆、base64解码执行或字符串拼接执行等混淆特征。  
> 位置：脚本主体  
> 建议：无

**🟡 LOW** — 外部依赖  
> @require加载的第三方库来自greasyfork.org，属于可信来源，且版本号固定，符合安全要求。  
> 位置：元数据@require  
> 建议：无

---

*由 SafeScripts 自动发现 · [查看原始来源](https://raw.githubusercontent.com/maboloshi/github-chinese/2635cb959e88c263108a99e022b3ddd5e9818838/main(greasyfork).user.js)*
