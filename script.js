/* ============================================================
   YOUNG M INSIGHT — script.js
   1. Typing animation
   2. Navbar scroll + active link highlight
   3. Hamburger mobile menu
   4. Stats counter (count up on scroll)
   5. Scroll reveal
   6. Back to top
   7. Project image lightbox
   8. Smooth scroll
   9. Peek carousel
============================================================ */


/* ── 1. TYPING ANIMATION ─────────────────────────────────── */
(function initTyping() {
    const el = document.getElementById('typed-text');
    if (!el) return;

    const phrases = [
        'Data Analyst',
        'Turning Numbers Into Stories',
        'Power BI · MySQL · Excel',
        'Transforming Data Into Decisions',
        'Founder of Young M Insight'
    ];

    let pi = 0, ci = 0, deleting = false, paused = false;

    function type() {
        const word = phrases[pi];
        if (paused) { paused = false; setTimeout(type, 400); return; }
        if (deleting) {
            el.textContent = word.substring(0, --ci);
            if (ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; setTimeout(type, 500); return; }
            setTimeout(type, 38);
        } else {
            el.textContent = word.substring(0, ++ci);
            if (ci === word.length) { deleting = true; paused = true; setTimeout(type, 2200); return; }
            setTimeout(type, 72);
        }
    }
    setTimeout(type, 1400);
})();


/* ── 2. NAVBAR ───────────────────────────────────────────── */
(function initNavbar() {
    const navbar   = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-links a');

    function onScroll() {
        navbar.classList.toggle('scrolled', window.scrollY > 60);
        let current = '';
        document.querySelectorAll('section[id]').forEach(s => {
            if (window.scrollY >= s.offsetTop - 120) current = s.id;
        });
        navLinks.forEach(a =>
            a.classList.toggle('active', a.getAttribute('href') === '#' + current)
        );
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
})();


/* ── 3. HAMBURGER MENU ───────────────────────────────────── */
(function initMenu() {
    const toggle = document.getElementById('menu-toggle');
    const links  = document.getElementById('nav-links');
    if (!toggle || !links) return;

    function close() {
        links.classList.remove('open');
        toggle.textContent = '☰';
        document.body.style.overflow = '';
    }
    toggle.addEventListener('click', () => {
        const open = links.classList.toggle('open');
        toggle.textContent = open ? '✕' : '☰';
        document.body.style.overflow = open ? 'hidden' : '';
    });
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
    document.addEventListener('click', e => { if (!links.contains(e.target) && !toggle.contains(e.target)) close(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') { close(); toggle.focus(); } });
})();


/* ── 4. STATS COUNTER ────────────────────────────────────── */
(function initStats() {
    const nums = document.querySelectorAll('.stat-number');
    if (!nums.length) return;
    let done = false;

    function countUp(el) {
        const target = +el.dataset.target;
        const steps  = 60;
        let step = 0;
        const timer = setInterval(() => {
            step++;
            el.textContent = Math.min(Math.round((target / steps) * step), target);
            if (step >= steps) clearInterval(timer);
        }, 2000 / steps);
    }
    window.addEventListener('scroll', function check() {
        if (done) return;
        const s = document.querySelector('.stats-section');
        if (s && s.getBoundingClientRect().top < window.innerHeight - 80) {
            done = true; nums.forEach(countUp);
        }
    }, { passive: true });
})();


/* ── 5. SCROLL REVEAL ────────────────────────────────────── */
(function initReveal() {
    const selector = [
        '.project', '.service-card', '.cert-card',
        '.testimonial-card', '.contact-card', '.stat-card',
        '.skills-container > div', '.cv-download',
        '.section h2', '.section-subtitle',
        '.process-step', '.insight-card'
    ].join(',');

    document.querySelectorAll(selector).forEach((el, i) => {
        el.classList.add('reveal');
        el.style.transitionDelay = (i % 4) * 0.09 + 's';
    });

    function check() {
        document.querySelectorAll('.reveal:not(.revealed)').forEach(el => {
            if (el.getBoundingClientRect().top < window.innerHeight - 60) el.classList.add('revealed');
        });
    }
    window.addEventListener('scroll', check, { passive: true });
    check();
})();


/* ── 6. BACK TO TOP ──────────────────────────────────────── */
(function initTop() {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;
    window.addEventListener('scroll', () => btn.classList.toggle('visible', window.scrollY > 400), { passive: true });
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
})();


/* ── 7. LIGHTBOX ─────────────────────────────────────────── */
(function initLightbox() {
    const images = document.querySelectorAll('.project-gallery img');
    if (!images.length) return;

    document.head.insertAdjacentHTML('beforeend', `
        <style>
            @keyframes lbIn  { from{opacity:0} to{opacity:1} }
            @keyframes lbZoom{ from{transform:scale(.9);opacity:0} to{transform:scale(1);opacity:1} }
        </style>
    `);

    const ov  = document.createElement('div');
    const img = document.createElement('img');
    const btn = document.createElement('button');

    Object.assign(ov.style, {
        display:'none', position:'fixed', inset:'0', zIndex:'9998',
        background:'rgba(0,0,0,.94)', backdropFilter:'blur(10px)',
        alignItems:'center', justifyContent:'center',
        cursor:'zoom-out', padding:'24px', animation:'lbIn .25s ease'
    });
    Object.assign(img.style, {
        maxWidth:'92vw', maxHeight:'90vh', objectFit:'contain',
        borderRadius:'6px', border:'1px solid rgba(201,168,76,.25)',
        boxShadow:'0 0 80px rgba(201,168,76,.15)', animation:'lbZoom .32s ease'
    });
    btn.textContent = '✕';
    btn.setAttribute('aria-label', 'Close');
    Object.assign(btn.style, {
        position:'fixed', top:'20px', right:'24px', background:'none',
        border:'1px solid rgba(201,168,76,.4)', color:'#c9a84c', fontSize:'1rem',
        width:'36px', height:'36px', borderRadius:'50%', cursor:'pointer',
        display:'flex', alignItems:'center', justifyContent:'center', transition:'.3s'
    });
    btn.onmouseenter = () => { btn.style.background = '#c9a84c'; btn.style.color = '#000'; };
    btn.onmouseleave = () => { btn.style.background = 'none';    btn.style.color = '#c9a84c'; };

    ov.appendChild(img); ov.appendChild(btn); document.body.appendChild(ov);

    const open  = (src, alt) => { img.src = src; img.alt = alt || ''; ov.style.display = 'flex'; document.body.style.overflow = 'hidden'; };
    const close = () => { ov.style.display = 'none'; document.body.style.overflow = ''; };

    images.forEach(i => i.addEventListener('click', () => open(i.src, i.alt)));
    ov.addEventListener('click', e => { if (e.target !== img) close(); });
    btn.addEventListener('click', close);
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
})();


/* ── 8. SMOOTH SCROLL ────────────────────────────────────── */
(function initScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', function (e) {
            const id = this.getAttribute('href');
            if (id === '#') return;
            const target = document.querySelector(id);
            if (!target) return;
            e.preventDefault();
            const offset = document.querySelector('.navbar')?.offsetHeight || 70;
            window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' });
        });
    });
})();


