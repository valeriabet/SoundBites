import { Link, NavLink } from "react-router-dom";
import { MdMusicNote } from "react-icons/md";

const linkClass =
  "block py-2 px-3 text-heading rounded hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0";

const Navbar = () => {
  return (
    <nav className="bg-orange-200 fixed w-full z-20 top-0 start-0 border-b border-default">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 ">
        <Link
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <div className="bg-orange-400 rounded-full p-2">
            <MdMusicNote color="white" size={30} />
          </div>
          <span className="self-center text-xl font-semibold whitespace-nowrap text-black hover:text-white">
            SoundBites
          </span>
        </Link>

        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-default rounded-base bg-neutral-secondary-soft md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-neutral-primary md:items-center ">
            <li className="hover:text-white">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `${linkClass}${isActive ? " md:text-fg-brand" : ""}`
                }
              >
                Home
              </NavLink>
            </li>
            <li className="hover:text-white">
              <a href="#reserva">Reserva</a>
            </li>
            <li className="hover:text-white">
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `${linkClass} md:border md:border-default md:rounded-lg md:px-4${isActive ? " md:bg-neutral-tertiary" : ""}`
                }
              >
                Login
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
