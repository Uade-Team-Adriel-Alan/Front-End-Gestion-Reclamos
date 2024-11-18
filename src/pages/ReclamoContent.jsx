import React, { useEffect, useState } from 'react';
import ReclamosTable from '../components/ReclamosTable';
const ReclamoContent = ({data}) => {
  const [reclamos, setReclamos] = useState([]);

  useEffect(() => {
    const fetchReclamos = async () => {
      try {
        const mappedReclamos = data.map((reclamo) => ({
          idReclamo: reclamo.idReclamo,
          persona: reclamo.persona ? reclamo.persona.nombre : 'No especificado',
          documento: reclamo.persona ? reclamo.persona.documento : 'No especificado',
          edificio: reclamo.edificio ? reclamo.edificio.nombre : 'No especificado',
          direccionEdificio: reclamo.edificio ? reclamo.edificio.direccion : 'No especificado',
          unidad: reclamo.unidad ? reclamo.unidad.numero : 'No especificado',
          descripcion: reclamo.descripcion,
          tipoReclamo: reclamo.tipoReclamo ? reclamo.tipoReclamo.descripcion : 'No especificado',
          estadoReclamo: reclamo.estadoReclamo ? reclamo.estadoReclamo.descripcion : 'No especificado',
          fechaCreacion: reclamo.fechaCreacion,
          ubicacion: reclamo.ubicacion ? reclamo.ubicacion.descripcion : 'No especificado',
          imagenes: reclamo.imagenes || [],
        }));
        setReclamos(mappedReclamos);
      } catch (error) {
        console.error('Error al cargar los reclamos:', error);
      }
    };

    fetchReclamos();
  }, []);

  const actualizarReclamo = (reclamoActualizado) => {
    setReclamos((prevReclamos) =>
      prevReclamos.map((reclamo) =>
        reclamo.idReclamo === reclamoActualizado.idReclamo ? reclamoActualizado : reclamo
      )
    );
  };

  return (
    <div>
      <h1>Reclamos</h1>
      <ReclamosTable reclamos={reclamos} actualizarReclamo={actualizarReclamo} />
    </div>
  );
};

export default ReclamoContent;
