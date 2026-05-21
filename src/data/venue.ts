/**
 * Contenido de los 5 bloques de la sección Venue.
 * Cada bloque ahora soporta múltiples imágenes — slider con flechas dentro
 * del bloque. Para sumar más fotos por área basta con agregar paths al array.
 */
export type VenueBlock = {
  id: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  body: string;
  images: { src: string; alt: string }[];
};

export const venueBlocks: VenueBlock[] = [
  {
    id: "zona-gaming",
    eyebrow: "01 · Zona Gaming",
    title: "Tu setup de ensueño",
    subtitle: "12 estaciones de élite",
    body:
      "12 estaciones de élite equipadas con lo último en hardware. El espacio ideal para quienes buscan el máximo rendimiento y una ventaja competitiva real en cada clic.",
    images: [
      { src: "/images/EON_Setups.png", alt: "Zona Gaming en EON — setup 1" },
      { src: "/images/EON_Setups.png", alt: "Zona Gaming en EON — setup 2" },
      { src: "/images/EON_Setups.png", alt: "Zona Gaming en EON — setup 3" },
      { src: "/images/EON_Setups.png", alt: "Zona Gaming en EON — setup 4" },
    ],
  },
  {
    id: "gastronomia",
    eyebrow: "02 · Gastronomía & Cocktails",
    title: "Sabor que impulsa",
    subtitle: "Cocina y mixología de autor",
    body:
      "Recargá energías con una propuesta gourmet y mixología de autor diseñada para acompañar tus sesiones de juego más exigentes.",
    images: [
      { src: "/images/EON_Barra.png", alt: "Gastronomía & Cocktails de EON — barra 1" },
      { src: "/images/EON_Barra.png", alt: "Gastronomía & Cocktails de EON — barra 2" },
      { src: "/images/EON_Barra.png", alt: "Gastronomía & Cocktails de EON — barra 3" },
      { src: "/images/EON_Barra.png", alt: "Gastronomía & Cocktails de EON — barra 4" },
    ],
  },
  {
    id: "arena",
    eyebrow: "03 · Arena Tier 1",
    title: "Donde nacen los campeones",
    subtitle: "Stage 5v5, 100 espectadores",
    body:
      "Sentí la presión del directo en nuestro stage 5v5. Un escenario profesional con capacidad para 100 espectadores, diseñado para convertir cada partida en un evento inolvidable.",
    images: [
      { src: "/images/EON_Arena.png", alt: "Arena Tier 1 de EON — arena 1" },
      { src: "/images/EON_Arena.png", alt: "Arena Tier 1 de EON — arena 2" },
      { src: "/images/EON_Arena.png", alt: "Arena Tier 1 de EON — arena 3" },
      { src: "/images/EON_Arena.png", alt: "Arena Tier 1 de EON — arena 4" },
    ],
  },
  {
    id: "simuladores",
    eyebrow: "04 · Simuladores Profesionales",
    title: "Inmersión absoluta",
    subtitle: "Simuladores de alta gama",
    body:
      "Sentí la adrenalina en cada curva con tecnología de simulación de alta gama. El realismo del asfalto llevado al siguiente nivel.",
    images: [
      { src: "/images/EON_Simuladores.png", alt: "Simuladores Profesionales en EON — simulador 1" },
      { src: "/images/EON_Simuladores.png", alt: "Simuladores Profesionales en EON — simulador 2" },
      { src: "/images/EON_Simuladores.png", alt: "Simuladores Profesionales en EON — simulador 3" },
      { src: "/images/EON_Simuladores.png", alt: "Simuladores Profesionales en EON — simulador 4" },
    ],
  },
  {
    id: "streaming",
    eyebrow: "05 · Cabina de Streaming",
    title: "Tu estudio, tus reglas",
    subtitle: "Broadcasting profesional",
    body:
      "Espacios privados y totalmente equipados con tecnología de broadcasting profesional. Llevá tu contenido a un nivel superior.",
    images: [
      { src: "/images/EON_Streaming.png", alt: "Cabina de Streaming de EON — cabina 1" },
      { src: "/images/EON_Streaming.png", alt: "Cabina de Streaming de EON — cabina 2" },
      { src: "/images/EON_Streaming.png", alt: "Cabina de Streaming de EON — cabina 3" },
      { src: "/images/EON_Streaming.png", alt: "Cabina de Streaming de EON — cabina 4" },
    ],
  },
];

/**
 * Sección "Otros servicios" — EON Mobile.
 * Bloque único (texto + slider) que va entre Venue y Partners.
 */
export const otherServices = {
  eyebrow: "— Otros servicios",
  title: "EON Mobile",
  subtitle: "La potencia EON, en tu domicilio o evento.",
  body:
    "Alquilá hardware de élite con instalación profesional incluida. Nos encargamos del setup completo para que tu evento sea, simplemente, legendario.",
  features: [
    "Traslado inmediato",
    "Montaje y puesta a punto",
    "Asistencia técnica constante",
  ],
  cta: { label: "Consultar", href: "/reservas" },
  images: [
    { src: "/images/EON_OtrosServicios_1.JPG", alt: "EON Mobile — hardware de élite a domicilio 1" },
    { src: "/images/EON_OtrosServicios_2.JPG", alt: "EON Mobile — montaje profesional en evento 2" },
    { src: "/images/EON_OtrosServicios_3.JPG", alt: "EON Mobile — setup completo instalado 3" },
  ],
} as const;

/** Items del marquee horizontal */
export const marqueeItems = [
  "eventos de empresa",
  "streaming",
  "comunidades gaming",
  "esports",
  "cumpleaños",
  "fiestas de fin de año",
  "podcast",
  "conferencias",
] as const;

/** Opciones del <select> del formulario de reservas */
export const eventTypes = [
  { value: "corporativo", label: "Evento corporativo" },
  { value: "cumpleanos", label: "Cumpleaños" },
  { value: "fin-de-anio", label: "Fiesta de fin de año" },
  { value: "streaming", label: "Sesión de streaming" },
  { value: "podcast", label: "Podcast / grabación" },
  { value: "comunidad", label: "Comunidad gaming / esports" },
  { value: "torneo", label: "Torneo / competencia" },
  { value: "alquiler-domicilio", label: "Alquiler PC / Simuladores a domicilio" },
  { value: "fiesta-dj", label: "Fiestas / DJ presentation" },
  { value: "otro", label: "Otro" },
] as const;
