import React from 'react';
import { HiOutlineMail } from 'react-icons/hi';
import styles from './styles.module.css';
import CopyButton from '../CopyButton';
import { NAV_ITEMS } from '@site/src/config/blogs';

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
          {NAV_ITEMS.map(navItem => (
            <li key={navItem.link}>
              <a
                href={"/" + navItem.link}
                className={`${styles.navLink}${activeLink === navItem.link ? ` ${styles.navLinkActive}` : ''}`}
              >
                {navItem.label}
              </a>
            </li>
          ))}
          <li>
            <CopyButton
              text="tanyaacjain@gmail.com"
              className={styles.navLink}
              aria-label="Copy email address"
            >
              <HiOutlineMail aria-hidden="true" className={styles.navIcon} />
            </CopyButton>
          </li>
        </ul>
      </div>
    </nav>
  );
}
