import { useEffect, useRef, useState } from 'react';

// Curated professional/abstract images — design, tech, creativity, cosmos
const IMAGES = [
  // Active
  'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&w=1920&q=85',

  // Reserved for future use:
  // 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=1920&q=85',
  // 'https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=1920&q=85',
  // 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1920&q=85',
  // 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1920&q=85',
  // 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?auto=format&fit=crop&w=1920&q=85',
  // 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1920&q=85',
  // 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1920&q=85',
  // 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1920&q=85',
  // 'https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?auto=format&fit=crop&w=1920&q=85',
];

// 4 Ken Burns movement styles picked randomly
const KB_STYLES = [
  { from: 'scale(1.0) translate(0%,  0%)',  to: 'scale(1.15) translate(-2%, -1.5%)' },
  { from: 'scale(1.0) translate(0%,  0%)',  to: 'scale(1.12) translate( 2%, -1%)  ' },
  { from: 'scale(1.1) translate(-2%, 1%)',  to: 'scale(1.0)  translate( 1%, -1%)  ' },
  { from: 'scale(1.05) translate(1%, 0%)', to: 'scale(1.15) translate(-1%, -2%)  ' },
];

function createParticle(w, h) {
  const isPurple = Math.random() > 0.6;
  return {
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.25,
    vy: -(Math.random() * 0.35 + 0.08),
    size: Math.random() * 1.8 + 0.4,
    opacity: Math.random() * 0.6 + 0.15,
    opacityDir: Math.random() > 0.5 ? 1 : -1,
    opacitySpeed: Math.random() * 0.008 + 0.003,
    color: isPurple ? [167, 139, 250] : [255, 255, 255],
  };
}

export default function HeroBg() {
  const canvasRef = useRef(null);
  const rafRef   = useRef(null);
  const [loaded, setLoaded] = useState(false);

  // Pick once per mount — stable across re-renders
  const [bgUrl]  = useState(() => IMAGES[Math.floor(Math.random() * IMAGES.length)]);
  const [kbStyle] = useState(() => KB_STYLES[Math.floor(Math.random() * KB_STYLES.length)]);

  // Preload image so we know when it's ready
  useEffect(() => {
    const img = new Image();
    img.src = bgUrl;
    img.onload = () => setLoaded(true);
    img.onerror = () => setLoaded(true); // show fallback gracefully
  }, [bgUrl]);

  // Canvas particle system
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let particles = [];
    let running = true;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      const count = Math.min(Math.floor((canvas.width * canvas.height) / 12000), 120);
      particles = Array.from({ length: count }, () =>
        createParticle(canvas.width, canvas.height)
      );
    };

    const draw = () => {
      if (!running) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        // Move
        p.x += p.vx;
        p.y += p.vy;
        // Wrap
        if (p.y < -6)                   { p.y = canvas.height + 6; p.x = Math.random() * canvas.width; }
        if (p.x < -6)                     p.x = canvas.width  + 6;
        if (p.x > canvas.width  + 6)     p.x = -6;
        // Twinkle
        p.opacity += p.opacityDir * p.opacitySpeed;
        if (p.opacity > 0.85 || p.opacity < 0.08) p.opacityDir *= -1;

        // Glow + dot
        const [r, g, b] = p.color;
        ctx.save();
        ctx.shadowBlur  = p.size * 8;
        ctx.shadowColor = `rgba(${r},${g},${b},0.7)`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${p.opacity})`;
        ctx.fill();
        ctx.restore();
      });

      rafRef.current = requestAnimationFrame(draw);
    };

    resize();
    draw();

    const onResize = () => resize();
    window.addEventListener('resize', onResize, { passive: true });
    return () => {
      running = false;
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  const kbCss = `
    @keyframes kbOnce {
      from { transform: ${kbStyle.from}; }
      to   { transform: ${kbStyle.to};   }
    }
  `;

  return (
    <div className="hero-bg-wrap">
      {/* Inject unique KB keyframe */}
      <style>{kbCss}</style>

      {/* Photo */}
      <div
        className={`hero-bg-img${loaded ? ' loaded' : ''}`}
        style={{ backgroundImage: loaded ? `url(${bgUrl})` : 'none' }}
      />

      {/* Dark gradient overlay — keeps text readable */}
      <div className="hero-overlay" />

      {/* Particles canvas */}
      <canvas ref={canvasRef} className="hero-particles" />

      {/* Original grid & ambient glows on top */}
      <div className="hero-grid" />
      <div className="hero-glow glow-1" />
      <div className="hero-glow glow-2" />
    </div>
  );
}
