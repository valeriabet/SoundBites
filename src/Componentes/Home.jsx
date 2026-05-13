import video from "../assets/background-video.mp4";
import CarruselReserva from "./CarruselReserva";
const Home = () => {
  return (
    <>
      <div className="min-h-full flex-1 flex flex-col  justify-center text-center">
        <video
          src={video}
          autoPlay
          loop
          muted
          className="w-1200 h-auto"
        ></video>

        <div className="hero_text absolute flex flex-col">
          <h1 className="text-3xl font-bold text-gray-800">SoundBites</h1>
          <p className="text-white   mt-2 max-w-md">
            Bienvenido. Usa el menú superior para navegar o inicia sesión cuando
            quieras.
          </p>
        </div>
      </div>
      <div id="reserva"></div>

      <CarruselReserva></CarruselReserva>
    </>
  );
};
export default Home;
