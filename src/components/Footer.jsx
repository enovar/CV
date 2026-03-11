import { cvData } from '../data/cv';
import { useLang } from '../context/LangContext';

export default function Footer() {
  const { t } = useLang();
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <span className="brand-initials">CV</span>
          <span>{cvData.name}</span>
        </div>
        <p className="footer-copy">
          © {new Date().getFullYear()} — {t.footer.built}
        </p>

      </div>
    </footer>
  );
}
