import { useState } from 'react';
import { Form, Input, Tooltip, Row, Col, Checkbox, Button, message } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { request } from '../../server/request';
import './register.less';
import '../../common/common.css';

const leftTop = { paddingLeft: '20px' };

const RegisterIndex = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [size] = useState('large');
  const [confirmDirty, setConfirmDirty] = useState(false);

  const handleSubmit = async (values) => {
    console.log('Received values of form: ', values);
    if (typeof values.agreement === 'undefined') {
      message.error('Plase to agree the rules');
      return;
    }

    const sendData = {
      username: values.username,
      password: values.password,
      nickname: values.nickname
    };

    try {
      const data = await request.post('register', sendData);
      if (!data.backData) {
        message.error('The username or nickname had exist, plase to use a new username or nickname~');
      } else {
        console.log('add success');
        navigate('/login');
      }
    } catch (error) {
      console.error('Register error:', error);
    }
  };

  const clearData = () => {
    form.resetFields();
  };

  const handleConfirmBlur = (e) => {
    const { value } = e.target;
    setConfirmDirty(confirmDirty || !!value);
  };

  const compareToFirstPassword = async (rule, value) => {
    if (value && value !== form.getFieldValue('password')) {
      return Promise.reject('Two passwords that you enter is inconsistent!');
    }
    return Promise.resolve();
  };

  const validateToNextPassword = async (rule, value) => {
    if (value && confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
  };

  const formItemLayout = {
    labelCol: { xs: { span: 24 }, sm: { span: 6 } },
    wrapperCol: { xs: { span: 24 }, sm: { span: 18 } }
  };

  const tailFormItemLayout = {
    wrapperCol: {
      xs: { span: 24, offset: 0 },
      sm: { span: 16, offset: 8 }
    }
  };

  return (
    <div className="register-box">
      <Row>
        <Col span={6} style={leftTop}>
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
          <p className="title-p">Register</p>
          <Form {...formItemLayout} onFinish={handleSubmit} form={form}>
            <Form.Item
              label="name"
              name="username"
              rules={[
                { message: 'The input is not valid username!' },
                { required: true, message: 'Please input your username' }
              ]}
            >
              <Input placeholder="Name" />
            </Form.Item>
            <Form.Item
              label="Password"
              hasFeedback
              name="password"
              rules={[
                { required: true, message: 'Please input your password!' },
                { validator: validateToNextPassword }
              ]}
            >
              <Input type="password" placeholder="Password" />
            </Form.Item>
            <Form.Item
              label="Confirm Password"
              hasFeedback
              name="confirm"
              rules={[
                { required: true, message: 'Please confirm your password!' },
                { validator: compareToFirstPassword }
              ]}
            >
              <Input type="password" onBlur={handleConfirmBlur} />
            </Form.Item>
            <Form.Item
              label={
                <span>
                  Nickname&nbsp;
                  <Tooltip title="What do you want others to call you?"></Tooltip>
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
            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit" className="leftStyle">
                Register
              </Button>
              <Button type="primary" onClick={clearData} className="rightStyle">
                Clear Infor
              </Button>
            </Form.Item>
          </Form>
        </Col>
        <Col span={6} />
      </Row>
    </div>
  );
};

export default RegisterIndex;
