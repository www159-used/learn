---
title: zellij tab缩略图
date: 2026-08-20
---

agent时代，终端多路复用焕发第二春，我感觉就像外挂的记忆系统。

记忆分层：

```
weights -> system prompt -> skill -> chat-session -> shell session[here] -> ...
```

高强度使用zellij中，诉求是跨平台和开箱即用。

碰到复杂项目需要多开tab和pane，所以出现新的问题：如何快速跳转？

## 目标

拆分子问题

1. tab管理
    
    - [x] 显示所有tab缩略图
    - [x] vim风格快捷键移动，quit：q
    - [x] flash.nvim跳转风格
    - [x] floating模式为主
        
        [x] floating现在有bug，如果打开overview，hidden的floating pane也会出现

    - [x] 支持跳转到上一个tab：-
    - [] 缩略图的tab操作

2. pane管理
    
    todo: 开发需求中

