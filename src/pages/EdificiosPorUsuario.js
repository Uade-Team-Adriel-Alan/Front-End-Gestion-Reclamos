import React, { useEffect, useState } from 'react';
import ShowEdificios from './ShowEdificios';
import { getAllEdificios } from '../services/edificioService';

const ReclamosList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const edificios = await getAllEdificios()
        setData(edificios);
      } catch (err) {
        setError('Error al cargar los reclamos.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Cargando edificios...</p>;
  if (error) return <p>{error}</p>;

  return <ShowEdificios data={data} />;
};

export default ReclamosList;
