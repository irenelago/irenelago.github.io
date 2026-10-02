(() => {
  const root = document.documentElement;
  const toggle = document.getElementById("theme-toggle");
  const year = document.getElementById("year");
  const themeKey = "irene-theme";

  if (year) {
    year.textContent = String(new Date().getFullYear());
  }

  root.setAttribute("data-style", "bright");

  const getPreferredTheme = () => {
    const saved = localStorage.getItem(themeKey);
    if (saved === "light" || saved === "dark") return saved;
    return "light";
  };

  const applyTheme = (theme) => {
    root.setAttribute("data-theme", theme);
    if (toggle) {
      const next = theme === "dark" ? "light" : "dark";
      toggle.setAttribute("aria-label", `Switch to ${next} theme`);
    }
  };

  applyTheme(getPreferredTheme());

  toggle?.addEventListener("click", () => {
    const current = root.getAttribute("data-theme") === "dark" ? "dark" : "light";
    const next = current === "dark" ? "light" : "dark";
    localStorage.setItem(themeKey, next);
    applyTheme(next);
  });

  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const typeText = async (el, text, cursor, msPerChar = 55) => {
    if (!el) return;
    if (cursor) cursor.classList.add("is-active");
    el.textContent = "";
    for (const char of text) {
      el.textContent += char;
      await wait(msPerChar);
    }
    if (cursor) cursor.classList.remove("is-active");
  };

  const runHeroTyping = async () => {
    const hiEl = document.getElementById("hero-hi-text");
    const nameEl = document.getElementById("hero-name-text");
    const face = document.querySelector(".hero__face");
    const hiBlock = document.querySelector(".hero__hi");
    const nameBlock = document.querySelector(".hero__name");
    const cursor = document.querySelector(".hero__cursor");
    const hiText = "Hi, I’m";
    const nameText = "Irene Lago";
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!hiEl || !nameEl) return;

    if (reduceMotion) {
      hiEl.textContent = hiText;
      nameEl.textContent = nameText;
      nameBlock?.classList.add("is-underlined");
      face?.classList.add("is-visible");
      return;
    }

    await wait(280);
    if (cursor && hiBlock) hiBlock.appendChild(cursor);
    await typeText(hiEl, hiText, cursor, 58);
    await wait(220);
    if (cursor && nameBlock) {
      nameBlock.insertBefore(cursor, face);
    }
    await typeText(nameEl, nameText, cursor, 62);
    nameBlock?.classList.add("is-underlined");
    await wait(160);
    face?.classList.add("is-visible");
  };

  runHeroTyping();

  const revealEls = document.querySelectorAll(".reveal");
  if (!revealEls.length) return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    revealEls.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
  );

  revealEls.forEach((el) => observer.observe(el));
})();
