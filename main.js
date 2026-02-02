// --- Cyber Grid & Cursor Glow Interaction ---
const handleBackgroundEffects = () => {
    const grid = document.querySelector('.cyber-grid');
    const glow = document.querySelector('.cursor-glow');
    if (!grid || !glow) return;

    window.addEventListener('mousemove', (e) => {
        // Grid Tilt
        const x = (e.clientX / window.innerWidth - 0.5) * 40;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;
        grid.style.transform = `rotateX(60deg) translate(calc(-25% + ${x}px), calc(-25% + ${y}px))`;

        // Cursor Glow Position
        glow.style.left = `${e.clientX}px`;
        glow.style.top = `${e.clientY}px`;
    });
};

// --- Magnetic Buttons ---
const initMagneticButtons = () => {
    const buttons = document.querySelectorAll('.btn');

    buttons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = `translate(0, 0)`;
        });
    });
};

// --- Typewriter HUD Effect ---
const initTypewriter = () => {
    const headers = document.querySelectorAll('.glitch');
    headers.forEach(header => {
        const text = header.getAttribute('data-text');
        header.textContent = '';
        let i = 0;

        const type = () => {
            if (i < text.length) {
                header.textContent += text.charAt(i);
                i++;
                setTimeout(type, 50);
            }
        };

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                type();
                observer.disconnect();
            }
        });
        observer.observe(header);
    });
};

// --- 3D Parallax & Scroll Reveal ---
const initRevel = () => {
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.hero-content, .hero-image-wrap, .glass-card, .section-title, .grid > div').forEach((el, index) => {
        el.classList.add('reveal-init');
        el.style.setProperty('--order', index % 8); // Cycle stagger every row
        observer.observe(el);
    });
};

// --- Parallax Hover for Cards ---
const initTilt = () => {
    const cards = document.querySelectorAll('.glass-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (centerY - y) / 10;
            const rotateY = (x - centerX) / 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
            card.style.boxShadow = `${-rotateY * 2}px ${rotateX * 2}px 30px rgba(0, 242, 255, 0.2)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)`;
            card.style.boxShadow = 'none';
        });
    });
};

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    // Add Atmosphere Layers
    const noise = document.createElement('div');
    noise.className = 'noise-overlay';
    document.body.appendChild(noise);

    const stars = document.createElement('div');
    stars.className = 'starfield';
    document.body.appendChild(stars);

    // Add Dynamic UI Elements
    const grid = document.createElement('div');
    grid.className = 'cyber-grid';
    document.body.appendChild(grid);

    const glow = document.createElement('div');
    glow.className = 'cursor-glow';
    document.body.appendChild(glow);

    // Run Effects
    handleBackgroundEffects();
    initMagneticButtons();
    initTypewriter();
    initTilt();
    initRevel();

    // Cosmic Particle System
    const initParticles = () => {
        const container = document.body;
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'fixed';
            particle.style.width = '2px';
            particle.style.height = '2px';
            particle.style.background = 'white';
            particle.style.borderRadius = '50%';
            particle.style.opacity = Math.random() * 0.5;
            particle.style.top = Math.random() * 100 + 'vh';
            particle.style.left = Math.random() * 100 + 'vw';
            particle.style.zIndex = '-2';
            particle.style.pointerEvents = 'none';

            container.appendChild(particle);

            const animation = particle.animate([
                { transform: `translate(0, 0) scale(1)`, opacity: particle.style.opacity },
                { transform: `translate(${Math.random() * 200 - 100}px, ${Math.random() * -200}px) scale(0)`, opacity: 0 }
            ], {
                duration: 5000 + Math.random() * 5000,
                iterations: Infinity,
                easing: 'ease-in'
            });
        }
    };
    initParticles();

    // Orb Generation (Refined)
    const container = document.querySelector('.bg-blobs');
    if (container) {
        for (let i = 0; i < 6; i++) {
            const orb = document.createElement('div');
            orb.className = 'blob';
            const size = Math.random() * 500 + 400;
            const colors = ['var(--primary)', 'var(--secondary)', '#4f46e5'];
            const color = colors[i % 3];
            orb.style.width = `${size}px`;
            orb.style.height = `${size}px`;
            orb.style.background = color;
            orb.style.left = `${Math.random() * 100}%`;
            orb.style.top = `${Math.random() * 100}%`;
            orb.style.opacity = '0.4';
            orb.style.animationDelay = `${i * -8}s`;
            orb.style.animationDuration = `${30 + Math.random() * 20}s`;
            container.appendChild(orb);
        }
    }
});
