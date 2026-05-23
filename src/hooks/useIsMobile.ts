import { useState, useEffect } from 'react';

function detectMobile(): boolean {
  if (typeof window === 'undefined') return false;

  const isCapacitor =
    typeof (window as Window & { Capacitor?: unknown }).Capacitor !== 'undefined';
  const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
  const isNarrowViewport = window.innerWidth < 768;
  const isMobileUA = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);

  return isCapacitor || (isNarrowViewport && (isCoarsePointer || isMobileUA));
}

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(detectMobile);

  useEffect(() => {
    const update = () => setIsMobile(detectMobile());
    update();
    window.addEventListener('resize', update, { passive: true });
    window.addEventListener('orientationchange', update);
    return () => {
      window.removeEventListener('resize', update);
      window.removeEventListener('orientationchange', update);
    };
  }, []);

  return isMobile;
}
