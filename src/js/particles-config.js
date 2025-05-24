// src/js/particles-config.js
if (typeof particlesJS !== 'undefined') {
  particlesJS('particles-js', {
    particles: {
      number: { value: 100, density: { enable: true, value_area: 800 } }, // 100 Partikel für Dichte
      color: { value: '#9333ea' }, // Neon-Purple
      shape: { type: 'circle' },
      opacity: { value: 0.4, random: true }, // Leichte Transparenz
      size: { value: 4, random: true }, // Größere Partikel
      move: { enable: true, speed: 1.5, direction: 'none', random: true, straight: false, out_mode: 'out' }
    },
    interactivity: {
      detect_on: 'canvas',
      events: { onhover: { enable: true, mode: 'grab' }, onclick: { enable: true, mode: 'push' }, resize: true },
      modes: { grab: { distance: 200, line_linked: { opacity: 0.5 } }, push: { particles_nb: 4 } }
    }
  });
  console.log('Particles initialized');
} else {
  console.error('particles.js nicht geladen. Stelle sicher, dass particles.min.js eingebunden ist.');
}