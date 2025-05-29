// public/scripts/animations.js
console.log('animations.js loaded');

document.addEventListener('DOMContentLoaded', () => {
    // Initiale Fade-In-Animationen
    const initialElements = document.querySelectorAll('.animate-hero-load, .animate-nav-load');
    initialElements.forEach(el => {
        el.style.opacity = '0';
        setTimeout(() => {
            el.style.opacity = '1';
            el.classList.add('animate__animated', 'animate__fadeIn');
        }, 100);
    });
    
    // Scroll-Animation
    const scrollElements = document.querySelectorAll('.scroll-animate');
    if (!scrollElements.length) {
        console.warn('Keine scroll-animate Elemente gefunden');
        return;
    }
    
    // Fallback: Zeige Elemente, falls IntersectionObserver fehlschlägt
    scrollElements.forEach(el => {
        el.style.opacity = '0';
        el.style.visibility = 'visible'; // Immer sichtbar, wird per opacity gesteuert
    });
    
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const animation = el.dataset.animation;
                    
                    if (animation === 'typing') {
                        // Typing-Effekt
                        const text = el.textContent;
                        el.textContent = '';
                        el.style.opacity = '1';
                        let i = 0;
                        const type = () => {
                            if (i < text.length) {
                                el.textContent += text.charAt(i);
                                i++;
                                setTimeout(type, 50);
                            }
                        };
                        type();
                    } else if (animation === 'fade') {
                        // Fade-In
                        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                        el.style.opacity = '1';
                        el.style.transform = 'translateY(0)';
                    }
                    
                    observer.unobserve(el);
                    console.log(`Animation ${animation} ausgeführt für`, el.tagName, el.textContent?.substring(0, 20));
                }
            });
        }, { threshold: 0.1 }); // Niedrigerer Threshold für früheres Triggern
        
        scrollElements.forEach(el => {
            el.style.transform = 'translateY(20px)'; // Startposition für Fade
            observer.observe(el);
        });
    } else {
        // Fallback: Zeige alle Elemente ohne Animation
        scrollElements.forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
            console.warn('IntersectionObserver nicht verfügbar, Fallback für', el.tagName);
        });
    }
    
    // Ambient Animation: Interaktive Neon-Glows auf Mausbewegung
    const main = document.querySelector('.octra-main');
    if (main) {
      main.addEventListener('mousemove', e => {
        const x = e.offsetX / main.offsetWidth;
        const y = e.offsetY / main.offsetHeight;
        main.style.boxShadow = `0 0 48px 8px #8f5fff44, ${40 * (x - 0.5)}px ${40 * (y - 0.5)}px 64px #c7aaff33`;
        if (Math.random() > 0.97) {
          main.style.filter = 'hue-rotate(10deg) blur(0.5px)';
          setTimeout(()=>main.style.filter='', 120);
        }
      });
      main.addEventListener('mouseleave', () => {
        main.style.boxShadow = '';
        main.style.filter = '';
      });
    }
    // Card-Glitch-Effect
    const cards = document.querySelectorAll('.octra-card');
    cards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'scale(1.09) rotate(-2deg)';
        card.style.boxShadow = '0 0 48px #8f5fffcc, 0 0 8px #fff8';
        if (Math.random() > 0.8) {
          card.style.filter = 'hue-rotate(-10deg) blur(0.5px)';
          setTimeout(()=>card.style.filter='', 100);
        }
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.boxShadow = '';
        card.style.filter = '';
      });
    });
    // Parallax Ambient
    const ambient = document.getElementById('octra-ambient');
    if (ambient) {
      window.addEventListener('mousemove', e => {
        const x = (e.clientX / window.innerWidth - 0.5) * 10;
        const y = (e.clientY / window.innerHeight - 0.5) * 10;
        ambient.style.transform = `translate(${x}px, ${y}px)`;
        if (Math.random() > 0.98) {
          ambient.style.filter = 'blur(1.5px)';
          setTimeout(()=>ambient.style.filter='', 100);
        }
      });
    }
});