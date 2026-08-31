/**
 * Google Analytics 4 (GA4) privacy-conscious, framework-native tracking utility.
 *
 * Requirements:
 * - Loads asynchronously ONLY when a valid GA Measurement ID is present.
 * - Does NOT collect any Personally Identifiable Information (PII) like names, emails, or form inputs.
 * - Handles client-side SPA route transitions without duplicate events.
 * - Gracefully falls back to no-op if GA is absent or blocked.
 */

import { GA_MEASUREMENT_ID } from "@/config/site";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

let isInitialized = false;

/**
 * Validates if the GA Measurement ID format is well-formed (e.g. G-XXXXXXXXXX)
 */
export function isValidMeasurementId(id?: string): boolean {
  if (!id) return false;
  return /^G-[A-Z0-9]+$/i.test(id.trim());
}

/**
 * Dynamically loads and initializes the Google Tag script if configured.
 */
export function initGA(): void {
  if (typeof window === "undefined" || isInitialized) return;
  if (!isValidMeasurementId(GA_MEASUREMENT_ID)) return;

  const measurementId = GA_MEASUREMENT_ID!.trim();

  // Create dataLayer and gtag function
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer?.push(args);
  };

  window.gtag("js", new Date());
  // Standard Google Tag config
  window.gtag("config", measurementId);

  // Inject Google Tag script
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
  document.head.appendChild(script);

  isInitialized = true;
}

/**
 * Tracks a page view for client-side single page navigation.
 */
export function trackPageView(path: string, title?: string): void {
  if (typeof window === "undefined" || !window.gtag || !isValidMeasurementId(GA_MEASUREMENT_ID)) {
    return;
  }

  const measurementId = GA_MEASUREMENT_ID!.trim();

  window.gtag("event", "page_view", {
    send_to: measurementId,
    page_path: path,
    page_title: title || document.title,
    page_location: window.location.href,
  });
}

/**
 * Safe custom event tracking without any PII.
 */
export function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean | undefined>
): void {
  if (typeof window === "undefined" || !window.gtag || !isValidMeasurementId(GA_MEASUREMENT_ID)) {
    return;
  }

  // Filter out any undefined or accidentally nested sensitive parameters
  const cleanParams: Record<string, string | number | boolean> = {};
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined) {
        cleanParams[key] = value;
      }
    }
  }

  window.gtag("event", eventName, cleanParams);
}
