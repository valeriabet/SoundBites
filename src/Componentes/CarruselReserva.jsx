import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const FontLoader = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap');
  `}</style>
);

const sedes = [
  {
    name: "Ciudad del Rio",
    address: "Cra 48 # 20 34. C.E. Ciudad del Rio. 102",
    hours: "L-S: 11am-8pm. D-F: 11am-6pm",
    image:
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80",
  },
  {
    name: "La Strada",
    address: "Cra 43 A # 1 SUR 150. La Strada, 225.",
    hours: "L-S: 11am-9pm. D-F: 11am-6pm",
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80",
  },
  {
    name: "Manila",
    address: "Carrera 43E # 11 - 27. Barrio Manila",
    hours: "L-S: 9am-9pm. D-F: 9am-6pm",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80",
  },
  {
    name: "El Poblado",
    address: "Calle 10 # 43D - 15. El Poblado",
    hours: "L-S: 11am-9pm. D-F: 11am-6pm",
    image:
      "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=600&q=80",
  },
  {
    name: "Laureles",
    address: "Circular 73 # 39A - 18. Laureles",
    hours: "L-S: 11am-8pm. D-F: 11am-6pm",
    image:
      "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=600&q=80",
  },
];

const VISIBLE = 3;

export default function CarruselReserva() {
  const navigate = useNavigate();
  const [startIndex, setStartIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState(null);
  const timeoutRef = useRef(null);

  const canPrev = startIndex > 0;
  const canNext = startIndex + VISIBLE < sedes.length;

  const slide = (dir) => {
    if (animating) return;
    if (dir === "prev" && !canPrev) return;
    if (dir === "next" && !canNext) return;
    setDirection(dir);
    setAnimating(true);
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setStartIndex((i) => (dir === "next" ? i + 1 : i - 1));
      setAnimating(false);
      setDirection(null);
    }, 350);
  };

  const visible = sedes.slice(startIndex, startIndex + VISIBLE);

  return (
    <>
      <FontLoader />
      <div
        className="min-h-screen flex items-center justify-center px-6 py-16"
        style={{
          backgroundColor: "#FDDCB5",
          fontFamily: "'Nunito', sans-serif",
        }}
      >
        <div className="w-full max-w-5xl" id="Carrusel">
          {/* Header */}
          <div className="mb-10 flex items-center gap-4">
            {/* Ícono */}
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
              style={{ backgroundColor: "#F97316" }}
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            </div>
            <div>
              <h1
                className="text-4xl font-black text-gray-800 leading-tight"
                style={{ letterSpacing: "-0.5px" }}
              >
                Nuestras sedes
              </h1>
              <p className="text-sm text-gray-400 mt-0.5">
                Próximamente llegaremos a más lugares
              </p>
            </div>
          </div>

          {/* Tarjeta contenedora */}
          <div className="bg-white rounded-3xl p-6 shadow-[0_4px_32px_rgba(0,0,0,0.08)]">
            {/* Carousel */}
            <div className="relative flex items-center">
              {/* Prev arrow */}
              <button
                onClick={() => slide("prev")}
                disabled={!canPrev}
                className="absolute -left-5 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 shadow-md bg-white"
                style={{
                  color: canPrev ? "#F97316" : "#d1d5db",
                  cursor: canPrev ? "pointer" : "default",
                  border: `1.5px solid ${canPrev ? "#F97316" : "#e5e7eb"}`,
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>

              {/* Cards */}
              <div className="flex gap-5 w-full overflow-hidden">
                {visible.map((sede, i) => (
                  <div
                    key={sede.name}
                    className="flex-1 min-w-0 flex flex-col"
                    style={{
                      opacity: animating ? 0 : 1,
                      transform: animating
                        ? `translateX(${direction === "next" ? "-28px" : "28px"})`
                        : "translateX(0)",
                      transition: "opacity 0.35s ease, transform 0.35s ease",
                      transitionDelay: `${i * 50}ms`,
                    }}
                  >
                    {/* Imagen */}
                    <div
                      className="relative overflow-hidden rounded-2xl mb-4"
                      style={{ aspectRatio: "4/3" }}
                    >
                      <img
                        src={sede.image}
                        alt={sede.name}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>

                    {/* Info */}
                    <h2 className="text-base font-bold text-gray-800 mb-2">
                      {sede.name}
                    </h2>

                    <div className="flex items-start gap-2 mb-1.5">
                      <svg
                        className="mt-0.5 shrink-0"
                        width="11"
                        height="13"
                        viewBox="0 0 12 16"
                        fill="#F97316"
                      >
                        <path d="M6 0C2.69 0 0 2.69 0 6c0 4.5 6 10 6 10s6-5.5 6-10c0-3.31-2.69-6-6-6zm0 8.5C4.62 8.5 3.5 7.38 3.5 6S4.62 3.5 6 3.5 8.5 4.62 8.5 6 7.38 8.5 6 8.5z" />
                      </svg>
                      <span className="text-xs text-gray-400 leading-relaxed">
                        {sede.address}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mb-4">
                      <svg
                        className="shrink-0"
                        width="11"
                        height="11"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#F97316"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                      <span className="text-xs text-gray-400">
                        {sede.hours}
                      </span>
                    </div>

                    {/* CTA */}
                    <button
                      type="button"
                      onClick={() =>
                        navigate("/reserva", { state: { sede: sede.name } })
                      }
                      className="w-full py-2.5 rounded-xl text-white text-xs font-bold tracking-wide transition-all duration-200 hover:opacity-90 active:scale-95"
                      style={{
                        backgroundColor: "#F97316",
                        border: "none",
                        cursor: "pointer",
                        fontFamily: "'Nunito', sans-serif",
                      }}
                    >
                      Hacer reserva
                    </button>
                  </div>
                ))}
              </div>

              {/* Next arrow */}
              <button
                onClick={() => slide("next")}
                disabled={!canNext}
                className="absolute -right-5 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 shadow-md bg-white"
                style={{
                  color: canNext ? "#F97316" : "#d1d5db",
                  cursor: canNext ? "pointer" : "default",
                  border: `1.5px solid ${canNext ? "#F97316" : "#e5e7eb"}`,
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-6">
              {sedes.slice(0, sedes.length - VISIBLE + 1).map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    if (!animating) setStartIndex(i);
                  }}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: i === startIndex ? "24px" : "8px",
                    height: "8px",
                    backgroundColor: i === startIndex ? "#F97316" : "#fed7aa",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
