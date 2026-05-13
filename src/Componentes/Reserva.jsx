import React from 'react'
import { useNavigate } from 'react-router-dom'

const Reserva = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-full flex-1 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-md p-8 w-full max-w-sm">
            <h1 className="text-2xl font-bold text-gray-800">Reserva</h1>
            <p className="text-center text-sm text-gray-500 mt-4">
        
            </p>
        </div>
    </div>
  )
}

export default Reserva