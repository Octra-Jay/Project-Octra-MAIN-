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
});