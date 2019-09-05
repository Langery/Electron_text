import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom'
import HelloIndex from './view/Hello/hello'

class App extends Component {
  render () {
    return (
      <Router>
        <div className="main-style">
          <HelloIndex></HelloIndex>
        </div>
      </Router>
    )
  }
}

export default App;
