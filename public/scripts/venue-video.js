/**
 * EON · Reproductor custom para el video del venue.
 *
 * Toma el marcado de VenueVideo.astro:
 *   · [data-player]            → contenedor (le togglamos is-playing / is-muted / is-fullscreen)
 *   · [data-video]             → el <video>
 *   · [data-bigplay]           → botón grande central (play cuando está pausado)
 *   · [data-action="…"]        → botones: playpause | back | fwd | mute | fullscreen
 *   · [data-seek]              → <input range> de progreso
 *   · [data-volume]            → <input range> de volumen
 *   · [data-time]              → texto "0:00 / 0:00"
 *
 * Sin librerías. Maneja play/pausa, ±10s, barra de progreso scrubbable,
 * volumen/mute, pantalla completa y atajos de teclado.
 */
(() => {
  document.querySelectorAll("[data-player]").forEach(setup);

  function setup(player) {
    const video = player.querySelector("[data-video]");
    if (!video) return;

    const seek = player.querySelector("[data-seek]");
    const volume = player.querySelector("[data-volume]");
    const timeEl = player.querySelector("[data-time]");
    const bigplay = player.querySelector("[data-bigplay]");

    // mm:ss (con horas si hiciera falta)
    const fmt = (s) => {
      if (!isFinite(s) || s < 0) s = 0;
      const total = Math.floor(s);
      const sec = (total % 60).toString().padStart(2, "0");
      const min = Math.floor(total / 60);
      return `${min}:${sec}`;
    };

    // Pinta el "relleno" neón de un range vía --fill (0–100%).
    const setFill = (input) => {
      if (!input) return;
      const min = Number(input.min) || 0;
      const max = Number(input.max) || 100;
      const pct = max > min ? ((Number(input.value) - min) / (max - min)) * 100 : 0;
      input.style.setProperty("--fill", `${pct}%`);
    };

    const updateTime = (cur) => {
      if (timeEl) timeEl.textContent = `${fmt(cur ?? video.currentTime)} / ${fmt(video.duration)}`;
    };

    const syncVolUI = () => {
      player.classList.toggle("is-muted", video.muted || video.volume === 0);
      if (volume) {
        volume.value = video.muted ? 0 : video.volume;
        setFill(volume);
      }
    };

    const togglePlay = () => {
      if (video.paused) video.play();
      else video.pause();
    };

    const toggleFs = () => {
      if (document.fullscreenElement) document.exitFullscreen?.();
      else player.requestFullscreen?.();
    };

    // --- Estado inicial (el video arranca en autoplay + muted) ---
    player.classList.toggle("is-playing", !video.paused);
    syncVolUI();
    updateTime(0);

    // --- Play / pausa ---
    video.addEventListener("play", () => player.classList.add("is-playing"));
    video.addEventListener("pause", () => player.classList.remove("is-playing"));
    video.addEventListener("click", togglePlay);
    if (bigplay) bigplay.addEventListener("click", togglePlay);

    // --- Botones de acción ---
    player.querySelectorAll("[data-action]").forEach((btn) => {
      btn.addEventListener("click", () => {
        switch (btn.dataset.action) {
          case "playpause":
            togglePlay();
            break;
          case "back":
            video.currentTime = Math.max(0, video.currentTime - 10);
            break;
          case "fwd":
            video.currentTime = Math.min(video.duration || Infinity, video.currentTime + 10);
            break;
          case "mute":
            video.muted = !video.muted;
            if (!video.muted && video.volume === 0) video.volume = 0.5;
            syncVolUI();
            break;
          case "fullscreen":
            toggleFs();
            break;
        }
      });
    });

    // --- Progreso ---
    let scrubbing = false;
    video.addEventListener("timeupdate", () => {
      if (!scrubbing && seek && video.duration) {
        seek.value = (video.currentTime / video.duration) * 100;
        setFill(seek);
      }
      updateTime();
    });
    video.addEventListener("loadedmetadata", () => updateTime(0));
    video.addEventListener("durationchange", () => updateTime());

    if (seek) {
      setFill(seek);
      seek.addEventListener("input", () => {
        scrubbing = true;
        setFill(seek);
        if (video.duration) updateTime((seek.value / 100) * video.duration);
      });
      seek.addEventListener("change", () => {
        if (video.duration) video.currentTime = (seek.value / 100) * video.duration;
        scrubbing = false;
      });
    }

    // --- Volumen ---
    if (volume) {
      volume.addEventListener("input", () => {
        video.volume = Number(volume.value);
        video.muted = Number(volume.value) === 0;
        syncVolUI();
      });
    }
    video.addEventListener("volumechange", syncVolUI);

    // --- Pantalla completa ---
    document.addEventListener("fullscreenchange", () => {
      player.classList.toggle("is-fullscreen", document.fullscreenElement === player);
    });

    // --- Atajos de teclado (solo cuando el marco tiene foco, no un control) ---
    player.setAttribute("tabindex", "0");
    player.addEventListener("keydown", (e) => {
      if (e.target !== player) return;
      switch (e.key) {
        case " ":
        case "k":
          e.preventDefault();
          togglePlay();
          break;
        case "ArrowLeft":
          e.preventDefault();
          video.currentTime = Math.max(0, video.currentTime - 10);
          break;
        case "ArrowRight":
          e.preventDefault();
          video.currentTime = Math.min(video.duration || Infinity, video.currentTime + 10);
          break;
        case "m":
          video.muted = !video.muted;
          if (!video.muted && video.volume === 0) video.volume = 0.5;
          syncVolUI();
          break;
        case "f":
          toggleFs();
          break;
      }
    });
  }
})();
