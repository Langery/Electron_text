import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import routeMap from './router/index';

class App extends Component {
  componentWillMount() {
    // 引入图标库
    let script1 = document.createElement('script');
    let script2 = document.createElement('script');
    script1.type = 'text/javascript';
    script2.type = 'text/javascript';
    script1.src = 'https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js';
    script2.src = 'https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js';
    document.body.appendChild(script1);
    document.body.appendChild(script2);
  }
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
