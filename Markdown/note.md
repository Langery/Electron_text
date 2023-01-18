## Note

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

> Redux

> Canvas & SVG

|         | Canvas     | SVG            |
| ------- | ---------- | -------------- |
| 图形方式  | 标量图      | 矢量图          |
| 绘制方式  | JavaScript | XML            |
| 支持依赖  | 基于像素    | 基于图形元素     |
| 驱动     | 脚本驱动     | 脚本和CSS      |
| 依赖分辨率   | 是       | 否             |
| 支持事件处理器 | 否      | 是            |
| 适合对象    | 图像密集型游戏  | 地图/大型渲染区域的应用程序 |

> 生命周期

1. 组件将要挂载时：componentWillMount&emsp;|&emsp;
2. 组件挂载完成时：componentDidMount&emsp;|&emsp;useEffect
3. 是否要更新数据时：shouldComponentUpdate&emsp;|&emsp;
4. 将要更新数据时：componentWillUpdate&emsp;|&emsp;
5. 数据更新完成时：componentDidUpdate&emsp;|&emsp;useEffect
6. 组件将要销毁时：componentWillUnmount&emsp;|&emsp;useEffect 里面返回的函数
7. 父组件中改变了props传值时：componentWillReceiveProps&emsp;|&emsp;

> session & local & cookie

- session 临时会话存储
- local 永久存储