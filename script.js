// ── Live clock — Shanghai time (GMT+8) ──────────────────────
function updateClock() {
  const now = new Date();
  const shanghai = new Date(
    now.toLocaleString('en-US', { timeZone: 'Asia/Shanghai' })
  );
  const h = String(shanghai.getHours()).padStart(2, '0');
  const m = String(shanghai.getMinutes()).padStart(2, '0');
  const s = String(shanghai.getSeconds()).padStart(2, '0');
  const el = document.getElementById('clock');
  if (el) el.textContent = `${h}:${m}:${s} GMT+8`;
}
updateClock();
setInterval(updateClock, 1000);

// ── Mobile nav toggle ────────────────────────────────────────
const navToggle = document.querySelector('.nav-toggle');
const navLinks  = document.querySelector('.nav-links');

function closeNav() {
  navLinks.classList.remove('open');
  navToggle.classList.remove('open');
  navToggle.setAttribute('aria-expanded', false);
  document.body.classList.remove('nav-open');
}

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    navToggle.classList.toggle('open', open);
    navToggle.setAttribute('aria-expanded', open);
    document.body.classList.toggle('nav-open', open);
  });

  // Close when any link is tapped
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeNav);
  });

  // Close when tapping the scrim
  document.addEventListener('click', (e) => {
    if (!navLinks.classList.contains('open')) return;
    if (navLinks.contains(e.target) || navToggle.contains(e.target)) return;
    closeNav();
  });
}

// ── Role / tab selector ──────────────────────────────────────
const tabs         = document.querySelectorAll('.role-tab');
const groups       = document.querySelectorAll('.projects-group');
const roleTabsNav  = document.querySelector('.role-tabs');

function selectRole(role) {
  tabs.forEach(tab => {
    const isActive = tab.dataset.role === role;
    tab.classList.toggle('active', isActive);
    tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
    tab.setAttribute('tabindex', isActive ? '0' : '-1');
  });

  groups.forEach(group => {
    const isMatch = group.dataset.group === role;
    group.hidden = !isMatch;
    if (isMatch) {
      group.style.animation = 'none';
      group.offsetHeight; // reflow
      group.style.animation = '';
    }
  });
}

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    selectRole(tab.dataset.role);
    sessionStorage.setItem('activeTab', tab.dataset.role);

    // Mobile: scroll to first card of the selected group
    if (window.innerWidth <= 768) {
      setTimeout(() => {
        const group = document.querySelector(`.projects-group[data-group="${tab.dataset.role}"]`);
        const firstCard = group && group.querySelector('.card');
        if (firstCard) {
          const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) || 64;
          const filterH = document.querySelector('.filter-bar')?.offsetHeight || 44;
          const top = firstCard.getBoundingClientRect().top + window.scrollY - navH - filterH - 12;
          window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
        }
      }, 50);
    }
  });
});

// Keyboard navigation — arrow keys
if (roleTabsNav) {
  roleTabsNav.addEventListener('keydown', e => {
    const tabsArray = Array.from(tabs);
    const currentIndex = tabsArray.findIndex(t => t.getAttribute('aria-selected') === 'true');
    let next;

    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      next = tabsArray[(currentIndex + 1) % tabsArray.length];
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      next = tabsArray[(currentIndex - 1 + tabsArray.length) % tabsArray.length];
    } else if (e.key === 'Home') {
      e.preventDefault();
      next = tabsArray[0];
    } else if (e.key === 'End') {
      e.preventDefault();
      next = tabsArray[tabsArray.length - 1];
    }

    if (next) {
      selectRole(next.dataset.role);
      next.focus();
    }
  });
}

// Restore last active tab
const savedTab = sessionStorage.getItem('activeTab');
selectRole(savedTab || 'research');

// ── Scroll-based fade-in animations ─────────────────────────

// ── Filter bar scroll shadow ─────────────────────────────────
const filterBar = document.querySelector('.filter-bar');
if (filterBar) {
  window.addEventListener('scroll', () => {
    filterBar.classList.toggle('scrolled', window.scrollY > 100);
  }, { passive: true });
}

const fadeEls = document.querySelectorAll('.fade-in');

if ('IntersectionObserver' in window) {
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  fadeEls.forEach(el => fadeObserver.observe(el));
}

// ── Staggered card reveal ────────────────────────────────────
const cards = document.querySelectorAll('.card');
if (cards.length && 'IntersectionObserver' in window) {
  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(24px)';
    card.style.transition = 'opacity 0.6s cubic-bezier(.22,1,.36,1), transform 0.6s cubic-bezier(.22,1,.36,1)';
  });

  const cardObserver = new IntersectionObserver((entries) => {
    const visible = entries.filter(e => e.isIntersecting);
    visible.forEach((entry, i) => {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, i * 80);
      cardObserver.unobserve(entry.target);
    });
  }, { threshold: 0.08 });

  cards.forEach(card => cardObserver.observe(card));
}

// ── Smooth page transitions ──────────────────────────────────
document.addEventListener('click', (e) => {
  const link = e.target.closest('a[href]');
  if (!link) return;

  const href = link.getAttribute('href');
  if (!href) return;
  if (link.target === '_blank') return;
  if (href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('http')) return;

  e.preventDefault();
  document.body.classList.add('page-exit');
  setTimeout(() => { window.location.href = href; }, 300);
});

window.addEventListener('pageshow', () => {
  document.body.classList.remove('page-exit');
});
