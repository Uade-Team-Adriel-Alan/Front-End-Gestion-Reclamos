// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Layout } from "antd";
import Header from "./components/Header";
import Login from "./pages/Login";
import Home from "./pages/Home";
import ReclamosPorEdificio from "./pages/Reclamos/ReclamosPorEdificio"; // Importar el componente ReclamosPorEdificio
import UnidadesPorEdificio from "./pages/Unidades/UniadesPorEdificio";
import UnidadEspecifico from "./pages/Unidades/UnidadEspesifico";
import PersonaList from "./pages/Personas/PersonasList";
import "./App.css";
import ReclamosList from "./pages/Reclamos/ReclamosList";
import PersonaEspecifico from "./pages/Personas/PersonaEspesifico";

const { Content } = Layout;

function App() {
  return (
    <Router>
      <Layout style={{ minHeight: "100vh" }}>
        {/* Sidebar */}
        <Header />

        {/* Contenido principal */}
        <Layout>
          <Content style={{ padding: "16px", backgroundColor: "#fff" }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/reclamos" element={<ReclamosList />} />
              <Route path="/edificios/:codigoEdificio/reclamos" element={<ReclamosPorEdificio />} />
              <Route path="/edificios/:codigoEdificio/unidades" element={<UnidadesPorEdificio />} />
              <Route path="/unidades/:codigoEdificio/:piso/:numero/detalles" element={<UnidadEspecifico />} />
              <Route path="/personas" element={<PersonaList />} />
              <Route path="/personas/:documento" element={<PersonaEspecifico />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
}

export default App;
