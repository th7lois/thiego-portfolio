document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll + animação de destaque
    document.querySelectorAll('nav a, .btn, .social-icons a').forEach(function(link) {
        link.addEventListener('click', function(e) {
            // Só aplica se o link for âncora interna
            const href = this.getAttribute('href');
            if (href && href.startsWith('#') && document.querySelector(href)) {
                e.preventDefault();
                const section = document.querySelector(href);
                section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                section.classList.remove('section-highlight'); // reset
                setTimeout(function() {
                    section.classList.add('section-highlight');
                    setTimeout(function() {
                        section.classList.remove('section-highlight');
                    }, 1100); // duração da animação
                }, 400); // espera a rolagem
            }
        });
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.carousel-track');
    const cards = document.querySelectorAll('.carousel-track .project-card');
    const leftBtn = document.querySelector('.carousel-arrow.left');
    const rightBtn = document.querySelector('.carousel-arrow.right');
    let currentIndex = 0;

    function showProject(idx) {
        const cardWidth = cards[0].offsetWidth + 32; // 32px gap
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

    // Inicializa
    showProject(currentIndex);
});