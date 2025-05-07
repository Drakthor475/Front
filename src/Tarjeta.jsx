import React from "react";
import styled from "styled-components";

const StyleCard = styled.div`
  /* Estilos de la tarjeta */
  .form {
    --background: #d3d3d3;
    --input-focus: #2d8cf0;
    --font-color: #323232;
    --font-color-sub: #666;
    --bg-color: #fff;
    --main-color: #323232;

    padding: 20px;
    background: var(--background);
    display: flex;
    flex-direction: column;
    align-items: flex-start; /* Alineación a la izquierda */
    justify-content: center;
    gap: 20px;
    border-radius: 10px;
    border: 2px solid var(--main-color);
    box-shadow: 4px 4px var(--main-color);
    width: 300px;
    height: 400px;
    margin-top: 40px;
    margin-left: 120px;
  }

  /* Cargamos la fuente Poppins */
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');

  #heading {
    font-family: 'Poppins', sans-serif; /* Cambié la fuente aquí */
    color: var(--font-color);
    font-weight: 700;
    font-size: 24px;
    margin-bottom: 10px;
    text-align: left; /* Alineado a la izquierda */
    width: 100%;
    margin-top:-10px
  }

  #subtitle {
    font-family: 'Poppins', sans-serif; /* Cambié la fuente aquí también */
    color: var(--font-color);
    font-weight: 700;
    font-size: 24px;
    margin-top: 20px;
    text-align: left; /* Alineado a la izquierda */
    width: 100%;
  }

  .button {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
    width: 250px;
    height: 40px;
    border-radius: 5px;
    border: 2px solid var(--main-color);
    background-color: var(--bg-color);
    box-shadow: 4px 4px var(--main-color);
    font-size: 16px;
    font-weight: 600;
    color: var(--font-color);
    cursor: pointer;
    transition: all 250ms;
    position: relative;
    overflow: hidden;
    z-index: 1;
    margin-top: 10px;
  }

  .button::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 0;
    background-color: #212121;
    z-index: -1;
    box-shadow: 4px 8px 19px -3px rgba(0, 0, 0, 0.27);
    transition: all 250ms;
  }

  .button:hover {
    color: #e8e8e8;
  }

  .button:hover::before {
    width: 100%;
  }

  /* Estilo para el segundo botón, lo subimos */
  .button-second {
    margin-top: -40px; /* Alinea el segundo botón más cerca del primero */
  }
`;

export function Tarjeta({
  titulo,
  children,
  onClick = () => {},
  textoBoton = "Buscar",
  subtitulo,
  children2,
  onClick2 = () => {},
  textoBoton2 = "Generar",
}) {
  return (
    <StyleCard>
      <div className="form">
        <h2 id="heading">{titulo}</h2>

        {/* Primer contenido */}
        {children}

        {/* Primer botón */}
        <button className="button" onClick={onClick}>
          <span>{textoBoton}</span>
        </button>

        {/* Subtítulo */}
        {subtitulo && <h3 id="subtitle">{subtitulo}</h3>}

        {/* Segundo contenido */}
        {children2}

        {/* Segundo botón con clase modificada */}
        <button className="button button-second" onClick={onClick2}>
          <span>{textoBoton2}</span>
        </button>
      </div>
    </StyleCard>
  );
}
