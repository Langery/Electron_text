## Electron_text

![](https://img.shields.io/badge/Frame-Ant--design-blue)
![](https://img.shields.io/badge/branch-master-green)

## Menu

- [初识](#chu)
- [启动项目](#qi)
- [idea](#idea)
- [To be resolved](#todo)
- [Finished](#finish)
- [React 底层逻辑](#underlying)
- [独立组件库](#components)
- [Link](#link)

### <a id="chu">初识</a>

> 官网：[Electron](https://electronjs.org/)

### <a id="qi">启动项目</a>

```node
  $ npm start
  $ npm run estart
```

### <a id="idea">idea</a>

> 业务层

- [ ] 路由
  - [x] 当前小组件化内容跳转
  - [x] 子组件路由跳转
  - [x] 封装公用函数
  - [ ] 卫星导航
- [x] 目录结构与分配
  - [ ] 组件划分
  - [ ] 模块划分
  - [ ] 逻辑划分
  - [ ] 逻辑函数处理
  - [ ] 共用函数体处理以及特殊情况应用
- [ ] [redux](https://www.redux.org.cn/)
- [x] hook 机制
- [ ] history
- [ ] 算法
- [ ] 待续...

> 功能层

- [x] 登录/注册模块
  - [x] 基本功能
  - [ ] 登录信息验证
  - [x] 后台接口处理 & 前端输入数据处理
  - [ ] 第三方信息验证
  - [ ] 第三方登录/注册
  - [ ] 验证码获取
    - [ ] 短信验证
    - [ ] 图像验证
- [ ] 用户守则
  - [ ] 中英文切换
    - [ ] 多语言
  - [ ] 规则
- [x] 欢迎界面 -> 过渡
- [ ] 目录模块
  - [ ] 目录模块划分
  - [ ] 聊天 -> 通讯
    - [ ] 文本/文本通讯
    - [ ] 图片
    - [ ] 音频/语音通讯
    - [ ] 视频/视频通讯
  - [ ] 资讯
    - [ ] 信息展示
      - [ ] 传统新闻信息展示
      - [ ] 卡片信息展示
        - [ ] 超链接信息展示
  - [ ] 支付
    - [ ] 接入第三方平台
  - [ ] 绘图
    - [ ] 二维
      - [ ] 图表
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
    - [ ] 引擎
    - [ ] 游戏类型、模块细化
  - [ ] GIS
    - [ ] 地图
      - [ ] 第三方地图引入
        - [x] [百度地图](http://lbsyun.baidu.com/)
          - [ ] 待开发...
      - [ ] 地图点位，点击后获取到位置坐标信息
      - [ ] 地图选点
  - [ ] 第三方
  - [ ] 特殊功能实现...
  - [ ] ~~日历，用于记录一日常~~&ensp;[此节点下所有开发暂停或取消]
    - [x] 点击日历中的每一天出现弹框
    - [x] 数据处理
      - [ ] 存新数据
      - [ ] 编辑旧数据
      - [x] 数据处理
      - [ ] 存数据
      - [ ] 取数据
    - [ ] 每一个日期可以点击记录，记录的信息录入后台数据库中
    - [x] 点击每个日期出现编辑菜单，进行信息录入，直接传递给后台
    - [ ] 点击编辑时可执行添加、删除、修改的操作
    - [ ] 日历有多种展示方式
      - [ ] 通屏日历，可以随时点击一个出现编辑操作页
      - [ ] 小日历，点击后右侧显示编辑操作页
  - [ ] [mdx-deck](https://github.com/jxnblk/mdx-deck)
  - [ ] [code-surfer](https://github.com/pomber/code-surfer)
      - [ ] code-hike
  - [ ] 拖拽模块
- [ ] 待续...

> 网络层

- [x] 实现简单后台数据连接
  - [x] fetch
  - [ ] ajax
  - [ ] axios
- [ ] 优化封装请求方式
- [ ] 垃圾数据收集与处理
- [ ] 请求安全问题
- [ ] 部分信息暴露（针对于PC层）
- [ ] 高数据量并发处理
- [ ] 待续...

> 数据层 - 网络安全

- [ ] 防御式编程思想
- [ ] 代码健壮性
- [ ] Single-SPA
- [ ] 错误日志输出
- [ ] 待续...

> 物理层

- [ ] Tree-Shaking

> 代码分支化开发

- [ ] 根据不同的功能进行分支创建
  - [ ] 划分多个分支，每个分支进行单独的代码处理
  - [ ] 多人团队合作模式
- [ ] 完成某个模块后进行 Code Review
- [x] 提交 Commit 格式化
  - 使用 `git cz` 代替 `git commit`

### <a id="todo">To be resolved</a>

- [x] 不实现新打开窗口，只是在当前状态下进行界面跳转
- [x] react 嵌入到 electron 中
- [x] 以实现路由封装，但是未实现子级路由获取
  - [x] 默认指定第一个子路由
  - [x] 默认左侧第一项已选中
  - [x] 左侧文字信息消失问题
  - [x] 收缩左侧菜单栏的时候文字消失
  - [x] 当前方法待优化
  - [x] 使文字保持在居中位置
  - [x] 点击图标触发跳转事件
  - [x] 默认进入第一个子页面
  - [x] 多级路由切换问题未解决，需特殊考虑其他子层路由关系
  - [x] 多级路由的子路由数据传递
  - [x] 子路由的数据存储以及与父级之间的数据交换
- [x] **重新定义视图，删除之前所有逻辑**
- [ ] TypeScript
- [ ] 视图处理方式
  - [ ] 处理过程分类
  - [ ] 视图属性
  - [ ] 视图数据集
  - [ ] 独立数据集请求方法
  - [ ] 并发请求 & 并发渲染
  - [ ] 多图像之间的渲染不会受到影响
- [x] Canvas 和 SVG 的区别
  - [ ] 处理速度
  - [ ] CPU 与 GPU 耗能
- [ ] electron 打包发布
  - [ ] Github Actions
- [ ] GUI 嵌入
- [ ] 待续...

### <a id="finish">Finished</a>

- [x] 实现 IPC 与主进程的交互功能，并实现新窗口的创建以及对应函数的响应操作
- [x] 关闭当前打开窗口以及返回上一级时关闭当前窗口
- [x] react 的 fetch 数据请求，目前传入的格式数据为 json
- [x] DOM 渲染前获取后台数据信息
- [ ] 待续...

### <a id="underlying">React 底层逻辑</a>

- [x] forwardRef
- [ ] useImperativeHandle
- [ ] ref
  - [x] createRef & useRef
- [ ] useContext
- [ ] getPrefixCls
- [ ] getMergedStatus
- [ ] as
- [x] interface
  - [x] extends

### <a id="components">独立组件库 [页面必用组件库]</a>
*基于 Ant Design 的封装组件库，持续扩展中...*<br />
*当前组件为页面必须使用组件，后期做非页面必须组件，持续扩展中...*
- [ ] Form
- [ ] Input


### <a id="link">Link</a>

1. [React-router路由模块化封装](https://www.jianshu.com/p/d4283e7f3c3c)
2. [React点击事件的两种写法](https://www.jianshu.com/p/2a5c525e9a28)
3. [30分钟精通React今年最劲爆的新特性——React Hooks](https://segmentfault.com/a/1190000016950339)
4. [svg之path详解](https://www.jianshu.com/p/c819ae16d29b)
5. [React-Redux 中文文档](https://segmentfault.com/a/1190000017064759?utm_source=tag-newest)
6. [ionic](https://ionic.io/ionicons)
7. [最陌生的hooks: useImperativeHandle](https://jishuin.proginn.com/p/763bfbd6816b)
8. [useCallBack,useMemo,forwardRef,useImperativeHandle用法总结](https://www.jianshu.com/p/75d15003b4fc)
9. [教你写一个 React 状态管理库](https://baijiahao.baidu.com/s?id=1716945978446095405&wfr=spider&for=pc)
10. [用TypeScript编写React的最佳实践](https://baijiahao.baidu.com/s?id=1716649947174314729&wfr=spider&for=pc)
11. [React Class Component ref Antd Form resetFields](https://zhuanlan.zhihu.com/p/394150319)