---
title: "agent时代的zellij痛点"
date: 2026-08-15
---

1. cursor万恶的--use-system-ca导致kill-sessions之后没法恢复
2. ~~10+ tab和pane是常态，需要微型tui map和微型lru map。考虑做一个扩展~~
3. 醒目的输入法提示

    快捷键和输入法水火不相容。这个议题应该放到os层面，zellij作为子问题优先处理。
    
4. 引入session跳转，模式切换可以接入`<space>`老板键

    如果一个tab里开了好几个pane，可以考虑使用session来接管。tab替代pane的层级

    比如项目开发，一个worktree一个tab。