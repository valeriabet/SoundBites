import { useEffect, useState } from "react";
import { listarFavoritos, eliminarFavorito } from "../Services/favoritoService";
import { obtenerPlatos } from "../Services/platoService";

const MisFavoritos = () => {
    const [favoritos, setFavoritos] = useState([]);
    const [platos, setPlatos] = useState([]);
    const usuario = JSON.parse(localStorage.getItem("usuario"));

    useEffect(() => {
        if (!usuario) return;
        let mounted = true;

        const cargarDatos = async () => {
            try {
                const [favoritosData, platosData] = await Promise.all([
                    listarFavoritos(),
                    obtenerPlatos(),
                ]);

                const favoritosUsuario = favoritosData.filter(
                    (f) => f.id_usuario === usuario.id_usuario
                );

                if (mounted) {
                    setFavoritos(favoritosUsuario);
                    setPlatos(platosData);
                }
            } catch (error) {
                console.error(error);
            }
        };

        cargarDatos();
        return () => { mounted = false; };
    }, []);

    const quitarFavorito = async (id_favorito) => {
        try {
            await eliminarFavorito(id_favorito);
            setFavoritos((prev) => prev.filter((f) => f.id_favorito !== id_favorito));
        } catch (error) {
            console.error(error);
        }
    };

    const platosFavoritos = favoritos.map((fav) => {
        const plato = platos.find((p) => p.id_plato === fav.id_plato);
        return { ...fav, plato };
    });

    if (!usuario) return <p>No hay usuario logueado</p>;

    return (
        <div className="min-h-screen bg-orange-50 p-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold mb-8">Mis Favoritos ❤️</h1>
                {platosFavoritos.length === 0 ? (
                    <div className="bg-white p-10 rounded-2xl text-center shadow">
                        <p className="text-gray-500">No tienes platos favoritos aún.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {platosFavoritos.map((item) => (
                            <div key={item.id_favorito} className="bg-white rounded-2xl shadow overflow-hidden">
                                <img src={item.plato?.imagen} alt={item.plato?.nombre} className="w-full h-52 object-cover" />
                                <div className="p-5">
                                    <h2 className="text-xl font-bold mb-2">{item.plato?.nombre}</h2>
                                    <p className="text-gray-500 text-sm mb-4">{item.plato?.descripcion}</p>
                                    <button onClick={() => quitarFavorito(item.id_favorito)}
                                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl">
                                        Quitar Favorito
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MisFavoritos;