/* ══════════════════════════════════════════════════════════
   9. PEEK CAROUSEL
══════════════════════════════════════════════════════════ */
(function initCarousel() {
    const track    = document.getElementById('carouselTrack');
    const dotsWrap = document.getElementById('carouselDots');
    const prevBtn  = document.getElementById('carouselPrev');
    const nextBtn  = document.getElementById('carouselNext');
    if (!track) return;

    const slides   = Array.from(track.querySelectorAll('.carousel-slide'));
    const total    = slides.length;
    if (total < 2) return;

    const SLIDE_W  = 300;
    const GAP      = 24;
    const AUTO_MS  = 3500;

    let current    = 0;
    let autoTimer  = null;
    let dragStartX = 0;
    let dragDelta  = 0;
    let isDragging = false;

    slides.forEach((_, i) => {
        const d = document.createElement('div');
        d.className = 'carousel-dot' + (i === 0 ? ' active' : '');
        d.addEventListener('click', () => goTo(i));
        dotsWrap.appendChild(d);
    });
    const dots = Array.from(dotsWrap.querySelectorAll('.carousel-dot'));

    function render(animate = true) {
        const vw     = track.parentElement.offsetWidth;
        const offset = (vw / 2) - (current * (SLIDE_W + GAP)) - (SLIDE_W / 2);
        track.style.transition = animate ? 'transform .6s cubic-bezier(.4,0,.2,1)' : 'none';
        track.style.transform  = `translateX(${offset}px)`;
        slides.forEach((s, i) => s.classList.toggle('active', i === current));
        dots.forEach((d, i)   => d.classList.toggle('active', i === current));
    }

    function goTo(i) { current = (i + total) % total; render(true); }
    function next()  { goTo(current + 1); }
    function prev()  { goTo(current - 1); }

    function startAuto() { stopAuto(); autoTimer = setInterval(next, AUTO_MS); }
    function stopAuto()  { clearInterval(autoTimer); }

    prevBtn?.addEventListener('click', () => { prev(); startAuto(); });
    nextBtn?.addEventListener('click', () => { next(); startAuto(); });

    track.parentElement.addEventListener('mouseenter', stopAuto);
    track.parentElement.addEventListener('mouseleave', startAuto);

    track.addEventListener('mousedown', e => {
        isDragging = true; dragStartX = e.clientX; dragDelta = 0;
        track.classList.add('grabbing'); stopAuto();
    });
    window.addEventListener('mousemove', e => { if (!isDragging) return; dragDelta = e.clientX - dragStartX; });
    window.addEventListener('mouseup', () => {
        if (!isDragging) return;
        isDragging = false; track.classList.remove('grabbing');
        if (dragDelta < -55) next(); else if (dragDelta > 55) prev(); else render(true);
        startAuto();
    });

    let touchStartX = 0;
    track.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; stopAuto(); }, { passive: true });
    track.addEventListener('touchend', e => {
        const diff = touchStartX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 45) { if (diff > 0) next(); else prev(); }
        startAuto();
    }, { passive: true });

    document.addEventListener('keydown', e => {
        const r = track.getBoundingClientRect();
        if (r.top > window.innerHeight || r.bottom < 0) return;
        if (e.key === 'ArrowLeft')  { prev(); startAuto(); }
        if (e.key === 'ArrowRight') { next(); startAuto(); }
    });

    window.addEventListener('resize', () => render(false));
    render(false);
    startAuto();
})();
