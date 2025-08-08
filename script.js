document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll + animação de destaque
    document.querySelectorAll('nav a, .btn, .social-icons a').forEach(function(link) {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#') && document.querySelector(href)) {
                e.preventDefault();
                const section = document.querySelector(href);
                section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                section.classList.remove('section-highlight');
                setTimeout(function() {
                    section.classList.add('section-highlight');
                    setTimeout(function() {
                        section.classList.remove('section-highlight');
                    }, 1100);
                }, 400);
            }
        });
    });

    // Carrossel de projetos responsivo
    const track = document.querySelector('.carousel-track');
    const cards = document.querySelectorAll('.carousel-track .project-card');
    const leftBtn = document.querySelector('.carousel-arrow.left');
    const rightBtn = document.querySelector('.carousel-arrow.right');
    let currentIndex = 0;

    function showProject(idx) {
        // Calcula largura do card + gap (respeitando responsividade)
        let cardWidth = cards[0].offsetWidth + parseInt(getComputedStyle(track).gap || 32);
        track.scrollTo({
            left: idx * cardWidth,
            behavior: 'smooth'
        });
    }

    leftBtn.addEventListener('click', function() {
        currentIndex = Math.max(0, currentIndex - 1);
        showProject(currentIndex);
    });

    rightBtn.addEventListener('click', function() {
        currentIndex = Math.min(cards.length - 1, currentIndex + 1);
        showProject(currentIndex);
    });

    showProject(currentIndex);

    // Menu responsivo para mobile/tablet
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('show');
    });

    // Fecha menu após seleção no mobile
    document.querySelectorAll('nav a').forEach(function(link) {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 600) {
                navMenu.classList.remove('show');
            }
        });
    });

    // Fecha menu ao clicar fora dele (mobile)
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 600 && navMenu.classList.contains('show')) {
            if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
                navMenu.classList.remove('show');
            }
        }
    });

    // Corrige index do carrossel ao redimensionar (mantém o projeto visível)
    window.addEventListener('resize', function() {
        showProject(currentIndex);
    });
});