import { useEffect, useState } from "react";
import { listarCategorias, guardarCategoria, actualizarCategoria, eliminarCategoria } from "../../Services/categoriaService";

const AdminCategoria = () => {
    const [categorias, setCategorias] = useState([]);
    const [nombre, setNombre] = useState("");
    const [editandoId, setEditandoId] = useState(null);

    useEffect(() => {
        let mounted = true;
        const fetchCategorias = async () => {
            try {
                const data = await listarCategorias();
                if (mounted) setCategorias(data);
            } catch (err) { console.error(err); }
        };
        fetchCategorias();
        return () => { mounted = false; };
    }, []);

    const guardar = async () => {
        if (!nombre.trim()) return;
        try {
            if (editandoId !== null) {
                await actualizarCategoria(editandoId, { nombre });
            } else {
                await guardarCategoria({ nombre });
            }
            setNombre("");
            setEditandoId(null);
            const data = await listarCategorias();
            setCategorias(data);
        } catch (err) { console.error(err); }
    };

    const eliminar = async (id) => {
        try {
            await eliminarCategoria(id);
            setCategorias(prev => prev.filter(c => c.id_categoria !== id));
        } catch (err) { console.error(err); }
    };

    const editar = (c) => {
        setNombre(c.nombre);
        setEditandoId(c.id_categoria);
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl font-bold mb-6">Panel Admin - Categorías</h1>

                <div className="bg-white p-4 rounded-xl shadow flex gap-2 mb-6">
                    <input value={nombre} onChange={(e)=>setNombre(e.target.value)} placeholder="Nombre de la categoría" className="border p-2 rounded w-full" />
                    <button onClick={guardar} className={`px-4 py-2 rounded text-white ${editandoId ? "bg-blue-500" : "bg-green-500"}`}>
                        {editandoId ? "Actualizar" : "Crear"}
                    </button>
                </div>

                <div className="space-y-3">
                    {categorias.map(c => (
                        <div key={c.id_categoria} className="bg-white p-4 rounded-xl shadow flex justify-between items-center">
                            <div>
                                <div className="font-medium text-lg">{c.nombre}</div>
                            </div>
                            <div className="flex gap-2">
                                <button onClick={() => editar(c)} className="bg-yellow-400 px-3 py-1 rounded">Editar</button>
                                <button onClick={() => eliminar(c.id_categoria)} className="bg-red-500 text-white px-3 py-1 rounded">Eliminar</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminCategoria;
