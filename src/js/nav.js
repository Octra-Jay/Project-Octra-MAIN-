document.addEventListener('DOMContentLoaded', () => {
  console.log('nav.js geladen');

  // Nav-Links in Header und Mobile-Navbar
  const navLinks = document.querySelectorAll('header nav a, nav.md\\:hidden a');
  
  if (!navLinks.length) {
    console.warn('Keine Nav-Links gefunden');
    return;
  }

  console.log('Nav-Links gefunden:', navLinks.length);

  // Event-Listener für Nav-Links
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      console.log('Nav-Link geklickt:', link.href);
      // Optional: Smooth-Transition oder Highlight
      navLinks.forEach(l => l.classList.remove('text-[#00c6ff]'));
      link.classList.add('text-[#00c6ff]');
    });
  });
});