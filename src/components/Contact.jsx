import { useState, useRef } from 'react';
import { Turnstile } from '@marsidev/react-turnstile';
import { useInView } from '../hooks/useInView';
import { useLang } from '../context/LangContext';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/maqpoyaj';
const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY;

export default function Contact() {
  const [ref, inView] = useInView();
  const { t } = useLang();
  const c = t.contact;
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle');
  const turnstileRef = useRef(null);

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    const token = turnstileRef.current?.getResponse();
    if (!token) {
      setStatus('error');
      return;
    }

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          ...form,
          _replyto: form.email,
          'cf-turnstile-response': token,
        }),
      });
      if (res.ok) {
        setStatus('success');
        setForm({ name: '', email: '', subject: '', message: '' });
        turnstileRef.current?.reset();
      } else {
        setStatus('error');
        turnstileRef.current?.reset();
      }
    } catch {
      setStatus('error');
      turnstileRef.current?.reset();
    }
  };

  return (
    <section id="contact" className="section contact-section" ref={ref}>
      <div className={`container fade-up${inView ? ' visible' : ''}`}>
        <div className="section-header">
          <span className="section-tag">{c.tag}</span>
          <h2 className="section-title">{c.title}</h2>
          <p className="section-subtitle">{c.subtitle}</p>
        </div>
        <div className="contact-wrapper">
          {status === 'success' ? (
            <div className="contact-success">
              <span className="success-icon">✓</span>
              <h3>{c.successTitle}</h3>
              <p>{c.successMsg}</p>
              <button className="btn-primary" onClick={() => setStatus('idle')}>
                {c.sendAnother}
              </button>
            </div>
          ) : (
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
          )}
        </div>
      </div>
    </section>
  );
}
