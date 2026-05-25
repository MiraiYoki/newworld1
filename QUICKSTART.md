# 快速开始指南

## 5分钟创建新剧本项目

### Step 1: 复制框架

将整个项目目录复制一份，作为新剧本的基础。

### Step 2: 修改配置

编辑 `js/config.js`：

```javascript
AppConfig = {
  name: '你的剧本名',
  subtitle: 'ENGLISH_NAME',
  tagline: '你的品牌标语',
  author: '工作室名称',
  specialCode: '你的解锁码'
}
```

### Step 3: 定义角色

编辑 `data/characters.js`：

```javascript
var CHARACTERS = [
  {
    id: 'char_001',           // 目录名用下划线
    name: '角色名',
    gender: '男',
    role: '身份描述',
    avatar: 'data/assets/avatars/角色名.jpg',  // 先留空或用占位图
    desc: '角色简介',
    color: '#颜色代码',
    chapters: ['chapter_1', 'chapter_2']
  }
];
```

### Step 4: 创建剧本目录

在 `data/scripts/` 下创建角色目录：

```
data/scripts/
└── char_001/          # 与 characters.js 中的 id 一致
    ├── chapter_1.js   # 第一章
    └── chapter_2.js   # 第二章
```

### Step 5: 编写剧本内容

`data/scripts/char_001/chapter_1.js`:

```javascript
SCRIPT_DATA['char_001']['chapter_1'] = {
  title: '第一章',
  subtitle: '副标题',
  sections: [
    {
      id: 'c1_s1',
      type: 'narrative',
      content: '这里是叙述性文字...'
    },
    {
      id: 'c1_t1',
      type: 'theater',
      theaterTitle: '小剧场',
      content: `角色A：你好啊
角色B：你好
（两人相视一笑）
***`
    }
  ]
};
```

### Step 6: 定义任务（可选）

编辑 `data/tasks.js`：

```javascript
var TASK_DEFINITIONS = {
  char_001: {
    chapter_1: [
      { id: 't1', title: '任务标题', desc: '任务描述' }
    ]
  }
};
```

### Step 7: 准备资源

将角色头像放入 `data/assets/avatars/` 目录，文件名与 `characters.js` 中的配置一致。

### Step 8: 测试

用浏览器打开 `index.html`，选择角色，开始阅读！

---

## 常见操作

### 添加新章节

1. 创建 `chapter_3.js` 文件
2. 在 `characters.js` 的 `chapters` 数组中添加 `'chapter_3'`
3. 在 `tasks.js` 中添加章节任务（可选）

### 添加特殊内容

在 `data/letters.js` 中定义：
- 信件：`LETTER_DATA[charId]`
- 情书：`LOVE_LETTERS`
- 绘画：`PAINTING_DATA`
- 结局：`ENDING_DATA`

### 添加搜证线索

在 `data/evidence.js` 中添加轮次和线索。

### 使用高亮标签

在剧本内容中使用 `<strong>` 标签可实现加粗强调：

```javascript
content: '这是普通文字，<strong>这是需要强调的内容</strong>。'
```

---

## 提示

- 角色 ID 使用小写字母和下划线
- 章节 ID 使用有意义的命名（如 `chapter_1`、`chapter_2_theater`）
- 定期保存，避免数据丢失
- 使用浏览器调试面板 `?debug=1` 排查问题
