import { useEffect, useState } from "react";
import { crearPlato } from "../../Services/platoService";
import { listarCategorias } from "../../Services/categoriaService";

const CrearPlato = () => {
    const [categorias, setCategorias] = useState([]);
    const [form, setForm] = useState({
        nombre: "", descripcion: "", precio: "", id_categoria: "", imagen: "",
    });

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    useEffect(() => {
        const cargarCategorias = async () => {
            try {
                const data = await listarCategorias();
                setCategorias(data);
            } catch (error) { console.error(error); }
        };
        cargarCategorias();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await crearPlato({ ...form, precio: Number(form.precio), id_categoria: Number(form.id_categoria) });
            alert("Plato creado");
            setForm({ nombre: "", descripcion: "", precio: "", id_categoria: "", imagen: "" });
        } catch (error) { console.error(error); alert("Error al crear plato"); }
    };

    return (
        <div className="min-h-screen bg-orange-50 p-8">
            <div className="max-w-xl mx-auto bg-white rounded-2xl shadow p-6">
                <h1 className="text-3xl font-bold mb-6">Crear Plato</h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input type="text" name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} className="border p-3 rounded-xl" required />
                    <textarea name="descripcion" placeholder="Descripción" value={form.descripcion} onChange={handleChange} className="border p-3 rounded-xl" />
                    <input type="number" name="precio" placeholder="Precio" value={form.precio} onChange={handleChange} className="border p-3 rounded-xl" required />
                    <select name="id_categoria" value={form.id_categoria} onChange={handleChange} className="border p-3 rounded-xl" required>
                        <option value="">Selecciona categoría</option>
                        {categorias.map((cat) => (
                            <option key={cat.id_categoria} value={cat.id_categoria}>{cat.nombre}</option>
                        ))}
                    </select>
                    <input type="text" name="imagen" placeholder="URL imagen" value={form.imagen} onChange={handleChange} className="border p-3 rounded-xl" />
                    <button type="submit" className="bg-orange-500 text-white py-3 rounded-xl font-bold">Guardar Plato</button>
                </form>
            </div>
        </div>
    );
};

export default CrearPlato;