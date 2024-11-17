import React, { useEffect, useState } from "react";
import { getAllEdificios } from "../services/edificioService";
import EdificioCard from "../components/EdificioCard";

function Home() {
  const [edificios, setEdificios] = useState([]);

  useEffect(() => {
    const fetchEdificios = async () => {
      try {
        const data = await getAllEdificios();
        setEdificios(data);
      } catch (error) {
        console.error("Error al cargar los edificios:", error);
      }
    };
    fetchEdificios();
  }, []);

  return (
    <div style={{ padding: "24px", maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ marginBottom: "24px", textAlign: "center" }}>
        Lista de Edificios
      </h1>
      {edificios.map((edificio) => (
        <EdificioCard
          key={edificio.codigo}
          nombre={edificio.nombre}
          imagenURL="https://i.pinimg.com/736x/a7/29/84/a72984424702de993c3592e00b910ff9.jpg"
          direccion={edificio.direccion}
          codigoEdificio={edificio.codigo}  
        />
      ))}
    </div>
  );
}

export default Home;
