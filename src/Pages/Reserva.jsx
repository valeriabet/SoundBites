import { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { MdMusicNote } from "react-icons/md";
import { crearReserva } from "../Services/reservaService";

// Generos se obtendrán desde la API

const HORAS = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
];

const Reserva = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const sede = location.state?.sede ?? null;

  const [nombre, setNombre] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [genero, setGenero] = useState("");
  const [generos, setGeneros] = useState([]);
  const [numeroPersonas, setNumeroPersonas] = useState(1);
  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState("");

  const hoy = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const cargarGeneros = async () => {
      try {
        const res = await fetch("https://localhost:7117/api/genero/listargeneros");
        const data = await res.json();
        setGeneros(data);
      } catch (error) {
        console.error('Error al cargar géneros', error);
      }
    };

    cargarGeneros();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (!nombre.trim() || !fecha || !hora || !genero) {
      setError("Completa todos los campos y elige un género musical.");
      return;
    }

    // Usuario logueado requerido
    const usuario = JSON.parse(localStorage.getItem('usuario') || 'null');
    if (!usuario || !usuario.idUsuario) {
      setError('Debes iniciar sesión para reservar');
      return;
    }

    // Combinar fecha + hora en ISO
    const fechaHora = new Date(`${fecha}T${hora}`).toISOString();

    // Encontrar idGenero a partir del select (genero guarda id)
    const idGenero = Number(genero);
    const genObj = generos.find(g => Number(g.idGenero) === idGenero);

    if (!idGenero && !genObj) {
      setError('Selecciona un género válido');
      return;
    }

    // Validar numeroPersonas
    const np = Number(numeroPersonas) || 1;
    if (np < 1 || np > 8) {
      setError('Número de personas debe ser entre 1 y 8');
      return;
    }

    const reservaDto = {
      idUsuario: usuario.idUsuario ?? usuario.IdUsuario,
      fecha: fechaHora,
      numeroPersonas: np,
      idGenero: idGenero || 0,
      generoNombre: genObj ? genObj.nombre : "",
    };

    // Enviar al backend
    (async () => {
      try {
        await crearReserva(reservaDto);
        setEnviado(true);
      } catch (error) {
        console.error('Error al crear reserva', error);
        setError('Error al crear la reserva');
      }
    })();
  };

  if (enviado) {
    return (
      <div
        className="min-h-full flex-1 flex items-center justify-center px-4 py-12"
        style={{ backgroundColor: "#F7C59F" }}
      >
        <div className="bg-white rounded-2xl shadow-md p-8 w-full max-w-md text-center">
          <div className="bg-orange-400 rounded-full p-4 inline-flex mb-4">
            <MdMusicNote color="white" size={32} />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            ¡Reserva confirmada!
          </h1>
          <p className="text-gray-500 text-sm mb-6">
            Gracias, {nombre}. Tu voto por <strong>{genero}</strong> quedó
            registrado para el {fecha} a las {hora}
            {sede ? ` en ${sede}` : ""}.
          </p>
          <button
            type="button"
            onClick={() => navigate("/")}
            className="w-full bg-red-900 hover:bg-red-950 text-white font-semibold py-3 rounded-xl transition"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-full flex-1 flex items-center justify-center px-4 py-12"
      style={{ backgroundColor: "#F7C59F" }}
    >
      <div className="bg-white rounded-2xl shadow-md p-8 w-full max-w-lg">
        <div className="flex flex-col items-center mb-6">
          <div className="bg-orange-400 rounded-full p-4 mb-3">
            <MdMusicNote color="white" size={32} />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Hacer reserva</h1>
          <p className="text-gray-400 text-sm text-center">
            {sede
              ? `Sede: ${sede}`
              : "Completa tus datos y vota por tu género favorito"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="nombre"
              className="text-sm font-medium text-gray-700 block mb-1"
            >
              Nombre
            </label>
            <input
              id="nombre"
              type="text"
              placeholder="Tu nombre completo"
              className="w-full border rounded-xl px-3 py-2.5 bg-gray-50 text-sm outline-none focus:ring-2 focus:ring-orange-300"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="fecha"
                className="text-sm font-medium text-gray-700 block mb-1"
              >
                Fecha
              </label>
              <input
                id="fecha"
                type="date"
                min={hoy}
                className="w-full border rounded-xl px-3 py-2.5 bg-gray-50 text-sm outline-none focus:ring-2 focus:ring-orange-300"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
                required
              />
            </div>
            <div>
              <label
                htmlFor="hora"
                className="text-sm font-medium text-gray-700 block mb-1"
              >
                Hora
              </label>
              <select
                id="hora"
                className="w-full border rounded-xl px-3 py-2.5 bg-gray-50 text-sm outline-none focus:ring-2 focus:ring-orange-300"
                value={hora}
                onChange={(e) => setHora(e.target.value)}
                required
              >
                <option value="">Selecciona una hora</option>
                {HORAS.map((h) => (
                  <option key={h} value={h}>
                    {h}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Número de personas</label>
            <select
              value={numeroPersonas}
              onChange={(e) => setNumeroPersonas(e.target.value)}
              className="w-full border rounded-xl px-3 py-2.5 bg-gray-50 text-sm outline-none focus:ring-2 focus:ring-orange-300"
            >
              {Array.from({length:8}, (_,i)=>i+1).map(n=> (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Género musical</label>
            <select
              value={genero}
              onChange={(e)=>setGenero(e.target.value)}
              className="w-full border rounded-xl px-3 py-2.5 bg-gray-50 text-sm outline-none focus:ring-2 focus:ring-orange-300"
              required
            >
              <option value="">Selecciona género</option>
              {generos.map(g => (
                <option key={g.idGenero} value={g.idGenero}>{g.nombre}</option>
              ))}
            </select>
          </div>

          {error && (
            <p className="text-sm text-red-700 bg-red-50 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-red-900 hover:bg-red-950 text-white font-semibold py-3 rounded-xl transition"
          >
            Confirmar reserva
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-4">
          <Link to="/" className="text-orange-500 font-medium hover:underline">
            Cancelar y volver
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Reserva;
