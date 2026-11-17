import { PROFILE, SERVICES, PROJECTS, STACK_GROUPS } from "./data.js";

/* -------------------------------------------------------------------------- */
/* 1. Dark / Light Mode Toggle (mirrors <meta name="color-scheme">)           */
/* -------------------------------------------------------------------------- */
function initThemeToggle() {
  const meta = document.querySelector('meta[name="color-scheme"]');
  const toggleBtn = document.getElementById("theme-toggle");
  if (!meta || !toggleBtn) return;

  const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const getSystemScheme = () => (darkQuery.matches ? "dark" : "light");

  const getRenderedScheme = () => {
    if (meta.content === "dark" || meta.content === "light") return meta.content;
    return getSystemScheme();
  };

  const applyFromStorage = () => {
    try {
      meta.content = localStorage.getItem("color-scheme") ?? "light dark";
    } catch {
      meta.content = "light dark";
    }
  };

  toggleBtn.addEventListener("click", () => {
    const target = getRenderedScheme() === "dark" ? "light" : "dark";
    const system = getSystemScheme();

    if (target !== system) {
      meta.content = target;
      try {
        localStorage.setItem("color-scheme", target);
      } catch {
        /* Keep runtime toggle even if storage is blocked */
      }
    } else {
      meta.content = "light dark";
      try {
        localStorage.removeItem("color-scheme");
      } catch {
        /* Ignore */
      }
    }
  });

  window.addEventListener("storage", (event) => {
    if (event.key === "color-scheme") {
      applyFromStorage();
    }
  });
}

/* -------------------------------------------------------------------------- */
/* 2. Mobile Navigation Drawer                                                */
/* -------------------------------------------------------------------------- */
function initMobileMenu() {
  const menuBtn = document.getElementById("menu-toggle");
  const navList = document.getElementById("nav-links");
  if (!menuBtn || !navList) return;

  const setOpen = (open) => {
    navList.classList.toggle("is-open", open);
    menuBtn.setAttribute("aria-expanded", String(open));
  };

  menuBtn.addEventListener("click", () => {
    const isOpen = menuBtn.getAttribute("aria-expanded") === "true";
    setOpen(!isOpen);
  });

  navList.addEventListener("click", (event) => {
    if (event.target.closest("a")) setOpen(false);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && navList.classList.contains("is-open")) {
      setOpen(false);
      menuBtn.focus();
    }
  });
}

/* -------------------------------------------------------------------------- */
/* 3. Render Services, Projects, and Tech Stack                               */
/* -------------------------------------------------------------------------- */
function createTagList(items) {
  const ul = document.createElement("ul");
  ul.className = "tag-list";
  for (const item of items) {
    const li = document.createElement("li");
    li.textContent = item;
    ul.append(li);
  }
  return ul;
}

