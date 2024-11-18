// src/components/EdificioCard.jsx
import React from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

function EdificioCard({ nombre, imagenURL, direccion, codigoEdificio }) {
  const navigate = useNavigate();

  const handleVerReclamos = () => {
    navigate(`/edificios/${codigoEdificio}/reclamos`);
  };

  const handleVerUnidades = () => {
    navigate(`/edificios/${codigoEdificio}/unidades`);
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        backgroundColor: "#f9f9f9",
        padding: "16px",
        borderRadius: "8px",
        marginBottom: "16px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Imagen del edificio */}
      <img
        src={imagenURL}
        alt={`Imagen de ${nombre}`}
        style={{
          width: "100px",
          height: "100px",
          objectFit: "cover",
          borderRadius: "8px",
          marginRight: "16px",
        }}
      />

      {/* Información del edificio */}
      <div style={{ flex: 1 }}>
        <h3 style={{ marginBottom: "8px" }}>{nombre}</h3>
        <p style={{ margin: 0, color: "#555" }}>Dirección: {direccion}</p>
      </div>

      {/* Botón de acción */}
      <Button type="primary" style={{ borderRadius: "5px" }} onClick={handleVerReclamos}>
        Ver reclamos
      </Button>

      <Button type="primary" style={{ borderRadius: "5px" }} onClick={handleVerUnidades}>
        Ver Unidades
      </Button>
    </div>
  );
}

export default EdificioCard;
