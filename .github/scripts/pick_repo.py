"""setup job 专用脚本：读取 repos.json 中所有目标仓库，构建 matrix 供 run job 并行处理。

调用链路：
  workflow setup job
      → 运行本脚本
      → 将所有仓库信息序列化为 JSON matrix 写入 GITHUB_OUTPUT
      → run job 通过 strategy.matrix 并行为每个仓库独立运行一次流水线

输出到 GITHUB_OUTPUT 的变量：
  matrix  — JSON 数组，每项包含 repo（仓库名）和 token_env_name（secret 名）
            示例：[{"repo":"org-a/r1","token_env_name":"ORG_A_GITHUB_TOKEN"}, ...]
"""

from __future__ import annotations

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

    # 支持手动触发时通过 REPO_OVERRIDE 只处理单个仓库（用于调试）
    repo_override = os.environ.get("REPO_OVERRIDE", "").strip()
    if repo_override:
        entries = [repo_override]
    else:
        entries: list = config.get("repositories", [])
        if not entries:
            sys.exit("❌  repos.json 中没有仓库，请至少添加一条记录。")

    # 构建 matrix 数组：每个仓库一项，包含仓库名和对应的 secret 名
    matrix = [
        {
            "repo": repo,
            "token_env_name": org_token_env_name(repo),
        }
        for repo in entries
    ]

    matrix_json = json.dumps(matrix, ensure_ascii=False)

    # 写入 GITHUB_OUTPUT → run job 通过 fromJson(needs.setup.outputs.matrix) 读取
    github_output = os.environ.get("GITHUB_OUTPUT")
    if github_output:
        with open(github_output, "a") as fh:
            fh.write(f"matrix={matrix_json}\n")
    else:
        # 本地测试时直接打印
        print(f"matrix={matrix_json}")


if __name__ == "__main__":
    main()
