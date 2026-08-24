---
title: zellij agent dashboard
date: 2026-08-24
---

## 产品现状

![alt text](image.png)

仿overview的ui，快速制造了原型。仍有不足之处：

比较明显的问题：

- [x] 幂等快捷键，按一次进入，再按一次退出
- [] 首次加载时间。首次加载会有点慢
- [x] 无效信息比较多，agent 青色字，session标题这些信息不够有效
- [x] 引入flash.nvim 
- [x] working时间每次从0开始
- [x] 跳转后原来的不关
- [] 显示相对时间而不是绝对时间

值得研究的问题：

- [] 居中布局
- [] 和overview的联动，我甚至想让oveview首次渲染agent管理，legacy session tab跳转进入space l

产品设计：
- [] icon


## 测试