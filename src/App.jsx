import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Reserva from "./Pages/Reserva";
import Home from "./Pages/Home";

import MainLayout from "./Componentes/Layout/MainLayout";

import AdminPlato from "./Pages/Admin/AdminPlato";
import CrearPlato from "./Pages/Admin/CrearPlato";
import EditarPlato from "./Pages/Admin/EditarPlato";
import Profile from "./Pages/Profile";
import AdminGenero from "./Pages/Admin/AdminGenero";
import AdminCategoria from "./Pages/Admin/AdminCategoria";
import PrivateRouteAdmin from "./Routes/PrivateRouteAdmin";
import MisFavoritos from "./Pages/misFavoritos";
import Recomendaciones from "./Pages/recomendaciones";

function PrivateRoute({ children }) {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    return usuario ? children : <Navigate to="/login" />;
}

function App() {
    return (
        <BrowserRouter>
            <Routes>

                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route path="/" element={<MainLayout />}>

                    <Route index element={<Home />} />

                    <Route path="reserva" element={<Reserva />} />

                    <Route path="admin/platos" element={<AdminPlato />} />
                    <Route path="admin/crearplato" element={<CrearPlato />} />
                    <Route path="admin/editarplato/:id" element={<EditarPlato />} />

                    <Route path="perfil" element={<Profile />} />

                    {/* 🔐 PROTEGIDO */}
                    <Route
                        path="favoritos"
                        element={
                            <PrivateRoute>
                                <MisFavoritos />
                            </PrivateRoute>
                        }

                    />

                    <Route
                        path="recomendaciones"
                        element={
                            <PrivateRoute>
                                <Recomendaciones />
                            </PrivateRoute>
                        }
                    />

                    <Route
                        path="admin/generos"
                        element={
                            <PrivateRouteAdmin>
                                <AdminGenero />
                            </PrivateRouteAdmin>
                        }
                    />
                    <Route
                        path="admin/categorias"
                        element={
                            <PrivateRouteAdmin>
                                <AdminCategoria />
                            </PrivateRouteAdmin>
                        }
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;