## Electron_text

### 初识

> 官网：[Electron](https://electronjs.org/)

#### 启动项目

``` node
  $ npm start
  $ npm run estart
```

### idea

> 业务层

- [ ] 路由
  - [x] 当前小组件化内容跳转
  - [x] 子组件路由跳转
  - [ ] 封装公用函数
- [x] 目录结构与分配
  - [ ] 组件划分
  - [ ] 模块划分
  - [ ] 逻辑划分
    - [ ] 逻辑函数处理
    - [ ] 共用函数体处理以及特殊情况应用
- [ ] 待续...

> 功能层

- [x] 登录/注册模块
  - [x] 基本功能
  - [ ] 登录信息验证
    - [ ] 后台接口处理 & 前端输入数据处理
    - [ ] 第三方信息验证
  - [ ] 第三方登录/注册
- [ ] 用户守则
  - [ ] 中英文切换
  - [ ] 规则
- [x] 欢迎界面 -> 过渡
- [ ] 目录模块
  - [ ] 目录模块划分
  - [ ] 聊天 -> 通讯
  - [ ] 资讯
  - [ ] 支付
  - [ ] 绘图
    - [ ] 二维
      - [ ] Rough
        - [x] Rough Charts
        - [x] React Rough
      - [ ] chart.xkcd
        - [x] 引入 chart.xkcd
        - [ ] 优化
          - [ ] 有指向性的确定表格展示的方向，从而达到直观的展示效果
        - [ ] 与后台建立链接，创建数据集合，确定前后端数据传递格式和方法
    - [ ] 三维
      - [ ] Three
  - [ ] 游戏
    - [ ] 游戏类型、模块细化
  - [ ] GIS
  - [ ] 第三方
    - [ ] 通讯
    - [ ] 特殊功能实现
  - [ ] 日历，用于记录一日常
    - [ ] 点击日历中的每一天出现弹框
      - [ ] 存新数据
      - [ ] 编辑旧数据
    - [ ] 数据处理
      - [ ] 存数据
      - [ ] 取数据
    - [ ] 每一个日期可以点击记录，记录的信息录入后台数据库中
      - [ ] 点击每个日期出现编辑菜单，进行信息录入，直接传递给后台
      - [ ] 点击编辑时可执行添加、删除、修改的操作
    - [ ] 日历有多种展示方式
      - [ ] 通屏日历，可以随时点击一个出现编辑操作页
      - [ ] 小日历，点击后右侧显示编辑操作页
- [ ] 待续...

> 网络层

- [x] 实现简单后台数据连接
- [ ] 优化封装请求方式
- [ ] 请求安全问题
- [ ] 部分信息暴露（针对于PC层）
- [ ] 待续...

> 数据层 - 网络安全

- [ ] 防御式编程思想
- [ ] 代码健壮性
- [ ] Single-SPA
- [ ] 错误日志输出
- [ ] 待续...

> 代码分支化开发

- [ ] 根据不同的功能进行分支创建
- [ ] 完成某个模块后进行 Code Review
  - [ ] 划分多个分支，每个分支进行单独的代码处理
- [x] 提交 Commit 格式化
  - 使用 `git cz` 代替 `git commit`

### To be resolved
- [x] 不实现新打开窗口，只是在当前状态下进行界面跳转
- [x] react 嵌入到 electron 中
- [ ] hook 机制
- [x] 以实现路由封装，但是未实现子级路由获取
  - [x] 默认指定第一个子路由
  - [x] 默认左侧第一项已选中
  - [x] 左侧文字信息消失问题
  - [x] 收缩左侧菜单栏的时候文字消失
    - [x] 当前方法待优化
    - [x] 使文字保持在居中位置
  - [x] 默认进入第一个子页面
  - [x] 多级路由切换问题未解决，需特殊考虑其他子层路由关系
    - [ ] 多级路由的子路由数据传递
    - [ ] 子路由的数据存储以及与父级之间的数据交换
  - [ ] electron 打包发布
- [ ] **视图处理方式**
  - [ ] 处理过程分类
    - [ ] 视图属性
    - [ ] 视图数据集
    - [ ] 独立数据集请求方法
  - [ ] 并发请求 & 并发渲染
    - [ ] 多图像之间的渲染不会受到影响
- [x] Canvas 和 SVG 的区别
  - [ ] 处理速度
  - [ ] CPU 与 GPU 耗能
- [ ] 待续...

### Finished

- [x] 实现 IPC 与主进程的交互功能，并实现新窗口的创建以及对应函数的响应操作
- [x] 关闭当前打开窗口以及返回上一级时关闭当前窗口
- [x] react 的 fetch 数据请求，目前传入的格式数据为 json
- [ ] 待续...

### Note

> ajax 的 readyState

0. 初始化，XMLHttpRequest对象还没有完成初始化
1. 载入，XMLHttpRequest对象开始发送请求
2. 载入完成，XMLHttpRequest对象的请求发送完成
3. 解析，XMLHttpRequest对象开始读取服务器的响应
4. 完成，XMLHttpRequest对象读取服务器响应结束

> 组件问题 & Function

1. 组件一定是首字母大写
2. render 外的 Function 不需要通过 this，可以直接引用

> [Chart.xkcd](https://timqian.com/chart.xkcd/)

``` bash
  npm i chart.xkcd
  npm i -S chart.xkcd-react
```
``` javascript
  import chartXkcd from 'chart.xkcd'
  import { Line, Bar, Pie, XY } from 'chart.xkcd-react'
```

> rough

1. [rough-charts](https://github.com/beizhedenglong/rough-charts)
2. [react-rough](https://github.com/ooade/react-rough)

> Hook

* 规则：
  - 只在最顶层使用Hook，不要在循环或嵌套函数中调用
  - 不要在普通 JavaScript 函数中调用

> Canvas & SVG

|       | Canvas | SVG
| ----- | ------ | ---
| 图形方式 | 标量图 | 矢量图
| 绘制方式 | JavaScript | XML
| 支持依赖 | 基于像素 | 基于图形元素
| 驱动 | 脚本驱动 | 脚本和CSS
| 依赖分辨率 | 是 | 否
| 支持事件处理器| 否 | 是
| 适合对象 | 图像密集型游戏 | 地图/大型渲染区域的应用程序

### Link

1. [React-router路由模块化封装](https://www.jianshu.com/p/d4283e7f3c3c)
2. [React点击事件的两种写法](https://www.jianshu.com/p/2a5c525e9a28)
3. [30分钟精通React今年最劲爆的新特性——React Hooks](https://segmentfault.com/a/1190000016950339)
4. [svg之path详解](https://www.jianshu.com/p/c819ae16d29b)

