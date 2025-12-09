// script.js - consolidated mobile-optimized version

// Initialize EmailJS (if loaded)
(function () {
  if (typeof emailjs !== 'undefined') {
    try { emailjs.init("VyRhlL2B9IHuDr05g"); } catch (e) { console.warn('EmailJS init failed', e); }
  }
})();

document.addEventListener('DOMContentLoaded', () => {
  /* ---------------- Typing effect ---------------- */
  const words = ['We automate incident response through AI-driven optimization.'];
  const typedEl = document.getElementById('typed');
  if (typedEl) {
    let widx = 0, cidx = 0, forward = true;
    const isMobile = window.innerWidth < 768;
    const forwardSpeed = isMobile ? 80 : 60;
    const backSpeed = isMobile ? 35 : 28;

    (function tick() {
      const word = words[widx];
      if (forward) {
        cidx++;
        typedEl.textContent = word.slice(0, cidx);
        if (cidx === word.length) { forward = false; return setTimeout(tick, 1200); }
      } else {
        cidx--;
        typedEl.textContent = word.slice(0, cidx);
        if (cidx === 0) { forward = true; widx = (widx + 1) % words.length; }
      }
      setTimeout(tick, forward ? forwardSpeed : backSpeed);
    })();
  }

  /* ---------------- Mobile nav toggle ---------------- */
  const navToggle = document.getElementById('nav-toggle');
  const navList = document.getElementById('nav-list');

  if (navToggle && navList) {
    navToggle.addEventListener('click', () => {
      const isActive = navList.classList.toggle('active');
      navToggle.setAttribute('aria-expanded', String(isActive));
      // prevent background scroll
      document.documentElement.style.overflow = isActive ? 'hidden' : '';
      document.body.style.overflow = isActive ? 'hidden' : '';
    });

    // close menu when a link clicked
    navList.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', () => {
        navList.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
      });
    });
  }

  /* ---------------- FAQ toggle ---------------- */
  document.querySelectorAll('.faq-item').forEach(item => {
    const question = item.querySelector('.faq-question');
    if (!question) return;
    question.addEventListener('click', () => {
      document.querySelectorAll('.faq-item').forEach(i => { if (i !== item) i.classList.remove('active'); });
      item.classList.toggle('active');
    });
  });

  /* ---------------- Smooth scroll for anchors ---------------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href && href !== '#') {
        // let nav handler close menu first (if open) then scroll
        setTimeout(() => {
          const target = document.querySelector(href);
          if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 0);
      }
    });
  });

  /* ---------------- Contact form (EmailJS) ---------------- */
  const contactForm = document.getElementById('contactForm');
  const statusMessage = document.getElementById('status');

  if (contactForm && typeof emailjs !== 'undefined') {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const companyInput = document.getElementById('company');
      const messageInput = document.getElementById('message');

      // basic validation
      if (!nameInput.value.trim() || !emailInput.value.trim()) {
        statusMessage.textContent = 'Please fill required fields.';
        statusMessage.style.color = '#f5576c';
        return;
      }

      statusMessage.textContent = 'Sending...';
      statusMessage.style.color = '#4ED0F8';

      const templateParams = {
        from_name: nameInput.value,
        from_email: emailInput.value,
        company: companyInput.value || 'Not provided',
        message: messageInput.value,
        to_email: 'b.pandey@defendxtech.com'
      };

      emailjs.send('service_x5t0hq6', 'template_j8kspag', templateParams)
        .then(() => {
          statusMessage.textContent = 'Message sent successfully! We will get back to you soon.';
          statusMessage.style.color = '#4ED0F8';
          contactForm.reset();
          setTimeout(() => statusMessage.textContent = '', 5000);
        }).catch((err) => {
          console.error('EmailJS send error', err);
          statusMessage.textContent = 'Failed to send message. Please try again or email us directly.';
          statusMessage.style.color = '#f5576c';
          setTimeout(() => statusMessage.textContent = '', 5000);
        });
    });

    // Reset button handler
    const resetBtn = contactForm.querySelector('.btn.ghost');
    if (resetBtn) resetBtn.addEventListener('click', () => { contactForm.reset(); statusMessage.textContent = ''; });
  }

  /* ---------------- Footer year ---------------- */
  const yearSpan = document.getElementById('year');
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();
});

/* ---------------- Network Canvas - outside DOMContentLoaded so it draws early ---------------- */
(function () {
  const canvas = document.getElementById('networkCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();

  // optimize particles for small screens
  let particleCount = window.innerWidth < 768 ? 20 : 50;
  const particles = [];

  class Particle {
    constructor() {
      this.reset();
      this.radius = 2;
    }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * 0.5;
      this.vy = (Math.random() - 0.5) * 0.5;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
      if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(78, 208, 248, 0.5)';
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) particles.push(new Particle());

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    particles.forEach((p1, i) => {
      particles.slice(i + 1).forEach(p2 => {
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(78,208,248,${0.2 * (1 - dist / 150)})`;
          ctx.stroke();
        }
      });
    });
    requestAnimationFrame(animate);
  }
  animate();

  window.addEventListener('resize', () => {
    resizeCanvas();
    const newCount = window.innerWidth < 768 ? 20 : 50;
    while (particles.length < newCount) particles.push(new Particle());
    while (particles.length > newCount) particles.pop();
  });
})();
