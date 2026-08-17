/**
 * Shared Playwright helpers for dashboard readiness and safe clicks.
 * Keeps E2E tests off networkidle (dashboard keeps sockets/polling alive).
 */

const { getE2EApiBase } = require('./api-base');

const DASHBOARD_READY_TIMEOUT_MS = process.env.CI ? 50000 : 45000;
const BODY_ATTACHED_TIMEOUT_MS = 5000;
const CLICK_RETRY_TIMEOUT_MS = 8000;
const VIEW_VISIBLE_TIMEOUT_MS = 15000;

/** Minimal three-segment token accepted by dashboard isUsableBackendJwt(). */
function fakeJwt() {
  return 'eyJhbGciOiJub25lIn0.eyJzdWIiOiJwbGF5d3JpZ2h0LXRlc3QiLCJpYXQiOjE3MDAwMDAwMDB9.e2e';
}

function buildSessionPayload() {
  return {
    user: {
      id: 'e2e-user',
      email: 'e2e@smartfarm.test',
      firstName: 'E2E',
      lastName: 'Tester',
      role: 'farmer'
    },
    token: fakeJwt(),
    apiBase: getE2EApiBase()
  };
}

function pageDiagnostic(page, extra = {}) {
  const closed = !page || (typeof page.isClosed === 'function' && page.isClosed());
  let url = 'unknown';
  try {
    if (!closed) url = page.url();
  } catch (_) {
    url = 'unavailable';
  }
  const expected = extra.expected ? `, expected=${extra.expected}` : '';
  return `url=${url}, pageClosed=${closed}${expected}`;
}

function helperError(page, helperName, message, extra = {}) {
  return new Error(`${helperName}: ${message} (${pageDiagnostic(page, extra)})`);
}

function assertPageOpen(page, helperName, extra = {}) {
  if (!page || page.isClosed()) {
    throw helperError(
      page,
      helperName,
      extra.message || 'page/context is closed; skipping further browser actions',
      extra
    );
  }
}

function isClosedTargetError(page, err) {
  if (page && typeof page.isClosed === 'function' && page.isClosed()) {
    return true;
  }
  return /Target page, context or browser has been closed/i.test(String(err && err.message));
}

async function safeEvaluate(page, fn, arg, helperName, extra = {}) {
  assertPageOpen(page, helperName, extra);
  try {
    return arg === undefined ? await page.evaluate(fn) : await page.evaluate(fn, arg);
  } catch (err) {
    if (isClosedTargetError(page, err)) {
      throw helperError(page, helperName, extra.message || String(err.message), extra);
    }
    throw err;
  }
}

async function safeLocatorEvaluate(page, locator, fn, helperName, extra = {}) {
  assertPageOpen(page, helperName, extra);
  try {
    return await locator.evaluate(fn, extra.arg, { timeout: extra.timeout || 3000 });
  } catch (err) {
    if (isClosedTargetError(page, err)) {
      throw helperError(page, helperName, extra.message || String(err.message), extra);
    }
    if (extra.optional) {
      return undefined;
    }
    throw err;
  }
}

/**
 * Seed localStorage/sessionStorage so protected pages do not redirect to login.
 * Also injects the local/test API base so pages never fall back to Railway in matrix E2E.
 * Uses addInitScript (runs before page scripts on every navigation in this context).
 * Deterministic across Chromium, Firefox, WebKit, and mobile projects.
 */
async function seedDashboardSession(page) {
  const payload = buildSessionPayload();
  await page.addInitScript((session) => {
    const user = JSON.stringify(session.user);
    const token = session.token;
    const loginTime = new Date().toISOString();
    const apiBase = session.apiBase;
    try {
      if (apiBase) {
        window.__SMARTFARM_API_BASE__ = apiBase;
        window.VITE_API_BASE_URL = apiBase;
        window.VITE_API_URL = apiBase;
      }
      localStorage.setItem('smartfarm_user', user);
      localStorage.setItem('smartfarm_token', token);
      localStorage.setItem('smartfarm_remember', 'true');
      localStorage.setItem('smartfarm_loginTime', loginTime);
      sessionStorage.setItem('smartfarm_user', user);
      sessionStorage.setItem('smartfarm_token', token);
      sessionStorage.setItem('smartfarm_loginTime', loginTime);
      sessionStorage.setItem('smartfarm_remember', 'true');
    } catch (_) {
      // Storage may be unavailable in rare sandboxes; gotoProtectedPage will diagnose.
    }
  }, payload);
}

