# EON · Landing

Landing one-page para el gaming center EON. Astro + HTML/CSS/JS vanilla, generación 100 % estática.

## Stack

- **Astro 5** · output static (compila a HTML/CSS/JS planos, ideal Hostinger).
- **CSS vanilla** con design tokens centralizados en `src/styles/tokens.css`.
- **JS vanilla** sin framework. Tres scripts en `public/scripts/`:
  - `cursor.js` — mira CS2 (solo desktop, honra `prefers-reduced-motion`)
  - `scroll-reveal.js` — IntersectionObserver
  - `reservation.js` — envío del form vía Web3Forms (encapsulado, fácil swap)

## Estructura

```
src/
  layouts/BaseLayout.astro   ← <head>, SEO, fuentes, slot
  pages/index.astro          ← arma las secciones en orden
  components/                ← Header, Hero, Marquee, Venue*, Partners, etc.
  data/                      ← textos editables (site, nav, venue, partners)
  styles/                    ← tokens.css, global.css, animations.css
public/
  scripts/                   ← JS vanilla (cargado con type=module)
  images/                    ← assets estáticos
  videos/                    ← video del venue (cuando llegue)
```

## Comandos

```bash
npm install          # primera vez
npm run dev          # servidor local en http://localhost:4321
npm run build        # output a /dist
npm run preview      # sirve /dist localmente
```

## Configuración rápida

1. **Web3Forms** (formulario de reservas):
   - Cuenta gratis en https://web3forms.com
   - Copiá tu access key
   - Renombrá `.env.example` → `.env` y pegá la key en `PUBLIC_WEB3FORMS_KEY=...`

2. **Datos del venue:** editá `src/data/site.ts` (dirección, email, teléfono, redes, Maps embed).

3. **Textos del venue:** `src/data/venue.ts` (5 bloques + marquee + tipos de evento).

4. **Partners:** `src/data/partners.ts` y subí los logos a `public/images/partners/`.

5. **Logo / fuentes / paleta:** todo en `src/styles/tokens.css` (cambiás 3 líneas y se actualiza todo el sitio).

## Reemplazar assets

| Asset | Dónde va |
|---|---|
| Logo SVG oficial | `public/images/logo.svg` y reemplazar `src/components/Logo.astro` por `<img>` |
| Foto del hero | `public/images/hero.jpg` y cambiar `.hero__bg` en `Hero.astro` por `<img>` |
| Fotos del venue (5) | `public/images/venue/{zona-gaming,gastronomia,arena,simuladores,streaming}.jpg` |
| Video del venue | `public/videos/venue.mp4` + setear `hasVideo = true` en `VenueVideo.astro` |
| OG image | `public/og-image.jpg` (1200×630) y actualizar `site.ogImage` |
| Favicon | `public/favicon.svg` (ya existe placeholder) |

## Deploy a Hostinger

1. `npm run build`
2. Subí **todo el contenido** de `dist/` a `public_html/` en Hostinger (vía FTP o File Manager).
3. Listo — no requiere Node ni PHP en el servidor.

## Notas técnicas

- **Mobile-first:** breakpoints en 480, 720, 860, 960, 1024px.
- **Performance:** sin JS de framework, imágenes lazy, fuentes con `display=swap`, scripts `type=module` no bloqueantes.
- **Accesibilidad:** `prefers-reduced-motion` honrado en todas las animaciones; cursor custom solo en `pointer: fine`; labels y aria-labels en form y nav.
- **SEO:** meta tags + Open Graph + Twitter Cards + JSON-LD `EntertainmentBusiness`.
