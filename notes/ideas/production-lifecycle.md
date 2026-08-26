---
title: 产品维护和blog耦合问题
date: 2026-08-27
---

尝试讨论产品管理和代码设计的界限。

在blog里维护一个todo list感觉有点低效。

比较现代的治理方式：
1. idea记录在blog，作为草稿
2. jira/github issue作为规范的todo list，落实idea
3. 重要feature，功能进入代码docs，否则issue即设计（llm时代）
4. 搭建人类可读的e2e测试框架，作为issue的验收标准（llm时代单测无效）