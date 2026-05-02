# Implementation Tasks

## Phase A: 项目骨架

- [ ] **Task A1: 初始化 Next.js 项目**
  - Acceptance: `create-next-app` 完成，`npm run dev` 可启动
  - Verify: 浏览器访问 localhost:3000 看到 Next.js 欢迎页
  - Files: 全部项目脚手架文件

- [ ] **Task A2: 安装依赖包**
  - Acceptance: `package.json` 包含所有必要依赖
  - Verify: `npm ls` 无报错，`npm run dev` 正常
  - Files: `package.json`, `package-lock.json`

- [ ] **Task A3: 配置 Tailwind CSS 4 + 玻璃态样式**
  - Acceptance: 玻璃态 CSS 工具类定义完成，globals.css 导入
  - Verify: 写一个测试 div 使用 `.glass` 类，浏览器中看到毛玻璃效果
  - Files: `src/styles/globals.css`, `tailwind.config.ts`（如需要）

- [ ] **Task A4: 配置 next-intl 国际化路由**
  - Acceptance: `/zh` 和 `/en` 路由可访问，语言中间件工作
  - Verify: 访问 `/zh` 和 `/en` 返回不同内容
  - Files: `src/middleware.ts`, `src/i18n.ts`, `messages/zh.json`, `messages/en.json`, `next.config.ts`

- [ ] **Task A5: 配置 ESLint + Prettier + TypeScript**
  - Acceptance: `npm run lint` 和 `npm run format` 正常工作
  - Verify: 运行 lint 和 format 无报错
  - Files: `eslint.config.mjs`, `.prettierrc`, `tsconfig.json`

## Phase B: 核心组件

- [ ] **Task B1: 实现 GlassCard 组件**
  - Acceptance: 玻璃态卡片，支持 hover、暗色/亮色模式
  - Verify: 浏览器中卡片显示毛玻璃效果，Safari 兼容
  - Files: `src/components/shared/GlassCard.tsx`

- [ ] **Task B2: 实现 Header + 导航 + LanguageSwitcher**
  - Acceptance: 导航栏固定在顶部，包含语言切换和主题切换
  - Verify: 语言切换后 URL 从 `/zh` 跳到 `/en`，主题切换后 icon 变化
  - Files: `src/components/layout/Header.tsx`, `src/components/shared/LanguageSwitcher.tsx`, `src/components/shared/ThemeToggle.tsx`

- [ ] **Task B3: 实现 Footer**
  - Acceptance: 包含社交链接、RSS 链接、版权信息
  - Verify: Footer 正确显示在页面底部
  - Files: `src/components/layout/Footer.tsx`

- [ ] **Task B4: 实现暗色/亮色模式**
  - Acceptance: next-themes 集成，默认暗色，手动可切换
  - Verify: 切换模式后所有组件颜色响应变化
  - Files: `src/components/shared/ThemeProvider.tsx`（或内置于 layout）

- [ ] **Task B5: 实现首页布局框架**
  - Acceptance: Hero 区（名字 + 一句话介绍 + 渐变背景）+ 最新文章列表区
  - Verify: 首页渲染符合玻璃态+渐变设计稿
  - Files: `src/app/[locale]/page.tsx`, `src/app/[locale]/layout.tsx`

## Phase C: 内容系统

- [ ] **Task C1: 定义 MDX 类型与读取工具**
  - Acceptance: `BlogPost` 和 `Project` 类型定义完整，`getAllPosts()` 等函数可用
  - Verify: `console.log(getAllPosts('zh'))` 返回正确的文章列表
  - Files: `src/lib/mdx.ts`

- [ ] **Task C2: 实现 MDXContent 渲染组件**
  - Acceptance: MDX 正确渲染，代码块有语法高亮，支持自定义组件嵌入
  - Verify: 渲染一篇测试 MDX，检查代码高亮、图片、链接是否正常
  - Files: `src/components/blog/MDXContent.tsx`

- [ ] **Task C3: 实现 Blog 列表页 + BlogCard**
  - Acceptance: 博客列表页展示所有文章，按日期倒序，卡片显示封面/标题/日期/摘要
  - Verify: `/zh/blog` 列出中文文章，`/en/blog` 列出英文文章
  - Files: `src/components/blog/BlogCard.tsx`, `src/app/[locale]/blog/page.tsx`

- [ ] **Task C4: 实现 Blog 详情页**
  - Acceptance: 文章详情页渲染 MDX 内容，显示标题/日期/tags/关联项目
  - Verify: 点击文章卡片进入详情页，内容完整渲染
  - Files: `src/app/[locale]/blog/[slug]/page.tsx`

