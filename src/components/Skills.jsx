import { useState } from 'react';
import { useInView } from '../hooks/useInView';
import { cvData } from '../data/cv';
import { useLang } from '../context/LangContext';

function SkillBar({ name, level, animate }) {
  return (
    <div className="skill-item">
      <div className="skill-header">
        <span className="skill-name">{name}</span>
        <span className="skill-percent">{level}%</span>
      </div>
      <div className="skill-track">
        <div
          className="skill-fill"
          style={{ width: animate ? `${level}%` : '0%', transitionDelay: `${Math.random() * 0.3}s` }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  const [ref, inView] = useInView();
  const [active, setActive] = useState(0);
  const { t } = useLang();

  // Merge numeric levels from cvData with translated names from t
  const skills = cvData.skills.map((s, i) => ({
    icon: s.icon,
    category: t.skillsData[i].category,
    items: s.levels.map((level, j) => ({ name: t.skillsData[i].items[j], level })),
  }));

  return (
    <section id="skills" className="section skills-section" ref={ref}>
      <div className={`container fade-up${inView ? ' visible' : ''}`}>
        <div className="section-header">
          <span className="section-tag">{t.skills.tag}</span>
          <h2 className="section-title">{t.skills.title}</h2>
        </div>
        <div className="skills-tabs">
          {skills.map((cat, i) => (
            <button
              key={i}
              className={`skills-tab${active === i ? ' active' : ''}`}
              onClick={() => setActive(i)}
            >
              <span className="tab-icon">{cat.icon}</span>
              {cat.category}
            </button>
          ))}
        </div>
        <div className="skills-panel">
          {skills[active].items.map((s, i) => (
            <SkillBar key={i} name={s.name} level={s.level} animate={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
