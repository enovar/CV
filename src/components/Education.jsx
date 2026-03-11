import { useInView } from '../hooks/useInView';
import { cvData } from '../data/cv';

export default function Education() {
  const [ref, inView] = useInView();

  return (
    <section id="education" className="section education-section" ref={ref}>
      <div className={`container fade-up${inView ? ' visible' : ''}`}>
        <div className="section-header">
          <span className="section-tag">Formação</span>
          <h2 className="section-title">Educação & Certificações</h2>
        </div>
        <div className="edu-grid">
          {cvData.education.map((e, i) => (
            <div key={i} className="edu-card" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="edu-period">{e.period}</div>
              <h3 className="edu-course">{e.course}</h3>
              <p className="edu-institution">{e.institution}</p>
              {e.grade && <span className="edu-grade">{e.grade}</span>}
            </div>
          ))}
        </div>
        <div className="languages-section">
          <h3 className="lang-title">Idiomas</h3>
          <div className="lang-grid">
            {cvData.languages.map((l, i) => (
              <div key={i} className="lang-item">
                <div className="lang-header">
                  <span className="lang-name">{l.language}</span>
                  <span className="lang-level">{l.level}</span>
                </div>
                <div className="lang-track">
                  <div
                    className="lang-fill"
                    style={{ width: inView ? `${l.percent}%` : '0%' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
