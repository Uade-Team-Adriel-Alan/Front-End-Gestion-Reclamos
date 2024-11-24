import React, { useState } from "react";
import { Table, Modal, Button, Select, Tag, Space, notification, Carousel } from "antd";
import ReclamoService from "../services/ReclamoService";
import { useAuth } from "../context/AuthContext";

const { Option } = Select;

const ReclamosTable = ({ reclamos, actualizarReclamo }) => {
  const { auth } = useAuth();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [reclamoSeleccionado, setReclamoSeleccionado] = useState(null);
  const [nuevoEstado, setNuevoEstado] = useState(null);

  const showModal = (reclamo) => {
    setReclamoSeleccionado(reclamo);
    setNuevoEstado(reclamo.estadoReclamo);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setReclamoSeleccionado(null);
    setNuevoEstado(null);
  };

  const handleModificarEstado = async () => {
    try {
      await ReclamoService.cambiarEstado(reclamoSeleccionado.idReclamo, nuevoEstado);
     
      const reclamoActualizado = {
        ...reclamoSeleccionado,
        estadoReclamo: nuevoEstado,
      };
      actualizarReclamo(reclamoActualizado);

      notification.success({
        message: "Estado modificado",
        description: `El estado del reclamo ha sido modificado.`,
      });

      handleCancel();
    } catch (error) {
      console.error("Error al cambiar el estado:", error);
      notification.error({
        message: "Error al modificar el estado",
        description: "Hubo un problema al cambiar el estado del reclamo.",
      });
    }
  };

  const estadoMap = {
    1: "Pendiente",
    2: "En Proceso",
    3: "Resuelto",
    4: "Cancelado",
  };

  const columns = [
    {
      title: "ID Reclamo",
      dataIndex: "idReclamo",
      key: "idReclamo",
      render: (idReclamo) => <strong>{idReclamo}</strong>, // Opcional: puedes estilizar el ID
    },
    {
      title: "Estado",
      dataIndex: "estadoReclamo",
      key: "estadoReclamo",
      render: (estado) => {
        const estadoDescripcion = estadoMap[estado] || "Estado Desconocido";
        return (
          <Tag
            color={
              estadoDescripcion === "Pendiente"
                ? "orange"
                : estadoDescripcion === "En Proceso"
                ? "blue"
                : estadoDescripcion === "Resuelto"
                ? "green"
                : "red"
            }
          >
            {estadoDescripcion}
          </Tag>
        );
      },
    },
    {
      title: "Fecha de Creación",
      dataIndex: "fechaCreacion",
      key: "fechaCreacion",
      render: (fecha) => new Date(fecha).toLocaleString(),
    },
    {
      title: "Acciones",
      key: "acciones",
      render: (_, reclamo) => (
        <Space size="middle">
          <Button type="primary" onClick={() => showModal(reclamo)}>
            Ver Detalles
          </Button>
        </Space>
      ),
    },
  ];
  

  return (
    <>
      <Table columns={columns} dataSource={reclamos} rowKey="idReclamo" />
      <Modal 
        title="Detalles del Reclamo" 
        visible={isModalVisible} 
        onCancel={handleCancel} 
        footer={null} 
        width={800}
        bodyStyle={{ padding: '20px' }}
      >
        {reclamoSeleccionado && (
          <div>
            <p><strong>Descripción:</strong> {reclamoSeleccionado.descripcion}</p>
            <p><strong>Estado:</strong> {estadoMap[reclamoSeleccionado.estadoReclamo] || "Estado Desconocido"}</p>
            <p><strong>Fecha de Creación:</strong> {new Date(reclamoSeleccionado.fechaCreacion).toLocaleString()}</p>
            <p><strong>Ubicación:</strong> {reclamoSeleccionado.ubicacion}</p>
            <p><strong>Persona:</strong> {reclamoSeleccionado.persona}</p>
            <p><strong>Edificio:</strong> {reclamoSeleccionado.edificio}</p>
            <p><strong>Unidad:</strong> {parseInt(reclamoSeleccionado.unidad, 10) + 1}</p>
            <p><strong>Tipo de Reclamo:</strong> {reclamoSeleccionado.tipoReclamo}</p>
            {reclamoSeleccionado.imagenes && reclamoSeleccionado.imagenes.length > 0 && (
              <Carousel>
                {reclamoSeleccionado.imagenes.map((imagen, index) => (
                  <div key={index}>
                    <img 
                      src={imagen.path} 
                      alt={`Imagen ${index + 1}`} 
                      style={{ width: "100%", height: "auto", maxHeight: "500px", objectFit: "contain" }}
                    />
                  </div>
                ))}
              </Carousel>
            )}
            {auth?.rol === "admin" && (
              <div style={{ marginTop: 16 }}>
                <Select value={nuevoEstado} style={{ width: 200 }} onChange={(value) => setNuevoEstado(value)} disabled={reclamoSeleccionado.estadoReclamo === 3}>
                  <Option value={1}>Pendiente</Option>
                  <Option value={2}>En Proceso</Option>
                  <Option value={3}>Resuelto</Option>
                  <Option value={4}>Cancelado</Option>
                </Select>
                <Button type="primary" onClick={handleModificarEstado} style={{ marginLeft: 16 }}>
                  Modificar Estado
                </Button>
              </div>
            )}
          </div>
        )}
      </Modal>
    </>
  );
};

export default ReclamosTable;
