import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import HelloIndex from './view/Hello/hello'
import LoginIndex from './view/Login/login'
import RegisterIndex from './view/Register/register'
import MainView from './view/MainView/mainview'

class App extends Component {
  render () {
    return (
      <Router>
        <div className="main-style">
          <Route exact path="/" component={HelloIndex}></Route>
          <Route exact path="/login" component={LoginIndex}></Route>
          <Route exact path="/register" component={RegisterIndex}></Route>
          <Route exact path="/mainView" component={MainView}></Route>
        </div>
      </Router>
    )
  }
}

export default App;
