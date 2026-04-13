import { useState, useEffect, useCallback, useRef } from 'react';

const TOTAL_SECONDS = 10 * 60; // 10 minutes

export function useTimer(isActive: boolean, onTimeUp: () => void) {
  const [remaining, setRemaining] = useState(TOTAL_SECONDS);
  const onTimeUpRef = useRef(onTimeUp);
  onTimeUpRef.current = onTimeUp;

  // Reset timer when assessment starts
  useEffect(() => {
    if (isActive) {
      setRemaining(TOTAL_SECONDS);
    }
  }, [isActive]);

  useEffect(() => {
    if (!isActive || remaining <= 0) return;

    const id = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(id);
          onTimeUpRef.current();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(id);
  }, [isActive, remaining <= 0]);

  const minutes = Math.floor(remaining / 60);
  const seconds = remaining % 60;
  const display = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  const progress = ((TOTAL_SECONDS - remaining) / TOTAL_SECONDS) * 100;
  const isLow = remaining <= 60; // last minute warning

  return { remaining, display, progress, isLow, totalSeconds: TOTAL_SECONDS };
}
