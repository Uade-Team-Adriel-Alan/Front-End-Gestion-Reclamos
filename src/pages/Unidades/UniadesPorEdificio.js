import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUnidadesPorEdificio } from "../../services/edificioService";
import UnidadesCard from "../../components/UnidadesCard";

function UnidadesPorEdificio() {
  const { codigoEdificio } = useParams();
  const [unidades, setUnidades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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
    fetchUnidades();
  }, [codigoEdificio]);

  if (loading) return <p>Cargando unidades del edificio...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ padding: "24px", maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ marginBottom: "24px", textAlign: "center" }}>
        Unidades del Edificio {codigoEdificio}
      </h1>
      {unidades.length > 0 ? (
        unidades.map((unidad) => (
          <UnidadesCard
            key={unidad.identificador}
            unidad={unidad} // Pasar el objeto unidad completo
          />
        ))
      ) : (
        <p style={{ textAlign: "center" }}>No hay unidades disponibles.</p>
      )}
    </div>
  );
}

export default UnidadesPorEdificio;