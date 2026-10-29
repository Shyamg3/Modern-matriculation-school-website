import { useEffect, useRef, useState } from 'react';
import { CONTACT, copy } from './copy';
import { gallery, photos } from './photos';
import {
  IconArrowRight,
  IconArrowUpRight,
  IconBook,
  IconClose,
  IconHeart,
  IconInfo,
  IconMenu,
  IconPhone,
  IconPin,
  IconUsers,
  IconWhatsApp,
} from './icons';

const LANG_KEY = 'modern-matric-lang';

function readInitialLang() {
  const param = new URLSearchParams(window.location.search).get('lang');
  if (param === 'ta' || param === 'en') return param;
  try {
    const saved = window.localStorage.getItem(LANG_KEY);
    if (saved === 'ta' || saved === 'en') return saved;
  } catch {
    /* storage may be unavailable */
  }
  return 'en';
}

function Crest() {
  return (
    <span className="crest" aria-hidden="true">
      <span>M</span>
    </span>
  );
}

function Brand({ t, light = false, onClick }) {
  return (
    <a
      className={`brand${light ? ' brand-light' : ''}`}
      href="#top"
      aria-label="Modern Matric Higher Secondary School — home"
      onClick={onClick}
    >
      <Crest />
      <span className="brand-text">
        <span className="brand-name">MODERN</span>
        <span className="brand-sub">{t.misc.brandSub}</span>
      </span>
    </a>
  );
}

