import React, { useState } from 'react';
import { Table, Tag, Space, Modal, Carousel, Button, Select, notification } from 'antd';
import ReclamoService from '.././services/ReclamoService';

const { Option } = Select;

const ReclamosTable = ({ reclamos, actualizarReclamo }) => {
  const [isModalVisible, setIsModalVisible] = useState(false); // Estado para manejar la visibilidad del modal
  const [reclamoSeleccionado, setReclamoSeleccionado] = useState(null); // Estado para almacenar el reclamo seleccionado
  const [nuevoEstado, setNuevoEstado] = useState(null); // Estado para almacenar el nuevo estado seleccionado

  // Función para manejar la apertura del modal
  const showModal = (reclamo) => {
    setReclamoSeleccionado(reclamo); // Guardamos el reclamo seleccionado
    setNuevoEstado(reclamo.estadoReclamo); // Inicializamos el estado con el valor actual
    setIsModalVisible(true); // Mostramos el modal
  };

  // Función para manejar el cierre del modal
  const handleCancel = () => {
    setIsModalVisible(false); // Cerramos el modal
    setReclamoSeleccionado(null); // Limpiamos el reclamo seleccionado
    setNuevoEstado(null); // Limpiamos el estado seleccionado
  };

  // Función para manejar la modificación del estado
  const handleModificarEstado = async () => {
    try {
      // Llamamos al servicio para cambiar el estado del reclamo
      await ReclamoService.cambiarEstado(reclamoSeleccionado.idReclamo, nuevoEstado);
      
      // Actualizamos el estado del reclamo en la lista
      const reclamoActualizado = { ...reclamoSeleccionado, estadoReclamo: nuevoEstado };
      actualizarReclamo(reclamoActualizado);

      // Mostrar una notificación de éxito
      notification.success({
        message: 'Estado modificado',
        description: `El estado del reclamo ha sido modificado a ${nuevoEstado}.`,
      });
      
      // Cerrar el modal
      handleCancel();
    } catch (error) {
      console.error('Error al cambiar el estado:', error);
      // Mostrar una notificación de error
      notification.error({
        message: 'Error al modificar el estado',
        description: 'Hubo un problema al cambiar el estado del reclamo.',
      });
    }
  };

  // Definición de las columnas para la tabla
  const columns = [
    {
      title: 'ID Reclamo',
      dataIndex: 'idReclamo',
      key: 'idReclamo',
    },
    {
      title: 'Descripción',
      dataIndex: 'descripcion',
      key: 'descripcion',
    },
    {
      title: 'Estado',
      dataIndex: 'estadoReclamo',
      key: 'estadoReclamo',
      render: (estado) => (
        <Tag color={estado === 'PENDIENTE' ? 'orange' : estado === 'EN PROCESO' ? 'blue' : estado === 'RESUELTO' ? 'green' : 'red'}>
          {estado}
        </Tag>
      ),
    },
    {
      title: 'Fecha de Creación',
      dataIndex: 'fechaCreacion',
      key: 'fechaCreacion',
      render: (fecha) => new Date(fecha).toLocaleString(),
    },
    {
      title: 'Acciones',
      key: 'acciones',
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
      <Table
        columns={columns}
        dataSource={reclamos}
        rowKey="idReclamo" // Usamos el idReclamo como clave única para las filas
      />

      {/* Modal con los detalles del reclamo */}
      <Modal
        title="Detalles del Reclamo"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={800}
      >
        {reclamoSeleccionado && (
          <div>
            <p><strong>Descripción:</strong> {reclamoSeleccionado.descripcion}</p>
            <p><strong>Estado:</strong> {reclamoSeleccionado.estadoReclamo}</p>
            <p><strong>Fecha de Creación:</strong> {new Date(reclamoSeleccionado.fechaCreacion).toLocaleString()}</p>
            <p><strong>Ubicación:</strong> {reclamoSeleccionado.ubicacion}</p>
            <p><strong>Persona:</strong> {reclamoSeleccionado.persona}</p>
            <p><strong>Edificio:</strong> {reclamoSeleccionado.edificio}</p>
            <p><strong>Unidad:</strong> {reclamoSeleccionado.unidad}</p>
            <p><strong>Tipo de Reclamo:</strong> {reclamoSeleccionado.tipoReclamo}</p>
            
            {/* Carrusel de imágenes */}
            {reclamoSeleccionado.imagenes && reclamoSeleccionado.imagenes.length > 0 && (
              <Carousel>
                {reclamoSeleccionado.imagenes.map((imagen, index) => (
                  <div key={index}>
                    <img src={imagen} alt={`Imagen ${index + 1}`} style={{ width: '100%', height: 'auto' }} />
                  </div>
                ))}
              </Carousel>
            )}
            
            {/* Selector de estado con colores */}
            <div style={{ marginTop: 16 }}>
              <Select
                defaultValue={reclamoSeleccionado.estadoReclamo}
                style={{ width: 200 }}
                onChange={(value) => setNuevoEstado(value)}
              >
                <Option value="1">Pendiente</Option>
                <Option value="2">En Proceso</Option>
                <Option value="3">Resuelto</Option>
                <Option value="4">Cancelado</Option>
              </Select>
            </div>
            <Button type="primary" onClick={handleModificarEstado} style={{ marginTop: 16 }}>
              Modificar Estado
            </Button>
          </div>
        )}
      </Modal>
    </>
  );
};

export default ReclamosTable;
