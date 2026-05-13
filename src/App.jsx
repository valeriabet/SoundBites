import { BrowserRouter, Routes, Route } from "react-router-dom"
import Register from "./Componentes/Register"
import Login from "./Componentes/Login"
import Reserva from "./Componentes/Reserva"
import Home from "./Componentes/Home"
import MainLayout from "./Componentes/MainLayout"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="reserva" element={<Reserva />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App