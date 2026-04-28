// Animation for reference-banner headline and button
// Fade up headline, then fade up button with delay

document.addEventListener('DOMContentLoaded', function () {
  const card = document.querySelector('.reference-banner-card');
  if (!card) return;

  const title = card.querySelector('.reference-banner-title');
  const desc = card.querySelector('.reference-banner-desc');
  const btn = card.querySelector('.reference-banner-btn');

  // Reset state
  title.style.opacity = 0;
  title.style.transform = 'translateY(24px)';
  desc.style.opacity = 0;
  desc.style.transform = 'translateY(24px)';
  btn.style.opacity = 0;
  btn.style.transform = 'translateY(24px)';

  setTimeout(() => {
    title.style.transition = 'opacity 0.7s cubic-bezier(.22,1,.36,1), transform 0.7s cubic-bezier(.22,1,.36,1)';
    title.style.opacity = 1;
    title.style.transform = 'translateY(0)';
  }, 100);

  setTimeout(() => {
    desc.style.transition = 'opacity 0.7s cubic-bezier(.22,1,.36,1), transform 0.7s cubic-bezier(.22,1,.36,1)';
    desc.style.opacity = 1;
    desc.style.transform = 'translateY(0)';
  }, 300);

  setTimeout(() => {
    btn.style.transition = 'opacity 0.7s cubic-bezier(.22,1,.36,1), transform 0.7s cubic-bezier(.22,1,.36,1)';
    btn.style.opacity = 1;
    btn.style.transform = 'translateY(0)';
  }, 600);
});
