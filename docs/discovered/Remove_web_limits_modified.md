---
title: "网页限制解除(改)"
---

# 网页限制解除(改)



<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Remove_web_limits_modified.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**4.4.8**　　发现时间：**2026-04-16**　　来源：[GreasyFork](https://greasyfork.org/scripts/28497-%E7%BD%91%E9%A1%B5%E9%99%90%E5%88%B6%E8%A7%A3%E9%99%A4-%E6%94%B9) <Badge type="tip" text="GreasyFork" />　　安装量：**2,227,060**　　评分：👍3997 / 👎0

## 功能介绍



## 适用网站

- 通用

## 使用方法

- 请参阅脚本说明

## 权限说明

| 权限 | 用途说明 |
|------|----------|
| — | 无特殊权限 |

## 安全分析

**风险等级**：🟡 LOW　　**安全评分**：84/100　　**分析时间**：2026-06-15

> 该脚本主要用于解除网页复制、剪切、选择文本、右键菜单等限制。未检测到数据外传、隐私采集、远程代码执行、代码混淆、DOM XSS、供应链风险等高危行为。存在未使用的高权限申请（GM_xmlhttpRequest、GM_setClipboard），建议移除。整体安全风险较低，适合公开使用。

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
> 脚本申请了 GM_xmlhttpRequest 权限，但实际代码未发现任何网络请求（如 GM_xmlhttpRequest、fetch、XMLHttpRequest、WebSocket、EventSource 等）。@connect 仅指定了 eemm.me，但未见实际调用。  
> 位置：元数据与主代码  
> 建议：如无实际用途，建议移除 GM_xmlhttpRequest 权限和 @connect 域名，减少攻击面。

**🟠 MEDIUM** — 权限滥用  
> 脚本申请了 GM_setClipboard 权限，但主代码未见实际调用。  
> 位置：元数据与主代码  
> 建议：如无实际用途，建议移除 GM_setClipboard 权限。

**🟡 LOW** — 敏感 API 调用  
> 脚本申请了 GM_getValue、GM_setValue、GM_deleteValue 权限，并用于存储用户设置数据。未见敏感数据采集行为。  
> 位置：主代码  
> 建议：仅存储脚本配置，无隐私风险。

**🟡 LOW** — 远程代码执行  
> 脚本未使用 eval、new Function、setTimeout(string)、setInterval(string) 等动态代码执行方式。  
> 位置：主代码  
> 建议：保持现状，避免远程代码执行风险。

**🟡 LOW** — 供应链风险  
> 脚本未加载任何第三方库（无 @require），无供应链风险。  
> 位置：元数据  
> 建议：保持现状。

**🟡 LOW** — 隐私采集  
> 脚本未监听键盘输入、未读取表单字段、未访问剪贴板、未访问浏览器指纹 API，未采集用户隐私。  
> 位置：主代码  
> 建议：保持现状。

**🟡 LOW** — 代码混淆  
> 脚本未检测到代码混淆、base64 解码、字符串映射、unicode 混淆等特征。  
> 位置：主代码  
> 建议：保持现状。

**🟡 LOW** — DOM XSS / 注入  
> 脚本未检测到 DOM XSS 或注入风险，未将用户输入或 URL 参数直接插入 innerHTML/outerHTML。  
> 位置：主代码  
> 建议：保持现状。

**🟡 LOW** — 数据外传  
> 脚本未使用 WebSocket、EventSource、navigator.sendBeacon 等实时数据传输方式。  
> 位置：主代码  
> 建议：保持现状。

**🟡 LOW** — ClickJacking / iframe 风险  
> 脚本未检测到修改 frame 保护策略或创建隐藏 iframe 用于数据提取。  
> 位置：主代码  
> 建议：保持现状。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/28497-%E7%BD%91%E9%A1%B5%E9%99%90%E5%88%B6%E8%A7%A3%E9%99%A4-%E6%94%B9)*
