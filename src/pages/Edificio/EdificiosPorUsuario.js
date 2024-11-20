import React, { useEffect, useState } from 'react';
import ShowEdificios from '../../components/ShowEdificios';
import { getAllEdificios, eliminarEdificio, crearEdificio } from '../../services/edificioService';
import { Button, message } from 'antd';

const EdificioList = () => {
  const [edificio, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [nuevaDireccion, setNuevaDireccion] = useState('');
  const [nuevoNombre, setNuevoNombre] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const edificios = await getAllEdificios();
        setData(edificios);
      } catch (err) {
        setError('Error al cargar los edificios.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleEliminarEdificio = async (codigo) => {
    try {
      await eliminarEdificio(codigo);
      message.success('Edificio eliminado exitosamente');
      fetchData();
    } catch (error) {
      message.error('Error al eliminar el edificio');
      console.error(error);
    }
  };

  const handleAgregarEdificioClick = () => {
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  const handleEdificioAgregado = async () => {
    try {
      await crearEdificio(nuevaDireccion, nuevoNombre);
      message.success('Edificio creado exitosamente');
      fetchData();
      handleModalClose();
    } catch (error) {
      message.error('Error al crear el edificio');
      console.error(error);
    }
  };

  if (loading) return <p>Cargando edificios...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ padding: "24px", maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ marginBottom: "24px", textAlign: "center" }}>Lista de Edificios</h1>
      <Button type="primary" onClick={handleAgregarEdificioClick} style={{ marginBottom: "16px" }}>
        Agregar Edificio
      </Button>
      <ShowEdificios data={edificio} onEliminar={handleEliminarEdificio} />
      {isModalVisible && (
        <div>
          <h2>Crear Edificio</h2>
          <input
            type="text"
            placeholder="Dirección"
            value={nuevaDireccion}
            onChange={(e) => setNuevaDireccion(e.target.value)}
          />
          <input
            type="text"
            placeholder="Nombre"
            value={nuevoNombre}
            onChange={(e) => setNuevoNombre(e.target.value)}
          />
          <Button onClick={handleEdificioAgregado}>Crear</Button>
          <Button onClick={handleModalClose}>Cancelar</Button>
        </div>
      )}
    </div>
  );
};

export default EdificioList;
