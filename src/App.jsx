import { Routes, Route } from "react-router-dom";
import {Firstpage} from "./Registro_Usuario/Firstpage"
import { Horarios } from "./Panel_Principal/horariosweb";
import { HorarioSemestre } from "./Horarios/VistaGeneral/HorariosSemestre";
import { FormularioHorario } from "./Horarios/FormularioHorario/Formulario";
import { MuestraHorarios } from "./Horarios/FormularioHorario/Resultados/GeneradorHorarios";
import { PrivateRoute } from "./Rutas-privadas"; 

export function App() {
  return (
    <Routes>
      {/* Páginas públicas */}
      <Route path="/" element={<Firstpage />} />
      <Route path="/firstpage" element={<Firstpage />} />

      {/* Páginas protegidas */}
      <Route
        path="/horariosweb"
        element={
          <PrivateRoute>
            <Horarios />
          </PrivateRoute>
        }
      />
      <Route
        path="/HorariosSemestre"
        element={
          <PrivateRoute>
            <HorarioSemestre />
          </PrivateRoute>
        }
      />
      <Route
        path="/Formulario"
        element={
          <PrivateRoute>
            <FormularioHorario />
          </PrivateRoute>
        }
      />
      <Route
        path="/GeneradorHorarios"
        element={
          <PrivateRoute>
            <MuestraHorarios />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}
