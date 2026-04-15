# 托管脚本列表

暂无托管脚本。请在 `target-repos.json` 的 `userscripts` 数组中添加脚本地址，流水线将在下次运行时自动同步。

## 如何添加脚本

编辑项目根目录的 `target-repos.json`：

```json
{
  "userscripts": [
    "https://raw.githubusercontent.com/owner/repo/main/script.user.js",
    "https://github.com/owner/repo/blob/main/script.user.js"
  ]
}
```

支持的 URL 格式：
- GitHub Raw 地址（`raw.githubusercontent.com`）
- GitHub Blob 地址（自动转换为 Raw）
- GreasyFork 脚本地址
