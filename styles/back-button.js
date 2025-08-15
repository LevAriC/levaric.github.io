/**
 * Site-wide Text-only Back Link Functionality
 * Add this script to any page that needs a back link
 */
(function() {
    'use strict';
    
    const link = document.querySelector('.back-link');
    if (!link) return;

    // Detect Home page to hide Back link entirely
    const isHome = document.body.classList.contains('page-home')
                  || location.pathname === '/'
                  || location.pathname === '/index.html'
                  || location.pathname.endsWith('/levaric.github.io/');

    if (isHome) { 
        link.remove(); 
        return; 
    }

    // Decide if we have a safe in-site history
    const sameOriginRef = document.referrer && (() => {
        try { 
            return new URL(document.referrer).origin === location.origin; 
        } catch(e) { 
            return false; 
        }
    })();

    const hasHistory = window.history.length > 1 && sameOriginRef;

    // Compute fallback if there is no safe history
    function fallbackHref() {
        const path = location.pathname.replace(/\/index\.html$/, '');

        // RIBS detail → /collections/ribs.html
        if (/\/collections\/ribs\/.+/.test(path)) return '/collections/ribs.html';
        
        // RIBS collection → Home
        if (/\/collections\/ribs\/?$/.test(path) || path === '/collections/ribs.html') return '/';

        // Generic parent: /a/b/c → /a/b (or "/" if no parent)
        const parent = path.replace(/\/[^\/]+\/?$/, '') || '/';
        return parent || '/';
    }

    // Handle click
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        if (hasHistory) {
            history.back();
        } else {
            const fallback = fallbackHref();
            window.location.assign(fallback);
        }
    });
})();
