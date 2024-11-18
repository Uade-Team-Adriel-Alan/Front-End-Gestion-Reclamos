import React, { useState } from 'react';
import { Modal, Input, Button, message } from 'antd';
import UnidadService from '../services/UnidadService';

const AgregarUnidadModal = ({ visible, onClose, codigoEdificio, onUnidadAgregada }) => {
  const [piso, setPiso] = useState('');
  const [numero, setNumero] = useState('');

  const handleAgregarUnidad = async () => {
    try {
      await UnidadService.agregarUnidad(codigoEdificio, piso, numero);
      message.success('Unidad agregada exitosamente');
      onUnidadAgregada(); // Notificar al componente padre que se ha agregado una unidad
      onClose(); // Cerrar el modal
    } catch (error) {
      message.error(error.response.data || 'Error al agregar la unidad');
      console.error(error);
    }
  };

  return (
    <Modal
      title="Agregar Unidad"
      visible={visible}
      onCancel={onClose}
      footer={null}
    >
      <Input
        placeholder="Piso"
        value={piso}
        onChange={(e) => setPiso(e.target.value)}
        style={{ marginBottom: '8px' }}
      />
      <Input
        placeholder="Número"
        value={numero}
        onChange={(e) => setNumero(e.target.value)}
        style={{ marginBottom: '8px' }}
      />
      <Button type="primary" onClick={handleAgregarUnidad}>
        Agregar Unidad
      </Button>
    </Modal>
  );
};

export default AgregarUnidadModal; 