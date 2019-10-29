import React, { Component } from "react";
// import './hello.css'
import { Button } from 'antd';
import { Link } from 'react-router-dom';

class First extends Component {
  render () {
    return (
      <div className="hello-body">
        <p className="text-style">
          Hello Electron
        </p>
        <p className="p-text">It is a index to welcome</p>
        <p className="p-text">Please login or register</p>
        <div className="btn-box">
          <Link to='/login/'>
            <Button type="primary">Log In</Button>
          </Link>
          <Link to="/register/">
            <Button type="primary">Register</Button>
          </Link>
        </div>
      </div>
    )
  }
}

export default First;