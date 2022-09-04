import React from "react";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, List, Popover, Typography } from "antd";
import Link from "next/link";

const Header: React.FC = ({ children }: { children: React.ReactChildren }) => {
  const PopOverContent = () => {
    const data = [
      {
        title: "Account",
        uri: "/account",
      },
      {
        title: "Logout",
        uri: "/home",
      },
    ];
    return (
      <List
        size="small"
        bordered
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <Link href={item.uri}>{item.title}</Link>
          </List.Item>
        )}
      />
    );
  };

  return (
    <div
      style={{
        position: "fixed",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 25px",
        borderRadius: "10px",
        marginTop: "20px",
        left: "10%",
        right: "10%",
        width: "80vw",
        backgroundColor: "white",
        boxShadow:
          "0 14px 30px rgb(103 132 187 / 15%), 0 4px 4px rgb(103 132 187 / 5%)",
      }}
    >
      <Typography.Title style={{ display: "inline-block" }} level={4}>
        iGallery
      </Typography.Title>

      <Popover placement="bottomRight" content={PopOverContent} trigger="click">
        <Avatar
          size={34}
          icon={<UserOutlined />}
          style={{ cursor: "pointer" }}
        />
      </Popover>
    </div>
  );
};

export default Header;
