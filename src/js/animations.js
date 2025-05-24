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
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, 100);
      }
    });
  }, { threshold: 0.1 });
  
  cards.forEach(card => observer.observe(card));
});