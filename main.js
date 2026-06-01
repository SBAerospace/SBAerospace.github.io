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
    <span>Tryouts for 2026-27 are open: fill out the form and join our Google Classroom.</span>
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

// ─── DYNAMIC COPYRIGHT YEAR ───────────────────────────────
document.querySelectorAll('#copy-year').forEach(el => { el.textContent = new Date().getFullYear(); });

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
      desc: 'We design, build, and launch high-power rockets from the ground up: airframes, fins, recovery systems, and all the math behind it.',
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

  // ─── HERO INTERACTIVE ROCKET ──────────────────────────────
  const hero = document.querySelector('.hero');
  const rocket = document.getElementById('heroRocket');
  const scene = document.querySelector('.hero-interactive-scene');

  if (hero && rocket && scene) {
    let currentX = window.innerWidth * 0.78;
    let currentY = window.innerHeight * 0.35;
    let targetX = currentX;
    let targetY = currentY;
    let currentRot = 0;
    let targetRot = 0;
    let isHovering = false;
    let idleTime = 0;
    let particleThrottle = 0;

    // Default resting positions based on screen dimensions
    let defaultRestingX = window.innerWidth * 0.78;
    let defaultRestingY = window.innerHeight * 0.35;

    window.addEventListener('resize', () => {
      defaultRestingX = window.innerWidth * 0.78;
      defaultRestingY = window.innerHeight * 0.35;
      if (!isHovering) {
        targetX = defaultRestingX;
        targetY = defaultRestingY;
      }
    });

    hero.addEventListener('mousemove', (e) => {
      isHovering = true;
      const rect = hero.getBoundingClientRect();
      targetX = e.clientX - rect.left;
      targetY = e.clientY - rect.top;
    });

    hero.addEventListener('mouseleave', () => {
      isHovering = false;
    });

    function spawnParticle(x, y, rotation) {
      const particle = document.createElement('div');
      particle.className = 'rocket-particle';

      // Convert rotation angle (0 is straight up, clockwise) to standard screen coords
      const angleRad = rotation * Math.PI / 180;
      const sinA = Math.sin(angleRad);
      const cosA = Math.cos(angleRad);

      // Tail nozzle position offset (height is 90px, Y center offset to nozzle exit is 34px)
      const tailX = x - 34 * sinA;
      const tailY = y + 34 * cosA;

      particle.style.left = `${tailX}px`;
      particle.style.top = `${tailY}px`;
      scene.appendChild(particle);

      // Random dispersion vector
      const speed = 10 + Math.random() * 15;
      const driftX = -sinA * speed + (Math.random() - 0.5) * 8;
      const driftY = cosA * speed + (Math.random() - 0.5) * 8;

      requestAnimationFrame(() => {
        particle.style.transform = `translate(calc(-50% + ${driftX}px), calc(-50% + ${driftY}px)) scale(0.2)`;
        particle.style.opacity = '0';
      });

      setTimeout(() => {
        particle.remove();
      }, 800);
    }

    function animateRocket() {
      const scrollY = window.scrollY;
      const heroHeight = hero.offsetHeight;

      // Only animate if hero is visible on screen
      if (scrollY < heroHeight + 100) {
        // Scroll launch effect: propel rocket up faster than scroll and fade it out
        const scrollProgress = Math.min(scrollY / 350, 1);
        const launchOffset = scrollY * 2.2;
        
        let activeTargetX = targetX;
        let activeTargetY = targetY - launchOffset;

        if (!isHovering) {
          // Idle floating path
          idleTime += 0.035;
          activeTargetX = defaultRestingX + Math.sin(idleTime) * 35;
          activeTargetY = (defaultRestingY - launchOffset) + Math.cos(idleTime * 0.5) * 20;
        }

        const dx = activeTargetX - currentX;
        const dy = activeTargetY - currentY;
        const dist = Math.hypot(dx, dy);

        // Position interpolation
        currentX += dx * 0.055;
        currentY += dy * 0.055;

        // Rotation interpolation
        let targetRotDeg = 0;
        if (dist > 2 && isHovering) {
          // Heading angle (clockwise from straight up)
          targetRotDeg = Math.atan2(dy, dx) * 180 / Math.PI + 90;
        } else if (!isHovering) {
          // Gentle sway in direction of idle float
          targetRotDeg = Math.sin(idleTime) * 12;
        }

        // Shortest path angle transition
        let diff = targetRotDeg - currentRot;
        diff = ((diff + 180) % 360) - 180;
        currentRot += diff * 0.07;

        // Render rocket transform (centering with translate(-50%, -50%))
        rocket.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%) rotate(${currentRot}deg)`;
        rocket.style.opacity = (0.22 * (1 - scrollProgress)).toFixed(3);

        // Particle trail spawn throttle
        particleThrottle++;
        if (particleThrottle >= 5) {
          if (dist > 1.5 || scrollY > 5) {
            spawnParticle(currentX, currentY, currentRot);
          }
          particleThrottle = 0;
        }
      }

      requestAnimationFrame(animateRocket);
    }

    // Initialize position at rest coordinates
    currentX = defaultRestingX;
    currentY = defaultRestingY;
    targetX = defaultRestingX;
    targetY = defaultRestingY;

    requestAnimationFrame(animateRocket);
  }

  // ─── TIMELINE PROGRESS ROCKET ──────────────────────────────
  const timeline = document.querySelector('.timeline');
  const timelineRocket = document.getElementById('timelineRocket');
  
  if (timeline && timelineRocket) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          window.addEventListener('scroll', updateTimelineRocket);
          updateTimelineRocket();
        } else {
          window.removeEventListener('scroll', updateTimelineRocket);
        }
      });
    }, { threshold: 0 });
    observer.observe(timeline);

    function updateTimelineRocket() {
      const rect = timeline.getBoundingClientRect();
      const timelineHeight = rect.height;
      const windowHeight = window.innerHeight;
      
      const currentScroll = windowHeight * 0.5 - rect.top;
      
      let pct = currentScroll / rect.height;
      pct = Math.max(0, Math.min(1, pct));
      
      const trackLength = timelineHeight - 24;
      const translateY = pct * trackLength;
      
      timelineRocket.style.transform = `translateY(${translateY}px) translate(-50%, 0)`;
    }
  }

});
