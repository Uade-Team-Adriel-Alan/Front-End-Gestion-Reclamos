import React, { useState } from "react";
import { Form, Input, Button, message, Upload } from "antd";

const FormularioReclamo = ({ usuario }) => {
  // Hooks definidos al principio, antes de cualquier retorno
  const [descripcion, setDescripcion] = useState("");
  const [imagenes, setImagenes] = useState([]);

  // Condición para no renderizar el formulario si el rol es 'admin'
  if (usuario.rol === "admin") {
    return null;
  }

  const handleSubmit = async () => {
    try {
      // Lógica para enviar el reclamo
      message.success("Reclamo enviado con éxito.");
    } catch (error) {
      message.error("Ocurrió un error al enviar el reclamo.");
    }
  };

  return (
    <Form layout="vertical" onFinish={handleSubmit} style={{ marginTop: "16px" }}>
      <Form.Item label="Descripción del Reclamo" required>
        <Input.TextArea
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
      </Form.Item>
      <Form.Item label="Imágenes (opcional)">
        <Upload
          multiple
          beforeUpload={(file) => {
            setImagenes([...imagenes, file]);
            return false;
          }}
          onRemove={(file) =>
            setImagenes(imagenes.filter((img) => img.uid !== file.uid))
          }
        >
          <Button>Subir Imágenes</Button>
        </Upload>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Enviar Reclamo
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FormularioReclamo;
