# Algoritma Tabayyun: Media Pembelajaran Interaktif TV Touchscreen 65"

Aplikasi web pembelajaran interaktif berbasis Single-Page Application (SPA) yang dirancang khusus untuk layar sentuh besar 65 inch (aspek rasio 16:9), mengintegrasikan materi **Informatika (Berpikir Komputasional / Algoritma)** dan **Akidah Akhlak (Tabayyun & Etika Digital)** untuk siswa Kelas X Program Khusus Akademik.

---

## User Review & Critical Decisions

> [!IMPORTANT]
> Berdasarkan konfirmasi preferensi pengguna pada tahap klarifikasi:
> - **Mode Kontrol Sentuh**: Mode Ganda (**Pointer Drag-and-Drop** dengan transisi koordinat real-time DAN **Tap-to-Select & Tap-to-Place**) untuk menjamin keandalan 100% pada TV Touchscreen inframerah maupun kapasitif.
> - **Audio & Soundscape**: Audio sintetis berbasis **Web Audio API** (tanpa dependensi file audio eksternal yang rentan putus jaringan) untuk umpan balik sukses, peringatan bahaya, kartu flip, dan dentuman stempel akhir, lengkap dengan tombol **Mute/Unmute** di panel kontrol.
> - **Panduan Praktik Flowchart (Scene 3)**: Panduan adaptif dengan slot target interaktif, tombol reset per blok atau reset keseluruhan, serta tombol verifikasi sistem berpendar saat kelima blok terpasang.

---

## 1. Overview & Core Concept

- **Apa yang Dibangun**: Media pembelajaran multi-scene interaktif yang menantang nalar komputasional siswa untuk memetakan prinsip Tabayyun (Q.S. Al-Hujurat: 6) ke dalam struktur algoritma sekuensial dan percabangan (*Decision Branching*).
- **Target Pengguna**: Siswa Kelas X Program Khusus Akademik dan Guru Pengampu, berjarak pandang 1,5 – 3 meter dari layar TV Touchscreen 65 inch di ruang kelas atau laboratorium digital.
- **Nilai Edukatif Utama**: Menghubungkan abstraksi logika pemrograman (*Input*, *Processing*, *Decision/Branching*, *Output*) dengan akhlak verifikasi informasi digital di era banjir berita palsu/hoaks.

---

## 2. User Experience & Visual Design

### A. Estetika & Skema Visual: Cyber-Islamic Dark Elegance
- **Rasio & Skalabilitas Layar**: Dioptimalkan untuk resolusi $1920 \times 1080$ (16:9). Teks berukuran besar (`text-xl` hingga `text-5xl`), target sentuh minimal $64 \times 64\text{px}$, padding nyaman untuk interaksi ujung jari.
- **Palet Warna 60-30-10**:
  - **60% Latar Belakang / Kanvas**: Deep Navy / Midnight Slate (`#0B1120`, `#0F172A`) dengan grid geometris Islam cyber subtle (`pattern-dots` atau garis laser heksagonal lembut).
  - **30% Struktur & Kontainer**: Slate Card (`#1E293B`) dengan hairline border presisi (`#334155`).
  - **10% Semantic Accents**: 
    - **Neon Emerald / Cyan** (`#10B981` / `#06B6D4`): Simbol validitas, kebenaran, akhlak terpuji (*Mahmudah*).
    - **Neon Crimson / Coral** (`#EF4444` / `#F43F5E`): Simbol bahaya hoaks, mudharat, penyebaran tanpa cek.
    - **Amber / Gold** (`#F59E0B`): Simbol proses berpikir (*Processing* & *Decision*).
- **Tipografi**:
  - Judul Display: `Plus Jakarta Sans` / `Outfit` Bold dengan pelindung *text-wrap: balance*.
  - Teks Badan & Dialog: `DM Sans` / Sans-serif berkontras tinggi (skala 18px–24px) agar terbaca jelas dari jarak 2 meter.
  - Anotasi Logika: `font-mono tabular-nums` untuk status pergerakan dan node flowchart.

### B. Alur Antar-Scene (4 Tahap Pembelajaran)

