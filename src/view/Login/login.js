import React, { Component } from "react";
import { Row, Col, Button, Icon, Form, Input, Checkbox, message  } from 'antd';
import './login.css'
import '../../common/common.css'
import { Link } from 'react-router-dom'
import { PostWay } from '../../common/common'


const leftTop = {
  paddingLeft: '20px'
}

class NormalLoginForm extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
        let sendData = {
          username: values.username,
          password: values.password
        }
        const getWay = PostWay(sendData, 'login')
        console.log(getWay)
        fetch(getWay[0], getWay[1])
          .then(response => {
            return response.json()
          })
          .then(data => {
            console.log(data)
            if (!data.backData) {
              message.error('The username or password is not exist, plase to register user~')
            } else {
              console.log('log in success')
              this.props.history.push('/mainView')
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
    const { getFieldDecorator } = this.props.form
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
            <Form onSubmit={this.handleSubmit} className="login-form">
              <Form.Item>
                {getFieldDecorator('username', {
                  rules: [{ required: true, message: 'Please input your username!' }],
                })(
                  <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="Username"
                  />,
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: 'Please input your Password!' }],
                })(
                  <Input
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="Password"
                  />,
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('remember', {
                  valuePropName: 'checked',
                  initialValue: false,
                })(<Checkbox>Remember me</Checkbox>)}
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
const LoginIndex = Form.create({ name: 'normal_login' })(NormalLoginForm)
export default LoginIndex;