import React from 'react';
import 'antd/dist/antd.css';
import { Form, Input, Button, Checkbox, Radio } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import { Row, Col } from 'antd';
import styles from '../styles/Home.module.css';
import CryptoJS from 'crypto-js';

const NormalLoginForm = () => {
  const router = useRouter();

  const onFinish = (values: any) => {
    const email = values.email;
    const password = CryptoJS.AES.encrypt('password', values.password);
    const role = values.role;
    localStorage.setItem('email', email);
    localStorage.setItem('password', password.toString());
    localStorage.setItem('role', role);
    router.push({
      pathname: '/dashboard',
      query: { email: email, password: password.toString(), role: role },
    });
  };

  const [role, setRole] = React.useState('Student');

  const options = [
    { label: 'Student', value: 'Student' },
    { label: 'Teacher', value: 'Teacher' },
    { label: 'Manager', value: 'Manager' },
  ];

  return (
    <Row>
      <Col xs={2} sm={4} md={6} lg={6} xl={8}></Col>
      <Col xs={20} sm={16} md={16} lg={12} xl={8}>
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
                    //console.log('radio3 checked', e.target.value);
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
      <Col xs={2} sm={4} md={4} lg={4} xl={6}></Col>
    </Row>
  );
};
export default NormalLoginForm;
