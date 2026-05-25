# 剧本杀阅读器框架

一个纯 HTML/CSS/JavaScript 的剧本杀阅读器框架，无需构建步骤，开箱即用。

## 快速开始

1. 复制整个项目目录
2. 修改 `js/config.js` 中的项目配置
3. 在 `data/characters.js` 中定义角色
4. 在 `data/scripts/` 目录下创建各角色的剧本文件
5. 用浏览器打开 `index.html` 即可

## 目录结构

```
项目目录/
├── index.html              # 首页（品牌视觉 + 开始按钮）
├── character.html          # 角色选择页
├── reader.html             # 阅读器核心页面
│
├── css/
│   ├── common.css         # CSS 变量、主题系统、基础组件
│   ├── home.css           # 首页样式
│   ├── character.css      # 角色选择页样式
│   └── reader.css         # 阅读器全部样式
│
├── js/
│   ├── config.js          # 全局配置（修改这里来定制项目）
│   ├── debug.js           # 调试日志系统
│   ├── storage.js         # localStorage 封装
│   ├── settings.js        # 用户设置管理
│   ├── favorites.js       # 收藏夹 + 高亮
│   ├── search.js          # 全文搜索引擎
│   ├── clues.js           # 线索搜集状态
│   └── tasks.js           # 任务系统
│
└── data/
    ├── index.js           # 剧本注册表
    ├── characters.js      # 角色元数据
    ├── tasks.js           # 任务定义
    ├── evidence.js        # 搜证线索
    ├── letters.js         # 特殊内容（信件、结局、复盘等）
    ├── assets/
    │   ├── avatars/       # 角色头像
    │   └── ...           # 其他图片资源
    └── scripts/
        └── <角色ID>/
            ├── chapter_1.js
            ├── chapter_2.js
            └── ...
```

## 配置指南

### 1. 修改项目信息 (`js/config.js`)

```javascript
AppConfig = {
  name: '项目名称',           // 显示在标题栏
  subtitle: '英文名',          // 首页副标题
  tagline: '品牌标语',         // 首页标语
  author: '出品方',           // 页脚显示
  specialCode: '1233',        // 特殊章节解锁码
  // ...其他配置
}
```

### 2. 定义角色 (`data/characters.js`)

```javascript
var CHARACTERS = [
  {
    id: 'character_id',      // 唯一标识，用于目录命名
    name: '角色名',
    gender: '男/女',
    role: '身份描述',
    avatar: 'data/assets/avatars/角色名.jpg',  // 头像路径
    desc: '角色简介',
    color: '#颜色代码',      // UI强调色
    chapters: ['chapter_1', 'chapter_2', ...]  // 章节列表
  }
];
```

### 3. 创建剧本章节 (`data/scripts/<角色ID>/chapter_1.js`)

```javascript
SCRIPT_DATA['character_id']['chapter_1'] = {
  title: '第一章',
  subtitle: '副标题',
  sections: [
    {
      id: 'c1_s1',          // 唯一标识
      type: 'narrative',    // narrative | theater
      content: '正文内容...'  // 支持 <strong> 标签进行强调
    },
    {
      id: 'c1_s2',
      type: 'theater',      // 小剧场/对话
      theaterTitle: '场景标题',
      content: `角色A：对话内容
角色B：对话内容
（旁白或舞台说明）
*** 分隔线 ***`
    }
  ]
};
```

### 4. 定义任务 (`data/tasks.js`)

```javascript
var TASK_DEFINITIONS = {
  character_id: {
    chapter_1: [
      { id: 'task_1', title: '任务标题', desc: '任务描述' }
    ]
  }
};
```

### 5. 定义搜证线索 (`data/evidence.js`)

```javascript
var EVIDENCE_DATA = [
  {
    round: 1,
    label: '搜证一',
    clues: [
      { id: 'e1_01', character: '角色', label: '线索标签', content: '线索内容' }
    ]
  }
];
```

### 6. 特殊内容 (`data/letters.js`)

- **信件**: `LETTER_DATA[charId]` - 角色专属信件
- **情书**: `LOVE_LETTERS` - 多角色可见的情书
- **检讨书**: `JIANTAOSHU_DATA` - 特殊格式文本
- **绘画**: `PAINTING_DATA` - 图片展示
- **结局**: `ENDING_DATA` - 多结局系统
- **复盘**: `RECAP_DATA` - 故事总结

## 功能模块

| 模块 | 文件 | 功能 |
|------|------|------|
| 配置中心 | js/config.js | 全局参数配置 |
| 用户设置 | js/settings.js | 主题、字体 |
| 数据存储 | js/storage.js | localStorage 封装 |
| 收藏系统 | js/favorites.js | 高亮、收藏、跳转 |
| 搜索功能 | js/search.js | 全文搜索 |
| 任务系统 | js/tasks.js | 章节任务解锁 |
| 线索系统 | js/clues.js | 线索收集 |
| 调试工具 | js/debug.js | 日志面板 |

## 主题系统

5 套预设主题，通过 `data-theme` 属性切换：

| 主题 | 描述 | 配置值 |
|------|------|--------|
| 默认 | 暗夜金光 | default |
| 暖棕 | 米黄阅读 | warm |
| 深色 | 纯黑夜间 | dark |
| 护眼 | 浅绿护眼 | green |
| 纯白 | 白底黑字 | light |

字体大小：small / medium / large / xlarge

## 数据结构

### localStorage 存储

| 键名 | 内容 | 模块 |
|------|------|------|
| `_px_settings` | { theme, fontSize } | settings.js |
| `_px_favorites` | 收藏列表 | favorites.js |
| `_px_highlights` | 高亮列表 | favorites.js |
| `_px_collected_clues` | 已收集线索 | clues.js |
| `_px_task_states` | 任务状态 | tasks.js |
| `_px_last_chapter_<charId>` | 最后阅读章节 | reader.html |
| `_px_selected_character` | 已选角色 | character.html |
| `_px_special_unlocked` | 特殊章节解锁状态 | reader.html |

## 复用清单

复用此框架制作新剧本时，需要修改的文件清单：

### 必改文件
1. `js/config.js` - 项目名称、副标题、标语
2. `data/characters.js` - 角色定义
3. `data/scripts/` - 删除旧角色，创建新角色剧本
4. `data/tasks.js` - 任务定义
5. `data/evidence.js` - 搜证线索（可选）
6. `data/letters.js` - 特殊内容（可选）

### 选改文件
7. `data/assets/avatars/` - 角色头像
8. `data/assets/` - 其他资源图片

### 可改文件（样式微调）
9. `css/common.css` - CSS 变量调整颜色
10. `css/home.css` - 首页视觉调整
11. `css/reader.css` - 阅读器样式调整

## 调试模式

访问页面时添加 `?debug=1` 参数即可开启调试面板：

```
index.html?debug=1
reader.html?char=xxx&debug=1
```

调试面板可查看：
- 所有操作日志
- localStorage 数据
- 数据导出/清除

## 浏览器兼容性

- 现代浏览器（Chrome, Firefox, Safari, Edge）
- 移动端 Safari / Chrome
- 无需任何构建步骤
- 无外部依赖

## 版本

当前版本：1.0.0
