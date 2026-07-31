import { useEffect, useRef } from 'react';
import { ADSENSE } from '../config';

/**
 * Web reklam alanı (Google AdSense).
 *
 * Web'de AdMob native modülü yoktur; sitenin karşılığı AdSense'tir. Bu bileşen
 * yalnızca config.ts'teki ADSENSE değerleri DOLU ise bir şey basar — kimlikler
 * boşken hiçbir script yüklenmez ve sayfada boş bir kutu kalmaz.
 *
 * Not: bu dosya sadece web build'ine girer, o yüzden doğrudan DOM öğesi
 * (<ins>) döndürmek güvenlidir; react-native-web zaten DOM'a render eder.
 */

let scriptAdded = false;

/** AdSense kütüphanesini sayfaya bir kez ekler. */
function ensureScript(client: string): void {
  if (scriptAdded || typeof document === 'undefined') return;
  scriptAdded = true;
  const s = document.createElement('script');
  s.async = true;
  s.crossOrigin = 'anonymous';
  s.src =
    'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=' +
    encodeURIComponent(client);
  document.head.appendChild(s);
}

export function WebAdSlot({ slot }: { slot: 'result' }) {
  const pushed = useRef(false);
  const client = ADSENSE.client;
  const unit = ADSENSE.slots[slot];
  const enabled = Boolean(client && unit);

  useEffect(() => {
    if (!enabled || pushed.current) return;
    pushed.current = true;
    ensureScript(client);
    try {
      // AdSense, <ins> sayfaya girdikten sonra bu kuyruğa itilince doldurur.
      const w = window as unknown as { adsbygoogle?: unknown[] };
      w.adsbygoogle = w.adsbygoogle || [];
      w.adsbygoogle.push({});
    } catch (e) {
      console.log('AdSense yüklenemedi:', e);
    }
  }, [enabled, client]);

  if (!enabled) return null;

  return (
    <ins
      className="adsbygoogle"
      style={{ display: 'block', width: '100%', marginTop: 16 }}
      data-ad-client={client}
      data-ad-slot={unit}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
}
