import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const obtenerRecomendaciones = async () => {
  const res = await axios.get(`${API_URL}/api/recomendaciones`);
  return res.data;
};