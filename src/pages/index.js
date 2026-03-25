import React, { useEffect } from 'react';
import Head from '@docusaurus/Head';
import { TiSocialGithub, TiSocialLinkedin, TiSocialTwitter } from 'react-icons/ti';
import { SiBehance } from 'react-icons/si';
import { HiOutlineMail } from 'react-icons/hi';
import styles from './index.module.css';
import ConfluxCanvas from '../components/ConfluxCanvas';

export default function Home() {
  useEffect(() => {
    document.documentElement.classList.add('portfolio-page');
    return () => {
      document.documentElement.classList.remove('portfolio-page');
    };
  }, []);

  return (
    <>
      <Head>
        <title>Tanya Jain</title>
        <meta name="description" content="Senior Software Engineer, Full Stack & GenAI Specialist, Founder, Creative Director." />
        <meta name="theme-color" content="#0a0a0f" />
      </Head>

      {/* Skip link */}
      <a href="#main-content" className={styles.skipLink}>
        Skip to main content
      </a>

      {/* Floating pill nav */}
      <nav
        className={styles.nav}
        aria-label="Primary navigation"
        role="navigation"
      >
        <div className={styles.navInner}>
          <span className={styles.navBrand} aria-hidden="true">TJ</span>
          <ul className={styles.navLinks} role="list">
            <li><a href="/essays" className={styles.navLink}>Essays</a></li>
            <li><a href="/docs/intro" className={styles.navLink}>About</a></li>
            <li>
              <a
                href="mailto:tanyaacjain@gmail.com"
                className={styles.navLink}
                aria-label="Contact via email"
              >
                <HiOutlineMail aria-hidden="true" className={styles.navIcon} />
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <main id="main-content" className={styles.page} tabIndex={-1}>
        <section className={styles.hero} aria-labelledby="hero-name">
          <ConfluxCanvas />
          <div className={styles.heroContent}>
            <p className={styles.heroEyebrow} aria-hidden="true">
              — Engineer &nbsp;·&nbsp; Founder &nbsp;·&nbsp; Creative Director
            </p>
            <h1 id="hero-name" className={styles.heroName}>
              Tanya Jain
            </h1>
            <p className={styles.heroTitle}>
              Full Stack &amp; GenAI Specialist
            </p>
            <p
              className={styles.heroTagline}
              aria-label="Tagline: despite it all, a computer scientist"
            >
              despite it all, a human computer scientist
            </p>
            <div className={styles.heroSocial} role="list" aria-label="Social links">
              <a
                href="https://github.com/tanyaacjain"
                className={styles.socialIcon}
                aria-label="GitHub"
                target="_blank"
                rel="noreferrer"
                role="listitem"
              >
                <TiSocialGithub aria-hidden="true" />
              </a>
              <a
                href="https://www.linkedin.com/in/tanyaacjain/"
                className={styles.socialIcon}
                aria-label="LinkedIn"
                target="_blank"
                rel="noreferrer"
                role="listitem"
              >
                <TiSocialLinkedin aria-hidden="true" />
              </a>
              <a
                href="https://twitter.com/tanyaacjain"
                className={styles.socialIcon}
                aria-label="Twitter"
                target="_blank"
                rel="noreferrer"
                role="listitem"
              >
                <TiSocialTwitter aria-hidden="true" />
              </a>
              <a
                href="https://www.behance.net/Tanya-Jain"
                className={styles.socialIcon}
                aria-label="Behance"
                target="_blank"
                rel="noreferrer"
                role="listitem"
              >
                <SiBehance aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className={styles.scrollIndicator} aria-hidden="true">
            <div className={styles.scrollDot} />
          </div>
        </section>

      </main>
    </>
  );
}
