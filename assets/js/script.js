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

    /* -------------------------------------------------------------------------- */
    /*                                  IST Clock                                 */
    /* -------------------------------------------------------------------------- */
    function updateISTTime() {
        const istTimeElement = document.getElementById('ist-time');
        if (istTimeElement) {
            const now = new Date();
            // Convert to IST (UTC + 5:30)
            const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
            const istOffset = 5.5 * 60 * 60 * 1000;
            const istDate = new Date(utc + istOffset);

            let hours = istDate.getHours();
            const minutes = istDate.getMinutes();
            const seconds = istDate.getSeconds(); // Add seconds
            const ampm = hours >= 12 ? 'PM' : 'AM';

            hours = hours % 12;
            hours = hours ? hours : 12;
            const minutesStr = minutes < 10 ? '0' + minutes : minutes;
            const secondsStr = seconds < 10 ? '0' + seconds : seconds; // Format seconds

            const timeString = `${hours}:${minutesStr}:${secondsStr} ${ampm} IST`; // Display with seconds
            istTimeElement.textContent = timeString;
        }
    }

    // Update immediately and then every second
    updateISTTime();
    setInterval(updateISTTime, 1000);

    /* -------------------------------------------------------------------------- */
    /*                                 Contact Form                               */
    /* -------------------------------------------------------------------------- */
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const formData = new FormData(this);
            const data = Object.fromEntries(formData.entries());
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;

            // Simple loading state
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            fetch('send_email.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(response => response.json())
                .then(result => {
                    alert(result.message); // Show simple feedback
                    if (result.status === 'success') {
                        contactForm.reset();
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('There was an error sending your message. Please try again later.');
                })
                .finally(() => {
                    submitBtn.textContent = originalBtnText;
                    submitBtn.disabled = false;
                });
        });
    }

});
