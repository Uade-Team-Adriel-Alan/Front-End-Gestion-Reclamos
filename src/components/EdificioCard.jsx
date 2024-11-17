import React from "react";
import { Row, Col, Button } from "antd";

function EdificioCard({ nombre, imagenURL, direccion }) {
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
      <Button type="primary" style={{ borderRadius: "5px" }}>
        Ver más
      </Button>
    </div>
  );
}

export default EdificioCard;
