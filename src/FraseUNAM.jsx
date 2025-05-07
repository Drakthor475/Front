import React from "react";
import styled from "styled-components";
const StyledFrase = styled.div`
    position: fixed;
    bottom: 20px;
    left: 20px;
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;
  `;

  // Estilo para la caja que resalta la frase
  const Box = styled.div`
    background-color: rgba(53, 53, 59, 0.7); /* Fondo azul translúcido */
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(66, 62, 62, 0.5); /* Sombra para resaltar */
    margin-left:500px ;
    margin-top:-900px;
  `;

  // Estilo para el texto
  const StyledText = styled.h1`
    font-size: 45px;
    margin: 0;
    color: white; /* Cambio de color del texto a blanco para mejor contraste */
    text-shadow: 0 0 10px #ffffff;
    font-family: 'Orbitron', sans-serif;
   
  `;
export function FraseUNAM() {
  // Estilo para el contenedor de la frase
  

  return (
    <StyledFrase>
      <Box>
        <StyledText>"Por mi raza hablará el espíritu"</StyledText>
      </Box>
    </StyledFrase>
  );
}
