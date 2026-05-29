import { useState } from "react";
import { guardarFavorito, listarFavoritos } from "../Services/favoritoService";

const FavoritoButton = ({ idPlato }) => {

    const usuario = JSON.parse(localStorage.getItem("usuario"));
    const [loading, setLoading] = useState(false);

    const agregar = async () => {

        if (!usuario) {
            alert("Debes iniciar sesión");
            return;
        }

        setLoading(true);

        try {
            const favoritos = await listarFavoritos();

            const existe = favoritos.find(
                f => f.idUsuario === usuario.idUsuario &&
                    f.idPlato === idPlato
            );

            if (existe) {
                alert("Ya está en favoritos");
                setLoading(false);
                return;
            }

            await guardarFavorito({
                idUsuario: usuario.idUsuario,
                idPlato: idPlato
            });

            alert("Agregado a favoritos ❤️");

        } catch (error) {
            console.error(error);
        }

        setLoading(false);
    };

    return (
        <button
            onClick={agregar}
            disabled={loading}
            className="bg-pink-500 hover:bg-pink-600 text-white px-3 py-2 rounded-xl"
        >
            {loading ? "..." : "❤️ Favorito"}
        </button>
    );
};

export default FavoritoButton;