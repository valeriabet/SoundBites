import video from "../assets/background-video.mp4";

import CarruselReserva from "../Componentes/Reservas/CarruselReserva";

import SeccionPlatos from "./SeccionPlatos";

import Footer from "../Componentes/Layout/Footer";

const Home = () => {
    return (
        <>
            <section className="relative h-screen overflow-hidden">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                >
                    <source
                        src={video}
                        type="video/mp4"
                    />
                </video>

                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <div className="text-center text-white px-6">
                        <h1 className="text-5xl font-bold mb-4">
                            Sound Bites
                        </h1>

                        <p className="text-xl">
                            Música, comida y experiencias inolvidables
                        </p>
                    </div>
                </div>
            </section>
            <SeccionPlatos />

            <CarruselReserva />

            <Footer />
        </>
    );
};

export default Home;
