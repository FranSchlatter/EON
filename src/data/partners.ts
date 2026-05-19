/**
 * Lista de partners. Los logos van en /public/images/partners/.
 * Si no hay logo todavía, dejá el SVG placeholder.
 */
export type Partner = {
  name: string;
  logo: string;      // ruta a SVG/PNG transparente
  href?: string;
};

export const partners: Partner[] = [
  { name: "Partner 01", logo: "/images/partners/placeholder.svg" },
  { name: "Partner 02", logo: "/images/partners/placeholder.svg" },
  { name: "Partner 03", logo: "/images/partners/placeholder.svg" },
  { name: "Partner 04", logo: "/images/partners/placeholder.svg" },
  { name: "Partner 05", logo: "/images/partners/placeholder.svg" },
  { name: "Partner 06", logo: "/images/partners/placeholder.svg" },
];
