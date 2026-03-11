import { useState, useEffect } from 'react';

const links = [
  { id: 'about', label: 'Perfil' },
  { id: 'skills', label: 'Competências' },
  { id: 'experience', label: 'Experiência' },
  { id: 'education', label: 'Formação' },
  { id: 'references', label: 'Referências' },
  { id: 'contact', label: 'Contacto' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      const sections = links.map(l => document.getElementById(l.id));
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

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <div className="navbar-brand" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <span className="brand-initials">LP</span>
        <span className="brand-name">Luís P. A.</span>
      </div>
      <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
        <span className={menuOpen ? 'open' : ''} />
        <span className={menuOpen ? 'open' : ''} />
        <span className={menuOpen ? 'open' : ''} />
      </button>
      <ul className={`nav-links${menuOpen ? ' open' : ''}`}>
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
    </nav>
  );
}
