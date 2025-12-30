document.addEventListener('DOMContentLoaded', () => {

    /* -------------------------------------------------------------------------- */
    /*                                 Mobile Menu                                */
    /* -------------------------------------------------------------------------- */
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            if (navLinks.style.display === 'flex') {
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = '0';
                navLinks.style.backgroundColor = 'white';
                navLinks.style.width = '100%';
                navLinks.style.padding = '20px';
                navLinks.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
            }
        });
    }

    /* -------------------------------------------------------------------------- */
    /*                               Hero Carousel                                */
    /* -------------------------------------------------------------------------- */
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let currentSlide = 0;
    const intervalTime = 5000;
    let slideInterval;

    const nextSlide = () => {
        // Remove active class from current
        const activeSlide = document.querySelector('.slide.active');
        activeSlide.classList.remove('active');

        // Calculate next
        if (currentSlide === slides.length - 1) {
            currentSlide = 0;
        } else {
            currentSlide++;
        }

        // Add active to next
        slides[currentSlide].classList.add('active');
    };

    const prevSlide = () => {
        const activeSlide = document.querySelector('.slide.active');
        activeSlide.classList.remove('active');

        if (currentSlide === 0) {
            currentSlide = slides.length - 1;
        } else {
            currentSlide--;
        }

        slides[currentSlide].classList.add('active');
    };

    // Event Listeners
    if (nextBtn && prevBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetInterval();
        });

        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetInterval();
        });
    }

    // Auto Play
    if (slides.length > 0) {
        slideInterval = setInterval(nextSlide, intervalTime);
    }

    function resetInterval() {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, intervalTime);
    }

});
