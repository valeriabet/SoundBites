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
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ correo, contrasena }),
            });

            const data = await response.json();

            if (!response.ok) {
                alert(data.error || "Correo o contraseña incorrectos");
                return;
            }

            localStorage.setItem("access_token", data.tokens.access);
            localStorage.setItem("refresh_token", data.tokens.refresh);
            localStorage.setItem("usuario", JSON.stringify(data.usuario));

            if ((data.usuario.rol || "").toLowerCase() === "admin") {
                navigate("/admin/platos");
            } else {
                navigate("/");
            }
        } catch (error) {
            console.error("Error en login:", error);
            alert("Error al iniciar sesión.");
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