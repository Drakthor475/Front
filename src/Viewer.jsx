import React from "react";
import styled from "styled-components";
import { Tarjeta } from "./Tarjeta";
import { FraseUNAM } from "./FraseUNAM";


export function VistaViewer({ semestre, setSemestre, handleBuscar, handleGenerar }) {
  return (
      <div>
      <Tarjeta
        titulo="Consultas"
        subtitulo="Genera un horario"
        textoBoton="Buscar"
        onClick={handleBuscar}
        onClick2={handleGenerar}
      >
        <label htmlFor="semestre" className="select-semestre-label">
          Selecciona el semestre:
        </label>
        <select
          value={semestre}
          onChange={(e) => setSemestre(e.target.value)}
          className="select-semestre"
        >
          <option value="">-- Selecciona --</option>
          {[...Array(8)].map((_, i) => (
            <option key={i} value={i + 1}>{`${i + 1}° Semestre`}</option>
          ))}
        </select>
      </Tarjeta>
      <FraseUNAM></FraseUNAM>
      </div>
      
 
  );
}
