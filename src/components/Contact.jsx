import { useState, useRef } from 'react';
import { Turnstile } from '@marsidev/react-turnstile';
import { useInView } from '../hooks/useInView';
import { useLang } from '../context/LangContext';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/maqpoyaj';
const CONTACT_EMAIL = 'luis.particular@gmail.com';
const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY;

function openMailto(form) {
  const body = `${form.message}\n\n---\nNome: ${form.name}\nEmail: ${form.email}`;
  window.open(
    `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(body)}`
  );
}

export default function Contact() {
  const [ref, inView] = useInView();
  const { t } = useLang();
  const c = t.contact;
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | success | mailto | error
  const turnstileRef = useRef(null);
  const [tsToken, setTsToken] = useState(null);

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const reset = () => {
    setStatus('idle');
    setForm({ name: '', email: '', subject: '', message: '' });
    setTsToken(null);
    turnstileRef.current?.reset();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    const token = tsToken || turnstileRef.current?.getResponse() || null;

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          ...form,
          _replyto: form.email,
          ...(token && { 'cf-turnstile-response': token }),
        }),
      });

      if (res.ok) {
        setStatus('success');
        setForm({ name: '', email: '', subject: '', message: '' });
        setTsToken(null);
        turnstileRef.current?.reset();
        return;
      }
      // Non-ok HTTP response — fall through to mailto
    } catch {
      // fetch blocked by CSP or network error — fall back to mailto
    }

    // Fallback: open pre-filled email client
    openMailto(form);
    setStatus('mailto');
  };

  if (status === 'success' || status === 'mailto') {
    const isMailto = status === 'mailto';
    return (
      <section id="contact" className="section contact-section" ref={ref}>
        <div className="container">
          <div className="contact-wrapper">
            <div className="contact-success">
              <span className="success-icon">{isMailto ? '✉' : '✓'}</span>
              <h3>{isMailto ? c.mailtoTitle : c.successTitle}</h3>
              <p>{isMailto ? c.mailtoMsg : c.successMsg}</p>
              <button className="btn-primary" onClick={reset}>
                {c.sendAnother}
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="section contact-section" ref={ref}>
      <div className={`container fade-up${inView ? ' visible' : ''}`}>
        <div className="section-header">
          <span className="section-tag">{c.tag}</span>
          <h2 className="section-title">{c.title}</h2>
          <p className="section-subtitle">{c.subtitle}</p>
        </div>
        <div className="contact-wrapper">
          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">{c.nameLabel}</label>
                <input id="name" name="name" type="text" placeholder={c.namePh}
                  value={form.name} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="email">{c.emailLabel}</label>
                <input id="email" name="email" type="email" placeholder={c.emailPh}
                  value={form.email} onChange={handleChange} required />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="subject">{c.subjectLabel}</label>
              <input id="subject" name="subject" type="text" placeholder={c.subjectPh}
                value={form.subject} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="message">{c.messageLabel}</label>
              <textarea id="message" name="message" rows={5} placeholder={c.messagePh}
                value={form.message} onChange={handleChange} required />
            </div>

            {TURNSTILE_SITE_KEY && (
              <Turnstile
                ref={turnstileRef}
                siteKey={TURNSTILE_SITE_KEY}
                options={{ size: 'invisible', execution: 'render' }}
                onSuccess={(token) => setTsToken(token)}
                onExpire={() => setTsToken(null)}
                onError={() => setTsToken(null)}
              />
            )}

            {status === 'error' && (
              <p className="form-error">{c.error}</p>
            )}
            <button
              type="submit"
              className={`btn-primary form-submit${status === 'sending' ? ' sending' : ''}`}
              disabled={status === 'sending'}
            >
              {status === 'sending'
                ? <><span className="spinner" /> {c.sending}</>
                : c.send
              }
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
