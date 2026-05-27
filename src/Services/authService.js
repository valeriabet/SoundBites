const API_URL = "https://localhost:7117/api";

export const registrarUsuario = async (nuevoUsuario) => {
  try {
    const response = await fetch(`${API_URL}/usuario/guardar usuario`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(nuevoUsuario),
    });

    if (!response.ok) {
      throw new Error("Error al registrar usuario");
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};