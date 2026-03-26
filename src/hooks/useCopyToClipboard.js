import { useState, useCallback, useRef } from 'react';

export function useCopyToClipboard(resetDelay = 1600) {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef(null);

  const copy = useCallback((text) => {
    if (!navigator?.clipboard) return;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setCopied(false), resetDelay);
    });
  }, [resetDelay]);

  return { copied, copy };
}
