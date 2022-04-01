import React, { Component } from "react"
import { Form, Input, Tooltip, Row, Col, Checkbox, Button, message } from 'antd';

// UserAddOutlined
import { LeftOutlined } from '@ant-design/icons';

import './register.less'
import '../../common/common.css'
import { Link } from 'react-router-dom'
// import { PostWay } from '../../common/common'
import { PostWay } from '../../server/request'


const leftTop = {
  paddingLeft: '20px'
}

class RegisterIndex extends Component {
  state = {
    size: 'large',
    autoCompleteResult: [],
    confirmDirty: false
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
        if (typeof(values.agreement) == 'undefined') {
          message.error('Plase to agree the rules')
          return
        }
        let sendData = {
          username: values.username,
          password: values.password,
          nickname: values.nickname
        }
        const getWay = PostWay('register', sendData)
        console.log(getWay)
    
        fetch(getWay[0], getWay[1])
          .then(res => {
            if (res.ok) {
              return res.json()
            } else {
              // TODO
              console.log('error')
            }
          })
          .then(data => {
            if (!data.backData) {
              message.error('The username or nickname had exist, plase to use a new username or nickname~')
            } else {
              // TODO
              console.log('add success')
            }
          })
      } else {
        console.log('No get the received values of form')
      }
    })
  }
  clearData = e => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll(() => { this.props.form.resetFields() })
  }
  handleConfirmBlur = e => {
    const { value } = e.target
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }
  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!')
    } else {
      callback()
    }
  }
  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }
  render () {
    const { size } = this.state
    // const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 },
      }
    }
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    }
    return (
      <div className="register-box">
        <Row>
          <Col span={6} style={leftTop}>
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
            <p className="title-p">Register</p>
            <Form {...formItemLayout} onSubmit={this.handleSubmit}>
              <Form.Item label="name" name="username" rules={[
                    {
                      message: 'The input is not valid username!'
                    },
                    {
                      required: true,
                      message: 'Please input your username',
                    },
                  ]}>
                  <Input placeholder="Name" />
              </Form.Item>
              <Form.Item label="Password" hasFeedback name="password" rules={[
                    {
                      required: true,
                      message: 'Please input your password!',
                    },
                    {
                      validator: this.validateToNextPassword,
                    }
                  ]}>
                  <Input type="password" placeholder="Password" />
              </Form.Item>
              <Form.Item label="Confirm Password" hasFeedback name="confirm" rules={[
                    {
                      required: true,
                      message: 'Please confirm your password!',
                    },
                    {
                      validator: this.compareToFirstPassword,
                    }
                  ]}>
                <Input type="password" onBlur={this.handleConfirmBlur} />
              </Form.Item>
              <Form.Item
                label={
                  <span>
                    Nickname&nbsp;
                    <Tooltip title="What do you want others to call you?">
                      {/* <UserAddOutlined /> */}
                    </Tooltip>
                  </span>
                }
                name="nickname"
                rules={[{ required: true, message: 'Please input your nickname!', whitespace: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item {...tailFormItemLayout} name="agreement" valuePropName="checked">
                  <Checkbox className="leftStyle">
                    I have read the <a href="/">agreement</a>
                  </Checkbox>
              </Form.Item>
              {/* register zone */}
              <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit" className="leftStyle">
                  Register
                </Button>
                <Button type="primary" onClick={this.clearData} className="rightStyle">
                  Clear Infor
                </Button>
              </Form.Item>
            </Form>
          </Col>
          <Col span={6}></Col>
        </Row>
      </div>
    )
  }
}
// const RegisterIndex = Form({ name: 'normal_register' })(RegisterForm)
export default RegisterIndex;
