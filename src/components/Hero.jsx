import { useEffect, useRef } from 'react';
import { cvData } from '../data/cv';
import { useLang } from '../context/LangContext';
import HeroBg from './HeroBg';

export default function Hero() {
  const { t } = useLang();
  const typingRef = useRef(null);
  const stateRef = useRef({ roleIdx: 0, charIdx: 0, deleting: false, timeout: null });

  useEffect(() => {
    const state = stateRef.current;
    state.roleIdx = 0;
    state.charIdx = 0;
    state.deleting = false;
    clearTimeout(state.timeout);

    const type = () => {
      const roles = t.hero.roles;
      const role = roles[state.roleIdx];
      if (!state.deleting) {
        state.charIdx++;
        if (typingRef.current) typingRef.current.textContent = role.slice(0, state.charIdx);
        if (state.charIdx === role.length) {
          state.deleting = true;
          state.timeout = setTimeout(type, 2000);
          return;
        }
      } else {
        state.charIdx--;
        if (typingRef.current) typingRef.current.textContent = role.slice(0, state.charIdx);
        if (state.charIdx === 0) {
          state.deleting = false;
          state.roleIdx = (state.roleIdx + 1) % roles.length;
        }
      }
      state.timeout = setTimeout(type, state.deleting ? 50 : 80);
    };

    state.timeout = setTimeout(type, 500);
    return () => clearTimeout(state.timeout);
  }, [t]);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section className="hero">
      <HeroBg />
      <div className="hero-content">
        <div className="hero-badge">
          <span className="badge-dot" />
          {t.hero.badge}
        </div>
        <h1 className="hero-name">{cvData.name}</h1>
        <div className="hero-typing">
          <span ref={typingRef} />
          <span className="cursor">|</span>
        </div>
        <p className="hero-years">
          <span className="years-number">30+</span> {t.hero.yearsLabel}
        </p>
        <div className="hero-stats">
          <div className="stat">
            <span className="stat-value">30+</span>
            <span className="stat-label">{t.hero.yearsExp}</span>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <span className="stat-value">9.759</span>
            <span className="stat-label">Stack Overflow</span>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <span className="stat-value">13+</span>
            <span className="stat-label">{t.hero.brands}</span>
          </div>
        </div>
        <div className="hero-actions">
          <button className="btn-primary" onClick={() => scrollTo('about')}>
            {t.hero.seeProfile}
          </button>
          <button className="btn-outline" onClick={() => scrollTo('experience')}>
            {t.hero.experience}
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
