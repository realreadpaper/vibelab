# Vibe Coding 内容枢纽站

## Problem Statement

**How Might We** 为江龙构建一个内容驱动的个人站点，既能向潜在客户/雇主展示 AI 开发能力，又能向技术社区建立 vibe coding 领域的影响力——同时支持中英双语受众？

## Recommended Direction

**内容枢纽站 (Content Hub)** —— 以 Blog 为核心的 Next.js 个人站点。

站点以内容为第一优先级：首页直接展示最新文章，而非传统的"关于我"。vibe coding 的经验复盘、工具测评、方法总结构成主要内容线。项目展示作为内容的一部分出现——每篇文章可以关联一个或多个项目，让项目在上下文中被理解，而非孤立展示。

**为什么是这个方向：**
1. Vibe coding 是新兴领域，优质内容稀缺。先入为主建立搜索排名和话语权。
2. "内容+项目"的关联展示同时满足两类受众：客户看到能力证明，同行看到方法论。
3. 内容资产的复利效应——每篇文章都是一个长期流量入口。
4. 中英双语天然扩大了覆盖面，中文内容在国内社区稀缺性更高。

**域名选择：** `jianglong.dev`（备选：`jianglong.me`、`jianglong.io`）

## 核心功能

### MVP（第一个版本）
- Blog 系统（MDX 格式，支持代码高亮）
- 中英双语路由（`/zh/blog/xxx` + `/en/blog/xxx`）
- 项目展示页（与 Blog 文章关联）
- 关于页（个人介绍 + 技能栈）
- 联系页（表单或链接）
- RSS Feed
- 暗色模式
- SEO 优化（Open Graph、sitemap、meta）

### 后续迭代
- Newsletter 订阅
- 全文搜索
- 评论系统（Giscus）
- 项目 Demo 内嵌（iframe/在线沙箱）
- 阅读统计

## Key Assumptions to Validate

- [ ] **你能持续产出内容** —— 目标每月 1-2 篇。检验方式：先写完 3 篇草稿再上线。
- [ ] **中英双语有价值** —— 检验方式：Google Analytics 观察两种语言的流量占比，3 个月后决定是否维持双语。
- [ ] **内容能带来转化** —— 检验方式：在联系页追踪来源（哪篇文章带来了咨询）。

## Not Doing (and Why)

- **用户登录/会员系统** —— 个人站点不需要，用 Disqus/Giscus 做评论即可
- **复杂的后台 CMS** —— MDX + Git 的工作流最适合个人开发者，无需数据库
- **项目自动拉取 GitHub API** —— MVP 阶段手动维护项目信息更灵活、展示质量更高
- **WebSocket/实时功能** —— 静态+SSG 优先，实时功能无必要
- **Analytics 之外的数据追踪** —— 保持轻量，用 Umami 或 Plausible 替代 Google Analytics

## Open Questions

- 第一组内容主题是什么？（vibe coding 工具横评？单个项目深度复盘？方法论总结？）
- 部署平台用 Vercel（免费、Next.js 原生支持）还是其他（Cloudflare Pages、自有服务器）？
- 视觉风格偏好？（极简黑白、Geist 风格、玻璃态、像素风...）

## 技术架构

```
Next.js 15 + App Router
├── MDX 内容管理（next-mdx-remote 或 contentlayer）
├── 国际化（next-intl 或 next-i18next）
├── 样式（Tailwind CSS + shadcn/ui）
├── 部署（Vercel / Cloudflare Pages）
├── 域名（jianglong.dev）
└── 分析（Umami 自部署 或 Plausible）
```

## 域名 & 部署流程

1. 域名查价与注册（Namecheap / Cloudflare Registrar / 阿里云）
2. DNS 配置指向部署平台
3. Next.js 项目部署到 Vercel/Cloudflare Pages
4. SSL 自动配置
5. 自定义域名绑定
