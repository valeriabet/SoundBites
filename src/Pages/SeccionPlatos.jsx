/*
PSEUDOCÓDIGO (plan detallado):

- Objetivo: evitar llamar a setVisibles([]) de forma síncrona dentro de un useEffect
  para resolver la regla ESLint `react-hooks/set-state-in-effect`.
- Estrategia:
  1. En lugar de limpiar el estado inmediatamente en el cuerpo del efecto,
     programar la limpieza de forma asíncrona usando `setTimeout(..., 0)`.
     Esto evita una actualización de estado síncrona dentro del efecto.
  2. Dentro de ese `setTimeout`:
     - establecer `setVisibles([])` para reiniciar el estado.
     - si no hay elementos, salir.
     - programar una serie de `setTimeout` escalonados (i * 75 ms) para
       añadir progresivamente los índices a `visibles`.
     - guardar los IDs de timeout en un array para poder limpiarlos.
  3. En la función de limpieza del efecto:
     - cancelar el timeout de reinicio (resetTimer).
     - cancelar todos los timeouts escalonados.
  4. Añadir `platosFiltrados.length` a las dependencias para garantizar que
     el efecto se vuelva a ejecutar cuando cambie la cantidad de platos.
- Resultado: no se llama a setState de forma síncrona dentro del efecto,
  resolviendo la advertencia de ESLint y manteniendo la animación de aparición.
*/

import { useState, useEffect, useRef } from "react";

import {
    guardarFavorito,
    eliminarFavorito,
    listarFavoritos,
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
// TARJETA PLATO
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

                {/* BOTON FAVORITO */}

                <button
                    onClick={() =>
                        toggleFavorito(plato.idPlato)
                    }
                    className="absolute top-3 right-3 text-2xl"
                >
                    {esFavorito ? "❤️" : "🤍"}
                </button>

                {/* Precio */}

                <div
                    className="absolute bottom-3 left-3 px-3 py-1 rounded-full text-white text-xs font-bold tracking-wide"
                    style={{
                        fontFamily:
                            "'Nunito', sans-serif",
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
                    fontFamily:
                        "'Nunito', sans-serif",
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
    // CARGAR PLATOS Y CATEGORIAS
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
                        `Categorias: ${resCat.status}`
                    );
                }

                const platosData =
                    await resPlatos.json();

                const categoriasData =
                    await resCat.json();

                setPlatos(platosData);

                setCategorias(categoriasData);

            } catch (e) {

                console.error(e);

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

            try {

                const data =
                    await listarFavoritos();

                if (usuario) {

                    const favoritosUsuario =
                        data.filter(
                            (f) =>
                                f.idUsuario ===
                                usuario.idUsuario
                        );

                    setFavoritos(
                        favoritosUsuario
                    );
                }

            } catch (error) {

                console.error(error);
            }
        };

        cargarFavoritos();

    }, []);

    // ─────────────────────────────
    // TOGGLE FAVORITO
    // ─────────────────────────────

    const toggleFavorito = async (
        idPlato
    ) => {

        if (!usuario) {

            alert(
                "Debes iniciar sesión"
            );

            return;
        }

        const existe = favoritos.find(
            (f) =>
                f.idPlato === idPlato
        );

        try {

            if (existe) {

                await eliminarFavorito(
                    existe.idFavorito
                );

                setFavoritos(
                    favoritos.filter(
                        (f) =>
                            f.idFavorito !==
                            existe.idFavorito
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
        // Evitar setState síncrono dentro del efecto.
        // Programamos la limpieza y el inicio de la animación de forma asíncrona.
        let staggerTimers = [];
        const resetTimer = setTimeout(() => {
            setVisibles([]);

            if (platosFiltrados.length === 0) return;

            staggerTimers = platosFiltrados.map((_, i) =>
                setTimeout(() => {
                    setVisibles((prev) => [...prev, i]);
                }, i * 75)
            );
        }, 0);

        return () => {
            clearTimeout(resetTimer);
            staggerTimers.forEach(clearTimeout);
        };
    }, [categoriaActiva, cargando, platosFiltrados.length]);

    // ─────────────────────────────
    // RENDER
    // ─────────────────────────────

    return (
        <>
            <FontLoader />

            <section
                className="min-h-screen pt-24 pb-20 px-6"
                style={{
                    backgroundColor:
                        "#FDDCB5",
                    fontFamily:
                        "'Nunito', sans-serif",
                }}
            >
                <div className="max-w-5xl mx-auto">

                    {/* TITULO */}

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

                        {/* CATEGORIAS */}

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
                                            ].join(
                                                " "
                                            )}
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

                        {/* CONTENIDO */}

                        {cargando ? (

                            <div className="flex justify-center py-20">
                                Cargando platos...
                            </div>

                        ) : error ? (

                            <div className="text-center py-20 text-red-500">
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
                                    (
                                        plato,
                                        i
                                    ) => (
                                        <TarjetaPlato
                                            key={
                                                plato.idPlato
                                            }
                                            plato={
                                                plato
                                            }
                                            visible={visibles.includes(
                                                i
                                            )}
                                            favoritos={
                                                favoritos
                                            }
                                            toggleFavorito={
                                                toggleFavorito
                                            }
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