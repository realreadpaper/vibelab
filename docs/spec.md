# Spec: Vibe Coding 内容枢纽站

## Objective

为江龙构建一个**内容驱动的个人站点**——以 Blog 为核心，展示 vibe coding 项目与经验，同时面向潜在客户/雇主和全球技术社区，支持中英双语。

**目标用户：**
- 潜在客户/雇主：评估江龙的 AI 开发能力，寻找合作机会
- 技术社区/同行：学习 vibe coding 方法论，交流 AI 开发经验

**成功标准：**
- [ ] 站点在桌面端和移动端均可流畅访问
- [ ] 中英双语路由完整，语言切换无闪烁
- [ ] Blog 文章支持 MDX（代码高亮、图片、内嵌组件）
- [ ] 首页展示最新文章列表，视觉风格为玻璃态+渐变
- [ ] 项目展示页与 Blog 文章关联
- [ ] Lighthouse 评分 > 90（Performance/Accessibility/Best Practices/SEO）
- [ ] 域名 jianglong.dev 绑定并启用 HTTPS
- [ ] RSS Feed 可订阅

## Tech Stack

| 层级 | 技术 | 版本 | 用途 |
|------|------|------|------|
| 框架 | Next.js | ^15.x | App Router, SSG/RSC |
| 语言 | TypeScript | ^5.x | 类型安全 |
| 样式 | Tailwind CSS | ^4.x | 原子化 CSS + 自定义玻璃态工具类 |
| 组件 | shadcn/ui | latest | 基础 UI 组件（按钮、输入框等） |
| 内容 | next-mdx-remote | ^5.x | MDX 解析与渲染 |
| 国际化 | next-intl | ^4.x | 路由级 i18n，App Router 原生支持 |
| 动画 | framer-motion | ^12.x | 页面过渡与微交互 |
| 代码高亮 | rehype-pretty-code + shiki | latest | 代码块语法高亮 |
| 评论 | Giscus | - | GitHub Discussions 驱动 |
| 分析 | Umami | latest | 隐私友好的访问统计 |
| RSS | feed (npm) | ^4.x | RSS/Atom Feed 生成 |
| 部署 | Vercel | - | 托管 + CI/CD |
| 域名 | Cloudflare Registrar | - | 域名注册与管理 |

## Commands

```bash
# 开发
npm run dev              # 启动开发服务器 localhost:3000

# 构建
npm run build            # 生产构建

# 启动生产服务器
npm run start            # 启动生产构建

# 代码质量
npm run lint             # ESLint 检查
npm run format           # Prettier 格式化
npm run type-check       # TypeScript 类型检查

# 测试（后续添加）
npm test                 # 运行测试套件
npm test -- --coverage   # 测试覆盖率

# 内容
npm run rss              # 生成 RSS Feed（构建时自动调用）
```

## Project Structure

