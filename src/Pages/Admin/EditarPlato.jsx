import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { obtenerPlatoPorId, actualizarPlato } from "../../Services/platoService";

const EditarPlato = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [plato, setPlato] = useState({ nombre: "", descripcion: "", imagen: "" });
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const cargarPlato = async () => {
            try {
                const platoEncontrado = await obtenerPlatoPorId(id);
                if (platoEncontrado) {
                    setPlato(platoEncontrado);
                } else {
                    alert("Plato no encontrado");
                    navigate("/admin/platos");
                }
            } catch (error) {
                console.error(error);
                alert("Error al cargar datos del plato");
                navigate("/admin/platos");
            } finally {
                setCargando(false);
            }
        };
        cargarPlato();
    }, [id, navigate]);

    const handleChange = (e) => setPlato({ ...plato, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await actualizarPlato(id, plato);
            alert("¡Plato actualizado con éxito!");
            navigate("/admin/platos");
        } catch (error) {
            console.error(error);
            alert("Hubo un error al guardar los cambios.");
        }
    };

    if (cargando) return <div className="p-8 text-center text-xl">Cargando datos del plato...</div>;

    return (
        <div className="p-8 max-w-lg mx-auto bg-white rounded-xl shadow mt-10">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Editar Plato</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                    <label className="block mb-1 font-semibold text-gray-700">Nombre del Plato</label>
                    <input type="text" name="nombre" value={plato.nombre} onChange={handleChange}
                        className="w-full border border-gray-300 p-2 rounded-lg focus:outline-orange-500" required />
                </div>
                <div>
                    <label className="block mb-1 font-semibold text-gray-700">Descripción</label>
                    <textarea name="descripcion" value={plato.descripcion} onChange={handleChange}
                        rows="4" className="w-full border border-gray-300 p-2 rounded-lg focus:outline-orange-500" required />
                </div>
                <div>
                    <label className="block mb-1 font-semibold text-gray-700">URL de la Imagen</label>
                    <input type="text" name="imagen" value={plato.imagen} onChange={handleChange}
                        className="w-full border border-gray-300 p-2 rounded-lg focus:outline-orange-500" />
                </div>
                {plato.imagen && (
                    <div className="mt-2">
                        <span className="block text-sm text-gray-500 mb-1">Vista previa:</span>
                        <img src={plato.imagen} alt="Vista previa" className="w-full h-40 object-cover rounded-lg border" />
                    </div>
                )}
                <div className="flex gap-4 mt-6">
                    <button type="submit"
                        className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                        Guardar Cambios
                    </button>
                    <button type="button" onClick={() => navigate("/admin/platos")}
                        className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditarPlato;