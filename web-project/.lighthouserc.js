/**
 * Lighthouse CI Configuration for SmartFarm
 * Runs accessibility, performance, and SEO audits on every build
 */

module.exports = {
  ci: {
    collect: {
      startServerCommand: 'python -m http.server 8080',
      url: [
        'http://localhost:8080/dashboard.html',
        'http://localhost:8080/livestock-management.html',
        'http://localhost:8080/crop-management.html',
        'http://localhost:8080/user-management.html',
      ],
      settings: {
        chromeFlags: '--no-sandbox --headless --disable-gpu',
        preset: 'desktop',
      },
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.8 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['error', { minScore: 0.8 }],
        'categories:seo': ['error', { minScore: 0.8 }],
        
        // Accessibility specific assertions
        'accessibility/aria-hidden-focus': 'error',
        'accessibility/color-contrast': 'error',
        'accessibility/heading-order': 'error',
        'accessibility/label': 'error',
        'accessibility/landmark-one-main': 'error',
        'accessibility/link-name': 'error',
        'accessibility/meta-refresh': 'error',
        'accessibility/meta-viewport': 'error',
        'accessibility/object-alt': 'error',
        'accessibility/role-attributes': 'error',
        'accessibility/scrollable-region-focusable': 'error',
        'accessibility/select-name': 'error',
        'accessibility/table-caption': 'error',
        'accessibility/td-headers-attr': 'error',
        'accessibility/th-has-data-cells': 'error',
        'accessibility/valid-lang': 'error',
        'accessibility/video-caption': 'error',
        'accessibility/video-description': 'error',
        
        // Performance specific assertions
        'performance/first-contentful-paint': ['error', { maxNumericValue: 2000 }],
        'performance/largest-contentful-paint': ['error', { maxNumericValue: 4000 }],
        'performance/cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
        'performance/speed-index': ['error', { maxNumericValue: 3000 }],
        'performance/interactive': ['error', { maxNumericValue: 3000 }],
        'performance/total-blocking-time': ['error', { maxNumericValue: 300 }],
        
        // Best practices specific assertions
        'best-practices/uses-https': 'error',
        'best-practices/no-vulnerable-libraries': 'error',
        'best-practices/uses-rel-preconnect': 'error',
        'best-practices/uses-rel-preload': 'error',
        'best-practices/no-document-write': 'error',
        'best-practices/no-mixed-content': 'error',
        'best-practices/no-unload-listeners': 'error',
        'best-practices/no-unsized-images': 'error',
        'best-practices/uses-optimized-images': 'error',
        'best-practices/uses-text-compression': 'error',
        'best-practices/uses-webp-images': 'error',
        'best-practices/uses-http2': 'error',
        'best-practices/uses-long-cache-ttl': 'error',
        'best-practices/uses-passive-event-listeners': 'error',
        'best-practices/uses-responsive-images': 'error',
        'best-practices/uses-timestamps-on-video': 'error',
        
        // SEO specific assertions
        'seo/meta-description': 'error',
        'seo/meta-viewport': 'error',
        'seo/hreflang': 'error',
        'seo/robots-txt': 'error',
        'seo/structured-data': 'error',
        'seo/tap-targets': 'error',
        'seo/link-text': 'error',
        'seo/crawlable-anchors': 'error',
        'seo/plugins': 'error',
        'seo/valid-source-maps': 'error',
        'seo/logical-tab-order': 'error',
        'seo/manifest-name': 'error',
        'seo/manifest-short-name': 'error',
        'seo/manifest-display': 'error',
        'seo/manifest-theme-color': 'error',
        'seo/manifest-background-color': 'error',
        'seo/manifest-icons': 'error',
        'seo/manifest-icons-min-192': 'error',
        'seo/manifest-icons-min-512': 'error',
        'seo/manifest-short-name-length': 'error',
        'seo/manifest-theme-color-is-valid': 'error',
        'seo/manifest-background-color-is-valid': 'error',
        'seo/manifest-display-is-valid': 'error',
        'seo/manifest-name-is-valid': 'error',
        'seo/manifest-short-name-is-valid': 'error',
        'seo/manifest-start-url-is-valid': 'error',
        'seo/manifest-short-name-length': 'error',
        'seo/manifest-theme-color-is-valid': 'error',
        'seo/manifest-background-color-is-valid': 'error',
        'seo/manifest-display-is-valid': 'error',
        'seo/manifest-name-is-valid': 'error',
        'seo/manifest-short-name-is-valid': 'error',
        'seo/manifest-start-url-is-valid': 'error',
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
