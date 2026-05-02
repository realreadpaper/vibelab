# Vibelab 维护手册

> 站点：https://vibeai.dev
> 仓库：github.com/realreadpaper/vibelab
> 部署：Vercel（自动部署）
> 技术栈：Next.js 16 + TypeScript + Tailwind CSS + MDX

---

## 目录

- [快速开始](#快速开始)
- [项目结构](#项目结构)
- [添加内容](#添加内容)
  - [添加新博客文章](#添加新博客文章)
  - [添加新项目](#添加新项目)
  - [关联博客与项目](#关联博客与项目)
  - [添加封面图](#添加封面图)
- [编辑内容](#编辑内容)
- [删除内容](#删除内容)
- [修改站点信息](#修改站点信息)
- [更新依赖](#更新依赖)
- [故障排查](#故障排查)
- [命令速查](#命令速查)

---

## 快速开始

```bash
# 1. 克隆仓库
git clone git@github.com:realreadpaper/vibelab.git
cd vibelab

# 2. 安装依赖
npm install

# 3. 启动开发服务器
npm run dev
# 打开 http://localhost:3000

# 4. 写完内容后推送
git add .
git commit -m "add: 新内容"
git push
# Vercel 自动部署，1-2 分钟后生效
```

---

## 项目结构

```
vibelab/
├── content/                    # ⭐ 你主要操作这里：所有文章和项目
│   ├── zh/                     # 中文内容
│   │   ├── blog/               #   中文博客文章 (.mdx)
│   │   └── projects/           #   中文项目介绍 (.mdx)
│   └── en/                     # 英文内容
│       ├── blog/               #   英文博客文章 (.mdx)
│       └── projects/           #   英文项目介绍 (.mdx)
│
├── messages/                   # UI 翻译文本 (JSON)
│   ├── zh.json                 #   导航、按钮等中文文本
│   └── en.json                 #   导航、按钮等英文文本
│
├── public/                     # 静态资源
│   └── images/                 #   图片放这里，引用路径 /images/xxx.png
│
├── src/
│   ├── app/                    # Next.js 页面路由
│   │   ├── [locale]/           #   语言路由 (/zh, /en)
│   │   │   ├── page.tsx        #     首页
│   │   │   ├── blog/           #     博客列表 + 详情
│   │   │   ├── projects/       #     项目列表 + 详情
│   │   │   ├── about/          #     关于页
│   │   │   └── not-found.tsx   #     404 页面
│   │   ├── feed/               #   RSS 订阅生成
│   │   └── sitemap.ts          #   搜索引擎站点地图
│   │
│   ├── components/             # React 组件
│   │   ├── blog/               #   博客卡片、MDX 渲染器
│   │   ├── projects/           #   项目卡片
│   │   ├── layout/             #   页头 (Header)、页脚 (Footer)
│   │   └── shared/             #   共享组件：玻璃卡片、主题切换等
│   │
│   ├── lib/
│   │   └── mdx.ts              # ⭐ 核心：读取/解析 MDX 文件的工具函数
│   │
│   ├── i18n.ts                 # 国际化配置
│   ├── i18n/                   # 国际化工具
│   │   ├── request.ts          #   语言请求配置
│   │   └── navigation.ts       #   国际化路由工具
│   │
│   └── globals.css             # 全局样式 + 玻璃态设计系统
│
├── docs/                       # 项目文档
│   ├── ideas/                  #   初始方案
│   ├── spec.md                 #   技术规格
│   ├── plan.md                 #   实施计划
│   ├── tasks.md                #   任务拆分
│   └── maintenance.md          #   本维护手册
│
├── next.config.ts              # Next.js 配置
├── package.json                # 依赖与脚本
└── tsconfig.json               # TypeScript 配置
```

---

## 添加内容

### 添加新博客文章

**步骤 1：创建 MDX 文件**

在 `content/zh/blog/` 和 `content/en/blog/` 下各创建一个 `.mdx` 文件。**文件名将作为 URL slug**（建议用英文 + 连字符，如 `my-vibe-coding-setup.mdx`）。

```
content/zh/blog/my-vibe-coding-setup.mdx   # 中文版
content/en/blog/my-vibe-coding-setup.mdx   # 英文版
```

**步骤 2：填写 frontmatter + 正文**

```mdx
---
title: "我的 Vibe Coding 工具配置"
date: "2026-05-15"
excerpt: "分享我目前使用的 AI 开发工具链和工作流配置"
tags: ["vibe-coding", "cursor", "claude", "工具链"]
project: "ai-travel-planner"     # 可选：关联项目 slug
cover: "/images/blog/setup.png" # 可选：封面图路径
---

## 编辑器

我主要使用 Cursor，配合以下扩展...

## AI 模型选择

根据不同任务选择不同的模型...

```ts
// 代码示例
const config = {
  editor: "Cursor",
  model: "Claude 4.5",
};
```

> 引用块：Vibe Coding 不在于不写代码，而在于让 AI 处理重复的部分。

**阅读更多：** [Cursor 官方文档](https://docs.cursor.com)
```

**字段说明：**

| 字段 | 必填 | 说明 |
|------|------|------|
| `title` | 是 | 文章标题 |
| `date` | 是 | 发布日期，格式 `YYYY-MM-DD` |
| `excerpt` | 是 | 摘要，显示在卡片和搜索结果中 |
| `tags` | 否 | 标签列表，用逗号分隔 |
| `project` | 否 | 关联的项目 slug（文件名去掉 .mdx），不填则不关联 |
| `cover` | 否 | 封面图路径，不填则只显示文字卡片 |

**步骤 3：更新上线**

```bash
git add content/
git commit -m "add: 我的 Vibe Coding 工具配置"
git push
```

---

### 添加新项目

**步骤 1：创建 MDX 文件**

```
content/zh/projects/my-new-project.mdx
content/en/projects/my-new-project.mdx
```

**步骤 2：填写内容**

```mdx
---
title: "AI 代码审查助手"
description: "自动审查 Pull Request 的 AI 工具，支持中英文注释"
techs: ["Next.js", "OpenAI", "GitHub API", "Prisma"]
demoUrl: "https://demo.example.com"
sourceUrl: "https://github.com/realreadpaper/ai-reviewer"
order: 2
---

## 项目背景

在日常开发中，代码审查占用大量时间...

## 核心功能

- 自动检测代码问题
- 生成中文审查意见
- 支持自定义规则
```

**字段说明：**

| 字段 | 必填 | 说明 |
|------|------|------|
| `title` | 是 | 项目名称 |
| `description` | 是 | 一句话描述 |
| `techs` | 否 | 技术栈列表 |
| `demoUrl` | 否 | 在线 Demo 地址，不填不显示按钮 |
| `sourceUrl` | 否 | 源代码地址（GitHub），不填不显示按钮 |
| `order` | 否 | 排序数字，越小越靠前，默认 99 |

---

### 关联博客与项目

在博客文章的 frontmatter 中设置 `project` 字段：

```yaml
project: "ai-travel-planner"
```

这里的值是项目文件名（不含路径和 `.mdx` 扩展名）。关联后：

- 📄 项目详情页底部自动显示"相关文章"列表
- 📝 博客详情页顶部显示链接到关联项目

---

### 添加封面图

1. 将图片放入 `public/images/` 目录
2. 在 MDX 中引用：

```yaml
cover: "/images/blog/my-cover.png"
```

**建议：**
- 封面图尺寸 1200×630px（适配 Open Graph 分享预览）
- 格式 PNG 或 WebP
- 文件大小 < 500KB

在正文中也使用相同路径：

```mdx
![描述文字](/images/blog/screenshot.png)
```

---

## 编辑内容

直接修改 `content/` 下的 `.mdx` 文件即可。

```bash
# 编辑后
git add content/
git commit -m "update: 修改 xxx 文章内容"
git push
```

> **注意：** 修改 `date` 字段不会改变文章在 URL 中的位置（slug 基于文件名），但会影响列表排序（按日期倒序）。

---

## 删除内容

```bash
# 删除中文和英文版本
rm content/zh/blog/old-post.mdx
rm content/en/blog/old-post.mdx

git add content/
git commit -m "remove: 删除旧文章 old-post"
git push
```

---

## 修改站点信息

### 修改个人介绍

编辑 `src/app/[locale]/about/page.tsx`：

```tsx
// 修改技能列表
{[
  "Next.js", "React", "TypeScript",
  "你的新技能",
].map(...)}
```

### 修改首页问候语

编辑 `messages/zh.json` 中的对应字段：

```json
{
  "home": {
    "greeting": "Hi，我是 Long Jiang",
    "tagline": "你的新标语..."
  }
}
```

### 修改导航菜单

编辑 `src/components/layout/Header.tsx` 的 `navLinks` 数组。

### 修改联系方式

编辑 `src/app/[locale]/about/page.tsx` 的 Contact 部分。修改邮箱和 GitHub 链接。

### 修改全局 SEO 标题/描述

编辑 `messages/zh.json` 和 `messages/en.json` 中的 `site` 字段。

---

## 更新依赖

```bash
# 查看过期的依赖
npm outdated

# 更新所有依赖到最新版本
npm update

# 更新后验证构建
npm run build

# 如果构建成功，提交
git add package.json package-lock.json
git commit -m "chore: update dependencies"
git push
```

---

## 故障排查

### 本地开发报错

```bash
# 清除缓存
rm -rf .next node_modules
npm install
npm run dev
```

### 页面显示 404

检查：
1. 文件名是否正确（`.mdx` 扩展名）
2. 是否在正确的目录下（`content/zh/blog/` 或 `content/en/blog/`）
3. URL 路径是否正确（`/zh/blog/文件名`）

### 页面显示 500

检查：
1. frontmatter 格式是否正确（`---` 包裹，冒号后有空格）
2. `date` 字段格式是否为 `YYYY-MM-DD`
3. tags 是否用 `[]` 包裹

### 中英文内容不同步

确保 `content/zh/` 和 `content/en/` 下有**相同文件名**的 MDX 文件。

### Vercel 部署失败

在 Vercel 项目的 **Deployments** 页面查看构建日志，找出具体错误信息。

常见原因：
- MDX frontmatter 格式错误
- TypeScript 类型错误（新增组件时）
- 依赖不兼容

---

## 命令速查

```bash
# 开发
npm run dev              # 启动本地开发服务器 → localhost:3000
npm run build            # 生产构建检查
npm run lint             # 代码规范检查
npm run type-check       # TypeScript 类型检查

# 内容操作
# 添加文章 → content/{zh,en}/blog/xxx.mdx
# 添加项目 → content/{zh,en}/projects/xxx.mdx
# 添加图片 → public/images/xxx.png

# 上线
git add content/         # 暂存新内容
git commit -m "add: xxx" # 提交
git push                 # 推送 → Vercel 自动部署

# 查看站点
# 中文首页: https://vibeai.dev/zh
# 英文首页: https://vibeai.dev/en
# RSS 订阅: https://vibeai.dev/feed
# 站点地图: https://vibeai.dev/sitemap.xml
```

---

## 内容工作流总结

```
写文章/加项目
    │
    ▼
在 content/zh/xxx/ 和 content/en/xxx/ 创建 .mdx
    │
    ▼
npm run dev → 本地浏览器检查
    │
    ▼
git add → git commit → git push
    │
    ▼
Vercel 自动部署（1-2 分钟）
    │
    ▼
https://vibeai.dev 更新生效 ✓
```
