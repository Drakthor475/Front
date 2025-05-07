import React, { useEffect, useState } from "react"; 
import { useNavigate, useLocation } from "react-router-dom";

import { Login } from "./login";
import { LogoMAC } from "./LogoMAC";
import { useBackground } from "./Fondos";
import jwt_decode from 'jwt-decode';

export function Firstpage() {
  const navigate = useNavigate();
  const location = useLocation();  // Obtener la ruta actual
  const [isAuthenticated, setIsAuthenticated] = useState(false); 

  useBackground('login');

  // Función para verificar si el usuario está autenticado con JWT
  const checkAuth = () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwt_decode(token);

        // Verificar si el token ha expirado
        if (decoded.exp * 1000 < Date.now()) {
          console.error("Token expirado");
          localStorage.removeItem('token');
          setIsAuthenticated(false);
        } else {
          setIsAuthenticated(true);

          // Solo redirigir a /horariosweb si no estamos ya en esa página
          if (location.pathname === "/" && decoded) {
            navigate("/horariosweb");
          }
        }
      } catch (error) {
        console.error("Token inválido", error);
        setIsAuthenticated(false);
      }
    } else {
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    // Verificar autenticación solo al montar el componente
    checkAuth();

    // Deshabilitar scroll al montar el componente
    document.body.style.overflow = 'hidden';

    // Función de limpieza para restablecer el scroll al desmontar
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [location.pathname]);  // Dependemos de la ruta para que no ocurra redirección cuando ya estamos en /horariosweb

  return (
    <div style={{
      position: 'fixed',
      width: '100%',
      height: '100%',
      overflow: 'hidden'
    }}>
      { !isAuthenticated ? (
        <Login />
      ) : (
        // Aquí podrías agregar algo como un mensaje de bienvenida o redirigir directamente si el usuario ya está logueado.
        <h1>Bienvenido</h1>
      )}
      <LogoMAC />
    </div>
  );
}
