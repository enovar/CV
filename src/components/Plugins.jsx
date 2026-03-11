import { useInView } from '../hooks/useInView';
import { cvData } from '../data/cv';
import { useLang } from '../context/LangContext';

export default function Plugins() {
  const [ref, inView] = useInView();
  const { t } = useLang();

  return (
    <section id="plugins" className="section plugins-section" ref={ref}>
      <div className={`container fade-up${inView ? ' visible' : ''}`}>
        <div className="section-header">
          <span className="section-tag">{t.plugins.tag}</span>
          <h2 className="section-title">{t.plugins.title}</h2>
        </div>
        <div className="plugins-grid">
          {t.pluginsData.map((plugin, i) => (
            <div key={i} className="plugin-card" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="plugin-icon">⬡</div>
              <div className="plugin-body">
                <h3 className="plugin-name">{plugin.name}</h3>
                <p className="plugin-desc">{plugin.description}</p>
              </div>
              <a
                href={cvData.plugins[i].downloadUrl}
                className={`plugin-download${cvData.plugins[i].downloadUrl === '#' ? ' disabled' : ''}`}
                {...(cvData.plugins[i].downloadUrl !== '#'
                  ? { download: true, target: '_blank', rel: 'noopener noreferrer' }
                  : { onClick: e => e.preventDefault() }
                )}
              >
                <span className="download-icon">↓</span>
                {t.plugins.download}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
