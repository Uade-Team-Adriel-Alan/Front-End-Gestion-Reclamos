import React from "react";
import { Layout, Menu } from "antd";
import { HomeOutlined, LoginOutlined, UserOutlined, ProfileOutlined, LogoutOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../services/AuthService";  // Asegúrate de importar el servicio de autenticación

const { Sider } = Layout;

export default function Header() {
  const navigate = useNavigate();  // Usamos el hook useNavigate para redirigir

  const handleLogout = () => {
    auth.logout();  // Llama al servicio de cierre de sesión
    navigate('/login');  // Redirige a la página de login después de cerrar sesión
  };

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
        <Menu.Item key="3" icon={<ProfileOutlined />}>
          <Link to="/reclamos">Gestionar Reclamos</Link>
        </Menu.Item>
        <Menu.Item key="4" icon={<UserOutlined />}>
          <Link to="/personas">Gestionar Personas</Link>
        </Menu.Item>

        {/* Aquí se agrega el botón de Cerrar sesión */}
        <Menu.Item key="5" icon={<LogoutOutlined />} onClick={handleLogout}>
          Cerrar sesión
        </Menu.Item>
      </Menu>
    </Sider>
  );
}
