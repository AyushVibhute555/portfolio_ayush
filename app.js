// Smooth scroll for nav links and internal anchors
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    const href = link.getAttribute("href");
    if (!href || href === "#") return;

    const target = document.querySelector(href);
    if (!target) return;

    e.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - 90;
    window.scrollTo({ top, behavior: "smooth" });
  });
});

// Scroll reveal (sections + elements)
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      entry.target.classList.add("in-view");

      // small 3d "pop" for cards/blocks
      if (entry.target.classList.contains("section-shell")) {
        entry.target.style.transform = "translateY(0)";
      }

      observer.unobserve(entry.target);
    });
  },
  {
    threshold: 0.15,
  }
);

// Observe reveal elements
document.querySelectorAll(".reveal, .section-shell").forEach((el) => {
  // initial subtle offset for shells
  if (el.classList.contains("section-shell")) {
    el.style.transform = "translateY(20px)";
    el.style.transition =
      "transform 0.8s ease, box-shadow 0.8s ease, border-color 0.8s ease";
  }
  observer.observe(el);
});

// 3D tilt effect for cards & hero photo
document.querySelectorAll(".tilt-card").forEach((card) => {
  const height = card.clientHeight;
  const width = card.clientWidth;

  function handleMove(e) {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = ((y - height / 2) / height) * -12;
    const rotateY = ((x - width / 2) / width) * 12;

    card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(8px)`;
  }

  function resetTilt() {
    card.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0)";
  }

  card.addEventListener("mousemove", handleMove);
  card.addEventListener("mouseleave", resetTilt);
});

// Fade-in for images on load
document.querySelectorAll("img").forEach((img) => {
  if (img.complete) {
    img.classList.add("loaded");
  } else {
    img.addEventListener("load", () => img.classList.add("loaded"));
  }
});

console.log("Portfolio initialized ✨");
