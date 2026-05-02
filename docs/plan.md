# Implementation Plan

## Phase 2: 技术实施计划

### 实施阶段总览

```
Phase A: 项目骨架        Phase B: 核心组件       Phase C: 内容系统
    │                        │                      │
    ▼                        ▼                      ▼
 Next.js 脚手架         GlassCard/布局           MDX 博客系统
 + 国际化路由           + 首页框架               + 项目展示
 + 玻璃态样式系统       + 导航/Footer            + 代码高亮
    │                        │                      │
    └────────┬───────────────┘──────────────────────┘
             │
             ▼
      Phase D: 补充页面    Phase E: 部署        Phase F: 上线
          │                    │                    │
          ▼                    ▼                    ▼
     About/Contact         Vercel连接          域名绑定+DNS
     RSS Feed              Umami分析           SEO验证
     SEO细节               构建检查           内容初始化
```

### Phase A: 项目骨架（基础层）

**依赖：无**

1. 创建 Next.js 15 项目（`create-next-app`）
2. 安装依赖：`tailwindcss`, `next-intl`, `framer-motion`, `next-mdx-remote`
3. 配置 Tailwind CSS 4 + 自定义玻璃态 CSS 工具类
4. 配置 `next-intl` 国际化中间件和路由
5. 设置路径别名 `@/` 指向 `src/`
6. 配置 ESLint + Prettier
7. 配置 TypeScript 严格模式

**验证：** `npm run dev` 后 `/zh` 和 `/en` 路由均返回 200

### Phase B: 核心组件（UI 层）

**依赖：Phase A**

1. 实现 `GlassCard` 组件（玻璃态基础容器）
2. 实现 `Header` + 导航栏（含 LanguageSwitcher, ThemeToggle）
3. 实现 `Footer`
4. 实现 暗色/亮色模式（`next-themes`）
5. 实现首页布局框架（Hero 区 + 最新文章列表区）
6. 实现响应式布局（移动端适配）

**验证：** 手动检查浏览器中玻璃态效果、语言切换、暗色模式切换均正常

### Phase C: 内容系统（数据层）

**依赖：Phase B**

1. 定义 MDX frontmatter 类型（BlogPost, Project）
2. 实现 MDX 文件读取与解析工具（`src/lib/mdx.ts`）
3. 实现 `MDXContent` 渲染组件（代码高亮、自定义组件）
4. 实现 Blog 列表页 + `BlogCard` 组件
5. 实现 Blog 详情页（MDX 渲染）
6. 实现 Project 列表页 + `ProjectCard` 组件
7. 实现 Project 详情页 + Blog 关联
8. 准备示例内容（1 篇中文 + 1 篇英文博客草稿）

**验证：** 博客列表/详情页渲染正确，代码高亮正常，项目与博客关联正确

### Phase D: 补充页面与 SEO

**依赖：Phase C**

1. 实现 About 页（中英双语）
2. 实现 Contact 页
3. 实现 RSS Feed 生成
4. 实现 Sitemap 生成
5. 全局 SEO meta + Open Graph 配置
6. 404 页面

**验证：** `next build` 无错误，sitemap.xml 和 rss.xml 正确生成

### Phase E: 部署

**依赖：Phase D**

1. 注册域名 jianglong.dev（Cloudflare Registrar）
2. 创建 Vercel 项目并连接 Git 仓库
3. 配置 Vercel 自定义域名
4. DNS 配置（添加 CNAME/A 记录指向 Vercel）
5. SSL 证书验证
6. 集成 Umami Analytics

**验证：** https://jianglong.dev 可访问，SSL 有效，Umami 有数据

### Phase F: 上线初始化

**依赖：Phase E**

1. 完善至少 1 篇中文 + 1 篇英文真实内容
2. Lighthouse 评分 > 90 分
3. 提交搜索引擎（Google Search Console、Bing Webmaster）
4. `/zh` 和 `/en` 各自独立的 sitemap 提交

**验证：** 站点完全可用，所有 success criteria 通过

## 风险与缓解

| 风险 | 概率 | 缓解 |
|------|------|------|
| next-mdx-remote v5 与 next-intl 兼容性 | 低 | 两个库都是目前主流选择，社区活跃 |
| Safari 中 backdrop-filter 表现 | 中 | 添加 `-webkit-backdrop-filter` 回退，测试时早发现 |
| 域名注册被抢注 | 低 | 准备备选 jianglong.me / jianglong.io |
| 中英双语内容维护负担 | 中 | 首期只要求 1+1 篇，后续按需扩展 |
| Vercel Hobby 限制（带宽/构建时间） | 低 | 个人站点流量在免费额度内，MDX 构建快 |
