---
title: "HF Agent 公开课打卡"
date: 2026-09-05
category: "LLM"
---

[Hugging Face Agents Course](https://huggingface.co/learn/agents-course/)

[墨圆面经](https://model.playoffer.cn/interview-resources/agent/agent-vs-workflow)


## 1 agent简介

llm是agent的大脑，工具调用给予agent和环境交互的方式

## ReAct

单纯的思考和工具调用都不行，要两者结合起来交替运行

将复杂任务拆解成小任务，然后经过

思考 -> 行动 -> 观察的循环

来处理问题

## ReAct和CoT

CoT是llm的思维链，即在一次对话中加入思考过程。

最开始通过prompt加入"step by step"，后来被deepseek r1训练进参数，使用<thought>token来深度思考

但是一直思考不和环境交互，容易进入死胡同。无法真正解决问题

ReAct则是将思考和实践结合起来

### agent设计

agent

### agent的对话


## todo

agent和o11y和langfuse