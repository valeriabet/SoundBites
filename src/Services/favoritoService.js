const API = "https://localhost:7117/api/favorito";

// LISTAR FAVORITOS

export const listarFavoritos = async () => {
    const res = await fetch(
        `${API}/listarfavoritos`
    );

    return await res.json();
};

// GUARDAR FAVORITO

export const guardarFavorito = async (
    favorito
) => {

    const res = await fetch(
        `${API}/guardarfavorito`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify(favorito),
        }
    );

    return await res.json();
};

// ELIMINAR FAVORITO

export const eliminarFavorito = async (
    id
) => {

    await fetch(
        `${API}/eliminar/${id}`,
        {
            method: "DELETE",
        }
    );
};

// BUSCAR FAVORITO

export const buscarFavorito = async (
    id
) => {

    const res = await fetch(
        `${API}/buscar/${id}`
    );

    return await res.json();
};
