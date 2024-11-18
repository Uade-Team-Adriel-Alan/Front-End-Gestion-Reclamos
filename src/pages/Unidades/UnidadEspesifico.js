import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import UnidadService from '../../services/UnidadService';
import UnidadDetalles from '../../components/UnidadDetalles';

const UnidadEspecifico = () => {
  const { codigoEdificio, piso, numero } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUnidad = async () => {
      try {
        const unidadData = await UnidadService.obtenerUnidad(codigoEdificio, piso, numero);
        setData(unidadData);
        console.log(unidadData);
      } catch (err) {
        setError('Error al cargar los detalles de la unidad.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUnidad();
  }, [codigoEdificio, piso, numero]);

  if (loading) return <p>Cargando detalles de la unidad...</p>;
  if (error) return <p>{error}</p>;

  return (data ? <UnidadDetalles unidad={data} /> : <p>No se encontraron datos de la unidad.</p>);
};

export default UnidadEspecifico;