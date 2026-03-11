import { cvData } from '../data/cv';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <span className="brand-initials">LP</span>
          <span>{cvData.name}</span>
        </div>
        <p className="footer-copy">
          © {new Date().getFullYear()} — Construído com React & Vite
        </p>
        <button className="footer-contact" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
          Contactar
        </button>
      </div>
    </footer>
  );
}
