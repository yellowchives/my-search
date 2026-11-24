# my-search · 聚合搜索

选类型 → 选引擎 → 输关键词，一次打开多个搜索引擎的结果页。

在线访问：<https://yellowchives.github.io/my-search/>

## 功能

- 三区块界面：搜索类型（通用 / 图片 / 视频 / 地图 / 购物 / 图书）→ 搜索引擎卡片（自动换行、默认全选、部分引擎带高级选项）→ 关键词输入
- 同一网站在不同分类下直达各自的垂直结果页（如百度图片、百度视频、搜狗微信）
- 引擎与分类完全由配置文件驱动，加站点不用改组件
- 勾选状态按引擎记忆在 localStorage，切分类不丢失

## 配置搜索引擎

```
src/config/
├─ engines.ts          # 类型定义 + 分类清单 + 汇总入口
└─ categories/
   ├─ general.ts       # 每个分类一个文件
   ├─ image.ts
   ├─ video.ts
   ├─ map.ts
   ├─ shopping.ts
   └─ book.ts
```

新增引擎：在对应分类文件里加一条 `{ id, name, urlTemplate, options }`，`urlTemplate` 中的 `{query}` 是关键词占位符；`options` 为空数组表示无额外选项，否则渲染为卡片上的下拉条件。

## 本地开发

```sh
npm install
npm run dev      # 本地预览
npm run build    # 类型检查 + 生产构建
```

## 部署

推送到 `main` 后，`.github/workflows/deploy.yml` 会自动构建并通过 GitHub Actions 部署到 GitHub Pages。首次部署前需在本仓库 Settings → Pages 把 Source 设为 **GitHub Actions**。
