import { Row, Col, Button, Form, Input, Checkbox, message } from 'antd';
import { LeftOutlined, UserAddOutlined, LockOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../../server/request';
import useRequest from '../../hooks/useRequest';
import './login.css';
import '../../common/common.css';

const LoginIndex = () => {
  const navigate = useNavigate();
  const SIZE = 'large';

  // 点击触发, 用 manual; refetch(sendData) 携带表单数据
  // 失败已由 hook 内部统一 message.error, 这里只处理"成功但 backData 为空"的业务语义
  const { loading, refetch: login } = useRequest(
    (params, { signal }) => api.post('login', params, { signal }),
    { manual: true }
  );

  const handleSubmit = async (values) => {
    const sendData = {
      username: values.username,
      password: values.password
    };

    const data = await login(sendData);
    if (data === undefined) return; // 被 abort 或已 toast 的错误, 不再继续
    if (!data.backData) {
      message.error('The username or password is not exist, please to register user~');
    } else {
      navigate('/mainpage');
    }
  };

  return (
    <div className="login-box">
      <Row>
        <Col span={6} className="leftTop">
          <Link to="/">
            <Button.Group size={SIZE}>
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
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                loading={loading}
              >
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
