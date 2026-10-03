/**
 * Al-Imam EduTech Virtual Expo - Controller Layer
 * ExpoController.js - Connects Model & View, handles bubble interactions, routing, form submissions, and keyboard navigation
 */

export class ExpoController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  /**
   * Initialize the Virtual Expo Application
   */
  init() {
    // 1. Render base structure
    this.view.renderMainLayout(
      this.model.getCompanyInfo(),
      this.model.getAllBooths()
    );

    // 2. Bind event listeners
    this.bindEvents();

    // 3. Handle initial route or default to Lobby
    this.handleInitialRoute();

    // 4. Set initial guide dialogue
    const welcomeDialogue = this.model.getDialogue("welcome");
    this.view.updateGuideDialogue(welcomeDialogue);
  }

  /**
   * Check URL hash for direct booth deep-linking (e.g. #school-apps)
   */
  handleInitialRoute() {
    const hash = window.location.hash.replace("#", "");
    if (hash && hash !== "lobby") {
      const targetBooth = this.model.getBoothById(hash);
      if (targetBooth) {
        this.navigateToBooth(targetBooth.id);
        return;
      }
    }
    this.navigateToLobby();
  }

  /**
   * Bind all user interactions and event delegation
   */
  bindEvents() {
    // Brand Logo -> Go to Lobby
    document.addEventListener("click", (e) => {
      // Header brand click
      if (e.target.closest("#btnBrandHome") || e.target.closest("#navBtnLobby")) {
        e.preventDefault();
        this.navigateToLobby();
        return;
      }

      // Nav Links to specific booths
      const navBoothBtn = e.target.closest(".header-nav [data-booth-id]");
      if (navBoothBtn) {
        e.preventDefault();
        const boothId = navBoothBtn.dataset.boothId;
        this.navigateToBooth(boothId);
        return;
      }

      // Floating Category Bubble Click in Lobby
      const bubbleCard = e.target.closest(".bubble-card");
      if (bubbleCard) {
        e.preventDefault();
        const boothId = bubbleCard.dataset.boothId;
        this.view.playSound("bubble");
        this.navigateToBooth(boothId);
        return;
      }

      // Back to Lobby buttons
      if (e.target.closest("#btnBackToLobby") || e.target.closest("#btnBottomBackLobby")) {
        e.preventDefault();
        this.navigateToLobby();
        return;
      }

      // "Mulai Tur Terpandu" button in Lobby
      if (e.target.closest("#btnExploreAllBooths")) {
        e.preventDefault();
        this.navigateToBooth("school-apps");
        return;
      }

      // "Request Quote" buttons anywhere (Header, Floating actions, Booth CTAs, Pricing tiers)
      const quoteBtn = e.target.closest(".btn-open-quote") || e.target.closest("#btnHeaderQuote") || e.target.closest("#btnDirectQuoteOpen");
      if (quoteBtn) {
        e.preventDefault();
        const boothId = quoteBtn.dataset.boothId || this.view.activeBoothId || null;
        const tierName = quoteBtn.dataset.tierName || null;
        this.openQuoteForm(boothId, tierName);
        return;
      }

      // Vision & Mission Modal
      if (e.target.closest("#btnVisionModal")) {
        e.preventDefault();
        this.view.openVisionModal(this.model.getCompanyInfo());
        const visionDialogue = this.model.getDialogue("visionMission");
        this.view.updateGuideDialogue(visionDialogue);
        return;
      }

      // GAS API Settings Modal
      if (e.target.closest("#btnConfigGAS")) {
        e.preventDefault();
        this.view.openGasConfigModal(this.model.getGasApiUrl());
        return;
      }

      // Sound Toggle Button
      if (e.target.closest("#btnSoundToggle")) {
        e.preventDefault();
        this.view.toggleSound();
        return;
      }

      // Download Catalog Summary
      const downloadBtn = e.target.closest("#btnDownloadCatalog");
      if (downloadBtn) {
        e.preventDefault();
        const boothId = downloadBtn.dataset.boothId || this.view.activeBoothId;
        const booth = this.model.getBoothById(boothId);
        if (booth) {
          this.view.downloadCatalogSummary(booth);
        }
        return;
      }

      // Share Booth URL
      if (e.target.closest("#btnShareBooth")) {
        e.preventDefault();
        if (navigator.clipboard) {
          navigator.clipboard.writeText(window.location.href);
          this.view.showToast("Link booth telah disalin ke clipboard! 📋", "success");
        }
        return;
      }

      // WhatsApp Direct Click
      if (e.target.closest("#btnGuideContactWA") || e.target.closest("#btnBoothWAContact")) {
        e.preventDefault();
        const company = this.model.getCompanyInfo();
        const activeBooth = this.view.activeBoothId ? this.model.getBoothById(this.view.activeBoothId) : null;
        const textMsg = activeBooth
          ? `Halo Al-Imam EduTech, saya tertarik dengan layanan *${activeBooth.name}* di Virtual Expo. Mohon info lebih lanjut.`
          : `Halo Al-Imam EduTech, saya ingin konsultasi mengenai solusi teknologi dan sistem virtual expo Anda.`;
        window.open(
          `https://api.whatsapp.com/send?phone=6281234567890&text=${encodeURIComponent(textMsg)}`,
          "_blank"
        );
        return;
      }

      // Guide Recommendation Quick Button
      if (e.target.closest("#btnGuideAskRecommendation")) {
        e.preventDefault();
        this.view.playSound("click");
        this.view.updateGuideDialogue({
          title: "Rekomendasi Cerdas Al-Imam EduTech 💡",
          message: "Untuk **Pesantren & Madrasah**, mulailah dengan **Smart School Apps** (SIAKAD & Tahfidz Tracker). Untuk **Perusahaan PT/CV**, pilih **Enterprise ERP & Payroll** guna mengotomasi keuangan dan stok multi-cabang Anda!",
          hint: "Klik tombol 'Request Quote' untuk analisis kebutuhan gratis oleh arsitek software kami."
        });
        return;
      }

      // Target Market Segment Card Click
      const segmentCard = e.target.closest(".segment-card");
      if (segmentCard) {
        e.preventDefault();
        const segmentId = segmentCard.dataset.segmentId;
        const targetBoothId = segmentCard.dataset.targetBooth;
        const segment = this.model.getSegments().find((s) => s.id === segmentId);
        
        if (segment) {
          this.view.playSound("click");
          this.view.updateGuideDialogue(segment.dialogue);
          
          // Remove previous highlights and highlight the recommended booth
          document.querySelectorAll(".bubble-card").forEach((b) => b.classList.remove("bubble-highlight-pulse"));
          const targetBubble = document.getElementById(`bubble-${targetBoothId}`);
          if (targetBubble) {
            targetBubble.classList.add("bubble-highlight-pulse");
            targetBubble.scrollIntoView({ behavior: "smooth", block: "center" });
          }
        }
        return;
      }

      // Sales Master Quick Inquiry Question Click
      const inquiryBtn = e.target.closest(".btn-quick-inquiry");
      if (inquiryBtn) {
        e.preventDefault();
        const qId = inquiryBtn.dataset.questionId;
        const qData = this.model.getQuickQuestions().find((q) => q.id === qId);
        if (qData) {
          this.view.playSound("click");
          this.view.updateGuideDialogue({
            title: `Jawaban Konsultasi: ${qData.q}`,
            message: qData.a,
            hint: "Ada pertanyaan lain? Klik tombol 'Request Quote' atau hubungi WhatsApp kami kapan saja!"
          });
        }
        return;
      }

      // Close Modal Buttons
      if (
        e.target.closest("#btnCloseModal") ||
        e.target.closest("#btnCancelModal") ||
        e.target.closest("#btnCloseVision") ||
        e.target.closest("#btnCloseSuccessModal") ||
        e.target.id === "modalBackdrop"
      ) {
        e.preventDefault();
        this.view.closeModal();
        return;
      }
    });

    // Form Submit: Quote Request Form
    document.addEventListener("submit", (e) => {
      if (e.target.id === "quoteRequestForm") {
        e.preventDefault();
        this.handleQuoteFormSubmit(e.target);
        return;
      }

      if (e.target.id === "gasConfigForm") {
        e.preventDefault();
        const input = document.getElementById("gasUrlInput");
        if (input && input.value) {
          this.model.setGasApiUrl(input.value.trim());
          this.view.showToast("URL Google Apps Script berhasil disimpan! 🚀", "success");
          this.view.closeModal();
        }
        return;
      }
    });

    // Keyboard Shortcuts (Arrow navigation & Escape)
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.view.closeModal();
        if (this.view.currentView === "booth") {
          this.navigateToLobby();
        }
      } else if (e.key === "ArrowRight" && this.view.currentView === "booth") {
        this.navigateAdjacentBooth(1);
      } else if (e.key === "ArrowLeft" && this.view.currentView === "booth") {
        this.navigateAdjacentBooth(-1);
      }
    });

    // Handle browser back/forward buttons
    window.addEventListener("popstate", () => {
      this.handleInitialRoute();
    });
  }

  /**
   * Navigate to Grand Lobby
   */
  navigateToLobby() {
    this.view.playSound("click");
    window.location.hash = "lobby";
    this.view.renderLobby(
      this.model.getAllBooths(),
      this.model.getCompanyInfo(),
      this.model.getSegments(),
      this.model.getQuickQuestions()
    );
    const dialogue = this.model.getDialogue("welcome");
    this.view.updateGuideDialogue(dialogue);
  }

  /**
   * Navigate to Virtual Booth
   */
  navigateToBooth(boothId) {
    const booth = this.model.getBoothById(boothId);
    if (!booth) return;

    window.location.hash = booth.id;
    this.view.renderBooth(booth);

    // Update Guide Dialogue specifically for this booth
    const boothDialogue = this.model.getDialogue("boothEntrance", booth.id);
    this.view.updateGuideDialogue(boothDialogue);
  }

  /**
   * Navigate between adjacent booths using Arrow keys
   */
  navigateAdjacentBooth(direction) {
    const booths = this.model.getAllBooths();
    const currentIndex = booths.findIndex((b) => b.id === this.view.activeBoothId);
    if (currentIndex === -1) return;

    let nextIndex = currentIndex + direction;
    if (nextIndex >= booths.length) nextIndex = 0;
    if (nextIndex < 0) nextIndex = booths.length - 1;

    this.navigateToBooth(booths[nextIndex].id);
  }

  /**
   * Open Quote Request Form Modal
   */
  openQuoteForm(boothId = null, tierName = null) {
    const booths = this.model.getAllBooths();
    this.view.openQuoteModal(booths, boothId, tierName);
    const quoteDialogue = this.model.getDialogue("quoteRequested");
    this.view.updateGuideDialogue(quoteDialogue);
  }

  /**
   * Handle Lead Submission to Google Apps Script
   */
  async handleQuoteFormSubmit(formElement) {
    const submitBtn = document.getElementById("btnSubmitQuote");
    const spinner = document.getElementById("submitSpinner");
    const btnText = document.getElementById("submitBtnText");

    // Gather Form Data
    const formData = new FormData(formElement);
    const orgType = formData.get("orgType")?.toString().trim() || "";
    const rawInstitution = formData.get("institution")?.toString().trim() || "";
    const institutionFormatted = orgType ? `[${orgType}] ${rawInstitution}` : rawInstitution;

    const leadData = {
      fullName: formData.get("fullName")?.toString().trim(),
      institution: institutionFormatted,
      email: formData.get("email")?.toString().trim(),
      phone: formData.get("phone")?.toString().trim(),
      product: formData.get("product")?.toString().trim(),
      plan: formData.get("plan")?.toString().trim(),
      budget: formData.get("budget")?.toString().trim(),
      timeline: formData.get("timeline")?.toString().trim(),
      message: formData.get("message")?.toString().trim()
    };

    // Client-side quick check
    if (!leadData.fullName || !leadData.institution || !leadData.phone) {
      this.view.showToast("Mohon lengkapi Nama, Lembaga, dan No. WhatsApp!", "warning");
      return;
    }

    // Set UI loading state
    if (submitBtn) submitBtn.disabled = true;
    if (spinner) spinner.classList.remove("spinner-hidden");
    if (btnText) btnText.textContent = "Mengirim ke Database Google Sheets...";

    try {
      const result = await this.model.submitLead(leadData);

      // Render Success View inside Modal
      this.view.renderQuoteSuccess(result, leadData);

      // Update guide speech
      const successDialogue = this.model.getDialogue("quoteSuccess");
      this.view.updateGuideDialogue(successDialogue);

      this.view.showToast(result.message || "Data berhasil dikirim!", "success");
    } catch (error) {
      console.error("Submission failed:", error);
      this.view.showToast("Terjadi kendala saat mengirim. Data tetap diarsipkan.", "warning");
      this.view.renderQuoteSuccess({ leadId: "BACKUP-SAVED" }, leadData);
    } finally {
      if (submitBtn) submitBtn.disabled = false;
      if (spinner) spinner.classList.add("spinner-hidden");
      if (btnText) btnText.textContent = "Kirim Permintaan Proposal 🚀";
    }
  }
}
