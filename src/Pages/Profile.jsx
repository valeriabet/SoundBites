import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { listarReservas, eliminarReserva } from "../Services/reservaService";
import { listarGeneros } from "../Services/generoService";


const normalizeId = (val) => {
    if (val && typeof val === "object") {
        return val.id_usuario ?? val.id_genero ?? val.id ?? null;
    }
    return Number(val);
};

const Profile = () => {
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState(null);
    const [reservas, setReservas] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [generos, setGeneros] = useState([]);

    useEffect(() => {
        const u = JSON.parse(localStorage.getItem("usuario") || "null");
        if (!u) { navigate("/login"); return; }
        setUsuario(u);

        (async () => {
            try {
                const [todasReservas, todosGeneros] = await Promise.all([
                    listarReservas(),
                    listarGeneros(),
                ]);

                const mine = todasReservas.filter(
                    (r) => normalizeId(r.id_usuario) === Number(u.id_usuario)
                );
                mine.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
                setReservas(mine);
                setGeneros(todosGeneros);
            } catch (error) {
                console.error("Error al cargar datos", error);
            } finally {
                setCargando(false);
            }
        })();
    }, [navigate]);

    if (!usuario) return null;

    return (
        <div className="p-8 max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Perfil de usuario</h1>

            <div className="bg-white rounded-xl shadow p-6 mb-6">
                <p className="text-lg"><strong>Nombre:</strong> {usuario.nombre || "—"}</p>
                <p className="text-lg"><strong>Correo:</strong> {usuario.correo || "—"}</p>
                <p className="text-lg"><strong>Rol:</strong> {usuario.rol || "usuario"}</p>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Mis reservas</h2>
                {cargando ? (
                    <p>Cargando reservas...</p>
                ) : reservas.length === 0 ? (
                    <p className="text-gray-500">No tienes reservas registradas.</p>
                ) : (
                    <ul className="space-y-4">
                        {reservas.map((r) => {

                            const idGenero = normalizeId(r.id_genero);
                            const genObj = generos.find(
                                (g) => Number(g.id_genero) === idGenero
                            );
                            return (
                                <li key={r.id_reserva} className="border rounded-lg p-4">
                                    <p><strong>Fecha:</strong> {r.fecha ? new Date(r.fecha).toLocaleString("es-CO") : "—"}</p>
                                    <p><strong>Nº personas:</strong> {r.numero_personas}</p>
                                    <p><strong>Género:</strong> {genObj?.nombre || r.genero?.nombre || "—"}</p>
                                    <p><strong>Estado:</strong> {r.estado}</p>
                                    {r.notas && <p><strong>Notas:</strong> {r.notas}</p>}
                                    <div className="mt-3">
                                        <button
                                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition"
                                            onClick={async () => {
                                                if (!confirm("¿Cancelar reserva?")) return;
                                                try {
                                                    await eliminarReserva(r.id_reserva);
                                                    setReservas((prev) =>
                                                        prev.filter((x) => x.id_reserva !== r.id_reserva)
                                                    );
                                                } catch (e) {
                                                    console.error(e);
                                                    alert("No se pudo cancelar la reserva.");
                                                }
                                            }}
                                        >
                                            Cancelar reserva
                                        </button>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Profile;