- [ ] **Task C5: 实现 Project 列表页 + ProjectCard**
  - Acceptance: 项目列表页展示所有项目，卡片显示项目名称/描述/技术栈
  - Verify: `/zh/projects` 和 `/en/projects` 各自显示对应语言的项目
  - Files: `src/components/projects/ProjectCard.tsx`, `src/app/[locale]/projects/page.tsx`

- [ ] **Task C6: 实现 Project 详情页 + Blog 关联**
  - Acceptance: 项目详情页展示完整信息 + 关联的博客文章列表
  - Verify: 项目详情页中点击关联文章链接可跳转
  - Files: `src/app/[locale]/projects/[slug]/page.tsx`

- [ ] **Task C7: 准备示例内容**
  - Acceptance: 1 篇中文博客 + 1 篇英文博客 + 1 个项目介绍
  - Verify: 内容在站点中正确显示
  - Files: `content/zh/blog/*.mdx`, `content/en/blog/*.mdx`, `content/zh/projects/*.mdx`, `content/en/projects/*.mdx`

## Phase D: 补充页面与 SEO

- [ ] **Task D1: 实现 About 页**
  - Acceptance: 中英双语个人介绍，包含技能栈、背景、社交链接
  - Verify: `/zh/about` 和 `/en/about` 显示对应语言介绍
  - Files: `src/app/[locale]/about/page.tsx`

- [ ] **Task D2: 实现 Contact 页**
  - Acceptance: 联系方式展示（Email、GitHub、Twitter/X 等）
  - Verify: 联系方式链接可点击
  - Files: `src/app/[locale]/contact/page.tsx`（或在 about 页中）

- [ ] **Task D3: 实现 RSS Feed 生成**
  - Acceptance: `/rss.xml` 和 `/zh/rss.xml`、`/en/rss.xml` 可用
  - Verify: RSS Reader 可订阅并正确显示文章
  - Files: `src/app/rss.xml/route.ts`（或 `src/lib/rss.ts`）

- [ ] **Task D4: 实现 Sitemap + SEO**
  - Acceptance: `sitemap.xml` 自动生成，每页有正确的 title/description/OG meta
  - Verify: Lighthouse SEO 评分 100
  - Files: `src/app/sitemap.ts`, `src/app/[locale]/layout.tsx`（metadata）

- [ ] **Task D5: 实现 404 页面**
  - Acceptance: 未匹配路由显示自定义 404 页（中英双语）
  - Verify: 访问 `/zh/nonexistent` 显示中文 404
  - Files: `src/app/[locale]/not-found.tsx`

## Phase E: 部署

- [ ] **Task E1: 注册域名 jianglong.dev**
  - Acceptance: 域名购买成功，在 Cloudflare 面板中可见
  - Verify: `whois jianglong.dev` 显示你的注册信息

- [ ] **Task E2: 创建 Vercel 项目并部署**
  - Acceptance: `next build` 成功，Vercel 自动部署成功
  - Verify: Vercel 提供的默认域名（xxx.vercel.app）可访问

- [ ] **Task E3: 绑定自定义域名 + DNS**
  - Acceptance: jianglong.dev DNS 指向 Vercel，SSL 激活
  - Verify: `https://jianglong.dev` 可访问，HTTPS 有效

- [ ] **Task E4: 集成 Umami Analytics**
  - Acceptance: Umami 脚本注入，后台有访问数据
  - Verify: 访问站点后 Umami 面板收到 event

## Phase F: 上线初始化

- [ ] **Task F1: 完善初始内容**
  - Acceptance: 至少 1 篇中文 + 1 篇英文真实文章，1-2 个项目
  - Verify: 站点上线后内容完整可读

- [ ] **Task F2: Lighthouse 验证**
  - Acceptance: Performance > 90, Accessibility > 90, Best Practices > 90, SEO > 90
  - Verify: Chrome DevTools Lighthouse report

- [ ] **Task F3: 搜索引擎提交**
  - Acceptance: Google Search Console + Bing Webmaster 提交 sitemap
  - Verify: Search Console 显示 sitemap 已索引

## 并行可能性

```
A1 → A2 → A3 ──→ B1 → B2 → B3 → B4 ──→ B5
     ↘          ↗
     A4 → A5 ──┘

C1 → C2 → C3 → C4
              ↘
               C5 → C6 → C7

D1、D2、D3、D4 可并行开发

E1 可与 A-D 并行（域名注册不依赖代码）
E2 → E3 → E4 依赖 D 阶段完成

F 依赖 E 全部完成
```
