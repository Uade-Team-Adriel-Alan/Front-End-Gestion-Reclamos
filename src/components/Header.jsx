import React from "react";
import { Layout, Menu } from "antd";
import {
  HomeOutlined,
  LoginOutlined,
  UserOutlined,
  ProfileOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const { Sider } = Layout;

export default function Header() {
  const { auth, logout } = useAuth(); // Obtén el usuario autenticado y la función de logout

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
          {/* Verifica el rol para redirigir al destino correspondiente */}
          {auth?.rol === "admin" ? (
            <Link to="/">Inicio</Link>
          ) : (
            <Link to={`/personas/${auth?.documento}`}>Inicio</Link>
          )}
        </Menu.Item>
        {!auth && (
          <Menu.Item key="2" icon={<LoginOutlined />}>
            <Link to="/login">Login</Link>
          </Menu.Item>
        )}
        {auth && auth.rol === "admin" && (
          <Menu.Item key="3" icon={<ProfileOutlined />}>
            <Link to="/reclamos">Gestionar Reclamos</Link>
          </Menu.Item>
        )}
        {auth && (
          <Menu.Item key="4" icon={<UserOutlined />}>
            <Link to={`/personas/${auth.documento}`}>Mi perfil</Link>
          </Menu.Item>
        )}
        {auth?.rol === "admin" && (
          <Menu.Item key="5" icon={<UserOutlined />}>
            <Link to="/personas">Gestionar Personas</Link>
          </Menu.Item>
        )}
        {auth && (
          <Menu.Item key="6" icon={<LogoutOutlined />} onClick={logout}>
            Cerrar sesión
          </Menu.Item>
        )}
      </Menu>
    </Sider>
  );
}
