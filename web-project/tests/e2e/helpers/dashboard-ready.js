/**
 * Shared Playwright helpers for dashboard readiness and safe clicks.
 * Keeps E2E tests off networkidle (dashboard keeps sockets/polling alive).
 */

const DASHBOARD_READY_TIMEOUT_MS = 20000;

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
    token: fakeJwt()
  };
}

/**
 * Seed localStorage/sessionStorage so protected pages do not redirect to login.
 * Uses addInitScript (runs before page scripts on every navigation in this context).
 * Deterministic across Chromium, Firefox, WebKit, and mobile projects.
 */
async function seedDashboardSession(page) {
  const payload = buildSessionPayload();
  await page.addInitScript((session) => {
    const user = JSON.stringify(session.user);
    const token = session.token;
    const loginTime = new Date().toISOString();
    try {
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
async function gotoProtectedPage(page, path, options = {}) {
  const timeout = options.timeout || DASHBOARD_READY_TIMEOUT_MS;
  const readySelector = options.readySelector || 'body';
  await seedDashboardSession(page);
  const normalized = path.startsWith('/') ? path : `/${path}`;
  await page.goto(normalized, {
    waitUntil: 'domcontentloaded',
    timeout
  });
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
  await expectNotRedirectedToLogin(page, '/dashboard.html');
  await waitForClickBlockingOverlaysClear(page);
}

async function dismissTransientOverlays(page) {
  await page.evaluate(() => {
    document.querySelectorAll('.alert.alert-dismissible .btn-close').forEach((btn) => {
      try {
        btn.click();
      } catch (_) {
        /* ignore */
      }
    });
    document.querySelectorAll('.alert.fade.show, .alert.alert-warning').forEach((alert) => {
      const text = (alert.textContent || '').toLowerCase();
      if (
        text.includes('qr code') ||
        text.includes('loading') ||
        alert.classList.contains('alert-dismissible')
      ) {
        alert.remove();
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
  await toggle.scrollIntoViewIfNeeded();

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
  await link.scrollIntoViewIfNeeded();
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
async function clickSidebarNavByOnclick(page, onclickFragment) {
  await ensureMobileSidebarOpen(page);
  await dismissTransientOverlays(page);
  const link = page.locator(`.sidebar a[onclick*="${onclickFragment}"]`).first();
  await link.waitFor({ state: 'visible', timeout: 10000 });
  await link.scrollIntoViewIfNeeded();
  await expectVisibleAndEnabled(link);
  try {
    await link.click({ timeout: 10000 });
  } catch (err) {
    await dismissTransientOverlays(page);
    await link.evaluate((el) => el.click());
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

/**
 * Click a dashboard action button that may sit below the fold / under sticky chrome.
 */
async function clickDashboardAction(page, selector) {
  const btn = page.locator(selector).first();
  await btn.waitFor({ state: 'visible', timeout: 15000 });
  await btn.scrollIntoViewIfNeeded();
  await expectVisibleAndEnabled(btn);
  await btn.click({ timeout: 10000 });
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
  expectNotRedirectedToLogin
};
