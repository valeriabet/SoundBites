const API_URL = import.meta.env.VITE_API_URL + "/api";

const getHeaders = () => ({
    "Content-Type": "application/json",
    "Authorization": `Bearer ${localStorage.getItem("access_token")}`
});

export const listarFavoritos = async () => {
    const res = await fetch(`${API_URL}/favorito/listar/`, {
        headers: getHeaders(),
    });
    return await res.json();
};

export const guardarFavorito = async (favorito) => {
    const res = await fetch(`${API_URL}/favorito/guardar/`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(favorito),
    });
    return await res.json();
};

export const eliminarFavorito = async (id) => {
    await fetch(`${API_URL}/favorito/eliminar/${id}/`, {
        method: "DELETE",
        headers: getHeaders(),
    });
};

export const buscarFavorito = async (id) => {
    const res = await fetch(`${API_URL}/favorito/buscar/${id}/`, {
        headers: getHeaders(),
    });
    return await res.json();
};