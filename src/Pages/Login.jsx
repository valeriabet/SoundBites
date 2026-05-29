import { useState } from "react";
import { MdMusicNote } from "react-icons/md";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

function Login() {

    const [correo, setCorreo] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [verContrasena, setVerContrasena] = useState(false);

    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await fetch("https://localhost:7117/api/usuario/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ correo, contrasena }),
            });

            // Leer como texto para manejar respuestas no JSON sin romper
            const text = await response.text();
            let usuario = null;
            if (text) {
                try {
                    usuario = JSON.parse(text);
                } catch (e) {
                    console.error("No se pudo parsear respuesta de login:", e, text);
                }
            }

            if (!response.ok) {
                console.error("Error en login:", response.status, text);
                alert("Correo o contraseña incorrectos");
                return;
            }

            if (!usuario) {
                console.error("Respuesta de login válida pero sin usuario:", text);
                alert("Error al procesar la respuesta del servidor");
                return;
            }

            // Normalizar campos que pueden venir con distintos nombres/casing
            const normalized = {
                idUsuario:
                    usuario.idUsuario ??
                    usuario.IdUsuario ??
                    usuario.id ??
                    usuario.Id ??
                    null,
                nombre:
                    usuario.nombre ??
                    usuario.Nombre ??
                    usuario.nombreUsuario ??
                    usuario.NombreUsuario ??
                    "",
                correo:
                    usuario.correo ??
                    usuario.Correo ??
                    usuario.email ??
                    usuario.Email ??
                    correo,
                rol: (usuario.rol ?? usuario.Rol ?? usuario.role ?? "user").toString(),
                ...usuario,
            };

            // Guardar usuario normalizado en localStorage
            try {
                localStorage.setItem("usuario", JSON.stringify(normalized));
            } catch (e) {
                console.error("No se pudo guardar usuario en localStorage:", e);
            }

            // Navegar de forma segura según rol
            if ((normalized.rol || "").toString().toLowerCase() === "admin") {
                navigate("/admin/platos");
            } else {
                navigate("/");
            }
        } catch (error) {
            console.error("Error en la petición de login:", error);
            alert("Error al iniciar sesión. Revisa la consola para más detalles.");
        }
    };

    return (
        <div className="min-h-screen bg-orange-200 flex items-center justify-center">

            <div className="bg-white rounded-2xl shadow-md p-8 w-full max-w-sm">

                {/* LOGO */}
                <div className="flex flex-col items-center mb-6">
                    <div className="bg-orange-400 rounded-full p-4 mb-3">
                        <MdMusicNote color="white" size={32} />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800">SoundBites</h1>
                    <p className="text-gray-400 text-sm">Bienvenido de vuelta</p>
                </div>

                {/* CORREO */}
                <div className="mb-4">
                    <label className="text-sm font-medium text-gray-700 block mb-1">
                        Correo Electrónico
                    </label>

                    <input
                        type="email"
                        placeholder="tu@email.com"
                        className="bg-gray-50 border rounded-xl px-3 py-2 w-full text-sm"
                        value={correo}
                        onChange={(e) => setCorreo(e.target.value)}
                    />
                </div>

                {/* PASSWORD */}
                <div className="mb-2">

                    <label className="text-sm font-medium text-gray-700 block mb-1">
                        Contraseña
                    </label>

                    <div className="flex items-center border rounded-xl px-3 py-2 bg-gray-50">

                        <input
                            type={verContrasena ? "text" : "password"}
                            placeholder="········"
                            className="bg-transparent outline-none w-full text-sm"
                            value={contrasena}
                            onChange={(e) => setContrasena(e.target.value)}
                        />

                        <button
                            type="button"
                            onClick={() => setVerContrasena(!verContrasena)}
                            className="text-gray-400"
                        >
                            {verContrasena ? (
                                <MdVisibilityOff size={18} />
                            ) : (
                                <MdVisibility size={18} />
                            )}
                        </button>

                    </div>

                </div>

                {/* BOTÓN LOGIN */}
                <button
                    onClick={handleLogin}
                    className="w-full bg-orange-400 hover:bg-orange-500 text-white font-semibold py-3 rounded-xl transition mt-4"
                >
                    Iniciar Sesión
                </button>

                {/* LINKS */}
                <p className="text-center text-sm text-gray-500 mt-4">
                    ¿No tienes una cuenta?{" "}
                    <Link to="/register" className="text-orange-400 font-semibold">
                        Regístrate
                    </Link>
                </p>

                <p className="text-center text-xs text-orange-500 mt-2">
                    <Link to="/">Continuar como invitado</Link>
                </p>

            </div>
        </div>
    );
}

export default Login;