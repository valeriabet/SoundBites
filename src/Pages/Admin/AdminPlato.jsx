import { useEffect, useState } from "react";
import { obtenerPlatos, eliminarPlato } from "../../Services/platoService";
import { useNavigate } from "react-router-dom";

const AdminPlato = () => {
    const [platos, setPlatos] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        let montado = true;
        (async () => {
            try {
                const data = await obtenerPlatos();
                if (montado) setPlatos(data);
            } catch (error) {
                console.error("Error al obtener platos:", error);
            }
        })();
        return () => { montado = false; };
    }, []);

    const handleEliminar = async (id) => {
        if (!confirm("¿Eliminar plato?")) return;
        await eliminarPlato(id);
        const data = await obtenerPlatos();
        setPlatos(data);
    };

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6">Administración de Platos</h1>
            <button onClick={() => navigate("/admin/crearplato")}
                className="bg-orange-500 text-white px-4 py-2 rounded-lg mb-6">
                Crear Plato
            </button>
            <div className="grid grid-cols-3 gap-4">
                {platos.map((plato) => (
                    <div key={plato.id_plato} className="bg-white p-4 rounded-xl shadow">
                        <img src={plato.imagen} alt={plato.nombre}
                            className="w-full h-40 object-cover rounded-lg mb-3" />
                        <h2 className="font-bold text-lg">{plato.nombre}</h2>
                        <p>{plato.descripcion}</p>
                        <div className="flex gap-2 mt-4">
                            <button onClick={() => navigate(`/admin/editarplato/${plato.id_plato}`)}
                                className="bg-blue-500 text-white px-3 py-1 rounded">Editar</button>
                            <button onClick={() => handleEliminar(plato.id_plato)}
                                className="bg-red-500 text-white px-3 py-1 rounded">Eliminar</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminPlato;