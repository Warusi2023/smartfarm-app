/**
 * W6-02 release announcement — dashboard banner (show once per user until dismissed).
 */
(function () {
    'use strict';

    var RELEASE_ID = 'w6-02-2025-06';
    var STORAGE_PREFIX = 'smartfarm_release_dismissed_';

    var BANNER_SHORT =
        'The SmartFarm dashboard is now more reliable and easier to use. Command center, weekly tools, and weather stay in sync with your farm data.';

    var RELEASE_NOTES_URL = 'release-notes.html';

    function getReleaseUserKey() {
        try {
            var auth = localStorage.getItem('smartfarm_auth');
            if (auth) {
                var parsed = JSON.parse(auth);
                if (parsed && parsed.user) {
                    if (parsed.user.id) {
                        return String(parsed.user.id);
                    }
                    if (parsed.user.email) {
                        return parsed.user.email;
                    }
                }
            }
            var token =
                localStorage.getItem('smartfarm_token') ||
                sessionStorage.getItem('smartfarm_token');
            if (token && token.split('.').length === 3) {
                var payload = JSON.parse(atob(token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')));
                if (payload.userId) {
                    return String(payload.userId);
                }
                if (payload.email) {
                    return payload.email;
                }
            }
        } catch (_) {
            /* ignore */
        }
        return null;
    }

    function isSignedIn() {
        return !!getReleaseUserKey();
    }

    function storageKey() {
        var userKey = getReleaseUserKey();
        if (!userKey) {
            return null;
        }
        return STORAGE_PREFIX + RELEASE_ID + '_' + userKey;
    }

    function isDismissed() {
        var key = storageKey();
        if (!key) {
            return true;
        }
        try {
            return localStorage.getItem(key) === '1';
        } catch (_) {
            return false;
        }
    }

    function markDismissed() {
        var key = storageKey();
        if (!key) {
            return;
        }
        try {
            localStorage.setItem(key, '1');
        } catch (_) {
            /* ignore */
        }
    }

    function removeBanner() {
        var el = document.getElementById('smartfarm-release-announcement');
        if (el) {
            el.remove();
        }
    }

    function showBanner() {
        if (!isSignedIn() || isDismissed()) {
            return;
        }

        var mount = document.getElementById('smartfarm-release-announcement-mount');
        if (!mount) {
            mount = document.createElement('div');
            mount.id = 'smartfarm-release-announcement-mount';
            mount.setAttribute('aria-live', 'polite');
            var nav = document.querySelector('nav.navbar-custom, nav.navbar');
            if (nav && nav.parentNode) {
                nav.parentNode.insertBefore(mount, nav.nextSibling);
            } else {
                document.body.insertBefore(mount, document.body.firstChild);
            }
        }

        mount.innerHTML =
            '<div id="smartfarm-release-announcement" class="smartfarm-release-banner alert alert-success alert-dismissible fade show mb-0 rounded-0 border-0" role="status">' +
            '<div class="container-fluid d-flex flex-wrap align-items-center gap-2 py-2">' +
            '<span class="smartfarm-release-banner__icon" aria-hidden="true"><i class="fas fa-star"></i></span>' +
            '<span class="smartfarm-release-banner__text flex-grow-1">' +
            escapeHtml(BANNER_SHORT) +
            ' <a href="' +
            RELEASE_NOTES_URL +
            '" class="smartfarm-release-banner__link">Read what\'s new</a></span>' +
            '<button type="button" class="btn-close smartfarm-release-banner__close" data-bs-dismiss="alert" aria-label="Dismiss release announcement"></button>' +
            '</div></div>';

        var banner = document.getElementById('smartfarm-release-announcement');
        var closeBtn = banner && banner.querySelector('.smartfarm-release-banner__close');
        if (closeBtn) {
            closeBtn.addEventListener('click', function () {
                markDismissed();
                removeBanner();
            });
        }
    }

    function escapeHtml(text) {
        var div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    function init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', showBanner);
        } else {
            showBanner();
        }
    }

    window.SmartFarmReleaseAnnouncement = {
        RELEASE_ID: RELEASE_ID,
        show: showBanner,
        dismiss: function () {
            markDismissed();
            removeBanner();
        },
        resetForCurrentUser: function () {
            var key = storageKey();
            if (key) {
                try {
                    localStorage.removeItem(key);
                } catch (_) {
                    /* ignore */
                }
            }
        },
    };

    init();
})();