function getProjectVisualSvg(visualKey) {
  switch (visualKey) {
    case "architecture":
      return `
        <svg aria-hidden="true" viewBox="0 0 360 190" fill="none">
          <rect x="14" y="18" width="96" height="44" rx="8" stroke="currentColor" stroke-opacity="0.35" stroke-width="1.5"/>
          <text x="62" y="44" text-anchor="middle" fill="currentColor" font-family="monospace" font-size="11">Flutter App</text>
          <rect x="132" y="18" width="96" height="44" rx="8" stroke="#38bdf8" stroke-width="1.6"/>
          <text x="180" y="44" text-anchor="middle" fill="#38bdf8" font-family="monospace" font-size="11">FastAPI REST</text>
          <rect x="250" y="18" width="96" height="44" rx="8" stroke="#34d399" stroke-width="1.5"/>
          <text x="298" y="44" text-anchor="middle" fill="#34d399" font-family="monospace" font-size="11">SQLModel DB</text>
          <path d="M110 40H132M228 40H250" stroke="currentColor" stroke-opacity="0.5" stroke-width="1.5"/>
          <rect x="34" y="102" width="136" height="62" rx="8" stroke="currentColor" stroke-opacity="0.25" stroke-dasharray="4 4"/>
          <text x="102" y="128" text-anchor="middle" fill="currentColor" fill-opacity="0.8" font-family="monospace" font-size="10">Ingesta CSV / Catálogos</text>
          <text x="102" y="146" text-anchor="middle" fill="currentColor" fill-opacity="0.55" font-family="monospace" font-size="9">Precios centralizados</text>
          <rect x="190" y="102" width="136" height="62" rx="8" stroke="currentColor" stroke-opacity="0.25" stroke-dasharray="4 4"/>
          <text x="258" y="128" text-anchor="middle" fill="currentColor" fill-opacity="0.8" font-family="monospace" font-size="10">Auditoría &amp; Stock</text>
          <text x="258" y="146" text-anchor="middle" fill="currentColor" fill-opacity="0.55" font-family="monospace" font-size="9">Multi-sucursal</text>
          <path d="M180 62V82M102 82H258M102 82V102M258 82V102" stroke="#38bdf8" stroke-opacity="0.6" stroke-width="1.5"/>
        </svg>`;
    case "landscape":
      return `
        <svg aria-hidden="true" viewBox="0 0 320 140" fill="none">
          <path d="M20 35 Q80 28 115 15 T195 34 T300 30" stroke="currentColor" stroke-opacity="0.35" stroke-width="1.4"/>
          <path d="M20 55 Q85 45 125 24 T205 52 T300 50" stroke="currentColor" stroke-opacity="0.5" stroke-width="1.4"/>
          <path d="M20 75 Q90 60 135 32 T215 72 T300 72" stroke="#38bdf8" stroke-width="1.6"/>
          <path d="M20 95 Q95 82 145 48 T225 92 T300 94" stroke="currentColor" stroke-opacity="0.55" stroke-width="1.4"/>
          <path d="M20 115 Q100 105 155 72 T235 112 T300 116" stroke="currentColor" stroke-opacity="0.35" stroke-width="1.4"/>
          <circle cx="156" cy="52" r="4" fill="#34d399"/>
        </svg>`;
    case "wave":
      return `
        <svg aria-hidden="true" viewBox="0 0 320 120" fill="none">
          <path d="M16 60 C46 18, 76 102, 106 60 C136 18, 166 102, 196 60 C226 18, 256 102, 286 60" stroke="#38bdf8" stroke-width="2"/>
          <path d="M16 60 C52 34, 82 86, 118 60 C154 34, 184 86, 220 60 C256 34, 280 86, 304 60" stroke="#34d399" stroke-opacity="0.6" stroke-width="1.5"/>
        </svg>`;
    case "ranking":
      return `
        <svg aria-hidden="true" viewBox="0 0 320 120" fill="none">
          <rect x="28" y="24" width="160" height="14" rx="4" fill="#38bdf8" fill-opacity="0.85"/>
          <rect x="28" y="50" width="220" height="14" rx="4" fill="#34d399" fill-opacity="0.85"/>
          <rect x="28" y="76" width="118" height="14" rx="4" fill="currentColor" fill-opacity="0.28"/>
          <text x="260" y="61" fill="#34d399" font-family="monospace" font-size="11">+Δ NLP</text>
        </svg>`;
    default:
      return `
        <svg aria-hidden="true" viewBox="0 0 320 120" fill="none">
          <rect x="20" y="42" width="70" height="36" rx="7" stroke="currentColor" stroke-opacity="0.4"/>
          <text x="55" y="64" text-anchor="middle" fill="currentColor" font-family="monospace" font-size="10">Medios</text>
          <rect x="125" y="42" width="70" height="36" rx="7" stroke="#38bdf8"/>
          <text x="160" y="64" text-anchor="middle" fill="#38bdf8" font-family="monospace" font-size="10">EPUB</text>
          <rect x="230" y="42" width="70" height="36" rx="7" stroke="#34d399"/>
          <text x="265" y="64" text-anchor="middle" fill="#34d399" font-family="monospace" font-size="10">Kobo</text>
          <path d="M90 60H125M195 60H230" stroke="currentColor" stroke-opacity="0.55" stroke-width="1.5"/>
        </svg>`;
  }
}

function renderServices() {
  const grid = document.getElementById("services-grid");
  if (!grid) return;

  for (const service of SERVICES) {
    const card = document.createElement("article");
    card.className = "service-card";

    const tag = document.createElement("span");
    tag.className = "service-tag";
    tag.textContent = service.tag;

    const title = document.createElement("h3");
    title.textContent = service.title;

    const desc = document.createElement("p");
    desc.textContent = service.description;

    const list = document.createElement("ul");
    list.className = "service-list";
    for (const point of service.highlights) {
      const li = document.createElement("li");
      li.textContent = point;
      list.append(li);
    }

    card.append(tag, title, desc, list);
    grid.append(card);
  }
}

