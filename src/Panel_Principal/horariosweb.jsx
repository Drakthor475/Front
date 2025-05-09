import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { VistaAdmin } from "./Administrador/Admin";
import { VistaViewer } from "./Viewer/Viewer";
import { useBackground } from "../Fondos";

export function Horarios() {
  // GENERAL
  const navigate = useNavigate();
  const [semestre, setSemestre] = useState("");
  const [horarios, setHorarios] = useState([]);
  const [materias, setMaterias] = useState([]);
  const [profesores, setProfesores] = useState([]);
  const [todosHorarios, setTodosHorarios] = useState([]);
  const [rolUsuario, setRolUsuario] = useState("viewer");
  
  // ALTA MATERIAS
  const [nombreAltaMateria, setNombreAltaMateria] = useState("");
  const [semestreAltaMateria, setSemestreAltaMateria] = useState("");
  const [idAltaMateria, setIdAltaMateria] = useState("");
  
  // CAMBIOS MATERIAS
  const [idModMateria, setIdModMateria] = useState("");
  const [nombreModMateria, setNombreModMateria] = useState("");
  const [semestreModMateria, setSemestreModMateria] = useState("");
  
  // BAJAS MATERIAS
  const [idBajaMateria, setIdBajaMateria] = useState("");
  
  // ALTAS PROFESOR
  const [idAltaProfesor, setIdAltaProfesor] = useState("");
  const [nombreAltaProfesor, setNombreAltaProfesor] = useState("");
  
  // BAJAS PROFESOR
  const [idBajaProfesor, setIdBajaProfesor] = useState("");
  
  // CAMBIOS PROFESOR
  const [nombreModProfesor, setNombreModProfesor] = useState("");
  const [idModProfesor, setIdModProfesor] = useState("");
  
  // ALTA HORARIOS
  const [horariosAlta, setHorariosAlta] = useState([{ 
    id_materia: "", 
    id_profesor: "",
    grupo: "", 
    id_horario: "", 
    lunes: "", martes: "", miercoles: "", jueves: "", viernes: "",
    profesoresDisponibles: [] 
  }]);
  const [semestreSeleccionado, setSemestreSeleccionado] = useState("");
  

  useBackground("fondoHorarios");
  
  useEffect(() => {
    checkRol();
    obtenerMaterias();
    obtenerProfesores();
    obtenerTodosHorarios();
  }, []);

  const checkRol = () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwt_decode(token);
        setRolUsuario(decoded.nivelUsuario);
      } catch (error) {
        console.error("Error al decodificar el token:", error);
        setRolUsuario("viewer");
      }
    } else {
      setRolUsuario("viewer");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("rol");
    navigate("/");
  };

  // FUNCIONES PARA HORARIOS
  const obtenerTodosHorarios = async () => {
    try {
      const response = await axios.get("http://localhost:3000/horarios/findAll");
      setTodosHorarios(response.data);
    } catch (error) {
      console.error("Error al obtener todos los horarios", error);
    }
  };

  const handleBuscar = async () => {
    const semestreNum = parseInt(semestre);
    if (isNaN(semestreNum)) {
      alert("Selecciona un semestre válido.");
      return;
    }

    if (semestreNum % 2 !== 0) {
      alert("No hay horarios disponibles para semestres impares.");
      return;
    }

    try {
      const response = await axios.get(`http://localhost:3000/horarios/por-semestre/${semestreNum}`);
      setHorarios(response.data);
      navigate("/HorariosSemestre", { state: { horarios: response.data } });
    } catch (error) {
      console.error("Error al obtener horarios:", error);
      alert("No se pudieron obtener los horarios.");
    }
  };

  const handleGenerar = () => {
    navigate("/Formulario");
  };

  // FUNCIONES PARA MATERIAS
  const obtenerMaterias = async () => {
    try {
      const response = await axios.get("http://localhost:3000/materias/findALL");
      setMaterias(response.data);
    } catch (error) {
      console.error("Error al obtener materias", error);
    }
  };

  const handleAltaMateria = async () => {
    if (!nombreAltaMateria || !semestreAltaMateria || !idAltaMateria) {
      alert("Completa todos los campos");
      return;
    }

    try {
      await axios.post("http://localhost:3000/materias", {
        nombre: nombreAltaMateria,
        semestre: parseInt(semestreAltaMateria),
        id_materia: parseInt(idAltaMateria),
      });
      alert("Materia registrada con éxito");
      obtenerMaterias();
    } catch (error) {
      console.error("Error al registrar materia:", error);
      alert(error.response?.data?.message || "Hubo un error al registrar la materia.");
    }
  };

  const handleBajaMateria = async () => {
    if (!idBajaMateria) {
      alert("Selecciona una materia");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:3000/materias/${idBajaMateria}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Materia eliminada correctamente");
      obtenerMaterias();
    } catch (error) {
      console.error("Error al dar de baja la materia", error);
    }
  };

  const handleUpdateMateria = async () => {
    if (!idModMateria || !nombreModMateria || !semestreModMateria) {
      alert("Completa todos los campos");
      return;
    }
  
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `http://localhost:3000/materias/${idModMateria}`,  
        {
          id_materia: parseInt(idModMateria),
          nombre: nombreModMateria,
          semestre: parseInt(semestreModMateria),
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Materia actualizada correctamente.");
      obtenerMaterias();
    } catch (error) {
      console.error(error);
      alert("Hubo un error al actualizar la materia.");
    }
  };

  // FUNCIONES PARA PROFESORES
  const obtenerProfesores = async () => {
    try {
      const response = await axios.get("http://localhost:3000/profesores/findALL");
      setProfesores(response.data);
    } catch (error) {
      console.error("Error al obtener profesores", error);
    }
  };

  const handleAltaProfesor = async () => {
    if (!nombreAltaProfesor || !idAltaProfesor) {
      alert("Completa todos los campos");
      return;
    }

    try {
      await axios.post("http://localhost:3000/profesores/create", {
        id_profesor: parseInt(idAltaProfesor),
        nombre: nombreAltaProfesor,
      });
      alert("Profesor registrado exitosamente.");
      obtenerProfesores();
    } catch (error) {
      console.error("Error al registrar profesor", error);
      alert("Hubo un error al registrar el profesor.");
    }
  };

  const handleBajaProfesor = async () => {
    if (!idBajaProfesor) {
      alert("Selecciona un profesor");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:3000/profesores/${idBajaProfesor}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Profesor eliminado correctamente");
      obtenerProfesores();
    } catch (error) {
      console.error("Error al dar de baja el profesor", error);
    }
  };

  const handleUpdateProfesor = async () => {
    if (!idModProfesor || !nombreModProfesor) {
      alert("Completa todos los campos");
      return;
    }
  
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:3000/profesores/${idModProfesor}`,
        {
          id_profesor: parseInt(idModProfesor),
          nombre: nombreModProfesor,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Profesor actualizado correctamente.");
      obtenerProfesores();
    } catch (error) {
      console.error("Error al actualizar profesor:", error);
      alert("Error al actualizar profesor.");
    }
  };

  // FUNCIONES PARA ALTA DE HORARIOS
  const obtenerProfesoresPorMateria = async (idMateria) => {
    try {
      console.log("Llamando a la API con idMateria:", idMateria);
      const response = await axios.get(`http://localhost:3000/horarios/materias-profesores/${idMateria}`);
      
      if (response.status === 200) {
        console.log("Respuesta completa del backend:", response.data);
        
        // Ajuste para la estructura actual del backend
        const backendData = response.data;
        let profesores = [];
        
        // El backend devuelve un array con un objeto que contiene materia y profesores
        if (Array.isArray(backendData) && backendData.length > 0) {
          profesores = backendData[0].profesores || [];
        }
        
        console.log("Profesores formateados:", profesores);
        return profesores;
      } else {
        console.error("Error: La API no devolvió los datos esperados", response);
        return [];
      }
    } catch (error) {
      console.error("Error al obtener profesores por materia:", error);
      return [];
    }
  };
  
  const handleHorarioChange = (index, campo, valor) => {
    const nuevosHorarios = [...horariosAlta];
  
    // Validación de días
    if (['lunes', 'martes', 'miercoles', 'jueves', 'viernes'].includes(campo)) {
      nuevosHorarios[index][campo] = valor && !isNaN(parseInt(valor)) ? valor : "";
    } else {
      nuevosHorarios[index][campo] = valor;
    }
  
    // Al cambiar materia, actualizar profesores
    if (campo === "id_materia") {
      const materiaId = nuevosHorarios[index].id_materia;
  
      if (materiaId) {
        obtenerProfesoresPorMateria(materiaId)
          .then(profesores => {
            console.log("Profesores disponibles para selección:", profesores);
            
            // Ajuste para mapear los profesores a la estructura esperada
            nuevosHorarios[index].profesoresDisponibles = profesores.map(prof => ({
              id_profesor: prof.id,  // El backend usa 'id' pero necesitamos 'id_profesor'
              nombre: prof.nombre
            }));
  
            // Si solo hay un profesor, seleccionarlo automáticamente
            if (profesores.length === 1) {
              nuevosHorarios[index].id_profesor = profesores[0].id;
            } else {
              nuevosHorarios[index].id_profesor = ""; // reset si hay más de uno
            }
  
            setHorariosAlta([...nuevosHorarios]);
          })
          .catch(error => {
            console.error("Error al obtener profesores:", error);
            nuevosHorarios[index].profesoresDisponibles = [];
            nuevosHorarios[index].id_profesor = "";
            setHorariosAlta([...nuevosHorarios]);
          });
      } else {
        nuevosHorarios[index].profesoresDisponibles = [];
        nuevosHorarios[index].id_profesor = "";
        setHorariosAlta([...nuevosHorarios]);
      }
    } else {
      setHorariosAlta(nuevosHorarios);
    }
  };
  
  
  

