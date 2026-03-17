import { useState, useEffect } from 'react';
import { useLang } from '../context/LangContext';
import { useTheme } from '../context/ThemeContext';

const NAV_IDS = ['about', 'skills', 'experience', 'education', 'plugins', 'references', 'contact'];

export default function Navbar() {
  const { lang, setLang, t } = useLang();
  const { theme, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      const sections = NAV_IDS.map(id => document.getElementById(id));
      const current = sections.findLast(s => s && s.getBoundingClientRect().top <= 120);
      setActive(current?.id || '');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMenuOpen(false);
  };

  const links = NAV_IDS.map(id => ({ id, label: t.nav[id] }));

  const LangButtons = ({ mobile = false }) => (
    <div className={`lang-switcher${mobile ? ' lang-switcher-mobile' : ''}`}>
      <button
        className={`lang-btn${lang === 'pt' ? ' active' : ''}`}
        onClick={() => { setLang('pt'); if (mobile) setMenuOpen(false); }}
        title="Português"
        aria-label="Português"
      >
        <span className="flag-icon">🇵🇹</span>
        <span className="lang-code">PT</span>
      </button>
      <button
        className={`lang-btn${lang === 'en' ? ' active' : ''}`}
        onClick={() => { setLang('en'); if (mobile) setMenuOpen(false); }}
        title="English"
        aria-label="English"
      >
        <span className="flag-icon">🇬🇧</span>
        <span className="lang-code">EN</span>
      </button>
    </div>
  );

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <div className="navbar-brand" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <span className="brand-initials">CV</span>
        <span className="brand-name">Luís P. A.</span>
      </div>

      {/* Desktop: nav links + lang switcher side by side on the right */}
      <div className="navbar-end">
        <ul className="nav-links">
          {links.map(l => (
            <li key={l.id}>
              <button
                className={active === l.id ? 'active' : ''}
                onClick={() => scrollTo(l.id)}
              >
                {l.label}
              </button>
            </li>
          ))}
        </ul>
        <div className="nav-divider" />
        <LangButtons />
        <div className="nav-divider" />
        <button className="theme-toggle" onClick={toggle} aria-label="Toggle theme" title={theme === 'dark' ? 'Light mode' : 'Dark mode'}>
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </div>

      {/* Mobile: hamburger + overlay menu */}
      <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
        <span className={menuOpen ? 'open' : ''} />
        <span className={menuOpen ? 'open' : ''} />
        <span className={menuOpen ? 'open' : ''} />
      </button>

      <div className={`mobile-menu${menuOpen ? ' open' : ''}`}>
        <ul className="mobile-nav-links">
          {links.map(l => (
            <li key={l.id}>
              <button
                className={active === l.id ? 'active' : ''}
                onClick={() => scrollTo(l.id)}
              >
                {l.label}
              </button>
            </li>
          ))}
        </ul>
        <LangButtons mobile />
        <button className="theme-toggle" onClick={() => { toggle(); setMenuOpen(false); }} aria-label="Toggle theme" style={{ marginTop: '8px', width: '52px', height: '52px', fontSize: '1.4rem' }}>
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </div>
    </nav>
  );
}
