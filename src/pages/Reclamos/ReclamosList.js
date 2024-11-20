import React, { useEffect, useState } from 'react';
import ReclamoService from '../../services/ReclamoService';
import ReclamoContent from '../../components/ReclamoContent';

const ReclamosList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const reclamos = await ReclamoService.obtenerReclamos();
        setData(reclamos);
      } catch (err) {
        setError('Error al cargar los reclamos.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Cargando reclamos del edificio...</p>;
  if (error) return <p>{error}</p>;

  return <ReclamoContent data={data} />;
};

export default ReclamosList;
