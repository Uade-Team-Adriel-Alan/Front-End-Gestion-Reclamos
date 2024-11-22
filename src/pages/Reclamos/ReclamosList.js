import React, { useEffect, useState } from "react";
import ReclamoService from "../../services/ReclamoService";
import ReclamoContent from "../../components/ReclamoContent";
import { Select, Button } from "antd";

const { Option } = Select;

const ReclamosList = () => {
  const [data, setData] = useState([]); // Para almacenar todos los reclamos
  const [filteredData, setFilteredData] = useState([]); // Para almacenar los reclamos filtrados
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState({
    tipoReclamo: '',
    estadoReclamo: '',
  });

  // Mapeos de tipo y estado
  const estadoMap = {
    1: "Pendiente",
    2: "En Proceso",
    3: "Resuelto",
    4: "Cancelado",
  };

  const tipoReclamoMap = {
    1: "Mucho humo",
    2: "Problema de agua",
    3: "Ruido molesto",
    4: "Problema eléctrico",
  };

  // Obtener todos los reclamos inicialmente
  const fetchData = async () => {
    try {
      const reclamos = await ReclamoService.obtenerReclamos();
      setData(reclamos);
      setFilteredData(reclamos); // Inicialmente mostramos todos los reclamos
    } catch (err) {
      setError('Error al cargar los reclamos.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Obtener reclamos por estado
  const fetchReclamosByEstado = async (idEstado) => {
    try {
      const reclamos = await ReclamoService.obtenerReclamosPorEstado(idEstado);
      setFilteredData(reclamos); // Actualizar con los reclamos filtrados por estado
    } catch (err) {
      setError('Error al cargar los reclamos filtrados.');
      console.error(err);
    }
  };

  // Obtener reclamos por tipooooo
  const fetchReclamosPorTipo = async (idTipo) => {
    try {
      const reclamos = await ReclamoService.obtenerReclamosPorTipo(idTipo);
      setFilteredData(reclamos); // Actualizar con los reclamos filtrados por estado
    } catch (err) {
      setError('Error al cargar los reclamos filtrados.');
      console.error(err);
    }
  };

  // Manejar cambios en los filtros
  const handleFilterChange = (value, field) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      [field]: value,
    }));
  };

  // Aplicar filtros (ahora solo por tipo de reclamo)
  const applyFilters = () => {
    if (filter.estadoReclamo) {
      const estadoSeleccionado = Object.keys(estadoMap).find(
        key => estadoMap[key] === filter.estadoReclamo
      );

      if (estadoSeleccionado) {
        fetchReclamosByEstado(parseInt(estadoSeleccionado));
      }
    } else {
      // Si no hay filtro de estado, mostrar todos los reclamos
      setFilteredData(data);
    }

    if (filter.tipoReclamo) {
      setFilteredData(filteredData.filter(reclamo => reclamo.tipoReclamo === filter.tipoReclamo));
    }
  };

  

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filter]);

  if (loading) return <p>Cargando reclamos del edificio...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Reclamos</h1>
      {/* Filtro */}
      <div style={{ marginBottom: 20 }}>
        <Select
          value={filter.tipoReclamo}
          onChange={(value) => handleFilterChange(value, 'tipoReclamo')}
          style={{ width: 200, marginRight: 10 }}
          placeholder="Filtrar por tipo de reclamo"
        >
          <Option value="">Todos</Option>
          {Object.entries(tipoReclamoMap).map(([id, descripcion]) => (
            <Option key={id} value={id}>
              {descripcion}
            </Option>
          ))}
        </Select>
        <Select
          value={filter.estadoReclamo}
          onChange={(value) => handleFilterChange(value, 'estadoReclamo')}
          style={{ width: 200, marginRight: 10 }}
          placeholder="Filtrar por estado"
        >
          <Option value="">Todos</Option>
          {Object.entries(estadoMap).map(([id, descripcion]) => (
            <Option key={id} value={descripcion}>
              {descripcion}
            </Option>
          ))}
        </Select>
        <Button onClick={applyFilters}>Aplicar Filtros</Button>
      </div>
      <ReclamoContent data={filteredData} />
    </div>
  );
};

export default ReclamosList;