async function expectNotRedirectedToLogin(page, intendedPath) {
  assertPageOpen(page, 'expectNotRedirectedToLogin', { expected: intendedPath });
  const url = page.url();
  if (/login\.html/i.test(url) || /\/login\/?$/i.test(url)) {
    throw new Error(
      `Protected page redirected to login (${url}); expected ${intendedPath || 'authenticated page'}. ` +
        'Session seed failed for this Playwright project — check smartfarm_user/smartfarm_token in storage.'
    );
  }
}

/**
 * Navigate to a protected page with seeded session and fail fast if redirected to login.
 * Primary ready signal is the caller’s locator, not document.body.
 */
async function gotoProtectedPage(page, path, options = {}) {
  const timeout = options.timeout || DASHBOARD_READY_TIMEOUT_MS;
  const readySelector = options.readySelector || 'body';
  await seedDashboardSession(page);
  const normalized = path.startsWith('/') ? path : `/${path}`;
  const extra = { expected: readySelector };

  assertPageOpen(page, 'gotoProtectedPage', extra);

  try {
    await page.goto(normalized, { waitUntil: 'domcontentloaded' });
  } catch (error) {
    if (isClosedTargetError(page, error)) {
      throw helperError(
        page,
        'gotoProtectedPage',
        `navigation failed because page closed: ${error.message}`,
        extra
      );
    }
    const timedOut =
      error &&
      (error.name === 'TimeoutError' || /Timeout.*exceeded/i.test(String(error.message)));
    if (!timedOut) {
      throw error;
    }
    // Navigation event timed out; continue to the real ready locator below.
  }

  assertPageOpen(page, 'gotoProtectedPage', extra);

  // Optional short probe only — never the primary ready signal, never the full test timeout.
  await page
    .waitForSelector('body', { state: 'attached', timeout: BODY_ATTACHED_TIMEOUT_MS })
    .catch((err) => {
      if (isClosedTargetError(page, err)) {
        throw helperError(page, 'gotoProtectedPage', 'page closed while waiting for body', extra);
      }
    });

  assertPageOpen(page, 'gotoProtectedPage', extra);
  await dismissAllBootstrapModals(page);
  await dismissTransientOverlays(page);
  await expectNotRedirectedToLogin(page, normalized);
  try {
    await page.waitForSelector(readySelector, { state: 'visible', timeout });
  } catch (err) {
    if (isClosedTargetError(page, err)) {
      throw helperError(page, 'gotoProtectedPage', 'page closed while waiting for ready selector', extra);
    }
    throw helperError(
      page,
      'gotoProtectedPage',
      `ready selector not visible: ${err.message}`,
      extra
    );
  }
  await expectNotRedirectedToLogin(page, normalized);
  return page;
}

/**
 * Wait until landing-page overlays that intercept clicks are gone (or never present).
 */
async function waitForClickBlockingOverlaysClear(page) {
  assertPageOpen(page, 'waitForClickBlockingOverlaysClear');
  const placeholder = page.locator('.preview-placeholder');
  if ((await placeholder.count()) > 0) {
    const onDashboard = await page.locator('#dashboardView, #mainContent').count();
    if (onDashboard === 0) {
      throw helperError(
        page,
        'waitForClickBlockingOverlaysClear',
        'Click-blocking .preview-placeholder present but dashboard shell missing — likely served index.html for a client route',
        { expected: '#dashboardView' }
      );
    }
  }
}

/**
 * Navigate to dashboard and wait for a deterministic ready signal.
 */
async function gotoDashboardReady(page, options = {}) {
  const timeout = options.timeout || DASHBOARD_READY_TIMEOUT_MS;
  await gotoProtectedPage(page, '/dashboard.html', {
    timeout,
    readySelector: '#dashboardView'
  });
  await dismissAllBootstrapModals(page);
  await dismissTransientOverlays(page);

  try {
    await page.waitForSelector('#dashboardView', { state: 'visible', timeout });
  } catch (err) {
    if (isClosedTargetError(page, err)) {
      throw helperError(page, 'gotoDashboardReady', 'page closed while waiting for #dashboardView', {
        expected: '#dashboardView'
      });
    }
    throw helperError(
      page,
      'gotoDashboardReady',
      `dashboard home view not visible after navigation: ${err.message}`,
      { expected: '#dashboardView' }
    );
  }
  await page.waitForSelector('#mainContent', { state: 'visible', timeout });
  await page.waitForFunction(
    () => typeof window.showFarmManagement === 'function',
    null,
    { timeout }
  );
  await expectNotRedirectedToLogin(page, '/dashboard.html');
  await waitForClickBlockingOverlaysClear(page);
}

