---
title: "galera"
date: 2026-08-04

category: "分布式系统"
---

分布式db的工程实现。

## FLP不可能

形式化验证还在发力。

命题：异步分布式集群，不存在一个共识算法。
形式化构建，设：
1. 价态v 0，1
2. 进程p蕴含价态信息v，接受事件e。e能改变p的价态v。
    
    e从m构建，m来自其他进程p'。
3. 设所有p构成的集群价态为C
4. 如果C中p的价态既有0也有1，则称C为双价；

    相反的，如果全1则为1价，全0则为0价。
5. 多个e组成的序列叫做run
    
引理：
1. 事件e序列可以交换。因为异步系统无延迟上限，不保证顺序。
2. 进入单价，任何run不再生效。

等价命题：对于初始双价C，存在run使得C一直保持双价。

证明：
1. 假设对于初始双价C，任意run后能到单价。
2. 假设e0能让C进入0价态，e1能让C进入1价态。
3. 根据引理2，对C施加e0，e1，C最终为1价态。
4. 根据引理2和引理1，交换e0，e1，C最终进入0价态。
5. 得到矛盾的价态，1不成立，则原命题成立。

## 失败探测

引入失败探测器。
失败探测器可以告诉p其他p是否正常运行，从而绕过fpl不可能问题。

## 广播

共识算法为了达成公式，需要提供一个广播机制。
原子广播：所有节点收到的广播是一串全序序列。


## 延后复制算法

设节点si处理事务t，si本地先提交事务t后，再原子广播给其他节点    

### certification test

我不知道为啥要叫这个，简单来讲就是验证集群内的一系列事务按照顺序执行是否冲突。


### 冲突的分类讨论

事务ta，tb

- 如果ta，tb对同一个对象o操作，并且其中一个有写操作
    - 如果tb precedes ta。则不冲突
    - 否则冲突
- 否则没冲突

#### precedes

这里我们定义precedes关系，写作->

- 如果ta，tb来自同一个db，如果tb在ta前执行，则tb -> ta
- 如果ta来自本地db，tb来自其他db。tb在本地db已经是提交状态，则tb -> ta



## 引用
- [THE DATABASE STATE MACHINE AND GROUP COMMUNICATION ISSUES](/pdfs/EPFL_TH2090.pdf)
- [理解FLP-Impossibility论文](https://www.inlighting.org/archives/understand-flp-impossibility)
