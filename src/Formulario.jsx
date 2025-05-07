import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./FormularioGenerar.css";
import { useBackground } from "./Fondos";

export function FormularioHorario() {
  const navigate = useNavigate();

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
  } = useForm({
    defaultValues: {
      semestre: 1,
      materiasObligatorias: [],
      profesoresPreferidos: {},
      bloquesLibres: [],
      horaInicio: 7,
      horaFin: 22,
    },
  });
  useBackground('fondoForm')

  const [materias, setMaterias] = useState([]);
  const [profesoresPorMateria, setProfesoresPorMateria] = useState({});
  const [semestreInvalido, setSemestreInvalido] = useState(false);
  const semestreSeleccionado = watch("semestre");
  const materiasSeleccionadas = watch("materiasObligatorias") || [];

  // Rangos horarios ajustados según lo solicitado
  const horasEntrada = Array.from({ length: 14 }, (_, i) => i + 7); // 7 a 20
  const horasSalida = Array.from({ length: 14 }, (_, i) => i + 9);  // 9 a 22

  const {
    fields: bloquesLibresFields,
    append: appendBloqueLibre,
    remove: removeBloqueLibre,
  } = useFieldArray({
    control,
    name: "bloquesLibres",
  });

  const toggleMateriaSeleccionada = (id) => {
    const actuales = watch("materiasObligatorias") || [];
    if (actuales.includes(id)) {
      setValue(
        "materiasObligatorias",
        actuales.filter((m) => m !== id)
      );
    } else {
      if (actuales.length >= 6) {  // Limite a 6 materias
        alert("Solo puedes seleccionar hasta 6 materias.");
        return;
      }
      setValue("materiasObligatorias", [...actuales, id]);
    }
  };

  useEffect(() => {
    if (semestreSeleccionado % 2 !== 0) {
      setSemestreInvalido(true);
    } else {
      setSemestreInvalido(false);
    }

    if (semestreSeleccionado) {
      // No limpiamos las materias seleccionadas para permitir múltiples semestres
      setValue("profesoresPreferidos", {});

      axios
        .post("http://localhost:3000/materias/findBySemestre", {
          semestreMateria: parseInt(semestreSeleccionado),
        })
        .then((response) => {
          setMaterias(response.data);
          setProfesoresPorMateria({});
        })
        .catch((error) =>
          console.error("Error al obtener materias:", error)
        );
    }
  }, [semestreSeleccionado]);

  useEffect(() => {
    const obtenerProfesores = async () => {
      const nuevosProfesores = {};
      for (const idMateria of materiasSeleccionadas) {
        if (!profesoresPorMateria[idMateria]) {
          try {
            const res = await axios.get(
              `http://localhost:3000/horarios/materias-profesores/${idMateria}`
            );
            const entrada = Array.isArray(res.data) ? res.data[0] : res.data;
            nuevosProfesores[idMateria] = entrada?.profesores || [];
          } catch (err) {
            console.error(
              `Error al obtener profesores para materia ${idMateria}:`,
              err
            );
            nuevosProfesores[idMateria] = [];
          }
        }
      }
      setProfesoresPorMateria((prev) => ({ ...prev, ...nuevosProfesores }));
    };

    if (materiasSeleccionadas.length > 0) {
      obtenerProfesores();
    }
  }, [materiasSeleccionadas]);

  const onSubmit = (data, e) => {
    e.preventDefault();

    if (semestreInvalido) {
      alert("Este semestre no está disponible por el momento.");
      return;
    }

    // Validación de 6-7 materias
    if (data.materiasObligatorias.length < 6 || data.materiasObligatorias.length > 6) {  // Limite a 6 materias
      alert("Debes seleccionar exactamente 6 materias.");
      return;
    }

    const filtros = {
      semestre: Number(data.semestre),
      materiasObligatorias: data.materiasObligatorias.map(Number),
      profesoresPreferidos: Object.fromEntries(
        Object.entries(data.profesoresPreferidos).map(([key, value]) => [
          Number(key),
          value.map(Number),
        ])
      ),
      bloquesLibres: data.bloquesLibres.map((bloque) => ({
        dia: bloque.dia,
        inicio: Number(bloque.inicio),
        fin: Number(bloque.fin),
      })),
      horaInicio: data.horaInicio ? Number(data.horaInicio) : 7,
      horaFin: data.horaFin ? Number(data.horaFin) : 22,
    };

    navigate("/GeneradorHorarios", { state: { filtros } });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="tabla-formulario">
      <h2>Formulario de Horarios</h2>
      <button className="boton-volver" onClick={() => window.history.back()}>
        🔙 Volver
      </button>

      <div className="form-group">
        <label>Semestre:</label>
        <select 
          {...register("semestre", { required: true })}
          onChange={(e) => {
            setValue("semestre", parseInt(e.target.value));
          }}
        >
          <option value="">Seleccionar</option>
          {[...Array(8)].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
        {semestreInvalido && (
          <p className="error-message">Este semestre no está disponible.</p>
        )}
      </div>

      <div className="form-group">
        <label>Materias obligatorias (selecciona 6):</label>

        {!semestreInvalido && materias.length > 0 && (
          <div style={{ marginBottom: "10px" }}>
            <label>
              Seleccionar todas las materias
              <input
                type="checkbox"
                onChange={(e) => {
                  const allIds = materias.map((m) => m.id_materia);
                  if (e.target.checked) {
                    if (allIds.length > 6) {
                      alert("No puedes seleccionar más de 6 materias.");
                      return;
                    }
                    setValue("materiasObligatorias", allIds);
                  } else {
                    setValue("materiasObligatorias", []);
                  }
                }}
                checked={materias.length > 0 && materias.every(m => materiasSeleccionadas.includes(m.id_materia))}
              />
            </label>
          </div>
        )}

        {semestreInvalido ? (
          <p className="error-message">Selecciona un semestre válido para ver las materias</p>
        ) : (
          materias.map((materia) => (
            <div key={materia.id_materia} className="materia-item">
              <div><strong>{materia.nombre}</strong></div>
              <div>
                <input
                  type="checkbox"
                  checked={materiasSeleccionadas.includes(materia.id_materia)}
                  onChange={() => toggleMateriaSeleccionada(materia.id_materia)}
                /> Seleccionar esta materia
              </div>
            </div>
          ))
        )}
        {materias.length === 0 && !semestreInvalido && (
          <p>No hay materias disponibles para este semestre</p>
        )}
        <p>Materias seleccionadas: {materiasSeleccionadas.length}/6</p>
      </div>

      {materiasSeleccionadas.map((id) => {
        const materia = materias.find((m) => m.id_materia === parseInt(id));
        const profesores = profesoresPorMateria[id] || [];

        return (
          <div key={id} className="form-group">
            <label>Profesores preferidos para {materia?.nombre}:</label>
            <select 
              multiple 
              {...register(`profesoresPreferidos.${id}`)}
              className="profesor-select"
            >
              {profesores.length > 0 ? (
                profesores.map((prof) => (
                  <option key={prof.id} value={prof.id}>
                    {prof.nombre}
                  </option>
                ))
              ) : (
                <option disabled>No hay profesores disponibles</option>
              )}
            </select>
            <small>Mantén presionado Ctrl para seleccionar múltiples profesores</small>
          </div>
        );
      })}

      <div className="form-group">
        <label>Bloques libres:</label>
        {bloquesLibresFields.map((field, index) => (
          <div key={field.id} className="fila-bloque">
            <select 
              {...register(`bloquesLibres.${index}.dia`, { required: true })}
              className="dia-select"
            >
              <option value="" disabled>Selecciona un día</option>
              <option value="Lunes">Lunes</option>
              <option value="Martes">Martes</option>
              <option value="Miércoles">Miércoles</option>
              <option value="Jueves">Jueves</option>
              <option value="Viernes">Viernes</option>
            </select>
            <select
              {...register(`bloquesLibres.${index}.inicio`, { required: true })}
              className="hora-select"
            >
              {horasEntrada.map((hora) => (
                <option key={`inicio-${hora}`} value={hora}>
                  {hora}:00
                </option>
              ))}
            </select>
            <span>a</span>
            <select
              {...register(`bloquesLibres.${index}.fin`, { required: true })}
              className="hora-select"
            >
              {horasSalida.map((hora) => (
                <option key={`fin-${hora}`} value={hora}>
                  {hora}:00
                </option>
              ))}
            </select>
            <button
              type="button"
              className="btn-eliminar"
              onClick={() => removeBloqueLibre(index)}
            >
              ❌ Eliminar
            </button>
          </div>
        ))}
        <button
          type="button"
          className="btn-anadir"
          onClick={() => appendBloqueLibre({ dia: "", inicio: 7, fin: 9 })}
        >
          ➕ Añadir bloque libre
        </button>
      </div>

      <div className="form-group">
        <label>Hora inicio (global):</label>
        <select
          {...register("horaInicio", { required: true })}
          className="hora-select"
        >
          {horasEntrada.map((hora) => (
            <option key={`global-inicio-${hora}`} value={hora}>
              {hora}:00
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Hora fin (global):</label>
        <select
          {...register("horaFin", { required: true })}
          className="hora-select"
        >
          {horasSalida.map((hora) => (
            <option key={`global-fin-${hora}`} value={hora}>
              {hora}:00
            </option>
          ))}
        </select>
      </div>

      <button type="submit" className="btn-primary">Generar Horario</button>
    </form>
  );
}