function renderProjects(onOpenProject) {
  const grid = document.getElementById("projects-grid");
  if (!grid) return;

  for (const project of PROJECTS) {
    const card = document.createElement("article");
    card.className = project.featured
      ? "project-card project-card-featured"
      : "project-card";

    const content = document.createElement("div");
    content.className = "project-card-content";

    const meta = document.createElement("div");
    meta.className = "project-meta";

    const cat = document.createElement("span");
    cat.className = "project-category";
    cat.textContent = project.category;
    meta.append(cat);

    if (project.featured) {
      const badge = document.createElement("span");
      badge.className = "project-featured-badge";
      badge.textContent = "Caso Principal";
      meta.append(badge);
    }

    const title = document.createElement("h3");
    title.textContent = project.title;

    const summary = document.createElement("p");
    summary.className = "project-summary";
    summary.textContent = project.summary;

    const tags = createTagList(project.stack);

    const actions = document.createElement("div");
    actions.className = "project-actions";

    const status = document.createElement("span");
    status.className = "project-status";
    status.textContent = project.status;

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "btn btn-secondary btn-sm";
    btn.textContent = "Ver arquitectura";
    btn.setAttribute("aria-label", `Ver arquitectura de ${project.title}`);
    btn.addEventListener("click", () => onOpenProject(project));

    actions.append(status, btn);
    content.append(meta, title, summary, tags, actions);
    card.append(content);

    if (project.featured) {
      const visual = document.createElement("div");
      visual.className = "project-visual";
      visual.innerHTML = getProjectVisualSvg(project.visual);
      card.append(visual);
    }

    grid.append(card);
  }
}

function renderStack() {
  const grid = document.getElementById("stack-grid");
  if (!grid) return;

  for (const group of STACK_GROUPS) {
    const card = document.createElement("div");
    card.className = "stack-card";

    const title = document.createElement("h3");
    title.textContent = group.title;

    card.append(title, createTagList(group.items));
    grid.append(card);
  }
}

