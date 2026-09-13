// Reveal each portrait frame once, staggered slightly like lights coming
// up along a gallery wall. Respects reduced-motion via the CSS media query.
const frames = document.querySelectorAll('.frame');

if ('IntersectionObserver' in window && frames.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('is-visible'), i * 60);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  frames.forEach((frame) => observer.observe(frame));
} else {
  // Fallback: no IO support, just show everything.
  frames.forEach((frame) => frame.classList.add('is-visible'));
}
