---
title: "HTML5视频播放工具"
---

# HTML5视频播放工具

`视频增强`  `快捷键`  `画中画`  `网页全屏`  `直播支持`  `截图`

<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/HTML5视频播放工具.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**2.0.2**　　发现时间：**2026-06-29**　　来源：[GreasyFork](https://greasyfork.org/scripts/30545-html5%E8%A7%86%E9%A2%91%E6%92%AD%E6%94%BE%E5%B7%A5%E5%85%B7) <Badge type="tip" text="GreasyFork" />　　安装量：**1,280,702**　　评分：👍2614 / 👎21

## 功能介绍

本脚本为主流视频网站和直播平台提供HTML5视频增强功能，包括视频截图、画中画、缓存视频、网页全屏、以及丰富的快捷键操作（如快进、快退、暂停/播放、音量调节、切换全屏、上下帧、播放速度等）。支持自定义站点，提升观影体验。

## 适用网站

- 腾讯视频
- 优酷
- 爱奇艺
- B站
- 西瓜视频
- AcFun
- PPTV
- 芒果TV
- 咪咕视频
- 新浪视频
- 微博
- 网易视频
- 搜狐视频
- 百度云
- 豆瓣电影
- 凤凰视频
- YouTube
- TED
- Twitch
- YY直播
- 虎牙直播
- 斗鱼直播
- 龙珠直播
- 战旗直播
- 抖音

## 使用方法

1. 安装脚本后，进入任意支持的视频或直播网站。
2. 播放视频时，使用快捷键即可实现截图、快进、快退、暂停/播放、音量调节等功能。
3. 可通过油猴菜单进行自定义设置或添加新支持站点。
4. 如需网页全屏、画中画等功能，直接按对应快捷键即可切换。

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| `GM_addStyle` | 用于添加自定义样式，让界面更美观或突出功能按钮。 |
| `window.onurlchange` | 监听网址变化，确保功能在页面切换时自动生效。 |
| `unsafeWindow` | 允许脚本访问和操作网页的底层对象，增强功能兼容性。 |
| `GM_registerMenuCommand` | 在油猴菜单中添加自定义命令，方便用户手动操作或配置。 |
| `GM_setValue` | 保存用户设置或偏好，保证下次使用时自动记忆。 |
| `GM_getValue` | 读取用户保存的设置，实现个性化体验。 |

## 安全分析

**风险等级**：🟢 SAFE　　**安全评分**：100/100　　**分析时间**：2026-06-29

> 该脚本未检测到任何数据外传、隐私采集、远程代码执行、代码混淆、DOM XSS、权限滥用、敏感 API 滥用或供应链风险。依赖库来源可信且版本固定。整体安全性高，适合日常使用。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ✅ 未检测到 |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ✅ 可信 |

### 发现的问题

**⛔ CRITICAL** — 数据外传  
> 脚本未检测到任何网络请求（如 GM_xmlhttpRequest、fetch、XMLHttpRequest、WebSocket、EventSource、sendBeacon）用于数据外传。  
> 位置：全局代码  
> 建议：保持现状，勿添加任何外传逻辑。

**⛔ CRITICAL** — 隐私采集  
> 未检测到 document.cookie、localStorage、sessionStorage、IndexedDB、剪贴板读取、键盘监听与外传、表单读取等隐私采集行为。  
> 位置：全局代码  
> 建议：如需处理用户输入，确保不外传且最小化采集范围。

**🔴 HIGH** — 远程代码执行  
> 未检测到 eval、new Function、setTimeout(string)、setInterval(string)、动态 script 标签、document.write、@require 加载非官方/不定版本 JS。  
> 位置：全局代码  
> 建议：避免任何远程代码执行相关用法。

**🔴 HIGH** — 代码混淆  
> 未检测到 base64 解码执行、字符串数组混淆、unicode 混淆或高度压缩单行代码。  
> 位置：全局代码  
> 建议：保持代码可读性，便于社区审查。

**🔴 HIGH** — DOM XSS / 注入  
> 未检测到用户输入或 URL 参数直接插入 innerHTML/outerHTML，未见 document.write 注入或 iframe src 操作。  
> 位置：全局代码  
> 建议：如需插入动态内容，务必进行转义。

**🟠 MEDIUM** — 权限滥用  
> @grant 权限申请与实际代码使用基本匹配，无明显高权限滥用。  
> 位置：元数据 @grant  
> 建议：如未使用 GM_addStyle、GM_registerMenuCommand、GM_setValue、GM_getValue 等，可适当精简权限。

**🟠 MEDIUM** — 供应链风险  
> @require 加载的第三方库（Vue、jQuery）均来自 jsdelivr 官方 CDN，且指定了明确版本。  
> 位置：元数据 @require  
> 建议：如需升级依赖，务必指定具体版本，避免使用可变 URL。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/30545-html5%E8%A7%86%E9%A2%91%E6%92%AD%E6%94%BE%E5%B7%A5%E5%85%B7)*
