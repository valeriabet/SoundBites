import { useState, useRef } from "react";
 
const sedes = [
  {
    name: "Ciudad del Rio",
    address: "Cra 48 # 20 34. C.E. Ciudad del Rio. 102",
    hours: "L-S: 11am-8pm. D-F: 11am-6pm",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80",
  },
  {
    name: "La Strada",
    address: "Cra 43 A # 1 SUR 150. La Strada, 225.",
    hours: "L-S: 11am-9pm. D-F: 11am-6pm",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80",
  },
  {
    name: "Manila",
    address: "Carrera 43E # 11 - 27. Barrio Manila",
    hours: "L-S: 9am-9pm. D-F: 9am-6pm",
    badge: null,
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80",
  },
  {
    name: "El Poblado",
    address: "Calle 10 # 43D - 15. El Poblado",
    hours: "L-S: 11am-9pm. D-F: 11am-6pm",
    badge: null,
    image: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=600&q=80",
  },
  {
    name: "Laureles",
    address: "Circular 73 # 39A - 18. Laureles",
    hours: "L-S: 11am-8pm. D-F: 11am-6pm",
    badge: null,
    image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=600&q=80",
  },
];
 
const VISIBLE = 3;
 
export default function CarruselReserva() {
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
    <div
      className="min-h-screen flex items-center justify-center px-4 py-16"
      style={{ backgroundColor: "#F7C59F"}}
    >
      <div className="w-full max-w-6xl">
        {/* Header */}
        <div className="mb-10">
          <h1
            className="text-5xl font-black mb-2"
            style={{ color: "#1a1209", letterSpacing: "-1px" }}
          >
            Nuestras sedes
          </h1>
          <p className="text-sm" style={{ color: "#7a6a55" }}>
            Próximamente llegaremos a más lugares
          </p>
        </div>
 
        {/* Carousel */}
        <div className="relative flex items-center">
          {/* Prev arrow */}
          <button
            onClick={() => slide("prev")}
            disabled={!canPrev}
            className="absolute -left-6 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 shadow-md"
            style={{
              backgroundColor: canPrev ? "#fff" : "#e0d8cc",
              color: canPrev ? "#1a1209" : "#b0a090",
              cursor: canPrev ? "pointer" : "default",
              border: "1px solid #d4c9b8",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
 
          {/* Cards container */}
          <div className="flex gap-6 w-full overflow-hidden">
            {visible.map((sede, i) => (
              <div
                key={sede.name}
                className="flex-1 min-w-0 flex flex-col"
                style={{
                  opacity: animating ? 0 : 1,
                  transform: animating
                    ? `translateX(${direction === "next" ? "-30px" : "30px"})`
                    : "translateX(0)",
                  transition: "opacity 0.35s ease, transform 0.35s ease",
                  transitionDelay: `${i * 50}ms`,
                }}
              >
                {/* Image */}
                <div
                  className="relative overflow-hidden mb-4"
                  style={{ borderRadius: "4px", aspectRatio: "4/3" }}
                >
                  <img
                    src={sede.image}
                    alt={sede.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
    
                </div>
 
                {/* Info */}
                <h2
                  className="text-xl font-bold mb-2"
                  style={{ color: "#1a1209", fontFamily: "'Georgia', serif" }}
                >
                  {sede.name}
                </h2>
 
                <div className="flex items-start gap-2 mb-1">
                  <svg className="mt-0.5 shrink-0" width="12" height="14" viewBox="0 0 12 16" fill="#c0392b">
                    <path d="M6 0C2.69 0 0 2.69 0 6c0 4.5 6 10 6 10s6-5.5 6-10c0-3.31-2.69-6-6-6zm0 8.5C4.62 8.5 3.5 7.38 3.5 6S4.62 3.5 6 3.5 8.5 4.62 8.5 6 7.38 8.5 6 8.5z" />
                  </svg>
                  <span className="text-sm" style={{ color: "#4a3d2d", lineHeight: "1.4" }}>
                    {sede.address}
                  </span>
                </div>
 
                <div className="flex items-center gap-2">
                  <svg className="shrink-0" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#c0392b" strokeWidth="2" strokeLinecap="round">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  <span className="text-sm" style={{ color: "#4a3d2d" }}>
                    {sede.hours}
                  </span>
                </div>
 
                {/* CTA button */}
                <button
                  className="mt-4 py-2.5 text-sm font-semibold tracking-wide transition-all duration-200 text-white bg-red-900 hover:bg-red-950"
                >
                  Ver sede
                </button>
              </div>
            ))}
          </div>
 
          {/* Next arrow */}
          <button
            onClick={() => slide("next")}
            disabled={!canNext}
            className="absolute -right-6 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 shadow-md"
            style={{
              backgroundColor: canNext ? "#fff" : "#e0d8cc",
              color: canNext ? "#1a1209" : "#b0a090",
              cursor: canNext ? "pointer" : "default",
              border: "1px solid #d4c9b8",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
 
        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
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
                backgroundColor: i === startIndex ? "#8b1a1a" : "#c9b99f",
                border: "none",
                cursor: "pointer",
                padding: 0,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
 