import HelloIndex from '../view/Hello/hello'
import LoginIndex from '../view/Login/login'
import RegisterIndex from '../view/Register/register'
import MainView from '../view/MainView/mainview'
import MapView from '../view/MainView/components/map'
import IndexView from '../view/MainView/components/indexview'
import RoughIndex from '../view/MainView/components/rough'
import ChartxkcdIndex from '../view/MainView/components/chartxkcd'
import ListIndex from '../view/MainView/components/listed';
import ConnectIndex from '../view/MainView/components/connenct';


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
        path: '/mainView',
        ComponentName: IndexView
      },
      {
        path: '/mainView/map',
        ComponentName: MapView
      },
      {
        path: '/mainView/rough',
        ComponentName: RoughIndex
      },
      {
        path: '/mainView/chartxkcd',
        ComponentName: ChartxkcdIndex
      },
      {
        path: '/mainView/list',
        ComponentName: ListIndex
      },
      {
        path: '/mainView/connection',
        ComponentName: ConnectIndex
      }
    ]
  }
]

export default routeMap;