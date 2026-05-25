# 剧本杀阅读器

一个纯 HTML/CSS/JavaScript 的剧本杀阅读器框架，无需构建步骤，开箱即用。

## 文档导航

| 文档 | 用途 |
|------|------|
| [快速开始](QUICKSTART.md) | 5分钟创建新剧本项目 |
| [框架指南](FRAMEWORK.md) | 完整的功能和数据结构说明 |
| [开发者指南](DEVELOPER.md) | 架构解析和扩展开发 |

## 快速开始

1. 修改 `js/config.js` 配置项目信息
2. 编辑 `data/characters.js` 定义角色
3. 在 `data/scripts/` 下创建剧本文件
4. 用浏览器打开 `index.html`

详见 [快速开始指南](QUICKSTART.md)

## 核心功能

- 多角色剧本阅读
- 章节切换与导航
- 任务系统（阅读解锁）
- 搜证线索系统
- 收藏与高亮
- 全文搜索
- 5套阅读主题
- 特殊章节（信件、结局等）

## 技术栈

- HTML5 + CSS3 + JavaScript (ES6)
- 无框架、无构建步骤
- localStorage 持久化
- 移动端优先设计

## 目录结构

```
├── index.html          # 首页
├── character.html      # 角色选择
├── reader.html         # 阅读器
├── css/               # 样式文件
├── js/                # 核心模块
└── data/              # 数据文件
    ├── characters.js   # 角色定义
    ├── tasks.js       # 任务定义
    ├── evidence.js    # 搜证线索
    ├── letters.js     # 特殊内容
    ├── scripts/       # 剧本内容
    └── assets/        # 静态资源
```

## 调试

访问时添加 `?debug=1` 参数开启调试面板：

```
index.html?debug=1
reader.html?char=xxx&debug=1
```

## 复用此框架

详见 [框架指南](FRAMEWORK.md) → 复用清单

## 版本

1.0.0
