import React, { useState } from "react";
import { List, Button, Input, Pagination, message } from "antd";
import { useNavigate } from "react-router-dom";
import FormularioReclamo from "./FormularioReclamo"; // Importar el formulario

const PersonasList = ({ personas, listStyle, buttonStyle }) => {
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPersona, setSelectedPersona] = useState(null); // Para manejar la persona seleccionada
  const pageSize = 10;

  const navigate = useNavigate();

  // Filtrar personas según el texto de búsqueda
  const filteredPersonas = personas.filter(
    (persona) =>
      persona.nombre.toLowerCase().includes(searchText.toLowerCase()) ||
      persona.documento.includes(searchText)
  );

  // Calcular las personas a mostrar en la página actual
  const startIndex = (currentPage - 1) * pageSize;
  const currentPersonas = filteredPersonas.slice(
    startIndex,
    startIndex + pageSize
  );

  return (
    <div style={{ padding: "24px", maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ marginBottom: "24px", textAlign: "center" }}>
        Lista de Personas
      </h1>
      <Input
        placeholder="Buscar por nombre o documento"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        style={{ marginBottom: "16px" }}
      />
      <List
        itemLayout="horizontal"
        dataSource={currentPersonas}
        style={listStyle}
        renderItem={(persona) => (
          <List.Item
            actions={[
              <Button
                type="primary"
                style={buttonStyle}
                onClick={() => navigate(`/personas/${persona.documento}`)}
              >
                Ver detalles
              </Button>,
            ]}
          >
            <List.Item.Meta
              title={persona.nombre}
              description={`Documento: ${persona.documento}`}
            />
            {/* Mostrar el formulario directamente si el rol es 'comun' */}
            <FormularioReclamo usuario={persona} />
          </List.Item>
        )}
      />
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={filteredPersonas.length}
        onChange={setCurrentPage}
        showSizeChanger={false}
        style={{ marginTop: "16px", textAlign: "center" }}
      />
    </div>
  );
};

PersonasList.defaultProps = {
  listStyle: {},
  buttonStyle: {},
};

export default PersonasList;
