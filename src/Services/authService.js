const API_URL = import.meta.env.VITE_API_URL + "/api";

const getHeaders = () => ({
    "Content-Type": "application/json",
    "Authorization": `Bearer ${localStorage.getItem("access_token")}`
});

export const registrarUsuario = async (nuevoUsuario) => {
    try {
        const response = await fetch(`${API_URL}/auth/registro/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(nuevoUsuario),
        });

        if (!response.ok) throw new Error("Error al registrar usuario");
        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const logout = () => {
    localStorage.removeItem("usuario");
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
};