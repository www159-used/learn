---
title: "agent时代的zellij痛点"
date: 2026-08-15
---

1. cursor万恶的--use-system-ca导致kill-sessions之后没法恢复
2. 10+ tab和pane是常态，需要微型tui map和微型lru map。考虑做一个扩展
