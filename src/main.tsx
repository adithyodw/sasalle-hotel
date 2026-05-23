import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

function initNativeMobileClass() {
  const isCapacitor =
    typeof (window as Window & { Capacitor?: unknown }).Capacitor !== 'undefined';
  const isCoarse = window.matchMedia('(pointer: coarse)').matches;
  const isNarrow = window.innerWidth < 768;
  const isMobileUA = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);

  if (isCapacitor || isMobileUA || (isNarrow && isCoarse)) {
    document.body.classList.add('native-mobile');
  }
}

initNativeMobileClass();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
