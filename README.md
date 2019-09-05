## Electron_text

> 官网：[Electron](https://electronjs.org/)

### 初识

#### 启动项目

``` node
  $ npm start
  $ npm run estart
```

### idea

> 数据层

- [ ] 防御式编程思想
- [ ] 代码健壮性
- [ ] Single-SPA

> 业务层

- [ ] 路由
- [ ] 目录结构与分配
- [ ] 待续...

> 功能层

- [ ] 登录模块
- [x] 欢迎界面 -> 过渡
- [ ] 目录模块
- [ ] 待续...

> 网络层

- [x] 实现简单后台数据连接
- [ ] 优化封装请求方式

### To be resolved
- [ ] 不实现新打开窗口，只是在当前状态下进行界面跳转

### Finished

- [x] 实现 IPC 与主进程的交互功能，并实现新窗口的创建以及对应函数的响应操作
- [x] 关闭当前打开窗口以及返回上一级时关闭当前窗口

### Note

> ajax 的 readyState

0. 初始化，XMLHttpRequest对象还没有完成初始化
1. 载入，XMLHttpRequest对象开始发送请求
2. 载入完成，XMLHttpRequest对象的请求发送完成
3. 解析，XMLHttpRequest对象开始读取服务器的响应
4. 完成，XMLHttpRequest对象读取服务器响应结束
