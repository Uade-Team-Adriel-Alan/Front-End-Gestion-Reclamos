import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PersonaSerivce from '../../services/PersonaSerivce'; // Asegúrate de que la ruta sea correcta
import PersonaEspecificoComponent from '../../components/PersonaEspecificoComponent'; // Importar el componente que mostrará los detalles

const PersonaEspecifico = () => {
  const { documento } = useParams(); // Obtener el documento de los parámetros de la URL
  const [persona, setPersona] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPersona = async () => {
      try {
        const data = await PersonaSerivce.getPersonaByDocumento(documento);
        setPersona(data);
      } catch (error) {
        setError('Error al cargar los detalles de la persona.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPersona();
  }, [documento]);

  if (loading) return <p>Cargando detalles de la persona...</p>;
  if (error) return <p>{error}</p>;

  return <PersonaEspecificoComponent persona={persona} />;
};

export default PersonaEspecifico;