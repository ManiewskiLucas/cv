document.addEventListener("DOMContentLoaded", () => {
  const btnBackToTop = document.getElementById("btn-back-to-top");
  const modal = document.getElementById("cvActionsModal");
  const openModalBtn = document.getElementById("cv-actions-btn");
  const closeModalBtns = [
    document.getElementById("closeModalBtn"),
    document.getElementById("cancelModalBtn")
  ];
  const downloadBtn = document.getElementById("downloadCV");
  const printBtn = document.getElementById("printCV");

  // === Retour en haut ===
  window.addEventListener(
    "scroll",
    () => {
      const show = window.scrollY > 20;
      btnBackToTop.classList.toggle("hidden", !show);
      btnBackToTop.classList.toggle("flex", show);
    },
    { passive: true }
  );

  btnBackToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // === Modal (ouvrir) ===
  openModalBtn.addEventListener("click", (e) => {
    e.preventDefault();
    showModal();
  });

  // === Modal (fermer) ===
  closeModalBtns.forEach((btn) =>
    btn.addEventListener("click", closeModal)
  );

  // Fermer modal avec Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) {
      closeModal();
    }
  });

  // === Télécharger PDF ===
  downloadBtn.addEventListener("click", () => {
    const link = document.createElement("a");
    link.href = "assets/fichiers/CV MANIEWSKI.pdf";
    link.download = "CV MANIEWSKI.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    closeModal();
  });

  // === Imprimer PDF ===
  printBtn.addEventListener("click", () => {
    const pdfWindow = window.open("assets/fichiers/CV MANIEWSKI.pdf", "_blank");
    if (pdfWindow) {
      pdfWindow.onload = () => pdfWindow.print();
      setTimeout(() => {
        try {
          pdfWindow.print();
        } catch (e) {
          console.error("Erreur lors de l'impression :", e);
        }
      }, 1000);
    }
    closeModal();
  });

  // === Accessibilité : focus visuel ===
  document.querySelectorAll("a, button").forEach((el) => {
    el.addEventListener("focus", () => {
      el.style.outline = "2px solid #2563eb"; // bleu Tailwind
    });
    el.addEventListener("blur", () => {
      el.style.outline = "none";
    });
  });

  // === Accessibilité : aria-label auto pour icônes liens ===
  document.querySelectorAll("a i").forEach((icon) => {
    const parent = icon.closest("a");
    if (parent && !parent.hasAttribute("aria-label")) {
      parent.setAttribute("aria-label", parent.textContent.trim());
    }
  });

  // === Fonctions ===
  function showModal() {
    modal.classList.remove("hidden");
    modal.classList.add("flex");
    modal.setAttribute("aria-hidden", "false");
    modal.focus();
    document.body.classList.add("overflow-hidden");
  }

  function closeModal() {
    modal.classList.remove("flex");
    modal.classList.add("hidden");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("overflow-hidden");
  }
});
