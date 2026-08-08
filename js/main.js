/**
 * main.js
 * Ponto de entrada geral do site. shader.js e embers.js já se
 * auto-inicializam; use este arquivo para lógica futura que envolva
 * outras seções (navegação, formulário de contato, scroll reveals etc.).
 */
document.addEventListener("DOMContentLoaded", () => {
  // Transição suave entre seções: elementos com a classe .reveal
  // ganham .is-visible ao entrarem na viewport.
  const revealEls = document.querySelectorAll(".reveal");
  if (!revealEls.length) return;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (prefersReducedMotion || typeof IntersectionObserver === "undefined") {
    revealEls.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2, rootMargin: "0px 0px -10% 0px" }
  );

  revealEls.forEach((el) => observer.observe(el));
});