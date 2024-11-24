import React from 'react';
import { List, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { DeleteOutlined } from '@ant-design/icons';
import { useAuth } from "../context/AuthContext";

const PersonasList = ({ personas , handleEliminarPersona}) => {
    const navigate = useNavigate();
    const { auth } = useAuth();

    return (
        <div style={{ padding: '24px', maxWidth: '800px', margin: '0 auto' }}>
            <List
                itemLayout="horizontal"
                dataSource={personas}
                renderItem={persona => (
                    <List.Item
                        actions={[
                            auth?.rol === "admin" && (
                                <>
                                    <Button
                                        type="primary"
                                        style={{ marginRight: '8px' }}
                                        onClick={() => navigate(`/personas/${persona.documento}`)}
                                    >
                                        Ver detalles
                                    </Button>,
                                    <Button
                                        type="danger"
                                        icon={<DeleteOutlined />}
                                        onClick={() => handleEliminarPersona(persona.documento)}
                                    />
                                </>
                            )
                        ]}
                    >
                        <List.Item.Meta
                            title={persona.nombre}
                            description={`Documento: ${persona.documento}`}
                        />
                    </List.Item>
                )}
            />
        </div>
    );
};

export default PersonasList;