const handleAgregarHorario = () => {
  if (horariosAlta.length >= 7) {
    alert("Solo puedes registrar hasta 7 materias.");
    return;
  }
  setHorariosAlta([
    ...horariosAlta,
    { id_materia: "", hora_inicio: "", id_profesor: "", profesoresDisponibles: [] }
  ]);
};
  const handleEliminarHorario = (index) => {
    if (horariosAlta.length <= 1) {
      alert("Debe haber al menos un horario");
      return;
    }
    setHorariosAlta(horariosAlta.filter((_, i) => i !== index));
  };
  const handleChangeSemestre = (value) => {
    setSemestreSeleccionado(value);
    setHorariosAlta([{ 
      id_materia: "", 
      hora_inicio: "", 
      id_profesor: "",
      profesoresDisponibles: [] 
    }]);
  };
  
    const handleAltaHorario = async () => {
      console.log("horariosAlta antes de validación:", JSON.stringify(horariosAlta, null, 2));
    
      const horariosConErrores = horariosAlta.map((h, i) => {
        const errores = [];
    
        if (!h.id_materia || isNaN(parseInt(h.id_materia))) errores.push("materia válida");
        if (!h.id_profesor || isNaN(parseInt(h.id_profesor))) errores.push("profesor válido");
        if (!h.grupo) errores.push("grupo");
    
        const diasValidos = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes'].some(
          dia => h[dia] && parseInt(h[dia]) >= 7 && parseInt(h[dia]) <= 20
        );
        if (!diasValidos) errores.push("al menos un día con hora válida (7-20)");
    
        return { index: i, errores };
      }).filter(item => item.errores.length > 0);
    
      if (horariosConErrores.length > 0) {
        const mensaje = horariosConErrores.map(item =>
          `Horario ${item.index + 1}: Faltan ${item.errores.join(", ")}`
        ).join("\n");
        alert(`Corrige los siguientes problemas:\n\n${mensaje}`);
        return;
      }
    
      try {
        const token = localStorage.getItem("token");
    
        const datosParaEnviar = horariosAlta.map(h => {
          const dias = {};
          ['lunes', 'martes', 'miercoles', 'jueves', 'viernes'].forEach(dia => {
            dias[dia] = h[dia] ? parseInt(h[dia]) : 0;
          });
    
          const dto = {
            id_Materia: parseInt(h.id_materia),
            id_Profesor: parseInt(h.id_profesor),
            grupo: h.grupo,
            ...dias
          };
    
          if (h.id_horario && !isNaN(parseInt(h.id_horario))) {
            dto.id_horario = parseInt(h.id_horario);
          }
    
          return dto;
        });
    
        console.log("Datos a enviar:", JSON.stringify(datosParaEnviar, null, 2));
    
        await axios.post("http://localhost:3000/horarios/create-multiple", datosParaEnviar, {
          headers: { Authorization: `Bearer ${token}` }
        });
    
        alert("Horarios registrados exitosamente!");
    
        setHorariosAlta([{
          id_materia: "",
          hora_inicio: "",
          id_profesor: "",
          grupo: "",
          id_horario: "",
          lunes: "", martes: "", miercoles: "", jueves: "", viernes: "",
          profesoresDisponibles: []
        }]);
    
        if (typeof obtenerTodosHorarios === 'function') {
          obtenerTodosHorarios();
        }
    
      } catch (error) {
        console.error("Error al registrar horarios:", error);
        const mensaje = error.response?.data?.message || error.message;
        alert(`Error al registrar horarios:\n\n${mensaje}`);
      }
    };
    const [idHorarioBaja, setIdHorarioBaja] = useState("");
    const [mensajeError, setMensajeError] = useState(""); 
    const [mensajeExito, setMensajeExito] = useState("");

    
    const handleBajaHorario = async () => {
      const token = localStorage.getItem('token');  // Aquí obtienes el token del localStorage (ajústalo si usas otro método)
    
      if (!token) {
        setMensajeError("No se ha encontrado un token de autenticación.");
        return;
      }
    
      console.log("ID ingresado:", idHorarioBaja, "Tipo:", typeof idHorarioBaja);
      const idNumerico = Number(idHorarioBaja);
      console.log("ID convertido a número:", idNumerico);
      console.log("IDs disponibles en todosHorarios:", todosHorarios.map(h => h.id_horario));
    
      try {
        const horario = todosHorarios.find(h => h.id_horario === idNumerico);
        if (!horario) {
          setMensajeError("El ID del horario no existe.");
          return;
        }
    
        if (
          window.confirm(`¿Estás seguro de que deseas dar de baja el horario con ID ${idNumerico}?`) &&
          window.confirm("Esta acción no se puede deshacer. ¿Quieres continuar?")
        ) {
          const response = await axios.delete(`http://localhost:3000/horarios/${idNumerico}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
    
          console.log("Respuesta del backend:", response);
          
          // Mostrar mensaje de éxito en la pantalla y en consola
          setMensajeError("");  // Limpiar mensaje de error
          setIdHorarioBaja(""); // Limpiar campo de ID
          setMensajeExito(`El horario con ID ${idNumerico} ha sido eliminado con éxito.`);
          console.log(`El horario con ID ${idNumerico} ha sido eliminado con éxito.`);
    
          // Actualizar lista de horarios
          setTodosHorarios(todosHorarios.filter(h => h.id_horario !== idNumerico));
        }
      } catch (error) {
        console.error("Error detallado:", error); // Mostrar error completo
        if (error.response) {
          if (error.response.status === 404) {
            setMensajeError("El ID del horario no existe en la base de datos.");
          } else {
            setMensajeError(`Ocurrió un error al intentar eliminar el horario: ${error.response.data.message || error.message}`);
          }
        } else {
          setMensajeError("Ocurrió un error al intentar eliminar el horario.");
        }
      }
    };
    
  
  return (
    <div>
      <button onClick={handleLogout} style={{ marginBottom: "20px" }}>
        Cerrar sesión
      </button>

      {rolUsuario === "admin" ? (
        <VistaAdmin
          // Generales
          semestre={semestre}
          setSemestre={setSemestre}
          handleBuscar={handleBuscar}
          handleGenerar={handleGenerar}
          materias={materias}
          profesores={profesores}
          
          // Materias
          idAltaMateria={idAltaMateria}
          setIdAltaMateria={setIdAltaMateria}
          nombreAltaMateria={nombreAltaMateria}
          setNombreAltaMateria={setNombreAltaMateria}
          semestreAltaMateria={semestreAltaMateria}
          setSemestreAltaMateria={setSemestreAltaMateria}
          handleAltaMateria={handleAltaMateria}
          
          idBajaMateria={idBajaMateria}
          setIdBajaMateria={setIdBajaMateria}
          handleBajaMateria={handleBajaMateria}
          
          idModMateria={idModMateria}
          setIdModMateria={setIdModMateria}
          nombreModMateria={nombreModMateria}
          setNombreModMateria={setNombreModMateria}
          semestreModMateria={semestreModMateria}
          setSemestreModMateria={setSemestreModMateria}
          handleUpdateMateria={handleUpdateMateria}
          
          // Profesores
          idAltaProfesor={idAltaProfesor}
          setIdAltaProfesor={setIdAltaProfesor}
          nombreAltaProfesor={nombreAltaProfesor}
          setNombreAltaProfesor={setNombreAltaProfesor}
          handleAltaProfesor={handleAltaProfesor}
          
          idBajaProfesor={idBajaProfesor}
          setIdBajaProfesor={setIdBajaProfesor}
          handleBajaProfesor={handleBajaProfesor}
          
          nombreModProfesor={nombreModProfesor}
          idModProfesor={idModProfesor}
          setIdModProfesor={setIdModProfesor}
          setNombreModProfesor={setNombreModProfesor}
          handleUpdateProfesor={handleUpdateProfesor}
          
          // Horarios
          horariosAlta={horariosAlta}
          setHorariosAlta={setHorariosAlta}
          handleAgregarHorario={handleAgregarHorario}
          handleAltaHorario={handleAltaHorario}
          handleHorarioChange={handleHorarioChange}
          handleChangeSemestre={handleChangeSemestre}
          handleEliminarHorario={handleEliminarHorario}
          semestreSeleccionado={semestreSeleccionado}
          setSemestreSeleccionado={setSemestreSeleccionado}
          handleBajaHorario={handleBajaHorario}
          idHorarioBaja={idHorarioBaja}
          setIdHorarioBaja={setIdHorarioBaja}
          mensajeError={mensajeError}
          setMensajeError={setMensajeError}
          mensajeExito={mensajeExito}
          setMensajeExito={setMensajeExito}
        />
      ) : (
        <VistaViewer
          semestre={semestre}
          setSemestre={setSemestre}
          handleBuscar={handleBuscar}
          handleGenerar={handleGenerar}
        />
      )}
    </div>
  );
}