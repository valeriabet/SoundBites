import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { MdMusicNote } from "react-icons/md";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const linkClass =
    "text-sm font-semibold transition-colors duration-200 hover:text-orange-400";

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
          <li>
            <a
              href="#Carrusel"
              className={`${linkClass} ${scrolled ? "text-white/80" : "text-gray-800"}`}
            >
              Reserva
            </a>
          </li>
          <li>
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
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
