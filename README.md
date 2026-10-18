# Algoritma Tabayyun - Media Pembelajaran Interaktif TV Touchscreen 65"

Media pembelajaran interaktif menggabungkan materi **Informatika (Berpikir Komputasional & Algoritma)** dan **Akidah Akhlak (Tabayyun & Etika Digital)** untuk siswa Kelas X Program Khusus Akademik.

---

## 🚀 Panduan Deploy ke GitHub Pages (Bebas Masalah Layar Putih / Blank White)

Masalah **layar putih kosong (blank white screen)** saat deploy ke GitHub umumnya disebabkan oleh dua hal:
1. **Path Asset Relatif**: Vite secara bawaan menggunakan path absolut (`/assets/...`). Kami telah memperbaikinya dengan menambahkan `base: './'` di `vite.config.ts` sehingga seluruh script dan file CSS terbaca relatif terhadap nama repositori Anda.
2. **Metode Deploy GitHub Pages**: GitHub Pages membutuhkan hasil kompilasi folder `dist`, bukan file mentah `.tsx`.

### Cara 1: Menggunakan GitHub Actions (Paling Mudah & Otomatis - Sangat Direkomendasikan)
File workflow `.github/workflows/deploy.yml` sudah kami siapkan di repositori ini.
1. Masuk ke repositori Anda di GitHub.
2. Klik tab **Settings** > **Pages** (di bilah kiri).
3. Pada bagian **Build and deployment** > **Source**, ubah dari *"Deploy from a branch"* menjadi **"GitHub Actions"**.
4. Lakukan commit/push ke branch `main`. GitHub akan secara otomatis mengompilasi dan men-deploy web app Anda dengan sempurna!

### Cara 2: Deploy Branch `gh-pages` (Manual Build)
Jika Anda menggunakan *Deploy from a branch*:
1. Jalankan di terminal:
   ```bash
   npm install
   npm run build
   ```
2. Isi folder `dist` adalah file web statis yang siap di-deploy ke branch `gh-pages` atau hosting manapun.

### Cara 3: Menggunakan File Tunggal Mandiri (Offline / USB TV)
File `public/algoritma-tabayyun-standalone.html` merupakan versi 100% mandiri (menggabungkan Tailwind CSS CDN, React CDN, Babel, dan audio synthesizer).
- File ini dapat langsung dibuka dengan cara klik ganda di peramban (Chrome, Edge, Firefox).
- Sangat cocok disalin ke flashdisk USB untuk ditancapkan langsung ke TV Touchscreen 65" di ruang kelas tanpa memerlukan koneksi internet.

---

## 🎮 Kontrol & Fitur Touchscreen TV 65 Inch
- **Mode Sentuh Ganda**: Mendukung gestur seret-lepas jari (*pointer drag-and-drop*) dan sentuh-lalu-pindah (*tap-to-place*).
- **Audio Synthesizer Offline**: Suara bel peringatan hoaks, lonceng apresiasi tabayyun, dan dentuman stempel akhir dihasilkan melalui Web Audio API tanpa file MP3 eksternal.
- **Tombol Cepat**:
  - `M`: Bisukan / aktifkan suara (*Mute*)
  - `R`: Ulangi simulasi dari awal (*Reset*)
  - `Panah Kanan / Kiri`: Navigasi antar-scene
