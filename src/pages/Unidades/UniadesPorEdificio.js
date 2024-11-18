import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUnidadesPorEdificio } from "../../services/edificioService";
import UnidadesCard from "../../components/UnidadesCard";
import AgregarUnidadModal from "../../components/AgregarUnidadModal"; // Asegúrate de que la ruta sea correcta
import { Button } from "antd";

function UnidadesPorEdificio() {
  const { codigoEdificio } = useParams();
  const [unidades, setUnidades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const fetchUnidades = async () => {
    try {
      const data = await getUnidadesPorEdificio(codigoEdificio);
      setUnidades(data);
    } catch (error) {
      setError("Error al cargar las unidades.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUnidades();
  }, [codigoEdificio]);

  const handleAgregarUnidadClick = () => {
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  const handleUnidadAgregada = () => {
    fetchUnidades(); // Refrescar la lista de unidades después de agregar una nueva
  };

  if (loading) return <p>Cargando unidades del edificio...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ padding: "24px", maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ marginBottom: "24px", textAlign: "center" }}>
        Unidades del Edificio {codigoEdificio}
      </h1>
      <Button type="primary" onClick={handleAgregarUnidadClick} style={{ marginBottom: "16px" }}>
        Agregar Unidad
      </Button>
      {unidades.length > 0 ? (
        unidades.map((unidad) => (
          <UnidadesCard
            key={unidad.identificador}
            unidad={unidad} 
            codigoEdificio={codigoEdificio}
          />
        ))
      ) : (
        <p style={{ textAlign: "center" }}>No hay unidades disponibles.</p>
      )}
      <AgregarUnidadModal
        visible={isModalVisible}
        onClose={handleModalClose}
        codigoEdificio={codigoEdificio}
        onUnidadAgregada={handleUnidadAgregada}
      />
    </div>
  );
}

export default UnidadesPorEdificio;