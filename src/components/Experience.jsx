import { useState } from 'react';
import { useInView } from '../hooks/useInView';
import { cvData } from '../data/cv';
import { useLang } from '../context/LangContext';

export default function Experience() {
  const [ref, inView] = useInView();
  const [expanded, setExpanded] = useState(0);
  const { t } = useLang();

  const jobs = cvData.experience.map((job, i) => ({
    ...job,
    role: t.experienceData[i].role,
    highlights: t.experienceData[i].highlights,
    period: job.current
      ? `${job.periodStart} – ${t.present}`
      : `${job.periodStart} – ${job.periodEnd}`,
  }));

  return (
    <section id="experience" className="section experience-section" ref={ref}>
      <div className={`container fade-up${inView ? ' visible' : ''}`}>
        <div className="section-header">
          <span className="section-tag">{t.experience.tag}</span>
          <h2 className="section-title">{t.experience.title}</h2>
        </div>
        <div className="timeline">
          {jobs.map((job, i) => (
            <div
              key={i}
              className={`timeline-item${expanded === i ? ' expanded' : ''}${job.current ? ' current' : ''}`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="timeline-dot">
                {job.current && <span className="dot-pulse" />}
              </div>
              <div className="timeline-card" onClick={() => setExpanded(expanded === i ? -1 : i)}>
                <div className="timeline-header">
                  <div className="timeline-meta">
                    <span className="timeline-period">{job.period}</span>
                    {job.current && <span className="current-badge">{t.currentBadge}</span>}
                  </div>
                  <h3 className="timeline-company">{job.company}</h3>
                  <p className="timeline-role">{job.role}</p>
                  <span className={`timeline-toggle${expanded === i ? ' open' : ''}`}>›</span>
                </div>
                <ul className={`timeline-highlights${expanded === i ? ' visible' : ''}`}>
                  {job.highlights.map((h, j) => (
                    <li key={j}>{h}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
