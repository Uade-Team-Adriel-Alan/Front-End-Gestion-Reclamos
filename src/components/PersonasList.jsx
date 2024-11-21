import React, { useState } from "react";
import { List, Button, Input, Pagination, Modal, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { DeleteOutlined } from '@ant-design/icons';
import '../App.css'; // Asegúrate de importar App.css

const PersonasList = ({ personas, listStyle, buttonStyle, eliminarPersona }) => {
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [personaAEliminar, setPersonaAEliminar] = useState(null); // Para almacenar la persona a eliminar
  const [loading, setLoading] = useState(false); // Estado para controlar la carga
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

  const showModal = (documento) => {
    setPersonaAEliminar(documento); // Establecer la persona a eliminar
    setIsModalVisible(true); // Mostrar el modal
  };

  const handleEliminar = async () => {
    if (personaAEliminar) {
      setLoading(true); // Iniciar la carga
      await eliminarPersona(personaAEliminar); // Llamar a la función de eliminar
      setIsModalVisible(false); // Cerrar el modal
      setPersonaAEliminar(null); // Limpiar la persona a eliminar
      setLoading(false); // Finalizar la carga
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false); // Cerrar el modal si el usuario cancela
    setPersonaAEliminar(null); // Limpiar la persona a eliminar
  };

  return (
    <div style={{ padding: "24px", maxWidth: "800px", margin: "0 auto" }}>
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
              <Button
                type="danger"
                icon={<DeleteOutlined />}
                onClick={() => showModal(persona.documento)} // Mostrar el modal de confirmación
              />
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
        onChange={setCurrentPage}
        showSizeChanger={false}
        style={{ marginTop: "16px", textAlign: "center" }}
      />

      {/* Modal de confirmación para eliminar persona */}
      <Modal
        title="Confirmar Eliminación"
        visible={isModalVisible}
        onOk={handleEliminar}
        onCancel={handleCancel}
        okText="Eliminar"
        cancelText="Cancelar"
      >
        {loading ? (
          <div style={{ textAlign: "center" }}>
            <Spin size="medium" />
            <p style={{ marginTop: "10px" }}>Eliminando persona...</p>
          </div>
        ) : (
          <>
            <p>¿Estás seguro de que deseas eliminar esta persona?</p>
            <p>Se eliminarán todas las dependencias, incluso las credenciales de Login.</p>
          </>
        )}
      </Modal>
    </div>
  );
};

PersonasList.defaultProps = {
  listStyle: {},
  buttonStyle: {},
};

export default PersonasList;