/* -------------------------------------------------------------------------- */
/* 4. Native Modal Dialog with Top-Layer Exit & Light-Dismiss Fallbacks       */
/* -------------------------------------------------------------------------- */
function initProjectDialog() {
  const dialog = document.getElementById("project-dialog");
  const closeBtn = document.getElementById("dialog-close-btn");
  const contactLink = document.getElementById("dialog-contact-link");
  if (!dialog || !closeBtn) return () => {};

  const els = {
    category: document.getElementById("dialog-category"),
    title: document.getElementById("dialog-title"),
    summary: document.getElementById("dialog-summary"),
    problem: document.getElementById("dialog-problem"),
    architecture: document.getElementById("dialog-architecture"),
    impact: document.getElementById("dialog-impact"),
    stack: document.getElementById("dialog-stack"),
    status: document.getElementById("dialog-status"),
    githubLink: document.getElementById("dialog-github-link"),
  };

  let supportsDisplayTransition;
  function canTransitionDisplay() {
    if (supportsDisplayTransition !== undefined) return supportsDisplayTransition;
    if (!window.CSS?.supports?.("transition-behavior", "allow-discrete") || !document.body) {
      return false;
    }
    const probe = document.createElement("div");
    probe.style.cssText = "transition: display 1s allow-discrete !important; display: block;";
    document.body.appendChild(probe);
    getComputedStyle(probe).display;
    probe.style.display = "none";
    supportsDisplayTransition = getComputedStyle(probe).display === "block";
    probe.remove();
    return supportsDisplayTransition;
  }

  function supportsTopLayerExit() {
    return Boolean(window.CSS?.supports?.("overlay", "auto") && canTransitionDisplay());
  }

  async function closeTopLayer() {
    if (!dialog.open) return;
    if (!supportsTopLayerExit()) {
      dialog.setAttribute("data-closing", "");
      const animations = dialog.getAnimations({ subtree: true });
      if (animations.length > 0) {
        await Promise.race([
          Promise.allSettled(animations.map((a) => a.finished)),
          new Promise((resolve) => setTimeout(resolve, 600)),
        ]);
      }
      if (!dialog.hasAttribute("data-closing")) return;
      dialog.removeAttribute("data-closing");
    }
    dialog.close();
  }

  closeBtn.addEventListener("click", () => {
    closeTopLayer();
  });

  dialog.addEventListener("cancel", (event) => {
    event.preventDefault();
    closeTopLayer();
  });

  if (!("closedBy" in HTMLDialogElement.prototype)) {
    const isOutside = (event) => {
      const rect = dialog.getBoundingClientRect();
      return (
        event.clientX < rect.left ||
        event.clientX > rect.right ||
        event.clientY < rect.top ||
        event.clientY > rect.bottom
      );
    };
    let pressedOutside = false;
    dialog.addEventListener("pointerdown", (event) => {
      pressedOutside = isOutside(event);
    });
    dialog.addEventListener("pointerup", (event) => {
      if (pressedOutside && isOutside(event)) {
        closeTopLayer();
      }
    });
  }

  contactLink?.addEventListener("click", () => {
    const projectTitle = els.title?.textContent ?? "";
    const msgField = document.getElementById("contact-message");
    if (msgField && !msgField.value.trim() && projectTitle) {
      msgField.value = `Hola Augusto, vi tu proyecto "${projectTitle}" y me gustaría consultar por una solución similar para mi empresa.`;
    }
    closeTopLayer();
  });

  return function openProject(project) {
    dialog.removeAttribute("data-closing");
    els.category.textContent = project.category;
    els.title.textContent = project.title;
    els.summary.textContent = project.summary;
    els.problem.textContent = project.problem;
    els.impact.textContent = project.impact;
    els.status.textContent = project.status;

    els.architecture.replaceChildren();
    for (const step of project.architecture) {
      const li = document.createElement("li");
      li.textContent = step;
      els.architecture.append(li);
    }

    els.stack.replaceChildren();
    for (const tech of project.stack) {
      const li = document.createElement("li");
      li.textContent = tech;
      els.stack.append(li);
    }

    if (project.githubUrl) {
      els.githubLink.href = project.githubUrl;
      els.githubLink.hidden = false;
    } else {
      els.githubLink.removeAttribute("href");
      els.githubLink.hidden = true;
    }

    dialog.showModal();
  };
}

/* -------------------------------------------------------------------------- */
/* 5. Copy Email & Accessible Contact Form Validation                         */
/* -------------------------------------------------------------------------- */
function initCopyEmail() {
  const btn = document.getElementById("copy-email-btn");
  if (!btn) return;

  let resetTimer;
  btn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      btn.textContent = "¡Email copiado!";
    } catch {
      btn.textContent = PROFILE.email;
    }
    clearTimeout(resetTimer);
    resetTimer = setTimeout(() => {
      btn.textContent = "Copiar email";
    }, 2500);
  });
}

