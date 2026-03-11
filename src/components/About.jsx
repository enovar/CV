import { useInView } from '../hooks/useInView';
import { cvData } from '../data/cv';

export default function About() {
  const [ref, inView] = useInView();

  return (
    <section id="about" className="section about-section" ref={ref}>
      <div className={`container fade-up${inView ? ' visible' : ''}`}>
        <div className="section-header">
          <span className="section-tag">Sobre Mim</span>
          <h2 className="section-title">Perfil Profissional</h2>
        </div>
        <div className="about-grid">
          <div className="about-text">
            <p className="about-profile">{cvData.profile}</p>
            <div className="about-contact">
              <div className="contact-item">
                <span className="contact-icon">⌖</span>
                <span>{cvData.contact.location}</span>
              </div>
              <div className="contact-item">
                <span className="contact-icon">◈</span>
                <span>StackOverflow: {cvData.contact.stackoverflow} rep.</span>
              </div>
            </div>
          </div>
          <div className="differentiators">
            <h3 className="diff-title">Principais Diferenciadores</h3>
            <ul className="diff-list">
              {cvData.differentiators.map((d, i) => (
                <li key={i} className="diff-item" style={{ animationDelay: `${i * 0.06}s` }}>
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
