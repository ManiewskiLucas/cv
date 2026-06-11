document.addEventListener("DOMContentLoaded", () => {
  const menuToggleBtn = document.getElementById("menu-toggle");
  const menuCloseBtn  = document.getElementById("menu-close");
  const menuDrawer    = document.getElementById("menu-drawer");
  const backdrop      = document.getElementById("backdrop");
  const menuLinks     = menuDrawer.querySelectorAll(".drawer-link");

  // ── Ouvrir ──
  const openMenu = () => {
    menuDrawer.classList.remove("-translate-x-full");
    menuDrawer.removeAttribute("inert");
    menuDrawer.setAttribute("aria-hidden", "false");
    menuToggleBtn.setAttribute("aria-expanded", "true");
    backdrop.classList.remove("hidden");
    document.body.classList.add("overflow-hidden");
    if (menuLinks.length > 0) menuLinks[0].focus();
  };

  // ── Fermer ──
  const closeMenu = () => {
    menuDrawer.classList.add("-translate-x-full");
    menuDrawer.setAttribute("inert", "");
    menuDrawer.setAttribute("aria-hidden", "true");
    menuToggleBtn.setAttribute("aria-expanded", "false");
    backdrop.classList.add("hidden");
    document.body.classList.remove("overflow-hidden");
    menuToggleBtn.focus();
  };

  // ── Événements ──
  menuToggleBtn.addEventListener("click", openMenu);
  menuCloseBtn.addEventListener("click", closeMenu);
  backdrop.addEventListener("click", closeMenu);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !menuDrawer.classList.contains("-translate-x-full")) {
      closeMenu();
    }
  });

  menuLinks.forEach((link) => link.addEventListener("click", closeMenu));
});
