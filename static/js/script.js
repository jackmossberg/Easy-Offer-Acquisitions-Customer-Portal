document.addEventListener('DOMContentLoaded', () => {

    console.log('Easy Offer Acquisitions site loaded successfully.');

    // --- Smooth Scroll for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // --- Scroll Pagination & Animation Logic ---
    const slides = document.querySelectorAll('.section-slide');
    const dots = document.querySelectorAll('.dot');

    if (slides.length > 0 && dots.length > 0) {
        
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.15 // Lowered to trigger earlier and more reliably
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    const index = Array.from(slides).indexOf(entry.target);
                    dots.forEach(dot => dot.classList.remove('active'));
                    if (dots[index]) {
                        dots[index].classList.add('active');
                    }
                } else {
                    entry.target.classList.remove('visible');
                }
            });
        }, observerOptions);

        slides.forEach(slide => observer.observe(slide));

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                if (slides[index]) {
                    slides[index].scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // --- Testimonial Carousel Logic ---
    const carouselSlides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.prev-arrow');
    const nextBtn = document.querySelector('.next-arrow');
    let currentReview = 0;
    let carouselInterval;

    function showReview(index) {
        carouselSlides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
    }

    function nextReview() {
        currentReview = (currentReview + 1) % carouselSlides.length;
        showReview(currentReview);
    }

    function prevReview() {
        currentReview = (currentReview - 1 + carouselSlides.length) % carouselSlides.length;
        showReview(currentReview);
    }

    if (prevBtn && nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextReview();
            resetTimer();
        });

        prevBtn.addEventListener('click', () => {
            prevReview();
            resetTimer();
        });
    }

    function resetTimer() {
        clearInterval(carouselInterval);
        // carouselInterval = setInterval(nextReview, 5000);
    }

    // Start the auto-flip
    resetTimer();

    // --- Mobile Menu Toggle Logic ---
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileDropdown = document.getElementById('mobile-dropdown');

    if (mobileMenuBtn && mobileDropdown) {
        mobileMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            mobileDropdown.classList.toggle('show');
        });

        document.addEventListener('click', (e) => {
            if (!mobileMenuBtn.contains(e.target) && !mobileDropdown.contains(e.target)) {
                mobileDropdown.classList.remove('show');
            }
        });
    }
});