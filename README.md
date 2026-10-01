# 🚀 Al-Imam EduTech - Virtual Open House & Expo 2026

Selamat datang di repositori **Al-Imam EduTech Virtual Expo & Open House** — platform pameran virtual interaktif berbasis web modern dengan ilusi 3D Parallax tanpa WebGL berat, arsitektur **Strict MVC (Model-View-Controller)** menggunakan Vanilla ES6+ JavaScript, dan database backend **Google Apps Script (GAS) REST API** yang terhubung langsung ke Google Sheets.

---

## 🏛️ Arsitektur Proyek (Strict MVC)

Proyek ini dibangun secara modular dan terstruktur:

```
/
├── public/
│   ├── css/
│   │   └── style.css            # Desain Cyberpunk Expo, 3D Parallax, keyframes gelembung melayang, & modal glassmorphism
│   ├── js/
│   │   ├── models/
│   │   │   └── ProductModel.js  # Data Booth, Pricing, Company Info, Dialog Panduan, & Integrasi API Leads GAS
│   │   ├── views/
│   │   │   └── ExpoView.js      # Rendering DOM, Efek 3D Parallax, Avatar 2.5D, Simulator Interaktif, Dialog Suara & Modal
│   │   ├── controllers/
│   │   │   └── ExpoController.js# Pengontrol Event, Routing (#lobby, #booth-id), Navigasi Keyboard, & Form Submission
│   │   └── app.js               # Entry point inisialisasi instance Model, View, dan Controller
│   └── index.html               # Kanvas Utama Expo Virtual & Tag SEO
├── backend/
│   └── code.gs                  # Google Apps Script untuk doPost() endpoint, CORS handling & Database Spreadsheet
├── vercel.json                  # Konfigurasi routing & CI/CD deployment di Vercel
└── README.md                    # Dokumentasi lengkap proyek & panduan deployment
```

---

## ✨ Fitur & Keunggulan Utama

1. **The Grand Lobby (2.5D Animated Avatar Guide)**:
   - Disambut oleh asisten virtual **"Sales Master Software Developer"** dengan animasi hologram dan efek suara Web Audio API.
   - Visi & Misi Al-Imam EduTech dalam transformasi teknologi pendidikan islami dan otomasi enterprise.
   - 4 Gelembung Melayang (*Interactive Floating 3D Bubbles*) untuk kategori produk:
     - 🎓 **Smart School & Islamic EdTech Ecosystem** (SIAKAD Cloud, CBT Anti-Cheat, Tahfidz Tracker, Presensi RFID WA).
     - 🌐 **Modern Web Development & Portals** (High-Performance Edge Web, Arab RTL Ready, PPDB Terintegrasi).
     - 📲 **Cross-Platform Mobile Apps** (Flutter iOS & Android, Offline Sync, In-App Smart Wallet).
     - 💼 **Enterprise ERP & Systems for PT/CV** (Otomasi Akuntansi PSAK, Multi-Gudang, HRIS & Payroll PPh 21 Otomatis).

2. **The Guided Tour (Smooth 3D Hallway Walkthrough)**:
   - Transisi kamera *warp zoom* 3D saat memilih kategori, mensimulasikan berjalan di lorong *Convention Hall (JCC Senayan Mode)*.
   - Guide HUD tetap tersemat (*pinned*) di samping layar mendampingi dan menjelaskan isi setiap booth.

3. **Virtual Booths & Live Simulator**:
   - Simulator interaktif UI/UX sistem dengan tab berganti real-time.
   - Matriks 6 Fitur Unggulan, Keunggulan Kompetitif, dan Rincian Paket Harga (*Pricing Tiers*).
   - Tombol CTA **Request Quote & Proposal** dan **Download Digital Catalog (PDF)**.

4. **Integrasi Database Google Sheets Realtime**:
   - Pengiriman formulir penawaran via `fetch()` POST ke endpoint Google Apps Script.
   - Pencatatan otomatis ID Lead, Nama, Institusi, WhatsApp, Kategori, Budget, dan Catatan Kebutuhan ke Google Spreadsheet.

---

## 🛠️ Panduan Setup & Deployment

### 1. Menyiapkan Backend Google Apps Script (Database Spreadsheet)
1. Buat **Google Spreadsheet** baru di [Google Drive](https://drive.google.com).
2. Beri nama spreadsheet, misalnya: `Database Leads Al-Imam EduTech Expo`.
3. Buka menu **Extensions (Ekstensi)** > **Apps Script**.
4. Hapus seluruh kode bawaan, lalu salin dan tempel seluruh isi dari file [`backend/code.gs`](file:///backend/code.gs).
5. (Opsional) Jika ingin menerima notifikasi email saat ada lead baru, isi variabel `NOTIFICATION_EMAIL = "emailanda@domain.com";` di baris atas `code.gs`.
6. Klik tombol **Deploy** di pojok kanan atas > **New deployment**.
7. Pilih jenis: **Web app**.
   - **Description**: `Al-Imam EduTech Expo API v1`
   - **Execute as**: `Me (email Anda)`
   - **Who has access**: `Anyone` *(Penting agar website virtual expo dapat mengirim data tanpa login akun Google)*.
8. Klik **Deploy** dan berikan izin otorisasi (*Authorize access*).
9. Salin **Web App URL** yang dihasilkan (format: `https://script.google.com/macros/s/AKfy.../exec`).

### 2. Menghubungkan Web App URL ke Frontend
- Buka website Virtual Expo.
- Klik tombol **⚙️ GAS API** di bilah navigasi kanan atas.
- Tempelkan Web App URL Anda, lalu klik **Simpan Konfigurasi**.
- Nilai URL akan otomatis tersimpan di `localStorage` dan formulir akan langsung menulis baris baru di Google Sheet Anda!

---

### 3. Panduan Deploy ke Vercel via GitHub (CI/CD)

1. **Inisialisasi Git dan Push ke GitHub**:
   ```bash
   git init
   git add .
   git commit -m "feat: Al-Imam EduTech Virtual Expo MVC with GAS integration"
   git branch -M main
   git remote add origin https://github.com/USERNAME/al-imam-edutech-expo.git
   git push -u origin main
   ```

2. **Deploy di Vercel**:
   - Masuk ke dashboard [Vercel](https://vercel.com).
   - Klik **Add New Project** > **Import Git Repository**.
   - Pilih repositori `al-imam-edutech-expo` yang baru Anda buat.
   - Vercel akan otomatis membaca file konfigurasi `vercel.json`.
   - Klik **Deploy**.
   - Dalam beberapa detik, website Virtual Expo Anda aktif secara live dengan domain global Vercel HTTPS gratis!

---

## ⌨️ Pintasan Keyboard (Keyboard Shortcuts)
- <kbd>Esc</kbd>: Menutup modal / Kembali ke Lobby Utama dari booth manapun.
- <kbd>→</kbd> (Panah Kanan): Berpindah ke booth virtual berikutnya di lorong expo.
- <kbd>←</kbd> (Panah Kiri): Berpindah ke booth virtual sebelumnya.

---

## 📄 Lisensi
Hak Cipta © 2026 **Al-Imam EduTech**. Seluruh Hak Cipta Dilindungi Undang-Undang.
