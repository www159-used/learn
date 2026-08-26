---
title: "agent时代的zellij痛点"
date: 2026-08-15
---

- [ ] cursor万恶的--use-system-ca导致kill-sessions之后没法恢复
- [x] 10+ tab和pane是常态，需要微型tui map和微型lru map。考虑做一个扩展
- [ ] 醒目的输入法提示

- [ ] 快捷键和输入法水火不相容。这个议题应该放到os层面，zellij作为子问题优先处理。
    
- [ ] 多tab管理带来的渲染问题。
    
- [ ] 焦点检测插件。sb苹果的窗口没有聚焦的信息

    我希望失去焦点有显眼的提示，比如popup，变色等