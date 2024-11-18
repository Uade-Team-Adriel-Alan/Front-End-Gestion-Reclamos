import React, { useState } from 'react';
import { Modal, Input, Button, message } from 'antd';
import { crearEdificio } from '../services/edificioService';

const AgregarEdificioModal = ({ visible, onClose, onEdificioAgregado }) => {
  const [nombre, setNombre] = useState('');
  const [direccion, setDireccion] = useState('');

  const handleAgregarEdificio = async () => {
    try {
      if (!nombre || !direccion) {
        message.error('Por favor, completa todos los campos.');
        return;
      }
      await crearEdificio(direccion, nombre);
      message.success('Edificio agregado exitosamente');
      onEdificioAgregado(); // Notificar al componente padre que se ha agregado un edificio
      onClose(); // Cerrar el modal
    } catch (error) {
      message.error(error.response?.data || 'Error al agregar el edificio');
      console.error(error);
    }
  };

  return (
    <Modal
      title="Agregar Edificio"
      visible={visible}
      onCancel={onClose}
      footer={null}
    >
      <Input
        placeholder="Nombre del Edificio"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        style={{ marginBottom: '8px' }}
      />
      <Input
        placeholder="Dirección"
        value={direccion}
        onChange={(e) => setDireccion(e.target.value)}
        style={{ marginBottom: '8px' }}
      />
      <Button type="primary" onClick={handleAgregarEdificio}>
        Agregar Edificio
      </Button>
    </Modal>
  );
};

export default AgregarEdificioModal; 