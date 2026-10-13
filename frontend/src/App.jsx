import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import ListaPacientes from './components/ListaPacientes';
import CrearPaciente from './components/CrearPaciente';
import EditarPaciente from './components/EditarPaciente';
import ListaCitas from './components/ListaCitas';
import EditarCita from './components/EditarCita';
import CrearCita from './components/CrearCita';
import './App.css';

function App() {
    return (
        <BrowserRouter>
            <div className="app">
                <nav className="app__nav">
                    <Link className="app__link" to="/pacientes">
                        Pacientes
                    </Link>

                    <Link className="app__link" to="/pacientes/nuevo">
                        Crear paciente
                    </Link>

                    <Link className="app__link" to="/citas">
                        Citas
                    </Link>

                    <div className="app__logo">
                        Dental Time
                    </div>
                </nav>


                <Routes>
                    <Route path="/" element={<Navigate to="/pacientes" replace />} />
                    <Route path="/pacientes" element={<ListaPacientes />} />
                    <Route path="/pacientes/nuevo" element={<CrearPaciente />} />
                    <Route path="/pacientes/editar/:dni" element={<EditarPaciente />} />
                    <Route path="/citas" element={<ListaCitas />} />
                    <Route path="/citas/editar/:id" element={<EditarCita />} />
                    <Route path="/citas/crear" element={<CrearCita />} />
                </Routes>

            </div>
        </BrowserRouter>
    );
}

export default App;
