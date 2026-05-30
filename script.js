document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".premium-header");
  const trackingForm = document.querySelector(".tracking-card form");
  const trackingInput = document.querySelector(".tracking-card input");
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.querySelector(".nav-links");
  const scrollTop = document.getElementById("scrollTop");

  // Sticky navbar shadow
  if (header) {
    window.addEventListener("scroll", () => {
      header.style.boxShadow =
        window.scrollY > 30 ? "0 12px 35px rgba(0,0,0,.25)" : "none";
    });
  }

  // Mobile menu
  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("open");
      menuToggle.textContent = navLinks.classList.contains("open") ? "×" : "☰";
    });

    document.querySelectorAll(".nav-links a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.textContent = "☰";
      });
    });
  }

  // Reveal animations
  const revealItems = document.querySelectorAll(
    ".hero-content, .tracking-card, .premium-card, .why-section, .cta-premium, .premium-footer, .process-section, .about-layout, .mission-section, .quote-layout, .contact-premium-layout, .faq-premium, .blog-premium"
  );

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  }, { threshold: 0.15 });

  revealItems.forEach(item => {
    item.classList.add("reveal");
    observer.observe(item);
  });

  // Fake tracking response
  if (trackingForm && trackingInput) {
    trackingForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const value = trackingInput.value.trim();

      if (!value) {
        alert("Please enter your tracking number.");
        return;
      }

      alert(
        `Tracking request received for: ${value}\n\nOur logistics team will verify your cargo status and contact you shortly.`
      );

      trackingInput.value = "";
    });
  }

  // Scroll to top
  if (scrollTop) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 500) {
        scrollTop.classList.add("show");
      } else {
        scrollTop.classList.remove("show");
      }
    });

    scrollTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Animated counters
  const counters = document.querySelectorAll("[data-count]");

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = Number(counter.dataset.count);
        let current = 0;
        const increment = Math.ceil(target / 80);

        const updateCounter = () => {
          current += increment;

          if (current >= target) {
            counter.textContent = target + "+";
          } else {
            counter.textContent = current + "+";
            requestAnimationFrame(updateCounter);
          }
        };

        updateCounter();
        counterObserver.unobserve(counter);
      }
    });
  }, { threshold: 0.4 });

  counters.forEach(counter => counterObserver.observe(counter));
});