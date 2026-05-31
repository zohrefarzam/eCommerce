'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

const LEFT_HOME_KEY = 'storefront:left-home';

function readRemountKey(): number {
  if (typeof window === 'undefined') return 0;
  try {
    return sessionStorage.getItem(LEFT_HOME_KEY) === '1' ? 1 : 0;
  } catch {
    return 0;
  }
}

function markLeftHome() {
  try {
    sessionStorage.setItem(LEFT_HOME_KEY, '1');
  } catch {
    /* ignore */
  }
}

function clearLeftHome() {
  try {
    sessionStorage.removeItem(LEFT_HOME_KEY);
  } catch {
    /* ignore */
  }
}

/**
 * React key segment for components that break when Next.js restores the home
 * page from the router cache (GSAP CardSwap, Swiper, local next/image assets).
 */
export function useRemountOnReturn(homePath = '/') {
  const pathname = usePathname();
  const [key, setKey] = useState(readRemountKey);
  const leftHome = useRef(false);

  useEffect(() => {
    if (pathname !== homePath) {
      markLeftHome();
      leftHome.current = true;
      return;
    }

    clearLeftHome();

    // Soft client navigation back while this instance stayed mounted.
    if (leftHome.current) {
      leftHome.current = false;
      setKey((k) => k + 1);
    }
  }, [pathname, homePath]);

  useEffect(() => {
    const onPageShow = (event: PageTransitionEvent) => {
      if (event.persisted && window.location.pathname === homePath) {
        setKey((k) => k + 1);
      }
    };
    window.addEventListener('pageshow', onPageShow);
    return () => window.removeEventListener('pageshow', onPageShow);
  }, [homePath]);

  return key;
}
