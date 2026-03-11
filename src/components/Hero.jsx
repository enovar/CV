import { useEffect, useRef } from 'react';
import { cvData } from '../data/cv';

const ROLES = [
  'UI/UX Developer Sénior',
  'WordPress Specialist',
  'Web Designer',
  'Performance Expert',
  'Front End Developer',
];

export default function Hero() {
  const typingRef = useRef(null);

  useEffect(() => {
    let roleIdx = 0;
    let charIdx = 0;
    let deleting = false;
    let timeout;

    const type = () => {
      const role = ROLES[roleIdx];
      if (!deleting) {
        charIdx++;
        if (typingRef.current) typingRef.current.textContent = role.slice(0, charIdx);
        if (charIdx === role.length) {
          deleting = true;
          timeout = setTimeout(type, 2000);
          return;
        }
      } else {
        charIdx--;
        if (typingRef.current) typingRef.current.textContent = role.slice(0, charIdx);
        if (charIdx === 0) {
          deleting = false;
          roleIdx = (roleIdx + 1) % ROLES.length;
        }
      }
      timeout = setTimeout(type, deleting ? 50 : 80);
    };

    timeout = setTimeout(type, 500);
    return () => clearTimeout(timeout);
  }, []);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section className="hero">
      <div className="hero-bg">
        <div className="hero-grid" />
        <div className="hero-glow glow-1" />
        <div className="hero-glow glow-2" />
      </div>
      <div className="hero-content">
        <div className="hero-badge">
          <span className="badge-dot" />
          Disponível para novos projetos
        </div>
        <h1 className="hero-name">{cvData.name}</h1>
        <div className="hero-typing">
          <span ref={typingRef} />
          <span className="cursor">|</span>
        </div>
        <p className="hero-years">
          <span className="years-number">30+</span> anos de experiência
        </p>
        <div className="hero-stats">
          <div className="stat">
            <span className="stat-value">30+</span>
            <span className="stat-label">Anos Exp.</span>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <span className="stat-value">9.759</span>
            <span className="stat-label">Stack Overflow</span>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <span className="stat-value">13+</span>
            <span className="stat-label">Marcas</span>
          </div>
        </div>
        <div className="hero-actions">
          <button className="btn-primary" onClick={() => scrollTo('about')}>
            Ver Perfil
          </button>
          <button className="btn-outline" onClick={() => scrollTo('experience')}>
            Experiência
          </button>
        </div>
      </div>
      <div className="hero-scroll-hint" onClick={() => scrollTo('about')}>
        <div className="scroll-mouse">
          <div className="scroll-wheel" />
        </div>
      </div>
    </section>
  );
}
