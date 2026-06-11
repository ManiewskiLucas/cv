document.addEventListener("DOMContentLoaded", () => {
  const btnBackToTop  = document.getElementById("btn-back-to-top");
  const modal         = document.getElementById("cvActionsModal");
  const openModalBtn  = document.getElementById("cv-actions-btn");
  const downloadBtn   = document.getElementById("downloadCV");
  const printBtn      = document.getElementById("printCV");
  const closeModalBtns = [
    document.getElementById("closeModalBtn"),
    document.getElementById("cancelModalBtn"),
  ];

  // ── Retour en haut ──
  window.addEventListener("scroll", () => {
    const show = window.scrollY > 200;
    btnBackToTop.classList.toggle("hidden", !show);
    btnBackToTop.classList.toggle("flex", show);
  }, { passive: true });

  btnBackToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // ── Modal ──
  openModalBtn.addEventListener("click", (e) => {
    e.preventDefault();
    showModal();
  });

  closeModalBtns.forEach((btn) => btn?.addEventListener("click", closeModal));

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) {
      closeModal();
    }
  });

  // Fermer modal en cliquant sur le fond
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  // ── Télécharger ──
  downloadBtn.addEventListener("click", () => {
    const link = document.createElement("a");
    link.href     = "assets/fichiers/CV MANIEWSKI.pdf";
    link.download = "CV MANIEWSKI.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    closeModal();
  });

  // ── Imprimer ──
  printBtn.addEventListener("click", () => {
    const pdfWindow = window.open("assets/fichiers/CV MANIEWSKI.pdf", "_blank");
    if (pdfWindow) {
      pdfWindow.addEventListener("load", () => {
        try { pdfWindow.print(); } catch (e) { console.error("Impression impossible :", e); }
      });
      // Fallback si l'événement load ne se déclenche pas
      setTimeout(() => {
        try { pdfWindow.print(); } catch (e) { /* silencieux */ }
      }, 1200);
    }
    closeModal();
  });

  // ── Fonctions ──
  function showModal() {
    modal.classList.remove("hidden");
    modal.classList.add("flex");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("overflow-hidden");
    // Focus le premier bouton d'action
    downloadBtn.focus();
  }

  function closeModal() {
    modal.classList.remove("flex");
    modal.classList.add("hidden");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("overflow-hidden");
    openModalBtn.focus();
  }
});
