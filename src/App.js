import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
// import HelloIndex from './view/Hello/hello'
// import LoginIndex from './view/Login/login'
// import RegisterIndex from './view/Register/register'
// import MainView from './view/MainView/mainview'
import routeMap from './router/index'

class App extends Component {
  render () {
    return (
      <Router>
        <div className="main-style">
          {
            routeMap.map(({path, ComponentName, exact = true, routes = []}, key) => {
              // console.log(routes)
              return <Route
                      exact={exact}
                      key={key}
                      path={path}
                      render = {props => (
                        <ComponentName {...props} routes = {routes} />
                      )}
                      />
            })
          }
        </div>
      </Router>
    )
  }
}

export default App;
