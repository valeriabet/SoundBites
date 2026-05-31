import { useEffect, useState } from "react";
import { obtenerRecomendaciones } from "../Services/recomendacionesService";
import { MdAutoAwesome } from "react-icons/md";

const Recomendaciones = () => {
    const [recomendaciones, setRecomendaciones] = useState([]);
    const [mensaje, setMensaje]                 = useState(null);
    const [loading, setLoading]                 = useState(true);
    const [error, setError]                     = useState(null);

    const usuario = JSON.parse(localStorage.getItem("usuario"));

    useEffect(() => {
        if (!usuario) return;

        const fetchRecomendaciones = async () => {
            try {
                setLoading(true);
                const data = await obtenerRecomendaciones(usuario.id_usuario);
                setRecomendaciones(data.recomendaciones || []);
                setMensaje(data.mensaje || null);
                setError(null);
            } catch (err) {
                console.error("Error cargando recomendaciones:", err);
                setError("No se pudieron cargar las recomendaciones. Verifica que el servicio IA esté activo.");
            } finally {
                setLoading(false);
            }
        };

        fetchRecomendaciones();

    }, []);

    if (!usuario) {
        return <p className="p-8 text-gray-500">No hay usuario logueado.</p>;
    }

    return (
        <div className="min-h-screen bg-orange-50 p-8">
            <div className="max-w-6xl mx-auto">

                {/* Encabezado */}
                <div className="flex items-center gap-3 mb-2">
                    <MdAutoAwesome className="text-orange-400" size={32} />
                    <h1 className="text-4xl font-bold">Recomendaciones para ti</h1>
                </div>
                <p className="text-gray-500 mb-8">
                    Sugerencias basadas en los gustos de usuarios con preferencias similares a las tuyas.
                </p>

                {/* Loading skeleton */}
                {loading && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="bg-white rounded-2xl shadow overflow-hidden animate-pulse">
                                <div className="w-full h-52 bg-gray-200" />
                                <div className="p-5 space-y-3">
                                    <div className="h-5 bg-gray-200 rounded w-2/3" />
                                    <div className="h-4 bg-gray-100 rounded w-full" />
                                    <div className="h-4 bg-gray-100 rounded w-1/2" />
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Error */}
                {!loading && error && (
                    <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
                        <p className="text-red-500 font-medium">{error}</p>
                    </div>
                )}

                {/* Sin recomendaciones */}
                {!loading && !error && recomendaciones.length === 0 && (
                    <div className="bg-white p-10 rounded-2xl text-center shadow">
                        <MdAutoAwesome className="text-orange-300 mx-auto mb-4" size={48} />
                        <p className="text-gray-500 text-lg">
                            {mensaje || "No hay recomendaciones disponibles por ahora."}
                        </p>
                        <p className="text-gray-400 text-sm mt-2">
                            Agrega más platos a tus favoritos para mejorar las sugerencias.
                        </p>
                    </div>
                )}

                {/* Grid de recomendaciones */}
                {!loading && !error && recomendaciones.length > 0 && (
                    <>
                        {mensaje && (
                            <p className="text-sm text-orange-500 mb-4 font-medium">{mensaje}</p>
                        )}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {recomendaciones.map((plato) => (
                                <div
                                    key={plato.id_plato}
                                    className="bg-white rounded-2xl shadow overflow-hidden hover:shadow-lg transition-shadow duration-200"
                                >
                                    {plato.imagen ? (
                                        <img
                                            src={plato.imagen}
                                            alt={plato.nombre}
                                            className="w-full h-52 object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-52 bg-orange-100 flex items-center justify-center">
                                            <MdAutoAwesome className="text-orange-300" size={48} />
                                        </div>
                                    )}
                                    <div className="p-5">
                                        <h2 className="text-xl font-bold mb-1">{plato.nombre}</h2>
                                        <p className="text-gray-500 text-sm mb-3 line-clamp-2">
                                            {plato.descripcion || "Sin descripción"}
                                        </p>
                                        <span className="inline-block bg-orange-400 text-white text-sm font-bold px-3 py-1 rounded-xl">
                                            ${Number(plato.precio).toLocaleString("es-CO")}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Recomendaciones;
