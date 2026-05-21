/**
 * Datos generales del sitio.
 * Edit acá para cambiar texto en head, footer, contacto, etc.
 */
export const site = {
  name: "EON",
  tagline: "Play the Future",
  description:
    "La casa del gaming y los esports en Asunción, Paraguay. Vive la experiencia definitiva con nuestra arena competitiva Tier 1, estaciones gamer, simuladores profesionales MOZA, cabinas de streaming y producción, acompañados de una exclusiva barra con la mejor gastronomía y coctelería. El siguiente nivel te espera.",
  url: "https://eon.play",
  email: "info@eonplaythefuture.com",
  address: {
    street: "Esq. Itapúa y Tte. Primero Nemesio Quiñónez",
    city: "Asunción",
    country: "Paraguay",
    lat: -25.261252,
    lng: -57.577279,
    mapsEmbed:
      "https://www.google.com/maps?q=-25.261252,-57.577279&z=17&output=embed",
    mapsLink:
      "https://www.google.com/maps/place/EON+-+PLAY+THE+FUTURE/@-25.261252,-57.577279,17z",
  },
  socials: {
    instagram: "https://www.instagram.com/eon.play/",
    x: "https://x.com/eonplay_",
    discord: "https://discord.gg/PJjKYauZpm",
  },
  // 1200x630 — placeholder SVG. Reemplazar por JPG/PNG real
  // (FB/IG no renderiza SVG en preview).
  ogImage: "/og-image.svg",
} as const;
