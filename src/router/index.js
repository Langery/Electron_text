import HomeIndex from '../view/Home/home'
import LoginIndex from '../view/Login/login'
import RegisterIndex from '../view/Register/register'
// import MainView from '../view/MainView/mainview'

// import IndexView from '../view/MainView/components/indexview'

// import ChartxkcdIndex from '../view/MainView/components/chartxkcd'
// import ListIndex from '../view/MainView/components/listed';
// import ConnectIndex from '../view/MainView/components/connenct';
import MainPage from '../view/Pages/mainpage';
import DragPage from '../view/Pages/dragpage';
// demo
import DemoPage from '../view/demo/demopage';


const routeMap = [
  {
    path: '/',
    ComponentName: HomeIndex,
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
    path: '/mainpage',
    ComponentName: MainPage
  },
  {
    path: '/dragpage',
    ComponentName: DragPage
  },
  {
    path: '/demo',
    ComponentName: DemoPage
  }
  // {
  //   path: '/mainview',
  //   ComponentName: MainView,
  //   routes: [
  //     {
  //       path: '/mainView',
  //       ComponentName: IndexView
  //     },
  //     {
  //       path: '/mainView/map',
  //       ComponentName: MapView
  //     },
  //     {
  //       path: '/mainView/rough',
  //       ComponentName: RoughIndex
  //     },
  //     {
  //       path: '/mainView/chartxkcd',
  //       ComponentName: ChartxkcdIndex
  //     },
  //     {
  //       path: '/mainView/list',
  //       ComponentName: ListIndex
  //     },
  //     {
  //       path: '/mainView/connection',
  //       ComponentName: ConnectIndex
  //     }
  //   ]
  // }
]

export default routeMap;