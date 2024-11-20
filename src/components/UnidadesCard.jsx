import React from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

function UnidadesCard({ unidad, codigoEdificio}) {
  const navigate = useNavigate();
  // Verificar que los datos de la unidad estén completos
  if (!unidad || !unidad.identificador || !unidad.piso || !unidad.numero) {
    console.error('Datos de unidad incompletos:', unidad);
    return null; // No renderizar si los datos son incompletos
  }

  const handleVerDetalles = () => {
    navigate(`/unidades/${codigoEdificio}/${unidad.piso}/${unidad.numero}/detalles`);
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
      <div style={{ flex: 1 }}>
        <h3 style={{ marginBottom: "8px" }}>Piso: {unidad.piso} - Número: {unidad.numero}</h3>
        <p style={{ margin: 0, color: "#555" }}>
          Estado: {unidad.habitado === 'S' ? "Habitada" : "No habitada"}
        </p>
      </div>

      <Button
        type="primary"
        style={{ borderRadius: "5px", marginRight: "8px" }}
        onClick={handleVerDetalles}
      >
        Ver detalles
      </Button>
    </div>
  );
}

export default UnidadesCard;