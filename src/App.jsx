import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Layout } from "antd";
import Header from "./components/Header";
import Login from "./pages/Login";
import Home from "./pages/Home";
import "./App.css";
import ReclamosList from "./pages/Reclamos/ReclamosList";

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
              <Route path="/reclamos" element={<ReclamosList />}/>
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
}

export default App;
