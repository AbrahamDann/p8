// ==========================================
// THEME SWITCHER
// TODO: Implement theme switching with localStorage
// ==========================================

const themeToggle = document.querySelector('.theme-toggle');
const root = document.documentElement;

let currentTheme = 'light';
try { currentTheme = localStorage.getItem('theme') === 'dark' ? 'dark' : 'light'; } catch { /* Storage may be unavailable. */ }
root.setAttribute('data-theme', currentTheme);
themeToggle.setAttribute('aria-pressed', String(currentTheme === 'dark'));

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
themeToggle.addEventListener('click', () => {
    const theme = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', theme);
    themeToggle.setAttribute('aria-pressed', String(theme === 'dark'));
    try { localStorage.setItem('theme', theme); } catch { /* Theme still works for this session. */ }
    if (!reducedMotion.matches) themeToggle.classList.add('spinning');
});
themeToggle.addEventListener('animationend', () => themeToggle.classList.remove('spinning'));

// ==========================================
// SMOOTH SCROLLING FOR NAVIGATION
// ==========================================

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();

        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: reducedMotion.matches ? 'auto' : 'smooth',
                block: 'start'
            });
        }

        // Update active nav link
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        this.classList.add('active');
    });
});

// ==========================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// TODO: Implement scroll-triggered animations
// ==========================================

if ('IntersectionObserver' in window && !reducedMotion.matches) {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    document.querySelectorAll('.animate-on-scroll, .stagger-children').forEach(el => observer.observe(el));
    root.classList.add('scroll-animations');
}

// Content stays visible when animation support is unavailable.

// ==========================================
// PARALLAX EFFECT
// TODO: Implement parallax scrolling for hero section
// ==========================================

// TODO: Add scroll event listener for parallax effect

// ==========================================
// TYPING ANIMATION
// TODO: Implement typing effect for hero title
// ==========================================

// TODO: Create typing animation function

// ==========================================
// PROJECT CARD INTERACTIONS
// ==========================================

// Add click handlers to project cards for more interactivity
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', function() {
        // You can add modal or expand functionality here
        console.log('Project clicked:', this.querySelector('h3').textContent);
    });
});

// ==========================================
// NAVBAR SCROLL EFFECT
// ==========================================

window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
    }
});

// ==========================================
// PERFORMANCE OPTIMIZATION
// ==========================================

// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// TODO: Apply debounce to scroll event handlers