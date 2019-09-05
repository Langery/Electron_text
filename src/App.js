import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import HelloIndex from './view/Hello/hello'

class App extends Component {
  render () {
    return (
      <Router>
        <Switch>
          <div className="main-style">
            <HelloIndex></HelloIndex>
          </div>
        </Switch>
      </Router>
    )
  }
}

export default App;
