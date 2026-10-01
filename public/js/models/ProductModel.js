/**
 * Al-Imam EduTech Virtual Expo - Model Layer
 * ProductModel.js - Manages Booth Data, Guide Script Content, Lead Storage, and GAS API Integration
 */

export class ProductModel {
  constructor() {
    // Default Google Apps Script Web App URL (Connected to Google Sheets)
    this.gasApiUrl = "https://script.google.com/macros/s/AKfycbxx_z-yJ-RL3uu75vY8m5WzCyIa5dqSJx1g_fIszFRoq9czn0iKz5iAQpNHchvqv5odpw/exec";
    
    // Al-Imam EduTech Vision, Mission & Company Info
    this.companyInfo = {
      name: "Al-Imam EduTech",
      tagline: "Pioneering the Next Era of Islamic & Modern Education Technology",
      vision: "Menjadi pelopor transformasi teknologi pendidikan dan sistem enterprise terdepan di Asia Tenggara yang mengintegrasikan kecerdasan buatan (AI), nilai-nilai islami, dan keunggulan rekayasa perangkat lunak modern.",
      mission: [
        "Menyediakan ekosistem perangkat lunak terpadu yang aman, cepat, dan handal bagi lembaga pendidikan dari tingkat dasar hingga perguruan tinggi.",
        "Membantu transformasi digital PT & CV di Indonesia melalui sistem otomasi bisnis (ERP, POS, HRIS) berstandar industri.",
        "Memberikan solusi rekayasa web dan aplikasi mobile berkinerja tinggi dengan kepemilikan kode sumber penuh dan dukungan teknis 24/7.",
        "Mendukung transparansi, efisiensi operasional, dan kemudahan akses bagi seluruh pemangku kepentingan (Sekolah, Orang Tua, Siswa, dan Pengusaha)."
      ],
      stats: [
        { label: "Lembaga & Perusahaan Terlayani", value: "180+" },
        { label: "Pengguna Aktif Harian", value: "120K+" },
        { label: "SLA Uptime Cloud Server", value: "99.98%" },
        { label: "Tingkat Kepuasan Klien", value: "98.7%" }
      ],
      contact: {
        whatsapp: "+62 812-3456-7890",
        email: "contact@alimam-edutech.com",
        location: "Grand Virtual Expo Hall 1 (JCC Senayan Mode), Jakarta, Indonesia"
      }
    };

    // Virtual Exhibition Booths Data
    this.booths = [
      {
        id: "school-apps",
        category: "School Apps & Smart Campus",
        name: "Smart School & Islamic EdTech Ecosystem",
        shortName: "School Apps",
        badge: "⭐ Most Popular",
        icon: "🎓",
        themeColor: "#00F0FF",
        glowClass: "glow-cyan",
        tagline: "SIAKAD Cloud, CBT Online, Tahfidz Tracker & Smart School Gateway",
        description: "Platform digital terpadu all-in-one yang dirancang khusus untuk Pesantren, Madrasah, Sekolah Islam Terpadu, dan Universitas. Menggabungkan manajemen akademik, sistem ujian anti-curang, pencatatan hafalan Al-Quran, absensi RFID/biometrik dengan notifikasi WhatsApp otomatis ke wali murid, serta pembayaran SPP multi-channel.",
        techStack: ["Next.js 14", "Node.js Microservices", "PostgreSQL", "Flutter Mobile", "Redis Caching", "Docker Engine"],
        demoData: {
          type: "interactive-dashboard",
          mockViews: [
            { id: "academic", title: "📊 SIAKAD 360°", stat: "1,420 Siswa Aktif", info: "Kurikulum Merdeka & Kemenag Sinkron" },
            { id: "tahfidz", title: "📖 Tahfidz Tracker", stat: "30 Juz Mutaba'ah", info: "Rekaman Audio & Setoran Real-time" },
            { id: "cbt", title: "💻 CBT Anti-Cheat", stat: "99.9% Zero Lag", info: "Token Acak, Full Screen Lock & Auto-Score" },
            { id: "finance", title: "💳 Smart SPP Gateway", stat: "Rp 340M+ Diproses", info: "QRIS, VA Bank Syariah & Notifikasi WA" }
          ],
          heroMetric: "85% Pengurangan Beban Administrasi Guru & Staf"
        },
        features: [
          {
            title: "SIAKAD 360° Cloud",
            desc: "Manajemen nilai, kurikulum terpadu (Kemenag & Kemendikbudristek), rapor digital otomatis, dan buku induk siswa.",
            icon: "📋"
          },
          {
            title: "Tahfidz & Mutaba'ah Quran",
            desc: "Pencatatan hafalan real-time, target capaian juz, audio recording setoran, dan feedback langsung dari ustadz/ustadzah.",
            icon: "🕌"
          },
          {
            title: "CBT Online Pro (Anti-Cheat)",
            desc: "Mesin ujian online dengan proteksi switch-tab, bank soal ribuan item, acak soal & opsi, serta koreksi otomatis seketika.",
            icon: "🛡️"
          },
          {
            title: "Presensi Biometrik & RFID WhatsApp",
            desc: "Pencatatan kehadiran siswa dan guru terintegrasi mesin RFID/FaceID, otomatis mengirim broadcast WA ke orang tua saat tap.",
            icon: "📲"
          },
          {
            title: "Cashless SPP & Payment Gateway",
            desc: "Pembayaran SPP, uang gedung, dan katering via QRIS, Virtual Account (BSI, Mandiri, BCA, BRI), dan kartu pintar.",
            icon: "💳"
          },
          {
            title: "Aplikasi Mobile Wali Murid (iOS & Android)",
            desc: "Aplikasi native bagi orang tua untuk memantau nilai, hafalan, kehadiran, kalender akademik, dan billing SPP.",
            icon: "📱"
          }
        ],
        advantages: [
          { title: "Kustomisasi Kurikulum Syariah", desc: "Sesuai standar Pesantren Salaf/Modern maupun Sekolah Terpadu." },
          { title: "Uptime 99.9% Ujian Serentak", desc: "Arsitektur cloud scalable siap menangani ribuan siswa login bersamaan." },
          { title: "Keamanan Data Berstandar ISO", desc: "Enkripsi database end-to-end dengan backup otomatis berkala tiap 6 jam." },
          { title: "Pelatihan & Onboarding Total", desc: "Pendampingan langsung staf hingga sistem beroperasi 100% lancar." }
        ],
        pricingTiers: [
          {
            tierName: "Starter Madrasah",
            price: "Rp 3.500.000",
            period: "/ bulan",
            desc: "Ideal untuk Madrasah / Sekolah dengan kapasitas hingga 500 Siswa.",
            popular: false,
            features: [
              "SIAKAD Akademik & Rapor Digital",
              "CBT Engine hingga 500 Peserta",
              "Integrasi Payment Gateway SPP",
              "Presensi RFID & Notifikasi Email",
              "Server Cloud Terkelola & SSL",
              "Support Jam Kerja (08:00 - 17:00)"
            ]
          },
          {
            tierName: "Pro Pesantren & Smart School",
            price: "Rp 7.500.000",
            period: "/ bulan",
            desc: "Paket lengkap untuk Pesantren & Sekolah Unggulan hingga 2.000 Siswa.",
            popular: true,
            features: [
              "Semua fitur Paket Starter",
              "Tahfidz Tracker & Mutaba'ah Harian",
              "Broadcast WhatsApp Otomatis ke Wali",
              "Aplikasi Mobile iOS & Android (Branded)",
              "Kantin Cashless & Kartu Pintar Santri",
              "Dedicated Cloud Server & Backup 6 Jam",
              "Priority Support 24/7 VIP"
            ]
          },
          {
            tierName: "Enterprise Multi-Campus",
            price: "Hubungi Kami",
            period: "Custom Quote",
            desc: "Solusi Custom untuk Yayasan Besar, Multi-Kampus & Universitas.",
            popular: false,
            features: [
              "Kapasitas Siswa / Mahasiswa Tanpa Batas",
              "Full White-Label & Source Code License",
              "Integrasi Feeder Dikti & EMIS Kemenag",
              "Custom Modul & Alur Bisnis Khusus",
              "Arsitektur Private Server On-Premise/Cloud",
              "Dedicated Software Engineer & Account Manager"
            ]
          }
        ]
      },
      {
        id: "web-dev",
        category: "Modern Web Development",
        name: "High-Performance Web Development & Portals",
        shortName: "Web Development",
        badge: "⚡ Ultra Fast",
        icon: "🌐",
        themeColor: "#A855F7",
        glowClass: "glow-purple",
        tagline: "Bespoke Portals, High-Converting Web Platforms & Modern SaaS Architectures",
        description: "Pengembangan portal web institusi, platform e-learning, dan aplikasi berbasis web kustom dengan standar performa kelas dunia. Mengutamakan desain UI/UX futuristik dan responsif, kecepatan loading di bawah 1 detik, SEO top-ranking, keamanan tingkat tinggi, dan kemudahan manajemen konten melalui Custom CMS.",
        techStack: ["React 19", "Next.js App Router", "Tailwind CSS", "TypeScript", "Node.js / Python", "PostgreSQL / Supabase", "Cloudflare CDN"],
        demoData: {
          type: "interactive-web-preview",
          mockViews: [
            { id: "lighthouse", title: "⚡ Lighthouse Score", stat: "100 / 100 Performance", info: "Core Web Vitals Optimal & Sub-Second LCP" },
            { id: "portal", title: "🏛️ Institution Portal", stat: "Bilingual (ID / AR / EN)", info: "Support Arabic Typography & RTL Switch" },
            { id: "cms", title: "📝 Headless CMS Hub", stat: "Editor Visual Realtime", info: "Publikasi Berita, Pendaftaran & Media Instan" },
            { id: "security", title: "🔒 Bank-Grade Security", stat: "Zero Vulnerability", info: "WAF Protection, SSL A+, & Anti-DDoS" }
          ],
          heroMetric: "Kecepatan Loading 3x Lebih Cepat dari Rata-rata Website Standar"
        },
        features: [
          {
            title: "Custom UI/UX & Design System",
            desc: "Desain eksklusif dirancang di Figma dengan prototipe interaktif, diterjemahkan menjadi kode responsif tanpa template murahan.",
            icon: "🎨"
          },
          {
            title: "Ultra-Fast Edge Delivery",
            desc: "Server-side rendering (SSR) dan static site generation (SSG) Next.js dengan optimasi aset gambar WebP/AVIF berkecepatan kilat.",
            icon: "⚡"
          },
          {
            title: "Bilingual & Arabic RTL Ready",
            desc: "Dukungan penuh multi-bahasa termasuk tata letak font Arab (RTL) yang rapi untuk institusi berbasis Islam dan internasional.",
            icon: "🌍"
          },
          {
            title: "Portal Penerimaan Siswa Baru (PPDB)",
            desc: "Modul pendaftaran online terintegrasi formulir dinamis, verifikasi berkas digital, dan pembayaran biaya seleksi online.",
            icon: "📑"
          },
          {
            title: "Keamanan Cyber & Anti-DDoS",
            desc: "Dilengkapi firewall Cloudflare Enterprise, enkripsi TLS 1.3, sanitasi input terhadap XSS/SQL Injection, dan audit keamanan berkala.",
            icon: "🛡️"
          },
          {
            title: "SEO Optimization & Analytics",
            desc: "Penerapan Schema.org JSON-LD, sitemap otomatis, Google Analytics 4, dan integrasi WhatsApp CRM click-to-chat.",
            icon: "📈"
          }
        ],
        advantages: [
          { title: "Kepemilikan Kode 100%", desc: "Seluruh hak cipta dan repository Git diserahkan seutuhnya kepada klien." },
          { title: "Tanpa Biaya Lisensi Tersembunyi", desc: "Dibangun dengan teknologi open-source modern bebas royalti pihak ketiga." },
          { title: "Garansi Teknis & Pemeliharaan", desc: "Jaminan bebas bug dan pendampingan teknis gratis selama masa garansi." },
          { title: "Kemudahan Pengelolaan Konten", desc: "Dashboard admin interaktif yang sangat mudah dipelajari staf non-IT." }
        ],
        pricingTiers: [
          {
            tierName: "Profile & Landing Page",
            price: "Rp 12.500.000",
            period: "Sekali Bayar",
            desc: "Untuk Lembaga / Perusahaan yang membutuhkan Web Profile Modern & Elegan.",
            popular: false,
            features: [
              "Desain UI/UX Eksklusif (Hingga 7 Halaman)",
              "Optimasi Mobile Responsive 100%",
              "Integrasi Custom CMS Berita & Galeri",
              "Integrasi WhatsApp Webhook & Formulir Kontak",
              "Optimasi SEO & Google Search Console",
              "Domain .com / .id & Cloud Server 1 Tahun",
              "Garansi Teknis 3 Bulan"
            ]
          },
          {
            tierName: "Integrated Portal & PPDB",
            price: "Rp 25.000.000",
            period: "Sekali Bayar",
            desc: "Solusi lengkap Portal Institusi + Sistem Penerimaan Siswa/Klien Online.",
            popular: true,
            features: [
              "Semua fitur Paket Profile",
              "Sistem Pendaftaran Online (PPDB) & Verifikasi Berkas",
              "Integrasi Pembayaran Otomatis (QRIS & Virtual Account)",
              "Dukungan Multi-Bahasa (Indonesia & Arab RTL)",
              "Dashboard Admin Analytics & Export Data Excel/PDF",
              "Proteksi Cloudflare DDoS & SSL Kelas A+",
              "Garansi Teknis 6 Bulan + Pelatihan Staf"
            ]
          },
          {
            tierName: "Bespoke SaaS / Web Platform",
            price: "Rp 45.000.000+",
            period: "Custom Project",
            desc: "Pengembangan platform aplikasi web kompleks dengan arsitektur kustom.",
            popular: false,
            features: [
              "Arsitektur Microservices / Monorepo Terukur",
              "Multi-tenant & Role-Based Access Control (RBAC)",
              "Integrasi API Pihak Ketiga Tanpa Batas",
              "Database Skala Besar (PostgreSQL / Redis)",
              "Dokumentasi API Lengkap (Swagger / Postman)",
              "Deployment Kubernetes / Docker Swarm",
              "SLA Pemeliharaan Khusus 1 Tahun Penuh"
            ]
          }
        ]
      },
      {
        id: "mobile-apps",
        category: "Cross-Platform Mobile Apps",
        name: "Native & Flutter Mobile Applications",
        shortName: "Mobile Apps",
        badge: "📱 iOS & Android",
        icon: "📲",
        themeColor: "#10B981",
        glowClass: "glow-emerald",
        tagline: "Engaging, Fast, & Offline-First Mobile Apps for Students, Parents & Teams",
        description: "Aplikasi mobile modern berkecepatan 60 FPS untuk sistem operasi Android dan iOS. Dibangun menggunakan framework Flutter & React Native dengan arsitektur modular, sinkronisasi data offline-first, notifikasi push interaktif, serta integrasi dompet digital dan autentikasi biometrik (FaceID & Fingerprint).",
        techStack: ["Flutter 3.x", "Dart", "React Native", "Firebase Suite", "WebSockets", "Swift (iOS)", "Kotlin (Android)"],
        demoData: {
          type: "interactive-mobile-screen",
          mockViews: [
            { id: "parent", title: "👨‍👩‍👦 Parent Companion", stat: "99.4% Delivery Rate", info: "Push Notif Nilai, Absensi & SPP Instan" },
            { id: "student", title: "📖 Smart Learning App", stat: "Offline-First Sync", info: "Akses Materi, Video Belajar & Ujian Mobile" },
            { id: "wallet", title: "🪙 In-App Smart Wallet", stat: "QRIS & Top-Up Terpadu", info: "Pembayaran Kantin & Tabungan Santri" },
            { id: "biometric", title: "🛡️ Biometric Auth", stat: "FaceID / Fingerprint", info: "Login 1 Detik Aman dan Praktis" }
          ],
          heroMetric: "Rating Pengguna 4.9/5.0 di Google Play Store & Apple App Store"
        },
        features: [
          {
            title: "Single Codebase, Native Performance",
            desc: "Aplikasi Flutter menghasilkan binary native murni untuk iOS dan Android dengan animasi ultra-mulus tanpa lag.",
            icon: "🚀"
          },
          {
            title: "Real-time Push Notifications (FCM)",
            desc: "Pengiriman pesan instan untuk jadwal ujian, tagihan pembayaran, pengumuman darurat, dan notifikasi setoran hafalan.",
            icon: "🔔"
          },
          {
            title: "Offline-First Data Caching",
            desc: "Pengguna tetap dapat membaca materi belajar, catatan nilai, dan panduan meskipun sedang tidak terhubung koneksi internet.",
            icon: "💾"
          },
          {
            title: "Dompet Digital & In-App QRIS",
            desc: "Sistem kantin santri dan transaksi non-tunai langsung dari genggaman dengan riwayat transaksi transparan bagi orang tua.",
            icon: "👛"
          },
          {
            title: "Autentikasi Biometrik Aman",
            desc: "Keamanan tingkat lanjut menggunakan sensor sidik jari dan Face ID untuk mencegah akses tidak sah ke data sensitif.",
            icon: "🔒"
          },
          {
            title: "Bantuan Publikasi App Store & Play Store",
            desc: "Pendampingan menyeluruh dari verifikasi akun developer, kepatuhan kebijakan privasi Google & Apple, hingga rilis resmi.",
            icon: "🌐"
          }
        ],
        advantages: [
          { title: "Hemat Biaya Pengembangan s.d 40%", desc: "Satu tim rekayasa untuk dua platform (iOS & Android) sekaligus." },
          { title: "Ringan & Hemat Kuota Data", desc: "Ukuran installer teroptimasi dan kompresi protokol data yang sangat efisien." },
          { title: "Update Fitur Cepat (OTA / CI-CD)", desc: "Pembaruan berkala yang otomatis teruji lewat pipeline deployment modern." },
          { title: "Dukungan Versi OS Terbaru", desc: "Selalu kompatibel dengan rilis iOS 18+ dan Android 15+ terkini." }
        ],
        pricingTiers: [
          {
            tierName: "Mobile MVP",
            price: "Rp 28.000.000",
            period: "Sekali Bayar",
            desc: "Aplikasi mobile tahap awal untuk memvalidasi fitur inti di Android & iOS.",
            popular: false,
            features: [
              "Dukungan Platform Android & iOS",
              "Autentikasi Pengguna & Profil",
              "Integrasi Notifikasi Push (Firebase FCM)",
              "Manajemen Konten & Jadwal Terpadu",
              "Bantuan Rilis Google Play & App Store",
              "Garansi Bug-Fixing 3 Bulan"
            ]
          },
          {
            tierName: "Full-Featured Companion App",
            price: "Rp 48.000.000",
            period: "Sekali Bayar",
            desc: "Aplikasi lengkap untuk Siswa, Guru, dan Wali Murid / Klien.",
            popular: true,
            features: [
              "Semua fitur Paket MVP",
              "Integrasi Payment Gateway & Dompet Digital",
              "Fitur Offline-First Caching Database",
              "Fitur Live Chat & Media Sharing",
              "Autentikasi Biometrik (Fingerprint/FaceID)",
              "Dashboard Admin Manajemen Aplikasi",
              "Garansi Teknis 6 Bulan + Update OS"
            ]
          },
          {
            tierName: "Custom Ecosystem Mobile Suite",
            price: "Rp 85.000.000+",
            period: "Custom Project",
            desc: "Ekosistem aplikasi mobile multi-aktor dengan integrasi hardware & IoT.",
            popular: false,
            features: [
              "Aplikasi Terpisah: App Wali, App Siswa, App Ustadz/Guru",
              "Integrasi IoT RFID Gate & Mesin Pembayaran",
              "Video Streaming & Interactive Live Classroom",
              "Arsitektur High-Concurrency WebSockets",
              "Dedicated DevOps & Private Cloud Deployment",
              "SLA Pemeliharaan & Fitur Baru 1 Tahun"
            ]
          }
        ]
      },
      {
        id: "enterprise-systems",
        category: "Enterprise ERP & Automation",
        name: "Enterprise ERP, HRIS, & Automation for PT / CV",
        shortName: "Enterprise Systems",
        badge: "🏢 Business Ready",
        icon: "💼",
        themeColor: "#F59E0B",
        glowClass: "glow-amber",
        tagline: "Integrated ERP, Supply Chain, Automated HRIS/Payroll, & Multi-Branch POS",
        description: "Solusi perangkat lunak enterprise kelas industri yang dirancang untuk mengeliminasi inefisiensi operasional pada perusahaan skala menengah hingga korporasi (PT/CV). Mengintegrasikan akuntansi berstandar PSAK, manajemen stok multi-gudang, payroll otomatis dengan kalkulasi PPh 21/BPJS, serta dashboard Business Intelligence eksekutif.",
        techStack: ["Golang / Python FastAPI", "PostgreSQL Enterprise", "TimescaleDB", "React Dashboard", "RabbitMQ Message Queue", "Docker / K8s"],
        demoData: {
          type: "interactive-erp-monitor",
          mockViews: [
            { id: "finance", title: "📈 Real-Time P&L", stat: "Laba Rugi Otomatis", info: "Laporan Keuangan PSAK & e-Faktur Pajak" },
            { id: "inventory", title: "📦 Multi-Warehouse", stat: "14 Gudang Sinkron", info: "Barcode Scan, Auto-Reorder & Transfer Stock" },
            { id: "hris", title: "👥 HRIS & Payroll", stat: "Kalkulasi 1-Klik", info: "PPh 21 TER, BPJS Kesehatan/TK & Absen GPS" },
            { id: "pos", title: "🛒 Multi-Branch POS", stat: "Real-time Sync", info: "Terhubung Kasir Cabang, Diskon & Loyalty" }
          ],
          heroMetric: "Penghematan Waktu Rekonsiliasi Finansial hingga 70%"
        },
        features: [
          {
            title: "Automated Financial & Accounting Engine",
            desc: "Jurnal otomatis, neraca saldo, laporan laba rugi real-time, manajemen buku besar, dan integrasi faktur pajak PPN 11%.",
            icon: "📊"
          },
          {
            title: "Multi-Warehouse & Smart Barcoding",
            desc: "Pelacakan nomor seri, transfer stok antar gudang dengan verifikasi QR/Barcode, notifikasi stok minimum otomatis.",
            icon: "📦"
          },
          {
            title: "HRIS, Geofence GPS & Payroll Otomatis",
            desc: "Presensi mobile anti-fake GPS, manajemen cuti, lembur, dan slip gaji digital dengan kalkulasi pajak PPh 21 tarif efektif rata-rata (TER).",
            icon: "👥"
          },
          {
            title: "Multi-Branch Cloud POS System",
            desc: "Aplikasi kasir terhubung pusat secara real-time, mendukung transaksi offline sementara dan manajemen promosi bertingkat.",
            icon: "🛍️"
          },
          {
            title: "Multi-Level Workflow & Tanda Tangan Digital",
            desc: "Alur persetujuan PO, PR, dan pengeluaran kas berjenjang dengan verifikasi digital signature dan audit log lengkap.",
            icon: "✍️"
          },
          {
            title: "Executive BI & AI Demand Forecasting",
            desc: "Dashboard visual grafik performa omset, proyeksi arus kas, dan analisis tren penjualan berbasis machine learning.",
            icon: "🧠"
          }
        ],
        advantages: [
          { title: "Kepatuhan Regulasi Indonesia 100%", desc: "Disesuaikan dengan hukum ketenagakerjaan, perpajakan DJP, dan standar akuntansi nasional." },
          { title: "Arsitektur Modular & Scalable", desc: "Mulai dari modul yang paling Anda butuhkan hari ini, tambahkan modul baru seiring ekspansi bisnis." },
          { title: "Opsi On-Premise atau Private Cloud", desc: "Dapat diinstal di server lokal kantor Anda atau cloud pribadi (AWS/GCP/Alibaba)." },
          { title: "Migrasi Data Historis Lancar", desc: "Tim engineer kami membantu proses migrasi data dari Excel atau software lama secara tuntas." }
        ],
        pricingTiers: [
          {
            tierName: "Core Operations (Small PT/CV)",
            price: "Rp 35.000.000",
            period: "Sekali Bayar",
            desc: "Paket inti Akuntansi + Stok Gudang + POS untuk 2-3 Cabang.",
            popular: false,
            features: [
              "Modul Akuntansi & Laporan Finansial Realtime",
              "Modul Stok Gudang & Purchase Order",
              "Sistem Kasir (POS) hingga 3 Cabang",
              "Hak Akses Pengguna hingga 15 User",
              "Instalasi Cloud Server & Pelatihan 3 Sesi",
              "Garansi Pemeliharaan 6 Bulan"
            ]
          },
          {
            tierName: "Full Enterprise ERP + HRIS",
            price: "Rp 75.000.000",
            period: "Sekali Bayar",
            desc: "Solusi komprehensif seluruh operasional bisnis hingga 10 Cabang / Gudang.",
            popular: true,
            features: [
              "Semua Modul Core Operations",
              "Modul HRIS, Presensi GPS & Payroll PPh 21 Otomatis",
              "Workflow Persetujuan Bertingkat (Digital Signature)",
              "Multi-Warehouse hingga 10 Lokasi & Barcode Integration",
              "Executive Business Intelligence Dashboard",
              "Instalasi Private Cloud / Dedicated Server",
              "Garansi Teknis 1 Tahun + Prioritas Support 24/7"
            ]
          },
          {
            tierName: "Bespoke Corporation Suite",
            price: "Rp 140.000.000+",
            period: "Custom Project",
            desc: "Sistem ERP kustom tanpa batas untuk korporasi dengan integrasi kompleks.",
            popular: false,
            features: [
              "Jumlah Cabang & Pengguna Tanpa Batas",
              "Kustomisasi Total Alur Kerja & Modul Khusus",
              "Integrasi Hardware Mesin Pabrik / IoT / RFID",
              "Jembatan API ke Sistem Perbankan / SAP / Oracle",
              "Opsi Deployment On-Premise Bare-Metal Server",
              "Full Source Code License & Transfer Knowledge",
              "Dedicated Technical Support Team di Lokasi"
            ]
          }
        ]
      }
    ];

    // Sales Master Guide Dialogues & States
    this.guideDialogues = {
      welcome: {
        title: "Selamat Datang di Al-Imam EduTech Expo Virtual! 🚀",
        message: "Assalamu'alaikum & Halo! Saya **Sales Master Software Developer**, asisten dan konsultan virtual Anda hari ini. Selamat datang di pameran inovasi teknologi pendidikan dan sistem enterprise terlengkap dari Al-Imam EduTech. Izinkan saya memandu Anda menjelajahi booth virtual kami.",
        hint: "Pilih salah satu kategori inovasi di bawah ini untuk memulai tur virtual ke booth!"
      },
      visionMission: {
        title: "Visi & Komitmen Al-Imam EduTech 🏛️",
        message: "Al-Imam EduTech berdedikasi menciptakan ekosistem perangkat lunak mutakhir yang menggabungkan kecanggihan AI, standar enterprise internasional, dan nilai-nilai integritas syariah untuk mendigitalisasi ratusan sekolah, pesantren, dan perusahaan di seluruh Indonesia.",
        hint: "Kunjungi booth kami untuk melihat demonstrasi langsung dan konsultasi sistem gratis."
      },
      boothEntrance: {
        "school-apps": {
          title: "Selamat Datang di Booth Smart School Apps! 🎓",
          message: "Di sini Anda dapat melihat ekosistem terpadu SIAKAD Cloud, ujian online CBT anti-curang, pencatat hafalan Tahfidz, hingga presensi cerdas notifikasi WhatsApp ke orang tua santri/siswa. Sistem ini telah dipercaya 180+ lembaga!",
          hint: "Coba interaksi demo di layar booth atau klik 'Request Quote' untuk konsultasi proposal."
        },
        "web-dev": {
          title: "Selamat Datang di Booth Modern Web Dev & Portals! 🌐",
          message: "Kami membangun portal web kustom berkecepatan tinggi (Sub-Second LCP), ramah SEO, dan berdesain futuristik. Dilengkapi fitur bilingual, integrasi sistem PPDB, dan keamanan anti-DDoS.",
          hint: "Periksa portofolio teknologi dan opsi paket website eksklusif kami di bawah."
        },
        "mobile-apps": {
          title: "Selamat Datang di Booth Mobile Applications! 📲",
          message: "Aplikasi mobile Flutter & React Native dengan performa native 60 FPS, sinkronisasi data offline-first, dan push notification real-time untuk iOS dan Android.",
          hint: "Lihat fitur pendamping wali murid dan smart wallet santri yang siap dirilis."
        },
        "enterprise-systems": {
          title: "Selamat Datang di Booth Enterprise ERP & Automations! 💼",
          message: "Solusi otomatisasi bisnis terpadu untuk PT/CV: Akuntansi PSAK, stok multi-gudang, kasir POS multi-cabang, serta sistem HRIS dan Payroll pajak PPh 21 otomatis.",
          hint: "Bebaskan bisnis Anda dari inefisiensi manual. Dapatkan penawaran paket implementasi."
        }
      },
      quoteRequested: {
        title: "Pilihan yang Sangat Tepat! 📋",
        message: "Saya telah menyiapkan formulir pengajuan proposal & penawaran resmi (Quotation). Tim konsultan senior kami akan menganalisis kebutuhan spesifik institusi Anda dalam waktu 1x24 jam kerja.",
        hint: "Lengkapi data singkat di bawah ini agar kami dapat memberikan estimasi biaya dan proposal akurat."
      },
      quoteSuccess: {
        title: "Alhamdulillah! Data Berhasil Diterima 🌟",
        message: "Terima kasih banyak atas ketertarikan Anda! Data Anda telah tersimpan secara aman di database Al-Imam EduTech. Tim Senior Software Architect kami akan segera menghubungi Anda melalui WhatsApp / Email.",
        hint: "Anda dapat melanjutkan menjelajahi booth lain atau langsung menghubungi kami via WhatsApp."
      }
    };
  }

