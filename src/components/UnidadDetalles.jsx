import React, { useState } from 'react';
import { Button, Input, message, Card, Typography, Divider } from 'antd';
import ReclamoContent from '../pages/ReclamoContent';
import UnidadService from '../services/UnidadService';

const { Title, Text } = Typography;

const UnidadDetalles = ({ unidad }) => {
  const [documento, setDocumento] = useState('');
  const [unidadData, setUnidadData] = useState(unidad);

  const handleAgregarDuenio = async () => {
    try {
      await UnidadService.agregarDuenioUnidad(unidadData.identificador, unidadData.piso, unidadData.numero, documento);
      message.success('Dueño agregado exitosamente');
      setUnidadData((prevData) => ({
        ...prevData,
        duenios: [...prevData.duenios, { documento, nombre: 'Nuevo Dueño' }]
      }));
    } catch (error) {
      message.error('Error al agregar dueño');
      console.error(error);
    }
  };

  const handleTransferirUnidad = async () => {
    try {
      await UnidadService.transferirUnidad(unidadData.identificador, unidadData.piso, unidadData.numero, documento);
      message.success('Unidad transferida exitosamente');
      setUnidadData((prevData) => ({
        ...prevData,
        duenios: [{ documento, nombre: 'Nuevo Dueño' }]
      }));
    } catch (error) {
      message.error('Error al transferir unidad');
      console.error(error);
    }
  };

  const handleAgregarInquilino = async () => {
    try {
      await UnidadService.agregarInquilinoUnidad(unidadData.identificador, unidadData.piso, unidadData.numero, documento);
      message.success('Inquilino agregado exitosamente');
      setUnidadData((prevData) => ({
        ...prevData,
        inquilinos: [...prevData.inquilinos, { documento, nombre: 'Nuevo Inquilino' }]
      }));
    } catch (error) {
      message.error('Error al agregar inquilino');
      console.error(error);
    }
  };

  const handleAgregarHabitante = async () => {
    try {
      await UnidadService.agregarHabitanteUnidad(unidadData.identificador, unidadData.piso, unidadData.numero, documento);
      message.success('Habitante agregado exitosamente');
      setUnidadData((prevData) => ({
        ...prevData,
        habitantes: [...prevData.habitantes, { documento, nombre: 'Nuevo Habitante' }]
      }));
    } catch (error) {
      message.error('Error al agregar habitante');
      console.error(error);
    }
  };

  const handleLiberarUnidad = async () => {
    try {
      await UnidadService.liberarUnidad(unidadData.identificador, unidadData.piso, unidadData.numero);
      message.success('Unidad liberada exitosamente');
      setUnidadData((prevData) => ({
        ...prevData,
        inquilinos: [],
        habitantes: []
      }));
    } catch (error) {
      message.error('Error al liberar unidad');
      console.error(error);
    }
  };

  if (!unidadData) {
    return <p>No se encontraron detalles de la unidad.</p>;
  }

  return (
    <Card style={{ padding: '24px', maxWidth: '800px', margin: '0 auto' }}>
      <Title level={2}>Detalles de la Unidad</Title>
      <Divider />
      <div style={{ marginBottom: '24px' }}>
        <Text><strong>Identificador:</strong> {unidadData.identificador || 'No especificado'}</Text><br />
        <Text><strong>Piso:</strong> {unidadData.piso || 'No especificado'}</Text><br />
        <Text><strong>Número:</strong> {unidadData.numero || 'No especificado'}</Text><br />
        <Text><strong>Estado:</strong> {unidadData.habitado === 'S' ? 'Habitada' : 'No habitada'}</Text><br />
        <Text><strong>Edificio:</strong> {unidadData.edificio.nombre || 'No especificado'}</Text><br />
        <Text><strong>Dirección:</strong> {unidadData.edificio.direccion || 'No especificado'}</Text>
        
        <Divider />
        <Title level={4}>Dueños</Title>
        {unidadData.duenios.map((duenio, index) => (
          <Text key={index}><strong>{duenio.nombre}</strong> (Documento: {duenio.documento})</Text>
        ))}

        <Divider />
        <Title level={4}>Inquilinos</Title>
        {unidadData.inquilinos.map((inquilino, index) => (
          <Text key={index}><strong>{inquilino.nombre}</strong> (Documento: {inquilino.documento})</Text>
        ))}

        <Divider />
        <Title level={4}>Habitantes</Title>
        {unidadData.habitantes.map((habitante, index) => (
          <Text key={index}><strong>{habitante.nombre}</strong> (Documento: {habitante.documento})</Text>
        ))}

        <Divider />
        <Title level={4}>Reclamos</Title>
        <ReclamoContent data={unidadData.reclamos} />

        <Divider />
        <Title level={4}>Acciones</Title>
        <Input
          placeholder="Documento"
          value={documento}
          onChange={(e) => setDocumento(e.target.value)}
          style={{ marginBottom: '8px', width: '300px' }}
        />
        <Button type="primary" onClick={handleAgregarDuenio} style={{ marginRight: '8px' }}>
          Agregar Dueño
        </Button>
        <Button type="primary" onClick={handleTransferirUnidad} style={{ marginRight: '8px' }}>
          Transferir Unidad
        </Button>
        <Button type="primary" onClick={handleAgregarInquilino} style={{ marginRight: '8px' }}>
          Agregar Inquilino
        </Button>
        <Button type="primary" onClick={handleAgregarHabitante} style={{ marginRight: '8px' }}>
          Agregar Habitante
        </Button>
        <Button type="danger" onClick={handleLiberarUnidad}>
          Liberar Unidad
        </Button>
      </div>
    </Card>
  );
};

export default UnidadDetalles;