/* ============================================================
   ABHISHEK S — Premium Developer Portfolio
   Loader · Theme · Nav · Progress · Typing · Particles
   Reveal · Counters · Skill bars · Filter · Form · Back-to-top
   ============================================================ */

(() => {
  "use strict";

  /* ─── Loader ───────────────────────────────────────── */
  window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    if (!loader) return;
    setTimeout(() => loader.classList.add("hidden"), 900);
  });

  /* ─── Year in footer ───────────────────────────────── */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ─── Theme Toggle ─────────────────────────────────── */
  const themeToggle = document.getElementById("themeToggle");
  const savedTheme = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", savedTheme);
  updateThemeIcon(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme");
      const next = current === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem("theme", next);
      updateThemeIcon(next);
    });
  }

  function updateThemeIcon(theme) {
    if (!themeToggle) return;
    themeToggle.innerHTML =
      theme === "dark"
        ? '<i class="fas fa-sun" aria-hidden="true"></i>'
        : '<i class="fas fa-moon" aria-hidden="true"></i>';
  }

  /* ─── Navbar · Progress · Back to top ──────────────── */
  const navbar = document.getElementById("navbar");
  const progressBar = document.getElementById("progressBar");
  const backToTop = document.getElementById("backToTop");

  function onScroll() {
    const y = window.scrollY;
    const height =
      document.documentElement.scrollHeight - window.innerHeight;

    if (navbar) navbar.classList.toggle("scrolled", y > 40);
    if (progressBar) {
      progressBar.style.width = (height > 0 ? (y / height) * 100 : 0) + "%";
    }
    if (backToTop) backToTop.classList.toggle("visible", y > 480);
    highlightActiveLink();
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (backToTop) {
    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  function highlightActiveLink() {
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-links a");
    let currentId = "";
    sections.forEach((sec) => {
      if (window.scrollY >= sec.offsetTop - 130) {
        currentId = sec.getAttribute("id");
      }
    });
    navLinks.forEach((link) => {
      link.classList.toggle(
        "active",
        link.getAttribute("href") === "#" + currentId
      );
    });
  }

  /* ─── Mobile Navigation ────────────────────────────── */
  const hamburger = document.getElementById("hamburger");
  const mobileNav = document.getElementById("mobileNav");
  const mobileOverlay = document.getElementById("mobileOverlay");

  function toggleMobile(open) {
    if (!hamburger || !mobileNav || !mobileOverlay) return;
    hamburger.classList.toggle("open", open);
    hamburger.setAttribute("aria-expanded", open ? "true" : "false");
    mobileNav.classList.toggle("open", open);
    mobileOverlay.classList.toggle("open", open);
    mobileOverlay.hidden = !open;
    document.body.style.overflow = open ? "hidden" : "";
  }

  if (hamburger) {
    hamburger.addEventListener("click", () => {
      toggleMobile(!mobileNav.classList.contains("open"));
    });
  }
  if (mobileOverlay) {
    mobileOverlay.addEventListener("click", () => toggleMobile(false));
  }
  document.querySelectorAll(".mobile-nav a").forEach((a) => {
    a.addEventListener("click", () => toggleMobile(false));
  });

  /* ─── Typing Animation ─────────────────────────────── */
  const roles = [
    "MCA Student",
    "Software Developer",
    "AI & ML Enthusiast",
    "Deep Learning Explorer",
    "Full Stack Developer",
    "IoT Builder",
  ];
  const typedEl = document.getElementById("typed");
  let roleIndex = 0;
  let charIndex = 0;
  let deleting = false;
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  function typeText() {
    if (!typedEl) return;
    if (reduceMotion) {
      typedEl.textContent = roles[0];
      return;
    }
    const current = roles[roleIndex];
    if (!deleting) {
      typedEl.textContent = current.substring(0, charIndex++);
      if (charIndex === current.length + 1) {
        deleting = true;
        setTimeout(typeText, 1700);
        return;
      }
      setTimeout(typeText, 85);
    } else {
      typedEl.textContent = current.substring(0, charIndex--);
      if (charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(typeText, 350);
        return;
      }
      setTimeout(typeText, 40);
    }
  }
  setTimeout(typeText, 1100);

  /* ─── Lightweight Particles (Hero canvas) ──────────── */
  const canvas = document.getElementById("particles");
  if (canvas && !reduceMotion) {
    const ctx = canvas.getContext("2d");
    let particles = [];
    let raf = null;
    let w = 0;
    let h = 0;

    function resize() {
      const parent = canvas.parentElement;
      w = parent.clientWidth;
      h = parent.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(48, Math.floor((w * h) / 22000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 2 + 0.6,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
      }));
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);
      const theme = document.documentElement.getAttribute("data-theme");
      const color =
        theme === "dark" ? "56, 189, 248" : "37, 99, 235";

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, 0.45)`;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(${color}, ${0.18 * (1 - dist / 110)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      });
      raf = requestAnimationFrame(draw);
    }

    resize();
    draw();
    window.addEventListener("resize", () => {
      cancelAnimationFrame(raf);
      resize();
      draw();
    });
  }

  /* ─── Scroll Reveal · Bars · Counters ──────────────── */
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        el.classList.add("visible");

        el.querySelectorAll(".bar-fill").forEach((bar) => {
          const width = bar.getAttribute("data-width");
          setTimeout(() => {
            bar.style.width = width + "%";
          }, 120);
        });

        el.querySelectorAll("[data-count]").forEach((counter) =>
          countUp(counter)
        );
        observer.unobserve(el);
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

  // Hero counters (visible on load)
  document.querySelectorAll(".hero-card [data-count]").forEach((el) => {
    const wrap = el.closest(".hero-card");
    if (!wrap) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target
              .querySelectorAll("[data-count]")
              .forEach((c) => countUp(c));
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );
    io.observe(wrap);
  });

  function countUp(el) {
    if (el.dataset.counted === "1") return;
    el.dataset.counted = "1";
    const target = parseInt(el.getAttribute("data-count"), 10) || 0;
    const duration = 1400;
    const start = performance.now();

    function update(now) {
      const progress = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      el.textContent = String(Math.floor(ease * target));
      if (progress < 1) requestAnimationFrame(update);
      else el.textContent = String(target);
    }
    requestAnimationFrame(update);
  }

  /* ─── Project Filtering ────────────────────────────── */
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => {
        b.classList.remove("active");
        b.setAttribute("aria-selected", "false");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-selected", "true");
      const filter = btn.getAttribute("data-filter");

      projectCards.forEach((card) => {
        const tags = (card.getAttribute("data-tags") || "").split(/\s+/);
        const show = filter === "all" || tags.includes(filter);
        card.classList.toggle("hidden", !show);
        if (show) card.classList.add("visible");
      });
    });
  });

  /* ─── Contact Form ─────────────────────────────────── */
  const contactForm = document.getElementById("contactForm");
  const formSuccess = document.getElementById("formSuccess");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();

      if (!name || !email || !message) {
        alert("Please fill in all required fields.");
        return;
      }

      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      if (!emailOk) {
        alert("Please enter a valid email address.");
        return;
      }

      // Optional: wire to Formspree / EmailJS for production delivery
      // fetch('https://formspree.io/f/YOUR_FORM_ID', { method:'POST', body: new FormData(contactForm) })

      const subject = document.getElementById("subject").value.trim();
      const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\n\n${message}`
      );
      const sub = encodeURIComponent(subject || `Portfolio message from ${name}`);
      window.location.href = `mailto:abhis312k5@gmail.com?subject=${sub}&body=${body}`;

      if (formSuccess) {
        formSuccess.hidden = false;
        formSuccess.textContent =
          "Thanks, " + name + "! Your email client should open shortly.";
      }
      contactForm.reset();
      setTimeout(() => {
        if (formSuccess) formSuccess.hidden = true;
      }, 5000);
    });
  }

  /* ─── Lazy images fallback ─────────────────────────── */
  if (!("loading" in HTMLImageElement.prototype)) {
    document.querySelectorAll("img[data-src]").forEach((img) => {
      img.src = img.getAttribute("data-src");
    });
  }
})();
