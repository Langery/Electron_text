import { Router, Route, Link } from 'react-router'
import HelloIndex from '../view/Hello/hello'
import LoginIndex from '../view/Login/login'
import RegisterIndex from '../view/Register/register'

const routeMap = [
  {
    path: '/',
    componentName: HelloIndex,
    exact: true
  },
  {
    path: '/login',
    componentName: LoginIndex
  },
  {
    path: '/register',
    componentName: RegisterIndex
  }
]

export default routeMap;