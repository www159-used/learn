---
title: "agent时代的zellij痛点"
date: 2026-08-15
---

- [ ] cursor万恶的--use-system-ca导致kill-sessions之后没法恢复
- [x] 10+ tab和pane是常态，需要微型tui map和微型lru map。考虑做一个扩展
- [ ] 醒目的输入法提示

- [ ] 快捷键和输入法水火不相容。这个议题应该放到os层面，zellij作为子问题优先处理。
    
- [ ] 多tab管理带来的渲染问题。
    
    
- [ ] nest快捷管理。进入nest session如呼吸般简单

    依赖zellij本身不大显示，需要自己有个http服务监听
    
- [ ] agent跨pane通信的可能性

    现在的『交响乐』在一个agent内部。如果多个agent进程间通信呢？
    
- [ ] 重启核打击

    重启一次mac，所有session都被kill，所有pane的agent都关了。

    - [x] session resume
    - [x] agent resume
    - [ ] 从session manager打开session也要恢复
    