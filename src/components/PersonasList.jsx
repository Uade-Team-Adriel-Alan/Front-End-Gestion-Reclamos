import React, { useState } from 'react';
import { List, Button, Input, Pagination } from 'antd';

const PersonasList = ({ personas, onVerMasDetalles, listStyle, buttonStyle }) => {
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Filtrar personas según el texto de búsqueda
  const filteredPersonas = personas.filter(persona =>
    persona.nombre.toLowerCase().includes(searchText.toLowerCase()) ||
    persona.documento.includes(searchText)
  );

  // Calcular el número total de páginas
  const totalPages = Math.ceil(filteredPersonas.length / pageSize);

  // Manejar el cambio de página
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Calcular las personas a mostrar en la página actual
  const startIndex = (currentPage - 1) * pageSize;
  const currentPersonas = filteredPersonas.slice(startIndex, startIndex + pageSize);

  return (
    <div style={{ padding: '24px', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '24px', textAlign: 'center' }}>Lista de Personas</h1>
      <Input
        placeholder="Buscar por nombre o documento"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        style={{ marginBottom: '16px' }}
      />
      <List
        itemLayout="horizontal"
        dataSource={currentPersonas}
        style={listStyle}
        renderItem={persona => (
          <List.Item
            actions={[
              <Button
                type="primary"
                style={buttonStyle}
                onClick={() => onVerMasDetalles(persona)}
              >
                Ver más detalles
              </Button>
            ]}
          >
            <List.Item.Meta
              title={persona.nombre}
              description={`Documento: ${persona.documento}`}
            />
          </List.Item>
        )}
      />
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={filteredPersonas.length}
        onChange={handlePageChange}
        showSizeChanger={false}
        style={{ marginTop: '16px', textAlign: 'center' }}
      />
    </div>
  );
};

PersonasList.defaultProps = {
  onVerMasDetalles: (persona) => console.log(`Ver más detalles de ${persona.nombre}`),
  listStyle: {},
  buttonStyle: {},
};

export default PersonasList; 