---
title: "Deadshot.io ESP & Memory Aimbot & Silent Aimbot & No recoil"
---

# Deadshot.io ESP & Memory Aimbot & Silent Aimbot & No recoil



<a href="https://raw.githubusercontent.com/knewbeing/safescripts/main/userscripts/discovered/Deadshotio_ESP_Memory_Aimbot_Silent_Aimbot_No_recoil.user.js" class="tm-install-btn">📥 安装到 Tampermonkey</a>

> 版本：**1.0.6**　　发现时间：**2026-04-20**　　来源：[GreasyFork](https://greasyfork.org/scripts/572110-deadshot-io-esp-memory-aimbot-silent-aimbot-no-recoil) <Badge type="tip" text="GreasyFork" />　　安装量：**827**　　评分：👍4 / 👎2

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

**风险等级**：⛔ CRITICAL　　**安全评分**：35/100　　**分析时间**：2026-05-25

> 该脚本存在严重安全风险：动态加载并执行第三方服务器的代码，使用 eval，修改 WebAssembly API，申请高权限并允许与非官方域名通信。未检测到隐私采集和代码混淆，但远程代码执行和数据外传风险极高，建议禁止使用。

| 检查项 | 结果 |
|--------|------|
| 数据外传 | ❌ 检测到（目标：deadshot-cheat.netlify.app） |
| 隐私采集 | ✅ 未检测到 |
| 代码混淆 | ✅ 未检测到 |
| WebSocket/SSE | ✅ 未使用 |
| DOM XSS 风险 | ✅ 未检测到 |
| 供应链风险 | ⚠️ 存在风险 |

### 发现的问题

**⛔ CRITICAL** — Data Exfiltration & Remote Code Execution  
> 脚本通过 GM_xmlhttpRequest 向 deadshot-cheat.netlify.app 发起网络请求，动态加载并执行远程 JavaScript 代码，存在数据外传和远程代码执行风险。  
> 位置：fetchAndCacheCode() 函数，GM_xmlhttpRequest 调用  
> 建议：禁止动态加载和执行远程代码，移除对第三方服务器的请求。

**🔴 HIGH** — Remote Code Execution  
> 脚本使用 eval() 执行从第三方服务器获取的代码，存在远程代码执行风险。  
> 位置：patchImports() 函数，(0, eval)(customCode)  
> 建议：禁止使用 eval 执行外部代码，采用本地受信任代码。

**🔴 HIGH** — Remote Code Execution  
> 脚本通过 WebAssembly.instantiate 和 WebAssembly.instantiateStreaming 的 monkey patch，允许远程代码在 WASM 导入时执行，增加攻击面。  
> 位置：WebAssembly.instantiate/instantiateStreaming 重写  
> 建议：避免修改 WebAssembly API，禁止远程代码注入。

**🟠 MEDIUM** — Permission Abuse  
> 脚本申请了 GM_xmlhttpRequest、unsafeWindow 等高权限，但实际用途仅为远程代码加载，存在权限滥用风险。  
> 位置：元数据 @grant  
> 建议：仅申请必要权限，移除未使用或高风险权限。

**🟠 MEDIUM** — Supply Chain Risk  
> 脚本通过 @connect deadshot-cheat.netlify.app 允许与第三方服务器通信，存在供应链风险，且未固定版本哈希。  
> 位置：元数据 @connect  
> 建议：仅允许官方可信域名，固定版本哈希，避免供应链污染。

---

*由 SafeScripts 自动发现 · [查看原始来源](https://greasyfork.org/scripts/572110-deadshot-io-esp-memory-aimbot-silent-aimbot-no-recoil)*
