// src/js/animations.js
document.addEventListener('DOMContentLoaded', () => {
  // Beispiel: Weitere Animationen oder Interaktionen
  const buttons = document.querySelectorAll('.neon-button');
  buttons.forEach(button => {
    button.addEventListener('mouseenter', () => {
      button.style.boxShadow = '0 0 30px rgba(147, 51, 234, 1), 0 0 60px rgba(236, 72, 153, 0.8)';
    });
    button.addEventListener('mouseleave', () => {
      button.style.boxShadow = '0 0 15px rgba(147, 51, 234, 0.5), 0 0 30px rgba(236, 72, 153, 0.3)';
    });
  });
});