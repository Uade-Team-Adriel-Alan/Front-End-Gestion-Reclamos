import React, { useEffect, useState } from "react";
import EdificioCard from "../components/EdificioCard";

function ShowEdificios({ data, onEliminar }) {
  const [edificios, setEdificios] = useState(data);

  useEffect(() => {
    setEdificios(data);
  }, [data]);

  return (
    <div>
      {edificios.map((edificio) => (
        <EdificioCard
          key={edificio.codigo}
          nombre={edificio.nombre}
          imagenURL="https://i.pinimg.com/736x/a7/29/84/a72984424702de993c3592e00b910ff9.jpg"
          direccion={edificio.direccion}
          codigoEdificio={edificio.codigo}
          eliminarEdificio={() => onEliminar(edificio.codigo)}
        />
      ))}
    </div>
  );
}

export default ShowEdificios;
