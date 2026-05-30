import { useEffect, useState } from "react";
import { listarGeneros, crearGenero, eliminarGenero, editarGenero } from "../../Services/generoService";

const AdminGenero = () => {
    const [generos, setGeneros] = useState([]);
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [editandoId, setEditandoId] = useState(null);

    useEffect(() => {
        let mounted = true;
        const fetchGeneros = async () => {
            try {
                const data = await listarGeneros();
                if (mounted) setGeneros(data.sort((a, b) => (b.votos || 0) - (a.votos || 0)));
            } catch (err) { console.error(err); }
        };
        fetchGeneros();
        return () => { mounted = false; };
    }, []);

    const guardar = async () => {
        if (!nombre.trim()) return;
        try {
            if (editandoId !== null) {
                await editarGenero(editandoId, { nombre, descripcion });
            } else {
                await crearGenero({ nombre, descripcion, votos: 0 });
            }
            setNombre("");
            setDescripcion("");
            setEditandoId(null);
            const data = await listarGeneros();
            setGeneros(data);
        } catch (err) { console.error(err); }
    };

    const eliminar = async (id) => {
        try {
            await eliminarGenero(id);
            setGeneros((prev) => prev.filter((g) => g.id !== id));
        } catch (err) { console.error(err); }
    };

    const editar = (g) => {
        setNombre(g.nombre);
        setDescripcion(g.descripcion);
        setEditandoId(g.id);
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl font-bold mb-6">Panel Admin - Géneros</h1>
                <div className="bg-white p-4 rounded-xl shadow flex flex-col gap-2 mb-6">
                    <input value={nombre} onChange={(e) => setNombre(e.target.value)}
                        placeholder="Nombre del género" className="border p-2 rounded w-full" />
                    <input value={descripcion} onChange={(e) => setDescripcion(e.target.value)}
                        placeholder="Descripción" className="border p-2 rounded w-full" />
                    <button onClick={guardar}
                        className={`px-4 py-2 rounded text-white ${editandoId ? "bg-blue-500" : "bg-green-500"}`}>
                        {editandoId ? "Actualizar" : "Crear"}
                    </button>
                </div>
                <div className="space-y-3">
                    {generos.map((g) => (
                        <div key={g.id} className="bg-white p-4 rounded-xl shadow flex justify-between items-center">
                            <div>
                                <div className="font-medium text-lg">{g.nombre}</div>
                                <div className="text-sm text-gray-500">Votos: <span className="font-semibold">{g.votos ?? 0}</span></div>
                            </div>
                            <div className="flex gap-2">
                                <button onClick={() => editar(g)} className="bg-yellow-400 px-3 py-1 rounded">Editar</button>
                                <button onClick={() => eliminar(g.id)} className="bg-red-500 text-white px-3 py-1 rounded">Eliminar</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminGenero;