/**
 * embers.js
 * Cria partículas de "brasa" flutuantes dentro de #embers-layer,
 * usando a Web Animations API para performance.
 */
(function initEmbers() {
  const container = document.getElementById("embers-layer");
  if (!container) return;

  const EMBER_COUNT = 30;
  const EMBER_COLORS = ["#f9ffab", "#a00185"];

  for (let i = 0; i < EMBER_COUNT; i++) {
    const ember = document.createElement("div");

    const size = Math.random() * 4 + 2; // 2px a 6px
    const posX = Math.random() * 100; // 0% a 100%
    const posY = Math.random() * 100; // 0% a 100%
    const delay = Math.random() * 5; // 0s a 5s
    const duration = Math.random() * 4 + 3; // 3s a 7s
    const opacity = Math.random() * 0.6 + 0.2;
    const color = EMBER_COLORS[Math.floor(Math.random() * EMBER_COLORS.length)];

    ember.style.position = "absolute";
    ember.style.left = `${posX}%`;
    ember.style.top = `${posY}%`;
    ember.style.width = `${size}px`;
    ember.style.height = `${size}px`;
    ember.style.backgroundColor = color;
    ember.style.borderRadius = "50%";
    ember.style.boxShadow = `0 0 ${size * 2}px ${color}`;
    ember.style.opacity = String(opacity);

    ember.animate(
      [
        { transform: "translate(0, 0) scale(1)", opacity },
        {
          transform: `translate(${Math.random() * 100 - 50}px, -${
            Math.random() * 150 + 50
          }px) scale(0)`,
          opacity: 0,
        },
      ],
      {
        duration: duration * 1000,
        delay: delay * 1000,
        iterations: Infinity,
        easing: "cubic-bezier(0.25, 1, 0.5, 1)",
      }
    );

    container.appendChild(ember);
  }
})();
