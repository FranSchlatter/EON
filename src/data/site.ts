/**
 * Datos generales del sitio.
 * Edit acá para cambiar texto en head, footer, contacto, etc.
 */
export const site = {
  name: "EON",
  tagline: "Play the Future",
  description:
    "EON · Gaming center premium en Buenos Aires. Zona gaming de élite, arena tier 1, simuladores profesionales, cabina de streaming, gastronomía y cocktails. Eventos corporativos, cumpleaños y comunidades gaming.",
  url: "https://eon.play",
  email: "reservas@eon.play",
  phone: "+54 11 0000-0000",
  address: {
    street: "Av. Placeholder 1234",
    city: "Ciudad Autónoma de Buenos Aires",
    country: "Argentina",
    // Lat/lng para JSON-LD (reemplazar con coords reales)
    lat: -34.6037,
    lng: -58.3816,
    // Embed src del iframe de Google Maps (reemplazar)
    mapsEmbed:
      "https://www.google.com/maps?q=Buenos+Aires+Argentina&z=14&output=embed",
    mapsLink: "https://www.google.com/maps?q=Buenos+Aires+Argentina",
  },
  socials: {
    instagram: "https://www.instagram.com/eon.play/",
    x: "https://x.com/eon_play",
  },
  // 1200x630 — placeholder SVG. Reemplazar por JPG/PNG real
  // (FB/IG no renderiza SVG en preview).
  ogImage: "/og-image.svg",
} as const;
