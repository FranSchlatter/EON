/**
 * EON · Custom cursor (mira estilo CS2)
 *
 * - Solo se activa en dispositivos con puntero fino (mouse/trackpad).
 * - Honra `prefers-reduced-motion`: si está reducido, no se activa.
 * - Usa requestAnimationFrame + translate3d para no disparar reflow.
 * - Se desactiva al primer evento `touchstart` (hybrid devices).
 */

(() => {
  const mqFine = window.matchMedia("(pointer: fine)");
  const mqReduced = window.matchMedia("(prefers-reduced-motion: reduce)");

  if (!mqFine.matches || mqReduced.matches) return;

  // Crear elementos: outer ring + inner dot + crosshair lines
  const root = document.createElement("div");
  root.className = "eon-cursor";
  root.setAttribute("aria-hidden", "true");
  root.innerHTML = `
    <span class="eon-cursor__ring"></span>
    <span class="eon-cursor__dot"></span>
    <span class="eon-cursor__line eon-cursor__line--top"></span>
    <span class="eon-cursor__line eon-cursor__line--right"></span>
    <span class="eon-cursor__line eon-cursor__line--bottom"></span>
    <span class="eon-cursor__line eon-cursor__line--left"></span>
  `;
  document.body.appendChild(root);
  document.body.classList.add("has-custom-cursor");

  let targetX = window.innerWidth / 2;
  let targetY = window.innerHeight / 2;
  let currentX = targetX;
  let currentY = targetY;
  let rafId = 0;

  const onMove = (e) => {
    targetX = e.clientX;
    targetY = e.clientY;
    if (!rafId) tick();
  };

  const tick = () => {
    // Easing leve para que la mira no se sienta rígida (factor 0.35 = casi 1:1)
    currentX += (targetX - currentX) * 0.35;
    currentY += (targetY - currentY) * 0.35;
    root.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;

    if (Math.abs(targetX - currentX) > 0.1 || Math.abs(targetY - currentY) > 0.1) {
      rafId = requestAnimationFrame(tick);
    } else {
      rafId = 0;
    }
  };

  // Estados: hover sobre elementos interactivos → expandir mira
  const interactiveSel = "a, button, input, textarea, select, label, [role='button']";
  const onPointerOver = (e) => {
    if (e.target.closest(interactiveSel)) root.classList.add("is-hover");
  };
  const onPointerOut = (e) => {
    if (e.target.closest(interactiveSel)) root.classList.remove("is-hover");
  };
  const onMouseDown = () => root.classList.add("is-down");
  const onMouseUp = () => root.classList.remove("is-down");

  // Si aparece touch (hybrid laptop con pantalla táctil), apagamos el cursor
  const onTouch = () => {
    cleanup();
  };

  const cleanup = () => {
    window.removeEventListener("pointermove", onMove);
    document.removeEventListener("pointerover", onPointerOver);
    document.removeEventListener("pointerout", onPointerOut);
    document.removeEventListener("mousedown", onMouseDown);
    document.removeEventListener("mouseup", onMouseUp);
    window.removeEventListener("touchstart", onTouch);
    document.body.classList.remove("has-custom-cursor");
    root.remove();
  };

  window.addEventListener("pointermove", onMove, { passive: true });
  document.addEventListener("pointerover", onPointerOver);
  document.addEventListener("pointerout", onPointerOut);
  document.addEventListener("mousedown", onMouseDown);
  document.addEventListener("mouseup", onMouseUp);
  window.addEventListener("touchstart", onTouch, { once: true, passive: true });

  // Si el usuario sale de la ventana, ocultamos
  document.addEventListener("mouseleave", () => (root.style.opacity = "0"));
  document.addEventListener("mouseenter", () => (root.style.opacity = "1"));
})();
