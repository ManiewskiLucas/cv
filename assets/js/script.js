// Gestion du modal pour télécharger/imprimer le CV
const cvActionsLink = document.getElementById("cv-actions-link");
const downloadCVBtn = document.getElementById("downloadCV");
const printCVBtn = document.getElementById("printCV");
const cvModal = new bootstrap.Modal(document.getElementById("cvActionsModal"));

if (cvActionsLink) {
  cvActionsLink.addEventListener("click", function (e) {
    e.preventDefault();
    cvModal.show();
  });
}

if (downloadCVBtn) {
  downloadCVBtn.addEventListener("click", function () {
    // Créer un lien temporaire pour le téléchargement
    const link = document.createElement("a");
    link.href = "CV MANIEWSKI.pdf";
    link.download = "CV MANIEWSKI.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    cvModal.hide();
  });
}

if (printCVBtn) {
  printCVBtn.addEventListener("click", function () {
    // Ouvrir le PDF dans un nouvel onglet et tenter de déclencher l'impression
    const pdfWindow = window.open("CV MANIEWSKI.pdf", "_blank");

    // Tenter de déclencher l'impression après un court délai
    // Note: Ceci peut être bloqué par les navigateurs pour des raisons de sécurité
    if (pdfWindow) {
      pdfWindow.addEventListener("load", function () {
        pdfWindow.print();
      });

      // Fallback si l'événement load ne se déclenche pas correctement pour le PDF
      setTimeout(function () {
        try {
          pdfWindow.print();
        } catch (e) {
          console.log("Impossible de déclencher l'impression automatiquement");
        }
      }, 1000);
    }

    cvModal.hide();
  });
}