```
site/
├── content/                  # MDX 内容文件
│   ├── zh/                   # 中文内容
│   │   ├── blog/             # 中文博客文章
│   │   └── projects/         # 中文项目介绍
│   └── en/                   # 英文内容
│       ├── blog/             # 英文博客文章
│       └── projects/         # 英文项目介绍
├── public/                   # 静态资源
│   ├── images/               # 图片
│   └── fonts/                # 自托管字体
├── src/
│   ├── app/                  # Next.js App Router
│   │   ├── [locale]/         # 国际化路由 (/zh, /en)
│   │   │   ├── page.tsx      # 首页（文章列表）
│   │   │   ├── layout.tsx    # 语言布局（含导航）
│   │   │   ├── blog/
│   │   │   │   ├── page.tsx  # 博客列表页
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx  # 文章详情页
│   │   │   ├── projects/
│   │   │   │   ├── page.tsx  # 项目列表页
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx  # 项目详情页
│   │   │   └── about/
│   │   │       └── page.tsx  # 关于页
│   │   ├── layout.tsx        # 根布局（语言检测+重定向）
│   │   ├── page.tsx          # 根页面（重定向到默认语言）
│   │   └── sitemap.ts        # Sitemap 生成
│   ├── components/           # React 组件
│   │   ├── ui/               # shadcn/ui 基础组件
│   │   ├── layout/           # 布局组件（Header, Footer, Nav）
│   │   ├── blog/             # 博客相关组件
│   │   │   ├── BlogCard.tsx        # 博客卡片
│   │   │   ├── BlogList.tsx        # 博客列表
│   │   │   └── MDXContent.tsx      # MDX 渲染器
│   │   ├── projects/         # 项目相关组件
│   │   │   ├── ProjectCard.tsx     # 项目卡片
│   │   │   └── ProjectList.tsx     # 项目列表
│   │   └── shared/           # 共享组件
│   │       ├── LanguageSwitcher.tsx # 语言切换
│   │       ├── ThemeToggle.tsx      # 暗色/亮色切换
│   │       └── GlassCard.tsx        # 玻璃态卡片容器
│   ├── lib/                  # 工具函数
│   │   ├── mdx.ts            # MDX 解析与读取
│   │   ├── i18n.ts           # 国际化配置
│   │   └── utils.ts          # 通用工具
│   ├── hooks/                # 自定义 hooks
│   └── styles/               # 全局样式
│       └── globals.css       # Tailwind + 自定义玻璃态样式
├── messages/                 # 国际化翻译文件（next-intl）
│   ├── zh.json               # 中文翻译
│   └── en.json               # 英文翻译
├── next.config.ts            # Next.js 配置
├── tailwind.config.ts        # Tailwind 配置
├── tsconfig.json             # TypeScript 配置
├── package.json              # 依赖与脚本
└── docs/                     # 项目文档
    ├── ideas/                # 方案探索
    └── spec.md               # 本规格文档
```

## Code Style

### 组件示例

```tsx
// src/components/blog/BlogCard.tsx
import { Link } from "@/lib/i18n";
import { GlassCard } from "@/components/shared/GlassCard";
import type { BlogPost } from "@/lib/mdx";

interface BlogCardProps {
  post: BlogPost;
  locale: "zh" | "en";
}

export function BlogCard({ post, locale }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} locale={locale}>
      <GlassCard
        as="article"
        className="group h-full p-6 transition-all duration-300 hover:scale-[1.02] hover:bg-white/10"
      >
        <time className="text-sm text-white/60">
          {new Date(post.date).toLocaleDateString(
            locale === "zh" ? "zh-CN" : "en-US"
          )}
        </time>
        <h3 className="mt-2 text-xl font-semibold text-white">
          {post.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-white/70">
          {post.excerpt}
        </p>
      </GlassCard>
    </Link>
  );
}
```

### 约定

- **文件名:** 组件用 PascalCase (`BlogCard.tsx`)，工具函数用 kebab-case (`mdx.ts`)
- **导出:** 组件用命名导出，页面用默认导出（Next.js 要求）
- **路径别名:** `@/` 映射到 `src/`
- **类型:** interface 优先于 type（组件 props），类型文件与组件同目录
- **国际化:** 所有面向用户的字符串通过 `next-intl` 的 `useTranslations` 获取
- **样式:** 优先 Tailwind 原子类，复杂玻璃态效果用 `GlassCard` 组件封装

### MDX Frontmatter 规范

```yaml
---
title: "用 Cursor 在 2 小时内构建一个 Chrome 扩展"
date: "2026-04-15"
excerpt: "从 idea 到发布，一个完整的 vibe coding 过程记录"
tags: ["cursor", "chrome-extension", "vibe-coding"]
project: "tab-ai"          # 关联的项目 slug（可选）
cover: "/images/blog/cursor-chrome.png"  # 封面图（可选）
---
```

## Visual Design: 玻璃态+渐变

### 色彩系统

