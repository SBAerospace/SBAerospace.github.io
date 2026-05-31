// ─── THEME ─────────────────────────────────────────────────
const THEME_KEY = 'sba-theme';
const root = document.documentElement;

function applyTheme(theme) {
  root.setAttribute('data-theme', theme);
  localStorage.setItem(THEME_KEY, theme);
}

(function initTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(saved || (prefersDark ? 'dark' : 'light'));
})();

// ─── ANNOUNCEMENT BANNER ──────────────────────────────────
(function initBanner() {
  const BANNER_KEY = 'sba-banner-dismissed';
  if (sessionStorage.getItem(BANNER_KEY)) return;

  const banner = document.createElement('div');
  banner.className = 'announce-banner';
  banner.id = 'announceBanner';
  banner.innerHTML = `
    <span>Tryouts for 2026–27 are open — fill out the form and join our Google Classroom.</span>
    <a href="tryouts.html">Learn more →</a>
    <button class="announce-banner-close" aria-label="Dismiss announcement" id="bannerClose">✕</button>
  `;
  // Insert before header (first element of body)
  document.body.insertBefore(banner, document.body.firstChild);

  document.getElementById('bannerClose').addEventListener('click', () => {
    banner.classList.add('hidden');
    sessionStorage.setItem(BANNER_KEY, '1');
  });
})();

document.addEventListener('DOMContentLoaded', function () {

  // ─── THEME TOGGLE ─────────────────────────────────────────
  const themeBtn = document.getElementById('themeToggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const current = root.getAttribute('data-theme');
      applyTheme(current === 'dark' ? 'light' : 'dark');
    });
  }

  // ─── MOBILE NAV ──────────────────────────────────────────
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      const open = mobileNav.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', open);
    });
    mobileNav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        hamburger.setAttribute('aria-expanded', false);
      });
    });
  }

  // ─── ACTIVE NAV LINK ─────────────────────────────────────
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-nav a').forEach(a => {
    const href = a.getAttribute('href') || '';
    if (href === path || (path === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  // ─── SCROLL REVEAL ───────────────────────────────────────
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length > 0) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(el => obs.observe(el));
  }

  // ─── WORK PAGE TABS ──────────────────────────────────────
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');

  if (tabBtns.length > 0) {
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        tabPanels.forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        const target = document.getElementById(btn.dataset.tab);
        if (target) target.classList.add('active');
      });
    });
  }

  // ─── PROGRAM SELECTOR ─────────────────────────────────────
  const programItems = document.querySelectorAll('.program-item');
  const programDetail = document.getElementById('programDetail');

  const programs = {
    rocketry: {
      title: 'Rocketry',
      desc: 'We design, build, and launch high-power rockets from the ground up — airframes, fins, recovery systems, and all the math behind it.',
      features: ['ARC competition builds', 'OpenRocket & RASAero simulation', 'Composite and fiberglass airframes', 'Dual-deploy recovery systems'],
    },
    electronics: {
      title: 'Electronics',
      desc: 'Custom avionics, PCB design, and embedded firmware. Everything from flight computers to ground station radios.',
      features: ['KiCad schematic & PCB layout', 'Microcontroller firmware (C/Python)', 'RF telemetry systems', 'Custom flight data logging'],
    },
    mechanical: {
      title: 'Mechanical',
      desc: 'CAD-driven design and hands-on fabrication. We build the structures, fins, aero surfaces, and test rigs that make the mission possible.',
      features: ['SolidWorks & Fusion 360 CAD', 'FEA structural analysis', 'Composite manufacturing', 'CNC milling & 3D printing'],
    },
    software: {
      title: 'Software',
      desc: 'From flight simulations to ground station GUIs, our software team builds the tools the whole club relies on.',
      features: ['Flight path simulation', 'Real-time telemetry dashboards', 'Data analysis & visualization', 'Embedded Python & C++ firmware'],
    },
  };

  function updateProgram(key) {
    if (!programDetail || !programs[key]) return;
    const p = programs[key];
    programDetail.innerHTML = `
      <h2>${p.title}</h2>
      <p>${p.desc}</p>
      <div class="program-detail-features">
        ${p.features.map(f => `<div class="program-feature">${f}</div>`).join('')}
      </div>`;
  }

  if (programItems.length > 0) {
    programItems.forEach(item => {
      item.addEventListener('click', () => {
        programItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        updateProgram(item.dataset.program);
      });
    });
    const first = programItems[0];
    first.classList.add('active');
    updateProgram(first.dataset.program);
  }

  // ─── FAQ ACCORDION ────────────────────────────────────────
  document.querySelectorAll('.faq-item').forEach(item => {
    const btn = item.querySelector('.faq-q');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const isOpen = item.classList.toggle('open');
      const answer = item.querySelector('.faq-a');
      if (answer) answer.style.maxHeight = isOpen ? answer.scrollHeight + 'px' : '0';
    });
  });

  // ─── COPY CLASSROOM CODE ──────────────────────────────────
  const copyBtn = document.getElementById('copyCode');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const code = copyBtn.dataset.code || '';
      navigator.clipboard.writeText(code).then(() => {
        copyBtn.textContent = 'Copied!';
        copyBtn.classList.add('copied');
        setTimeout(() => {
          copyBtn.textContent = 'Copy code';
          copyBtn.classList.remove('copied');
        }, 2000);
      });
    });
  }

  // ─── ANIMATE HERO BARS ────────────────────────────────────
  const bars = document.querySelectorAll('.widget-bar');
  setTimeout(() => {
    bars.forEach(bar => { bar.style.width = bar.dataset.pct || '70%'; });
  }, 600);

  // ─── FORMS (mock submit) ──────────────────────────────────
  ['contactForm', 'sponsorForm'].forEach(id => {
    const form = document.getElementById(id);
    if (!form) return;
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const original = btn.textContent;
      btn.textContent = 'Sent ✓';
      btn.disabled = true;
      setTimeout(() => { btn.textContent = original; btn.disabled = false; }, 3500);
    });
  });

});
