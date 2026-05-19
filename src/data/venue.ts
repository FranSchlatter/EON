/**
 * Contenido de los 5 bloques de la sección Venue.
 * Textos exactos del briefing.
 * Reemplazar `image` por la foto definitiva cuando llegue.
 */
export type VenueBlock = {
  id: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  body: string;
  image: string;
  imageAlt: string;
};

export const venueBlocks: VenueBlock[] = [
  {
    id: "zona-gaming",
    eyebrow: "01 · Zona Gaming",
    title: "Tu setup de ensueño",
    subtitle: "20 estaciones de élite",
    body:
      "20 estaciones de élite equipadas con lo último en hardware. El espacio ideal para quienes buscan el máximo rendimiento y una ventaja competitiva real en cada clic.",
    image: "/images/venue/zona-gaming.jpg",
    imageAlt: "Zona Gaming en EON — estaciones gaming de alto rendimiento",
  },
  {
    id: "gastronomia",
    eyebrow: "02 · Gastronomía & Cocktails",
    title: "Sabor que impulsa",
    subtitle: "Cocina y mixología de autor",
    body:
      "Recargá energías con una propuesta gourmet y mixología de autor diseñada para acompañar tus sesiones de juego más exigentes.",
    image: "/images/venue/gastronomia.jpg",
    imageAlt: "Gastronomía & Cocktails de EON — cocktail neón sobre barra",
  },
  {
    id: "arena",
    eyebrow: "03 · Arena Tier 1",
    title: "Donde nacen los campeones",
    subtitle: "Stage 5v5, 100 espectadores",
    body:
      "Sentí la presión del directo en nuestro stage 5v5. Un escenario profesional con capacidad para 100 espectadores, diseñado para convertir cada partida en un evento inolvidable.",
    image: "/images/venue/arena.jpg",
    imageAlt: "Arena Tier 1 de EON — escenario competitivo 5v5",
  },
  {
    id: "simuladores",
    eyebrow: "04 · Simuladores Profesionales",
    title: "Inmersión absoluta",
    subtitle: "Simuladores de alta gama",
    body:
      "Sentí la adrenalina en cada curva con tecnología de simulación de alta gama. El realismo del asfalto llevado al siguiente nivel.",
    image: "/images/venue/simuladores.jpg",
    imageAlt: "Simuladores Profesionales en EON — cabina de simulación racing",
  },
  {
    id: "streaming",
    eyebrow: "05 · Cabina de Streaming",
    title: "Tu estudio, tus reglas",
    subtitle: "Broadcasting profesional",
    body:
      "Espacios privados y totalmente equipados con tecnología de broadcasting profesional. Llevá tu contenido a un nivel superior.",
    image: "/images/venue/streaming.jpg",
    imageAlt: "Cabina de Streaming de EON — estudio privado equipado",
  },
];

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
  { value: "otro", label: "Otro" },
] as const;
