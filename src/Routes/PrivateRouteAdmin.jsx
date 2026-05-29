import { Navigate } from "react-router-dom";

const PrivateRouteAdmin = ({ children }) => {
    const usuario = JSON.parse(localStorage.getItem("usuario"));

    if (!usuario) {
        return <Navigate to="/login" />;
    }

    const rol = usuario.rol ?? usuario.Rol ?? '';
    if ((rol || '').toString().toLowerCase() !== "admin") {
        return <Navigate to="/" />;
    }

    return children;
};

export default PrivateRouteAdmin;