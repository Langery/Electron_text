import React, { Component } from "react";
import './home.css'
import { Button } from 'antd';
import { Link } from 'react-router-dom';

class HomeIndex extends Component {
  render () {
    return (
      <div className="home-body">
        <p className="text-style">
          The heart of Bohemia
        </p>
        <p className="p-text">
          It is a index to welcome.<br/>
          Please login or register
        </p>
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

export default HomeIndex;