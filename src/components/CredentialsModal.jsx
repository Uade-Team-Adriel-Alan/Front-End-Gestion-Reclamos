import React, { useEffect, useState } from 'react';
import { Modal, Button, Spin, Typography, Divider, Radio, message } from 'antd';
import { getUser, createUser, deleteUser } from '../services/AuthService'; // Importar el servicio
import { DeleteOutlined } from '@ant-design/icons'; // Importar el ícono de eliminar

const { Title, Text } = Typography;

const CredentialsModal = ({ visible, documento, onCancel }) => {
  const [credentials, setCredentials] = useState(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState(null); // Estado para el rol
  const [isRoleSelectionVisible, setIsRoleSelectionVisible] = useState(false); // Estado para mostrar la selección de rol
  
  useEffect(() => {
    const fetchCredentials = async () => {
      setLoading(true);
      try {
        const data = await getUser.getUsuarioByDocumento(documento);
        setCredentials(data);
      } catch (error) {
        setCredentials(null); // Si hay un error, no hay credenciales
      } finally {
        setLoading(false);
      }
    };

    if (documento) {
      fetchCredentials();
    }
  }, [documento]);

  const handleAddCredentials = () => {
    setIsRoleSelectionVisible(true); // Mostrar la selección de rol
  };

  const handleRoleSelection = (selectedRole) => {
    setRole(selectedRole); // Establecer el rol seleccionado
  };

  const handleConfirmRole = async () => {
    if (!role) {
      message.warning("Por favor, seleccione un rol."); // Mensaje si no se seleccionó rol
      return;
    }
    try {
      const response = await createUser.registerUser(documento, role);
      message.success(response); // Mostrar mensaje de éxito
      setIsRoleSelectionVisible(false); // Ocultar la selección de rol

      // Cerrar el modal principal después de un pequeño retraso
      setTimeout(() => {
        onCancel(); // Cerrar el modal principal
      }, 300); // 300 ms de retraso
    } catch (error) {
      message.error("Error al agregar credenciales: " + error); // Mostrar mensaje de error
    }
  };

  const handleDeleteCredentials = async () => {
    try {
      await deleteUser.eliminarUsuario(credentials.email); // Llamar a la función para eliminar credenciales
      message.success("Credenciales eliminadas exitosamente."); // Mensaje de éxito
      setCredentials(null); // Limpiar las credenciales
      onCancel(); // Cerrar el modal principal
    } catch (error) {
      message.error("Error al eliminar credenciales: " + error); // Mostrar mensaje de error
    }
  };

  return (
    <Modal
      title="Credenciales de la Persona"
      visible={visible}
      onCancel={onCancel}
      footer={null}
    >
      {loading ? (
        <div style={{ textAlign: "center" }}>
          <Spin size="medium" />
          <p style={{ marginTop: "10px" }}>Cargando credenciales...</p>
        </div>
      ) : credentials ? (
        <>
          <Divider />
          <Text strong>Email: </Text>
          <Text>{credentials.email}</Text>
          <br />
          <Text strong>Password: </Text>
          <Text>{credentials.password}</Text>
          <br />
          <Text strong>Documento: </Text>
          <Text>{credentials.documento}</Text>
          <br />
          <Text strong>Rol: </Text>
          <Text>{credentials.rol}</Text>
          <br />
          {/* Contenedor para el botón de eliminar alineado a la derecha */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '5px' }}>
            <Button 
              type="dashed" 
              icon={<DeleteOutlined />} 
              onClick={handleDeleteCredentials}
            >
              Eliminar Credenciales
            </Button>
          </div>
        </>
      ) : (
        <>
          <p>Esta persona no tiene credenciales.</p>
          <Button type="primary" onClick={handleAddCredentials}>
            Agregar Credenciales
          </Button>
        </>
      )}

      {/* Modal para seleccionar rol */}
      <Modal
        title="Seleccionar Rol"
        visible={isRoleSelectionVisible}
        onCancel={() => setIsRoleSelectionVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsRoleSelectionVisible(false)}>
            Cancelar
          </Button>,
          <Button key="confirm" type="primary" onClick={handleConfirmRole}>
            Aceptar
          </Button>,
        ]}
      >
        <p>Seleccione el rol para la persona:</p>
        <Radio.Group onChange={(e) => handleRoleSelection(e.target.value)}>
          <Radio value="admin">Admin</Radio>
          <Radio value="comun">Común</Radio>
        </Radio.Group>
      </Modal>
    </Modal>
  );
};

export default CredentialsModal; 