```
Background: 深色渐变底
  gradient-1: from-slate-950 via-purple-950 to-slate-950

Glass Surface:
  bg: rgba(255, 255, 255, 0.05)
  border: rgba(255, 255, 255, 0.1)
  backdrop-filter: blur(20px)

Accent:
  primary: #a78bfa (purple-400)
  secondary: #60a5fa (blue-400)
  gradient-accent: from-purple-500 via-violet-500 to-blue-500

Text:
  primary: rgba(255, 255, 255, 0.95)
  secondary: rgba(255, 255, 255, 0.65)
  muted: rgba(255, 255, 255, 0.4)
```

### 玻璃态 CSS 工具类

```css
@layer components {
  .glass {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
  }

  .glass-hover {
    @apply transition-all duration-300;
  }
  .glass-hover:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 255, 255, 0.2);
  }

  .gradient-text {
    @apply bg-gradient-to-r from-purple-400 via-violet-400 to-blue-400 bg-clip-text text-transparent;
  }
}
```

### 设计参考

- 整体氛围：深色背景 + 紫蓝色调渐变光晕
- 卡片：玻璃态悬浮，圆角 16px，微边框
- 排版：大标题用 gradient-text，正文白底 65% 透明度
- 动效：页面切换 fade + 微位移，卡片 hover 微放大
- 暗色模式默认为主（玻璃态在深底上效果最佳），亮色模式作为备选

## Testing Strategy

| 层级 | 工具 | 范围 |
|------|------|------|
| 类型检查 | TypeScript | 编译时全部文件 |
| 代码规范 | ESLint + Prettier | 全部文件 |
| 构建验证 | `next build` | 所有页面 SSG 成功生成 |
| 视觉验收 | 手动 | Chrome/Safari/Firefox + 移动端 |
| Lighthouse | Chrome DevTools | 首页、博客页、项目页 |
| Link Check | `next build` 输出 | 无死链 |

MVP 阶段不添加单元测试和 E2E 测试，通过 TypeScript + ESLint + 构建验证保证质量。

## Boundaries

### Always Do
- `next build` 成功后再部署
- 中英双语内容始终保持同步更新
- 所有图片使用 `next/image` 优化
- MDX frontmatter 字段完整（title, date, excerpt, tags）

### Ask First
- 添加新的 npm 依赖
- 修改 next.config.ts
- 更改国际化方案（如从 next-intl 换到其他库）
- 添加第三方脚本（Analytics 除外）

### Never Do
- 提交 `.env` 文件或硬编码密钥
- 删除 `public/` 中的图片而不确认是否有引用
- 修改 `content/` 目录结构而不更新读取逻辑
- 在 MDX 中内嵌大段 HTML（应使用组件）

## Success Criteria

- [ ] 站点部署到 https://jianglong.dev，HTTPS 正常
- [ ] `/zh` 和 `/en` 路由均可访问，内容独立
- [ ] 首页展示最新 5 篇博客文章
- [ ] 博客详情页正确渲染 MDX（代码高亮、图片、链接）
- [ ] 项目展示页列出所有项目，并与对应博客文章关联
- [ ] 关于页有个人介绍和联系方式
- [ ] Glass Card 在所有现代浏览器中正常显示（含 Safari backdrop-filter）
- [ ] 暗色/亮色模式可切换
- [ ] RSS Feed 可被 RSS 阅读器正确解析
- [ ] 移动端（375px 宽度）布局正常
- [ ] 首屏加载 < 3s（Lighthouse Performance > 90）
- [ ] 至少有 1 篇中文 + 1 篇英文示例文章上线

## Open Questions

- [x] 视觉风格 → 玻璃态+渐变
- [x] 域名 → jianglong.dev
- [x] 内容语言 → 中英双语
- [x] 部署平台 → Vercel
- [ ] Giscus 评论系统是否 MVP 就需要？（建议：先不加，内容多了再说）
- [ ] Newsletter 订阅？→ 不在 MVP，后续迭代
- [x] 英文品牌名 → Long Jiang
