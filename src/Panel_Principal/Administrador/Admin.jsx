import React, { useState } from 'react';
import "./admin.css";

export function VistaAdmin({
  semestre,
  setSemestre,
  handleBuscar,
  handleGenerar,
  // Materias
  idAltaMateria,
  setIdAltaMateria,
  nombreAltaMateria,
  setNombreAltaMateria,
  semestreAltaMateria,
  setSemestreAltaMateria,
  handleAltaMateria,
  idBajaMateria,
  setIdBajaMateria,
  materias,
  handleBajaMateria,
  idModMateria,
  setIdModMateria,
  nombreModMateria,
  setNombreModMateria,
  semestreModMateria,
  setSemestreModMateria,
  handleUpdateMateria,
  semestresDisponibles,
  // Profesores
  idAltaProfesor,
  setIdAltaProfesor,
  nombreAltaProfesor,
  setNombreAltaProfesor,
  handleAltaProfesor,
  idBajaProfesor,
  setIdBajaProfesor,
  profesores,
  handleBajaProfesor,
  nombreModProfesor,
  idModProfesor,
  setIdModProfesor,
  setNombreModProfesor,
  handleUpdateProfesor,
  // Horarios
  horariosAlta,
  setHorariosAlta,
  handleAgregarHorario,
  handleAltaHorario,
  handleHorarioChange,
  handleEliminarHorario,
  semestreSeleccionado,
  setSemestreSeleccionado, 
  handleBajaHorario,
  idHorarioBaja,
  setIdHorarioBaja,
  mensajeError,
  setMensajeError, 
  mensajeExito
}) {
  const [opcionesVisible, setOpcionesVisible] = useState({
    Profesores: false,
    Materias: false,
    Consultas: false,
    Horarios: false,
  });

  const toggleOpciones = (titulo) => {
    setOpcionesVisible(prev => ({
      ...prev,
      [titulo]: !prev[titulo]
    }));
  };

  return (
    <div className="admin-vertical-menu">
      <div className="vertical-card">
        {["Profesores", "Materias", "Consultas", "Horarios"].map((titulo) => (
          <div className="vertical-option" key={titulo}>
            <button 
              className="card-header" 
              onClick={() => toggleOpciones(titulo)}
            >
              {titulo}
            </button>

            {opcionesVisible[titulo] && (
              <div className="card-options">
                {titulo === "Consultas" && (
                  <>
                    <label>Selecciona el semestre:</label>
                    <select 
                      value={semestre} 
                      onChange={(e) => setSemestre(e.target.value)}
                    >
                      <option value="">-- Selecciona --</option>
                      {[...Array(8)].map((_, i) => (
                        <option key={i} value={i + 1}>{`${i + 1}° Semestre`}</option>
                      ))}
                    </select>
                    <button onClick={handleBuscar}>Buscar Horarios</button>
                    <button onClick={handleGenerar}>Generar</button>
                  </>
                )}

                {titulo === "Materias" && (
                  <>
                    <h3>Alta de Materia</h3>
                    <input
                      type="text"
                      value={idAltaMateria}
                      onChange={(e) => setIdAltaMateria(e.target.value)}
                      placeholder="ID de la materia"
                    />
                    <input
                      type="text"
                      value={nombreAltaMateria}
                      onChange={(e) => setNombreAltaMateria(e.target.value)}
                      placeholder="Nombre de la materia"
                    />
                   <select
                      value={semestreAltaMateria}
                      onChange={(e) => setSemestreAltaMateria(e.target.value)}
                      placeholder="Selecciona un semestre"
                    >
                      <option value="" disabled>Selecciona un semestre</option>
                      {semestresDisponibles.map((semestre) => (
                        <option key={semestre} value={semestre}>
                          {semestre}
                        </option>
                      ))}
                    </select>

                    <button onClick={handleAltaMateria}>Registrar</button>

                    <h3>Baja de Materia</h3>
                    <select
                      value={idBajaMateria}
                      onChange={(e) => setIdBajaMateria(e.target.value)}
                    >
                      <option value="">Selecciona una materia</option>
                      {materias.map((materia) => (
                        <option key={materia.id_materia} value={materia.id_materia}>
                          {materia.nombre}
                        </option>
                      ))}
                    </select>
                    <button onClick={handleBajaMateria}>Eliminar</button>

                    <h3>Modificar Materia</h3>
                    <select
                      value={idModMateria}
                      onChange={(e) => setIdModMateria(e.target.value)}
                    >
                      <option value="">Selecciona una materia</option>
                      {materias.map((materia) => (
                        <option key={materia.id_materia} value={materia.id_materia}>
                          {materia.nombre}
                        </option>
                      ))}
                    </select>
                    <input
                      type="text"
                      value={nombreModMateria}
                      onChange={(e) => setNombreModMateria(e.target.value)}
                      placeholder="Nuevo nombre de la materia"
                    />
                    <select
                      value={semestreModMateria}
                      onChange={(e) => setSemestreModMateria(e.target.value)}
                    >
                      <option value="" disabled>Selecciona el nuevo semestre</option>
                      {semestresDisponibles.map((semestre) => (
                        <option key={semestre} value={semestre}>
                          {semestre}
                        </option>
                      ))}
                    </select>
                    <button onClick={handleUpdateMateria}>Actualizar</button>
                  </>
                )}

                {titulo === "Profesores" && (
                  <>
                    <h3>Alta de Profesor</h3>
                    <input
                      type="text"
                      value={idAltaProfesor}
                      onChange={(e) => setIdAltaProfesor(e.target.value)}
                      placeholder="ID del profesor"
                    />
                    <input
                      type="text"
                      value={nombreAltaProfesor}
                      onChange={(e) => setNombreAltaProfesor(e.target.value)}
                      placeholder="Nombre del profesor"
                    />
                    <button onClick={handleAltaProfesor}>Registrar</button>

                    <h3>Baja de Profesor</h3>
                    <select
                      value={idBajaProfesor}
                      onChange={(e) => setIdBajaProfesor(e.target.value)}
                    >
                      <option value="">Selecciona un profesor</option>
                      {profesores.map((profesor) => (
                        <option key={profesor.id_profesor} value={profesor.id_profesor}>
                          {profesor.nombre}
                        </option>
                      ))}
                    </select>
                    <button onClick={handleBajaProfesor}>Eliminar</button>

                    <h3>Modificar Profesor</h3>
                    <select
                      value={idModProfesor}
                      onChange={(e) => setIdModProfesor(e.target.value)}
                    >
                      <option value="">Selecciona un profesor</option>
                      {profesores.map((profesor) => (
                        <option key={profesor.id_profesor} value={profesor.id_profesor}>
                          {profesor.nombre}
                        </option>
                      ))}
                    </select>
                    <input
                      type="text"
                      value={nombreModProfesor}
                      onChange={(e) => setNombreModProfesor(e.target.value)}
                      placeholder="Nuevo nombre del profesor"
                    />
                    <button onClick={handleUpdateProfesor}>Actualizar</button>
                  </>
                )}
                          {titulo === "Horarios" && (
                  <>
                    <h3 className="titulo-seccion">Alta de Horarios</h3>

                    {/* Selección de semestre */}
                    <div className="form-group">
                      <label className="form-label">Selecciona un semestre:</label>
                      <select
                        value={semestreSeleccionado}
                        onChange={(e) => {
                          setSemestreSeleccionado(e.target.value);
                          setHorariosAlta([{
                            id_horario: "",
                            id_materia: "",
                            id_profesor: "",
                            grupo: "",
                            lunes: "", martes: "", miercoles: "", jueves: "", viernes: "",
                            profesoresDisponibles: []
                          }]);
                        }}
                        className="form-select"
                      >
                        <option value="">-- Selecciona semestre --</option>
                        {[2, 4, 6, 8].map((sem) => (
                          <option key={`sem-${sem}`} value={sem}>
                            Semestre {sem} ({materias.filter(m => m.semestre === sem).length} materias disponibles)
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Bloques de horarios para alta */}
                    {horariosAlta.map((horario, index) => (
                      <div key={`horario-${index}`} className="horario-block">
                        {/* ID Horario (opcional) */}
                        <div className="form-group">
                          <label className="form-label">ID Horario (opcional):</label>
                          <input
                            type="text"
                            value={horario.id_horario || ''}
                            onChange={(e) => handleHorarioChange(index, 'id_horario', e.target.value)}
                            className="form-input"
                            placeholder="Ej. H001"
                          />
                        </div>

                        {/* Materia */}
                        <div className="form-group">
                          <label className="form-label">Materia:</label>
                          <select
                            value={horario.id_materia || ''}
                            onChange={(e) => handleHorarioChange(index, 'id_materia', e.target.value)}
                            className="form-select"
                          >
                            <option value="">-- Selecciona materia --</option>
                            {materias.filter(m => m.semestre === parseInt(semestreSeleccionado)).map(materia => (
                              <option key={materia.id_materia} value={materia.id_materia}>
                                {materia.nombre}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Profesor */}
                        <div className="form-group">
                          <label className="form-label">Profesor:</label>
                          <select
                            value={horario.id_profesor || ''}
                            onChange={(e) => handleHorarioChange(index, 'id_profesor', e.target.value)}
                            disabled={!horario.id_materia}
                            className="form-select"
                          >
                            <option value="">-- Selecciona profesor --</option>
                            {(Array.isArray(horario.profesoresDisponibles) ? horario.profesoresDisponibles : [])
                              .filter((profesor, idx, self) =>
                                idx === self.findIndex(p => p.id_profesor === profesor.id_profesor)
                              )
                              .map(profesor => (
                                <option key={profesor.id_profesor} value={profesor.id_profesor}>
                                  {profesor.nombre}
                                </option>
                              ))}
                          </select>
                        </div>

                        {/* Grupo */}
                        <div className="form-group">
                          <label className="form-label">Grupo:</label>
                          <input
                            type="text"
                            value={horario.grupo || ''}
                            onChange={(e) => handleHorarioChange(index, 'grupo', e.target.value)}
                            className="form-input"
                          />
                        </div>

                        {/* Días con horarios completos */}
                        {['lunes', 'martes', 'miercoles', 'jueves', 'viernes'].map(dia => (
                          <div key={dia} className="form-group">
                            <label className="form-label">{dia.charAt(0).toUpperCase() + dia.slice(1)}:</label>
                            <select
                              value={horario[dia] || ''}
                              onChange={(e) => handleHorarioChange(index, dia, e.target.value)}
                              className="form-select"
                            >
                              <option value="">-- No asignado --</option>
                              {[7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map(horaInicio => {
                                const horaFin = horaInicio + 2;
                                // Solo mostrar horas que no excedan las 22:00
                                if (horaFin <= 22) {
                                  return (
                                    <option 
                                      key={`${dia}-${horaInicio}`} 
                                      value={horaInicio}
                                    >
                                      {horaInicio}:00 - {horaFin}:00
                                    </option>
                                  );
                                }
                                return null;
                              }).filter(Boolean)}
                            </select>
                          </div>
                        ))}

                        {/* Botón eliminar - Confirmación doble */}
                        <button
                          onClick={() => handleEliminarHorario(index)}
                          disabled={horariosAlta.length <= 1}
                          className="btn btn-danger"
                        >
                          <i className="fas fa-trash"></i> Eliminar
                        </button>
                      </div>
                    ))}

                    {/* Botones de acción */}
                    <div className="form-actions">
                      <button
                        onClick={handleAgregarHorario}
                        disabled={horariosAlta.length >= 7 || !semestreSeleccionado}
                        className="btn btn-primary"
                      >
                        Agregar bloque
                      </button>

                      <button
                        onClick={handleAltaHorario}
                        disabled={!semestreSeleccionado}
                        className="btn btn-success"
                      >
                        Guardar horarios
                      </button>
                    </div>

                    <h3 className="titulo-seccion">Baja de Horarios</h3>

                    

                    {/* Campo de entrada para ID del horario */}
                    <div className="form-group">
                      <label className="form-label">Ingresa el ID del horario a dar de baja:</label>
                      <input
                        type="text"
                        value={idHorarioBaja}
                        onChange={(e) => {
                          setIdHorarioBaja(e.target.value);
                          setMensajeError("");  // Limpiar el mensaje de error cada vez que se ingresa un nuevo valor
                        }}
                        className="form-input"
                        placeholder="Ej. H001"
                      />
                    </div>

                    {/* Mostrar mensaje de error si el ID no existe */}
                    {mensajeError && <div className="error-message">{mensajeError}</div>}
                    {mensajeExito && <div className="alert alert-success">{mensajeExito}</div>}

                    {/* Botón de baja */}
                    <div className="form-actions">
                      <button
                        onClick={handleBajaHorario}
                        disabled={!idHorarioBaja}  // Deshabilitar si no se ingresó un ID
                        className="btn btn-danger"
                      >
                        Dar de baja horario
                      </button>
                    </div>

                  </>
                )}

              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}