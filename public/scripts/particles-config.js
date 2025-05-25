// public/scripts/particles-config.js
console.log('particles-config.js loaded');

particlesJS('particles-js', {
  particles: {
    number: { value: 80, density: { enable: true, value_area: 800 } },
    color: { value: ['#9333ea', '#ec4899'] },
    shape: { type: 'circle' },
    opacity: { value: 0.5, random: true },
    size: { value: 3, random: true },
    line_linked: { enable: false },
    move: { enable: true, speed: 2, direction: 'none', random: true }
  },
  interactivity: {
    detect_on: 'canvas',
    events: { onhover: { enable: true, mode: 'repulse' }, onclick: { enable: true, mode: 'push' } },
    modes: { repulse: { distance: 100 }, push: { particles_nb: 4 } }
  },
  retina_detect: true
});