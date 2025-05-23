// Scroll-Animation für Hauptbereich
document.addEventListener('DOMContentLoaded', () => {
  const main = document.querySelector('main');
  main.style.opacity = '0';
  main.style.transform = 'translateY(20px)';
  setTimeout(() => {
    main.style.transition = 'opacity 1s ease, transform 1s ease';
    main.style.opacity = '1';
    main.style.transform = 'translateY(0)';
  }, 100);
});