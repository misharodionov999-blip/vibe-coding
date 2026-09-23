const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector("#site-nav");
const contactForm = document.querySelector("#contact-form");
const formNote = document.querySelector("#form-note");

function closeMenu() {
  nav?.classList.remove("is-open");
  menuToggle?.setAttribute("aria-expanded", "false");
  document.body.classList.remove("nav-open");
}

menuToggle?.addEventListener("click", () => {
  const isOpen = nav?.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(Boolean(isOpen)));
  document.body.classList.toggle("nav-open", Boolean(isOpen));
});

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const id = link.getAttribute("href");
    const target = id ? document.querySelector(id) : null;

    if (!target) {
      return;
    }

    event.preventDefault();
    closeMenu();
    target.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start",
    });
  });
});

contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  contactForm.reset();
  if (formNote) {
    formNote.hidden = false;
  }
});

if (!prefersReducedMotion && "IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14, rootMargin: "0px 0px -8% 0px" }
  );

  document.querySelectorAll(".reveal").forEach((element) => {
    observer.observe(element);
  });
} else {
  document.querySelectorAll(".reveal").forEach((element) => {
    element.classList.add("is-visible");
  });
}
