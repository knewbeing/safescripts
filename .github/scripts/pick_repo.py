"""setup job 专用脚本：选出今天的目标仓库，并推导所需的 token secret 名称。

调用链路：
  workflow setup job
      → 运行本脚本
      → 将 target_repo / token_env_name 写入 GITHUB_OUTPUT
      → run job 通过 needs.setup.outputs.* 读取这两个值
      → workflow 用 secrets[token_env_name] 动态查找 secret 值
      → 以环境变量 RESOLVED_ORG_TOKEN 注入 main.py

输出到 GITHUB_OUTPUT 的变量：
  target_repo     — 目标仓库，如 "another-org/my-repo"
  token_env_name  — 对应的 secret 名，如 "ANOTHER_ORG_GITHUB_TOKEN"
"""

from __future__ import annotations

import datetime
import json
import os
import sys
from pathlib import Path

# repos.json 位于仓库根目录（本文件在 .github/scripts/ 下，向上三级）
_REPOS_FILE = Path(__file__).parent.parent.parent / "repos.json"


def org_token_env_name(repo_full_name: str) -> str:
    """根据仓库 owner 推导约定的 token 环境变量名。

    规则：owner 转大写，连字符换下划线，拼接 _GITHUB_TOKEN
    示例：
      "another-org/repo"  → ANOTHER_ORG_GITHUB_TOKEN
      "some-user/repo"    → SOME_USER_GITHUB_TOKEN
    """
    owner = repo_full_name.split("/")[0]
    return owner.upper().replace("-", "_") + "_GITHUB_TOKEN"


def main() -> None:
    with open(_REPOS_FILE) as fh:
        config = json.load(fh)

    # 支持手动触发时通过 REPO_OVERRIDE 指定目标仓库，跳过轮询逻辑
    repo_override = os.environ.get("REPO_OVERRIDE", "").strip()
    if repo_override:
        target_repo = repo_override
    else:
        # 按一年中的第几天轮询选取仓库，确保每天处理不同仓库
        entries: list = config.get("repositories", [])
        if not entries:
            sys.exit("❌  repos.json 中没有仓库，请至少添加一条记录。")
        idx = (datetime.date.today().timetuple().tm_yday - 1) % len(entries)
        target_repo = entries[idx]

    # 推导该 org/user 对应的 secret 名（由 workflow 用于动态查找 secret 值）
    token_env_name = org_token_env_name(target_repo)

    # 写入 GITHUB_OUTPUT → run job 可通过 needs.setup.outputs.* 读取
    github_output = os.environ.get("GITHUB_OUTPUT")
    if github_output:
        with open(github_output, "a") as fh:
            fh.write(f"target_repo={target_repo}\n")
            fh.write(f"token_env_name={token_env_name}\n")
    else:
        # 本地测试时直接打印
        print(f"target_repo={target_repo}")
        print(f"token_env_name={token_env_name}")


if __name__ == "__main__":
    main()
