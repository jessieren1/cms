import React from 'react';
import 'antd/dist/antd.css';
import { Form, Input, Button, Checkbox, Radio } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';

const NormalLoginForm = () => {
  const router = useRouter();

  const onFinish = (values: any) => {
    console.log(values);
    // localStorage.setItem('email', values.email);
    // localStorage.setItem('password', values.password);
    // localStorage.setItem('loginType', values.loginType);
    // localStorage.setItem('remember', values.remember);
    //localStorage.setItem("form",JSON.stringify(values));
    router.push('/dashboard');
  };

  const [loginType, setLoginType] = React.useState('Student');

  const options = [
    { label: 'Student', value: 'Student' },
    { label: 'Teacher', value: 'Teacher' },
    { label: 'Manager', value: 'Manager' },
  ];

  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <Form.Item
        name="loginType"
        initialValue={loginType}
        rules={[
          {
            required: true,
            message: 'Please choose your Login Type!',
          },
        ]}
      >
        <Radio.Group
          options={options}
          onChange={(e) => {
            //console.log('radio3 checked', e.target.value);
            setLoginType(e.target.value);
          }}
          value={loginType}
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
  );
};
export default NormalLoginForm;