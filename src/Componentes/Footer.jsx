const FontLoader = () => (
  <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap');
    `}</style>
);

const SOCIAL = [
  {
    label: "Facebook",
    path: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z",
  },
  {
    label: "Instagram",
    path: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01M6.5 2h11A4.5 4.5 0 0 1 22 6.5v11a4.5 4.5 0 0 1-4.5 4.5h-11A4.5 4.5 0 0 1 2 17.5v-11A4.5 4.5 0 0 1 6.5 2z",
  },
  {
    label: "WhatsApp",
    path: "M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z",
  },
  {
    label: "Email",
    path: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6",
  },
];

const MAPA = [
  "Menú",
  "Domicilios",
  "Reserva",
  "Nuestra historia",
  "Eventos",
  "Trabaja con nosotros",
];

const FooterLink = ({ label }) => (
  <li>
    <a
      href="#"
      className="flex items-center gap-2 text-[0.88rem] text-white/60 hover:text-orange-400 transition-colors duration-200 no-underline"
      style={{ fontFamily: "'Nunito', sans-serif" }}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-orange-400 shrink-0" />
      {label}
    </a>
  </li>
);

const Footer = () => (
  <>
    <FontLoader />
    <footer
      className="pt-14"
      style={{ backgroundColor: "#1a1a2e", fontFamily: "'Nunito', sans-serif" }}
    >
      <div className="max-w-5xl mx-auto px-8 grid grid-cols-2 gap-16">
        {/* Logo, descripción y redes */}
        <div>
          <div className="mb-4">
            <span className="block text-[1.8rem] font-black text-white leading-none">
              SoundBites
            </span>
            <div className="flex items-center gap-2 mt-1.5">
              <div className="h-px w-7 bg-orange-400" />
              <span className="text-[0.6rem] tracking-[0.3em] uppercase text-orange-400">
                Restaurante & Música
              </span>
              <div className="h-px w-7 bg-orange-400" />
            </div>
          </div>

          <div className="flex gap-3">
            {SOCIAL.map(({ label, path }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center transition-all duration-200 hover:border-orange-400 hover:bg-orange-400/10"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d={path} />
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* Mapa del sitio */}
        <div>
          <h3 className="text-[1.1rem] font-black text-white mb-5">
            Mapa del sitio
          </h3>
          <ul className="flex flex-col gap-3">
            {MAPA.map((item) => (
              <FooterLink key={item} label={item} />
            ))}
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-12 border-t border-white/10 py-5 text-center">
        <p className="text-[0.78rem] text-white/40 tracking-wide">
          2025. Todos los derechos reservados. SoundBites Restaurante & Música
        </p>
      </div>
    </footer>
  </>
);

export default Footer;
