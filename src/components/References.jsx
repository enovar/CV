import { useInView } from '../hooks/useInView';
import { cvData } from '../data/cv';

export default function References() {
  const [ref, inView] = useInView();

  return (
    <section id="references" className="section references-section" ref={ref}>
      <div className={`container fade-up${inView ? ' visible' : ''}`}>
        <div className="section-header">
          <span className="section-tag">Portfolio</span>
          <h2 className="section-title">Referências & Projetos</h2>
        </div>
        <div className="refs-grid">
          {cvData.references.map((r, i) => (
            <a
              key={i}
              href={r.url}
              target="_blank"
              rel="noopener noreferrer"
              className="ref-card"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <span className="ref-name">{r.name}</span>
              <span className="ref-url">{r.url.replace('https://', '')}</span>
              <span className="ref-arrow">↗</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
