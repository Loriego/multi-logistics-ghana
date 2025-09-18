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
  const dots = document.querySelectorAll(".dot");
  const prevBtn = document.querySelector(".arrow.left");
  const nextBtn = document.querySelector(".arrow.right");
  let index = 0;
  let slideCount = dots.length;
  let autoSlide;

  function showSlide(i) {
    index = (i + slideCount) % slideCount;
    slides.style.transform = `translateX(-${index * 100}%)`;

    dots.forEach(dot => dot.classList.remove("active"));
    dots[index].classList.add("active");
  }

  function nextSlide() {
    showSlide(index + 1);
  }

  function prevSlide() {
    showSlide(index - 1);
  }

  // Auto-slide every 5s
  function startAutoSlide() {
    autoSlide = setInterval(nextSlide, 5000);
  }

  function stopAutoSlide() {
    clearInterval(autoSlide);
  }

  // Event Listeners
  nextBtn.addEventListener("click", () => { nextSlide(); stopAutoSlide(); startAutoSlide(); });
  prevBtn.addEventListener("click", () => { prevSlide(); stopAutoSlide(); startAutoSlide(); });
  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      showSlide(i);
      stopAutoSlide();
      startAutoSlide();
    });
  });

  // Init
  showSlide(index);
  startAutoSlide();
});
