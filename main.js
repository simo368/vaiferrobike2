(function () {
    /* ——— THEME ——— */
    const root = document.documentElement;
    const toggle = document.querySelector('[data-theme-toggle]');
    let theme = localStorage.getItem('vfb-theme') ||
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    root.setAttribute('data-theme', theme);

    const setIcon = () => {
        if (!toggle) return;
        toggle.innerHTML = theme === 'dark'
            ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"></circle><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"></path></svg>'
            : '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>';
        toggle.setAttribute('aria-label', theme === 'dark' ? 'Attiva tema chiaro' : 'Attiva tema scuro');
    };
    setIcon();
    toggle?.addEventListener('click', () => {
        theme = theme === 'dark' ? 'light' : 'dark';
        root.setAttribute('data-theme', theme);
        localStorage.setItem('vfb-theme', theme);
        setIcon();
    });

    /* ——— ACTIVE NAV ——— */
    const path = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav a, .mobile-links a').forEach(link => {
        const href = link.getAttribute('href') || '';
        if (href === path || (path === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });

    /* ——— HEADER SCROLL ——— */
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        header?.classList.toggle('scrolled', window.scrollY > 8);
    }, { passive: true });

    /* ——— MOBILE MENU ——— */
    const menuBtn = document.querySelector('.menu-toggle');
    const panel = document.getElementById('mobilePanel');
    menuBtn?.addEventListener('click', () => {
        const open = menuBtn.getAttribute('aria-expanded') === 'true';
        menuBtn.setAttribute('aria-expanded', String(!open));
        panel?.classList.toggle('open');
    });
    panel?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
        menuBtn?.setAttribute('aria-expanded', 'false');
        panel.classList.remove('open');
    }));

    /* ——— REVEAL ——— */
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
})();
