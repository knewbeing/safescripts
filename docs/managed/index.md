# 托管脚本

> 共 **5** 个脚本　·　最后更新：2026-04-15 21:22 UTC

以下脚本由 `target-repos.json` 配置，每天自动同步并分析安全性。

## 🟠 MEDIUM

| 脚本 | 版本 | 适用网站 | 安全说明 |
|:-----|:----:|:---------|:---------|
| [GitHub增强 - 高速下载](./GitHub_20Issue_20Link_20Status) | 2.6.37 | GitHub、hub.whtrys.space… | ⛔**数据外传**：脚本中存在大量访问第三方公益加速节点的网络请求，可能会将用户请求的 GitHub…<br>⛔**隐私采集**：脚本未发现访问 document.cookie、localStorage、ses…<br>⛔**数据外传**：脚本未发现使用 WebSocket、EventSource、navigator.… |
| [GitHub增强 - 高速下载](./GithubEnhanced-High-Speed-Download) | 2.6.37 | GitHub、hub.whtrys.space… | ⛔**数据外传**：脚本中存在大量第三方加速节点的网络请求，部分节点为非官方或未知来源，存在数据外传…<br>⛔**隐私采集**：脚本未发现读取 document.cookie、localStorage、ses…<br>🔴**远程代码执行**：脚本未发现使用 eval、new Function、setTimeout(str… |
| [🏷️ 小鱼标签 (UTags) - 为链接添加用户标签](./Refined_20GitHub_20_SSE_) | 0.34.2 | V2EX、X (Twitter)… | ⛔**数据外传**：脚本使用了 GM.xmlHttpRequest 和 GM_xmlhttpRequ…<br>🟠**权限滥用**：脚本申请了大量 GM_* 权限，但部分权限未必被使用，存在权限滥用风险。…<br>🟠**供应链风险**：@connect 使用了通配符 *，可能导致任意网络请求，存在供应链风险。… |
| [GitHub 中文化插件](./main) | 1.9.3-2026-04-12 | GitHub主站、GitHub技能站… | ⛔**数据外传**：脚本使用 GM_xmlhttpRequest 向第三方翻译服务 fanyi.if…<br>⛔**隐私采集**：脚本读取并使用 GM_getValue 和 GM_setValue 存储配置，但…<br>🔴**远程代码执行**：脚本未使用 eval、new Function、setTimeout(strin… |

## 🟢 SAFE

| 脚本 | 版本 | 适用网站 | 安全说明 |
|:-----|:----:|:---------|:---------|
| [密码显示助手](./Password-Revealer) | 1.5.0 | 所有网站 | 该脚本为密码显示助手，功能仅涉及本地密码输入框的显示切换。未发现任何网络请求、数据外传、隐私采集、远 |
