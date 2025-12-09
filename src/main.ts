// Network Canvas Animation
const canvas = document.getElementById('networkCanvas') as HTMLCanvasElement;
const ctx = canvas?.getContext('2d');

if (canvas && ctx) {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  class Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;

    constructor() {
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
      if (ctx) {
        ctx.fillStyle = 'rgba(62, 196, 200, 0.5)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  const particles: Particle[] = [];
  for (let i = 0; i < 50; i++) {
    particles.push(new Particle());
  }

  function animate() {
    if (ctx && canvas) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      // Draw connections
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach((p2) => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            if (ctx) {
              ctx.strokeStyle = `rgba(62, 196, 200, ${0.2 * (1 - distance / 150)})`;
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            }
          }
        });
      });

      requestAnimationFrame(animate);
    }
  }

  animate();

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}

// Year update
const yearSpan = document.getElementById('year');
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear().toString();
}
