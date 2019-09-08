import React, { Component } from "react";
import { Row, Col } from 'antd'
import { Button, Icon } from 'antd';
import './login.css'
import { Link } from 'react-router-dom'

const leftTop = {
  paddingLeft: '20px'
}
class LoginIndex extends Component {
  state = {
    size: 'large'
  }
  render () {
    const { size } = this.state
    return (
      <div className="login-box">
        <Row>
          <Col span={6} style={leftTop}>
            <Link to='/'>
              <Button.Group size={size}>
                <Button type="primary">
                  <Icon type="left" />
                  Backward
                </Button>
              </Button.Group>
            </Link>
          </Col>
          <Col span={12}>
            <p className="title-p">Log In</p>
            
          </Col>
          <Col span={6}></Col>
        </Row>
      </div>
    )
  }
}

export default LoginIndex;