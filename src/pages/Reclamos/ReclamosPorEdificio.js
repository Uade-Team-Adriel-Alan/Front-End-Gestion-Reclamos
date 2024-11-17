import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReclamoService from '../../services/ReclamoService';
import ReclamoContent from '../ReclamoContent';

const ReclamosPorEdificio = () => {
  const { codigoEdificio } = useParams(); // Obtener el código de la URL
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const reclamos = await ReclamoService.obtenerReclamosPorEdificio(codigoEdificio);
        setData(reclamos);
      } catch (err) {
        setError('Error al cargar los reclamos por edificio.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [codigoEdificio]);

  if (loading) return <p>Cargando reclamos del edificio...</p>;
  if (error) return <p>{error}</p>;

  return <ReclamoContent data={data} />;
};

export default ReclamosPorEdificio;
