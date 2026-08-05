# 走进replica bug

之前发现了一个很有意思的bug，多线程replica某些情况下会卡死。
今天顺着这个bug展开讲讲。

首先要了解几个背景知识。

## galera和分布式复制

mariadb引入的分布式复制机制，弥补mysql不支持多节点的缺陷。

参照mariadb官方的[galera系列文档](https://mariadb.com/docs/galera-cluster/readme/mariadb-galera-cluster-usage-guide)

也可以查看[galera系列](./galera.md)