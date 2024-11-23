import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { Layout } from "antd";
import Header from "./components/Header";
import Login from "./components/Login";
import Home from "./pages/Home";
import ReclamosPorEdificio from "./pages/Reclamos/ReclamosPorEdificio";
import UnidadesPorEdificio from "./pages/Unidades/UniadesPorEdificio";
import UnidadEspecifico from "./pages/Unidades/UnidadEspesifico";
import ReclamosList from "./pages/Reclamos/ReclamosList";
import PrivateRoute from "./components/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";
import "./App.css";
import PersonaList from "./pages/Personas/PersonasList";
import PersonaEspecifico from "./pages/Personas/PersonaEspesifico";
import RoleBasedRoute from "./components/RoleBasedRoute";

const { Content } = Layout;

// Componente principal para manejar el layout
function AppLayout({ children }) {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <Layout style={{ minHeight: "100vh", backgroundColor: "#14213d" }}>
      {/* Renderiza el header solo si no estamos en la página de login */}
      {!isLoginPage && <Header />}
      <Layout>
        <Content style={{ padding: "16px", backgroundColor: "#f5ebe0" }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppLayout>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
            <Route
              path="/reclamos"
              element={
                <PrivateRoute>
                  <ReclamosList />
                </PrivateRoute>
              }
            />
            <Route
              path="/edificios/:codigoEdificio/reclamos"
              element={
                <PrivateRoute>
                  <ReclamosPorEdificio />
                </PrivateRoute>
              }
            />
            <Route
              path="/edificios/:codigoEdificio/unidades"
              element={
                <PrivateRoute>
                  <UnidadesPorEdificio />
                </PrivateRoute>
              }
            />
            <Route
              path="/unidades/:codigoEdificio/:piso/:numero/detalles"
              element={
                <PrivateRoute>
                  <UnidadEspecifico />
                </PrivateRoute>
              }
            />
            <Route
              path="/personas"
              element={
                <RoleBasedRoute allowedRoles={["admin"]}>
                  <PersonaList />
                </RoleBasedRoute>
              }
            />
            <Route
              path="/personas/:documento"
              element={
                <PrivateRoute>
                  <PersonaEspecifico />
                </PrivateRoute>
              }
            />
          </Routes>
        </AppLayout>
      </Router>
    </AuthProvider>
  );
}

export default App;
