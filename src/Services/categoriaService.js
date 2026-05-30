const API_URL = import.meta.env.VITE_API_URL + "/api";

const getHeaders = () => ({
    "Content-Type": "application/json",
    "Authorization": `Bearer ${localStorage.getItem("access_token")}`
});

export const listarCategorias = async () => {
    const response = await fetch(`${API_URL}/categoria/listar/`);
    if (!response.ok) throw new Error("Error al listar categorías");
    return await response.json();
};

export const guardarCategoria = async (categoria) => {
    const response = await fetch(`${API_URL}/categoria/guardar/`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(categoria),
    });
    if (!response.ok) throw new Error("Error al guardar categoría");
    return await response.json();
};

export const actualizarCategoria = async (id, categoria) => {
    const response = await fetch(`${API_URL}/categoria/actualizar/${id}/`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify(categoria),
    });
    if (!response.ok) throw new Error("Error al actualizar categoría");
    return await response.json();
};

export const eliminarCategoria = async (id) => {
    const response = await fetch(`${API_URL}/categoria/eliminar/${id}/`, {
        method: "DELETE",
        headers: getHeaders(),
    });
    if (!response.ok) throw new Error("Error al eliminar categoría");
};

export const buscarCategoria = async (id) => {
    const response = await fetch(`${API_URL}/categoria/buscar/${id}/`);
    if (!response.ok) throw new Error("Error al buscar categoría");
    return await response.json();
};