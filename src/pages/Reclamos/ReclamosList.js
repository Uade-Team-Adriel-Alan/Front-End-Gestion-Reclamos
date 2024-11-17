import React, { useEffect, useState } from 'react';
import ReclamoService from '../../services/ReclamoService';
import ReclamoContent from '../ReclamoContent';

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

  return <ReclamoContent data={data} />;
};

export default ReclamosList;
