"""内置通用推荐 Copilot 工具集。

当 Trending 分析未发现适合目标仓库的工具时，安装此处定义的通用工具。
内容直接嵌入代码，无需网络下载，保证离线可用。
"""

from __future__ import annotations

# ── 工具条目结构 ─────────────────────────────────────────────────────
# type:       "instruction" | "agent" | "skill"
# name:       文件名（不含扩展名）
# suffix:     文件扩展名（含点）
# target_dir: 相对于仓库根目录的目标子目录
# content:    文件内容（直接写入，无需下载）
# source_repo: 来源标记（用于 PR 展示）
# download_url: None（内置工具无需下载）

_DEFAULT_TOOLS: list[dict] = [
    # ── Instructions ─────────────────────────────────────────────────
    {
        "type": "instruction",
        "name": "general-coding",
        "suffix": ".instructions.md",
        "target_dir": ".github/instructions",
        "source_repo": "built-in/recommended",
        "download_url": None,
        "content": """\
---
applyTo: "**"
---
# General Coding Instructions

Follow these principles when writing or reviewing code:

- **Clean Code**: Use meaningful names; keep functions small and focused (single responsibility).
- **DRY / SOLID**: Avoid duplication; prefer composition over deep inheritance.
- **Error Handling**: Always handle errors and edge cases explicitly; never swallow exceptions silently.
- **Type Safety**: Use type hints / annotations wherever the language supports them.
- **Comments**: Explain *why*, not *what*; let clear code explain itself.
- **Testing**: Write or update tests for every change; cover edge cases and error paths.
- **Security**: Validate all inputs; never log secrets; follow least-privilege for permissions.
- **Performance**: Profile before optimising; prefer readability over premature optimisation.
""",
    },
    {
        "type": "instruction",
        "name": "code-review",
        "suffix": ".instructions.md",
        "target_dir": ".github/instructions",
        "source_repo": "built-in/recommended",
        "download_url": None,
        "content": """\
---
applyTo: "**"
---
# Code Review Instructions

When reviewing code, focus on:

1. **Correctness** — logic errors, off-by-one, race conditions, incorrect assumptions.
2. **Security** — injection, broken auth, insecure deserialization, exposed secrets.
3. **Error Handling** — uncaught exceptions, silent failures, missing input validation.
4. **Performance** — unnecessary I/O, N+1 queries, blocking calls in async contexts.
5. **API Design** — backwards compatibility, consistent naming, clear contracts.
6. **Test Coverage** — are new code paths covered? Are edge cases tested?
7. **Readability** — would a new team member understand this in 60 seconds?

Be constructive: suggest *how* to improve, not just *what* is wrong.
""",
    },
    # ── Agents ──────────────────────────────────────────────────────
    {
        "type": "agent",
        "name": "architect",
        "suffix": ".md",
        "target_dir": ".github/agents",
        "source_repo": "built-in/recommended",
        "download_url": None,
        "content": """\
---
name: Architect
description: Software architecture advisor for design decisions, patterns, and trade-offs
tools:
  - codebase
  - fetch
---
You are an experienced software architect with deep knowledge of design patterns,
distributed systems, and engineering trade-offs.

When asked about any design decision:
1. Clarify the core requirements and constraints.
2. Propose 2–3 viable architectural approaches.
3. Compare trade-offs explicitly (complexity, scalability, maintainability, cost).
4. Recommend the best fit with a clear rationale.
5. Highlight risks and how to mitigate them.
6. Provide concrete next steps or a skeleton implementation if helpful.

Always consider: team size, existing stack, operational burden, and future extensibility.
""",
    },
    {
        "type": "agent",
        "name": "code-reviewer",
        "suffix": ".md",
        "target_dir": ".github/agents",
        "source_repo": "built-in/recommended",
        "download_url": None,
        "content": """\
---
name: Code Reviewer
description: Thorough code review agent focusing on correctness, security, and maintainability
tools:
  - codebase
  - changes
---
You are a senior engineer performing a rigorous code review.

For every piece of code you review:
1. **Bugs & Logic** — find defects, edge-case failures, and incorrect assumptions.
2. **Security** — flag injection risks, broken auth, exposed secrets, and unsafe dependencies.
3. **Performance** — identify unnecessary work, blocking I/O, or inefficient algorithms.
4. **Maintainability** — comment on naming, complexity, and missing tests.
5. **Suggestions** — for every issue, provide a concrete fix or improved version.

Be specific: quote the problematic code, explain the risk, and show the corrected version.
""",
    },
    # ── Skills / Prompts ─────────────────────────────────────────────
    {
        "type": "skill",
        "name": "explain",
        "suffix": ".prompt.md",
        "target_dir": ".github/prompts",
        "source_repo": "built-in/recommended",
        "download_url": None,
        "content": """\
---
name: explain
description: Explain selected code in plain English with purpose, logic, and gotchas
---
Explain the following code clearly and concisely:

1. **Purpose** — what problem does it solve?
2. **How it works** — walk through the logic step by step.
3. **Key patterns** — design patterns, algorithms, or idioms used.
4. **Gotchas** — edge cases, limitations, or surprising behaviour.

${selection}
""",
    },
    {
        "type": "skill",
        "name": "refactor",
        "suffix": ".prompt.md",
        "target_dir": ".github/prompts",
        "source_repo": "built-in/recommended",
        "download_url": None,
        "content": """\
---
name: refactor
description: Suggest targeted refactoring improvements for selected code
---
Analyse the following code and propose refactoring improvements:

1. Identify code smells, anti-patterns, or violations of SOLID/DRY principles.
2. Suggest specific improvements with before/after examples.
3. Prioritise changes by impact (High / Medium / Low).
4. Ensure the refactored version preserves the original behaviour.
5. Note any tests that need updating.

${selection}
""",
    },
    {
        "type": "skill",
        "name": "test",
        "suffix": ".prompt.md",
        "target_dir": ".github/prompts",
        "source_repo": "built-in/recommended",
        "download_url": None,
        "content": """\
---
name: test
description: Generate comprehensive tests for selected code
---
Generate thorough tests for the following code using the project's existing test framework:

1. **Happy path** — standard inputs that should succeed.
2. **Edge cases** — boundary values, empty inputs, maximum sizes.
3. **Error paths** — invalid inputs, exceptions, and failure modes.
4. **Mocking** — stub external dependencies (I/O, APIs, databases) where appropriate.
5. Use clear test names that describe the scenario being tested.

${selection}
""",
    },
    {
        "type": "skill",
        "name": "document",
        "suffix": ".prompt.md",
        "target_dir": ".github/prompts",
        "source_repo": "built-in/recommended",
        "download_url": None,
        "content": """\
---
name: document
description: Generate API documentation and usage examples for selected code
---
Generate clear, professional documentation for the following code:

1. **Overview** — purpose and responsibility of the module/class/function.
2. **Parameters** — name, type, and description for every input.
3. **Returns** — type and meaning of the return value.
4. **Raises / Throws** — exceptions that may occur and when.
5. **Examples** — 1–2 realistic usage examples with expected output.
6. **Notes** — thread-safety, deprecations, or important caveats.

Use the documentation style appropriate for this language (JSDoc, docstring, XML docs, etc.).

${selection}
""",
    },
    {
        "type": "skill",
        "name": "security-review",
        "suffix": ".prompt.md",
        "target_dir": ".github/prompts",
        "source_repo": "built-in/recommended",
        "download_url": None,
        "content": """\
---
name: security-review
description: Perform a focused security review of selected code
---
Perform a security review of the following code:

1. **Injection risks** — SQL, command, LDAP, XSS, template injection.
2. **Authentication & authorisation** — missing checks, privilege escalation paths.
3. **Secrets & sensitive data** — hardcoded credentials, insecure storage, logged PII.
4. **Dependency risks** — known-vulnerable libraries or unsafe API usage.
5. **Cryptography** — weak algorithms, insecure randomness, improper key management.
6. **Input validation** — missing sanitisation, unchecked trust boundaries.

For each finding: rate severity (Critical / High / Medium / Low), explain the risk, and show the fix.

${selection}
""",
    },
]


def get_default_tools() -> list[dict]:
    """返回通用推荐工具列表（格式与 fetch_trending 扫描结果兼容）。"""
    return list(_DEFAULT_TOOLS)
