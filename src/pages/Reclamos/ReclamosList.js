import React, { useEffect, useState } from "react";
import ReclamoService from "../../services/ReclamoService";
import ReclamoContent from "../../components/ReclamoContent";
import { Select, Button, Input } from "antd";

const { Option } = Select;

const ReclamosList = () => {
  const [data, setData] = useState([]); // Todos los reclamos
  const [filteredData, setFilteredData] = useState([]); // Reclamos filtrados
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState({
    tipoReclamo: '',
    estadoReclamo: '',
    numero: '',
    edificio: '',
    unidad: '',
    usuario: ''
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

  // Obtener todos los reclamos al inicio
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

  // Manejar cambios en los filtros
  const handleFilterChange = (value, field) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      [field]: value,
    }));
  };

  // Aplicar filtros al hacer clic en el botón
  const applyFilters = async () => {
    let filtered = data;

    try {
      // Filtrar por estado
      if (filter.estadoReclamo) {
        const estadoSeleccionado = Object.keys(estadoMap).find(
          key => estadoMap[key] === filter.estadoReclamo
        );
        if (estadoSeleccionado) {
          filtered = await ReclamoService.obtenerReclamosPorEstado(parseInt(estadoSeleccionado));
        }
      }

      // Filtrar por tipo
      if (filter.tipoReclamo) {
        filtered = await ReclamoService.obtenerReclamosPorTipo(parseInt(filter.tipoReclamo));
      }

      // Filtrar por número
      if (filter.numero) {
        filtered = await ReclamoService.obtenerReclamoPorNumero(parseInt(filter.numero));
      }

      // Filtrar por edificio
      if (filter.edificio) {
        filtered = await ReclamoService.obtenerReclamosPorEdificio(filter.edificio);
      }

      // Filtrar por unidad
      if (filter.unidad) {
        filtered = await ReclamoService.obtenerReclamosPorUnidad(filter.unidad);
      }

      // Filtrar por usuario
      if (filter.usuario) {
        filtered = await ReclamoService.obtenerReclamosPorPersona(filter.usuario);
      }
    } catch (err) {
      setError('Error al aplicar filtros.');
      console.error(err);
    }

    setFilteredData(filtered);
  };

  // Limpiar filtros al hacer clic en "Limpiar Filtros"
  const clearFilters = () => {
    setFilter({
      tipoReclamo: '',
      estadoReclamo: '',
      numero: '',
      edificio: '',
      unidad: '',
      usuario: ''
    });
    setFilteredData(data); // Restaurar la lista completa
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <p>Cargando reclamos del edificio...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Reclamos</h1>
      {/* Filtro */}
      <div style={{ marginBottom: 20 }}>
        {/* Filtro por tipo */}
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

        {/* Filtro por estado */}
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

        {/* Filtro por número */}
        <Input
          placeholder="Filtrar por número"
          value={filter.numero}
          onChange={(e) => handleFilterChange(e.target.value, 'numero')}
          style={{ width: 200, marginRight: 10 }}
        />

        {/* Filtro por edificio */}
        <Input
          placeholder="Filtrar por edificio"
          value={filter.edificio}
          onChange={(e) => handleFilterChange(e.target.value, 'edificio')}
          style={{ width: 200, marginRight: 10 }}
        />

        {/* Filtro por unidad */}
        <Input
          placeholder="Filtrar por unidad"
          value={filter.unidad}
          onChange={(e) => handleFilterChange(e.target.value, 'unidad')}
          style={{ width: 200, marginRight: 10 }}
        />

        {/* Filtro por usuario */}
        <Input
          placeholder="Filtrar por usuario"
          value={filter.usuario}
          onChange={(e) => handleFilterChange(e.target.value, 'usuario')}
          style={{ width: 200, marginRight: 10 }}
        />

        {/* Botones */}
        <Button onClick={applyFilters} style={{ marginRight: 10 }}>
          Aplicar Filtros
        </Button>
        <Button onClick={clearFilters} type="default">
          Limpiar Filtros
        </Button>
      </div>

      <ReclamoContent data={filteredData} />
    </div>
  );
};

export default ReclamosList;
