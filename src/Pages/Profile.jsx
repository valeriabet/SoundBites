import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { listarReservas, eliminarReserva } from "../Services/reservaService";

const Profile = () => {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [reservas, setReservas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [generos, setGeneros] = useState([]);

  useEffect(() => {
    const u = JSON.parse(localStorage.getItem("usuario") || "null");
    if (!u) {
      navigate("/login");
      return;
    }

      (async () => {
          setUsuario(u);

      try {
        const all = await listarReservas();
        const mine = all.filter(r => Number(r.idUsuario) === Number(u.idUsuario || u.IdUsuario));
        // ordenar por fecha asc
        mine.sort((a,b)=> new Date(a.fecha) - new Date(b.fecha));
        setReservas(mine);

        // cargar generos para mostrar nombre
        try {
          const res = await fetch('https://localhost:7117/api/genero/listargeneros');
          const data = await res.json();
          setGeneros(data);
        } catch (e) {
          console.error('No se pudieron cargar géneros', e);
        }
      } catch (error) {
        console.error('Error al cargar reservas', error);
      } finally {
        setCargando(false);
      }
    })();
  }, [navigate]);

  if (!usuario) return null;

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Perfil de usuario</h1>

      <div className="bg-white rounded-xl shadow p-6 mb-6">
        <p className="text-lg"><strong>Nombre:</strong> {usuario.nombre || usuario.Nombre || '—'}</p>
        <p className="text-lg"><strong>Rol:</strong> {usuario.rol || usuario.Rol || 'usuario'}</p>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Mis reservas</h2>
        {cargando ? (
          <p>Cargando reservas...</p>
        ) : reservas.length === 0 ? (
          <p>No tienes reservas registradas.</p>
        ) : (
          <ul className="space-y-4">
            {reservas.map(r => {
              const idGen = r.idGenero ?? r.IdGenero;
                const genObj = generos.find(g => Number(g.idGenero) === Number(idGen));
              return (
                <li key={r.idReserva} className="border rounded-lg p-4">
                  <p><strong>Fecha:</strong> {r.fecha ? new Date(r.fecha).toLocaleString() : '—'}</p>
                  <p><strong>Nº personas:</strong> {r.numeroPersonas ?? r.NumeroPersonas}</p>
                  <p><strong>Género:</strong> {genObj?.nombre || '—'}</ p>
                  <div className="mt-3 flex gap-2">
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded"
                      onClick={async ()=>{
                        if (!confirm('Cancelar reserva?')) return;
                        try {
                          await eliminarReserva(r.idReserva ?? r.IdReserva);
                          setReservas(prev => prev.filter(x=> (x.idReserva ?? x.IdReserva) !== (r.idReserva ?? r.IdReserva)));
                        } catch (e) {
                          console.error('Error al eliminar reserva', e);
                          alert('No se pudo cancelar la reserva');
                        }
                      }}
                    >Cancelar</button>
                  </div>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Profile;
