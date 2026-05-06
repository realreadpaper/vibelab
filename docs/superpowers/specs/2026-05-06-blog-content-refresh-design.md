# 博客内容更新设计文档

**日期：** 2026-05-06

**状态：** 已确认执行

## 1. 目标

本次更新把站点从样例内容切换为两篇真实项目复盘文章：

- 自动翻译插件：基于 `/Users/jianglong/Desktop/project/translate`，讲清楚沉浸式 AI 翻译插件的核心架构、关键提示词、分段翻译、PDF/YouTube 扩展路径和验证方式。
- Code-OSS RemoteAI：基于 `/Users/jianglong/Desktop/project/fuck_remote`，讲清楚为什么选择 fork Code-OSS、如何通过 SSH 支持远端 AI workspace，以及如何让 Codex 执行真正落在远端。

同时删除现有 `vibe-coding-intro` 样例文章，避免博客列表继续展示占位内容。

## 2. 内容口径

两篇文章都采用“实战复盘”而不是 README 搬运：

- 先讲问题和判断。
- 再讲架构如何拆。
- 再讲关键实现和提示词。
- 最后讲验证、踩坑和下一步。

自动翻译插件文章强调：

- DOM 提取、`segment id`、批量翻译和译文回填的稳定性。
- Provider 抽象如何把 DeepSeek、OpenAI-compatible 和传统翻译服务隔开。
- 面向网页、PDF、YouTube 的目标检测与 renderer 分层。
- 模型输出 JSON contract 的提示词约束和容错解析。

RemoteAI 文章强调：

- Codex 是 VS Code extension，不是普通 CLI wrapper。
- 完整远程体验需要 Code-OSS Remote Authority、Remote Agent、Remote Extension Host、FileService、Terminal、Search、Git、LSP/DAP。
- 自研 Remote-SSH resolver、server bootstrap、server packaging、CentOS 7 ABI gate。
- `ai-codex-remote-bridge`、远程 Linux Codex CLI、approval UI 与 workspace sandbox。

## 3. 文件范围

新建：

- `content/zh/blog/immersive-ai-translate-plugin.mdx`
- `content/en/blog/immersive-ai-translate-plugin.mdx`
- `content/zh/blog/code-oss-remote-ai-ssh.mdx`
- `content/en/blog/code-oss-remote-ai-ssh.mdx`
- `docs/superpowers/plans/2026-05-06-blog-content-refresh.md`

删除：

- `content/zh/blog/vibe-coding-intro.mdx`
- `content/en/blog/vibe-coding-intro.mdx`

## 4. 验证

完成后运行：

- `npm run type-check`
- `npm run lint`
- `npm run build`

若构建或 lint 暴露与内容无关的既有问题，需要在最终说明中明确。
