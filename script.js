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

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  // Mobile menu
  if (menuToggle && navLinks) {
    navLinks.id = "primary-navigation";
    menuToggle.setAttribute("aria-controls", navLinks.id);
    menuToggle.setAttribute("aria-label", "Toggle navigation");
    menuToggle.setAttribute("aria-expanded", "false");
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && navLinks.classList.contains("open")) {
        navLinks.classList.remove("open"); menuToggle.textContent = "☰";
        menuToggle.setAttribute("aria-expanded", "false"); menuToggle.focus();
      }
    });
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(navLinks.classList.contains("open")));
      menuToggle.textContent = navLinks.classList.contains("open") ? "×" : "☰";
    });

    document.querySelectorAll(".nav-links a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.textContent = "☰";
        menuToggle.setAttribute("aria-expanded", "false");
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
    if (reducedMotion) return;
    item.classList.add("reveal");
    observer.observe(item);
  });

  // Open a user-confirmed WhatsApp enquiry; no fabricated tracking response.
  if (trackingForm && trackingInput) {
    trackingForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const value = trackingInput.value.trim();
      if (!value) { trackingInput.setCustomValidity("Enter a shipment or container number."); trackingInput.reportValidity(); return; }
      window.location.href = "https://wa.me/233543370687?text=" + encodeURIComponent("Hello Multi-Logistics Ghana, please help me check the status of shipment/container: " + value);
    });
    trackingInput.addEventListener("input", () => trackingInput.setCustomValidity(""));
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
      window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
    });
  }

  // Animated counters
  const counters = document.querySelectorAll("[data-count]");

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = Number(counter.dataset.count);
        if (reducedMotion) { counter.textContent = target + "+"; counterObserver.unobserve(counter); return; }
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