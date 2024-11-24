import React, { useState } from "react";
import { Button, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import { DeleteOutlined } from '@ant-design/icons';
import ReclamoForm from './ReclamoForm'; // Importa el formulario de reclamo

function UnidadesCard({ unidad, codigoEdificio, eliminarUnidad }) {
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isReclamoFormVisible, setIsReclamoFormVisible] = useState(false); // Estado para el formulario de reclamo

  // Verificar que los datos de la unidad estén completos
  if (!unidad || !unidad.identificador || !unidad.piso || !unidad.numero) {
    console.error('Datos de unidad incompletos:', unidad);
    return null; // No renderizar si los datos son incompletos
  }

  const handleVerDetalles = () => {
    navigate(`/unidades/${codigoEdificio}/${unidad.piso}/${unidad.numero}/detalles`);
  };

  const handleAbrirFormularioReclamo = () => {
    setIsReclamoFormVisible(true); // Mostrar el formulario de reclamo
  };

  const handleCerrarFormularioReclamo = () => {
    setIsReclamoFormVisible(false); // Cerrar el formulario de reclamo
  };

  const showModal = () => {
    setIsModalVisible(true)};
  
  const handleEliminarUnidad = () => {
    eliminarUnidad(codigoEdificio, unidad.piso, unidad.numero); // Llamar al método de eliminar
    setIsModalVisible(false);
  };

  const handleCancel = () => {
  setIsModalVisible(false)};

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

      {/* Botón para abrir el formulario de reclamo */}
      <Button
        type="default" // Botón blanco
        style={{ borderRadius: "5px", marginRight: "8px" }}
        onClick={handleAbrirFormularioReclamo}
      >
        Agregar Reclamo
      </Button>
      {/* Mostrar el botón de eliminar solo si eliminarUnidad es una función */}
      {typeof eliminarUnidad === 'function' && (
      <Button
        type="danger"
        icon={<DeleteOutlined />}
        onClick={showModal}
      />
      )}

      {/* Modal de confirmación de eliminación */}
      <Modal
        title="Confirmar Eliminación"
        visible={isModalVisible}
        onOk={handleEliminarUnidad}
        onCancel={handleCancel}
        okText="Eliminar"
        cancelText="Cancelar"
      >
        <p>¿Estás seguro de que deseas eliminar esta unidad?</p>
      </Modal>

      {/* Mostrar el formulario de reclamo solo cuando el estado sea verdadero */}
      {isReclamoFormVisible && (
        <ReclamoForm
          codigoEdificio={codigoEdificio}
          piso={unidad.piso}
          numero={unidad.numero}
          onReclamoAgregado={handleCerrarFormularioReclamo} // Cuando el reclamo sea agregado, cerramos el formulario
        />
      )}
    </div>
  );
}

export default UnidadesCard;
