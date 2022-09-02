import React from "react";
import { useRouter } from "next/router";
import { Card, Button, Form, Input, Typography, message } from "antd";
import { queryUser } from "../helpers/ipcrenderer";

const Login: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const router = useRouter();

  const handleOnSubmit = async (user: Object) => {
    setIsLoading(true);
    try {
      await queryUser({ event: "login", user })
        .then(() => {
          router.push("/gallery");
        })
        .catch((err) => {
          message.error(err);
        });
    } catch (error) {
      message.error(error);
    }
    setIsLoading(false);
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        style={{
          width: "50vw",
          height: "auto",
          borderRadius: 10,
          boxShadow:
            "0 14px 30px rgb(103 132 187 / 15%), 0 4px 4px rgb(103 132 187 / 5%)",
        }}
      >
        <Typography.Title
          level={3}
          style={{ textAlign: "right", marginBottom: 30 }}
        >
          Login
        </Typography.Title>

        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={handleOnSubmit}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
            <Button type="primary" htmlType="submit" loading={isLoading}>
              Login
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
