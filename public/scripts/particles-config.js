// public/scripts/particles-config.js
if (typeof particlesJS !== 'undefined') {
  particlesJS('particles-js', {
    particles: {
      number: { value: 150, density: { enable: true, value_area: 800 } },
      color: { value: ['#9333ea', '#ec4899'] },
      shape: { type: 'circle' },
      opacity: { value: 0.5, random: true, anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false } },
      size: { value: 5, random: true },
      line_linked: { enable: true, distance: 120, color: '#9333ea', opacity: 0.4, width: 1 },
      move: { enable: true, speed: 1, direction: 'none', random: true, straight: false, out_mode: 'out' }
    },
    interactivity: {
      detect_on: 'canvas',
      events: { onhover: { enable: true, mode: 'grab' }, onclick: { enable: true, mode: 'push' }, resize: true },
      modes: { grab: { distance: 200, line_linked: { opacity: 0.7 } }, push: { particles_nb: 4 } }
    }
  });
  console.log('Particles initialized');
} else {
  console.error('particles.js nicht geladen. Stelle sicher, dass particles.min.js eingebunden ist.');
}