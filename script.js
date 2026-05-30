document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".premium-header");
  const trackingForm = document.querySelector(".tracking-card form");
  const trackingInput = document.querySelector(".tracking-card input");

  // Sticky navbar shadow
  window.addEventListener("scroll", () => {
    if (window.scrollY > 30) {
      header.style.boxShadow = "0 12px 35px rgba(0,0,0,.25)";
    } else {
      header.style.boxShadow = "none";
    }
  });

  // Smooth reveal animation
  const revealItems = document.querySelectorAll(
    ".hero-content, .tracking-card, .premium-card, .why-section, .cta-premium, .premium-footer"
  );

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  }, { threshold: 0.15 });

  revealItems.forEach((item) => {
    item.classList.add("reveal");
    observer.observe(item);
  });

  // Fake tracking response
  if (trackingForm) {
    trackingForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const value = trackingInput.value.trim();

      if (!value) {
        alert("Please enter your tracking number.");
        return;
      }

      alert(
        `Tracking request received for: ${value}\n\nOur logistics team will verify the cargo status and contact you shortly.`
      );

      trackingInput.value = "";
    });
  }
});