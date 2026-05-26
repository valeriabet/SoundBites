import { useState, useEffect, useRef } from "react";

const FontLoader = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&display=swap');
    @keyframes girar { to { transform: rotate(360deg); } }
    .spinner { animation: girar 0.9s linear infinite; }
  `}</style>
);

const API_BASE = "https://localhost:7117/api";

const fmt = (n) =>
  new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(n);

// ── Tarjeta de plato ──
const TarjetaPlato = ({ plato, visible }) => {
  const [hover, setHover] = useState(false);

  return (
    <article
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={[
        "bg-white rounded-2xl overflow-hidden flex flex-col cursor-default transition-all duration-500",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
        hover
          ? "shadow-[0_12px_36px_rgba(0,0,0,0.13)] -translate-y-1"
          : "shadow-[0_2px_12px_rgba(0,0,0,0.07)]",
      ].join(" ")}
    >
      {/* Imagen */}
      <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
        <img
          src={plato.imagen}
          alt={plato.nombre}
          className={[
            "w-full h-full object-cover block transition-transform duration-500",
            hover ? "scale-[1.06]" : "scale-100",
          ].join(" ")}
        />
        {/* Precio badge */}
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
        style={{ fontFamily: "'Nunito', sans-serif" }}
      >
        <h3 className="text-[1rem] font-bold text-gray-800 leading-snug">
          {plato.nombre}
        </h3>
        <p className="text-[0.82rem] text-gray-400 leading-relaxed flex-1">
          {plato.descripcion}
        </p>
        <button
          className={[
            "mt-3 w-full py-2.5 rounded-xl text-white text-[0.78rem] font-bold tracking-wide transition-all duration-200",
            hover ? "bg-orange-500 scale-[1.02]" : "bg-orange-400",
          ].join(" ")}
          style={{
            fontFamily: "'Nunito', sans-serif",
            border: "none",
            cursor: "pointer",
          }}
        >
          Agregar al pedido
        </button>
      </div>
    </article>
  );
};

// ── Componente principal ──
const SeccionPlatos = () => {
  const [categoriaActiva, setCategoriaActiva] = useState(0);
  const [platos, setPlatos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [visibles, setVisibles] = useState([]);
  const gridRef = useRef(null);

  useEffect(() => {
    const cargar = async () => {
      setCargando(true);
      setError(null);
      try {
        const [resPlatos, resCat] = await Promise.all([
          fetch(`${API_BASE}/plato/listar%20platos`),
          fetch(`${API_BASE}/categoria/listar%20categorias`),
        ]);
        if (!resPlatos.ok) throw new Error(`Platos: ${resPlatos.status}`);
        if (!resCat.ok) throw new Error(`Categorías: ${resCat.status}`);
        setPlatos(await resPlatos.json());
        setCategorias(await resCat.json());
      } catch (e) {
        console.error("Error cargando datos:", e);
        setError("No se pudo conectar con el servidor.");
      } finally {
        setCargando(false);
      }
    };
    cargar();
  }, []);

  const platosFiltrados =
    categoriaActiva === 0
      ? platos
      : platos.filter((p) => p.idCategoria === categoriaActiva);

  useEffect(() => {
    setVisibles([]);
    if (platosFiltrados.length === 0) return;
    const timers = platosFiltrados.map((_, i) =>
      setTimeout(() => setVisibles((v) => [...v, i]), i * 75),
    );
    return () => timers.forEach(clearTimeout);
  }, [categoriaActiva, cargando]);

  return (
    <>
      <FontLoader />
      <section
        className="min-h-screen pt-24 pb-20 px-6"
        style={{
          backgroundColor: "#FDDCB5",
          fontFamily: "'Nunito', sans-serif",
        }}
      >
        <div className="max-w-5xl mx-auto">
          {/* ── Encabezado ── */}
          <div className="mb-8">
            {/* Ícono */}
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center mb-5"
              style={{ backgroundColor: "#F97316" }}
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
              Ingredientes frescos, sabores que no se olvidan
            </p>
          </div>

          {/* ── Tarjeta contenedora ── */}
          <div className="bg-white rounded-3xl p-6 shadow-[0_4px_32px_rgba(0,0,0,0.08)]">
            {/* ── Filtros ── */}
            {categorias.length > 0 && (
              <div className="flex gap-2 flex-wrap mb-6">
                {[{ idCategoria: 0, nombre: "Todos" }, ...categorias].map(
                  (cat) => {
                    const activa = cat.idCategoria === categoriaActiva;
                    return (
                      <button
                        key={cat.idCategoria}
                        onClick={() => setCategoriaActiva(cat.idCategoria)}
                        className={[
                          "px-4 py-1.5 rounded-full text-xs font-bold tracking-wide transition-all duration-200",
                          activa
                            ? "text-white shadow-sm"
                            : "bg-orange-50 text-orange-400 hover:bg-orange-100",
                        ].join(" ")}
                        style={{
                          fontFamily: "'Nunito', sans-serif",
                          border: "none",
                          cursor: "pointer",
                          backgroundColor: activa ? "#F97316" : undefined,
                        }}
                      >
                        {cat.nombre}
                      </button>
                    );
                  },
                )}
              </div>
            )}

            {/* ── Contenido ── */}
            {cargando ? (
              <div className="flex flex-col items-center justify-center min-h-[260px] gap-4">
                <div className="spinner w-9 h-9 rounded-full border-4 border-orange-100 border-t-orange-400" />
                <span
                  className="text-sm text-gray-400"
                  style={{ fontFamily: "'Nunito', sans-serif" }}
                >
                  Cargando platos...
                </span>
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center min-h-[260px] gap-4">
                <p className="text-sm text-red-400">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="px-5 py-2 rounded-xl text-white text-xs font-bold transition-colors duration-200"
                  style={{
                    backgroundColor: "#F97316",
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "'Nunito', sans-serif",
                  }}
                >
                  Reintentar
                </button>
              </div>
            ) : platosFiltrados.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-gray-400 text-sm">
                  No hay platos en esta categoría aún.
                </p>
              </div>
            ) : (
              <div
                ref={gridRef}
                className="grid gap-5"
                style={{
                  gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
                }}
              >
                {platosFiltrados.map((plato, i) => (
                  <TarjetaPlato
                    key={plato.idPlato}
                    plato={plato}
                    visible={visibles.includes(i)}
                  />
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
