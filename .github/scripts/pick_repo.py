"""setup job 专用脚本：读取 target-repos.json 中所有目标仓库，构建 matrix 供 run job 并行处理。

调用链路：
  workflow setup job
      → 运行本脚本
      → 将所有仓库信息序列化为 JSON matrix 写入 GITHUB_OUTPUT
      → run job 通过 strategy.matrix 并行为每个仓库独立运行一次流水线

target-repos.json 中 repos 支持两种格式：
  1. 字符串：直接写 "owner/repo"，token secret 名由 owner 自动推导
         "knewbeing/repo-a"  →  token_env_name = KNEWBEING_GITHUB_TOKEN
  2. 对象：显式指定 secret_name，适合同 owner 下多仓库共用一个 key
         {"repo": "cnjimbo/repo-b", "secret_name": "CNJIMBO_GITHUB_TOKEN"}

输出到 GITHUB_OUTPUT 的变量：
  matrix  — JSON 数组，每项包含 repo（仓库名）和 token_env_name（secret 名）
            示例：[{"repo":"org-a/r1","token_env_name":"ORG_A_GITHUB_TOKEN"}, ...]
"""

from __future__ import annotations

import json
import os
import sys
from pathlib import Path

# target-repos.json 位于仓库根目录（本文件在 .github/scripts/ 下，向上三级）
_REPOS_FILE = Path(__file__).parent.parent.parent / "target-repos.json"


def default_token_env_name(repo_full_name: str) -> str:
    """根据仓库 owner 推导约定的 token 环境变量名（无显式配置时使用）。

    规则：owner 转大写，连字符换下划线，拼接 _GITHUB_TOKEN
    示例：
      "another-org/repo"  → ANOTHER_ORG_GITHUB_TOKEN
      "some-user/repo"    → SOME_USER_GITHUB_TOKEN
    """
    owner = repo_full_name.split("/")[0]
    return owner.upper().replace("-", "_") + "_GITHUB_TOKEN"


def parse_entry(entry: str | dict) -> tuple[str, str]:
    """解析 repositories 中的一项，返回 (repo_full_name, token_env_name)。

    支持两种格式：
      - 字符串：  "owner/repo"
      - 对象：    {"repo": "owner/repo", "secret_name": "MY_SECRET_KEY"}
                  secret_name 缺省时自动推导
    """
    if isinstance(entry, str):
        repo = entry.strip()
        return repo, default_token_env_name(repo)

    repo = entry["repo"].strip()
    # 优先使用显式配置的 secret_name，否则按 owner 自动推导
    token_env = entry.get("secret_name") or default_token_env_name(repo)
    return repo, token_env


def main() -> None:
    with open(_REPOS_FILE) as fh:
        config = json.load(fh)

    # 支持手动触发时通过 REPO_OVERRIDE 只处理单个仓库（用于调试）
    repo_override = os.environ.get("REPO_OVERRIDE", "").strip()
    if repo_override:
        raw_entries = [repo_override]
    else:
        raw_entries: list = config.get("repos", [])
        if not raw_entries:
            sys.exit("❌  target-repos.json 中没有仓库，请至少添加一条记录。")

    # 构建 matrix 数组：每个仓库一项，包含仓库名和对应的 secret 名
    matrix = [
        {
            "repo": repo,
            "token_env_name": token_env_name,
        }
        for repo, token_env_name in (parse_entry(e) for e in raw_entries)
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
