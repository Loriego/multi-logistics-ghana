document.addEventListener("DOMContentLoaded", () => {
  // ===== Scroll Animations =====
  const elements = document.querySelectorAll(".fade-in, .slide-up");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = "running";
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  elements.forEach(el => {
    el.style.animationPlayState = "paused";
    observer.observe(el);
  });

  // ===== Slider =====
  const slides = document.querySelector(".slides");
  const slideImages = document.querySelectorAll(".slides img");
  const prevBtn = document.querySelector(".arrow.left");
  const nextBtn = document.querySelector(".arrow.right");
  const dotsContainer = document.querySelector(".dots");

  let index = 0;
  let slideCount = slideImages.length;
  let autoSlide;

  // --- Generate dots dynamically
  dotsContainer.innerHTML = ""; // clear any existing
  slideImages.forEach((_, i) => {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    if (i === 0) dot.classList.add("active");
    dot.addEventListener("click", () => {
      showSlide(i);
      stopAutoSlide();
      startAutoSlide();
    });
    dotsContainer.appendChild(dot);
  });

  const dots = document.querySelectorAll(".dot");

  // --- Show slide
  function showSlide(i) {
    index = (i + slideCount) % slideCount;
    slides.style.transform = `translateX(-${index * 100}%)`;

    dots.forEach(dot => dot.classList.remove("active"));
    dots[index].classList.add("active");
  }

  // --- Next & Previous
  function nextSlide() {
    showSlide(index + 1);
  }

  function prevSlide() {
    showSlide(index - 1);
  }

  // --- Auto-slide
  function startAutoSlide() {
    autoSlide = setInterval(nextSlide, 5000); // 5s interval
  }

  function stopAutoSlide() {
    clearInterval(autoSlide);
  }

  // --- Event Listeners
  nextBtn.addEventListener("click", () => { nextSlide(); stopAutoSlide(); startAutoSlide(); });
  prevBtn.addEventListener("click", () => { prevSlide(); stopAutoSlide(); startAutoSlide(); });

  // --- Swipe Support (Mobile)
  let startX = 0;
  let endX = 0;

  slides.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  slides.addEventListener("touchend", (e) => {
    endX = e.changedTouches[0].clientX;
    let diff = startX - endX;

    if (Math.abs(diff) > 50) { // swipe threshold
      if (diff > 0) {
        nextSlide(); // swipe left → next
      } else {
        prevSlide(); // swipe right → previous
      }
      stopAutoSlide();
      startAutoSlide();
    }
  });

  // --- Init
  showSlide(index);
  startAutoSlide();
});
