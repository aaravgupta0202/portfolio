/* ============================================================
   AARAV GUPTA — IDE PORTFOLIO v3 : SCRIPT
   Dynamic data loading from JSON, modal, tab nav, effects
   ============================================================ */

(function () {
  'use strict';

  // ── SVG Icon Templates ──
  const ICONS = {
    globe: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
    layout: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>`,
    layers: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>`,
    cart: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>`,
    code: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
    play: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>`,
    bolt: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>`,
    lock: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
    box3d: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>`,
    image: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>`,
    chevron: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>`,
    external: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>`,
    github: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>`,
    linkedin: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>`,
    twitter: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>`,
    gamepad: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="6" y1="11" x2="10" y2="11"/><line x1="8" y1="9" x2="8" y2="13"/><line x1="15" y1="12" x2="15.01" y2="12"/><line x1="18" y1="10" x2="18.01" y2="10"/><path d="M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z"/></svg>`,
    mail: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>`,
    sketchfab: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>`,
  };

  // Assign varied icons to project cards
  const PROJECT_ICONS = ['globe', 'layout', 'layers', 'cart', 'code', 'bolt'];
  const GAME_ICONS = ['play', 'bolt', 'lock'];
  const GALLERY_GRADIENTS = [
    'linear-gradient(145deg, #12142a, #1a1040)',
    'linear-gradient(145deg, #0f1a2e, #0a2020)',
    'linear-gradient(145deg, #1a1030, #100a28)',
    'linear-gradient(145deg, #0e1628, #18102a)',
    'linear-gradient(145deg, #141028, #0a1828)',
    'linear-gradient(145deg, #10201a, #0a1028)',
  ];

  // ── DOM Refs ──
  const tabs = document.querySelectorAll('.tab[data-section]');
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const mobileOverlay = document.getElementById('mobile-nav-overlay');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link[data-section]');
  const modalOverlay = document.getElementById('modal-overlay');

  // ── Load JSON data ──
  async function loadJSON(path) {
    try {
      const res = await fetch(path);
      if (!res.ok) throw new Error(`${res.status}`);
      return await res.json();
    } catch (e) {
      console.warn(`Failed to load ${path}:`, e);
      return null;
    }
  }

  async function init() {
    const [projects, games, gallery, socials] = await Promise.all([
      loadJSON('data/projects.json'),
      loadJSON('data/games.json'),
      loadJSON('data/gallery.json'),
      loadJSON('data/socials.json'),
    ]);

    if (projects) renderProjects(projects);
    if (games) renderGames(games);
    if (gallery) renderGallery(gallery);
    if (socials) renderSocials(socials);

    // Init reveal after rendering
    initReveal();
  }

  // ── Render Projects ──
  function renderProjects(items) {
    const container = document.getElementById('projects-grid');
    if (!container) return;
    container.innerHTML = '';

    items.forEach((item, i) => {
      const iconKey = PROJECT_ICONS[i % PROJECT_ICONS.length];
      const card = createCard(item, iconKey, 'project');
      container.appendChild(card);
    });
  }

  // ── Render Games ──
  function renderGames(items) {
    const container = document.getElementById('games-grid');
    if (!container) return;
    container.innerHTML = '';

    items.forEach((item, i) => {
      const iconKey = GAME_ICONS[i % GAME_ICONS.length];
      // Normalize link fields
      const normalized = { ...item, link: item.itchLink || item.link || '' };
      const card = createCard(normalized, iconKey, 'game');
      container.appendChild(card);
    });
  }

  // ── Create a project/game card ──
  function createCard(item, iconKey, type) {
    const card = document.createElement('div');
    card.className = 'card';
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');

    const hasThumb = item.images && item.images.length > 0;
    const thumbHTML = hasThumb
      ? `<div class="card-thumb"><img src="${item.images[0]}" alt="${item.name}" onerror="this.parentElement.innerHTML='<div class=\\'card-thumb-icon\\'>${ICONS[iconKey]}</div>'"/></div>`
      : `<div class="card-thumb"><div class="card-thumb-icon">${ICONS[iconKey]}</div></div>`;

    const linkLabel = type === 'game' ? 'Play on itch.io' : 'Visit Site';
    const primaryLink = type === 'game' ? (item.itchLink || item.link || '#') : (item.link || '#');

    card.innerHTML = `
      ${thumbHTML}
      <div class="card-body">
        <h3 class="card-title">
          <span class="card-title-icon">${ICONS.code}</span>
          ${escapeHTML(item.name)}
        </h3>
        <p class="card-desc">${escapeHTML(item.description)}</p>
        <div class="card-tags">
          ${(item.tags || []).map(t => `<span class="tag">${escapeHTML(t)}</span>`).join('')}
        </div>
        <div class="card-footer">
          <span class="card-year">${escapeHTML(item.year || '')}</span>
          <span class="card-link">View details <span class="arrow-icon">${ICONS.chevron}</span></span>
        </div>
      </div>
    `;

    card.addEventListener('click', () => openModal({
      title: item.name,
      desc: item.description,
      tags: item.tags || [],
      year: item.year || '',
      images: item.images || [],
      primaryUrl: primaryLink,
      primaryLabel: linkLabel,
      secondaryUrl: item.github || item.otherLink || item.sketchfabLink || '',
      secondaryLabel: item.github ? 'GitHub' : (item.sketchfabLink ? 'Sketchfab' : 'More Info'),
    }));

    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); card.click(); }
    });

    return card;
  }

  // ── Render Gallery ──
  function renderGallery(items) {
    const container = document.getElementById('gallery-grid');
    if (!container) return;
    container.innerHTML = '';

    items.forEach((item, i) => {
      const grad = GALLERY_GRADIENTS[i % GALLERY_GRADIENTS.length];
      const el = document.createElement('div');
      el.className = 'gallery-item';
      el.setAttribute('role', 'button');
      el.setAttribute('tabindex', '0');

      const thumbSrc = item.thumbnail || (item.images && item.images[0]);
      const imgHTML = thumbSrc
        ? `<img class="gallery-img" src="${thumbSrc}" alt="${item.name}" onerror="this.outerHTML='<div class=\\'gallery-img\\' style=\\'background:${grad};display:flex;align-items:center;justify-content:center;\\'><div style=\\'color:var(--text-faint);opacity:0.4;\\'>${ICONS.box3d}</div></div>'" />`
        : `<div class="gallery-img" style="background:${grad};display:flex;align-items:center;justify-content:center;"><div style="color:var(--text-faint);opacity:0.4;width:32px;height:32px;">${ICONS.box3d}</div></div>`;

      el.innerHTML = `
        <div class="gallery-img-wrapper">${imgHTML}</div>
        <div class="gallery-info">
          <h3>${escapeHTML(item.name)}</h3>
          <p>${escapeHTML(item.software || '')}</p>
        </div>
      `;

      el.addEventListener('click', () => openModal({
        title: item.name,
        desc: item.description,
        tags: item.tags || [],
        year: item.year || '',
        images: item.images || [],
        primaryUrl: item.sketchfabLink || '',
        primaryLabel: 'View on Sketchfab',
        secondaryUrl: '',
        secondaryLabel: '',
      }));

      el.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); el.click(); }
      });

      container.appendChild(el);
    });
  }

  // ── Render Socials ──
  function renderSocials(data) {
    // Update title bar text
    const titleText = document.querySelector('.title-bar-text');
    if (titleText) titleText.textContent = `${data.name.toLowerCase().replace(/\s+/g, '_')}.dev — portfolio`;

    // Update hero code block
    const heroName = document.getElementById('hero-name');
    const heroRole = document.getElementById('hero-role');
    const heroLocation = document.getElementById('hero-location');
    if (heroName) heroName.textContent = `"${data.name}"`;
    if (heroRole) heroRole.textContent = `"${data.role}"`;
    if (heroLocation) heroLocation.textContent = `"${data.location}"`;

    // Update about card
    const aboutName = document.getElementById('about-name');
    const aboutRole = document.getElementById('about-role');
    const aboutAvatar = document.getElementById('about-avatar');
    if (aboutName) aboutName.textContent = data.name;
    if (aboutRole) aboutRole.textContent = data.role;
    if (aboutAvatar) aboutAvatar.textContent = data.name.charAt(0);

    // Update title bar social links
    const titleGithub = document.getElementById('title-github');
    const titleLinkedin = document.getElementById('title-linkedin');
    if (titleGithub && data.links.github) titleGithub.href = data.links.github;
    if (titleLinkedin && data.links.linkedin) titleLinkedin.href = data.links.linkedin;

    // Update terminal commands
    const terminalBody = document.getElementById('terminal-body');
    if (terminalBody) {
      terminalBody.innerHTML = `
        <div class="terminal-comment"># reach out via email</div>
        <div class="terminal-line">
          <span class="terminal-prompt">$</span>
          <span class="terminal-cmd">echo <a href="mailto:${escapeHTML(data.email)}">"${escapeHTML(data.email)}"</a></span>
        </div>
        <div style="height: 6px;"></div>
        <div class="terminal-comment"># find me online</div>
        ${data.links.github ? `<div class="terminal-line"><span class="terminal-prompt">$</span><span class="terminal-cmd">open <a href="${escapeHTML(data.links.github)}" target="_blank">${escapeHTML(data.links.github.replace('https://', ''))}</a></span></div>` : ''}
        ${data.links.linkedin ? `<div class="terminal-line"><span class="terminal-prompt">$</span><span class="terminal-cmd">open <a href="${escapeHTML(data.links.linkedin)}" target="_blank">${escapeHTML(data.links.linkedin.replace('https://', ''))}</a></span></div>` : ''}
        ${data.links.twitter ? `<div class="terminal-line"><span class="terminal-prompt">$</span><span class="terminal-cmd">open <a href="${escapeHTML(data.links.twitter)}" target="_blank">${escapeHTML(data.links.twitter.replace('https://', ''))}</a></span></div>` : ''}
        ${data.links.itchio ? `<div class="terminal-line"><span class="terminal-prompt">$</span><span class="terminal-cmd">open <a href="${escapeHTML(data.links.itchio)}" target="_blank">${escapeHTML(data.links.itchio.replace('https://', ''))}</a></span></div>` : ''}
        ${data.resumeLink ? `<div style="height: 6px;"></div><div class="terminal-comment"># download resume</div><div class="terminal-line"><span class="terminal-prompt">$</span><span class="terminal-cmd">curl -O <a href="${escapeHTML(data.resumeLink)}" target="_blank">resume.pdf</a></span></div>` : ''}
        <div style="height: 6px;"></div>
        <div class="terminal-line">
          <span class="terminal-prompt">$</span>
          <span class="terminal-cmd" style="color: var(--text-faint);"><span class="cursor"></span></span>
        </div>
      `;
    }

    // Update social buttons
    const socialsContainer = document.getElementById('contact-socials');
    if (socialsContainer) {
      socialsContainer.innerHTML = '';

      const socialItems = [
        { key: 'github', icon: 'github', label: 'GitHub', url: data.links.github },
        { key: 'linkedin', icon: 'linkedin', label: 'LinkedIn', url: data.links.linkedin },
        { key: 'twitter', icon: 'twitter', label: 'Twitter', url: data.links.twitter },
        { key: 'itchio', icon: 'gamepad', label: 'itch.io', url: data.links.itchio },
      ];

      socialItems.forEach(s => {
        if (!s.url) return;
        const a = document.createElement('a');
        a.href = s.url;
        a.target = '_blank';
        a.rel = 'noopener';
        a.className = 'social-btn';
        a.innerHTML = `<span style="width:15px;height:15px;display:flex;">${ICONS[s.icon]}</span> ${s.label}`;
        socialsContainer.appendChild(a);
      });

      // Email button
      if (data.email) {
        const emailBtn = document.createElement('a');
        emailBtn.href = `mailto:${data.email}`;
        emailBtn.className = 'social-btn primary';
        emailBtn.innerHTML = `<span style="width:15px;height:15px;display:flex;">${ICONS.mail}</span> Email`;
        socialsContainer.appendChild(emailBtn);
      }
    }

    // Update footer
    const footerName = document.getElementById('footer-name');
    if (footerName) footerName.textContent = data.name;
  }

  // ── Detail Modal ──
  let currentModalImages = [];
  let currentModalIndex = 0;

  function openModal(data) {
    document.getElementById('modal-title').textContent = data.title;
    document.getElementById('modal-desc').textContent = data.desc;
    document.getElementById('modal-year').textContent = data.year ? `© ${data.year}` : '';

    // Tags
    const tagsEl = document.getElementById('modal-tags');
    tagsEl.innerHTML = data.tags.map(t => `<span class="tag">${escapeHTML(t)}</span>`).join('');

    // Gallery
    currentModalImages = data.images;
    currentModalIndex = 0;
    renderModalImage(0);

    const thumbsEl = document.getElementById('modal-thumbs');
    thumbsEl.innerHTML = '';
    data.images.forEach((img, i) => {
      const thumb = document.createElement('div');
      thumb.className = `modal-thumb${i === 0 ? ' active' : ''}`;

      const thumbImg = document.createElement('img');
      thumbImg.src = img;
      thumbImg.alt = `Preview ${i + 1}`;
      thumbImg.onerror = function () {
        this.parentElement.style.background = 'var(--bg-surface)';
        this.parentElement.style.display = 'flex';
        this.parentElement.style.alignItems = 'center';
        this.parentElement.style.justifyContent = 'center';
        this.parentElement.style.fontSize = '10px';
        this.parentElement.style.color = 'var(--text-faint)';
        this.parentElement.textContent = `${i + 1}`;
      };
      thumb.appendChild(thumbImg);

      thumb.addEventListener('click', () => {
        currentModalIndex = i;
        renderModalImage(i);
        thumbsEl.querySelectorAll('.modal-thumb').forEach((t, j) => t.classList.toggle('active', j === i));
      });
      thumbsEl.appendChild(thumb);
    });

    // Actions
    const actionsEl = document.getElementById('modal-actions');
    actionsEl.innerHTML = '';

    if (data.primaryUrl) {
      const btn = document.createElement('a');
      btn.href = data.primaryUrl;
      btn.target = '_blank';
      btn.rel = 'noopener';
      btn.className = 'modal-btn modal-btn-primary';
      btn.innerHTML = `<span style="width:15px;height:15px;display:flex;">${ICONS.external}</span> ${escapeHTML(data.primaryLabel)}`;
      actionsEl.appendChild(btn);
    }

    if (data.secondaryUrl) {
      const btn2 = document.createElement('a');
      btn2.href = data.secondaryUrl;
      btn2.target = '_blank';
      btn2.rel = 'noopener';
      btn2.className = 'modal-btn modal-btn-secondary';
      btn2.innerHTML = `<span style="width:15px;height:15px;display:flex;">${ICONS.github}</span> ${escapeHTML(data.secondaryLabel)}`;
      actionsEl.appendChild(btn2);
    }

    modalOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function renderModalImage(index) {
    const mainImg = document.getElementById('modal-main-img');
    if (currentModalImages.length === 0 || !currentModalImages[index]) {
      mainImg.innerHTML = `<div class="placeholder-icon" style="width:48px;height:48px;">${ICONS.image}</div>`;
      return;
    }

    const img = document.createElement('img');
    img.src = currentModalImages[index];
    img.alt = 'Preview';
    img.onerror = function () {
      mainImg.innerHTML = `<div class="placeholder-icon" style="width:48px;height:48px;">${ICONS.image}</div>`;
    };
    mainImg.innerHTML = '';
    mainImg.appendChild(img);
  }

  function closeModal() {
    modalOverlay?.classList.remove('open');
    document.body.style.overflow = '';
  }

  document.getElementById('modal-close-btn')?.addEventListener('click', closeModal);
  modalOverlay?.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  // ── Smooth scroll ──
  function scrollTo(sectionId) {
    const el = document.getElementById(sectionId);
    if (!el) return;
    const offset = window.innerWidth <= 768 ? 46 : 86;
    const y = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }

  tabs.forEach(tab => tab.addEventListener('click', () => scrollTo(tab.dataset.section)));
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      scrollTo(link.dataset.section);
      closeMobileMenu();
    });
  });

  // ── Active tab tracking ──
  const sectionIds = Array.from(tabs).map(t => t.dataset.section);

  function updateActiveTabs() {
    let activeId = sectionIds[0];
    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (el && window.scrollY >= el.offsetTop - 140) activeId = id;
    });
    tabs.forEach(tab => tab.classList.toggle('active', tab.dataset.section === activeId));
    mobileLinks.forEach(link => link.classList.toggle('active', link.dataset.section === activeId));
  }

  window.addEventListener('scroll', updateActiveTabs, { passive: true });

  // ── Mobile menu ──
  function closeMobileMenu() {
    mobileOverlay?.classList.remove('open');
    document.body.style.overflow = '';
  }

  mobileBtn?.addEventListener('click', () => {
    const open = mobileOverlay?.classList.contains('open');
    if (open) closeMobileMenu();
    else { mobileOverlay?.classList.add('open'); document.body.style.overflow = 'hidden'; }
  });

  // ── Keyboard ──
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { closeModal(); closeMobileMenu(); }
    // Arrow keys for modal images
    if (modalOverlay?.classList.contains('open') && currentModalImages.length > 1) {
      if (e.key === 'ArrowRight') {
        currentModalIndex = (currentModalIndex + 1) % currentModalImages.length;
        renderModalImage(currentModalIndex);
        document.querySelectorAll('.modal-thumb').forEach((t, j) => t.classList.toggle('active', j === currentModalIndex));
      }
      if (e.key === 'ArrowLeft') {
        currentModalIndex = (currentModalIndex - 1 + currentModalImages.length) % currentModalImages.length;
        renderModalImage(currentModalIndex);
        document.querySelectorAll('.modal-thumb').forEach((t, j) => t.classList.toggle('active', j === currentModalIndex));
      }
    }
  });

  // ── Scroll Reveal ──
  function initReveal() {
    const els = document.querySelectorAll('.reveal, .reveal-stagger');
    if ('IntersectionObserver' in window) {
      const obs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) { entry.target.classList.add('visible'); obs.unobserve(entry.target); }
        });
      }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
      els.forEach(el => obs.observe(el));
    } else {
      els.forEach(el => el.classList.add('visible'));
    }
  }

  // ── Footer year ──
  const yearEl = document.getElementById('current-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ── Status bar tracker ──
  const lineColEl = document.getElementById('status-line-col');
  if (lineColEl) {
    let raf;
    document.addEventListener('mousemove', (e) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const ln = Math.floor((e.clientY / window.innerHeight) * 100) + 1;
        const col = Math.floor((e.clientX / window.innerWidth) * 120) + 1;
        lineColEl.textContent = `Ln ${ln}, Col ${col}`;
      });
    });
  }

  // ── Utility ──
  function escapeHTML(str) {
    const d = document.createElement('div');
    d.textContent = str || '';
    return d.innerHTML;
  }

  // ── Kick it off ──
  init();

})();
