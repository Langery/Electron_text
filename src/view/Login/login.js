import React, { Component } from "react";
import { Row, Col, Button, Form, Input, Checkbox, message  } from 'antd';
import { LeftOutlined, UserAddOutlined, LockOutlined } from '@ant-design/icons';
import './login.css'
import '../../common/common.css'
import { Link } from 'react-router-dom'
// import { PostWay } from '../../common/common'
import { PostWay } from '../../server/request'

class LoginIndex extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
        let sendData = {
          username: values.username,
          password: values.password
        }
        const getWay = PostWay('login', sendData)
        console.log(getWay)
        fetch(getWay[0], getWay[1])
          .then(response => {
            return response.json()
          })
          .then(data => {
            if (!data.backData) {
              message.error('The username or password is not exist, please to register user~')
            } else {
              console.log('log in success');
              this.props.history.push('/mainpage');
            }
          })
      } else {
        console.log('No get the received values of form')
      }
    })
  }
  state = {
    size: 'large'
  }
  render () {
    const { size } = this.state
    return (
      <div className="login-box">
        <Row>
          <Col span={6} className="leftTop">
            <Link to='/'>
              <Button.Group size={size}>
                <Button type="primary">
                  <LeftOutlined />
                  Backward
                </Button>
              </Button.Group>
            </Link>
          </Col>
          <Col span={12}>
            <p className="title-p">Log In</p>
            <Form onSubmit={this.handleSubmit} className="login-form">
              <Form.Item name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
                  <Input
                    prefix={<UserAddOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="Username"
                  />
              </Form.Item>
              <Form.Item name="password" rules={[{ required: true, message: 'Please input your Password!' }]}>
                  <Input
                    prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="Password"
                  />
              </Form.Item>
              <Form.Item name="remember" valuePropName="checked" initialValue={false}>
                <Checkbox>Remember me</Checkbox>
                <a className="login-form-forgot" href="/">
                  Forgot password
                </a>
                <Button type="primary" htmlType="submit" className="login-form-button">
                  Log in
                </Button>
                Or <a href="/register/">register now!</a>
              </Form.Item>
            </Form>
          </Col>
          <Col span={6}></Col>
        </Row>
      </div>
    )
  }
}

export default LoginIndex;
