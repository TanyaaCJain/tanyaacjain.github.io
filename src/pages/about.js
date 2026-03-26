import React, { useEffect } from 'react';
import Head from '@docusaurus/Head';
import { TiSocialGithub, TiSocialLinkedin, TiSocialTwitter } from 'react-icons/ti';
import { SiBehance } from 'react-icons/si';
import styles from './about.module.css';
import FloatingNav from '../components/FloatingNav';
import AmbientCanvas from '../components/AmbientCanvas';

export default function About() {
  useEffect(() => {
    document.documentElement.classList.add('portfolio-page');

    // Section reveal on scroll
    const sections = document.querySelectorAll('.' + styles.revealSection);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.revealed);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    sections.forEach((el) => observer.observe(el));

    return () => {
      document.documentElement.classList.remove('portfolio-page');
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <Head>
        <title>About — Tanya Jain</title>
        <meta name="description" content="AI Engineer, Founder, and Creative Director building at the intersection of intelligence and craft." />
        <meta name="theme-color" content="#0a0a0f" />
      </Head>

      <a href="#main-content" className={styles.skipLink}>
        Skip to main content
      </a>

      <FloatingNav activeLink="about" />

      {/* Canvas is a direct child of .page so it spans the full scrollable height */}
      <main id="main-content" className={styles.page} tabIndex={-1}>
        <AmbientCanvas />

        {/* ── INTRO ─────────────────────────── */}
        <section className={styles.intro} aria-labelledby="about-name">
          <div className={styles.grain} aria-hidden="true" />
          <div className={styles.orb1} aria-hidden="true" />
          <div className={styles.orb2} aria-hidden="true" />
          <div className={styles.orb3} aria-hidden="true" />

          <div className={styles.introContent}>
            <p className={styles.eyebrow} aria-hidden="true">About</p>
            <h1 id="about-name" className={styles.introName}>Tanya Jain</h1>
            <p className={styles.introTagline}>despite it all, a human computer scientist</p>
          </div>
        </section>

        {/* ── BODY ─────────────────────────── */}
        <article className={styles.body}>

          <section className={`${styles.section} ${styles.revealSection}`} aria-label="Biography">
            <p className={styles.lead}>
              I build at the intersection of intelligence and craft — AI systems that think,
              products that feel, and work that matters.
            </p>
            <p className={styles.prose}>
              Born and rooted in India, shaped by the warmth of Thailand, and configured by the
              ambition of the Bay Area — I carry all three places in how I think and what I make.
            </p>
            <p className={styles.prose}>
              I'm an AI engineer who spends her days building full-stack AI applications, ML pipelines and 
              infrastructure, and her evenings thinking about why so much of technology
              feels inhuman. That tension, between efficiency and empathy, between systems and
              stories, is where most of my work lives.
            </p>
          </section>

          <hr className={styles.divider} />

          <section className={`${styles.section} ${styles.revealSection}`} aria-labelledby="roles-label">
            <h2 id="roles-label" className={styles.sectionLabel}>What I do</h2>
            <div className={styles.roles}>
              <div className={styles.roleCard}>
                <span className={styles.roleTitle}>AI Engineer</span>
                <p className={styles.roleDesc}>
                  Large language models, retrieval systems, and the plumbing that makes AI
                  actually useful in production. I care a lot about what happens after the demo.
                </p>
              </div>
              <div className={styles.roleCard}>
                <span className={styles.roleTitle}>Founder</span>
                <p className={styles.roleDesc}>
                  Building products from zero, from the first line of code to the first paying
                  customer. Comfortable with ambiguity; uncomfortable with mediocrity.
                </p>
              </div>
              <div className={styles.roleCard}>
                <span className={styles.roleTitle}>Creative Director</span>
                <p className={styles.roleDesc}>
                  Design with a point of view. Visual systems, motion, and interfaces that feel
                  considered and functional.
                </p>
              </div>
            </div>
          </section>

          <hr className={styles.divider} />

          <section className={`${styles.section} ${styles.revealSection}`} aria-labelledby="writing-label">
            <h2 id="writing-label" className={styles.sectionLabel}>Writing</h2>
            <p className={styles.prose}>
              I write about technology, systems, and the quieter things in between - the kind of
              thinking that doesn't fit cleanly into a PRD or a pull request. Sometimes personal,
              sometimes technical, always honest.
            </p>
            <a href="/essays" className={styles.cta}>
              Read the essays <span aria-hidden="true">→</span>
            </a>
          </section>

          <hr className={styles.divider} />

          <section className={`${styles.section} ${styles.revealSection}`} aria-labelledby="elsewhere-label">
            <h2 id="elsewhere-label" className={styles.sectionLabel}>Elsewhere</h2>
            <div className={styles.socialPills} role="list" aria-label="Social links">
              <a href="https://github.com/tanyaacjain" className={styles.socialPill} aria-label="GitHub" target="_blank" rel="noreferrer" role="listitem">
                <TiSocialGithub aria-hidden="true" className={styles.socialPillIcon} />
                <span>GitHub</span>
              </a>
              <a href="https://www.linkedin.com/in/tanyaacjain/" className={styles.socialPill} aria-label="LinkedIn" target="_blank" rel="noreferrer" role="listitem">
                <TiSocialLinkedin aria-hidden="true" className={styles.socialPillIcon} />
                <span>LinkedIn</span>
              </a>
              <a href="https://twitter.com/tanyaacjain" className={styles.socialPill} aria-label="Twitter" target="_blank" rel="noreferrer" role="listitem">
                <TiSocialTwitter aria-hidden="true" className={styles.socialPillIcon} />
                <span>Twitter</span>
              </a>
              <a href="https://www.behance.net/Tanya-Jain" className={styles.socialPill} aria-label="Behance" target="_blank" rel="noreferrer" role="listitem">
                <SiBehance aria-hidden="true" className={styles.socialPillIcon} />
                <span>Behance</span>
              </a>
            </div>
          </section>

          <hr className={styles.divider} />

          <section className={`${styles.section} ${styles.revealSection}`} aria-label="Contact">
            <p className={styles.contactNote}>
              If you're building something interesting, want to collaborate, or just want to
              talk —{' '}
              <a href="mailto:tanyaacjain@gmail.com" className={styles.emailLink}>
                write to me.
              </a>
            </p>
          </section>

        </article>
      </main>
    </>
  );
}
