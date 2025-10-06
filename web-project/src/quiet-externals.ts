// Gate third-party calls so ad blockers don't spam errors
(function () {
  const isBlocked = () => {
    // dnt or Brave shields
    return (
      (typeof navigator !== "undefined" && (navigator.doNotTrack === "1" || (navigator as any).globalPrivacyControl)) ||
      (typeof window !== "undefined" && (window as any).brave)
    );
  };

  // Stub global trackers that might be referenced
  if (isBlocked()) {
    const noop = () => {};
    (window as any).gtag = (window as any).gtm = (window as any).dataLayer = noop;
    (window as any).UnifyIntent = { track: noop, page: noop, event: noop };
    // Fail-safe fetch wrapper for known hosts
    const origFetch = window.fetch?.bind(window);
    if (origFetch) {
      window.fetch = (input: RequestInfo | URL, init?: RequestInit) => {
        try {
          const url = String(input);
          if (/googleads\.g\.doubleclick\.net|unifyintent\.com/i.test(url)) {
            return Promise.resolve(new Response(null, { status: 204 }));
          }
        } catch {}
        return origFetch(input, init);
      };
    }
  }
})();
