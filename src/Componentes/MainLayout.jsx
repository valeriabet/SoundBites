import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 min-h-0 flex flex-col pt-20">
        <Outlet />
      </main>
    </div>
  )
}

export default MainLayout
