---
title: zellij agent dashboard
date: 2026-08-24
---

[github](https://github.com/www159-used/zellij-agent-board)

## 产品现状

![v0.1.0](image.png)
<center>v0.1.0</center>
<br>

![v0.2.0](image-1.png)
<center>v0.2.0</center>
<br>

![v0.3.1](image-2.png)
<center>v0.3.1</center>
<br>

![0.4.0](image-3.png)
<center>v0.4.0</center>
<br>

![0.4.2](agent-0.4.2.gif)
<center>v0.4.2</center>
<br>

![0.6.0](agent-0.6.0.gif)
<center>v0.6.0</center>
<br>

仿overview的ui，快速制造了原型。仍有不足之处：


## 比较明显的问题

- [ ] 新状态：当plan模式要我选择，或者切换模式，有特殊的标记，或者联动notification

- [ ] notification问题。

    notification可能来不及看
    
    设计更现代的noti信息，聚合，缓存

- [ ] sb输入法问题

    terminal的严父，我需要有个自动切换输入法到en的机制，切换后弹出dialog提醒。

- [ ] pin模式

    一些热点agent可以pin在最开始优先跳
    
    
- [ ] 支持settings

    - 每次调出聚焦现在的还是第一个
    - 是否支持标记和返回上一个
    - zen模式（去掉cli厂商等无关信息）
    
- [ ] ascii转圈圈显示问题

    由于用了异步mvc，所以ascii转圈圈无法实时刷新
    
- [ ] 鼠标调出

    键盘调出需要另一只手，右手模式

## 值得研究的问题

- [ ] 睡眠模式

    大部分的agent和pane是空转。是时候引入计数和内存模式了，保持内存的低占用
    
    - [x] emdb选型
    
    - [x] cs结构

    - [x] 测试框架设计
    
    - [x] 接口设计

    - [x] 考虑pane丢失的所有情况

    - [x] 考虑和resume插件的冲突

    - [x] 表设计

    - [ ] 状态机设计

        基于common pane的设计过于复杂

    - [ ] 逻辑设计

        - [ ] 至少awake agent

            至少10个避免频繁唤醒丢上下文

        - [ ] 扩展接口和agent支持

            - [ ] claude code






## 产品设计：
- [ ] icon

## 性能问题跟踪


## 产品维护
- [x] 使用数据统计
    - [ ] o11y收集
    
- [ ] log和指标debug
    - [x] log定位

## 产品验收
- [x] 人类可读的e2e测试框架


## 测试

## 设计

