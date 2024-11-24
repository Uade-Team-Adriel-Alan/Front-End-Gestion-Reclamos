import React, { useState } from 'react';
import { Button, Form, Modal, Select, Upload, message, Input } from 'antd';
import ReclamoService from '../services/ReclamoService';
import { useAuth } from '../context/AuthContext';

const { Option } = Select;

const ReclamoForm = ({ codigoEdificio, piso, numero, onReclamoAgregado }) => {
  const { auth } = useAuth(); // Accede al usuario autenticado
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [imagenes, setImagenes] = useState([]);
  const [zonaComun, setZonaComun] = useState(null);
  const [tipoReclamo, setTipoReclamo] = useState(null); // Guardará el id del tipo de reclamo seleccionado
  const [descripcion, setDescripcion] = useState(''); // Estado para la descripción del reclamo

  const tiposReclamo = [
    { id: 1, descripcion: 'Mucho humo' },
    { id: 2, descripcion: 'Problema de agua' },
    { id: 3, descripcion: 'Ruido molesto' },
    { id: 4, descripcion: 'Problema eléctrico' }
  ];

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setDescripcion(''); // Limpiar la descripción al cerrar el modal
  };

  const handleSubmit = async (values) => {
    if (!auth?.documento) {
      message.error('No se encontró el documento del usuario autenticado.');
      return;
    }

    if (!codigoEdificio || !piso || !numero) {
      message.error('Debe especificar la unidad y el edificio.');
      return;
    }

    try {
      const formData = new FormData();
      
      // Agregar parámetros al FormData
      formData.append('codigo', codigoEdificio);
      formData.append('documento', auth.documento);
      formData.append('descripcion', descripcion); // Usar la descripción ingresada
      formData.append('idTipTrec', tipoReclamo ? tipoReclamo.id : '');
      if (zonaComun) {
        formData.append('idUbicacion', zonaComun);
      } else {
        formData.append('piso', piso || 'No especificado');
        formData.append('numero', numero || 'No especificado');
      }

      // Agregar las imágenes si existen
      imagenes.forEach((img) => {
        formData.append('imagenes', img); // Asegúrate de que 'img' sea un archivo
      });

      // Enviar la solicitud
      if (zonaComun) {
        await ReclamoService.agregarReclamoZonaComun(formData);
      } else {
        await ReclamoService.agregarReclamo(formData);
      }

      message.success('Reclamo agregado exitosamente');
      onReclamoAgregado(); // Notificar que el reclamo fue agregado
      handleCloseModal(); // Cerrar el modal
    } catch (error) {
      message.error(error.response?.data || 'Error al agregar el reclamo');
      console.error(error);
    }
  };

  return (
    <>
      <Button type="primary" onClick={handleOpenModal}>
        Agregar Reclamo
      </Button>

      <Modal
        title="Crear Reclamo"
        visible={isModalVisible}
        onCancel={handleCloseModal}
        footer={null}
      >
        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            label="Tipo de Reclamo"
            name="idTipTrec"
            rules={[{ required: true, message: 'Seleccione el tipo de reclamo' }]}>
            <Select
              placeholder="Seleccione el tipo de reclamo"
              onChange={(value) => setTipoReclamo(tiposReclamo.find((tipo) => tipo.id === value))}
            >
              {tiposReclamo.map((tipo) => (
                <Option key={tipo.id} value={tipo.id}>
                  {tipo.descripcion}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="Descripción (máximo 1000 caracteres)">
            <Input.TextArea
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              maxLength={1000} // Limitar a 1000 caracteres
              placeholder="Ingrese una descripción del reclamo"
              rows={4}
            />
          </Form.Item>

          <Form.Item label="Zona Común (opcional)">
            <Select
              placeholder="Seleccione una zona común"
              onChange={(value) => setZonaComun(value)}
              allowClear
            >
              <Option value={1}>SUM</Option>
              <Option value={2}>Pileta</Option>
              <Option value={3}>Sala de estar</Option>
              <Option value={4}>Pasillo</Option>
              <Option value={5}>Gimnasio</Option>
              <Option value={6}>Lavadero</Option>
              <Option value={7}>Garage</Option>
              <Option value={8}>Terraza</Option>
            </Select>
          </Form.Item>

          <Form.Item label="Imágenes (opcional)">
            <Upload
              beforeUpload={(file) => {
                setImagenes((prev) => [...prev, file]);
                return false;
              }}
              onRemove={(file) => {
                setImagenes((prev) => prev.filter((img) => img.uid !== file.uid));
              }}
              multiple
            >
              <Button>Subir imágenes</Button>
            </Upload>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Crear Reclamo
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ReclamoForm;
