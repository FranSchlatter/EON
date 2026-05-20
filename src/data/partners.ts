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
  { name: "Meta Esports", logo: "/images/partners/EON_MetaEsports.png" },
  { name: "Toyo Esports", logo: "/images/partners/EON_ToyoEsports.png" },
];
