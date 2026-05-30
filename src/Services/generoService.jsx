const API_URL = import.meta.env.VITE_API_URL + "/api";

const getHeaders = () => ({
    "Content-Type": "application/json",
    "Authorization": `Bearer ${localStorage.getItem("access_token")}`
});

export const listarGeneros = async () => {
    const res = await fetch(`${API_URL}/genero/listar/`);
    if (!res.ok) throw new Error("Error listando géneros");
    return await res.json();
};

export const crearGenero = async (genero) => {
    const res = await fetch(`${API_URL}/genero/guardar/`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(genero),
    });
    if (!res.ok) throw new Error("Error creando género");
    const text = await res.text();
    return text ? JSON.parse(text) : {};
};

export const editarGenero = async (id, genero) => {
    const res = await fetch(`${API_URL}/genero/actualizar/${id}/`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify(genero),
    });
    if (!res.ok) throw new Error("Error editando género");
    const text = await res.text();
    return text ? JSON.parse(text) : {};
};

export const eliminarGenero = async (id) => {
    const res = await fetch(`${API_URL}/genero/eliminar/${id}/`, {
        method: "DELETE",
        headers: getHeaders(),
    });
    if (!res.ok) throw new Error("Error eliminando género");
};