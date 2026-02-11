// Mobile Menu Toggle
const btn = document.getElementById('mobile-menu-btn');
const menu = document.getElementById('mobile-menu');

btn.addEventListener('click', () => {
    menu.classList.toggle('hidden');
    // Animate menu appearance
    if (!menu.classList.contains('hidden')) {
        menu.classList.add('animate-pulse-glow');
        setTimeout(() => {
            menu.classList.remove('animate-pulse-glow');
        }, 500);
    }
});

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('bg-oniyx-black/95', 'shadow-lg');
        navbar.classList.remove('bg-oniyx-black/80');
    } else {
        navbar.classList.remove('bg-oniyx-black/95', 'shadow-lg');
        navbar.classList.add('bg-oniyx-black/80');
    }
});

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Adjust for navbar height
                behavior: 'smooth'
            });
            // Close mobile menu if open
            if (!menu.classList.contains('hidden')) {
                menu.classList.add('hidden');
            }
        }
    });
});
