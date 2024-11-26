import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PersonaService from '../services/PersonaSerivce';
import { Card, Typography, List } from 'antd';
import UnidadesCard from '../components/UnidadesCard';
import ReclamoContent from './ReclamoContent';

const { Title, Text } = Typography;

const PersonaEspecificoComponent = () => {
  const { documento } = useParams();
  const [persona, setPersona] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  

  useEffect(() => {
    const fetchPersona = async () => {
      try {
        const data = await PersonaService.getPersonaByDocumento(documento);
        setPersona(data);
      } catch (error) {
        setError(error.response?.data || 'Error al cargar los detalles de la persona.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPersona();
  }, [documento]);

  if (loading) return <p>Cargando detalles de la persona...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ padding: '24px', maxWidth: '800px', margin: '0 auto' }}>
      <Card>
        <Title level={2}>{persona.nombre}</Title>
        <Text>Documento: {persona.documento}</Text>
        <ReclamoContent data={persona.reclamos} />
        
        <Title level={4}>Unidades que posee</Title>
        {persona.duenioDe.length > 0 ? (
          persona.duenioDe.map((unidad) => (
            <UnidadesCard
              key={unidad.identificador}
              unidad={unidad}
              codigoEdificio={unidad.codigoEdificio}
              habitante ={false}
            />
          ))
        ) : (
          <p style={{ textAlign: "center" }}>No hay unidades disponibles.</p>
        )}

        <Title level={4}>Inquilinos En:</Title>
        {persona.inquilinoEn.length > 0 ? (
          persona.inquilinoEn.map((unidad) => (
            <UnidadesCard
              key={unidad.identificador}
              unidad={unidad}
              codigoEdificio={unidad.codigoEdificio}
              habitante ={false}
            />
          ))
        ) : (
          <p style={{ textAlign: "center" }}>No hay inquilinos en esta persona.</p>
        )}

        <Title level={4}>Habitante En:</Title>
        {persona.habitaEn.length > 0 ? (
          persona.habitaEn.map((unidad) => (
            <UnidadesCard
              key={unidad.identificador}
              unidad={unidad}
              codigoEdificio={unidad.codigoEdificio}
              habitante ={true}
            />
          ))
        ) : (
          <p style={{ textAlign: "center" }}>No hay habitaciones disponibles.</p>
        )}
      </Card>
    </div>
  );
};

export default PersonaEspecificoComponent; 