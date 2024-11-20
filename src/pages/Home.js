import React, { useEffect, useState } from 'react';
import { getAllEdificios, eliminarEdificio, crearEdificio } from '../services/edificioService';
import ShowEdificios from '../components/ShowEdificios';
import AgregarEdificioModal from '../components/AgregarEdificioModal';
import { Button, message } from 'antd';

const EdificioList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

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

  useEffect(() => {
    fetchData();
  }, []);

  const handleEliminarEdificio = async (codigo) => {
    try {
      await eliminarEdificio(codigo);
      message.success('Edificio eliminado exitosamente');
      setData((prevData) => prevData.filter(edificio => edificio.codigo !== codigo));
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

  // Asegúrate de que esta función se pase correctamente a AgregarEdificioModal
  const handleEdificioAgregado = async (nuevoEdificio) => {
    try {
      setData((prevData) => [...prevData, nuevoEdificio]);
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
      <ShowEdificios data={data} onEliminar={handleEliminarEdificio} />
      <AgregarEdificioModal
        visible={isModalVisible}
        onClose={handleModalClose}
        onEdificioAgregado={handleEdificioAgregado} // Asegúrate de que se pase correctamente
      />
    </div>
  );
};

export default EdificioList;