function useReveal() {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll('[data-reveal]'));
    if (!('IntersectionObserver' in window)) {
      nodes.forEach((node) => {
        node.dataset.visible = 'true';
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.dataset.visible = 'true';
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -6% 0px', threshold: 0.08 },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);
}

export default function App() {
  const [lang, setLang] = useState(readInitialLang);
  const [menuOpen, setMenuOpen] = useState(false);
  const drawerRef = useRef(null);
  const menuBtnRef = useRef(null);
  const closeBtnRef = useRef(null);
  const t = copy[lang];

  useReveal();

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = t.meta.title;
    const description = document.querySelector('meta[name="description"]');
    if (description) description.setAttribute('content', t.meta.description);
    try {
      window.localStorage.setItem(LANG_KEY, lang);
    } catch {
      /* storage may be unavailable */
    }
  }, [lang, t]);

  useEffect(() => {
    if (!menuOpen) return undefined;

    const drawer = drawerRef.current;
    const previousFocus = document.activeElement;
    const focusables = () =>
      Array.from(drawer.querySelectorAll('a[href], button:not([disabled])'));

    document.body.style.overflow = 'hidden';
    const focusTimer = window.setTimeout(() => closeBtnRef.current?.focus(), 80);

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        return;
      }
      if (event.key !== 'Tab') return;

      const items = focusables();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
      const restoreTo =
        previousFocus instanceof HTMLElement && previousFocus !== document.body
          ? previousFocus
          : menuBtnRef.current;
      restoreTo?.focus();
    };
  }, [menuOpen]);

  useEffect(() => {
    const media = window.matchMedia('(min-width: 1024px)');
    const onChange = (event) => {
      if (event.matches) setMenuOpen(false);
    };
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  const waLink = `${CONTACT.whatsapp}?text=${encodeURIComponent(
    t.admissions.whatsappMessage,
  )}`;

  const navItems = [
    { href: '#about', label: t.nav.about },
    { href: '#academics', label: t.nav.academics },
    { href: '#campus', label: t.nav.campus },
    { href: '#achievements', label: t.nav.achievements },
    { href: '#admissions', label: t.nav.admissions },
    { href: '#contact', label: t.nav.contact },
  ];

  const pillarIcons = [IconBook, IconUsers, IconHeart];

  return (
    <div className="site">
      <a className="skip-link" href="#main">
        {t.misc.skip}
      </a>

      <div className="utility" id="top">
        <div className="container utility-inner">
          <span className="utility-item utility-address">
            <IconPin />
            {t.misc.addressShort}
          </span>
          <span className="utility-divider" aria-hidden="true" />
          <a className="utility-item" href={CONTACT.phoneHref}>
            <IconPhone />
            {CONTACT.phoneDisplay}
          </a>
          <div className="utility-right">
            <span className="utility-note">{t.misc.admissionsNote}</span>
            <div className="lang" role="group" aria-label={t.misc.language}>
              <button
                type="button"
                lang="en"
                aria-pressed={lang === 'en'}
                onClick={() => setLang('en')}
              >
                EN
              </button>
              <button
                type="button"
                lang="ta"
                aria-pressed={lang === 'ta'}
                onClick={() => setLang('ta')}
              >
                தமிழ்
              </button>
            </div>
          </div>
        </div>
      </div>

      <header className="site-header">
        <div className="container header-inner">
          <Brand t={t} />
          <nav className="nav" aria-label={t.misc.primaryNav}>
            {navItems.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>
          <a className="btn btn-primary header-cta" href="#admissions">
            <span>{t.cta.apply}</span>
            <IconArrowUpRight />
          </a>
          <button
            ref={menuBtnRef}
            className="menu-btn"
            type="button"
            aria-label={t.misc.menu}
            aria-expanded={menuOpen}
            aria-controls="drawer"
            onClick={() => setMenuOpen(true)}
          >
            <IconMenu />
          </button>
        </div>
      </header>

      <main id="main" tabIndex={-1}>
        <section className="hero" aria-labelledby="hero-title">
          <div className="container hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">{t.hero.eyebrow}</p>
              <h1 id="hero-title">
                {t.hero.headline[0]}
                <span className="shine">{t.hero.headline[1]}</span>
                {t.hero.headline[2]}
              </h1>
              <p className="lead">
                {t.hero.lead[0]}
                <strong>{t.hero.lead[1]}</strong>
                {t.hero.lead[2]}
              </p>
              <div className="hero-actions">
                <a className="btn btn-primary" href="#admissions">
                  <span>{t.cta.exploreAdmissions}</span>
                  <IconArrowUpRight />
                </a>
                <a className="btn btn-ghost" href="#contact">
                  <span>{t.cta.visitCampus}</span>
                  <IconArrowRight />
                </a>
              </div>
              <ul className="trust">
                {t.hero.chips.map((chip) => (
                  <li key={chip}>{chip}</li>
                ))}
              </ul>
            </div>

            <div className="visual">
              <div className="photo-frame">
                <img
                  src={photos.play}
                  alt={t.hero.imgAlt}
                  width="765"
                  height="1020"
                  fetchPriority="high"
                />
              </div>
              <div className="seal" aria-label={t.hero.sealLabel}>
                <span className="seal-since">{t.hero.sealSince}</span>
                <span className="seal-year">1969</span>
                <span className="seal-years">{t.hero.sealYears}</span>
              </div>
              <span className="visual-caption">{t.hero.caption}</span>
            </div>
          </div>
        </section>

        <section className="section about" id="about" aria-labelledby="about-title">
          <div className="container about-grid">
            <div className="about-media" data-reveal>
              <div className="media-frame">
                <img
                  src={photos.campus}
                  alt={t.about.imgAlt}
                  width="1360"
                  height="1020"
                  loading="lazy"
                />
              </div>
              <div className="stamp" aria-hidden="true">
                <span>EST.</span>
                <strong>1969</strong>
                <span>CUDDALORE</span>
              </div>
              <div className="fact-card">
                <span>{t.about.factLabel}</span>
                <strong>{t.about.factValue}</strong>
              </div>
              <p className="media-caption">{t.about.caption}</p>
            </div>

            <div className="about-copy" data-reveal style={{ '--delay': '90ms' }}>
              <p className="eyebrow">{t.about.eyebrow}</p>
              <h2 id="about-title">{t.about.title}</h2>
              <p>{t.about.body1}</p>
              <p>{t.about.body2}</p>
              <a className="text-link" href="#academics">
                {t.about.link}
                <IconArrowRight />
              </a>
            </div>
          </div>
        </section>

        <section
          className="section academics"
          id="academics"
          aria-labelledby="academics-title"
        >
          <div className="container">
            <div className="section-head" data-reveal>
              <p className="eyebrow">{t.academics.eyebrow}</p>
              <h2 id="academics-title">{t.academics.title}</h2>
              <p className="section-lead">{t.academics.lead}</p>
            </div>

            <div className="stage-grid">
              {t.academics.stages.map((stage, index) => (
                <article
                  className="stage"
                  key={stage.level}
                  data-reveal
                  style={{ '--delay': `${index * 70}ms` }}
                >
                  <span className="stage-num">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3>{stage.level}</h3>
                  <span className="stage-classes">{stage.classes}</span>
                  <p>{stage.body}</p>
                </article>
              ))}
            </div>

            <div className="note-row" data-reveal>
              <p>
                <IconInfo />
                {t.academics.note}
              </p>
              <a className="text-link" href="#contact">
                {t.academics.noteLink}
                <IconArrowRight />
              </a>
            </div>
          </div>
        </section>

        <section className="section why" id="why" aria-labelledby="why-title">
          <div className="container">
            <div className="section-head section-head-wide" data-reveal>
              <p className="eyebrow">{t.why.eyebrow}</p>
              <h2 id="why-title">{t.why.title}</h2>
              <p className="section-lead">{t.why.lead}</p>
            </div>

            <div className="pillar-grid">
              {t.why.pillars.map((pillar, index) => {
                const Icon = pillarIcons[index];
                return (
                  <article
                    className="pillar"
                    key={pillar.title}
                    data-reveal
                    style={{ '--delay': `${index * 80}ms` }}
                  >
                    <span className="pillar-icon">
                      <Icon />
                    </span>
                    <h3>{pillar.title}</h3>
                    <p>{pillar.body}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section
          className="section campus"
          id="campus"
          aria-labelledby="campus-title"
        >
          <div className="container">
            <div className="section-head section-head-wide" data-reveal>
              <p className="eyebrow">{t.campus.eyebrow}</p>
              <h2 id="campus-title">{t.campus.title}</h2>
              <p className="section-lead">{t.campus.lead}</p>
            </div>

            <div className="gallery">
              {gallery.map((photo, index) => (
                <figure
                  className={`gallery-item gallery-${photo.key}`}
                  key={photo.key}
                  data-reveal
                  style={{ '--delay': `${index * 60}ms` }}
                >
                  <img
                    src={photo.src}
                    alt={t.campus.items[photo.key].alt}
                    loading="lazy"
                  />
                  <figcaption>
                    {t.campus.items[photo.key].caption}
                  </figcaption>
                </figure>
              ))}
            </div>

            <p className="gallery-credit">{t.campus.credit}</p>
          </div>
        </section>

        <section
          className="section achievements"
          id="achievements"
          aria-labelledby="achievements-title"
        >
          <div className="container ach-grid">
            <div className="ach-media" data-reveal>
              <img
                src={photos.sports}
                alt={t.achievements.featureAlt}
                width="1360"
                height="904"
                loading="lazy"
              />
              <p className="feature-tag">{t.achievements.featureCaption}</p>
            </div>

            <div className="ach-copy" data-reveal style={{ '--delay': '90ms' }}>
              <p className="eyebrow">{t.achievements.eyebrow}</p>
              <h2 id="achievements-title">{t.achievements.title}</h2>
              <p className="section-lead">{t.achievements.lead}</p>
              <ul className="ach-list">
                {t.achievements.items.map((item, index) => (
                  <li key={item.title}>
                    <span className="ach-num">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.body}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section
          className="section admissions"
          id="admissions"
          aria-labelledby="admissions-title"
        >
          <div className="container">
            <div className="section-head admissions-head" data-reveal>
              <p className="eyebrow">{t.admissions.eyebrow}</p>
              <h2 id="admissions-title">{t.admissions.title}</h2>
              <p className="section-lead">{t.admissions.lead}</p>
              <p className="small-note">
                <IconInfo />
                {t.admissions.note}
              </p>
            </div>

            <div className="admissions-grid">
              <ol className="steps">
                {t.admissions.steps.map((step, index) => (
                  <li
                    className="step"
                    key={step.title}
                    data-reveal
                    style={{ '--delay': `${index * 80}ms` }}
                  >
                    <span className="step-num">{index + 1}</span>
                    <div>
                      <h3>{step.title}</h3>
                      <p>{step.body}</p>
                    </div>
                  </li>
                ))}
              </ol>

              <aside className="office-card" data-reveal style={{ '--delay': '120ms' }}>
                <p className="eyebrow">{t.admissions.cardEyebrow}</p>
                <h3>{t.admissions.cardTitle}</h3>
                <p className="office-body">{t.admissions.cardBody}</p>
                <a className="office-phone" href={CONTACT.phoneHref}>
                  <IconPhone />
                  {CONTACT.phoneDisplay}
                </a>
                <div className="office-actions">
                  <a
                    className="btn btn-primary"
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <IconWhatsApp />
                    <span>{t.cta.chatWhatsApp}</span>
                  </a>
                  <a className="btn btn-ghost-light" href={CONTACT.phoneHref}>
                    <IconPhone />
                    <span>{t.cta.callNow}</span>
                  </a>
                </div>
                <p className="office-note">{t.admissions.cardNote}</p>
              </aside>
            </div>
          </div>
        </section>

        <section className="section visit" id="contact" aria-labelledby="visit-title">
          <div className="container visit-grid">
            <div className="visit-copy" data-reveal>
              <p className="eyebrow">{t.visit.eyebrow}</p>
              <h2 id="visit-title">{t.visit.title}</h2>
              <p className="section-lead">{t.visit.body}</p>

              <div className="contact-rows">
                <div className="contact-row">
                  <span className="contact-icon">
                    <IconPin />
                  </span>
                  <div>
                    <span className="contact-label">{t.visit.addressLabel}</span>
                    <p>{lang === 'ta' ? CONTACT.addressTa : CONTACT.addressEn}</p>
                  </div>
                </div>
                <div className="contact-row">
                  <span className="contact-icon">
                    <IconPhone />
                  </span>
                  <div>
                    <span className="contact-label">{t.visit.phoneLabel}</span>
                    <a href={CONTACT.phoneHref}>{CONTACT.phoneDisplay}</a>
                  </div>
                </div>
              </div>

              <div className="visit-actions">
                <a
                  className="btn btn-primary"
                  href={CONTACT.directions}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>{t.cta.directions}</span>
                  <IconArrowUpRight />
                </a>
                <a className="text-link" href={CONTACT.phoneHref}>
                  {t.cta.talkToSchool}
                  <IconArrowRight />
                </a>
              </div>

              <p className="visit-note">
                <IconInfo />
                {t.visit.note}
              </p>
            </div>

            <div className="map-wrap" data-reveal style={{ '--delay': '90ms' }}>
              <div className="map-frame">
                <iframe
                  title={t.visit.mapTitle}
                  src={CONTACT.mapEmbed}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <a
                className="map-link"
                href={CONTACT.directions}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t.visit.mapFallback}
                <IconArrowUpRight />
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <Brand t={t} light />
              <p className="footer-tagline">{t.footer.tagline}</p>
              <p className="footer-tamil" lang="ta">
                {CONTACT.tamilName}
              </p>
            </div>

            <nav className="footer-col" aria-label={t.footer.exploreLabel}>
              <h3>{t.footer.exploreLabel}</h3>
              <ul>
                {navItems.map((item) => (
                  <li key={item.href}>
                    <a href={item.href}>{item.label}</a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="footer-col">
              <h3>{t.footer.contactLabel}</h3>
              <address>
                <span>{lang === 'ta' ? CONTACT.addressTa : CONTACT.addressEn}</span>
                <a href={CONTACT.phoneHref}>{CONTACT.phoneDisplay}</a>
              </address>
            </div>

            <div className="footer-col">
              <h3>{t.footer.recognitionLabel}</h3>
              <p className="footer-rec">{t.footer.recognitionValue}</p>
              <p className="footer-est">{t.about.stamp}</p>
            </div>
          </div>

          <div className="footer-bottom">
            <p>{t.footer.copyright}</p>
            <p>{t.footer.credit}</p>
          </div>
        </div>
      </footer>

      <div
        className="drawer"
        id="drawer"
        ref={drawerRef}
        data-open={menuOpen}
        role="dialog"
        aria-modal="true"
        aria-label={t.misc.menuTitle}
      >
        <div className="drawer-top">
          <Brand t={t} onClick={() => setMenuOpen(false)} />
          <button
            ref={closeBtnRef}
            className="icon-btn"
            type="button"
            aria-label={t.misc.close}
            onClick={() => setMenuOpen(false)}
          >
            <IconClose />
          </button>
        </div>

        <nav className="drawer-nav" aria-label={t.misc.mobileNav}>
          {navItems.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
              {item.label}
              <IconArrowRight />
            </a>
          ))}
        </nav>

        <a
          className="btn btn-primary drawer-cta"
          href="#admissions"
          onClick={() => setMenuOpen(false)}
        >
          <span>{t.cta.apply}</span>
          <IconArrowUpRight />
        </a>

        <p className="drawer-note">
          <a href={CONTACT.phoneHref}>{CONTACT.phoneDisplay}</a>
          <br />
          {lang === 'ta' ? CONTACT.addressTa : CONTACT.addressEn}
        </p>
      </div>

      <nav className="mobile-bar" aria-label={t.misc.quickActions}>
        <a href={CONTACT.phoneHref}>
          <IconPhone />
          <span>{t.misc.call}</span>
        </a>
        <a href={waLink} target="_blank" rel="noopener noreferrer">
          <IconWhatsApp />
          <span>{t.misc.whatsapp}</span>
        </a>
        <a className="apply" href="#admissions">
          <IconArrowUpRight />
          <span>{t.misc.apply}</span>
        </a>
      </nav>
    </div>
  );
}
