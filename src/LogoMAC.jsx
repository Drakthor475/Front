import React from "react";
import styled from "styled-components";

const StyledLogoContainer = styled.div`
  position: fixed;
  bottom: 20px;
  left: 20px;
  z-index: 1000;
  color: white;
`;

const TopTextContainer = styled.div`
  position: absolute;
  bottom: 250px; /* Ajusta esto para subir más o menos */
  left: 0px;
`;
const GHAMBox = styled.div`
  background: rgba(0, 0, 0, 0.3); /* fondo oscuro con transparencia */
  padding: 10px 20px;
  border-radius: 12px;
  box-shadow: 0 0 15pxrgba(255, 255, 255, 0.56);
  display: inline-block;
  margin-bottom: 10px;
`;


export function LogoMAC() {
  return (
    <StyledLogoContainer>

      <TopTextContainer>
        <GHAMBox>
        <h3 style={{
          fontSize: '100px',
          margin: 0,
          color: '#8A2BE2',
          textShadow: '0 0 10pxrgb(203, 198, 198)',
          fontFamily: 'Orbitron, sans-serif'
        }}>GHAM</h3>
        <h2 style={{
          fontSize: '30px',
          marginTop: '10px',
          left:'-50px',
          color:'white',
          fontFamily: 'Orbitron, sans-serif'
        }}>Simplificando lo complejo</h2>
        </GHAMBox>
      </TopTextContainer>

      <h1 style={{
        fontSize: '50px',
        margin: 0,
        color: 'blue',
        textShadow: '0 0 10px #ffffff',
        fontFamily: 'Orbitron, sans-serif'
      }}>M@</h1>
      <h2 style={{
        fontSize: '20px',
        marginTop: '10px',
        color:'white',
        fontFamily: 'Orbitron, sans-serif'
      }}>Matemáticas Aplicadas y Computación</h2>
    </StyledLogoContainer>
  );
}
