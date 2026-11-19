(() => {
  'use strict';

  /* =========================================================
  1. CONFIGURATION & DOM HELPERS
     ========================================================= */
  const USER = 'saboor-arif';
  const EMAIL = 'saboorarif35@gmail.com';
  const API = 'https://api.github.com/users/' + USER;
  const PROFILE_URL = 'https://github.com/' + USER;

  document.documentElement.classList.add('js');

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));
  const fmtDate = d => new Date(d).toLocaleDateString(undefined, {
    year: 'numeric', month: 'short', day: 'numeric'
  });
  const safeUrl = u => {
    try {
      const x = new URL(/^https?:\/\//i.test(u) ? u : 'https://' + u);
      return /^https?:$/.test(x.protocol) ? x.href : null;
    } catch {
      return null;
    }
  };

  /* =========================================================
  2. HERO NAME TYPE-ONCE EFFECT (BLINKING CURSOR STAYS)
     ========================================================= */
  function initNameTyping() {
    const nameEl = $('#hero-name');
    if (!nameEl || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const fullName = nameEl.textContent.trim();
    let i = 0;

    nameEl.textContent = '';
    nameEl.classList.add('typing-cursor');

    function typeName() {
      if (i < fullName.length) {
        nameEl.textContent += fullName.charAt(i);
        i++;
        setTimeout(typeName, 95);
      }
    }

    setTimeout(typeName, 250);
  }

  /* =========================================================
  3. HERO ROLE LOOP TYPING EFFECT
     ========================================================= */
  function initTyping() {
    const roleEl = $('.role');
    if (!roleEl || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const phrases = [
      'Computer Science Student',
      'Learn | Code | Debug | Repeat',
      'Exploring, Learning and Building'
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeLoop() {
      const current = phrases[phraseIndex];
      roleEl.textContent = current.substring(0, charIndex) + '|';

      if (!isDeleting && charIndex < current.length) {
        charIndex++;
        setTimeout(typeLoop, 70);
      } else if (isDeleting && charIndex > 0) {
        charIndex--;
        setTimeout(typeLoop, 40);
      } else {
        isDeleting = !isDeleting;
        if (!isDeleting) phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(typeLoop, isDeleting ? 1400 : 300);
      }
    }

    typeLoop();
  }

  /* =========================================================
  4. SKILLS DATA & RENDERER (MERGED CS FUNDAMENTALS & TOOLS)
     ========================================================= */
  const DEV = 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/';

  const G = {
    rest: '<path d="M4 7h16M4 12h16M4 17h10"/><circle cx="18" cy="17" r="2"/>',
    pf: '<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/><line x1="14" y1="4" x2="10" y2="20"/>',
    ds: '<circle cx="12" cy="5" r="2"/><circle cx="6" cy="18" r="2"/><circle cx="18" cy="18" r="2"/><path d="M12 7v4M12 11l-6 5M12 11l6 5"/>',
    algo: '<path d="M4 6h16M4 12h10M4 18h5"/><path d="M17 15l3 3-3 3"/>',
    oop: '<rect x="3" y="3" width="8" height="8" rx="1"/><rect x="13" y="13" width="8" height="8" rx="1"/><path d="M11 7h4a2 2 0 0 1 2 2v4"/>',
    db: '<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/>',
    net: '<circle cx="12" cy="12" r="9"/><path d="M3.6 9h16.8M3.6 15h16.8"/><path d="M12 3a14.5 14.5 0 0 0 0 18 14.5 14.5 0 0 0 0-18"/>',
    os: '<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/>',
    coal: '<rect x="6" y="6" width="12" height="12" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4"/>',
    web: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M8 14l-2 2 2 2M16 14l2 2-2 2"/>',
    automata: '<circle cx="6" cy="12" r="3"/><circle cx="18" cy="12" r="3"/><path d="M9 12h6M13 10l2 2-2 2"/>',
    ml: '<circle cx="5" cy="6" r="2"/><circle cx="5" cy="18" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="6" r="2"/><circle cx="19" cy="18" r="2"/><path d="M7 7l3.5 3.5M7 17l3.5-3.5M13.5 10.5L17 7M13.5 13.5L17 17"/>',
    cloud: '<path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>',
    se: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M9 14l2 2 4-4"/>',
    cisco: '<rect x="2" y="8" width="20" height="8" rx="2"/><circle cx="6" cy="12" r="1"/><circle cx="10" cy="12" r="1"/><path d="M15 12h3M7 8V5M17 8V5M7 16v3M17 16v3"/>',
    emu: '<rect x="5" y="5" width="14" height="14" rx="2"/><path d="M9 9h6v6H9zM9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3"/>',
    devcpp: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 10l3 2-3 2M12 14h5"/>',
    code: '<path d="M8 8l-4 4 4 4M16 8l4 4-4 4"/>'
  };

  const SKILLS = [
    {
      group: 'Programming languages & web',
      items: [
        ['C++', 'Core Foundation', 'Pointers, Memory Management, STL, Classes', 'cplusplus/cplusplus-original.svg'],
        ['Python', 'Proficient', 'Scripting, Automation, Data Structures, OOP', 'python/python-original.svg'],
        ['Java', 'Core Foundation', 'Object-Oriented Programming, Collections, Architecture', 'java/java-original.svg'],
        ['C Language', 'Foundational', 'Structured Programming, Memory, Arrays, Structs', 'c/c-original.svg'],
        ['JavaScript', 'Intermediate', 'Modern ES6+, Async/Await, DOM, Events', 'javascript/javascript-original.svg'],
        ['HTML5 & CSS3', 'Proficient', 'Semantic markup, modern flexbox, grid, animations', 'html5/html5-original.svg'],
        ['Tailwind CSS', 'Intermediate', 'Utility-first design, dark mode, responsive layouts', 'tailwindcss/tailwindcss-original.svg'],
        ['React.js', 'Intermediate', 'Functional components, Hooks, Virtual DOM', 'react/react-original.svg'],
        ['SQL', 'Foundational', 'Relational queries, Joins, Aggregations, Normalization', 'postgresql/postgresql-original.svg'],
        ['RESTful APIs', 'Foundational', 'HTTP verbs, JSON payloads, client-side fetching', 'g:rest']
      ]
    },
    {
      group: 'Computer science fundamentals',
      items: [
        ['Programming Fundamentals', 'Core Foundation', 'Variables, control structures, functions, arrays, pointers, and basic problem-solving', 'g:pf'],
        ['OOP Paradigm', 'Core Foundation', 'Encapsulation, Inheritance, Polymorphism, and Abstraction in C++, Java, and Python', 'g:oop'],
        ['Data Structures & Algorithms', 'Core Foundation', 'Arrays, linked lists, trees, graphs, sorting, searching, recursion, and complexity analysis', 'g:ds'],
        ['Database Design', 'Academic', 'ER schemas, normalization, indexing, and relational queries in SQL', 'g:db'],
        ['Computer Networks', 'Fundamentals', 'OSI & TCP/IP models, IP addressing, routing protocols, DNS, HTTP/HTTPS, and socket programming', 'g:net'],
        ['Operating Systems', 'Fundamentals', 'Processes, threads, CPU scheduling, and memory management', 'g:os'],
        ['Computer Organization & Assembly', 'Fundamentals', 'CPU architecture, registers, instruction sets, memory addressing, and low-level assembly programming', 'g:coal'],
        ['Full-Stack Web Development', 'Practical', 'HTML, CSS, JavaScript, React, and consuming REST APIs from the client', 'g:web'],
        ['Theory of Automata', 'Theoretical CS', 'Finite automata (DFA/NFA), regular expressions, context-free grammars, pushdown automata, and Turing machines', 'g:automata'],
        ['Machine Learning', 'AI & Data', 'Supervised & unsupervised learning, regression, classification, neural networks, and model evaluation', 'g:ml'],
        ['Cloud Computing', 'Infrastructure', 'Virtualization, IaaS/PaaS/SaaS models, cloud deployment, containers, and scalable storage', 'g:cloud'],
        ['Software Engineering', 'Engineering', 'SDLC models, Agile methodologies, requirements analysis, system design, and software testing', 'g:se']
      ]
    },
    {
      group: 'Tools & environments',
      items: [
        ['Git & GitHub', 'Daily Use', 'Version control, branching, pull requests, repositories', 'git/git-original.svg'],
        ['VS Code', 'Primary IDE', 'Extensions, debugging, terminal workflow', 'vscode/vscode-original.svg'],
        ['Linux / Bash', 'Command Line', 'Shell scripting, file manipulation, navigation', 'linux/linux-original.svg'],
        ['IntelliJ / PyCharm', 'Development', 'Java and Python development environments', 'intellij/intellij-original.svg'],
        ['Cisco Packet Tracer', 'Networking', 'Network topology simulation, router & switch configuration, packet analysis', 'g:cisco'],
        ['EMU8086', 'Assembly Lab', '8086 microprocessor emulation, register debugging, and instruction stepping', 'g:emu'],
        ['Dev-C++', 'C/C++ IDE', 'GCC/MinGW compilation, debugging, and core C/C++ programming', 'g:devcpp']
      ]
    }
  ];

  const svgIcon = k => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${G[k] || G.code}</svg>`;

  function renderSkills() {
    const root = $('#skills-root');
    if (!root) return;

    root.innerHTML = SKILLS.map(g => `
      <div class="skill-group">
        <h3>${esc(g.group)}</h3>
        <div class="skill-grid">
          ${g.items.map(([t, b, s, ic]) => `
            <article class="card skill">
              <div class="skill-top">
                <span class="ico">${ic.startsWith('g:') ? svgIcon(ic.slice(2)) : `<img src="${DEV + ic}" alt="" loading="lazy" width="24" height="24">`}</span>
                <span class="pill">${esc(b)}</span>
              </div>
              <h4>${esc(t)}</h4>
              <p>${esc(s)}</p>
            </article>
          `).join('')}
        </div>
      </div>
    `).join('');

    $$('#skills-root .ico img').forEach(img =>
      img.addEventListener('error', () => { img.closest('.ico').innerHTML = svgIcon('code'); }, { once: true })
    );
  }

  /* =========================================================
  5. NAVIGATION BAR & ACTIVE SCROLL SPY
     ========================================================= */
  function initNav() {
    const burger = $('#burger'), menu = $('#menu');
    if (!burger || !menu) return;

    const setOpen = o => {
      menu.classList.toggle('open', o);
      burger.setAttribute('aria-expanded', String(o));
    };
    burger.addEventListener('click', () => setOpen(!menu.classList.contains('open')));
    $$('a', menu).forEach(a => a.addEventListener('click', () => setOpen(false)));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') setOpen(false); });
    window.addEventListener('resize', () => { if (innerWidth > 820) setOpen(false); });

    const links = $$('a', menu);
    const secs = links.map(a => $(a.getAttribute('href'))).filter(Boolean);
    if (!secs.length) return;

    const setActive = id => links.forEach(a => {
      const on = a.getAttribute('href') === '#' + id;
      a.classList.toggle('active', on);
      on ? a.setAttribute('aria-current', 'true') : a.removeAttribute('aria-current');
    });

    const onScroll = () => {
      const y = scrollY + 120;
      let cur = secs[0].id;
      secs.forEach(s => { if (s.offsetTop <= y) cur = s.id; });
      if (innerHeight + scrollY >= document.body.offsetHeight - 4) cur = secs[secs.length - 1].id;
      setActive(cur);
    };

    addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* =========================================================
  6. SCROLL REVEAL ANIMATION (INTERSECTION OBSERVER)
     ========================================================= */
  function initReveal() {
    const els = $$('.reveal');
    if (!('IntersectionObserver' in window)) return els.forEach(e => e.classList.add('in'));

    const io = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    }), { threshold: .08 });

    els.forEach(e => io.observe(e));
  }

  /* =========================================================
  7. GITHUB API INTEGRATION (AVATAR & PUBLIC REPOSITORIES)
     ========================================================= */
  const LANG_COLORS = {
    JavaScript: '#f1e05a', Python: '#3572A5', Java: '#b07219', 'C++': '#f34b7d',
    C: '#8b949e', HTML: '#e34c26', CSS: '#563d7c', TypeScript: '#3178c6',
    Shell: '#89e051', 'Jupyter Notebook': '#DA5B0B'
  };

  function fallbackCard(msg) {
    return `<div class="card fallback"><h3>${esc(msg)}</h3><p>My repositories are available directly on GitHub.</p><a class="btn primary" href="${PROFILE_URL}?tab=repositories" target="_blank" rel="noopener">Open github.com/${USER}</a></div>`;
  }

  function applyProfile(p) {
    if (p.avatar_url) {
      const avatar = $('#hero-avatar');
      if (avatar) avatar.src = p.avatar_url + (p.avatar_url.includes('?') ? '&' : '?') + 's=400';
    }
  }

  function renderRepos(repos) {
    const grid = $('#projects-grid');
    if (!grid) return;

    const list = repos.filter(r => !r.fork).concat(repos.filter(r => r.fork));
    if (!list.length) {
      grid.innerHTML = fallbackCard('No public repositories to show yet');
      return;
    }

    grid.innerHTML = list.slice(0, 12).map(r => {
      const demo = r.homepage ? safeUrl(r.homepage) : null;
      return `
        <article class="card repo">
          <h3><a href="${esc(r.html_url)}" target="_blank" rel="noopener" style="text-decoration:none;color:inherit">${esc(r.name)}</a></h3>
          <p class="desc">${esc(r.description || 'Repository hosted on GitHub')}</p>
          <div class="meta">
            ${r.language ? `<span class="lang"><i class="dot" style="background:${LANG_COLORS[r.language] || 'var(--accent)'}"></i>${esc(r.language)}</span>` : ''}
            <span title="Stars">★ ${r.stargazers_count}</span>
            <span title="Forks">⑂ ${r.forks_count}</span>
            <span>Updated ${fmtDate(r.pushed_at || r.updated_at)}</span>
          </div>
          <div class="repo-links">
            <a href="${esc(r.html_url)}" target="_blank" rel="noopener">View repository</a>
            ${demo ? `<a href="${esc(demo)}" target="_blank" rel="noopener">Live demo</a>` : ''}
          </div>
        </article>`;
    }).join('');
  }

  async function loadGitHub() {
    try {
      const [pr, rr] = await Promise.all([fetch(API), fetch(API + '/repos?sort=updated&per_page=100')]);
      if (!pr.ok || !rr.ok) throw new Error('GitHub API ' + (pr.ok ? rr.status : pr.status));
      const [p, repos] = await Promise.all([pr.json(), rr.json()]);
      applyProfile(p);
      renderRepos(repos);
    } catch (err) {
      console.warn('GitHub data unavailable:', err.message);
      const grid = $('#projects-grid');
      if (grid) grid.innerHTML = fallbackCard('Live repository data is unavailable right now');
    }
  }

  const FALLBACK_AVATAR = 'data:image/svg+xml,' + encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><rect width="200" height="200" fill="#21262d"/><text x="100" y="118" font-family="sans-serif" font-size="64" font-weight="700" text-anchor="middle" fill="#2ea043">MSA</text></svg>'
  );
  $('#hero-avatar')?.addEventListener('error', function () {
    if (this.src !== FALLBACK_AVATAR) this.src = FALLBACK_AVATAR;
  });

  /* =========================================================
  7B. CERTIFICATES DATA, CARDS & INTERACTIVE LIGHTBOX MODAL
     ========================================================= */
  const CERTIFICATES = [
    {
      title: 'Learn HTML — Semantic Web Structure',
      issuer: 'MUHAMMAD SABOOR • Codecademy Verified',
      status: 'Completed & Verified',
      image: 'html.jpeg',
      description: 'Completed comprehensive training in semantic HTML5 elements, accessible document structure, forms, tables, and modern web standards.',
      tags: ['HTML5', 'Semantic HTML', 'Accessibility', 'Web Standards', 'DOM']
    },
    {
      title: 'Learn CSS — Styling & Typography',
      issuer: 'MUHAMMAD SABOOR • Codecademy Verified',
      status: 'Completed & Verified',
      image: 'css.jpeg',
      description: 'Mastered CSS3 selectors, cascade & specificity, box model, color systems, visual rules, and responsive typography.',
      tags: ['CSS3', 'Typography', 'Box Model', 'Selectors', 'Visual Design']
    },
    {
      title: 'Learn CSS: Flexbox and Grid Layouts',
      issuer: 'MUHAMMAD SABOOR • Codecademy Verified',
      status: 'Completed & Verified',
      image: 'flexbox.jpeg',
      description: 'Built modern, adaptive multi-column and 2D web layouts using CSS Flexbox alignment and CSS Grid template architectures.',
      tags: ['CSS Grid', 'Flexbox', 'Responsive Layout', 'CSS3', 'UI Architecture']
    },
    {
      title: 'Learn JavaScript — Core Programming',
      issuer: 'MUHAMMAD SABOOR • Codecademy Verified',
      status: 'Completed & Verified',
      image: 'js.jpeg',
      description: 'Completed core JavaScript fundamentals including ES6+ syntax, functions, arrays, loops, objects, and iterators.',
      tags: ['JavaScript', 'ES6+', 'Functions', 'Objects & Arrays', 'Frontend Logic']
    },
    {
      title: 'English Immersion (SD-100) — Certificate of Achievement',
      issuer: 'MUHAMMAD SABOOR • UMT Connected',
      status: 'Completed',
      image: 'english-immersion.png',
      pdf: 'english-immersion.pdf',
      description: 'Successfully completed the UMT-accredited English Immersion (SD-100) course, awarded on 25th Feb 2026.',
      tags: ['English', 'Communication', 'UMT', 'SD-100']
    },
    {
  title: 'QuizOff 2026 — India’s Biggest AI Quiz',
  issuer: 'CampusCrew • Unstop',
  status: 'Participation Recognized',
  image: 'AI Quiz.png',
  description: 'Participated in QuizOff 2026, India’s Biggest AI Quiz, organized by CampusCrew and hosted on Unstop, bringing together students from 48,500+ institutions.',
  tags: ['Artificial Intelligence', 'Quiz Competition', 'CampusCrew', 'Unstop', '2026']
},
{
  title: 'Frontend Development Internship — DeMeta',
  issuer: 'DeMeta Private Limited',
  status: 'Internship Certificate',
  image: 'DeMeta_M.Saboor.png',
  description: 'Completed a three-month Frontend Development internship at DeMeta from July 2025 to September 2025, with a focus on frontend development and practical learning.',
  tags: ['Frontend Development', 'Internship', 'Web Development', 'DeMeta', '3 Months']
}
  ];

  function initCertificates() {
    const grid = $('#certificates-grid');
    const modal = $('#cert-modal');
    if (!grid || !modal) return;

    const modalBox = $('.cert-modal-box', modal);
    const modalTitle = $('#cert-modal-title');
    const modalIssuer = $('#cert-modal-issuer');
    const modalDesc = $('#cert-modal-desc');
    const modalImg = $('#cert-modal-img');
    const modalTags = $('#cert-modal-tags');
    const modalCounter = $('#cert-counter');
    const openRawBtn = $('#cert-open-raw');
    const closeBtn = $('#cert-modal-close');
    const prevBtn = $('#cert-prev');
    const nextBtn = $('#cert-next');

    let currentIdx = 0;

    grid.innerHTML = CERTIFICATES.map((cert, idx) => `
      <article class="card cert-card" data-cert-idx="${idx}" tabindex="0" role="button" aria-label="Inspect ${esc(cert.title)}">
        <div class="cert-top">
          <div class="cert-ribbon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="8" r="6"/>
              <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>
            </svg>
          </div>
          <span class="cert-status">${esc(cert.status)}</span>
        </div>

        <div>
          <h3 class="cert-title">${esc(cert.title)}</h3>
          <p class="cert-issuer">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              <path d="m9 12 2 2 4-4"/>
            </svg>
            <span>${esc(cert.issuer)}</span>
          </p>
        </div>

        <div class="cert-preview">
          <img src="${esc(cert.image)}" alt="${esc(cert.title)} certificate" loading="lazy">
        </div>

        <div class="cert-tags">
          ${cert.tags.map(t => `<span>${esc(t)}</span>`).join('')}
        </div>

        <div class="cert-foot">
          <button class="cert-inspect-btn" type="button" data-cert-idx="${idx}">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
            <span>Inspect Certificate</span>
          </button>
          <a class="cert-direct-link cert-download-btn" href="${esc(cert.pdf || cert.image)}" download="${esc((cert.pdf || cert.image).split('/').pop())}" onclick="event.stopPropagation()">
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <path d="m7 10 5 5 5-5"/>
    <path d="M12 15V3"/>
  </svg>
  <span>Download</span>
</a>
        </div>
      </article>
    `).join('');

    // Show a clear placeholder if a certificate image path is missing or incorrect.
    $$('#certificates-grid .cert-preview img').forEach(img => {
      img.addEventListener('error', () => {
        const preview = img.closest('.cert-preview');
        if (!preview || preview.querySelector('.cert-image-error')) return;
        img.hidden = true;
        const message = document.createElement('div');
        message.className = 'cert-image-error';
        message.textContent = `Image not found: ${img.getAttribute('src')}`;
        preview.append(message);
      }, { once: true });
    });

    function renderModal(idx) {
      currentIdx = (idx + CERTIFICATES.length) % CERTIFICATES.length;
      const cert = CERTIFICATES[currentIdx];

      modalTitle.textContent = cert.title;
      modalIssuer.textContent = cert.issuer;
      modalDesc.textContent = cert.description;
      modalImg.hidden = false;
      modalImg.src = cert.image;
      modalImg.alt = `${cert.title} full certificate`;
      const oldError = modalImg.parentElement.querySelector('.cert-modal-image-error');
      if (oldError) oldError.remove();
      modalImg.onerror = () => {
        modalImg.hidden = true;
        const message = document.createElement('p');
        message.className = 'cert-modal-image-error';
        message.textContent = `Certificate image not found: ${cert.image}. Check the file name and folder.`;
        modalImg.parentElement.append(message);
      };
      modalCounter.textContent = `${currentIdx + 1} / ${CERTIFICATES.length}`;
      openRawBtn.href = cert.image;
      modalTags.innerHTML = cert.tags.map(t => `<span>${esc(t)}</span>`).join('');
    }

    function openModal(idx) {
      renderModal(idx);
      modal.hidden = false;
      document.documentElement.classList.add('modal-open');
      modalBox?.focus();
    }

    function closeModal() {
      modal.hidden = true;
      document.documentElement.classList.remove('modal-open');
    }

    grid.addEventListener('click', e => {
      if (e.target.closest('.cert-direct-link')) return;
      const card = e.target.closest('[data-cert-idx]');
      if (card) openModal(Number(card.dataset.certIdx));
    });

    grid.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        const card = e.target.closest('.cert-card');
        if (card) {
          e.preventDefault();
          openModal(Number(card.dataset.certIdx));
        }
      }
    });

    closeBtn?.addEventListener('click', closeModal);
    prevBtn?.addEventListener('click', () => renderModal(currentIdx - 1));
    nextBtn?.addEventListener('click', () => renderModal(currentIdx + 1));

    modal.addEventListener('click', e => {
      if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', e => {
      if (modal.hidden) return;
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowLeft') renderModal(currentIdx - 1);
      if (e.key === 'ArrowRight') renderModal(currentIdx + 1);
    });
  }

  /* =========================================================
  8. CONTACT SECTION (COPY EMAIL & FORM VALIDATION)
     ========================================================= */
  function initContact() {
    const copyStatus = $('#copy-status');
    const showCopyMsg = msg => {
      if (!copyStatus) return;
      copyStatus.textContent = msg;
      setTimeout(() => { copyStatus.textContent = ''; }, 2500);
    };

    $('#copy-email')?.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(EMAIL);
        showCopyMsg('✓ Email copied to clipboard!');
      } catch {
        showCopyMsg('Copy failed. Email: ' + EMAIL);
      }
    });

    const form = $('#contact-form'), status = $('#form-status');
    if (!form) return;

    const rules = {
      name: v => v.trim().length >= 2 ? '' : 'Enter your name (at least 2 characters).',
      email: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? '' : 'Enter a valid email address.',
      msg: v => v.trim().length >= 10 ? '' : 'Write a message of at least 10 characters.'
    };

    form.addEventListener('submit', e => {
      e.preventDefault();
      let valid = true;

      Object.keys(rules).forEach(key => {
        const input = $('#f-' + key), errEl = $('#e-' + key);
        if (!input || !errEl) return;
        const msg = rules[key](input.value);
        errEl.textContent = msg;
        input.classList.toggle('invalid', Boolean(msg));
        if (msg) valid = false;
      });

      if (!valid) return;

      const name = $('#f-name').value.trim();
      const email = $('#f-email').value.trim();
      const msg = $('#f-msg').value.trim();
      const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${msg}`);

      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${EMAIL}&su=${subject}&body=${body}`;
      window.open(gmailUrl, '_blank', 'noopener');
      if (status) status.textContent = '✓ Opening Gmail in a new tab to send your message...';
    });
  }

  /* =========================================================
  9. VANTA NET BACKGROUND (HERO SECTION)
     ========================================================= */
  function initVanta() {
    const target = $('#vanta-bg');
    if (!target || !window.VANTA || !window.VANTA.NET) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Site ka actual background colour (body) read karke Vanta ke liye hex banata hai
    const toHex = css => {
      const m = css.match(/\d+/g);
      if (!m || (m.length > 3 && +m[3] === 0)) return 0x0d1117; // fallback: GitHub dark
      return (+m[0] << 16) | (+m[1] << 8) | +m[2];
    };
    const bg = toHex(getComputedStyle(document.body).backgroundColor);
    const mobile = window.innerWidth < 820;

    try {
      window.VANTA.NET({
        el: target,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.0,
        minWidth: 200.0,
        scale: 1.0,
        scaleMobile: 1.0,
        color: 0x217d35,
        backgroundColor: bg,
        points: mobile ? 8.0 : 11.0,
        maxDistance: mobile ? 18.0 : 22.0,
        spacing: mobile ? 18.0 : 16.0
      });
      document.documentElement.classList.add('vanta-on');
    } catch (err) {
      console.warn('Vanta unavailable:', err.message);
    }
  }

  /* =========================================================
  10. INITIALIZE APPLICATION
     ========================================================= */
  const yearEl = $('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  initNameTyping();
  initTyping();
  renderSkills();
  initNav();
  initReveal();
  initCertificates();
  initContact();
  initVanta();
  loadGitHub();
})();

/* =========================================================
11. CUSTOM CURSOR (MAGNETIC RING + TRAIL + CLICK RIPPLE)
   ========================================================= */
(() => {
  'use strict';

  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const fxCanvas = document.createElement('canvas');
  const fxCtx = fxCanvas.getContext('2d');
  const dot = document.createElement('div');
  const ring = document.createElement('div');

  fxCanvas.className = 'cursor-fx-canvas';
  dot.className = 'cursor-dot';
  ring.className = 'cursor-ring';

  fxCanvas.setAttribute('aria-hidden', 'true');
  dot.setAttribute('aria-hidden', 'true');
  ring.setAttribute('aria-hidden', 'true');

  document.body.append(fxCanvas, ring, dot);
  document.documentElement.classList.add('has-cursor');

  let viewW = 0;
  let viewH = 0;

  /* Canvas ko DPR ke mutabiq resize karta hai taake trail aur ripple sharp dikhein */
  function resizeFxCanvas() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    viewW = window.innerWidth;
    viewH = window.innerHeight;
    fxCanvas.width = Math.floor(viewW * dpr);
    fxCanvas.height = Math.floor(viewH * dpr);
    fxCanvas.style.width = `${viewW}px`;
    fxCanvas.style.height = `${viewH}px`;
    fxCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  resizeFxCanvas();
  window.addEventListener('resize', resizeFxCanvas, { passive: true });

  let mx = -200, my = -200; // Actual cursor coordinates
  let rx = -200, ry = -200; // Smoothed magnetic ring coordinates
  let rw = 40, rh = 40;     // Smoothed ring width & height
  let activeEl = null;      // Currently magnetized button/link
  let lastTrailX = null, lastTrailY = null;

  const trailDots = [];
  const ripples = [];

  const MAGNET_SEL = '.btn, .hero-socials a, .profile-tile, .brand-mark, .burger, .icon-copy-btn, .footer a, .cert-nav-btn, .modal-close';
  const HOVER_SEL = 'a, button, .btn, .profile-tile, .info-row, .cert-card, [role="button"]';
  
  const setHover = on => {
    ring.classList.toggle('hover', on);
    dot.classList.toggle('hover', on);
  };

  /* Cursor ke peeche green trail dot spawn karta hai */
  function spawnTrail(x, y) {
    if (lastTrailX !== null && lastTrailY !== null) {
      const dist = Math.hypot(x - lastTrailX, y - lastTrailY);
      if (dist < 6) return;
    }
    lastTrailX = x;
    lastTrailY = y;

    trailDots.push({
      x,
      y,
      r: 4.5,
      alpha: 0.72,
      decay: 0.032
    });

    if (trailDots.length > 48) {
      trailDots.shift();
    }
  }

  /* Click karne par expanding green ripple banata hai */
  function spawnRipple(x, y) {
    ripples.push({
      x,
      y,
      r: 8,
      maxR: 72,
      alpha: 0.75
    });
  }

  /* Magnetic pull aur hover state ko saaf karta hai */
  function clearMagnetic() {
    if (activeEl) {
      activeEl.style.transform = '';
      activeEl.classList.remove('magnetic-active');
      if (document.activeElement === activeEl && typeof activeEl.blur === 'function') {
        activeEl.blur();
      }
      activeEl = null;
    }
    setHover(false);
  }

  /* Scroll rukne ke baad check karta hai ke cursor ke neeche kaunsa element hai */
  function syncCursorTarget() {
    if (mx < 0 || my < 0 || mx > viewW || my > viewH) {
      clearMagnetic();
      return;
    }

    const underCursor = document.elementFromPoint(mx, my);
    const hoverTarget = underCursor ? underCursor.closest(HOVER_SEL) : null;
    const magTarget = underCursor ? underCursor.closest(MAGNET_SEL) : null;

    setHover(Boolean(hoverTarget));

    if (magTarget !== activeEl) {
      if (activeEl) {
        activeEl.style.transform = '';
        activeEl.classList.remove('magnetic-active');
      }
      activeEl = magTarget || null;
      if (activeEl) {
        activeEl.classList.add('magnetic-active');
      }
    }
  }

  /* Scroll ke dauran stuck hover/magnetic state foran clear aur re-sync karta hai */
  let scrollTimer;
  window.addEventListener('scroll', () => {
    document.documentElement.classList.add('is-scrolling');
    clearMagnetic();
    lastTrailX = null;
    lastTrailY = null;

    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(() => {
      document.documentElement.classList.remove('is-scrolling');
      syncCursorTarget();
    }, 100);
  }, { passive: true });

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    dot.style.transform = `translate3d(${mx}px, ${my}px, 0)`;

    dot.classList.add('show');
    ring.classList.add('show');
    spawnTrail(mx, my);

    if (activeEl) {
      const rect = activeEl.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const pullX = (mx - cx) * 0.22;
      const pullY = (my - cy) * 0.22;
      activeEl.style.transform = `translate3d(${pullX}px, ${pullY}px, 0)`;
    }
  });

  document.addEventListener('mouseleave', () => {
    dot.classList.remove('show');
    ring.classList.remove('show');
    lastTrailX = null;
    lastTrailY = null;
    clearMagnetic();
  });

  document.addEventListener('mousedown', e => {
    ring.classList.add('down');
    spawnRipple(e.clientX, e.clientY);
  });

  document.addEventListener('mouseup', () => ring.classList.remove('down'));

  document.addEventListener('mouseover', e => {
    const hoverTarget = e.target.closest(HOVER_SEL);
    if (hoverTarget) setHover(true);

    const magTarget = e.target.closest(MAGNET_SEL);
    if (magTarget && magTarget !== activeEl) {
      if (activeEl) activeEl.style.transform = '';
      activeEl = magTarget;
      activeEl.classList.add('magnetic-active');
    }
  });

  document.addEventListener('mouseout', e => {
    const hoverTarget = e.target.closest(HOVER_SEL);
    if (hoverTarget && !(e.relatedTarget && e.relatedTarget.closest(HOVER_SEL))) {
      setHover(false);
    }

    if (activeEl && !activeEl.contains(e.relatedTarget)) {
      activeEl.style.transform = '';
      activeEl.classList.remove('magnetic-active');
      activeEl = null;
    }
  });

  /* Har frame mein trail dots aur click ripples draw karta hai */
  function renderTrailAndRipples() {
    fxCtx.clearRect(0, 0, viewW, viewH);

    for (let i = trailDots.length - 1; i >= 0; i--) {
      const p = trailDots[i];
      p.alpha -= p.decay;
      p.r *= 0.96;

      if (p.alpha <= 0.02 || p.r <= 0.4) {
        trailDots.splice(i, 1);
        continue;
      }

      fxCtx.beginPath();
      fxCtx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      fxCtx.fillStyle = `rgba(46, 160, 67, ${p.alpha.toFixed(3)})`;
      fxCtx.shadowColor = 'rgba(46, 160, 67, 0.55)';
      fxCtx.shadowBlur = 8;
      fxCtx.fill();
    }

    fxCtx.shadowBlur = 0;

    for (let i = ripples.length - 1; i >= 0; i--) {
      const rp = ripples[i];
      rp.r += (rp.maxR - rp.r) * 0.14 + 1.4;
      rp.alpha -= 0.028;

      if (rp.alpha <= 0.02 || rp.r >= rp.maxR) {
        ripples.splice(i, 1);
        continue;
      }

      fxCtx.beginPath();
      fxCtx.arc(rp.x, rp.y, rp.r, 0, Math.PI * 2);
      fxCtx.strokeStyle = `rgba(46, 160, 67, ${rp.alpha.toFixed(3)})`;
      fxCtx.lineWidth = 2;
      fxCtx.stroke();
    }
  }

  /* Magnetic ring ko smoothly target position aur size par lerp karta hai */
  (function animate() {
    let targetX = mx;
    let targetY = my;
    let targetW = 40;
    let targetH = 40;
    let targetRadius = '50%';

    if (activeEl) {
      const rect = activeEl.getBoundingClientRect();
      targetX = rect.left + rect.width / 2;
      targetY = rect.top + rect.height / 2;
      targetW = rect.width + 12;
      targetH = rect.height + 12;
      const computedRadius = getComputedStyle(activeEl).borderRadius;
      targetRadius = computedRadius && computedRadius !== '0px' ? computedRadius : '12px';
    }

    rx += (targetX - rx) * 0.24;
    ry += (targetY - ry) * 0.24;
    rw += (targetW - rw) * 0.24;
    rh += (targetH - rh) * 0.24;

    ring.style.width = `${rw}px`;
    ring.style.height = `${rh}px`;
    ring.style.marginLeft = `${-rw / 2}px`;
    ring.style.marginTop = `${-rh / 2}px`;
    ring.style.borderRadius = targetRadius;
    ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;

    renderTrailAndRipples();
    requestAnimationFrame(animate);
  })();
})();