function initContactForm() {
  const form = document.getElementById("contact-form");
  const statusEl = document.getElementById("form-status");
  if (!form || !statusEl) return;

  // Polite live-region announcer for post-interaction validation
  const announcer = document.createElement("div");
  announcer.setAttribute("aria-live", "polite");
  announcer.classList.add("visually-hidden");
  document.body.append(announcer);

  let announceTimer;
  let announcedField;

  const linkError = (el, shown) => {
    const errorId = el.dataset.error;
    if (!errorId) return;
    const ids = (el.getAttribute("aria-describedby") || "")
      .split(/\s+/)
      .filter((id) => id && id !== errorId);
    if (shown) ids.push(errorId);
    if (ids.length) el.setAttribute("aria-describedby", ids.join(" "));
    else el.removeAttribute("aria-describedby");
  };

  const spokenText = (node) => {
    const copy = node.cloneNode(true);
    copy.querySelectorAll('[aria-hidden="true"]').forEach((n) => n.remove());
    copy.querySelectorAll('[role="img"][aria-label]').forEach((n) => {
      n.replaceWith(`${n.getAttribute("aria-label")}: `);
    });
    return copy.textContent.replace(/\s+/g, " ").trim();
  };

  const announceError = (el) => {
    const error = document.getElementById(el.dataset.error);
    if (!error) return;
    const label = el.labels?.[0] ? `${spokenText(el.labels[0])}: ` : "";
    clearTimeout(announceTimer);
    announcer.textContent = "";
    announcedField = el;
    announceTimer = setTimeout(() => {
      announcer.textContent = label + spokenText(error);
    }, 500);
  };

  const supportsUserInvalid = CSS.supports("selector(:user-invalid)");
  const dirtyState = new WeakMap();
  const flagged = new WeakSet();
  const announced = new WeakSet();

  const isFieldInvalid = (el) => {
    if (supportsUserInvalid) return el.matches(":user-invalid");
    return el.classList.contains("user-invalid-fallback");
  };

  const syncAria = (el, announce = false) => {
    if (!el.matches?.("input, select, textarea")) return;
    const invalid = isFieldInvalid(el);
    if (invalid) {
      if (announce && !announced.has(el)) {
        announceError(el);
        announced.add(el);
      }
      el.setAttribute("aria-invalid", "true");
      linkError(el, true);
      flagged.add(el);
    } else if (flagged.has(el) || el.getAttribute("aria-invalid") !== "true") {
      el.setAttribute("aria-invalid", "false");
      linkError(el, false);
      flagged.delete(el);
      announced.delete(el);
      if (announcedField === el) {
        clearTimeout(announceTimer);
        announcer.textContent = "";
      }
    }
  };

  const controls = form.querySelectorAll("input, select, textarea");
  controls.forEach((el) => syncAria(el));

  if (!supportsUserInvalid) {
    const updateFallback = (input) => {
      const valid = input.validity.valid;
      input.classList.toggle("user-invalid-fallback", !valid);
      input.classList.toggle("user-valid-fallback", valid);
      syncAria(input, !valid);
    };

    form.addEventListener("input", (event) => {
      const input = event.target;
      if (!input.checkValidity) return;
      const state = dirtyState.get(input) || { hasInteracted: false, hasBlurred: false };
      state.hasInteracted = true;
      dirtyState.set(input, state);
      if (state.hasBlurred) updateFallback(input);
    });

    form.addEventListener(
      "blur",
      (event) => {
        const input = event.target;
        if (!input.checkValidity) return;
        const state = dirtyState.get(input) || { hasInteracted: false, hasBlurred: false };
        state.hasBlurred = true;
        dirtyState.set(input, state);
        if (state.hasInteracted) updateFallback(input);
      },
      true
    );

    form.addEventListener(
      "invalid",
      (event) => {
        const input = event.target;
        dirtyState.set(input, { hasInteracted: true, hasBlurred: true });
        updateFallback(input);
      },
      true
    );
  } else {
    form.addEventListener("blur", (event) => syncAria(event.target, true), true);
    form.addEventListener("input", (event) => {
      if (event.target.hasAttribute("aria-invalid")) syncAria(event.target);
    });
    form.addEventListener("invalid", (event) => {
      announced.add(event.target);
      syncAria(event.target);
    }, true);
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    statusEl.textContent = "";

    if (!form.checkValidity()) {
      const firstInvalid = form.querySelector(":invalid");
      firstInvalid?.focus();
      return;
    }

    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const company = String(data.get("company") || "").trim();
    const message = String(data.get("message") || "").trim();

    const subject = encodeURIComponent(
      `Consulta de ${name}${company ? ` (${company})` : ""}`
    );
    const body = encodeURIComponent(
      `Nombre: ${name}\nEmail: ${email}\nEmpresa/Rubro: ${company || "No especificado"}\n\nMensaje:\n${message}`
    );

    window.location.href = `mailto:${PROFILE.email}?subject=${subject}&body=${body}`;
    statusEl.textContent = `Se abrió tu cliente de correo con el mensaje preparado para ${PROFILE.email}. Si no se abrió, podés copiar el email arriba.`;
  });
}

/* -------------------------------------------------------------------------- */
/* 6. Bootstrap                                                               */
/* -------------------------------------------------------------------------- */
function init() {
  const yearEl = document.getElementById("current-year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  initThemeToggle();
  initMobileMenu();
  renderServices();
  const openProject = initProjectDialog();
  renderProjects(openProject);
  renderStack();
  initCopyEmail();
  initContactForm();
}

init();
