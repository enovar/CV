import { useState, useRef } from 'react';
import { Turnstile } from '@marsidev/react-turnstile';
import { useInView } from '../hooks/useInView';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/maqpoyaj';
const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY;

export default function Contact() {
  const [ref, inView] = useInView();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
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
          <span className="section-tag">Contacto</span>
          <h2 className="section-title">Vamos falar?</h2>
          <p className="section-subtitle">Tem um projeto em mente? Entre em contacto.</p>
        </div>
        <div className="contact-wrapper">
          {status === 'success' ? (
            <div className="contact-success">
              <span className="success-icon">✓</span>
              <h3>Mensagem enviada!</h3>
              <p>Obrigado pelo contacto. Responderei o mais brevemente possível.</p>
              <button className="btn-primary" onClick={() => setStatus('idle')}>
                Enviar outra mensagem
              </button>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Nome</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="O seu nome"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="o.seu@email.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="subject">Assunto</label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  placeholder="Projeto WordPress, consultoria, ..."
                  value={form.subject}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Mensagem</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="Descreva o seu projeto ou questão..."
                  value={form.message}
                  onChange={handleChange}
                  required
                />
              </div>

              {TURNSTILE_SITE_KEY && (
                <Turnstile
                  ref={turnstileRef}
                  siteKey={TURNSTILE_SITE_KEY}
                  options={{ size: 'invisible', execution: 'render' }}
                />
              )}

              {status === 'error' && (
                <p className="form-error">Ocorreu um erro. Tente novamente.</p>
              )}
              <button
                type="submit"
                className={`btn-primary form-submit${status === 'sending' ? ' sending' : ''}`}
                disabled={status === 'sending'}
              >
                {status === 'sending' ? (
                  <><span className="spinner" /> A enviar...</>
                ) : (
                  'Enviar mensagem'
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
