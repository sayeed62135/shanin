/* ============================================
   SHANIN GROUP — Shared JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // PRELOADER
  const preloader = document.getElementById('preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        preloader.classList.add('hidden');
        document.body.style.overflow = '';
        initReveal();
        animateCounters();
      }, 800);
    });
    // Fallback
    setTimeout(() => {
      preloader.classList.add('hidden');
      document.body.style.overflow = '';
    }, 2500);
  }

  // THEME TOGGLE
  const themeToggle = document.getElementById('themeToggle');
  const html = document.documentElement;
  const savedTheme = localStorage.getItem('shanin-theme') || 'dark';
  html.setAttribute('data-theme', savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', next);
      localStorage.setItem('shanin-theme', next);
    });
  }

  // NAV SCROLL
  const nav = document.getElementById('mainNav');
  const backToTop = document.getElementById('backToTop');
  const progressBar = document.getElementById('progressBar');

  window.addEventListener('scroll', () => {
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 60);
    if (backToTop) backToTop.classList.toggle('visible', window.scrollY > 600);
    if (progressBar) {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? scrollTop / docHeight : 0;
      progressBar.style.transform = 'scaleX(' + scrollPercent + ')';
    }
  });

  if (backToTop) {
    backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  // MOBILE MENU
  const menuBtn = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      menuBtn.classList.toggle('active');
      mobileMenu.classList.toggle('active');
      document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        menuBtn.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // SMOOTH SCROLL
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // SCROLL REVEAL
  function initReveal() {
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
    reveals.forEach(el => observer.observe(el));
  }
  setTimeout(initReveal, 100);

  // COUNTER ANIMATION
  let countersAnimated = false;
  function animateCounters() {
    if (countersAnimated) return;
    const statNums = document.querySelectorAll('.stat-num[data-target]');
    if (!statNums.length) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !countersAnimated) {
          countersAnimated = true;
          statNums.forEach(num => {
            const target = parseInt(num.getAttribute('data-target'));
            const duration = 2000;
            const start = performance.now();
            function update(now) {
              const elapsed = now - start;
              const progress = Math.min(elapsed / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              num.textContent = Math.floor(eased * target).toLocaleString();
              if (progress < 1) requestAnimationFrame(update);
              else num.textContent = target.toLocaleString();
            }
            requestAnimationFrame(update);
          });
          observer.disconnect();
        }
      });
    }, { threshold: 0.4 });
    const statsEl = document.querySelector('.hero-stats, .stats-bar');
    if (statsEl) observer.observe(statsEl);
  }
  setTimeout(animateCounters, 1200);

  // MARKET BARS
  const marketsList = document.querySelector('.markets-list');
  if (marketsList) {
    const marketObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.market-bar').forEach((bar, i) => {
            const width = bar.getAttribute('data-width');
            if (width) setTimeout(() => { bar.style.width = width + '%'; }, i * 100);
          });
          marketObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    marketObserver.observe(marketsList);
  }

  // FORM
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type="submit"]');
      const orig = btn.innerHTML;
      btn.innerHTML = '<span>Message Sent!</span>';
      btn.style.background = '#4a9e4a';
      setTimeout(() => { btn.innerHTML = orig; btn.style.background = ''; contactForm.reset(); }, 3000);
    });
  }

  // ACTIVE NAV LINK
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href && (href === currentPage || (currentPage === '' && href === 'index.html'))) {
      link.classList.add('active');
    }
  });
});
