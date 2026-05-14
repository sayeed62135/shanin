/* ============================================
   SHANIN GROUP — Main JS (No Custom Cursor)
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ========================================
  // PRELOADER
  // ========================================
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.classList.add('hidden');
      document.body.style.overflow = '';
      initReveal();
      animateCounters();
    }, 1000);
  });

  // ========================================
  // THEME TOGGLE
  // ========================================
  const themeToggle = document.getElementById('themeToggle');
  const html = document.documentElement;
  const savedTheme = localStorage.getItem('shanin-theme') || 'dark';
  html.setAttribute('data-theme', savedTheme);

  themeToggle.addEventListener('click', () => {
    const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('shanin-theme', next);
  });

  // ========================================
  // NAVBAR SCROLL
  // ========================================
  const nav = document.getElementById('mainNav');
  const backToTop = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    // Nav shrink
    nav.classList.toggle('scrolled', window.scrollY > 60);
    // Back to top
    backToTop.classList.toggle('visible', window.scrollY > 600);
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ========================================
  // MOBILE MENU
  // ========================================
  const menuBtn = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = document.querySelectorAll('.mobile-link');

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

  // ========================================
  // SMOOTH SCROLL
  // ========================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ========================================
  // SCROLL REVEAL
  // ========================================
  function initReveal() {
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    reveals.forEach(el => observer.observe(el));
  }

  // Fallback: also init after a delay
  setTimeout(initReveal, 200);

  // ========================================
  // COUNTER ANIMATION
  // ========================================
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
              const current = Math.floor(eased * target);
              num.textContent = current.toLocaleString();
              if (progress < 1) {
                requestAnimationFrame(update);
              } else {
                num.textContent = target.toLocaleString();
              }
            }
            requestAnimationFrame(update);
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    const statsBar = document.querySelector('.hero-stats');
    if (statsBar) observer.observe(statsBar);
  }

  // Also trigger if already visible
  setTimeout(animateCounters, 1500);

  // ========================================
  // MARKET BARS ANIMATION
  // ========================================
  const marketBars = document.querySelectorAll('.market-bar');
  const marketObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bars = entry.target.querySelectorAll('.market-bar');
        bars.forEach((bar, i) => {
          const width = bar.getAttribute('data-width');
          if (width) {
            setTimeout(() => {
              bar.style.width = width + '%';
            }, i * 100);
          }
        });
        marketObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  const marketsList = document.querySelector('.markets-list');
  if (marketsList) marketObserver.observe(marketsList);

  // ========================================
  // HERO PARALLAX
  // ========================================
  const heroImg = document.querySelector('.hero-bg img');
  if (heroImg) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      if (scrolled < window.innerHeight) {
        heroImg.style.transform = `scale(1.05) translateY(${scrolled * 0.15}px)`;
      }
    });
  }

  // ========================================
  // CONTACT FORM
  // ========================================
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type="submit"]');
      const originalHTML = btn.innerHTML;
      btn.innerHTML = '<span>Message Sent Successfully!</span>';
      btn.style.background = '#22c55e';

      setTimeout(() => {
        btn.innerHTML = originalHTML;
        btn.style.background = '';
        contactForm.reset();
      }, 3000);
    });
  }

  // ========================================
  // CAPABILITY CARD TILT
  // ========================================
  document.querySelectorAll('.cap-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(800px) rotateY(${x * 4}deg) rotateX(${-y * 4}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

});
