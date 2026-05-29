import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { MdMusicNote } from "react-icons/md";
import { logout } from "../../Services/authService";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const location = useLocation();
  useEffect(() => {
    // Cerrar el dropdown de admin al navegar, pero diferir la actualización
    // para evitar setState síncrono dentro del efecto (cascading renders)
    if (adminOpen) {    
      const t = setTimeout(() => setAdminOpen(false), 0);
      return () => clearTimeout(t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const linkClass =
    "text-sm font-semibold transition-colors duration-200 hover:text-orange-400";

  const usuario = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('usuario') || 'null') : null;

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  }

  return (
    <nav
      className={[
        "fixed w-full z-20 top-0 start-0 transition-all duration-300",
        scrolled
          ? "bg-gray-900/95 backdrop-blur-sm shadow-lg"
          : "bg-transparent",
      ].join(" ")}
      style={{ fontFamily: "'Nunito', sans-serif" }}
    >
      <div className="max-w-5xl flex items-center justify-between mx-auto px-8 py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <div className="bg-orange-400 rounded-full p-2 shrink-0">
            <MdMusicNote color="white" size={24} />
          </div>
          <span
            className={[
              "text-lg font-black transition-colors duration-300",
              scrolled ? "text-white" : "text-gray-800",
            ].join(" ")}
          >
            SoundBites
          </span>
        </Link>

        {/* Links */}
        <ul className="flex items-center gap-8">
          <li>
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `${linkClass} ${
                  isActive
                    ? "text-orange-400"
                    : scrolled
                      ? "text-white/80"
                      : "text-gray-800"
                }`
              }
            >
              Home
            </NavLink>
          </li>
          <li className="relative">
            {/* Mostrar enlace de admin solo si el usuario es admin */}
            {usuario && ((usuario.rol ?? usuario.Rol ?? '').toString().toLowerCase() === 'admin') && (
              <div className="relative">
                <button
                  onClick={() => setAdminOpen(!adminOpen)}
                  className={`${linkClass} px-3 py-1.5 rounded-md flex items-center gap-2 ${
                    scrolled ? "text-white/80" : "text-gray-800"
                  }`}
                >
                  Admin
                  <span className={`transition-transform ${adminOpen ? "rotate-180" : "rotate-0"}`}>▾</span>
                </button>

                {adminOpen && (
                  <div
                    className={`absolute right-0 mt-2 w-44 rounded-md shadow-lg z-30 ${
                      scrolled ? "bg-gray-800 text-white" : "bg-white text-gray-800"
                    }`}
                  >
                    <NavLink
                      to="/admin/platos"
                      onClick={() => setAdminOpen(false)}
                      className={({ isActive }) =>
                        `block px-4 py-2 text-sm hover:bg-orange-100 ${isActive ? "bg-orange-200" : ""}`
                      }
                    >
                      Platos
                    </NavLink>
                    <NavLink
                      to="/admin/generos"
                      onClick={() => setAdminOpen(false)}
                      className={({ isActive }) =>
                        `block px-4 py-2 text-sm hover:bg-orange-100 ${isActive ? "bg-orange-200" : ""}`
                      }
                    >
                      Generos
                    </NavLink>
                  </div>
                )}
              </div>
            )}
          </li>
          <li>
            {
              (() => {
                const usuario = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('usuario') || 'null') : null;
                              if (usuario) {
                                  return (
                                      <div className="flex items-center gap-3">

                                          <NavLink
                                              to="/favoritos"
                                              className={({ isActive }) =>
                                                  `${linkClass} ${isActive
                                                      ? "text-orange-400"
                                                      : scrolled
                                                          ? "text-white/80"
                                                          : "text-gray-800"
                                                  }`
                                              }
                                          >


                                              Favoritos
                                          </NavLink>

                                          <NavLink
                                              to="/perfil"
                                              className={({ isActive }) =>
                                                  `${linkClass} px-4 py-1.5 rounded-lg border transition-all duration-200 ${isActive
                                                      ? "bg-orange-400 border-orange-400 text-white"
                                                      : scrolled
                                                          ? "border-white/30 text-white/80 hover:border-orange-400"
                                                          : "border-gray-400 text-gray-800 hover:border-orange-400"
                                                  }`
                                              }
                                          >
                                              Perfil
                                          </NavLink>

                                          <button
                                              onClick={handleLogout}
                                              className={`text-sm transition ${scrolled
                                                      ? "text-white/70 hover:text-white"
                                                      : "text-gray-600 hover:text-black"
                                                  }`}
                                          >
                                              Salir
                                          </button>
                                      </div>
                                  );
                              }

                return (
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      `${linkClass} px-4 py-1.5 rounded-lg border transition-all duration-200 ${
                        isActive
                          ? "bg-orange-400 border-orange-400 text-white"
                          : scrolled
                            ? "border-white/30 text-white/80 hover:border-orange-400"
                            : "border-gray-400 text-gray-800 hover:border-orange-400"
                      }`
                    }
                  >
                    Login
                  </NavLink>
                )
              })()
            }
          </li>
        </ul>
      </div>
    </nav>
  );
};

// AdminMenu eliminado: el dropdown se gestiona por adminOpen en el componente Navbar

export default Navbar;