```
┌────────────────────────────────────────────────────────────────────────┐
│                   SCENE 1: UJI REFLEKS JARI (HOOK)                     │
│  Kartu Pesan Provokatif ("BOCORAN KUNCI JAWABAN UJIAN BESOK!")        │
│          ↙                                              ↘              │
│  [MERAH: LANGSUNG SEBARKAN]                   [HIJAU: TAHAN & CEK]     │
│  Efek: Screen Shake + Danger Alert            Efek: Sukses + Lanjut    │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ (Tombol Lanjut ke Konsep)
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│               SCENE 2: FLASHCARD ANALOGI KONSEP (INTERAKTIF)           │
│  4 Kartu 3D Flip Memetakan Informatika <===> Akidah Akhlak             │
│  1. Input Data         <==> Menerima Informasi                         │
│  2. Processing         <==> Cek Sanad / Sumber (Tabayyun)              │
│  3. Decision (If/Else) <==> Bermanfaat atau Mudharat?                  │
│  4. Output             <==> Diam atau Bagikan                          │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ (Tombol Mulai Tantangan)
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│               SCENE 3: PRAKTIK INTI FLOWCHART ALGORITMA TABAYYUN       │
│  Kerangka Flowchart Kosong dengan Jalur Panah Berpendar                │
│  Slot 1 (Mulai) ──> Slot 2 (Proses) ──> Slot 3 (Decision Belah Ketupat)│
│                                           ├── True  ──> Slot 5 (Share) │
│                                           └── False ──> Slot 4 (Hapus) │
│  5 Blok Pilihan di Bawah (Dual-mode: Drag & Drop + Tap-to-Place)       │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ (Tombol "Verifikasi Sistem" Menyala)
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                   SCENE 4: WRAP UP & STEMPEL AKHLAK                    │
│  Animasi Stempel Raksasa Berpendar: "SYSTEM VERIFIED: AKHLAK DETECTED" │
│  Quote Epik Integrasi Hardware & OS Akhlak                             │
│  Tombol Ulangi Simulasi / Mode Demonstrasi                             │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Key Product Decisions & Trade-Offs

- **Dual Interaction Engine (Pointer + Tap-to-Move)**:
  - *Keputusan*: Mendukung Pointer Events (`pointerdown`, `pointermove`, `pointerup`) untuk drag visual yang responsif, serta mekanisme fallback *Tap-to-Select* (blok menyala) $\rightarrow$ *Tap-Slot* (blok langsung menempati posisi).
  - *Alasan*: Pada layar sentuh 65" di kelas, permukaan kaca terkadang memiliki gesekan (*friction*) atau interferensi inframerah multi-sentuh. Dukungan ganda memastikan tidak ada interaksi macet saat demonstrasi di depan kelas.
- **Web Audio API Sound Synthesizer**:
  - *Keputusan*: Membuat sound generator mandiri (nada chime sukses, klakson bahaya/buzz, flip swish, dan bass thud untuk stempel) langsung di browser.
  - *Alasan*: Tidak membutuhkan unduhan audio MP3 eksternal yang lambat atau diblokir CORS.
- **Standalone Single File Delivery & Modern Bundle**:
  - *Keputusan*: Aplikasi dibangun dalam React + Tailwind CSS modular di Vite, sekaligus menyertakan modal "Ekspor Single File HTML Mandiri" yang dapat diunduh langsung untuk disimpan di USB drive TV Touchscreen jika dijalankan tanpa internet.

---

## 4. Technical Architecture & State Strategy

### A. State Diagram

```
[Current Scene: 1 | 2 | 3 | 4]
       │
       ├── Scene 1: { cardPosition, dragOffset, alertStatus: 'idle' | 'danger' | 'verified' }
       ├── Scene 2: { flippedCards: Set<number>, allFlipped: boolean }
       ├── Scene 3: { 
       │       slots: { slot1: BlockId, slot2: BlockId, ... },
       │       selectedBlock: BlockId | null,
       │       isVerified: boolean,
       │       feedbackMessage: string | null
       │   }
       └── Scene 4: { stampVisible: boolean, quoteRevealed: boolean }
```

### B. Mapping Blok Algoritma ke Simbol Standar Flowchart
1. **Slot 1 (Mulai / Terminator)**: Oval (`rounded-full`) $\rightarrow$ *"Mulai: Terima Informasi"*
2. **Slot 2 (Proses)**: Persegi Panjang tajam $\rightarrow$ *"Cek Validitas Sumber Info (Tabayyun)"*
3. **Slot 3 (Keputusan / Decision)**: Belah Ketupat (*Diamond* geometri SVG/CSS) $\rightarrow$ *"Apakah info benar & bermanfaat?"*
4. **Slot 4 (Cabang False / Tidak)**: Jajar Genjang (*Parallelogram*) $\rightarrow$ *"Hapus & Abaikan"*
5. **Slot 5 (Cabang True / Ya)**: Jajar Genjang (*Parallelogram*) $\rightarrow$ *"Sebarkan demi Kebaikan"*

---

## 5. Verification Plan

1. **Uji Responsivitas 16:9 & Touch Target**: Memastikan seluruh tombol dan kartu berukuran $\ge 64\text{px}$ dan skala UI proporsional pada desktop dan fullscreen 1080p.
2. **Uji Dual Control**: Menguji drag-and-drop pointer jari serta mekanisme sentuh-lalu-pilih (*tap-to-place*).
3. **Uji Validasi Logika Flowchart**: Memverifikasi bahwa tombol *"Verifikasi Sistem"* hanya aktif atau memberikan hasil valid ketika kelima blok ditempatkan sesuai urutan kaidah Informatika & Akidah Akhlak.
4. **Uji Kompilasi Kode**: Memastikan tidak ada error lint dan aplikasi lulus build Vite dengan sempurna (`compile_applet`).
