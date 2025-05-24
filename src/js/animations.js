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
document.addEventListener('DOMContentLoaded', () => {
  // Seitenübergang
  document.body.style.opacity = '0';
  setTimeout(() => {
    document.body.style.opacity = '1';
  }, 100);

  // Scroll-Animation für Karten und Felder
  const cards = document.querySelectorAll('.card');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  cards.forEach(card => observer.observe(card));
});
document.addEventListener('DOMContentLoaded', () => {
  // Seitenübergang
  document.body.style.opacity = '0';
  setTimeout(() => {
    document.body.style.opacity = '1';
  }, 100);

  // Scroll-Animation für Karten und Felder
  const cards = document.querySelectorAll('.card');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  cards.forEach(card => observer.observe(card));
});