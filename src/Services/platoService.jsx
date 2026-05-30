const API_URL = import.meta.env.VITE_API_URL + "/api";

const getHeaders = () => ({
    "Content-Type": "application/json",
    "Authorization": `Bearer ${localStorage.getItem("access_token")}`
});

export const obtenerPlatos = async () => {
    const res = await fetch(`${API_URL}/plato/listar/`);
    return await res.json();
};

export const obtenerPlatoPorId = async (id) => {
    const res = await fetch(`${API_URL}/plato/buscar/${id}/`);
    if (!res.ok) throw new Error("No se pudo obtener el plato");
    return await res.json();
};

export const crearPlato = async (plato) => {
    const res = await fetch(`${API_URL}/plato/guardar/`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(plato),
    });
    return await res.json();
};

export const actualizarPlato = async (id, plato) => {
    const res = await fetch(`${API_URL}/plato/actualizar/${id}/`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify(plato),
    });
    if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Error al actualizar el plato");
    }
    return await res.json();
};

export const eliminarPlato = async (id) => {
    await fetch(`${API_URL}/plato/eliminar/${id}/`, {
        method: "DELETE",
        headers: getHeaders(),
    });
};