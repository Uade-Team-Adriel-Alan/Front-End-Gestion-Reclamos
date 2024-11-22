import React, { useState } from 'react';
import { Button, Form, Modal, Select, Upload, message } from 'antd';
import ReclamoService from '../services/ReclamoService';
import { useAuth } from '../context/AuthContext';

const { Option } = Select;

const ReclamoForm = ({ codigoEdificio, piso, numero, onReclamoAgregado }) => {
  const { auth } = useAuth(); // Accede al usuario autenticado
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [imagenes, setImagenes] = useState([]);
  const [zonaComun, setZonaComun] = useState(null);
  const [tipoReclamo, setTipoReclamo] = useState(null); // Guardará el id del tipo de reclamo seleccionado

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
      // Si es zona común, enviar el reclamo con la zona
      if (zonaComun) {
        await ReclamoService.agregarReclamoZonaComun({
          codigo: codigoEdificio,
          documento: auth.documento,
          idUbicacion: zonaComun,
          descripcion: tipoReclamo ? tipoReclamo.descripcion : '',
          idTipTrec: tipoReclamo ? tipoReclamo.id : '',
        });
      } else {
        await ReclamoService.agregarReclamo({
          codigo: codigoEdificio || 'No especificado',
          piso: piso || 'No especificado',
          numero: numero || 'No especificado',
          documento: auth.documento,
          descripcion: tipoReclamo ? tipoReclamo.descripcion : '',
          idTipTrec: tipoReclamo ? tipoReclamo.id : '',
          
        });
      }
      

      message.success('Reclamo agregado exitosamente');
      console.log(codigoEdificio,piso,numero)
      console.log()
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
            rules={[{ required: true, message: 'Seleccione el tipo de reclamo' }]}
          >
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
