# 托管脚本

> 共 **5** 个脚本　·　2026-04-15 22:07 UTC　·　由 `target-repos.json` 配置，每天自动同步安全分析

| 风险 | 脚本 | 版本 | 适用网站 | 风险说明 |
|:----:|:-----|:----:|:---------|:---------|
| 🟢SAFE | [密码显示助手](./Password-Revealer) | 1.5.0 | 所有网站 | 该脚本为密码显示助手，功能仅涉及本地密码输入框的显示切换。未发现任何网络请求、数据外传、隐私采集、远程代码执行、代码混淆、DOM XSS 注入、权限滥用、敏感 … |
| 🟠MEDIUM | [GitHub增强 - 高速下载](./GitHub_20Issue_20Link_20Status) | 2.6.37 | GitHub、hub.whtrys.space… | ⛔**数据外传**: 脚本中存在大量访问第三方公益加速节点的网络请求，可能会将用户请求的 GitHub 资源通过这些第三方节点转发，存在数据外…<br>⛔**隐私采集**: 脚本未发现访问 document.cookie、localStorage、sessionStorage、IndexedD…<br>⛔**数据外传**: 脚本未发现使用 WebSocket、EventSource、navigator.sendBeacon 等网络请求方式。<br>🔴**远程代码执行**: 脚本未发现使用 eval、new Function、setTimeout(string)、setInterval(str… |
| 🟠MEDIUM | [GitHub增强 - 高速下载](./GithubEnhanced-High-Speed-Download) | 2.6.37 | GitHub、hub.whtrys.space… | ⛔**数据外传**: 脚本中存在大量第三方加速节点的网络请求，部分节点为非官方或未知来源，存在数据外传风险。<br>⛔**隐私采集**: 脚本未发现读取 document.cookie、localStorage、sessionStorage、IndexedD…<br>🔴**远程代码执行**: 脚本未发现使用 eval、new Function、setTimeout(string)、setInterval(str…<br>🔴**代码混淆**: 脚本未发现明显的代码混淆特征，如 base64 解码执行、字符串数组映射、大量 unicode 编码或高度压缩代码。 |
| 🟠MEDIUM | [🏷️ 小鱼标签 (UTags) - 为链接添加用户标签](./Refined_20GitHub_20_SSE_) | 0.34.2 | V2EX、X (Twitter)… | ⛔**数据外传**: 脚本使用了 GM.xmlHttpRequest 和 GM_xmlhttpRequest 进行网络请求，连接目标包括第三方…<br>🟠**权限滥用**: 脚本申请了大量 GM_* 权限，但部分权限未必被使用，存在权限滥用风险。<br>🟠**供应链风险**: @connect 使用了通配符 *，可能导致任意网络请求，存在供应链风险。 |
| 🟠MEDIUM | [GitHub 中文化插件](./main) | 1.9.3-2026-04-12 | GitHub主站、GitHub技能站… | ⛔**数据外传**: 脚本使用 GM_xmlhttpRequest 向第三方翻译服务 fanyi.iflyrec.com 发送用户页面内容进行…<br>⛔**隐私采集**: 脚本读取并使用 GM_getValue 和 GM_setValue 存储配置，但未发现读取 document.cooki…<br>🔴**远程代码执行**: 脚本未使用 eval、new Function、setTimeout(string)、setInterval(strin…<br>🔴**代码混淆**: 脚本未发现明显代码混淆特征，如 base64 解码执行、字符串数组映射、大量 unicode 编码或高度压缩代码。 |
