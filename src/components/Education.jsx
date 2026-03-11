import { useInView } from '../hooks/useInView';
import { cvData } from '../data/cv';
import { useLang } from '../context/LangContext';

export default function Education() {
  const [ref, inView] = useInView();
  const { t } = useLang();

  const eduItems = cvData.education.map((e, i) => ({
    ...e,
    course: t.educationData[i].course,
  }));

  return (
    <section id="education" className="section education-section" ref={ref}>
      <div className={`container fade-up${inView ? ' visible' : ''}`}>
        <div className="section-header">
          <span className="section-tag">{t.education.tag}</span>
          <h2 className="section-title">{t.education.title}</h2>
        </div>
        <div className="edu-grid">
          {eduItems.map((e, i) => (
            <div key={i} className="edu-card" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="edu-period">{e.period}</div>
              <h3 className="edu-course">{e.course}</h3>
              <p className="edu-institution">{e.institution}</p>
              {e.grade && <span className="edu-grade">{e.grade}</span>}
            </div>
          ))}
        </div>
        <div className="languages-section">
          <h3 className="lang-title">{t.education.languagesTitle}</h3>
          <div className="lang-grid">
            {t.languages.map((l, i) => (
              <div key={i} className="lang-item">
                <div className="lang-header">
                  <span className="lang-name">{l.language}</span>
                  <span className="lang-level">{l.level}</span>
                </div>
                <div className="lang-track">
                  <div
                    className="lang-fill"
                    style={{ width: inView ? `${cvData.languagePercents[i]}%` : '0%' }}
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
