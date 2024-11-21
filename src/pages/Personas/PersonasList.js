import React, { useEffect, useState } from 'react';
import { List, Button, message, Modal, Input } from 'antd';
import PersonaService from '../../services/PersonaSerivce';
import PersonasList from '../../components/PersonasList';

const PersonaList = ({ onVerMasDetalles, listStyle, buttonStyle }) => {
  const [personas, setPersonas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [documento, setDocumento] = useState('');
  const [nombre, setNombre] = useState('');

  useEffect(() => {
    const fetchPersonas = async () => {
      try {
        const data = await PersonaService.getAllPersonas();
        setPersonas(data);
      } catch (error) {
        setError('Error al cargar las personas.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPersonas();
  }, []);

  const handleAgregarPersonaClick = () => {
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setDocumento(''); // Limpiar el estado de documento
    setNombre(''); // Limpiar el estado de nombre
  };

  const handleAgregarPersona = async () => {
    try {
      if (!documento || !nombre) {
        message.error('Por favor, completa todos los campos.');
        return;
      }
      const nuevaPersona = await PersonaService.agregarPersona(documento, nombre);
      message.success('Persona agregada exitosamente');
      setPersonas((prev) => [...prev, nuevaPersona]); // Actualizar la lista de personas
      handleModalClose(); // Cerrar el modal
    } catch (error) {
      message.error('Error al agregar la persona');
      console.error(error);
    }
  };

  const eliminarPersona = async (documento) => {
    try {
      await PersonaService.eliminarPersona(documento);
      message.success('Persona eliminada exitosamente');
      setPersonas((prev) => prev.filter(persona => persona.documento !== documento)); // Actualizar la lista de personas
    } catch (error) {
      message.error('Error al eliminar la persona');
      console.error(error);
    }
  };

  if (loading) return <p>Cargando personas...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ padding: "24px", maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ marginBottom: "24px", textAlign: "center" }}>Lista de Personas</h1>
      <Button type="primary" onClick={handleAgregarPersonaClick} style={{ marginBottom: "16px" }}>
        Agregar Persona
      </Button>
      <PersonasList
        personas={personas}
        onVerMasDetalles={onVerMasDetalles}
        listStyle={listStyle}
        buttonStyle={buttonStyle}
        eliminarPersona={eliminarPersona} // Pasar la función de eliminar
      />

      {/* Modal para agregar persona */}
      <Modal
        title="Agregar Persona"
        visible={isModalVisible}
        onCancel={handleModalClose}
        footer={null}
      >
        <Input
          placeholder="Documento"
          value={documento}
          onChange={(e) => setDocumento(e.target.value)}
          style={{ marginBottom: '8px' }}
        />
        <Input
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          style={{ marginBottom: '8px' }}
        />
        <Button type="primary" onClick={handleAgregarPersona}>
          Agregar Persona
        </Button>
      </Modal>
    </div>
  );
};

export default PersonaList;