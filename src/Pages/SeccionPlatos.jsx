import { useState, useEffect, useRef } from "react";

import {
    guardarFavorito,
    eliminarFavoritoUsuarioPlato,
    obtenerFavoritosUsuario,
} from "../Services/favoritoService";

const FontLoader = () => (
    <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&display=swap');

    @keyframes girar {
      to {
        transform: rotate(360deg);
      }
    }

    .spinner {
      animation: girar 0.9s linear infinite;
    }
  `}</style>
);

const API_BASE = "https://localhost:7117/api";

const fmt = (n) =>
    new Intl.NumberFormat("es-CO", {
        style: "currency",
        currency: "COP",
        minimumFractionDigits: 0,
    }).format(n);

// ─────────────────────────────
// Tarjeta Plato
// ─────────────────────────────

const TarjetaPlato = ({
    plato,
    visible,
    favoritos,
    toggleFavorito,
}) => {

    const [hover, setHover] = useState(false);

    const esFavorito = favoritos.some(
        (f) => f.idPlato === plato.idPlato
    );

    return (
        <article
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            className={[
                "bg-white rounded-2xl overflow-hidden flex flex-col cursor-default transition-all duration-500",

                visible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6",

                hover
                    ? "shadow-[0_12px_36px_rgba(0,0,0,0.13)] -translate-y-1"
                    : "shadow-[0_2px_12px_rgba(0,0,0,0.07)]",
            ].join(" ")}
        >
            {/* Imagen */}

            <div
                className="relative overflow-hidden"
                style={{ aspectRatio: "4/3" }}
            >
                <img
                    src={
                        plato.imagen ||
                        "https://via.placeholder.com/400x300"
                    }
                    alt={plato.nombre}
                    className={[
                        "w-full h-full object-cover block transition-transform duration-500",

                        hover
                            ? "scale-[1.06]"
                            : "scale-100",
                    ].join(" ")}
                />

                {/* FAVORITO */}

                <button
                    onClick={() =>
                        toggleFavorito(plato.idPlato)
                    }
                    className="absolute top-3 right-3 text-2xl z-10"
                >
                    {esFavorito ? "❤️" : "🤍"}
                </button>

                {/* Precio */}

                <div
                    className="absolute bottom-3 left-3 px-3 py-1 rounded-full text-white text-xs font-bold tracking-wide"
                    style={{
                        fontFamily: "'Nunito', sans-serif",
                        backgroundColor: "#F97316",
                    }}
                >
                    {fmt(plato.precio)}
                </div>
            </div>

            {/* Info */}

            <div
                className="px-5 pt-4 pb-5 flex flex-col gap-2 flex-1"
                style={{
                    fontFamily: "'Nunito', sans-serif",
                }}
            >
                <h3 className="text-[1rem] font-bold text-gray-800 leading-snug">
                    {plato.nombre}
                </h3>

                <p className="text-[0.82rem] text-gray-400 leading-relaxed flex-1">
                    {plato.descripcion}
                </p>
            </div>
        </article>
    );
};

// ─────────────────────────────
// COMPONENTE PRINCIPAL
// ─────────────────────────────

const SeccionPlatos = () => {

    const [categoriaActiva, setCategoriaActiva] =
        useState(0);

    const [platos, setPlatos] = useState([]);

    const [categorias, setCategorias] =
        useState([]);

    const [cargando, setCargando] =
        useState(true);

    const [error, setError] = useState(null);

    const [visibles, setVisibles] =
        useState([]);

    const [favoritos, setFavoritos] =
        useState([]);

    const gridRef = useRef(null);

    const usuario = JSON.parse(
        localStorage.getItem("usuario")
    );

    // ─────────────────────────────
    // CARGAR PLATOS Y CATEGORÍAS
    // ─────────────────────────────

    useEffect(() => {

        const cargar = async () => {

            setCargando(true);

            setError(null);

            try {

                const [resPlatos, resCat] =
                    await Promise.all([
                        fetch(
                            `${API_BASE}/plato/listarplatos`
                        ),

                        fetch(
                            `${API_BASE}/categoria/listarcategorias`
                        ),
                    ]);

                if (!resPlatos.ok) {
                    throw new Error(
                        `Platos: ${resPlatos.status}`
                    );
                }

                if (!resCat.ok) {
                    throw new Error(
                        `Categorías: ${resCat.status}`
                    );
                }

                const platosData =
                    await resPlatos.json();

                const categoriasData =
                    await resCat.json();

                setPlatos(platosData);

                setCategorias(categoriasData);

            } catch (e) {

                console.error(
                    "Error cargando datos:",
                    e
                );

                setError(
                    "No se pudo conectar con el servidor."
                );

            } finally {

                setCargando(false);
            }
        };

        cargar();

    }, []);

    // ─────────────────────────────
    // CARGAR FAVORITOS
    // ─────────────────────────────

    useEffect(() => {

        const cargarFavoritos = async () => {

            if (!usuario) return;

            try {

                const data =
                    await obtenerFavoritosUsuario(
                        usuario.idUsuario
                    );

                setFavoritos(data);

            } catch (error) {

                console.error(error);
            }
        };

        cargarFavoritos();

    }, []);

    // ─────────────────────────────
    // TOGGLE FAVORITO
    // ─────────────────────────────

    const toggleFavorito = async (idPlato) => {

        if (!usuario) {

            alert("Debes iniciar sesión");

            return;
        }

        const existe = favoritos.find(
            (f) => f.idPlato === idPlato
        );

        try {

            if (existe) {

                await eliminarFavoritoUsuarioPlato(
                    usuario.idUsuario,
                    idPlato
                );

                setFavoritos(
                    favoritos.filter(
                        (f) =>
                            f.idPlato !== idPlato
                    )
                );

            } else {

                const nuevo =
                    await guardarFavorito({
                        idUsuario:
                            usuario.idUsuario,

                        idPlato,
                    });

                setFavoritos([
                    ...favoritos,
                    nuevo,
                ]);
            }

        } catch (error) {

            console.error(error);
        }
    };

    // ─────────────────────────────
    // FILTRAR
    // ─────────────────────────────

    const platosFiltrados =
        categoriaActiva === 0
            ? platos
            : platos.filter(
                (p) =>
                    p.idCategoria ===
                    categoriaActiva
            );

    // ─────────────────────────────
    // ANIMACIONES
    // ─────────────────────────────

    useEffect(() => {

        setVisibles([]);

        if (platosFiltrados.length === 0)
            return;

        const timers = platosFiltrados.map(
            (_, i) =>
                setTimeout(() => {
                    setVisibles((prev) => [
                        ...prev,
                        i,
                    ]);
                }, i * 75)
        );

        return () =>
            timers.forEach(clearTimeout);

    }, [categoriaActiva, cargando]);

    // ─────────────────────────────
    // RENDER
    // ─────────────────────────────

    return (
        <>
            <FontLoader />

            <section
                className="min-h-screen pt-24 pb-20 px-6"
                style={{
                    backgroundColor: "#FDDCB5",
                    fontFamily:
                        "'Nunito', sans-serif",
                }}
            >
                <div className="max-w-5xl mx-auto">

                    {/* HEADER */}

                    <div className="mb-8">

                        <div
                            className="w-14 h-14 rounded-full flex items-center justify-center mb-5"
                            style={{
                                backgroundColor:
                                    "#F97316",
                            }}
                        >
                            <svg
                                width="26"
                                height="26"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="white"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M3 2h18" />
                                <path d="M3 8h18" />
                                <path d="M12 2v20" />
                                <path d="M5 22h14" />
                            </svg>
                        </div>

                        <h1 className="text-4xl font-extrabold text-gray-800 mb-1">
                            Nuestro Menú
                        </h1>

                        <p className="text-sm text-gray-500">
                            Ingredientes frescos,
                            sabores que no se olvidan
                        </p>
                    </div>

                    {/* CONTENEDOR */}

                    <div className="bg-white rounded-3xl p-6 shadow-[0_4px_32px_rgba(0,0,0,0.08)]">

                        {/* CATEGORÍAS */}

                        {categorias.length > 0 && (

                            <div className="flex gap-2 flex-wrap mb-6">

                                {[
                                    {
                                        idCategoria: 0,
                                        nombre: "Todos",
                                    },

                                    ...categorias,
                                ].map((cat) => {

                                    const activa =
                                        cat.idCategoria ===
                                        categoriaActiva;

                                    return (
                                        <button
                                            key={
                                                cat.idCategoria
                                            }
                                            onClick={() =>
                                                setCategoriaActiva(
                                                    cat.idCategoria
                                                )
                                            }
                                            className={[
                                                "px-4 py-1.5 rounded-full text-xs font-bold tracking-wide transition-all duration-200",

                                                activa
                                                    ? "text-white shadow-sm"
                                                    : "bg-orange-50 text-orange-400 hover:bg-orange-100",
                                            ].join(" ")}
                                            style={{
                                                backgroundColor:
                                                    activa
                                                        ? "#F97316"
                                                        : undefined,
                                            }}
                                        >
                                            {cat.nombre}
                                        </button>
                                    );
                                })}
                            </div>
                        )}

                        {/* LOADING */}

                        {cargando ? (

                            <div className="flex justify-center py-20">
                                <div className="spinner w-10 h-10 rounded-full border-4 border-orange-100 border-t-orange-400" />
                            </div>

                        ) : error ? (

                            <div className="text-center py-20 text-red-400">
                                {error}
                            </div>

                        ) : (

                            <div
                                ref={gridRef}
                                className="grid gap-5"
                                style={{
                                    gridTemplateColumns:
                                        "repeat(auto-fill, minmax(240px, 1fr))",
                                }}
                            >
                                {platosFiltrados.map(
                                    (plato, i) => (

                                        <TarjetaPlato
                                            key={
                                                plato.idPlato
                                            }
                                            plato={plato}
                                            visible={visibles.includes(i)}
                                            favoritos={favoritos}
                                            toggleFavorito={toggleFavorito}
                                        />
                                    )
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
};

export default SeccionPlatos;