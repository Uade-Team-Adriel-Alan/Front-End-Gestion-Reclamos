import React, { useState } from "react";
import { Layout, Menu, Switch } from "antd";
import {
  HomeOutlined,
  LoginOutlined,
  UserOutlined,
  ProfileOutlined,
  LogoutOutlined,
  MehOutlined
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const { Sider } = Layout;

export default function Header() {
  const { auth, logout } = useAuth(); // Obtén el usuario autenticado y la función de logout
  const [theme, setTheme] = useState("light"); // Estado para manejar el tema

  const toggleTheme = (checked) => {
    setTheme(checked ? "dark" : "light"); // Cambia el estado según el valor del interruptor
  };

  return (
    <Sider
      width={250}
      style={{
        position: "fixed", // Fijar el Sider en la parte izquierda
        top: 0, // Alinear al top de la pantalla
        bottom: 0, // Asegurarse de que ocupe hasta el fondo
        height: "100vh", // Ocupa todo el alto de la pantalla
        backgroundColor: theme === "dark" ? "#001529" : "#f0f2f5", // Cambia el fondo según el tema
      }}
    >
      <div
        style={{
          padding: "16px",
          fontSize: "18px",
          fontWeight: "bold",
          textAlign: "center",
          borderBottom: "1px solid #ddd",
          color: theme === "dark" ? "#fff" : "#000", // Cambia el color del texto según el tema
        }}
      >
        Mi Aplicación
      </div>
      <div
        style={{
          textAlign: "center",
          margin: "16px 0",
        }}
      >
        <Switch
          checked={theme === "dark"}
          onChange={toggleTheme}
          checkedChildren="Dark"
          unCheckedChildren="Light"
        />
      </div>
      <Menu
        mode="vertical"
        defaultSelectedKeys={["1"]}
        theme={theme} // Aplica el tema al menú
        style={{
          borderRight: 0,
        }}
      >
        <Menu.Item key="1" icon={<HomeOutlined />}>
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
          <Menu.Item key="4" icon={<MehOutlined />}>
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
