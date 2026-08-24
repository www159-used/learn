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
    - [x] floating模式为主
        
        [x] floating现在有bug，如果打开overview，hidden的floating pane也会出现

    - [x] 支持跳转到上一个tab：-
    - [] 缩略图的tab操作


2. flash.nvim风格搜索

    flash.nvim是nvim的杀手级跳转插件，符合人类的跳转逻辑。

    - [x] flash模式
    - [] 类flash mask遮罩


3. pane管理
    
    - [x] 毙。pane管理用自带的alt风格快捷键。区分session之后tab内的pane大大减少
    
4. session管理

    - [x] 增加session跳转，进入session后需要二次跳转到tab。
        
        多工作区开发有用，避免tab膨胀

5. pin模式

    - [x] 常用的tab pin。避免二次跳转

6. [] agent状态管理

    overview频繁跳转的核心原因就是agent的并行化，当一个agent在跑，我可以跳到另一个已完成的agent继续作业。
   
    agent运行信息没有在扩展表现出来。
    
    类似现在流行的agent pane。zellij完全可以发展一套基于session，tab，pane的agent管理产品。现在已经有这样的产品。

    涉及信息的聚合。因为我不可能将所有pane的agent运行状态平铺出来

    需要设计一款新产品桥接过来？
    
7. [] session，tab的curd收编

    基于位置的，vim风格的curd感觉比原生的curd要方便
    
8. [] 产品设计

    - [] 自己的icon
    - [] 递归风格的命名？
    
9. ui问题
    
    - [] focus框不够明显
    - [] 匹配单个立即跳转
    - [] 渲染会有跳转。从小变大一次渲染紧致文字ui，框ui
