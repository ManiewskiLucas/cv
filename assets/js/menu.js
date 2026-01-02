document.addEventListener("DOMContentLoaded", () => {
  const menuToggleBtn = document.getElementById("menu-toggle");
  const menuCloseBtn = document.getElementById("menu-close");
  const menuDrawer = document.getElementById("menu-drawer");
  const backdrop = document.getElementById("backdrop");
  const menuLinks = menuDrawer.querySelectorAll("a");

  const classHidden = "-translate-x-full";
  const backdropHidden = "hidden";

  // === Ouvrir le menu ===
  const openMenu = () => {
    menuDrawer.classList.remove(classHidden);
    menuDrawer.setAttribute("aria-hidden", "false");
    menuToggleBtn.setAttribute("aria-expanded", "true");
    backdrop.classList.remove(backdropHidden);
    document.body.classList.add("overflow-hidden");

    // Focus premier lien
    if (menuLinks.length > 0) menuLinks[0].focus();
  };

  // === Fermer le menu ===
  const closeMenu = () => {
    menuDrawer.classList.add(classHidden);
    menuDrawer.setAttribute("aria-hidden", "true");
    menuToggleBtn.setAttribute("aria-expanded", "false");
    backdrop.classList.add(backdropHidden);
    document.body.classList.remove("overflow-hidden");

    // Focus retour sur le bouton
    menuToggleBtn.focus();
  };

  // === Gestion événements ===
  menuToggleBtn.addEventListener("click", openMenu);
  menuCloseBtn.addEventListener("click", closeMenu);
  backdrop.addEventListener("click", closeMenu);

  // Fermeture avec Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !menuDrawer.classList.contains(classHidden)) {
      closeMenu();
    }
  });

  // Fermer quand un lien est cliqué
  menuLinks.forEach((link) => link.addEventListener("click", closeMenu));
});
