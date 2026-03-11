import { useInView } from '../hooks/useInView';
import { cvData } from '../data/cv';
import { useLang } from '../context/LangContext';

export default function About() {
  const [ref, inView] = useInView();
  const { t } = useLang();

  return (
    <section id="about" className="section about-section" ref={ref}>
      <div className={`container fade-up${inView ? ' visible' : ''}`}>
        <div className="section-header">
          <span className="section-tag">{t.about.tag}</span>
          <h2 className="section-title">{t.about.title}</h2>
        </div>
        <div className="about-grid">
          <div className="about-text">
            <p className="about-profile">{t.profile}</p>
            <div className="about-contact">
              <div className="contact-item">
                <span className="contact-icon">⌖</span>
                <span>{cvData.contact.location}</span>
              </div>
              <div className="contact-item">
                <span className="contact-icon">◈</span>
                <span>{t.about.soLabel}: {cvData.contact.stackoverflow} rep.</span>
              </div>
            </div>
          </div>
          <div className="differentiators">
            <h3 className="diff-title">{t.about.diffsTitle}</h3>
            <ul className="diff-list">
              {t.differentiators.map((d, i) => (
                <li key={i} className="diff-item">
                  <span className="diff-bullet" />
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
