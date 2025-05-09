import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./Componentes/Formato.css";
import { useBackground } from "../../Fondos";

export function HorarioSemestre() {
  useBackground('fondoGen')
  const location = useLocation();
  const [horarios, setHorarios] = useState([]);
  

  useEffect(() => {
    setHorarios(location.state ? location.state.horarios : []);
  }, [location]);

  const obtenerRango = (hora) => {
    return `${hora}:00 - ${hora + 2}:00`;
  };

  const nombresDias = ["lunes", "martes", "miércoles", "jueves", "viernes"];
  const dias = ["lunes", "martes", "miercoles", "jueves", "viernes"];

  return (
    <div className="tabla-container">
      <button className="boton-volver" onClick={() => window.history.back()}>
        🔙 Volver
      </button>
      <table>
        <thead>
          <tr>
            <th>Materia</th>
            <th>Profesor</th>
            <th>Grupo</th>
            <th>Horario</th>
          </tr>
        </thead>
        <tbody>
        
  {horarios.length > 0 ? (
    horarios.map((h, index) => {
      // Construimos los días con sus horarios
      const diasConHorario = dias
        .filter(dia => h[dia] !== 0)
        .map(dia => `${nombresDias[dias.indexOf(dia)]} ${obtenerRango(h[dia])}`)
        .join(', ');

      return (
        <tr key={index}>
          <td>{h.materia.nombre}</td>
          <td>{h.profesor.nombre}</td>
          <td>{h.grupo}</td>
          <td colSpan="2">{diasConHorario}</td>
        </tr>
      );
    })
  ) : (
    <tr>
      <td colSpan="5">No se encontraron horarios disponibles.</td>
    </tr>
  )}
</tbody>
      </table>
    </div>
  );
}
