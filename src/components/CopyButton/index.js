import React from 'react';
import { useCopyToClipboard } from '../../hooks/useCopyToClipboard';
import styles from './styles.module.css';

export default function CopyButton({
  text,
  children,
  className,
  feedbackDuration = 1600,
  ...props
}) {
  const { copied, copy } = useCopyToClipboard(feedbackDuration);

  return (
    <button
      type="button"
      className={`${styles.copyButton}${className ? ` ${className}` : ''}`}
      onClick={() => copy(text)}
      {...props}
    >
      {children}
      {copied && (
        <span className={styles.badge} role="status" aria-live="polite">
          copied email
        </span>
      )}
    </button>
  );
}