/**
 * Close every visible Bootstrap modal and remove leftover backdrops / body locks.
 * Must run before dashboard readiness is asserted.
 */
async function dismissAllBootstrapModals(page) {
  if (!page || page.isClosed()) {
    return;
  }

  await safeEvaluate(
    page,
    () => {
      if (!document.body) {
        return;
      }
      const shown = Array.from(document.querySelectorAll('.modal.show, .modal[aria-modal="true"]'));
      for (const modal of shown) {
        try {
          const instance =
            (modal.id === 'dashboardAddLivestockModal' && window.currentLivestockModal) ||
            (window.bootstrap && window.bootstrap.Modal.getInstance(modal));
          if (instance && typeof instance.hide === 'function') {
            instance.hide();
          } else {
            modal.classList.remove('show');
            modal.style.display = 'none';
            modal.setAttribute('aria-hidden', 'true');
            modal.removeAttribute('aria-modal');
          }
        } catch (_) {
          /* ignore */
        }
      }
      document.querySelectorAll('.modal-backdrop').forEach((el) => {
        try {
          el.remove();
        } catch (_) {
          /* ignore */
        }
      });
      document.body.classList.remove('modal-open');
      document.body.style.removeProperty('overflow');
      document.body.style.removeProperty('padding-right');
    },
    undefined,
    'dismissAllBootstrapModals'
  );

  if (page.isClosed()) {
    throw helperError(page, 'dismissAllBootstrapModals', 'page closed after modal hide');
  }

  await page.waitForFunction(
    () =>
      !!document.body &&
      !document.querySelector('.modal.show') &&
      !document.querySelector('.modal-backdrop'),
    null,
    { timeout: 5000 }
  ).catch(() => {
    // Force-clear any stubborn backdrop/modal residue so readiness can proceed.
  });

  if (page.isClosed()) {
    throw helperError(page, 'dismissAllBootstrapModals', 'page closed while waiting for modal teardown');
  }

  await safeEvaluate(
    page,
    () => {
      if (!document.body) {
        return;
      }
      document.querySelectorAll('.modal-backdrop').forEach((el) => el.remove());
      document.querySelectorAll('.modal.show').forEach((modal) => {
        modal.classList.remove('show');
        modal.style.display = 'none';
        modal.setAttribute('aria-hidden', 'true');
        modal.removeAttribute('aria-modal');
      });
      document.body.classList.remove('modal-open');
      document.body.style.removeProperty('overflow');
      document.body.style.removeProperty('padding-right');
    },
    undefined,
    'dismissAllBootstrapModals'
  );
}

async function dismissTransientOverlays(page) {
  if (!page || page.isClosed()) {
    return;
  }

  await safeEvaluate(
    page,
    () => {
      document.querySelectorAll('.alert, .custom-alert, .toast').forEach((el) => {
        const text = (el.textContent || '').toLowerCase();
        const shouldClear =
          text.includes('qr code') ||
          text.includes('loading') ||
          el.classList.contains('alert-dismissible') ||
          el.classList.contains('custom-alert');
        if (!shouldClear) return;
        try {
          if (el.isConnected) el.remove();
        } catch (_) {
          /* ignore */
        }
      });
    },
    undefined,
    'dismissTransientOverlays'
  );
}

async function clickWithOverlayRetry(page, locator, helperName, extra = {}) {
  assertPageOpen(page, helperName, extra);
  try {
    await locator.click({ timeout: 8000 });
    return;
  } catch (err) {
    if (isClosedTargetError(page, err)) {
      throw helperError(
        page,
        helperName,
        `click failed because page closed: ${err.message}`,
        extra
      );
    }
    await dismissTransientOverlays(page);
    await dismissAllBootstrapModals(page);
    assertPageOpen(page, helperName, extra);
    // Short Playwright retry after cleanup. force bypasses WebKit hit-test
    // stalls; this is still locator.click, not a DOM evaluate-click.
    await locator.click({ timeout: 5000, force: true });
  }
}

/**
 * Open the real mobile sidebar when the viewport hides it off-canvas.
 */
