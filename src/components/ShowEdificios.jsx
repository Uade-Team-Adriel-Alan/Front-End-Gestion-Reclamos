import React, { useEffect, useState } from "react";
import EdificioCard from "../components/EdificioCard";
import AgregarEdificioModal from "../components/AgregarEdificioModal";
import { Button } from "antd";

function ShowEdificios({data}) {
  const [edificios, setEdificios] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const fetchEdificios = async () => {
    try {
      setEdificios(data);
    } catch (error) {
      console.error("Error al cargar los edificios:", error);
    }
  };

  useEffect(() => {
    fetchEdificios();
  }, []);

  const handleAgregarEdificioClick = () => {
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  const handleEdificioAgregado = () => {
    fetchEdificios(); // Refrescar la lista de edificios después de agregar uno nuevo
  };

  return (
    <div style={{ padding: "24px", maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ marginBottom: "24px", textAlign: "center" }}>
        Lista de Edificios
      </h1>
      <Button type="primary" onClick={handleAgregarEdificioClick} style={{ marginBottom: "16px" }}>
        Agregar Edificio
      </Button>
      {edificios.map((edificio) => (
        <EdificioCard
          key={edificio.codigo}
          nombre={edificio.nombre}
          imagenURL="https://i.pinimg.com/736x/a7/29/84/a72984424702de993c3592e00b910ff9.jpg"
          direccion={edificio.direccion}
          codigoEdificio={edificio.codigo}  
        />
      ))}
      <AgregarEdificioModal
        visible={isModalVisible}
        onClose={handleModalClose}
        onEdificioAgregado={handleEdificioAgregado}
      />
    </div>
  );
}

export default ShowEdificios;
