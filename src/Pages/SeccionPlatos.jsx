import { useState, useEffect, useRef } from "react";
import { obtenerPlatos } from "../Services/platoService";
import { listarCategorias } from "../Services/categoriaService";
import { guardarFavorito, eliminarFavorito, listarFavoritos } from "../Services/favoritoService";

const FontLoader = () => (
    <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&display=swap');
    @keyframes girar { to { transform: rotate(360deg); } }
    .spinner { animation: girar 0.9s linear infinite; }
  `}</style>
);

const fmt = (n) =>
    new Intl.NumberFormat("es-CO", {
        style: "currency",
        currency: "COP",
        minimumFractionDigits: 0,
    }).format(n);

const normalizeId = (val) => {
    if (val && typeof val === "object") {
        return val.id_usuario ?? val.id_plato ?? val.id ?? null;
    }
    return val;
};

const TarjetaPlato = ({ plato, visible, favoritos, toggleFavorito }) => {
    const [hover, setHover] = useState(false);
    const esFavorito = favoritos.some((f) => normalizeId(f.id_plato) === plato.id_plato);

    return (
        <article
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            className={[
                "bg-white rounded-2xl overflow-hidden flex flex-col cursor-default transition-all duration-500",
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
                hover ? "shadow-[0_12px_36px_rgba(0,0,0,0.13)] -translate-y-1" : "shadow-[0_2px_12px_rgba(0,0,0,0.07)]",
            ].join(" ")}
        >
            <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
                <img
                    src={plato.imagen || "https://via.placeholder.com/400x300"}
                    alt={plato.nombre}
                    className={["w-full h-full object-cover block transition-transform duration-500", hover ? "scale-[1.06]" : "scale-100"].join(" ")}
                />
                <button onClick={() => toggleFavorito(plato.id_plato)} className="absolute top-3 right-3 text-2xl">
                    {esFavorito ? "❤️" : "🤍"}
                </button>
                <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full text-white text-xs font-bold tracking-wide"
                    style={{ fontFamily: "'Nunito', sans-serif", backgroundColor: "#F97316" }}>
                    {fmt(plato.precio)}
                </div>
            </div>
            <div className="px-5 pt-4 pb-5 flex flex-col gap-2 flex-1" style={{ fontFamily: "'Nunito', sans-serif" }}>
                <h3 className="text-[1rem] font-bold text-gray-800 leading-snug">{plato.nombre}</h3>
                <p className="text-[0.82rem] text-gray-400 leading-relaxed flex-1">{plato.descripcion}</p>
            </div>
        </article>
    );
};

const SeccionPlatos = () => {
    const [categoriaActiva, setCategoriaActiva] = useState(0);
    const [platos, setPlatos] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const [visibles, setVisibles] = useState([]);
    const [favoritos, setFavoritos] = useState([]);
    const gridRef = useRef(null);

    const usuario = JSON.parse(localStorage.getItem("usuario"));

    // CARGAR PLATOS Y CATEGORIAS
    useEffect(() => {
        const cargar = async () => {
            setCargando(true);
            setError(null);
            try {
                const [platosData, categoriasData] = await Promise.all([
                    obtenerPlatos(),
                    listarCategorias(),
                ]);
                setPlatos(platosData);
                setCategorias(categoriasData);
            } catch (e) {
                console.error(e);
                setError("No se pudo conectar con el servidor.");
            } finally {
                setCargando(false);
            }
        };
        cargar();
    }, []);

    // CARGAR FAVORITOS
    useEffect(() => {
        const cargarFavoritos = async () => {
            if (!usuario || !localStorage.getItem("access_token")) return;
            try {
                const data = await listarFavoritos();
                if (!Array.isArray(data)) return;
                // Filtrar favoritos del usuario actual, normalizando FK
                const favoritosUsuario = data.filter(
                    (f) => normalizeId(f.id_usuario) === usuario.id_usuario
                );
                setFavoritos(favoritosUsuario);
            } catch (error) {
                console.error(error);
            }
        };
        cargarFavoritos();
    }, []);

    // TOGGLE FAVORITO
    const toggleFavorito = async (id_plato) => {
        if (!usuario) { alert("Debes iniciar sesión"); return; }
        const existe = favoritos.find((f) => normalizeId(f.id_plato) === id_plato);
        try {
            if (existe) {

                await eliminarFavorito(existe.id_favorito);
                setFavoritos(favoritos.filter((f) => f.id_favorito !== existe.id_favorito));
            } else {
                const nuevo = await guardarFavorito({
                    id_usuario: usuario.id_usuario,
                    id_plato,
                });
                setFavoritos([...favoritos, nuevo]);
            }
        } catch (error) {
            console.error(error);
        }
    };

    // FILTRAR — normalizar id_categoria que puede venir como objeto FK
    const platosFiltrados = categoriaActiva === 0
        ? platos
        : platos.filter((p) => normalizeId(p.id_categoria) === categoriaActiva);

    // ANIMACIONES
    useEffect(() => {
        let staggerTimers = [];
        const resetTimer = setTimeout(() => {
            setVisibles([]);
            if (platosFiltrados.length === 0) return;
            staggerTimers = platosFiltrados.map((_, i) =>
                setTimeout(() => { setVisibles((prev) => [...prev, i]); }, i * 75)
            );
        }, 0);
        return () => { clearTimeout(resetTimer); staggerTimers.forEach(clearTimeout); };
    }, [categoriaActiva, cargando, platosFiltrados.length]);

    return (
        <>
            <FontLoader />
            <section className="min-h-screen pt-24 pb-20 px-6"
                style={{ backgroundColor: "#FDDCB5", fontFamily: "'Nunito', sans-serif" }}>
                <div className="max-w-5xl mx-auto">
                    <div className="mb-8">
                        <div className="w-14 h-14 rounded-full flex items-center justify-center mb-5"
                            style={{ backgroundColor: "#F97316" }}>
                            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white"
                                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M3 2h18" /><path d="M3 8h18" />
                                <path d="M12 2v20" /><path d="M5 22h14" />
                            </svg>
                        </div>
                        <h1 className="text-4xl font-extrabold text-gray-800 mb-1">Nuestro Menú</h1>
                        <p className="text-sm text-gray-500">Ingredientes frescos, sabores que no se olvidan</p>
                    </div>

                    <div className="bg-white rounded-3xl p-6 shadow-[0_4px_32px_rgba(0,0,0,0.08)]">
                        {categorias.length > 0 && (
                            <div className="flex gap-2 flex-wrap mb-6">
                                {[{ id_categoria: 0, nombre: "Todos" }, ...categorias].map((cat) => {
                                    const activa = cat.id_categoria === categoriaActiva;
                                    return (
                                        <button key={cat.id_categoria}
                                            onClick={() => setCategoriaActiva(cat.id_categoria)}
                                            className={["px-4 py-1.5 rounded-full text-xs font-bold tracking-wide transition-all duration-200",
                                                activa ? "text-white shadow-sm" : "bg-orange-50 text-orange-400 hover:bg-orange-100"].join(" ")}
                                            style={{ backgroundColor: activa ? "#F97316" : undefined }}>
                                            {cat.nombre}
                                        </button>
                                    );
                                })}
                            </div>
                        )}

                        {cargando ? (
                            <div className="flex justify-center py-20">Cargando platos...</div>
                        ) : error ? (
                            <div className="text-center py-20 text-red-500">{error}</div>
                        ) : (
                            <div ref={gridRef} className="grid gap-5"
                                style={{ gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))" }}>
                                {platosFiltrados.map((plato, i) => (
                                    <TarjetaPlato key={plato.id_plato} plato={plato}
                                        visible={visibles.includes(i)} favoritos={favoritos}
                                        toggleFavorito={toggleFavorito} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
};

export default SeccionPlatos;