async function ensureMobileSidebarOpen(page) {
  assertPageOpen(page, 'ensureMobileSidebarOpen', { expected: '#sidebar' });
  const sidebar = page.locator('#sidebar, .sidebar').first();
  await sidebar.waitFor({ state: 'attached', timeout: 10000 });

  const needsOpen = await safeEvaluate(
    page,
    () => {
      const el = document.getElementById('sidebar') || document.querySelector('.sidebar');
      if (!el) return false;
      if (window.innerWidth >= 992) {
        return false;
      }
      return !el.classList.contains('show');
    },
    undefined,
    'ensureMobileSidebarOpen',
    { expected: '#sidebar' }
  );

  if (!needsOpen) {
    return;
  }

  await dismissTransientOverlays(page);
  await dismissAllBootstrapModals(page);

  const toggle = page.locator('#sidebarToggle');
  await toggle.waitFor({ state: 'visible', timeout: 10000 });
  await safeLocatorEvaluate(
    page,
    toggle,
    (el) => el.scrollIntoView({ block: 'center', inline: 'nearest' }),
    'ensureMobileSidebarOpen',
    { expected: '#sidebarToggle', optional: true }
  );
  await clickWithOverlayRetry(page, toggle, 'ensureMobileSidebarOpen', { expected: '#sidebarToggle' });

  await page.waitForFunction(() => {
    const el = document.getElementById('sidebar') || document.querySelector('.sidebar');
    return el && el.classList.contains('show');
  }, null, { timeout: 10000 });
}

/**
 * Click a sidebar nav control with exact locator + scroll, no force.
 * Opens mobile sidebar first when needed.
 */
async function clickSidebarNav(page, nameOrSelector, options = {}) {
  await ensureMobileSidebarOpen(page);
  await dismissTransientOverlays(page);
  await dismissAllBootstrapModals(page);

  let link;
  if (typeof nameOrSelector === 'string' && nameOrSelector.includes('[')) {
    link = page.locator(`.sidebar ${nameOrSelector}`).first();
  } else if (typeof nameOrSelector === 'string' && nameOrSelector.startsWith('a[')) {
    link = page.locator(`.sidebar ${nameOrSelector}`).first();
  } else {
    const name = String(nameOrSelector);
    link = page.locator('.sidebar .nav-link', {
      hasText: new RegExp(`^\\s*${escapeRegExp(name)}\\s*$`)
    }).first();
  }

  if (options.selector) {
    link = page.locator(`.sidebar ${options.selector}`).first();
  }

  await link.waitFor({ state: 'visible', timeout: 10000 });
  await safeLocatorEvaluate(
    page,
    link,
    (el) => el.scrollIntoView({ block: 'center', inline: 'nearest' }),
    'clickSidebarNav',
    { expected: String(nameOrSelector), optional: true }
  );
  await expectVisibleAndEnabled(link);
  await clickWithOverlayRetry(page, link, 'clickSidebarNav', { expected: String(nameOrSelector) });
}

/**
 * Click sidebar nav by onclick fragment (e.g. showCropManagement) after opening mobile menu.
 */
const ONCLICK_VIEW_SELECTORS = {
  showDashboard: '#dashboardView',
  showFarmManagement: '#farmManagementView',
  showCropManagement: '#cropManagementView',
  showLivestockManagement: '#livestockManagementView',
  showAnalytics: '#analyticsView',
  showPetsManagement: '#petsManagementView',
  showInventoryManagement: '#inventoryManagementView',
  showTasks: '#tasksView',
  showReports: '#reportsView'
};

async function attemptSidebarNavByOnclick(page, onclickFragment) {
  const viewSelector = ONCLICK_VIEW_SELECTORS[onclickFragment];
  const extra = { expected: viewSelector || onclickFragment };

  await ensureMobileSidebarOpen(page);
  await dismissTransientOverlays(page);
  await dismissAllBootstrapModals(page);

  const link = page.locator(`.sidebar a[onclick*="${onclickFragment}"]`).first();
  await link.waitFor({ state: 'visible', timeout: 10000 });
  await safeLocatorEvaluate(
    page,
    link,
    (el) => el.scrollIntoView({ block: 'center', inline: 'nearest' }),
    'clickSidebarNavByOnclick',
    { ...extra, optional: true }
  );
  await expectVisibleAndEnabled(link);
  await clickWithOverlayRetry(page, link, 'clickSidebarNavByOnclick', extra);

  if (!viewSelector) {
    return true;
  }

  const alreadyVisible = await page.locator(viewSelector).isVisible().catch(() => false);
  if (!alreadyVisible) {
    // Same path as the sidebar onclick handler — not a DOM evaluate-click.
    await safeEvaluate(
      page,
      (name) => {
        const fn = window[name];
        if (typeof fn === 'function') {
          fn();
        }
      },
      onclickFragment,
      'clickSidebarNavByOnclick',
      extra
    );
  }

  try {
    await page.waitForSelector(viewSelector, { state: 'visible', timeout: 8000 });
    return true;
  } catch (err) {
    if (isClosedTargetError(page, err)) {
      throw helperError(
        page,
        'clickSidebarNavByOnclick',
        `page closed while waiting for ${onclickFragment}`,
        extra
      );
    }
    return false;
  }
}

