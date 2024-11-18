import React from "react";
import { Layout, Menu } from "antd";
import { HomeOutlined, LoginOutlined, UserOutlined, ProfileOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Sider } = Layout;

export default function Header() {
  return (
    <Sider
      width={250}
      style={{
        height: "100vh",
        backgroundColor: "#f0f2f5", // Fondo claro para el sidebar
      }}
    >
      <div
        style={{
          padding: "16px",
          fontSize: "18px",
          fontWeight: "bold",
          textAlign: "center",
          borderBottom: "1px solid #ddd",
        }}
      >
        Mi Aplicación
      </div>
      <Menu
        mode="vertical"
        defaultSelectedKeys={["1"]}
        style={{
          borderRight: 0,
        }}
      >
        <Menu.Item key="1" icon={<HomeOutlined />}>
          <Link to="/">Inicio</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<LoginOutlined />}>
          <Link to="/login">Login</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<LoginOutlined />}>
          <Link to="/login">Mis reclamos</Link>
        </Menu.Item>
        <Menu.Item key="4" icon={<ProfileOutlined />}>
          <Link to="/reclamos">Gestionar Reclamos</Link>
        </Menu.Item>
        <Menu.Item key="5" icon={<UserOutlined />}>
          <Link to="/personas">Gestionar Personas</Link>
        </Menu.Item>
        
      </Menu>
    </Sider>
  );
}
