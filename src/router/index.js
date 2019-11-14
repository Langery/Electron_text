// import Loadable from 'react-loadable'
// import { Router, Route, Link } from 'react-router'
import HelloIndex from '../view/Hello/hello'
import LoginIndex from '../view/Login/login'
import RegisterIndex from '../view/Register/register'
import MainView from '../view/MainView/mainview'
import First from '../view/MainView/components/first'

// global.HelloIndex = Loadable({
//   loader: () => HelloIndex
// })
// global.LoginIndex = Loadable({
//   loader: () => LoginIndex
// })
// global.RegisterIndex = Loadable({
//   loader: () => RegisterIndex
// })
// global.MainView = Loadable({
//   loader: () => MainView
// })
// global.First = Loadable({
//   loader: () => First
// })

const routeMap = [
  {
    path: '/',
    ComponentName: HelloIndex,
    exact: true
  },
  {
    path: '/login',
    ComponentName: LoginIndex
  },
  {
    path: '/register',
    ComponentName: RegisterIndex
  },
  {
    path: '/mainview',
    ComponentName: MainView,
    routes: [
      {
        path: '/mainView/first',
        ComponentName: First
      }
    ]
  }
]

export default routeMap;