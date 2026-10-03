/**
 * Al-Imam EduTech Virtual Expo - View Layer
 * ExpoView.js - Handles DOM rendering, 3D/Parallax effects, dynamic avatars, booth stages, modals & audio fx
 */

export class ExpoView {
  constructor() {
    this.appContainer = document.getElementById("app");
    this.soundEnabled = true;
    this.audioCtx = null;
    this.typewriterInterval = null;
    this.currentView = "lobby"; // 'lobby' | 'booth'
    this.activeBoothId = null;

    // Cache core DOM references
    this.initAudio();
  }

  /**
   * Initialize lightweight Web Audio API synthesizer for futuristic sound effects
   */
  initAudio() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.audioCtx = new AudioContext();
      }
    } catch (e) {
      console.warn("Web Audio API not supported in this browser:", e);
    }
  }

  playSound(type = "click") {
    if (!this.soundEnabled || !this.audioCtx) return;
    try {
      if (this.audioCtx.state === "suspended") {
        this.audioCtx.resume();
      }
      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      if (type === "click") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(400, now + 0.06);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
        osc.start(now);
        osc.stop(now + 0.06);
      } else if (type === "warp") {
        osc.type = "triangle";
        osc.frequency.setValueAtTime(200, now);
        osc.frequency.exponentialRampToValueAtTime(900, now + 0.35);
        gain.gain.setValueAtTime(0.18, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        osc.start(now);
        osc.stop(now + 0.35);
      } else if (type === "success") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(523.25, now); // C5
        osc.frequency.setValueAtTime(659.25, now + 0.1); // E5
        osc.frequency.setValueAtTime(783.99, now + 0.2); // G5
        osc.frequency.setValueAtTime(1046.5, now + 0.3); // C6
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);
        osc.start(now);
        osc.stop(now + 0.55);
      } else if (type === "bubble") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(450, now);
        osc.frequency.exponentialRampToValueAtTime(750, now + 0.12);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
        osc.start(now);
        osc.stop(now + 0.12);
      }
    } catch (err) {
      // Ignore audio autoplay restrictions
    }
  }

  /**
   * Render Main Frame (Header, Parallax World Canvas, Guide HUD, Modals)
   */
  renderMainLayout(companyInfo, booths) {
    this.appContainer.innerHTML = `
      <!-- Ambient Background Visual Layers for 3D Illusion -->
      <div class="expo-viewport" id="expoViewport">
        <!-- Far Background: Cyber Grid & Futuristic Expo Hall Arch -->
        <div class="parallax-layer layer-back" id="layerBack">
          <div class="cyber-grid-floor"></div>
          <div class="ambient-spotlight spot-1"></div>
          <div class="ambient-spotlight spot-2"></div>
          <div class="hall-ceiling-truss"></div>
        </div>

        <!-- Midground: Floating Expo Banners & Digital Stage -->
        <div class="parallax-layer layer-mid" id="layerMid">
          <div class="floating-hologram-banner">
            <div class="banner-glow-text">✨ AL-IMAM EDUTECH GRAND VIRTUAL EXPO 2026 ✨</div>
            <div class="banner-subtext">Pioneering Islamic & Modern Education Technology</div>
          </div>
        </div>

        <!-- Foreground: Main Dynamic Content Area (Lobby or Booths) -->
        <div class="parallax-layer layer-fore" id="layerFore">
          <main id="expoStage" class="expo-stage stage-lobby"></main>
        </div>
      </div>

      <!-- Top Navigation Header -->
      <header class="expo-header">
        <div class="header-left">
          <div class="brand-logo-badge" id="btnBrandHome">
            <div class="brand-icon">⚡</div>
            <div class="brand-text-group">
              <span class="brand-title">Al-Imam <span class="text-cyan">EduTech</span></span>
              <span class="brand-sub">Virtual Open House & Expo</span>
            </div>
          </div>
        </div>

        <nav class="header-nav">
          <button class="nav-link-btn active" id="navBtnLobby" data-target="lobby">
            <span class="nav-icon">🏛️</span> Lobby Utama
          </button>
          ${booths
            .map(
              (b) => `
            <button class="nav-link-btn" data-booth-id="${b.id}">
              <span class="nav-icon">${b.icon}</span> ${b.shortName}
            </button>
          `
            )
            .join("")}
        </nav>

        <div class="header-right">
          <button class="header-btn" id="btnSoundToggle" title="Toggle Sound Effects">
            <span id="soundIcon">🔊</span>
          </button>
          <button class="header-btn" id="btnVisionModal" title="Vision & Mission">
            <span>ℹ️ Visi & Misi</span>
          </button>
          <button class="header-btn btn-gas-config" id="btnConfigGAS" title="Set Google Sheets API">
            <span>⚙️ GAS API</span>
          </button>
          <button class="btn-cta-glow" id="btnHeaderQuote">
            <span>📋 Request Quote</span>
          </button>
        </div>
      </header>

      <!-- Fixed Pinned Guide HUD (Sales Master Software Developer) -->
      <aside class="guide-hud-container" id="guideHud">
        <div class="guide-avatar-box">
          <div class="avatar-ring-pulse"></div>
          <div class="avatar-portrait">
            <!-- 2.5D Animated Avatar SVG with Glowing Visor & Developer Headphones -->
            <svg viewBox="0 0 100 100" class="avatar-svg" id="avatarSvg">
              <defs>
                <linearGradient id="avatarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#00F0FF"/>
                  <stop offset="100%" stop-color="#7928CA"/>
                </linearGradient>
                <linearGradient id="suitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#0F172A"/>
                  <stop offset="100%" stop-color="#1E293B"/>
                </linearGradient>
              </defs>
              <!-- Body / Tech Blazer -->
              <path d="M 20 95 Q 50 82 80 95 L 85 100 L 15 100 Z" fill="url(#suitGrad)" stroke="#00F0FF" stroke-width="1.5" />
              <!-- Tech Tie / Neon Core -->
              <polygon points="50,85 45,98 55,98" fill="#00F0FF" opacity="0.9" />
              <!-- Neck -->
              <rect x="42" y="66" width="16" height="15" rx="3" fill="#F8D7BE" />
              <!-- Head / Face -->
              <ellipse cx="50" cy="48" rx="24" ry="26" fill="#FADBC8" />
              <!-- Hair (Modern Tech Pompadour) -->
              <path d="M 25 42 Q 22 20 48 18 Q 78 20 75 42 Q 65 26 50 26 Q 35 26 25 42 Z" fill="#1E1E2E" />
              <!-- AR Glasses / Holographic Visor -->
              <rect x="30" y="42" width="40" height="13" rx="4" fill="#00F0FF" opacity="0.88" class="visor-glow" />
              <line x1="33" y1="48" x2="67" y2="48" stroke="#FFFFFF" stroke-width="1.5" stroke-dasharray="3,2" />
              <!-- Friendly Smile -->
              <path d="M 42 62 Q 50 67 58 62" stroke="#B45309" stroke-width="2" fill="none" stroke-linecap="round" />
              <!-- Pro Dev Headset -->
              <path d="M 24 45 Q 24 16 50 16 Q 76 16 76 45" fill="none" stroke="#64748B" stroke-width="3" />
              <rect x="22" y="40" width="6" height="14" rx="3" fill="#00F0FF" />
              <rect x="72" y="40" width="6" height="14" rx="3" fill="#00F0FF" />
              <!-- Headset Mic -->
              <path d="M 25 50 Q 34 64 42 64" fill="none" stroke="#00F0FF" stroke-width="2" />
              <circle cx="43" cy="64" r="3" fill="#00F0FF" />
            </svg>
            <div class="avatar-status-badge" title="Live & Ready to Assist">
              <span class="status-dot"></span> Online
            </div>
          </div>
          <div class="guide-meta">
            <h4 class="guide-name">Sales Master</h4>
            <span class="guide-role">Senior Software Architect</span>
          </div>
        </div>

        <div class="guide-dialogue-card">
          <div class="dialogue-header">
            <span class="dialogue-tag" id="guideSpeechTag">🎙️ Guide Voice</span>
            <span class="dialogue-typing-indicator" id="typingIndicator"></span>
          </div>
          <h5 class="dialogue-title" id="guideSpeechTitle">Memuat panduan...</h5>
          <div class="dialogue-body" id="guideSpeechBody"></div>
          <div class="dialogue-hint" id="guideSpeechHint"></div>
          
          <div class="guide-actions-bar">
            <button class="guide-quick-btn" id="btnGuideAskRecommendation">💡 Rekomendasi Solusi</button>
            <button class="guide-quick-btn" id="btnGuideContactWA">💬 WhatsApp Sales</button>
          </div>
        </div>
      </aside>

      <!-- Modal Container Placeholder -->
      <div class="modal-backdrop" id="modalBackdrop">
        <div class="modal-dialog glass-panel" id="modalDialog"></div>
      </div>

      <!-- Toast Notification Container -->
      <div class="toast-container" id="toastContainer"></div>
    `;

    this.bindParallaxListeners();
  }

  /**
   * Attach dynamic 2.5D/3D Parallax tilt effect on mousemove / device orientation
   */
  bindParallaxListeners() {
    const viewport = document.getElementById("expoViewport");
    const layerBack = document.getElementById("layerBack");
    const layerMid = document.getElementById("layerMid");
    const layerFore = document.getElementById("layerFore");

    if (!viewport) return;

    let targetX = 0,
      targetY = 0;
    let currentX = 0,
      currentY = 0;

    window.addEventListener("mousemove", (e) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      targetX = (e.clientX - centerX) / centerX;
      targetY = (e.clientY - centerY) / centerY;
    });

    const animateParallax = () => {
      currentX += (targetX - currentX) * 0.06;
      currentY += (targetY - currentY) * 0.06;

      if (layerBack) {
        layerBack.style.transform = `perspective(1000px) rotateY(${currentX * 3}deg) rotateX(${-currentY * 3}deg) translateZ(-80px)`;
      }
      if (layerMid) {
        layerMid.style.transform = `perspective(1000px) rotateY(${currentX * 5}deg) rotateX(${-currentY * 5}deg) translateZ(0px)`;
      }
      if (layerFore && this.currentView === "lobby") {
        layerFore.style.transform = `perspective(1000px) rotateY(${currentX * 1.5}deg) rotateX(${-currentY * 1.5}deg) translateZ(20px)`;
      } else if (layerFore) {
        layerFore.style.transform = "none";
      }

      requestAnimationFrame(animateParallax);
    };
    requestAnimationFrame(animateParallax);
  }

  /**
   * Render Grand Lobby View (Entrance + Floating Category Bubbles + Segments + Quick Inquiries)
   */
  renderLobby(booths, companyInfo, segments = [], quickQuestions = []) {
    this.currentView = "lobby";
    this.activeBoothId = null;
    const stage = document.getElementById("expoStage");
    if (!stage) return;

    stage.className = "expo-stage stage-lobby animate-fade-in";
    stage.innerHTML = `
      <div class="lobby-hero-container">
        <!-- Grand Archway Stage Header -->
        <div class="lobby-welcome-banner">
          <div class="tech-pill">🌐 JAKARTA CONVENTION CENTER (JCC SENAYAN MODE)</div>
          <h1 class="lobby-main-heading">
            Ekosistem Teknologi Pendidikan & Sistem Enterprise <span class="gradient-text">Al-Imam EduTech</span>
          </h1>
          <p class="lobby-hero-desc">
            Selamat datang di Virtual Open House & Expo 2026! Jelajahi inovasi software terpadu kelas dunia untuk <strong>Yayasan, Sekolah, Pesantren, Universitas, PT, CV, Firma, Perusahaan Daerah (PD), dan UMKM</strong>. Pilih kategori produk atau konsultasikan langsung dengan <strong>Sales Master Software Developer</strong>.
          </p>

          <div class="lobby-stats-strip">
            ${companyInfo.stats
              .map(
                (s) => `
              <div class="stat-pill">
                <span class="stat-val">${s.value}</span>
                <span class="stat-lbl">${s.label}</span>
              </div>
            `
              )
              .join("")}
          </div>
        </div>

        <!-- Target Market Segment Navigator -->
        ${
          segments.length > 0
            ? `
          <div class="lobby-segments-section">
            <div class="section-badge-center">🏛️ PANDUAN SESUAI TIPE LEMBAGA & BADAN USAHA</div>
            <h3 class="segments-headline">Pilih Tipe Organisasi Anda untuk Rekomendasi Solusi Khusus:</h3>
            <div class="segments-grid">
              ${segments
                .map(
                  (seg) => `
                <div class="segment-card" data-segment-id="${seg.id}" data-target-booth="${seg.recommendedBoothId}">
                  <div class="segment-icon-box">${seg.icon}</div>
                  <div class="segment-info">
                    <div class="segment-header-row">
                      <h4 class="segment-title">${seg.title}</h4>
                      <span class="segment-badge">${seg.badge}</span>
                    </div>
                    <p class="segment-desc">${seg.desc}</p>
                  </div>
                  <div class="segment-action-hint">Rekomendasi Guide ➔</div>
                </div>
              `
                )
                .join("")}
            </div>
          </div>
        `
            : ""
        }

        <!-- Sales Master Quick Questions Bar -->
        ${
          quickQuestions.length > 0
            ? `
          <div class="lobby-inquiry-bar">
            <div class="inquiry-header-row">
              <span class="avatar-mini-icon">👨‍💻</span>
              <span class="inquiry-title">Tanya Cepat ke <strong>Sales Master Software Developer</strong>:</span>
            </div>
            <div class="inquiry-buttons-track">
              ${quickQuestions
                .map(
                  (q) => `
                <button class="btn-quick-inquiry" data-question-id="${q.id}">
                  ${q.q}
                </button>
              `
                )
                .join("")}
            </div>
          </div>
        `
            : ""
        }

        <!-- Section Title for Booths -->
        <div class="booth-section-divider">
          <div class="divider-line"></div>
          <span class="divider-text">🚀 4 BOOTH VIRTUAL PAMERAN UTAMA</span>
          <div class="divider-line"></div>
        </div>

        <!-- Floating Interactive 3D Category Bubbles -->
        <div class="floating-bubbles-grid" id="bubblesGrid">
          ${booths
            .map(
              (booth, index) => `
            <div class="bubble-card float-anim-${index + 1} ${booth.glowClass}" data-booth-id="${booth.id}" id="bubble-${booth.id}">
              <div class="bubble-inner-content">
                <div class="bubble-badge">${booth.badge}</div>
                <div class="bubble-icon-sphere">${booth.icon}</div>
                <h3 class="bubble-title">${booth.name}</h3>
                <p class="bubble-tagline">${booth.tagline}</p>
                <div class="bubble-tech-tags">
                  ${booth.techStack.slice(0, 3).map((t) => `<span class="tech-chip">${t}</span>`).join("")}
                </div>
                <div class="bubble-cta-prompt">
                  <span>Masuki Booth Virtual</span>
                  <span class="arrow-icon">➔</span>
                </div>
              </div>
              <div class="bubble-glow-ring"></div>
            </div>
          `
            )
            .join("")}
        </div>

        <!-- Quick Help & Vision Floating Cards -->
        <div class="lobby-footer-actions">
          <button class="footer-action-card" id="btnExploreAllBooths">
            <span class="action-icon">🚀</span>
            <div class="action-text">
              <strong>Mulai Tur Terpandu</strong>
              <span>Jelajahi seluruh booth bersama Guide</span>
            </div>
          </button>
          <button class="footer-action-card" id="btnDirectQuoteOpen">
            <span class="action-icon">💼</span>
            <div class="action-text">
              <strong>Konsultasi & Penawaran Cepat</strong>
              <span>Dapatkan proposal resmi dalam 1x24 jam</span>
            </div>
          </button>
        </div>
      </div>
    `;

    this.updateActiveNav("lobby");
  }

  /**
   * Render 3D Virtual Booth Stage with interactive mockups, features, advantages & pricing
   */
  renderBooth(booth) {
    this.currentView = "booth";
    this.activeBoothId = booth.id;
    const stage = document.getElementById("expoStage");
    if (!stage) return;

    // Trigger Hall Warp Zoom Sound & Visual Animation
    this.playSound("warp");
    stage.className = "expo-stage stage-booth animate-booth-warp";

    stage.innerHTML = `
      <div class="booth-container ${booth.glowClass}">
        <!-- Top Booth Navigation & Breadcrumb -->
        <div class="booth-top-bar">
          <button class="btn-back-lobby" id="btnBackToLobby">
            <span class="arrow">⬅️</span> Kembali ke Lobby Utama
          </button>
          <div class="booth-hall-indicator">
            <span class="indicator-dot"></span> Booth Virtual: <strong>${booth.name}</strong>
          </div>
          <div class="booth-switch-shortcuts">
            <button class="btn-mini-action" id="btnShareBooth" title="Bagikan Booth">🔗 Bagikan</button>
            <button class="btn-mini-action" id="btnDownloadCatalog" data-booth-id="${booth.id}">📥 Unduh Katalog</button>
          </div>
        </div>

        <!-- Grand Booth Archway & Stage Showcase -->
        <section class="booth-hero-section">
          <div class="booth-header-info">
            <span class="booth-category-pill">${booth.category}</span>
            <h1 class="booth-title">${booth.name}</h1>
            <p class="booth-tagline-hero">${booth.tagline}</p>
            <p class="booth-description-text">${booth.description}</p>
            
            <div class="booth-tech-row">
              <span class="tech-label">Arsitektur & Tech Stack:</span>
              <div class="tech-badges-list">
                ${booth.techStack.map((tech) => `<span class="tech-badge-glow">${tech}</span>`).join("")}
              </div>
            </div>

            <div class="booth-hero-ctas">
              <button class="btn-cta-primary btn-open-quote" data-booth-id="${booth.id}">
                <span>📝 Request Penawaran & Proposal</span>
              </button>
              <button class="btn-cta-secondary" id="btnBoothWAContact" data-booth-name="${booth.name}">
                <span>💬 Konsultasi via WhatsApp</span>
              </button>
            </div>
          </div>

          <!-- Interactive Live App Demo Showcase -->
          <div class="booth-interactive-demo-card">
            <div class="demo-card-header">
              <div class="demo-window-controls">
                <span class="dot dot-red"></span>
                <span class="dot dot-yellow"></span>
                <span class="dot dot-green"></span>
              </div>
              <span class="demo-header-title">Live Simulator: ${booth.shortName} System</span>
              <div class="demo-live-badge"><span class="pulsing-live"></span> SIMULATION ACTIVE</div>
            </div>

            <div class="demo-interactive-body" id="demoInteractiveBody">
              <div class="demo-tabs-bar">
                ${booth.demoData.mockViews
                  .map(
                    (v, idx) => `
                  <button class="demo-tab-btn ${idx === 0 ? "active" : ""}" data-tab-id="${v.id}">
                    ${v.title}
                  </button>
                `
                  )
                  .join("")}
              </div>

              <div class="demo-display-screen" id="demoDisplayScreen">
                <div class="demo-screen-content">
                  <div class="demo-stat-badge">
                    <span class="demo-stat-value" id="demoStatVal">${booth.demoData.mockViews[0].stat}</span>
                    <span class="demo-stat-desc" id="demoStatDesc">${booth.demoData.mockViews[0].info}</span>
                  </div>
                  <div class="demo-preview-visual" id="demoVisualPreview">
                    <!-- Interactive Visual Mockup -->
                    <div class="mockup-chart-bars">
                      <div class="bar-col"><div class="bar-fill" style="height: 65%;"></div><span>Jan</span></div>
                      <div class="bar-col"><div class="bar-fill" style="height: 85%;"></div><span>Feb</span></div>
                      <div class="bar-col"><div class="bar-fill" style="height: 95%;"></div><span>Mar</span></div>
                      <div class="bar-col"><div class="bar-fill" style="height: 70%;"></div><span>Apr</span></div>
                      <div class="bar-col"><div class="bar-fill" style="height: 100%;"></div><span>May</span></div>
                    </div>
                    <div class="mockup-info-ticker">
                      ✅ Terkoneksi ke Realtime Engine • Enkripsi TLS 1.3 • Multi-Device Ready
                    </div>
                  </div>
                </div>
              </div>

              <div class="demo-card-footer">
                <span class="metric-star">✨</span>
                <span class="metric-text">${booth.demoData.heroMetric}</span>
              </div>
            </div>
          </div>
        </section>

        <!-- Key Features 6-Card Grid -->
        <section class="booth-features-section">
          <div class="section-heading-center">
            <span class="sub-badge">FITUR UNGGULAN</span>
            <h2>Kapabilitas Sistem & Modul Terpadu</h2>
            <p>Dirancang untuk kemudahan operasional, otomatisasi cerdas, dan keamanan data maksimal.</p>
          </div>

          <div class="features-grid">
            ${booth.features
              .map(
                (f) => `
              <div class="feature-card glass-panel">
                <div class="feature-icon-circle">${f.icon}</div>
                <h3 class="feature-card-title">${f.title}</h3>
                <p class="feature-card-desc">${f.desc}</p>
              </div>
            `
              )
              .join("")}
          </div>
        </section>

        <!-- Advantages & Why Choose Us -->
        <section class="booth-advantages-section">
          <div class="advantages-banner glass-panel">
            <div class="adv-left">
              <span class="sub-badge">MENGAPA MEMILIH AL-IMAM EDUTECH</span>
              <h2>Keunggulan Kompetitif & Standar Mutu</h2>
              <p>Kami tidak sekadar menjual aplikasi siap pakai, kami membangun kemitraan strategis teknologi jangka panjang.</p>
            </div>
            <div class="adv-grid">
              ${booth.advantages
                .map(
                  (adv) => `
                <div class="adv-item">
                  <div class="adv-check">✓</div>
                  <div>
                    <h4>${adv.title}</h4>
                    <p>${adv.desc}</p>
                  </div>
                </div>
              `
                )
                .join("")}
            </div>
          </div>
        </section>

        <!-- Pricing Tiers Breakdown -->
        <section class="booth-pricing-section">
          <div class="section-heading-center">
            <span class="sub-badge">TRANSPARANSI INVESTASI</span>
            <h2>Paket & Estimasi Biaya</h2>
            <p>Pilih paket yang paling sesuai dengan skala institusi atau perusahaan Anda.</p>
          </div>

          <div class="pricing-cards-grid">
            ${booth.pricingTiers
              .map(
                (tier) => `
              <div class="pricing-card glass-panel ${tier.popular ? "popular-card" : ""}">
                ${tier.popular ? '<div class="popular-ribbon">Paling Direkomendasikan</div>' : ""}
                <h3 class="pricing-tier-title">${tier.tierName}</h3>
                <p class="pricing-tier-desc">${tier.desc}</p>
                <div class="pricing-amount-box">
                  <span class="pricing-currency">${tier.price}</span>
                  <span class="pricing-period">${tier.period}</span>
                </div>
                
                <ul class="pricing-feature-list">
                  ${tier.features
                    .map(
                      (feat) => `
                    <li><span class="bullet-check">✔</span> ${feat}</li>
                  `
                    )
                    .join("")}
                </ul>

                <button class="btn-tier-select btn-open-quote" data-booth-id="${booth.id}" data-tier-name="${tier.tierName}">
                  ${tier.popular ? "Pilih Paket Unggulan" : "Ajukan Penawaran"}
                </button>
              </div>
            `
              )
              .join("")}
          </div>
        </section>

        <!-- Bottom Hall Navigation Bar -->
        <div class="booth-bottom-nav glass-panel">
          <button class="bottom-nav-btn" id="btnBottomBackLobby">
            🏛️ Kembali ke Lobby
          </button>
          <div class="bottom-nav-quote-cta">
            <span>Perlu modul khusus di luar paket?</span>
            <button class="btn-cta-glow btn-open-quote" data-booth-id="${booth.id}">
              Konsultasi Custom Software
            </button>
          </div>
        </div>
      </div>
    `;

    this.updateActiveNav(booth.id);
    this.bindDemoTabEvents(booth);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  /**
   * Bind interactive tab switching in demo mockup
   */
  bindDemoTabEvents(booth) {
    const tabBtns = document.querySelectorAll(".demo-tab-btn");
    const statVal = document.getElementById("demoStatVal");
    const statDesc = document.getElementById("demoStatDesc");

    tabBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        this.playSound("click");
        tabBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        const tabId = btn.dataset.tabId;
        const viewData = booth.demoData.mockViews.find((v) => v.id === tabId);
        if (viewData && statVal && statDesc) {
          statVal.textContent = viewData.stat;
          statDesc.textContent = viewData.info;
        }
      });
    });
  }

  /**
   * Update active nav link indicator
   */
  updateActiveNav(activeId) {
    const navBtns = document.querySelectorAll(".header-nav .nav-link-btn");
    navBtns.forEach((btn) => {
      if (
        (activeId === "lobby" && btn.dataset.target === "lobby") ||
        btn.dataset.boothId === activeId
      ) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });
  }

  /**
   * Animate Guide speech bubble with Typewriter effect & sound
   */
  updateGuideDialogue(dialogue) {
    const speechTag = document.getElementById("guideSpeechTag");
    const speechTitle = document.getElementById("guideSpeechTitle");
    const speechBody = document.getElementById("guideSpeechBody");
    const speechHint = document.getElementById("guideSpeechHint");
    const typingIndicator = document.getElementById("typingIndicator");

    if (!speechTitle || !speechBody) return;

    if (this.typewriterInterval) {
      clearInterval(this.typewriterInterval);
    }

    speechTitle.textContent = dialogue.title || "Sales Master";
    speechHint.textContent = dialogue.hint ? `💡 ${dialogue.hint}` : "";

    const textToType = dialogue.message || "";
    speechBody.innerHTML = "";
    if (typingIndicator) typingIndicator.textContent = "● ● ●";

    let charIndex = 0;
    // Format bold markdown **text** to <strong>
    const formattedHtml = textToType.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

    // Fast typewriter effect
    this.typewriterInterval = setInterval(() => {
      if (charIndex < textToType.length) {
        charIndex += 2;
        speechBody.innerHTML = textToType.substring(0, charIndex).replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
        if (charIndex % 6 === 0) {
          this.playSound("bubble");
        }
      } else {
        speechBody.innerHTML = formattedHtml;
        if (typingIndicator) typingIndicator.textContent = "";
        clearInterval(this.typewriterInterval);
      }
    }, 18);
  }

  /**
   * Open Quote Request Modal
   */
  openQuoteModal(booths, preselectedBoothId = null, preselectedTier = null) {
    this.playSound("click");
    const backdrop = document.getElementById("modalBackdrop");
    const dialog = document.getElementById("modalDialog");
    if (!backdrop || !dialog) return;

    dialog.innerHTML = `
      <div class="modal-header">
        <div class="modal-title-group">
          <span class="modal-badge">📋 FORMULIR RESMI</span>
          <h2>Pengajuan Penawaran & Proposal</h2>
          <p>Terhubung langsung dengan Tim Senior Software Architect Al-Imam EduTech</p>
        </div>
        <button class="btn-modal-close" id="btnCloseModal">✕</button>
      </div>

      <form id="quoteRequestForm" class="quote-form">
        <div class="form-grid-2">
          <div class="form-group">
            <label for="leadFullName">Nama Lengkap & Gelar <span class="req">*</span></label>
            <input type="text" id="leadFullName" name="fullName" required placeholder="Contoh: Dr. H. Ahmad Fauzi, M.Pd" class="form-input" />
          </div>

          <div class="form-group">
            <label for="leadOrgType">Tipe Lembaga / Badan Usaha <span class="req">*</span></label>
            <select id="leadOrgType" name="orgType" class="form-select" required>
              <option value="Yayasan Pendidikan">🎓 Yayasan Pendidikan</option>
              <option value="Sekolah Islam / Madrasah / Pesantren" selected>🕌 Sekolah Islam / Madrasah / Pesantren</option>
              <option value="Perguruan Tinggi / Universitas">🏛️ Perguruan Tinggi / Universitas</option>
              <option value="PT (Perseroan Terbatas)">🏢 PT (Perseroan Terbatas)</option>
              <option value="CV (Commanditaire Vennootschap)">🏢 CV (Commanditaire Vennootschap)</option>
              <option value="Firma / Kantor Hukum / Konsultan">⚖️ Firma / Kantor Hukum / Konsultan</option>
              <option value="Perusahaan Daerah (PD / BUMD)">🏛️ Perusahaan Daerah (PD / BUMD)</option>
              <option value="UMKM / Bisnis Berkembang">🏪 UMKM / Bisnis Berkembang</option>
              <option value="Institusi / Lembaga Lainnya">🌐 Institusi / Lembaga Lainnya</option>
            </select>
          </div>
        </div>

        <div class="form-grid-2">
          <div class="form-group">
            <label for="leadInstitution">Nama Lembaga / Perusahaan <span class="req">*</span></label>
            <input type="text" id="leadInstitution" name="institution" required placeholder="Contoh: Yayasan Al-Imam / PT Sinar Digital Nusantara" class="form-input" />
          </div>

          <div class="form-group">
            <label for="leadEmail">Alamat Email Resmi <span class="req">*</span></label>
            <input type="email" id="leadEmail" name="email" required placeholder="ahmad.fauzi@domain.sch.id" class="form-input" />
          </div>
        </div>

        <div class="form-grid-2">
          <div class="form-group">
            <label for="leadPhone">Nomor WhatsApp / HP Aktif <span class="req">*</span></label>
            <input type="tel" id="leadPhone" name="phone" required placeholder="081234567890" class="form-input" />
          </div>

        <div class="form-grid-2">
          <div class="form-group">
            <label for="leadProduct">Kategori Solusi / Booth <span class="req">*</span></label>
            <select id="leadProduct" name="product" class="form-select" required>
              ${booths
                .map(
                  (b) => `
                <option value="${b.name}" ${b.id === preselectedBoothId ? "selected" : ""}>
                  ${b.icon} ${b.name}
                </option>
              `
                )
                .join("")}
              <option value="Konsultasi Seluruh Ekosistem" ${!preselectedBoothId ? "selected" : ""}>🌐 Seluruh Ekosistem Al-Imam EduTech</option>
            </select>
          </div>

          <div class="form-group">
            <label for="leadPlan">Pilihan Paket <span class="req">*</span></label>
            <input type="text" id="leadPlan" name="plan" value="${preselectedTier || "Paket Rekomendasi / Custom Inquiry"}" class="form-input" placeholder="Paket Starter / Pro / Custom" />
          </div>
        </div>

        <div class="form-grid-2">
          <div class="form-group">
            <label for="leadBudget">Estimasi Anggaran</label>
            <select id="leadBudget" name="budget" class="form-select">
              <option value="< Rp 15 Juta">&lt; Rp 15 Juta</option>
              <option value="Rp 15 Juta - Rp 50 Juta" selected>Rp 15 Juta - Rp 50 Juta</option>
              <option value="Rp 50 Juta - Rp 150 Juta">Rp 50 Juta - Rp 150 Juta</option>
              <option value="> Rp 150 Juta (Enterprise Scale)">&gt; Rp 150 Juta (Enterprise Scale)</option>
              <option value="Menunggu Rekomendasi Tim Teknis">Menunggu Rekomendasi Tim Teknis</option>
            </select>
          </div>

          <div class="form-group">
            <label for="leadTimeline">Target Waktu Implementasi</label>
            <select id="leadTimeline" name="timeline" class="form-select">
              <option value="Segera (Bulan Ini)" selected>Segera (Bulan Ini)</option>
              <option value="1 - 3 Bulan ke Depan">1 - 3 Bulan ke Depan</option>
              <option value="Tahun Ajaran / Kuartal Baru">Tahun Ajaran / Kuartal Baru</option>
              <option value="Studi Kelayakan / Penjajakan">Studi Kelayakan / Penjajakan</option>
            </select>
          </div>
        </div>

        <div class="form-group">
          <label for="leadMessage">Kebutuhan Spesifik / Catatan Tambahan</label>
          <textarea id="leadMessage" name="message" rows="3" class="form-textarea" placeholder="Jelaskan kebutuhan khusus, jumlah siswa/pengguna, atau modul kustom yang diinginkan..."></textarea>
        </div>

        <div class="form-security-note">
          🔒 Data Anda aman & otomatis terkirim langsung ke Google Spreadsheet Database Al-Imam EduTech.
        </div>

        <div class="modal-footer-actions">
          <button type="button" class="btn-cancel" id="btnCancelModal">Batal</button>
          <button type="submit" class="btn-submit-glow" id="btnSubmitQuote">
            <span id="submitSpinner" class="spinner-hidden">⏳</span>
            <span id="submitBtnText">Kirim Permintaan Proposal 🚀</span>
          </button>
        </div>
      </form>
    `;

    backdrop.classList.add("active");
  }

  /**
   * Render Quote Submission Success State inside Modal
   */
  renderQuoteSuccess(resultData, leadData) {
    this.playSound("success");
    const dialog = document.getElementById("modalDialog");
    if (!dialog) return;

    dialog.innerHTML = `
      <div class="success-state-card animate-fade-in">
        <div class="success-check-badge">🎉</div>
        <h2>Alhamdulillah! Permintaan Berhasil Dikirim</h2>
        <p class="success-lead-id">Lead Reference ID: <strong>${resultData.leadId || "LEAD-CONFIRMED"}</strong></p>
        
        <div class="success-summary-box glass-panel">
          <div class="summary-row"><span>Nama:</span> <strong>${leadData.fullName}</strong></div>
          <div class="summary-row"><span>Institusi:</span> <strong>${leadData.institution}</strong></div>
          <div class="summary-row"><span>Layanan:</span> <strong>${leadData.product}</strong></div>
          <div class="summary-row"><span>Paket:</span> <strong>${leadData.plan}</strong></div>
        </div>

        <p class="success-next-steps">
          Tim Senior Software Architect Al-Imam EduTech akan meninjau data Anda dan mengirimkan dokumen proposal resmi dalam waktu <strong>1x24 jam kerja</strong>.
        </p>

        <div class="success-actions-row">
          <a href="https://api.whatsapp.com/send?phone=6281234567890&text=Halo%20Al-Imam%20EduTech,%20saya%20sudah%20mengajukan%20proposal%20di%20Virtual%20Expo%20dengan%20Lead%20ID:%20${encodeURIComponent(resultData.leadId || "")}%20untuk%20${encodeURIComponent(leadData.institution)}" target="_blank" rel="noopener" class="btn-cta-wa">
            💬 Langsung Hubungi Tim Sales via WhatsApp
          </a>
          <button class="btn-modal-close-wide" id="btnCloseSuccessModal">
            Lanjut Jelajahi Expo
          </button>
        </div>
      </div>
    `;
  }

  /**
   * Render Vision & Mission Modal
   */
  openVisionModal(companyInfo) {
    this.playSound("click");
    const backdrop = document.getElementById("modalBackdrop");
    const dialog = document.getElementById("modalDialog");
    if (!backdrop || !dialog) return;

    dialog.innerHTML = `
      <div class="modal-header">
        <div class="modal-title-group">
          <span class="modal-badge">🏛️ TENTANG AL-IMAM EDUTECH</span>
          <h2>Visi, Misi & Standar Kualitas</h2>
          <p>${companyInfo.tagline}</p>
        </div>
        <button class="btn-modal-close" id="btnCloseModal">✕</button>
      </div>

      <div class="vision-modal-body">
        <div class="vision-card glass-panel">
          <h3>🌟 Visi Kami</h3>
          <p>${companyInfo.vision}</p>
        </div>

        <div class="mission-card glass-panel">
          <h3>🎯 Misi Strategis</h3>
          <ul class="mission-list">
            ${companyInfo.mission.map((m) => `<li>${m}</li>`).join("")}
          </ul>
        </div>

        <div class="company-stats-grid">
          ${companyInfo.stats
            .map(
              (s) => `
            <div class="stat-box-mini">
              <h4>${s.value}</h4>
              <span>${s.label}</span>
            </div>
          `
            )
            .join("")}
        </div>
      </div>

      <div class="modal-footer-actions">
        <button class="btn-submit-glow" id="btnCloseVision">Tutup & Kembali ke Expo</button>
      </div>
    `;
    backdrop.classList.add("active");
  }

  /**
   * Render Google Apps Script API Configuration Modal
   */
  openGasConfigModal(currentUrl) {
    this.playSound("click");
    const backdrop = document.getElementById("modalBackdrop");
    const dialog = document.getElementById("modalDialog");
    if (!backdrop || !dialog) return;

    dialog.innerHTML = `
      <div class="modal-header">
        <div class="modal-title-group">
          <span class="modal-badge">⚙️ PENGATURAN BACKEND</span>
          <h2>Google Apps Script (GAS) API URL</h2>
          <p>Integrasi langsung formulir leads ke Google Spreadsheet Anda secara realtime.</p>
        </div>
        <button class="btn-modal-close" id="btnCloseModal">✕</button>
      </div>

      <form id="gasConfigForm" class="gas-config-form">
        <div class="form-group">
          <label for="gasUrlInput">URL Web App Google Apps Script</label>
          <input type="url" id="gasUrlInput" class="form-input" value="${currentUrl}" placeholder="https://script.google.com/macros/s/AKfy.../exec" required />
          <small class="form-hint">
            Deploy script <code>backend/code.gs</code> Anda sebagai Web App (Access: Anyone), lalu salin Web App URL ke sini.
          </small>
        </div>

        <div class="gas-instructions-box glass-panel">
          <h4>💡 Cara Deploy Backend Google Sheet 1 Menit:</h4>
          <ol>
            <li>Buat Google Spreadsheet baru di Google Drive Anda.</li>
            <li>Buka menu <strong>Extensions > Apps Script</strong>.</li>
            <li>Salin seluruh kode dari file <code>backend/code.gs</code> ke editor.</li>
            <li>Klik tombol <strong>Deploy > New Deployment</strong>.</li>
            <li>Pilih tipe <strong>Web app</strong>, atur <em>Who has access</em> ke <strong>Anyone</strong>.</li>
            <li>Salin <strong>Web App URL</strong> yang dihasilkan ke form di atas lalu klik Simpan.</li>
          </ol>
        </div>

        <div class="modal-footer-actions">
          <button type="button" class="btn-cancel" id="btnCancelModal">Batal</button>
          <button type="submit" class="btn-submit-glow">Simpan Konfigurasi</button>
        </div>
      </form>
    `;
    backdrop.classList.add("active");
  }

  /**
   * Close any active modal
   */
  closeModal() {
    this.playSound("click");
    const backdrop = document.getElementById("modalBackdrop");
    if (backdrop) {
      backdrop.classList.remove("active");
    }
  }

  /**
   * Trigger Digital Catalog Print / Download summary on-the-fly
   */
  downloadCatalogSummary(booth) {
    this.playSound("success");
    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      this.showToast("Izinkan pop-up untuk mengunduh katalog PDF digital.", "warning");
      return;
    }

    const catalogHtml = `
      <!DOCTYPE html>
      <html lang="id">
      <head>
        <meta charset="UTF-8">
        <title>Katalog Resmi Al-Imam EduTech - ${booth.name}</title>
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #1e293b; padding: 40px; }
          .header { border-bottom: 3px solid #00f0ff; padding-bottom: 20px; margin-bottom: 30px; display: flex; justify-content: space-between; align-items: center; }
          h1 { color: #0f172a; margin: 0 0 10px 0; }
          .badge { background: #0f172a; color: #00f0ff; padding: 6px 12px; border-radius: 6px; font-weight: bold; }
          .section { margin-bottom: 25px; }
          .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
          .card { border: 1px solid #e2e8f0; border-radius: 8px; padding: 15px; background: #f8fafc; }
          .pricing { background: #0f172a; color: #fff; padding: 20px; border-radius: 8px; margin-top: 20px; }
          .price-item { margin-bottom: 12px; }
          .footer { margin-top: 40px; border-top: 1px solid #e2e8f0; padding-top: 20px; font-size: 13px; color: #64748b; text-align: center; }
        </style>
      </head>
      <body>
        <div class="header">
          <div>
            <h1>Al-Imam EduTech</h1>
            <p>Katalog Resmi Virtual Expo 2026</p>
          </div>
          <div class="badge">${booth.category}</div>
        </div>

        <h2>${booth.name}</h2>
        <p><strong>Tagline:</strong> ${booth.tagline}</p>
        <p>${booth.description}</p>

        <div class="section">
          <h3>Arsitektur & Tech Stack:</h3>
          <p>${booth.techStack.join(" • ")}</p>
        </div>

        <div class="section">
          <h3>Fitur Utama:</h3>
          <div class="grid">
            ${booth.features.map((f) => `<div class="card"><strong>${f.icon} ${f.title}</strong><p>${f.desc}</p></div>`).join("")}
          </div>
        </div>

        <div class="section pricing">
          <h3 style="color:#00f0ff;">Pilihan Paket & Investasi:</h3>
          ${booth.pricingTiers
            .map(
              (p) => `
            <div class="price-item">
              <strong>${p.tierName}</strong> - ${p.price} (${p.period})<br>
              <small>${p.desc}</small>
            </div>
          `
            )
            .join("")}
        </div>

        <div class="footer">
          Al-Imam EduTech • Hubungi Tim Sales: +62 812-3456-7890 • faikbajsair@gmail.com
        </div>
        <script>
          window.onload = function() { window.print(); }
        </script>
      </body>
      </html>
    `;

    printWindow.document.write(catalogHtml);
    printWindow.document.close();
  }

  /**
   * Display toast notification
   */
  showToast(message, type = "info") {
    const container = document.getElementById("toastContainer");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = `toast toast-${type} animate-fade-in`;
    toast.innerHTML = `
      <span class="toast-icon">${type === "success" ? "✅" : type === "warning" ? "⚠️" : "ℹ️"}</span>
      <span class="toast-text">${message}</span>
    `;

    container.appendChild(toast);
    setTimeout(() => {
      toast.classList.add("toast-fade-out");
      setTimeout(() => toast.remove(), 400);
    }, 4000);
  }

  toggleSound() {
    this.soundEnabled = !this.soundEnabled;
    const icon = document.getElementById("soundIcon");
    if (icon) {
      icon.textContent = this.soundEnabled ? "🔊" : "🔇";
    }
    this.showToast(
      this.soundEnabled ? "Efek Suara Diaktifkan 🔊" : "Efek Suara Dimatikan 🔇",
      "info"
    );
  }
}
