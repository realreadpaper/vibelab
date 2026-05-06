# 博客内容更新实施计划

> **给 agentic workers：** 必需子技能：使用 superpowers:subagent-driven-development（推荐）或 superpowers:executing-plans 按任务实施此计划。步骤使用 checkbox（`- [ ]`）语法跟踪进度。

**目标：** 新增两篇真实项目复盘博客，并删除站点样例博客。

**架构：** 站点通过 `content/{locale}/blog/*.mdx` 管理博客。每篇文章使用相同 slug 的中英 MDX 文件，front matter 保持 `title/date/excerpt/tags` 结构，正文使用普通 MDX Markdown。

**技术栈：** Next.js 16、MDX、gray-matter、TypeScript。

---

### Task 1: 新增自动翻译插件文章

**Files:**
- 新建：`content/zh/blog/immersive-ai-translate-plugin.mdx`
- 新建：`content/en/blog/immersive-ai-translate-plugin.mdx`

- [x] **步骤 1：写中文文章**

文章结构固定为：背景、我先让 Codex 做的不是写代码、架构拆分、关键提示词、PDF/YouTube 扩展、验证。

- [x] **步骤 2：写英文文章**

英文版保持相同信息密度，不逐字翻译，保留代码标识符原文。

### Task 2: 新增 Code-OSS RemoteAI 文章

**Files:**
- 新建：`content/zh/blog/code-oss-remote-ai-ssh.mdx`
- 新建：`content/en/blog/code-oss-remote-ai-ssh.mdx`

- [x] **步骤 1：写中文文章**

文章结构固定为：目标、为什么不是 SFTP、为什么 fork Code-OSS、Remote-SSH 自研层、Codex bridge、安全与验证。

- [x] **步骤 2：写英文文章**

英文版保持相同信息密度，不逐字翻译，保留产品名和命令原文。

### Task 3: 删除样例文章

**Files:**
- 删除：`content/zh/blog/vibe-coding-intro.mdx`
- 删除：`content/en/blog/vibe-coding-intro.mdx`

- [x] **步骤 1：删除中英样例文件**

删除后博客列表只剩两篇真实文章。

### Task 4: 验证站点

**Files:**
- 检查：所有新增/删除内容文件

- [x] **步骤 1：运行类型检查**

运行：`npm run type-check`

预期：exit 0。

- [x] **步骤 2：运行 lint**

运行：`npm run lint`

预期：exit 0。

- [x] **步骤 3：运行构建**

运行：`npm run build`

预期：exit 0。
