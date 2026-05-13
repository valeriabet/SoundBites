import { useState } from "react";
import { MdMusicNote } from "react-icons/md";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { Link } from "react-router-dom";

function Login() {
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [verContraseña, setVerContraseña] = useState(false);

  const handleLogin = async () => {
    //conexion con la API
  };

  return (
    <div className="min-h-screen bg-orange-200 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-md p-8 w-full max-w-sm">
        {/* Logo */}
        <div className="flex flex-col items-center mb-6">
          <div className="bg-orange-400 rounded-full p-4 mb-3">
            <span className="text-white text-2xl">
              <MdMusicNote color="white" size={32} />
            </span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">SoundBites</h1>
          <p className="text-gray-400 text-sm">Bienvenido de vuelta</p>
        </div>

        {/* Correo */}
        <div className="mb-4">
          <label className="text-sm font-medium text-gray-700 block mb-1">
            Correo Electrónico
          </label>
          <div className="flex items-center border rounded-xl px-3 py-2 bg-gray-50">
            <input
              type="email"
              placeholder="tu@email.com"
              className="bg-transparent outline-none w-full text-sm"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />
          </div>
        </div>

        {/* Contraseña */}
        <div className="mb-2">
          <label className="text-sm font-medium text-gray-700 block mb-1">
            Contraseña
          </label>
          <div className="flex items-center border rounded-xl px-3 py-2 bg-gray-50">
            <input
              type={verContraseña ? "text" : "password"}
              placeholder="········"
              className="bg-transparent outline-none w-full text-sm"
              value={contraseña}
              onChange={(e) => setContraseña(e.target.value)}
            />
            <button
              onClick={() => setVerContraseña(!verContraseña)}
              className="text-gray-400"
            >
              {verContraseña ? (
                <MdVisibilityOff size={18} />
              ) : (
                <MdVisibility size={18} />
              )}
            </button>
          </div>
        </div>

        {/* Olvidaste contraseña */}
        <div className="text-right mb-6">
          <span className="text-orange-400 text-sm cursor-pointer">
            ¿Olvidaste tu contraseña?
          </span>
        </div>

        {/* Boton */}
        <button
          onClick={handleLogin}
          className="w-full bg-orange-400 hover:bg-orange-500 text-white font-semibold py-3 rounded-xl transition"
        >
          Iniciar Sesión
        </button>

        {/* O continua con */}
        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-200" />
          <span className="mx-2 text-gray-400 text-sm">o continua con</span>
          <hr className="flex-grow border-gray-200" />
        </div>

        {/* Google y Facebook */}
        <div className="flex gap-3 mb-4">
          <button className="flex-1 border rounded-xl py-2 flex items-center justify-center gap-2 text-sm text-gray-600 hover:bg-gray-50">
            <span>G</span> Google
          </button>
          <button className="flex-1 border rounded-xl py-2 flex items-center justify-center gap-2 text-sm text-gray-600 hover:bg-gray-50">
            <span>f</span> Facebook
          </button>
        </div>

        {/* Registro */}
        <p className="text-center text-sm text-gray-500">
          ¿No tienes una cuenta?{" "}
          <Link
            to="/register"
            className="text-orange-400 font-semibold cursor-pointer"
          >
            Regístrate
          </Link>
        </p>

        {/*Continuar como invitado*/}
        <p className="text-center text-xs text-orange-500 p-2">
          <Link to="/">          Continua como invitado
          </Link>
        </p>

        {/* Terminos */}
        <p className="text-center text-xs text-gray-400 mt-3">
          Al iniciar sesión, aceptas nuestros términos y condiciones
        </p>
      </div>
    </div>
  );
}

export default Login;
