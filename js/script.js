/* ============================================================
   AARAV GUPTA — UNCONSTRAINED CREATIVE PORTFOLIO SCRIPT
   ============================================================ */

(function () {
  'use strict';

  const ICONS = {
    chevron: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>`,
    external: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>`,
    github: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>`,
    linkedin: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>`,
    twitter: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>`,
    gamepad: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="6" y1="11" x2="10" y2="11"/><line x1="8" y1="9" x2="8" y2="13"/><line x1="15" y1="12" x2="15.01" y2="12"/><line x1="18" y1="10" x2="18.01" y2="10"/><path d="M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z"/></svg>`,
    mail: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>`,
    image: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>`,
    box3d: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>`
  };

  const modalOverlay = document.getElementById('modal-overlay');

  // ── Custom Cursor ──
  const cursor = document.getElementById('custom-cursor');
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (cursor) {
      cursor.style.left = `${mouseX}px`;
      cursor.style.top = `${mouseY}px`;
    }
  });

  // Handle cursor hover states
  function initHoverCursors() {
    const interactables = document.querySelectorAll('a, button, .card, .gallery-item, .modal-thumb, .hero-character');
    interactables.forEach(el => {
      el.addEventListener('mouseenter', () => cursor?.classList.add('hover'));
      el.addEventListener('mouseleave', () => cursor?.classList.remove('hover'));
    });
  }

  // ── Drawing Canvas Background ──
  const canvas = document.getElementById('drawing-canvas');
  const ctx = canvas?.getContext('2d');
  let isDrawing = false;
  let lines = []; // store lines for fading

  if (canvas && ctx) {
    // Resize canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    ctx.strokeStyle = 'rgba(0, 0, 0, 0.15)';
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    let lastX = 0;
    let lastY = 0;

    document.addEventListener('mousedown', (e) => {
      isDrawing = true;
      lastX = e.clientX;
      lastY = e.clientY;
    });

    document.addEventListener('mousemove', (e) => {
      if (!isDrawing) return;
      lines.push({
        x1: lastX,
        y1: lastY,
        x2: e.clientX,
        y2: e.clientY,
        life: 1.0
      });
      lastX = e.clientX;
      lastY = e.clientY;
    });

    document.addEventListener('mouseup', () => isDrawing = false);
    
    // Draw loop for fading
    function drawLoop() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = lines.length - 1; i >= 0; i--) {
        const l = lines[i];
        ctx.beginPath();
        ctx.moveTo(l.x1, l.y1);
        ctx.lineTo(l.x2, l.y2);
        ctx.strokeStyle = `rgba(0, 0, 0, ${l.life * 0.15})`;
        ctx.stroke();
        
        l.life -= 0.01; // fade out speed
        if (l.life <= 0) {
          lines.splice(i, 1);
        }
      }
      requestAnimationFrame(drawLoop);
    }
    drawLoop();
  }

  // ── Character Interaction ──
  function initCharacter() {
    const character = document.getElementById('hero-character');
    if (!character) return;
    
    // Spin on click
    character.addEventListener('click', () => {
      character.classList.add('spin');
      setTimeout(() => character.classList.remove('spin'), 1000);
    });

    // Subtle parallax that stacks with floating
    document.addEventListener('mousemove', (e) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const deltaX = (e.clientX - centerX) / centerX;
      const deltaY = (e.clientY - centerY) / centerY;
      
      // We apply margins so it doesn't override the floating transform
      character.style.marginLeft = `${deltaX * 30}px`;
      character.style.marginTop = `${deltaY * 30}px`;
    });
  }

  // ── Typing Effect State ──
  let roles = ["Developer", "3D Artist", "Game Dev"];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingElement = document.getElementById('typing-text');

  function typeEffect() {
    if (!typingElement) return;
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
      typingElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
    }

    let typeSpeed = isDeleting ? 40 : 100;

    if (!isDeleting && charIndex === currentRole.length) {
      typeSpeed = 1500;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typeSpeed = 300;
    }
    setTimeout(typeEffect, typeSpeed);
  }

  // ── Data Loading & Rendering ──
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
    if (socials) {
      if (socials.role) roles = socials.role.split('·').map(s => s.trim());
      renderSocials(socials);
    }

    typeEffect();
    initCharacter();
    initReveal();
    
    // Timeout to ensure DOM is fully populated before adding hover listeners
    setTimeout(initHoverCursors, 100);
  }

  // Helper for random polaroid rotation
  function getRandomRotation() {
    const angle = (Math.random() - 0.5) * 8; // -4deg to +4deg
    return `rotate(${angle}deg)`;
  }

  function renderProjects(items) {
    const container = document.getElementById('projects-grid');
    if (!container) return;
    container.innerHTML = '';
    const renderItems = [...items, ...items, ...items, ...items]; // Duplicate for infinite scroll
    renderItems.forEach((item, index) => {
      const card = createCard(item, 'project');
      card.style.transform = getRandomRotation();
      if (index % 3 === 0) {
        const tape = document.createElement('div');
        tape.className = 'tape';
        card.appendChild(tape);
      }
      container.appendChild(card);
    });
  }

  function renderGames(items) {
    const container = document.getElementById('games-grid');
    if (!container) return;
    container.innerHTML = '';
    const renderItems = [...items, ...items, ...items, ...items];
    renderItems.forEach((item, index) => {
      const normalized = { ...item, link: item.itchLink || item.link || '' };
      const card = createCard(normalized, 'game');
      card.style.transform = getRandomRotation();
      if (index % 4 === 1) {
        const tape = document.createElement('div');
        tape.className = 'tape';
        card.appendChild(tape);
      }
      container.appendChild(card);
    });
  }

  function createCard(item, type) {
    const card = document.createElement('div');
    card.className = 'card';
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');

    const linkLabel = type === 'game' ? 'Play on itch.io' : 'View Project';
    const primaryLink = type === 'game' ? (item.itchLink || item.link || '#') : (item.link || '#');

    card.innerHTML = `
      <div class="card-body">
        <h3 class="card-title">${escapeHTML(item.name)}</h3>
        <p class="card-desc">${escapeHTML(item.description)}</p>
        <div class="card-tags">
          ${(item.tags || []).slice(0, 3).map(t => `<span class="tag">${escapeHTML(t)}</span>`).join('')}
          ${(item.tags && item.tags.length > 3) ? `<span class="tag">+${item.tags.length - 3}</span>` : ''}
        </div>
        <div class="card-footer">
          <span class="card-year">${escapeHTML(item.year || '')}</span>
          <span class="card-link">${linkLabel}</span>
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
      secondaryLabel: item.github ? 'GitHub' : (item.sketchfabLink ? 'Sketchfab' : 'Code'),
    }));

    return card;
  }

  function renderGallery(items) {
    const container = document.getElementById('gallery-grid');
    if (!container) return;
    container.innerHTML = '';

    const renderItems = [...items, ...items, ...items, ...items];
    renderItems.forEach((item, index) => {
      const el = document.createElement('div');
      el.className = 'gallery-item';
      el.setAttribute('role', 'button');
      el.setAttribute('tabindex', '0');
      el.style.transform = getRandomRotation();
      
      if (index % 5 === 2) {
        const tape = document.createElement('div');
        tape.className = 'tape';
        el.appendChild(tape);
      }

      const thumbSrc = item.thumbnail || (item.images && item.images[0]);
      const imgHTML = thumbSrc
        ? `<img class="gallery-img" src="${thumbSrc}" alt="${item.name}" onerror="this.outerHTML='<div class=\\'gallery-img\\' style=\\'background:var(--border-color);display:flex;align-items:center;justify-content:center;\\'><div style=\\'color:var(--text-secondary);opacity:0.4;\\'>${ICONS.box3d}</div></div>'" />`
        : `<div class="gallery-img" style="background:var(--border-color);display:flex;align-items:center;justify-content:center;"><div style="color:var(--text-secondary);opacity:0.4;width:32px;height:32px;">${ICONS.box3d}</div></div>`;

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
      }));

      container.appendChild(el);
    });
  }

  function renderSocials(data) {
    document.title = `${data.name} — Portfolio`;
    
    const fName = data.name.split(' ')[0].toUpperCase();
    document.getElementById('hero-name').textContent = fName;
    document.getElementById('footer-name').textContent = data.name;

    const socialsContainer = document.getElementById('contact-socials');
    if (socialsContainer) {
      socialsContainer.innerHTML = '';

      const socialItems = [
        { key: 'github', icon: 'github', label: 'GitHub', url: data.links?.github },
        { key: 'linkedin', icon: 'linkedin', label: 'LinkedIn', url: data.links?.linkedin },
        { key: 'twitter', icon: 'twitter', label: 'Twitter', url: data.links?.twitter },
        { key: 'itchio', icon: 'gamepad', label: 'itch.io', url: data.links?.itchio },
      ];

      socialItems.forEach(s => {
        if (!s.url) return;
        const a = document.createElement('a');
        a.href = s.url;
        a.target = '_blank';
        a.rel = 'noopener';
        a.className = 'social-btn';
        a.ariaLabel = s.label;
        a.innerHTML = `<span style="width:24px;height:24px;display:flex;">${ICONS[s.icon]}</span>`;
        socialsContainer.appendChild(a);
      });

      if (data.email) {
        const emailBtn = document.createElement('a');
        emailBtn.href = `mailto:${data.email}`;
        emailBtn.className = 'social-btn primary';
        emailBtn.innerHTML = `<span style="width:20px;height:20px;display:flex;">${ICONS.mail}</span> Say Hello`;
        socialsContainer.appendChild(emailBtn);
      }
    }
  }

  // ── Detail Modal ──
  let currentModalImages = [];
  let currentModalIndex = 0;

  function openModal(data) {
    document.getElementById('modal-title').textContent = data.title;
    document.getElementById('modal-desc').textContent = data.desc;
    document.getElementById('modal-year').textContent = data.year ? `© ${data.year}` : '';

    const tagsEl = document.getElementById('modal-tags');
    tagsEl.innerHTML = data.tags.map(t => `<span class="tag">${escapeHTML(t)}</span>`).join('');

    currentModalImages = data.images || [];
    currentModalIndex = 0;
    renderModalImage(0);

    const thumbsEl = document.getElementById('modal-thumbs');
    thumbsEl.innerHTML = '';
    
    if (currentModalImages.length > 1) {
      thumbsEl.style.display = 'flex';
      currentModalImages.forEach((img, i) => {
        const thumb = document.createElement('div');
        thumb.className = `modal-thumb${i === 0 ? ' active' : ''}`;
        const thumbImg = document.createElement('img');
        thumbImg.src = img;
        thumbImg.alt = `Preview ${i + 1}`;
        thumbImg.onerror = function () {
          this.parentElement.style.background = 'var(--border-color)';
        };
        thumb.appendChild(thumbImg);

        thumb.addEventListener('click', () => {
          currentModalIndex = i;
          renderModalImage(i);
          thumbsEl.querySelectorAll('.modal-thumb').forEach((t, j) => t.classList.toggle('active', j === i));
        });
        thumbsEl.appendChild(thumb);
      });
    } else {
      thumbsEl.style.display = 'none';
    }

    const actionsEl = document.getElementById('modal-actions');
    actionsEl.innerHTML = '';

    if (data.primaryUrl && data.primaryUrl !== '#') {
      const btn = document.createElement('a');
      btn.href = data.primaryUrl;
      btn.target = '_blank';
      btn.rel = 'noopener';
      btn.className = 'modal-btn modal-btn-primary';
      btn.innerHTML = `<span style="width:20px;height:20px;display:flex;">${ICONS.external}</span> ${escapeHTML(data.primaryLabel || 'Visit')}`;
      actionsEl.appendChild(btn);
    }

    if (data.secondaryUrl && data.secondaryUrl !== '#') {
      const btn2 = document.createElement('a');
      btn2.href = data.secondaryUrl;
      btn2.target = '_blank';
      btn2.rel = 'noopener';
      btn2.className = 'modal-btn modal-btn-secondary';
      btn2.innerHTML = `<span style="width:20px;height:20px;display:flex;">${ICONS.github}</span> ${escapeHTML(data.secondaryLabel || 'Code')}`;
      actionsEl.appendChild(btn2);
    }

    modalOverlay.classList.add('open');
    document.body.style.overflow = 'hidden'; // Lock background scrolling
    // Ensure custom cursor works in modal
    initHoverCursors(); 
  }

  function renderModalImage(index) {
    const mainImg = document.getElementById('modal-main-img');
    if (currentModalImages.length === 0 || !currentModalImages[index]) {
      mainImg.innerHTML = `<div class="placeholder-icon" style="width:64px;height:64px;">${ICONS.image}</div>`;
      return;
    }

    const img = document.createElement('img');
    img.src = currentModalImages[index];
    img.alt = 'Preview';
    img.onerror = function () {
      mainImg.innerHTML = `<div class="placeholder-icon" style="width:64px;height:64px;">${ICONS.image}</div>`;
    };
    mainImg.innerHTML = '';
    mainImg.appendChild(img);
  }

  function closeModal() {
    modalOverlay?.classList.remove('open');
    document.body.style.overflow = ''; // Restore background scrolling
  }

  document.getElementById('modal-close-btn')?.addEventListener('click', closeModal);
  modalOverlay?.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
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
    const els = document.querySelectorAll('.fade-in');
    if ('IntersectionObserver' in window) {
      const obs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) { entry.target.classList.add('visible'); obs.unobserve(entry.target); }
        });
      }, { threshold: 0.1 });
      els.forEach(el => obs.observe(el));
    } else {
      els.forEach(el => el.classList.add('visible'));
    }
  }

  const yearEl = document.getElementById('current-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  function escapeHTML(str) {
    const d = document.createElement('div');
    d.textContent = str || '';
    return d.innerHTML;
  }

  init();
})();
