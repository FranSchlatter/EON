/**
 * Links de navegación del header y del footer.
 * Hrefs internos al index usan #anchor; reservas vive en su propia página.
 */
export const navLinks = [
  { label: "Venue",      href: "/#venue" },
  { label: "Partners",   href: "/#partners" },
  { label: "Reservas",   href: "/reservas" },
  { label: "Dirección",  href: "/#direccion" },
] as const;
