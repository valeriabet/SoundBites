const API_URL = import.meta.env.VITE_API_URL + "/api";

const getHeaders = () => ({
    "Content-Type": "application/json",
    "Authorization": `Bearer ${localStorage.getItem("access_token")}`
});

export const crearReserva = async (reserva) => {
    const res = await fetch(`${API_URL}/reserva/guardar/`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(reserva),
    });
    if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Error al crear reserva");
    }
    return await res.json();
};

export const listarReservas = async () => {
    const res = await fetch(`${API_URL}/reserva/listar/`, {
        headers: getHeaders(),
    });
    return await res.json();
};

export const eliminarReserva = async (id) => {
    const res = await fetch(`${API_URL}/reserva/eliminar/${id}/`, {
        method: "DELETE",
        headers: getHeaders(),
    });
    if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Error al eliminar reserva");
    }
};