import React from 'react';
import { HiOutlineMail } from 'react-icons/hi';
import styles from './styles.module.css';

export default function FloatingNav({ activeLink }) {
  return (
    <nav
      className={styles.nav}
      aria-label="Primary navigation"
      role="navigation"
    >
      <div className={styles.navInner}>
        <a href="/" className={styles.navBrand} aria-label="Home">TJ</a>
        <ul className={styles.navLinks} role="list">
          <li>
            <a
              href="/essays"
              className={`${styles.navLink}${activeLink === 'essays' ? ` ${styles.navLinkActive}` : ''}`}
            >
              Essays
            </a>
          </li>
          <li>
            <a
              href="/docs/intro"
              className={`${styles.navLink}${activeLink === 'about' ? ` ${styles.navLinkActive}` : ''}`}
            >
              About
            </a>
          </li>
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
  );
}
