import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PersonaService from '../services/PersonaSerivce';
import { Card, Typography, List } from 'antd';
import UnidadCard from '../components/UnidadesCard'; // Asegúrate de que la ruta sea correcta
import ReclamoTable from '../components/ReclamosTable'; // Asegúrate de que la ruta sea correcta

const { Title, Text } = Typography;

const PerssonaEspecificoComponent = () => {
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

  return (
    <div style={{ padding: '24px', maxWidth: '800px', margin: '0 auto' }}>
      <Card>
        <Title level={2}>{persona.nombre}</Title>
        <Text>Documento: {persona.documento}</Text>
        <Title level={4}>Reclamos</Title>
        <ReclamoTable reclamos={persona.reclamos} />
        <Title level={4}>Unidades que posee</Title>
        <List
          itemLayout="horizontal"
          dataSource={persona.duenioDe}
          renderItem={unidad => (
            <List.Item>
              <UnidadCard unidad={unidad} />
            </List.Item>
          )}
        />
        <Title level={4}>Inquilinos</Title>
        <List
          itemLayout="horizontal"
          dataSource={persona.inquilinoEn}
          renderItem={unidad => (
            <List.Item>
              <UnidadCard unidad={unidad} />
            </List.Item>
          )}
        />
        <Title level={4}>Habitaciones</Title>
        <List
          itemLayout="horizontal"
          dataSource={persona.habitaEn}
          renderItem={unidad => (
            <List.Item>
              <UnidadCard unidad={unidad} />
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
};

export default PerssonaEspecificoComponent; 