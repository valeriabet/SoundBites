import { useEffect, useState } from "react";
import { obtenerRecomendaciones } from "../services/recomendacionesService";

const Recomendaciones = () => {
  const [recomendaciones, setRecomendaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecomendaciones = async () => {
      try {
        setLoading(true);

        const data = await obtenerRecomendaciones();

        setRecomendaciones(data);
        setError(null);
      } catch (err) {
        console.error("Error cargando recomendaciones:", err);
        setError("No se pudieron cargar las recomendaciones");
      } finally {
        setLoading(false);
      }
    };

    fetchRecomendaciones();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2> Recomendaciones Inteligentes</h2>

      <p style={{ marginBottom: "15px", color: "#666" }}>
        Estas recomendaciones son generadas mediante análisis de gustos de usuarios similares.
      </p>

      {loading && <p>Cargando recomendaciones...</p>}

      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && recomendaciones.length === 0 && (
        <p>No hay recomendaciones disponibles por ahora.</p>
      )}

      <div style={{ display: "grid", gap: "10px" }}>
        {recomendaciones.map((item, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "10px",
            }}
          >
            <h4 style={{ margin: 0 }}>
              {item.nombre || "Sin nombre"}
            </h4>

            <p style={{ margin: "5px 0", color: "#555" }}>
              {item.descripcion || "Sin descripción"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recomendaciones;