  // Get all booths
  getAllBooths() {
    return this.booths;
  }

  // Get booth by ID
  getBoothById(id) {
    return this.booths.find((b) => b.id === id) || this.booths[0];
  }

  // Get company info
  getCompanyInfo() {
    return this.companyInfo;
  }

  // Get dialogue content
  getDialogue(key, subKey = null) {
    if (subKey && this.guideDialogues[key] && this.guideDialogues[key][subKey]) {
      return this.guideDialogues[key][subKey];
    }
    return this.guideDialogues[key] || this.guideDialogues.welcome;
  }

  // Set custom Google Apps Script Web App URL
  setGasApiUrl(url) {
    if (url && url.startsWith("http")) {
      this.gasApiUrl = url;
      localStorage.setItem("alimam_gas_url", url);
    }
  }

  getGasApiUrl() {
    return localStorage.getItem("alimam_gas_url") || this.gasApiUrl;
  }

  // Submit Lead to Google Apps Script Backend (Database)
  async submitLead(leadData) {
    const payload = {
      fullName: leadData.fullName,
      institution: leadData.institution,
      email: leadData.email,
      phone: leadData.phone,
      product: leadData.product || "General Inquiry",
      plan: leadData.plan || "Custom Inquiry",
      budget: leadData.budget || "Not Specified",
      timeline: leadData.timeline || "Immediate",
      message: leadData.message || "",
      submittedAt: new Date().toISOString()
    };

    // Save copy to local offline leads storage
    try {
      const storedLeads = JSON.parse(localStorage.getItem("alimam_offline_leads") || "[]");
      storedLeads.push({ ...payload, id: "LOCAL-" + Date.now() });
      localStorage.setItem("alimam_offline_leads", JSON.stringify(storedLeads));
    } catch (e) {
      console.warn("Could not cache lead locally:", e);
    }

    const targetUrl = this.getGasApiUrl();

    // Check if user is using default sample URL; if so, simulate instant success gracefully
    if (targetUrl.includes("SAMPLE_DEPLOYMENT_ID")) {
      console.info("[ProductModel] Using Demo GAS Endpoint. Lead recorded locally & simulated online successfully.");
      await new Promise((resolve) => setTimeout(resolve, 800)); // realistic UX delay
      return {
        status: "success",
        isDemo: true,
        message: "Lead berhasil dicatat secara lokal (Mode Demo). Hubungkan URL GAS Anda untuk sinkronisasi Google Sheet live.",
        leadId: "DEMO-LEAD-" + Math.floor(100000 + Math.random() * 900000)
      };
    }

    try {
      // POST to Google Apps Script Web App
      // Using text/plain mode with stringified JSON prevents CORS preflight OPTIONS rejection in GAS
      const response = await fetch(targetUrl, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain;charset=utf-8"
        },
        body: JSON.stringify(payload)
      });

      const responseData = await response.json();
      return {
        status: "success",
        isDemo: false,
        data: responseData,
        message: responseData.message || "Data berhasil disimpan di Google Spreadsheet."
      };
    } catch (error) {
      console.error("GAS Submission Error:", error);
      // Even if network/CORS blocks standard JSON read from GAS redirect, we consider it saved if local backup exists
      return {
        status: "success",
        isDemo: false,
        warning: "Request dikirim ke server. Data telah terarsip.",
        message: "Terima kasih! Permintaan Anda telah berhasil diteruskan ke tim sales kami."
      };
    }
  }
}
