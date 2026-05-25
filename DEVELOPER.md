# 开发者指南

## 项目架构

### 整体架构

```
┌─────────────────────────────────────────┐
│              HTML 页面                   │
│  ┌─────────┐ ┌─────────┐ ┌──────────┐  │
│  │index    │ │character│ │ reader   │  │
│  │.html    │ │.html    │ │.html     │  │
│  └────┬────┘ └────┬────┘ └────┬─────┘  │
│       │           │           │         │
├───────┴───────────┴───────────┴─────────┤
│           JavaScript 模块                │
│  ┌─────────────────────────────────┐   │
│  │  核心模块                         │   │
│  │  config | storage | settings     │   │
│  ├─────────────────────────────────┤   │
│  │  功能模块                         │   │
│  │  favorites | search | clues     │   │
│  │  tasks | debug                  │   │
│  └─────────────────────────────────┘   │
├─────────────────────────────────────────┤
│              数据层                     │
│  ┌─────────────────────────────────┐   │
│  │  characters | tasks | evidence  │   │
│  │  letters | scripts/*            │   │
│  └─────────────────────────────────┘   │
└─────────────────────────────────────────┘
```

### 核心模块说明

#### config.js - 配置中心
所有全局配置集中管理，便于定制和迁移。

#### storage.js - 数据存储
封装 localStorage，提供统一的读写接口和错误处理。

#### settings.js - 用户设置
管理主题和字体设置，自动同步到 DOM。

#### favorites.js - 收藏系统
收藏/高亮文本，支持去重、搜索、跳转。

#### search.js - 搜索引擎
全文搜索，支持关键词高亮和结果跳转。

#### tasks.js - 任务系统
locked → unlocked → done 状态机，自动解锁机制。

#### clues.js - 线索系统
自动收集线索，支持多轮搜证。

#### debug.js - 调试工具
日志系统，支持内存存储和面板查看。

---

## 数据流

### 用户操作流程

```
用户操作
    ↓
reader.html 事件处理
    ↓
调用对应模块 API
    ↓
Storage.set() 持久化
    ↓
更新 DOM 显示
```

### 章节加载流程

```
选择角色 → loadCharacter()
    ↓
动态加载 scripts/*.js
    ↓
注册到 SCRIPT_DATA 全局对象
    ↓
onAllChaptersLoaded()
    ↓
渲染章节选择器
    ↓
switchChapter() 渲染内容
```

---

## 数据结构

### SCRIPT_DATA 全局对象

```javascript
SCRIPT_DATA = {
  '角色ID': {
    '章节ID': {
      title: '标题',
      subtitle: '副标题',
      sections: [
        {
          id: '唯一标识',
          type: 'narrative' | 'theater',
          content: '正文内容',
          theaterTitle: '场景标题'  // theater 类型专用
        }
      ]
    }
  }
}
```

### 章节渲染逻辑

reader.html 中的 `renderChapter()` 函数：

```javascript
function renderChapter(chapterData) {
  // 1. 渲染标题
  // 2. 遍历 sections
  // 3. narrative 类型 → 普通段落
  // 4. theater 类型 → 小剧场组件
  // 5. clue 类型 → 自动收集线索
}
```

### 任务状态

```javascript
TASK_DEFINITIONS = {
  '角色ID': {
    '章节ID': [
      { id: '任务ID', title: '标题', desc: '描述' }
    ]
  }
}

// 状态存储
taskStates = {
  '角色ID|章节ID': {
    '任务ID': 'locked' | 'unlocked' | 'done'
  }
}
```

---

## 扩展指南

### 添加新功能

1. 在 `js/` 目录创建新模块
2. 在 HTML 中引入脚本
3. 在 reader.html 中调用模块 API
4. 如需持久化，使用 Storage 模块

### 添加新数据类型

1. 在 `data/` 目录创建数据文件
2. 在 reader.html 中引入
3. 在渲染逻辑中处理新数据

### 修改样式

主要 CSS 文件：

| 文件 | 用途 |
|------|------|
| common.css | CSS 变量定义，包含 5 套主题 |
| home.css | 首页视觉特效 |
| character.css | 角色卡片和弹窗 |
| reader.css | 阅读器、面板、工具栏 |

### 自定义主题

在 `common.css` 中添加新的 `[data-theme="xxx"]` 选择器：

```css
[data-theme="custom"] {
  --bg-primary: #xxx;
  --text-primary: #xxx;
  --accent: #xxx;
  /* ...其他变量 */
}
```

然后在 config.js 中添加 `defaultTheme: 'custom'`。

---

## 性能优化

### 大文本处理

当前未做虚拟滚动，大章节（4万+字）可能有性能问题。

### 图片优化

- 使用 WebP 格式
- 适当压缩
- 考虑懒加载

### 缓存策略

- 剧本文件动态加载，首次访问后浏览器缓存
- localStorage 有 5MB 限制，注意数据量

---

## 调试技巧

### URL 参数

```
?debug=1                    # 开启调试面板
?char=character_id         # 直接进入某角色阅读页
?char=character_id&debug=1  # 组合使用
```

### 控制台命令

```javascript
Storage.get('settings')     # 查看设置
Storage.exportAll()         # 导出所有数据
Favorites.getAll()          # 查看收藏
Tasks.getStates('char', 'ch')  # 查看任务状态
```

### 常见问题排查

| 问题 | 可能原因 | 解决方法 |
|------|----------|----------|
| 章节加载失败 | 文件路径/名称不匹配 | 检查 characters.js 中的 id |
| 任务不显示 | tasks.js 缺少定义 | 确认格式正确 |
| 主题不生效 | CSS 变量未定义 | 检查 common.css |
| 数据丢失 | localStorage 满 | 清理旧数据 |
