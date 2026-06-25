/**
 * Route classification for production web server API proxy.
 */

function shouldProxyToApi(pathname) {
    if (!pathname || typeof pathname !== 'string') {
        return false;
    }
    return pathname === '/api' || pathname.startsWith('/api/');
}

module.exports = { shouldProxyToApi };
