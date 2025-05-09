import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./Complementos/MostrarHorarios.css";
import { useBackground } from "../../../Fondos";

export function MuestraHorarios() {
  const location = useLocation();
  const filtros = location.state?.filtros;
  const [horarios, setHorarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const refs = useRef([]);
  useBackground('fondoH');

  // Función para verificar si el usuario está autenticado con JWT
  const checkAuth = () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwt_decode(token);
        if (decoded.exp * 1000 < Date.now()) {
          console.error("Token expirado");
          localStorage.removeItem('token');
          setIsAuthenticated(false);
        } else {
          setIsAuthenticated(true);
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

  // Función para eliminar duplicados
  const eliminarDuplicados = (horarios) => {
    const horariosUnicos = [];
    const combinacionesGeneradas = new Set();

    horarios.forEach((horario) => {
      const combinacion = horario.map((clase) => `${clase.lunes}-${clase.martes}-${clase.miercoles}-${clase.jueves}-${clase.viernes}`).join("-");
      if (!combinacionesGeneradas.has(combinacion)) {
        horariosUnicos.push(horario);
        combinacionesGeneradas.add(combinacion);
      }
    });

    return horariosUnicos;
  };

  const handleImprimir = (index) => {
    const content = refs.current[index];
    if (!content) {
      console.error("No se encontró el contenido a imprimir.");
      return;
    }
    const contentToPrint = content.cloneNode(true);
    const buttons = contentToPrint.querySelectorAll("button");
    buttons.forEach(button => button.style.display = "none");
    const title = contentToPrint.querySelector("h2");
    if (title) {
      title.remove();
    }

    const ventana = window.open("", "_blank", "width=800,height=600");
    if (!ventana) {
      alert("El navegador bloqueó la ventana emergente.");
      return;
    }

    ventana.document.write(`
      <html>
        <head>
          <title>Horario</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 20px;
            }
            table {
              width: 100%;
              border-collapse: collapse;
            }
            th, td {
              padding: 8px;
              text-align: left;
              border: 1px solid #ddd;
            }
            th {
              background-color: #f2f2f2;
            }
            h2 {
              text-align: center;
            }
          </style>
        </head>
        <body>
          <h2>Horario ${index + 1}</h2>
          ${contentToPrint.innerHTML}
        </body>
      </html>
    `);
    ventana.document.close();
    ventana.focus();
    ventana.print();
  };

  useEffect(() => {
    if (!filtros) {
      setError("No se proporcionaron filtros.");
      setLoading(false);
      return;
    }

    axios
      .post("http://localhost:3000/horarios/generar-horarios", filtros)
      .then((response) => {
        console.log("Respuesta de la API:", response.data);
        if (Array.isArray(response.data) && response.data.length > 0) {
          const horariosSinDuplicados = eliminarDuplicados(response.data);
          setHorarios(horariosSinDuplicados); // Usamos los horarios sin duplicados
        } else {
          setError("Formato de respuesta inválido.");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al generar horarios:", error);
        setError("Hubo un problema al obtener los horarios.");
        setLoading(false);
      });
  }, [filtros]);

  if (loading) {
    return (
      <div className="loader">
        <span className="loader-text">Cargando Horarios</span>
        <span className="load"></span>
      </div>
    );
  }

  if (error) return <p>{error}</p>;

  return (
    <div className="contenedor-horarios">
      <h1>Horarios Generados</h1>
      {horarios.length === 0 ? (
        <p>No se han generado horarios para los filtros seleccionados.</p>
      ) : (
        horarios.map((horario, index) => (
          <div key={index} className="horario-card" ref={(el) => (refs.current[index] = el)}>
            <button onClick={() => handleImprimir(index)}>🖨️ Imprimir este horario</button>
            <button className="boton-volver" onClick={() => window.history.back()}>🔙 Volver</button>
            <h2>Horario {index + 1}</h2>
            <table className="tabla-horario">
              <thead>
                <tr>
                  <th>Materia</th>
                  <th>Grupo</th>
                  <th>Profesor</th>
                  <th>Lunes</th>
                  <th>Martes</th>
                  <th>Miércoles</th>
                  <th>Jueves</th>
                  <th>Viernes</th>
                </tr>
              </thead>
              <tbody>
                {horario.map((clase) => (
                  <tr key={clase.id_horario}>
                    <td>{clase.materia?.nombre || "Sin materia"}</td>
                    <td>{clase.grupo || "Sin grupo"}</td>
                    <td>{clase.profesor?.nombre || "Sin profesor"}</td>
                    <td>{clase.lunes === 0 ? "-" : `${clase.lunes}:00 - ${clase.lunes + 2}:00`}</td>
                    <td>{clase.martes === 0 ? "-" : `${clase.martes}:00 - ${clase.martes + 2}:00`}</td>
                    <td>{clase.miercoles === 0 ? "-" : `${clase.miercoles}:00 - ${clase.miercoles + 2}:00`}</td>
                    <td>{clase.jueves === 0 ? "-" : `${clase.jueves}:00 - ${clase.jueves + 2}:00`}</td>
                    <td>{clase.viernes === 0 ? "-" : `${clase.viernes}:00 - ${clase.viernes + 2}:00`}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))
      )}
    </div>
  );
}
