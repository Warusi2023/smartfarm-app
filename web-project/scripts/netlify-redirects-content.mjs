/**
 * Single source of truth for Netlify _redirects (published in dist/).
 * Order matters: first match wins — API proxy first, SPA catch-all last.
 */
export const NETLIFY_REDIRECTS = `# Netlify redirects — more specific rules first; catch-all last.
/api/*  https://web-production-86d39.up.railway.app/api/:splat  200!

/signup.html /register.html 301
/debug-login.html /index.html 301
/test-api.html /index.html 301
/button-debugger.html /index.html 301
/login-diagnostic.html /index.html 301
/test-server-connection.html /index.html 301
/test-cors-bypass.html /index.html 301
/test-modal-accessibility.html /index.html 301
/navigation-test.html /index.html 301
/ads-testing.html /index.html 301
/api-test.html /index.html 301
/backend-test.html /index.html 301

/*  /index.html  200
`;
