import React, { useState } from "react";
import { log, token } from "../services/AuthService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Form, Input, Button, Typography, Alert, Card } from "antd";

const { Title } = Typography;

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (values) => {
    setErrorMessage("");

    try {
      const idToken = await log.login(values.email, values.password);
      const userData = await token.login(idToken);
      login({ ...userData, token: idToken }); // Guarda el usuario en el contexto

      // Guarda los datos en el localStorage
      localStorage.setItem("auth", JSON.stringify({ ...userData, token: idToken }));

      if (userData.rol === "admin") {
        navigate("/");
      } else {
        navigate("/personas/" + userData.documento);
      }
    } catch (error) {
      setErrorMessage(error.message || "Error al iniciar sesión");
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <Card style={{ width: 400, padding: 24 }}>
        <Title level={3} style={{ textAlign: "center" }}>
          Iniciar sesión
        </Title>
        {errorMessage && (
          <Alert
            message={errorMessage}
            type="error"
            showIcon
            style={{ marginBottom: 16 }}
          />
        )}
        <Form
          layout="vertical"
          onFinish={handleLogin}
        >
          <Form.Item
            label="Correo electrónico"
            name="email"
            rules={[
              { required: true, message: "Por favor, ingresa tu correo electrónico" },
              { type: "email", message: "Por favor, ingresa un correo válido" },
            ]}
          >
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ejemplo: usuario@email.com"
            />
          </Form.Item>
          <Form.Item
            label="Contraseña"
            name="password"
            rules={[{ required: true, message: "Por favor, ingresa tu contraseña" }]}
          >
            <Input.Password
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingresa tu contraseña"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Enviar
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default Login;
