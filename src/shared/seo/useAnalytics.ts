import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { initGA, trackPageView } from "@/lib/analytics";

/**
 * Hook to automatically initialize Google Analytics 4 (if configured)
 * and track route transitions on client-side navigation without duplicates.
 */
export function useAnalytics() {
  const location = useLocation();
  const prevPathRef = useRef<string | null>(null);

  useEffect(() => {
    initGA();
  }, []);

  useEffect(() => {
    const currentPath = `${location.pathname}${location.search}`;
    // Skip first mount as gtag('config', measurementId) automatically records the landing pageview
    if (prevPathRef.current === null) {
      prevPathRef.current = currentPath;
      return;
    }

    if (prevPathRef.current !== currentPath) {
      prevPathRef.current = currentPath;
      // Slight delay to ensure PageMeta has updated document.title
      const timer = setTimeout(() => {
        trackPageView(currentPath, document.title);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [location.pathname, location.search]);
}
