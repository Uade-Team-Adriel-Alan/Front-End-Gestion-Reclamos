import React, { useEffect, useState } from 'react';
import { List, Button, message } from 'antd';
import PersonaSerivce from '../../services/PersonaSerivce';
import PersonasList from '../../components/PersonasList';

const PersonaList = ({ onVerMasDetalles, listStyle, buttonStyle }) => {
  const [personas, setPersonas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPersonas = async () => {
      try {
        const data = await PersonaSerivce.getAllPersonas();
        setPersonas(data);
      } catch (error) {
        setError('Error al cargar las personas.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPersonas();
  }, []);

  if (loading) return <p>Cargando personas...</p>;
  if (error) return <p>{error}</p>;

  return (
    <PersonasList
      personas={personas}
    />
  );
};

PersonaList.defaultProps = {
  onVerMasDetalles: (persona) => message.info(`Ver más detalles de ${persona.nombre}`),
  listStyle: {},
  buttonStyle: {},
};

export default PersonaList;