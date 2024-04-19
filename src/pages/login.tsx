import React, { useState } from "react";
import { Button, Checkbox, Form, Input, Typography, message, Space } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import './login.css';
import { useNavigate } from "react-router-dom";

const { Text, Title, Link } = Typography;

interface LoginProps {}

const Login: React.FC<LoginProps> = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();
    const onFinish = async (values: any) => {
        setLoading(true);
      try {
        const response = await fetch('http://localhost:8000/login/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(values)
        });
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const data = await response.json();
        console.log('API Response:', data);
        if (data.type === 'success') {
          setTimeout(() => {
            navigate('/dashboard'); // Navigate to '/dashboard' route after 2 seconds
          }, 1000);
        }
        const alertmsg = () => {
          messageApi.open({
            type: data.type,
            content: data.message,
          });
        };
        alertmsg();
      } catch (error) {
        console.error('Error:', error);
      }
    };
  return (
    <section className="login-section">
      <div className="login-container">
        <div className="login-header">
        <svg
            width="25"
            height="24"
            viewBox="0 0 25 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="0.464294" width="24" height="24" rx="4.8" fill="#1890FF" />
            <path
              d="M14.8643 3.6001H20.8643V9.6001H14.8643V3.6001Z"
              fill="white"
            />
            <path
              d="M10.0643 9.6001H14.8643V14.4001H10.0643V9.6001Z"
              fill="white"
            />
            <path
              d="M4.06427 13.2001H11.2643V20.4001H4.06427V13.2001Z"
              fill="white"
            />
          </svg>

          <Title level={2}>Login</Title>
          <Text className="hello">
            Welcome back to L&T!
          </Text>
        </div>
        {contextHolder}
        <Space>
        <Form
          name="normal_login"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          layout="vertical"
          requiredMark="optional"
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your Username!",
              },
            ]}
          >
            <Input prefix={< UserOutlined/>} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
          </Form.Item>
          <Form.Item style={{ marginBottom: "0px" }}>
            <Button type="primary" htmlType="submit">
              Log in
            </Button>
          </Form.Item>
        </Form>
        </Space>
      </div>
    </section>
  );
};

export default Login;
