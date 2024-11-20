// src/components/EdificioCard.jsx
import React, { useState } from "react";
import { Button, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import { DeleteOutlined } from '@ant-design/icons';

function EdificioCard({ nombre, imagenURL, direccion, codigoEdificio, eliminarEdificio }) {
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleVerReclamos = () => {
    navigate(`/edificios/${codigoEdificio}/reclamos`);
  };

  const handleVerUnidades = () => {
    navigate(`/edificios/${codigoEdificio}/unidades`);
  };

  const showModal = () => {
    setIsModalVisible(true); // Mostrar el modal de confirmación
  };

  const handleEliminar = () => {
    eliminarEdificio(codigoEdificio); // Llamar a la función de eliminar
    setIsModalVisible(false); // Cerrar el modal
  };

  const handleCancel = () => {
    setIsModalVisible(false); // Cerrar el modal si el usuario cancela
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

      {/* Botones de acción */}
      <Button type="primary" style={{ borderRadius: "5px" }} onClick={handleVerReclamos}>
        Ver reclamos
      </Button>

      <Button type="primary" style={{ borderRadius: "5px" }} onClick={handleVerUnidades}>
        Ver Unidades
      </Button>

      {/* Mostrar el botón de eliminar solo si eliminarEdificio es una función */}
      {typeof eliminarEdificio === 'function' && (
        <>
          <Button
            type="danger"
            icon={<DeleteOutlined />}
            onClick={showModal} // Mostrar el modal al hacer clic
          />
          <Modal
            title="Confirmar Eliminación"
            visible={isModalVisible}
            onOk={handleEliminar}
            onCancel={handleCancel}
            okText="Eliminar"
            cancelText="Cancelar"
          >
            <p>¿Estás seguro de que deseas eliminar este edificio?</p>
          </Modal>
        </>
      )}
    </div>
  );
}

export default EdificioCard;
