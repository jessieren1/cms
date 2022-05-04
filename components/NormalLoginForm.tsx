import React from 'react';
import 'antd/dist/antd.css';
import { Form, Input, Button, Checkbox, Radio, message, Row, Col } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css';
import Cryptojs from 'crypto-js';
import { login } from 'lib/services/auth-api';
const NormalLoginForm = () => {
  const router = useRouter();

  const onFinish = (values: any) => {
    login(values).then((res) => {
      localStorage.setItem('role', res.data.role);
      localStorage.setItem('token', res.data.token);
      router.push({
        pathname: '/dashboard/' + values.role.toLowerCase(),
      });
    });
  };

  const [role, setRole] = React.useState('Student');

  const options = [
    { label: 'Student', value: 'Student' },
    { label: 'Teacher', value: 'Teacher' },
    { label: 'Manager', value: 'Manager' },
  ];

  return (
    <Row justify="center">
      <Col md={8} sm={24}>
        <div className={styles.container}>
          <main className={styles.main}>
            <h1 className={styles.title}>Course Management Assistant</h1>
            <Form
              name="normal_login"
              className="login-form"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
            >
              <Form.Item
                name="role"
                initialValue={role}
                rules={[
                  {
                    required: true,
                    message: 'Please choose your role !',
                  },
                ]}
              >
                <Radio.Group
                  options={options}
                  onChange={(e) => {
                    setRole(e.target.value);
                  }}
                  value={role}
                  optionType="button"
                />
              </Form.Item>

              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: 'Please input your email!',
                  },
                  {
                    type: 'email',
                  },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="xxx@admin.com"
                  type="email"
                />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Please input your Password!',
                  },
                  { min: 4, max: 16 },
                ]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>

              <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <a className="login-form-forgot" href="">
                  Forgot password
                </a>
              </Form.Item>

              <Form.Item>
                <Button block type="primary" htmlType="submit" className="login-form-button">
                  Log in
                </Button>
              </Form.Item>

              <Form.Item>
                No account?
                <a href="">register now!</a>
              </Form.Item>
            </Form>
          </main>
        </div>
      </Col>
    </Row>
  );
};
export default NormalLoginForm;
