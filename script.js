/* script.js — Modern nav + scroll behavior + dark mode */
const bar    = document.getElementById('bar');
const close  = document.getElementById('close');
const nav    = document.getElementById('navbar');

// Create mobile overlay
let overlay = document.getElementById('nav-overlay');
if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'nav-overlay';
    overlay.style.cssText = `
        position:fixed;top:0;left:0;width:100%;height:100%;
        background:rgba(0,0,0,0.45);z-index:998;
        opacity:0;pointer-events:none;
        transition:opacity 0.3s ease;`;
    document.body.appendChild(overlay);
}

function openNav() {
    if (nav) nav.classList.add('active');
    overlay.style.opacity = '1';
    overlay.style.pointerEvents = 'auto';
    document.body.style.overflow = 'hidden';
}

function closeNav() {
    if (nav) nav.classList.remove('active');
    overlay.style.opacity = '0';
    overlay.style.pointerEvents = 'none';
    document.body.style.overflow = '';
}

if (bar)    bar.addEventListener('click', openNav);
if (close)  close.addEventListener('click', closeNav);
overlay.addEventListener('click', closeNav);

/* ---- Back to top ---- */
const toTop = document.querySelector('.to-top');

window.addEventListener('scroll', () => {
    if (!toTop) return;
    if (window.pageYOffset > 120) {
        toTop.classList.add('active');
    } else {
        toTop.classList.remove('active');
    }
}, { passive: true });

/* ---- Sticky header shadow on scroll ---- */
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (!header) return;
    if (window.scrollY > 10) {
        header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
    } else {
        header.style.boxShadow = '0 1px 0 rgba(0,0,0,.06), 0 4px 12px rgba(0,0,0,.07)';
    }
}, { passive: true });

/* ---- Dark Mode ---- */
const DARK_KEY = 'swoshop-dark-mode';

function applyDarkMode(isDark) {
    document.body.classList.toggle('dark-mode', isDark);
    const btn = document.getElementById('dark-mode-toggle');
    if (!btn) return;
    const icon = btn.querySelector('.dm-icon');
    if (icon) {
        if (isDark) {
            icon.innerHTML = '<i class="ph ph-sun" style="font-size:20px;color:#fcd34d;"></i>';
            btn.title = 'Switch to Light Mode';
        } else {
            icon.innerHTML = '<i class="ph ph-moon" style="font-size:20px;"></i>';
            btn.title = 'Switch to Dark Mode';
        }
    }
}

// On page load — restore preference
(function () {
    const saved = localStorage.getItem(DARK_KEY);
    // Default to system preference if no saved preference
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyDarkMode(saved !== null ? saved === 'true' : prefersDark);
})();

// Toggle on click
document.addEventListener('click', function (e) {
    const btn = e.target.closest('#dark-mode-toggle');
    if (!btn) return;
    const isDark = !document.body.classList.contains('dark-mode');
    localStorage.setItem(DARK_KEY, isDark);
    applyDarkMode(isDark);

    // Spin animation on toggle
    const icon = btn.querySelector('.dm-icon');
    if (icon) {
        icon.style.transform = 'rotate(30deg) scale(0.8)';
        setTimeout(() => { icon.style.transform = ''; }, 320);
    }
});