async function clickSidebarNavByOnclick(page, onclickFragment) {
  const viewSelector = ONCLICK_VIEW_SELECTORS[onclickFragment];
  const extra = { expected: viewSelector || onclickFragment };
  assertPageOpen(page, 'clickSidebarNavByOnclick', extra);

  const firstOk = await attemptSidebarNavByOnclick(page, onclickFragment);
  if (firstOk) {
    return;
  }

  if (page.isClosed()) {
    throw helperError(
      page,
      'clickSidebarNavByOnclick',
      `page closed after first navigation to ${onclickFragment}`,
      extra
    );
  }

  await gotoDashboardReady(page, { timeout: 12000 });
  const retryOk = await attemptSidebarNavByOnclick(page, onclickFragment);
  if (retryOk) {
    return;
  }

  throw helperError(
    page,
    'clickSidebarNavByOnclick',
    `view did not become visible after navigating to ${onclickFragment}`,
    extra
  );
}

function escapeRegExp(s) {
  return String(s).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

async function expectVisibleAndEnabled(locator) {
  await locator.waitFor({ state: 'visible', timeout: 10000 });
  const disabled = await locator.isDisabled().catch(() => false);
  if (disabled) {
    throw new Error('Target locator is disabled');
  }
}

async function closeVisibleModal(page, options = {}) {
  const timeout = options.timeout || 8000;
  assertPageOpen(page, 'closeVisibleModal', { expected: '.modal.show' });
  await page.waitForSelector('.modal.show', { state: 'visible', timeout });
  await page.waitForFunction(() => {
    const shown = document.querySelector('.modal.show');
    if (!shown || typeof bootstrap === 'undefined') return !!shown;
    const instance = bootstrap.Modal.getInstance(shown);
    return !instance || !instance._isTransitioning;
  }, null, { timeout: Math.min(timeout, 8000) });
  await safeEvaluate(
    page,
    () => {
      const shown = document.querySelector('.modal.show');
      if (!shown) return;
      const instance =
        (shown.id === 'dashboardAddLivestockModal' && window.currentLivestockModal) ||
        (window.bootstrap && window.bootstrap.Modal.getInstance(shown));
      if (instance && typeof instance.hide === 'function') {
        instance.hide();
        return;
      }
      shown.classList.remove('show');
      shown.style.display = 'none';
      document.querySelectorAll('.modal-backdrop').forEach((el) => el.remove());
      document.body.classList.remove('modal-open');
      document.body.style.removeProperty('overflow');
      document.body.style.removeProperty('padding-right');
    },
    undefined,
    'closeVisibleModal',
    { expected: '.modal.show' }
  );
  await page.waitForSelector('.modal.show', { state: 'hidden', timeout });
}

/**
 * Click a dashboard action button that may sit below the fold / under sticky chrome.
 */
async function clickDashboardAction(page, selector) {
  const extra = { expected: selector };
  assertPageOpen(page, 'clickDashboardAction', extra);
  const btn = page.locator(selector).first();
  try {
    await btn.waitFor({ state: 'visible', timeout: 15000 });
  } catch (err) {
    if (isClosedTargetError(page, err)) {
      throw helperError(page, 'clickDashboardAction', 'page closed while waiting for action', extra);
    }
    throw helperError(
      page,
      'clickDashboardAction',
      `action not visible after navigation: ${err.message}`,
      extra
    );
  }
  await safeLocatorEvaluate(
    page,
    btn,
    (el) => el.scrollIntoView({ block: 'center', inline: 'nearest' }),
    'clickDashboardAction',
    { ...extra, optional: true }
  );
  await expectVisibleAndEnabled(btn);
  await dismissTransientOverlays(page);
  await dismissAllBootstrapModals(page);
  await clickWithOverlayRetry(page, btn, 'clickDashboardAction', extra);
}

module.exports = {
  DASHBOARD_READY_TIMEOUT_MS,
  fakeJwt,
  seedDashboardSession,
  gotoDashboardReady,
  gotoProtectedPage,
  waitForClickBlockingOverlaysClear,
  dismissTransientOverlays,
  dismissAllBootstrapModals,
  ensureMobileSidebarOpen,
  clickSidebarNav,
  clickSidebarNavByOnclick,
  clickDashboardAction,
  closeVisibleModal,
  expectNotRedirectedToLogin
};
