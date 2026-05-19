/**
 * EON · Scroll reveal + scroll stages
 *
 * Soporta dos patrones:
 *
 *  · .reveal           → fade-in una sola vez al entrar al viewport.
 *  · .scroll-stage     → aparece al entrar (.is-active) y se desvanece al
 *                        salir hacia arriba (.is-past). Si se vuelve a
 *                        scrollear para atrás, vuelve al estado inicial.
 *
 * Honra prefers-reduced-motion (todo arranca visible).
 */
(() => {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const supportsIO = typeof IntersectionObserver !== "undefined";

  // --- .reveal (una sola vez) ---
  const reveals = document.querySelectorAll(".reveal");
  if (reveals.length) {
    if (reduced || !supportsIO) {
      reveals.forEach((el) => el.classList.add("is-visible"));
    } else {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              io.unobserve(entry.target);
            }
          });
        },
        { rootMargin: "0px 0px -10% 0px", threshold: 0.12 }
      );
      reveals.forEach((el) => io.observe(el));
    }
  }

  // --- .scroll-stage (entra y sale) ---
  const stages = document.querySelectorAll(".scroll-stage");
  if (!stages.length) return;

  if (reduced || !supportsIO) {
    stages.forEach((el) => el.classList.add("is-active"));
    return;
  }

  const io2 = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const el = entry.target;
        if (entry.isIntersecting) {
          el.classList.add("is-active");
          el.classList.remove("is-past");
        } else {
          el.classList.remove("is-active");
          // Si el elemento ya pasó hacia arriba, le ponemos is-past.
          // Si todavía está debajo del viewport, queda en estado inicial.
          if (entry.boundingClientRect.top < 0) {
            el.classList.add("is-past");
          } else {
            el.classList.remove("is-past");
          }
        }
      });
    },
    {
      // Activa cuando el bloque entra al 80% central del viewport.
      // Esto da el efecto "queda visible un rato y se va".
      rootMargin: "-15% 0px -15% 0px",
      threshold: [0, 0.25, 0.5],
    }
  );

  stages.forEach((el) => io2.observe(el));
})();
