---
title: "agent时代的zellij痛点"
date: 2026-08-15
---

1. cursor万恶的--use-system-ca导致kill-sessions之后没法恢复
2. ~~10+ tab和pane是常态，需要微型tui map和微型lru map。考虑做一个扩展~~
3. 醒目的输入法提示

    快捷键和输入法水火不相容。这个议题应该放到os层面，zellij作为子问题优先处理。
    
4. agent overview

## agent overview

为何值得单独为此创建一个插件？频繁跳转的核心原因就是并行agent。