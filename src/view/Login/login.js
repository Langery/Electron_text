import { useState } from 'react';
import { Row, Col, Button, Form, Input, Checkbox, message } from 'antd';
import { LeftOutlined, UserAddOutlined, LockOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { PostWay } from '../../server/request';
import './login.css';
import '../../common/common.css';

const LoginIndex = () => {
  const navigate = useNavigate();
  const [size] = useState('large');

  const handleSubmit = async (values) => {
    console.log('Received values of form: ', values);
    const sendData = {
      username: values.username,
      password: values.password
    };
    const [url, options] = PostWay('login', sendData);

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      if (!data.backData) {
        message.error('The username or password is not exist, please to register user~');
      } else {
        console.log('log in success');
        navigate('/mainpage');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className="login-box">
      <Row>
        <Col span={6} className="leftTop">
          <Link to="/">
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
          <Form onFinish={handleSubmit} className="login-form">
            <Form.Item
              name="username"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input
                prefix={<UserAddOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Username"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please input your Password!' }]}
            >
              <Input
                prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item name="remember" valuePropName="checked" initialValue={false}>
              <Checkbox>Remember me</Checkbox>
              <a className="login-form-forgot" href="/">Forgot password</a>
              <Button type="primary" htmlType="submit" className="login-form-button">
                Log in
              </Button>
              Or <a href="/register/">register now!</a>
            </Form.Item>
          </Form>
        </Col>
        <Col span={6} />
      </Row>
    </div>
  );
};

export default LoginIndex;
