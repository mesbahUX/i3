/* =========================================================
   HOME HERO SLIDER
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const slides = document.querySelectorAll(".hero-slide");
    const dots = document.querySelectorAll(".hero-dot");

    const prevBtn = document.querySelector(".hero-slider-prev");
    const nextBtn = document.querySelector(".hero-slider-next");

    if (!slides.length) return;

    let currentSlide = 0;
    let slideTimer;


    function showSlide(index) {

        if (index >= slides.length) {
            index = 0;
        }

        if (index < 0) {
            index = slides.length - 1;
        }

        currentSlide = index;


        slides.forEach((slide, i) => {
            slide.classList.toggle(
                "active",
                i === currentSlide
            );
        });


        dots.forEach((dot, i) => {
            dot.classList.toggle(
                "active",
                i === currentSlide
            );
        });
    }


    function nextSlide() {
        showSlide(currentSlide + 1);
    }


    function prevSlide() {
        showSlide(currentSlide - 1);
    }


    function startSlider() {

        clearInterval(slideTimer);

        slideTimer = setInterval(() => {
            nextSlide();
        }, 6000);
    }


    nextBtn?.addEventListener("click", () => {

        nextSlide();

        startSlider();

    });


    prevBtn?.addEventListener("click", () => {

        prevSlide();

        startSlider();

    });


    dots.forEach((dot, index) => {

        dot.addEventListener("click", () => {

            showSlide(index);

            startSlider();

        });

    });

/* =========================================================
   TOUCH SWIPE
========================================================= */

let touchStartX = 0;
let touchEndX = 0;

const heroSlider = document.querySelector(".hero-slider");

if (heroSlider) {

    heroSlider.addEventListener("touchstart", (e) => {

        touchStartX = e.changedTouches[0].screenX;

    }, { passive: true });


    heroSlider.addEventListener("touchend", (e) => {

        touchEndX = e.changedTouches[0].screenX;

        const swipeDistance =
            touchEndX - touchStartX;


        // Swipe به چپ → اسلاید بعدی
        if (swipeDistance < -50) {

            nextSlide();

            startSlider();

        }


        // Swipe به راست → اسلاید قبلی
        else if (swipeDistance > 50) {

            prevSlide();

            startSlider();

        }

    }, { passive: true });

}
    showSlide(0);

    startSlider();

});
