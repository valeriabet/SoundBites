import { useEffect, useState } from "react";
import {
    listarGeneros,
    crearGenero,
    eliminarGenero,
    editarGenero,
} from "../../Services/generoService";

const AdminGenero = () => {

    const [generos, setGeneros] = useState([]);
    const [nombre, setNombre] = useState("");
    const [editandoId, setEditandoId] = useState(null);

    // Cargar géneros al montar
    useEffect(() => {
        let mounted = true;

        const fetchGeneros = async () => {
            try {
                const data = await listarGeneros();
                if (mounted) setGeneros(data.sort((a,b)=> (b.votos||0) - (a.votos||0)));
            } catch (err) {
                console.error(err);
            }
        };

        fetchGeneros();

        return () => {
            mounted = false;
        };
    }, []);

    const guardar = async () => {
        if (!nombre.trim()) return;

        try {
            if (editandoId !== null) {
                await editarGenero(editandoId, { nombre });
            } else {
                await crearGenero({ nombre });
            }

            setNombre("");
            setEditandoId(null);

            // Actualizar la lista tras crear/editar
            const data = await listarGeneros();
            setGeneros(data);
        } catch (err) {
            console.error(err);
        }
    };

    const eliminar = async (id) => {
        try {
            await eliminarGenero(id);
            // Usar actualización funcional para evitar estados stale
            setGeneros((prev) => prev.filter((g) => g.idGenero !== id));
        } catch (err) {
            console.error(err);
        }
    };

    const editar = (g) => {
        setNombre(g.nombre);
        setEditandoId(g.idGenero);
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8">

            <div className="max-w-3xl mx-auto">

                <h1 className="text-3xl font-bold mb-6">
                     Panel Admin - Géneros
                </h1>

                {/* FORM */}
                <div className="bg-white p-4 rounded-xl shadow flex gap-2 mb-6">

                    <input
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        placeholder="Nombre del género"
                        className="border p-2 rounded w-full"
                    />

                    <button
                        onClick={guardar}
                        className={`px-4 py-2 rounded text-white ${editandoId ? "bg-blue-500" : "bg-green-500"
                            }`}
                    >
                        {editandoId ? "Actualizar" : "Crear"}
                    </button>
                </div>

                {/* LISTA */}
                <div className="space-y-3">

                    {generos.map((g) => (
                        <div
                            key={g.idGenero}
                            className="bg-white p-4 rounded-xl shadow flex justify-between items-center"
                        >

                    <div>
                        <div className="font-medium text-lg">{g.nombre}</div>
                        <div className="text-sm text-gray-500">Votos: <span className="font-semibold">{g.votos ?? 0}</span></div>
                    </div>

                            <div className="flex gap-2">

                                <button
                                    onClick={() => editar(g)}
                                    className="bg-yellow-400 px-3 py-1 rounded"
                                >
                                    Editar
                                </button>

                                <button
                                    onClick={() => eliminar(g.idGenero)}
                                    className="bg-red-500 text-white px-3 py-1 rounded"
                                >
                                    Eliminar
                                </button>

                            </div>
                        </div>
                    ))}

                </div>

            </div>
        </div>
    );
};

export default AdminGenero;