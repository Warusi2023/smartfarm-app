/**
 * Shared Playwright helpers for dashboard readiness and safe clicks.
 * Keeps E2E tests off networkidle (dashboard keeps sockets/polling alive).
 */

const { getE2EApiBase } = require('./api-base');

const DASHBOARD_READY_TIMEOUT_MS = process.env.CI ? 50000 : 45000;

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
 */
function gotoWaitUntil(page) {
  try {
    const browserName = page.context().browser()?.browserType()?.name();
    // Firefox/WebKit (incl. Mobile Safari) can delay DOMContentLoaded on heavy
    // dashboard.html past the navigation budget while the shell is already painted.
    if (browserName === 'firefox' || browserName === 'webkit') {
      return 'commit';
    }
  } catch (_) {
    /* ignore */
  }
  return 'domcontentloaded';
}

async function gotoProtectedPage(page, path, options = {}) {
  const timeout = options.timeout || DASHBOARD_READY_TIMEOUT_MS;
  const readySelector = options.readySelector || 'body';
  await seedDashboardSession(page);
  const normalized = path.startsWith('/') ? path : `/${path}`;

  try {
    await page.goto(normalized, {
      waitUntil: gotoWaitUntil(page),
      timeout
    });
  } catch (error) {
    const timedOut =
      error &&
      (error.name === 'TimeoutError' || /Timeout.*exceeded/i.test(String(error.message)));
    if (!timedOut) {
      throw error;
    }
    // Navigation timed out before the waitUntil signal; accept a painted ready shell.
    try {
      await page.waitForSelector(readySelector, {
        state: 'visible',
        timeout: Math.min(timeout, 15000)
      });
    } catch {
      throw error;
    }
  }

  // Auth checks often run on a short timer after DOMContentLoaded.
  await page.waitForTimeout(300);
  await expectNotRedirectedToLogin(page, normalized);
  await page.waitForSelector(readySelector, { state: 'visible', timeout });
  await expectNotRedirectedToLogin(page, normalized);
  return page;
}

/**
 * Wait until landing-page overlays that intercept clicks are gone (or never present).
 */
async function waitForClickBlockingOverlaysClear(page) {
  const placeholder = page.locator('.preview-placeholder');
  if ((await placeholder.count()) > 0) {
    const onDashboard = await page.locator('#dashboardView, #mainContent').count();
    if (onDashboard === 0) {
      throw new Error(
        'Click-blocking .preview-placeholder present but dashboard shell missing — likely served index.html for a client route'
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
  await page.waitForSelector('#mainContent', { state: 'visible', timeout });
  // Sidebar view switches are registered late in dashboard.html; wait before clicking nav.
  await page.waitForFunction(
    () => typeof window.showFarmManagement === 'function',
    null,
    { timeout }
  );
  await expectNotRedirectedToLogin(page, '/dashboard.html');
  await waitForClickBlockingOverlaysClear(page);
}

async function dismissTransientOverlays(page) {
  await page.evaluate(() => {
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
  });
}

/**
 * Open the real mobile sidebar when the viewport hides it off-canvas.
 */
async function ensureMobileSidebarOpen(page) {
  const sidebar = page.locator('#sidebar, .sidebar').first();
  await sidebar.waitFor({ state: 'attached', timeout: 10000 });

  const needsOpen = await page.evaluate(() => {
    const el = document.getElementById('sidebar') || document.querySelector('.sidebar');
    if (!el) return false;
    if (window.innerWidth >= 992) {
      return false;
    }
    return !el.classList.contains('show');
  });

  if (!needsOpen) {
    return;
  }

  await dismissTransientOverlays(page);

  const toggle = page.locator('#sidebarToggle');
  await toggle.waitFor({ state: 'visible', timeout: 10000 });
  await toggle.evaluate((el) => el.scrollIntoView({ block: 'center', inline: 'nearest' }));

  try {
    await toggle.click({ timeout: 10000 });
  } catch (err) {
    // Fall back to the same DOM click the app uses (not Playwright force),
    // when overlays briefly intercept the pointer hit-test.
    await toggle.evaluate((el) => el.click());
  }

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

  // Allow callers to pass full onclick selector via options.selector
  if (options.selector) {
    link = page.locator(`.sidebar ${options.selector}`).first();
  }

  await link.waitFor({ state: 'visible', timeout: 10000 });
  await link.evaluate((el) => el.scrollIntoView({ block: 'center', inline: 'nearest' }));
  await expectVisibleAndEnabled(link);
  try {
    await link.click({ timeout: 10000 });
  } catch (err) {
    await dismissTransientOverlays(page);
    await link.evaluate((el) => el.click());
  }
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

async function clickSidebarNavByOnclick(page, onclickFragment) {
  await ensureMobileSidebarOpen(page);
  await dismissTransientOverlays(page);
  const link = page.locator(`.sidebar a[onclick*="${onclickFragment}"]`).first();
  await link.waitFor({ state: 'visible', timeout: 10000 });
  await link.evaluate((el) => el.scrollIntoView({ block: 'center', inline: 'nearest' }));
  await expectVisibleAndEnabled(link);
  try {
    await link.click({ timeout: 10000 });
  } catch (err) {
    await dismissTransientOverlays(page);
    await link.evaluate((el) => el.click());
  }

  const viewSelector = ONCLICK_VIEW_SELECTORS[onclickFragment];
  if (viewSelector) {
    // If Playwright's hit-test click did not run the inline handler (common after
    // modal teardown), invoke the same onclick path the sidebar uses.
    const visible = await page.locator(viewSelector).isVisible().catch(() => false);
    if (!visible) {
      await link.evaluate((el) => el.click());
    }
    await page.waitForSelector(viewSelector, { state: 'visible', timeout: 15000 });
  }
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
  await page.waitForSelector('.modal.show', { state: 'visible', timeout });
  await page.waitForFunction(() => {
    const shown = document.querySelector('.modal.show');
    if (!shown || typeof bootstrap === 'undefined') return !!shown;
    const instance = bootstrap.Modal.getInstance(shown);
    return !instance || !instance._isTransitioning;
  }, null, { timeout });
  await page.evaluate(() => {
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
  });
  await page.waitForSelector('.modal.show', { state: 'hidden', timeout });
}

/**
 * Click a dashboard action button that may sit below the fold / under sticky chrome.
 */
async function clickDashboardAction(page, selector) {
  const btn = page.locator(selector).first();
  await btn.waitFor({ state: 'visible', timeout: 15000 });
  // WebKit can hang forever on scrollIntoViewIfNeeded waiting for layout stability.
  await btn.evaluate((el) => el.scrollIntoView({ block: 'center', inline: 'nearest' }));
  await expectVisibleAndEnabled(btn);
  await dismissTransientOverlays(page);
  try {
    await btn.click({ timeout: 10000 });
  } catch (err) {
    await page.waitForFunction(
      () => !document.querySelector('.modal-backdrop.show'),
      null,
      { timeout: 3000 }
    ).catch(() => {});
    await btn.evaluate((el) => el.click());
  }
}

module.exports = {
  DASHBOARD_READY_TIMEOUT_MS,
  fakeJwt,
  seedDashboardSession,
  gotoDashboardReady,
  gotoProtectedPage,
  waitForClickBlockingOverlaysClear,
  dismissTransientOverlays,
  ensureMobileSidebarOpen,
  clickSidebarNav,
  clickSidebarNavByOnclick,
  clickDashboardAction,
  closeVisibleModal,
  expectNotRedirectedToLogin
};
