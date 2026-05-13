import { useState } from "react";
import { MdMusicNote } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";



function Register() {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [verContraseña, setVerContraseña] = useState(false);
  const [rol, setRol] = useState("Cliente");
  const navigate = useNavigate();

  const handleRegister = async () => {
    const nuevoUsuario = { nombre, correo, contraseña, rol };
//conexion con base de datos (por hacer)
    // const response = await fetch(
    //   "https://localhost:7117/api/usuario/guardar usuario",
    //   {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(nuevoUsuario),
    //   },
    // );

  //   if (response.ok) {
  //     alert("Usuario registrado correctamente");
  //   } else {
  //     alert("Error al registrar");
  //   }
  // };
  };

  return (
    <div className="min-h-screen bg-orange-200 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-md p-8 w-full max-w-sm">
        {/* Logo */}
        <div className="flex flex-col items-center mb-6">
          <div className="bg-orange-400 rounded-full p-4 mb-3">
            <MdMusicNote color="white" size={32} />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">SoundBites</h1>
          <p className="text-gray-400 text-sm">Crea tu cuenta</p>
        </div>

        {/* Nombre */}
        <div className="mb-4">
          <label className="text-sm font-medium text-gray-700 block mb-1">
            Nombre
          </label>
          <input
            type="text"
            placeholder="Tu nombre"
            className="w-full border rounded-xl px-3 py-2 bg-gray-50 outline-none text-sm"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>

        {/* Correo */}
        <div className="mb-4">
          <label className="text-sm font-medium text-gray-700 block mb-1">
            Correo Electrónico
          </label>
          <input
            type="email"
            placeholder="tu@email.com"
            className="w-full border rounded-xl px-3 py-2 bg-gray-50 outline-none text-sm"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
          />
        </div>

        {/* Contraseña */}
        <div className="mb-4">
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

        {/* Rol */}
        <div className="mb-6">
          <label className="text-sm font-medium text-gray-700 block mb-1">
            Rol
          </label>
          <select
            className="w-full border rounded-xl px-3 py-2 bg-gray-50 outline-none text-sm"
            value={rol}
            onChange={(e) => setRol(e.target.value)}
          >
            <option value="cliente">Cliente</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        {/* Boton */}
        <button
          onClick={handleRegister}
          className="w-full bg-orange-400 hover:bg-orange-500 text-white font-semibold py-3 rounded-xl transition"
        >
          Registrarse
        </button>

        {/* Login */}
        <p className="text-center text-sm text-gray-500 mt-4">
          ¿Ya tienes una cuenta?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-orange-400 font-semibold cursor-pointer"
          >
            Inicia Sesión
          </span>
        </p>

      </div>
    </div>
  );
}

export default Register; 
