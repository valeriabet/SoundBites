const API = "https://localhost:7117/api/genero";

// LISTAR
export const listarGeneros = async () => {
    const res = await fetch(API);

    if (!res.ok) {
        throw new Error("Error listando géneros");
    }

    return await res.json();
};

// CREAR
export const crearGenero = async (genero) => {
    const res = await fetch(API, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(genero),
    });

    if (!res.ok) {
        throw new Error("Error creando género");
    }

    const text = await res.text();
    return text ? JSON.parse(text) : {};
};

// EDITAR
export const editarGenero = async (id, genero) => {
    const res = await fetch(`${API}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(genero),
    });

    if (!res.ok) {
        throw new Error("Error editando género");
    }

    const text = await res.text();
    return text ? JSON.parse(text) : {};
};

// ELIMINAR
export const eliminarGenero = async (id) => {
    const res = await fetch(`${API}/${id}`, {
        method: "DELETE",
    });

    if (!res.ok) {
        throw new Error("Error eliminando género");
    }
};