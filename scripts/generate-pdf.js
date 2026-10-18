import { jsPDF } from 'jspdf';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const doc = new jsPDF({
  orientation: 'portrait',
  unit: 'mm',
  format: 'a4', // 210 x 297 mm
});

const pageWidth = 210;
const pageHeight = 297;
const margin = 18;
const contentWidth = pageWidth - margin * 2;

// Colors
const COLOR_PRIMARY = [16, 185, 129]; // Emerald #10B981
const COLOR_NAVY = [15, 23, 42];     // Deep Slate #0F172A
const COLOR_MUTED = [100, 116, 139];  // Slate 500
const COLOR_DARK = [30, 41, 59];     // Slate 800

function addHeaderFooter(pageNum, totalPages) {
  if (pageNum === 1) return; // Skip cover
  
  // Header
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(...COLOR_MUTED);
  doc.text('BUKU PANDUAN GURU // ALGORITMA TABAYYUN (KELAS X AKADEMIK)', margin, 12);
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.3);
  doc.line(margin, 14, pageWidth - margin, 14);

  // Footer
  doc.line(margin, pageHeight - 12, pageWidth - margin, pageHeight - 12);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.text('Integrasi Informatika & Akidah Akhlak | Media TV Touchscreen 65"', margin, pageHeight - 8);
  doc.setFont('helvetica', 'bold');
  doc.text(`Halaman ${pageNum} dari ${totalPages}`, pageWidth - margin, pageHeight - 8, { align: 'right' });
}

// ==========================================
// HALAMAN 1: COVER
// ==========================================
// Background subtle frame
doc.setFillColor(248, 250, 252);
doc.rect(margin - 4, margin - 4, contentWidth + 8, pageHeight - (margin - 4) * 2, 'F');
doc.setDrawColor(...COLOR_PRIMARY);
doc.setLineWidth(1.5);
doc.rect(margin - 4, margin - 4, contentWidth + 8, pageHeight - (margin - 4) * 2, 'S');

// Top badge
doc.setFillColor(...COLOR_NAVY);
doc.roundedRect(margin + 4, margin + 12, contentWidth - 8, 12, 3, 3, 'F');
doc.setFont('helvetica', 'bold');
doc.setFontSize(9);
doc.setTextColor(...COLOR_PRIMARY);
doc.text('DOKUMEN KURIKULUM INTEGRATIF RESMI // PEGANGAN GURU', pageWidth / 2, margin + 19.5, { align: 'center' });

// Main Title
doc.setFont('helvetica', 'bold');
doc.setFontSize(26);
doc.setTextColor(...COLOR_NAVY);
doc.text('BUKU PANDUAN GURU', pageWidth / 2, 70, { align: 'center' });

doc.setFontSize(28);
doc.setTextColor(...COLOR_PRIMARY);
doc.text('ALGORITMA TABAYYUN', pageWidth / 2, 82, { align: 'center' });

// Subtitle
doc.setFont('helvetica', 'normal');
doc.setFontSize(12);
doc.setTextColor(...COLOR_DARK);
doc.text('Konvergensi Berpikir Komputasional (Informatika) & Etika Digital (Akidah Akhlak)', pageWidth / 2, 94, { align: 'center' });
doc.text('Media Pembelajaran Interaktif TV Touchscreen 65 Inch (Rasio 16:9)', pageWidth / 2, 101, { align: 'center' });

// Decorative Divider
doc.setDrawColor(...COLOR_PRIMARY);
doc.setLineWidth(0.8);
doc.line(pageWidth / 2 - 35, 110, pageWidth / 2 + 35, 110);

// Key Quote Box
doc.setFillColor(241, 245, 249);
doc.roundedRect(margin + 10, 122, contentWidth - 20, 42, 4, 4, 'F');
doc.setDrawColor(203, 213, 225);
doc.setLineWidth(0.4);
doc.roundedRect(margin + 10, 122, contentWidth - 20, 42, 4, 4, 'S');

doc.setFont('helvetica', 'bold');
doc.setFontSize(10);
doc.setTextColor(...COLOR_PRIMARY);
doc.text('METAFORA INTEGRATIF UTAMA:', pageWidth / 2, 132, { align: 'center' });

doc.setFont('helvetica', 'bolditalic');
doc.setFontSize(11);
doc.setTextColor(...COLOR_NAVY);
const quote = '"Kecerdasan otakmu adalah Hardware, tapi Akhlakmu adalah Operating System (OS). Jangan biarkan hoax menjadi virus yang merusak sistemmu."';
const splitQuote = doc.splitTextToSize(quote, contentWidth - 32);
doc.text(splitQuote, pageWidth / 2, 142, { align: 'center' });

// Metadata Card
doc.setFillColor(255, 255, 255);
doc.roundedRect(margin + 10, 180, contentWidth - 20, 65, 3, 3, 'F');
doc.setDrawColor(226, 232, 240);
doc.roundedRect(margin + 10, 180, contentWidth - 20, 65, 3, 3, 'S');

doc.setFont('helvetica', 'bold');
doc.setFontSize(10);
doc.setTextColor(...COLOR_NAVY);
doc.text('INFORMASI MODUL PEMBELAJARAN', margin + 18, 192);

doc.setFont('helvetica', 'normal');
doc.setFontSize(9.5);
doc.setTextColor(...COLOR_DARK);
doc.text('• Sasaran Peserta Didik :', margin + 18, 202);
doc.text('Kelas X Program Khusus Akademik (Madrasah Aliyah / SMA)', margin + 64, 202);

doc.text('• Mata Pelajaran Terpadu :', margin + 18, 210);
doc.text('Informatika (Algoritma) & Akidah Akhlak (Adab Digital)', margin + 64, 210);

doc.text('• Alokasi Waktu :', margin + 18, 218);
doc.text('1 Pertemuan (2 Jam Pelajaran @ 45 Menit)', margin + 64, 218);

doc.text('• Fitur Khusus :', margin + 18, 226);
doc.text('Dual Touch Control, Web Audio Synth, Standalone Offline', margin + 64, 226);

doc.text('• Tautan Aplikasi Web :', margin + 18, 234);
doc.setTextColor(2, 132, 199);
doc.text('https://naratama45.github.io/informatikawithsobu/', margin + 64, 234);

doc.setFont('helvetica', 'italic');
doc.setFontSize(8.5);
doc.setTextColor(...COLOR_MUTED);
doc.text('Edisi Kurikulum Khusus 2026 // Disusun untuk Guru Pengampu', pageWidth / 2, 275, { align: 'center' });

// ==========================================
// HALAMAN 2: BAB I & BAB II
// ==========================================
doc.addPage();

doc.setFont('helvetica', 'bold');
doc.setFontSize(15);
doc.setTextColor(...COLOR_NAVY);
doc.text('BAB I: RASIONALITAS PEDAGOGIS & METAFORA OS', margin, 24);

doc.setDrawColor(...COLOR_PRIMARY);
doc.setLineWidth(0.6);
doc.line(margin, 27, margin + 80, 27);

doc.setFont('helvetica', 'normal');
doc.setFontSize(9.5);
doc.setTextColor(...COLOR_DARK);

const bab1Text = 
  "Pendidikan abad ke-21 sering memisahkan kemampuan teknis dengan pembinaan moral. Siswa sangat mahir mengoperasikan perangkat dan memahami kode komputasi, namun rentan terperdaya hoaks, bias konfirmasi, dan perundungan siber. " +
  "Modul 'Algoritma Tabayyun' mendudukkan prinsip verifikasi syariat (Tabayyun) sebagai sebuah algoritma kognitif dan moral yang wajib dijalankan sebelum data disebarluaskan.\n\n" +
  "Kecerdasan nalar diibaratkan sebagai Hardware (prosesor berkecepatan tinggi), sedangkan akhlakul karimah adalah Operating System (OS/Kernel) yang mengontrol masukan/keluaran data dan mendeteksi script berbahaya.";

const splitBab1 = doc.splitTextToSize(bab1Text, contentWidth);
doc.text(splitBab1, margin, 34);

// Box Hardware vs OS
doc.setFillColor(241, 245, 249);
doc.roundedRect(margin, 58, contentWidth, 34, 3, 3, 'F');
doc.setDrawColor(203, 213, 225);
doc.rect(margin, 58, contentWidth, 34, 'S');

doc.setFont('helvetica', 'bold');
doc.setFontSize(9.5);
doc.setTextColor(14, 116, 144); // Cyan
doc.text('HARDWARE (Informatika)', margin + 6, 66);
doc.setFont('helvetica', 'normal');
doc.setFontSize(8.5);
doc.setTextColor(...COLOR_DARK);
doc.text('• Kapasitas kognitif & kecepatan analisis logika.', margin + 6, 73);
doc.text('• Sintaksis pemodelan matematika & data stream.', margin + 6, 79);
doc.text('• Tanpa OS: Mengeksekusi instruksi destruktif tanpa nurani.', margin + 6, 85);

doc.setFont('helvetica', 'bold');
doc.setFontSize(9.5);
doc.setTextColor(5, 150, 105); // Emerald
doc.text('OPERATING SYSTEM (Akidah Akhlak)', margin + contentWidth / 2 + 4, 66);
doc.setFont('helvetica', 'normal');
doc.setFontSize(8.5);
doc.setTextColor(...COLOR_DARK);
doc.text('• Kernel etika pengontrol I/O (Input / Output).', margin + contentWidth / 2 + 4, 73);
doc.text('• Firewall penyaring disinformasi (Q.S. Al-Hujurat: 6).', margin + contentWidth / 2 + 4, 79);
doc.text('• Mencegah sistem crash dan kehancuran peradaban.', margin + contentWidth / 2 + 4, 85);

// BAB II
doc.setFont('helvetica', 'bold');
doc.setFontSize(15);
doc.setTextColor(...COLOR_NAVY);
doc.text('BAB II: DEKONSTRUKSI 4 SCENE MEDIA PEMBELAJARAN', margin, 104);

doc.setDrawColor(...COLOR_PRIMARY);
doc.setLineWidth(0.6);
doc.line(margin, 107, margin + 95, 107);

const scenesData = [
  {
    num: 'SCENE 01',
    title: 'Uji Refleks Jari (The Hook & Dual-Process Theory)',
    desc: 'Mensimulasikan pesan WhatsApp darurat "Bocoran Kunci Ujian". Menguji impulsivitas jempol siswa antara System 1 (cepat, reaktif) vs System 2 (analitis). Geser ke Merah memicu getar layar dan alarm bahaya; geser ke Hijau melatih menahan diri (Tabayyun).'
  },
  {
    num: 'SCENE 02',
    title: 'Konsep 4 Tahap (Interactive Flashcards 3D)',
    desc: 'Memetakan 4 konsep komputasi dengan adab Islam: (1) Input Data <-> Menerima Informasi (Wurudul Khabar), (2) Processing <-> Cek Sanad & Sumber, (3) Decision If/Else <-> Kaidah Maslahat vs Mudharat, (4) Output <-> Berkata Baik atau Diam.'
  },
  {
    num: 'SCENE 03',
    title: 'Praktik Flowchart Algoritma Tabayyun (Standar ISO)',
    desc: 'Siswa menyusun 5 blok acak ke kerangka flowchart terhubung: Oval (Mulai), Persegi Panjang (Proses Verifikasi), Belah Ketupat (Keputusan Boolean), dan Jajar Genjang (Cabang True/False). Dilengkapi fitur Tap-to-Move stabil di TV 65".'
  },
  {
    num: 'SCENE 04',
    title: 'Wrap-Up & Stempel Akhlak (Evaluasi Sistem)',
    desc: 'Stempel berdentum "SYSTEM VERIFIED: AKHLAK DETECTED" menandai integritas siswa yang berhasil menundukkan kecerdasan komputasi di bawah panduan adab digital mulia.'
  }
];

let curY = 114;
scenesData.forEach((sc) => {
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(margin, curY, contentWidth, 31, 2, 2, 'F');
  doc.setDrawColor(226, 232, 240);
  doc.rect(margin, curY, contentWidth, 31, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(...COLOR_PRIMARY);
  doc.text(sc.num, margin + 4, curY + 6);

  doc.setFontSize(10);
  doc.setTextColor(...COLOR_NAVY);
  doc.text(sc.title, margin + 24, curY + 6);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(...COLOR_DARK);
  const splitDesc = doc.splitTextToSize(sc.desc, contentWidth - 8);
  doc.text(splitDesc, margin + 4, curY + 13);

  curY += 36;
});

// ==========================================
// HALAMAN 3: BAB III (3 PERTANYAAN KRITIS SISWA - BAGIAN 1)
// ==========================================
doc.addPage();

doc.setFont('helvetica', 'bold');
doc.setFontSize(15);
doc.setTextColor(...COLOR_NAVY);
doc.text('BAB III: 3 PERTANYAAN KRITIS SISWA & JAWABAN SISTEMATIS', margin, 24);

doc.setDrawColor(...COLOR_PRIMARY);
doc.setLineWidth(0.6);
doc.line(margin, 27, margin + 115, 27);

doc.setFont('helvetica', 'italic');
doc.setFontSize(8.5);
doc.setTextColor(...COLOR_MUTED);
doc.text('Pertanyaan tingkat tinggi (HOTS) yang lazim ditanyakan siswa cerdas Kelas X beserta panduan jawaban guru:', margin, 33);

// Q1
doc.setFillColor(241, 245, 249);
doc.roundedRect(margin, 38, contentWidth, 110, 3, 3, 'F');
doc.setDrawColor(186, 230, 253);
doc.rect(margin, 38, contentWidth, 110, 'S');

doc.setFont('helvetica', 'bold');
doc.setFontSize(10);
doc.setTextColor(2, 132, 199);
doc.text('PERTANYAAN 1: DILEMA FAKTA VS KEMASLAHATAN (GHIPAH & PRIVASI)', margin + 6, 46);

doc.setFont('helvetica', 'bolditalic');
doc.setFontSize(9);
doc.setTextColor(...COLOR_NAVY);
const q1 = '"Pak/Bu Guru, di Scene 3 syarat decision-nya adalah "Apakah info benar DAN bermanfaat?". Bagaimana jika informasinya 100% fakta (ada rekaman video, bukan hoaks), tapi membongkar aib masa lalu teman atau guru? Secara data nilainya True. Apakah kita tetap boleh menyebarkannya?"';
const splitQ1 = doc.splitTextToSize(q1, contentWidth - 12);
doc.text(splitQ1, margin + 6, 53);

doc.setFont('helvetica', 'bold');
doc.setFontSize(9);
doc.setTextColor(...COLOR_PRIMARY);
doc.text('PANDUAN JAWABAN DETAIL & SISTEMATIS UNTUK GURU:', margin + 6, 73);

doc.setFont('helvetica', 'normal');
doc.setFontSize(8.5);
doc.setTextColor(...COLOR_DARK);

const q1Answer = [
  "1. Dekonstruksi Operator Logika Boolean AND (&&):",
  "   Kondisi di flowchart berbunyi: if (isTrue && isBeneficial). Jika isTrue bernilai 1 (Benar/Faktual) tetapi",
  "   isBeneficial bernilai 0 (Membuka aib, memicu perundungan), maka hasil ekspresi secara matematis bernilai 0",
  "   (FALSE)! Maka sistem wajib membelokkan alur ke cabang FALSE: Hapus & Abaikan, bukan disebarkan.",
  "",
  "2. Tinjauan Syariat Islam tentang Hakikat Ghibah (HR. Muslim No. 2589):",
  "   Rasulullah SAW bersabda: 'Ghibah adalah membicarakan saudaramu tentang apa yang tidak ia sukai.' Ketika sahabat",
  "   bertanya bagaimana jika fakta itu benar ada padanya, beliau menegaskan: 'Jika itu benar ada padanya, engkau telah",
  "   mengghibahinya; jika tidak ada, engkau telah memfitnahnya.' Keduanya dosa yang merusak tatanan sosial.",
  "",
  "3. Tinjauan Hukum Siber Modern (Data Privacy & UU PDP No. 27/2022):",
  "   Menyebarkan data pribadi (PII) tanpa hak (doxxing) adalah tindak pidana kejahatan siber internasional (GDPR).",
  "   Kebenaran tanpa izin pemilik data tetap merupakan kejahatan hukum siber."
];

let ansY = 80;
q1Answer.forEach((line) => {
  doc.text(line, margin + 6, ansY);
  ansY += 4.5;
});

// Q2
doc.setFillColor(241, 245, 249);
doc.roundedRect(margin, 154, contentWidth, 115, 3, 3, 'F');
doc.setDrawColor(254, 215, 170);
doc.rect(margin, 154, contentWidth, 115, 'S');

doc.setFont('helvetica', 'bold');
doc.setFontSize(10);
doc.setTextColor(217, 119, 6);
doc.text('PERTANYAAN 2: VALIDASI OTORITAS & BIAS INSTITUSIONAL (ZERO TRUST)', margin + 6, 162);

doc.setFont('helvetica', 'bolditalic');
doc.setFontSize(9);
doc.setTextColor(...COLOR_NAVY);
const q2 = '"Bagaimana jika sumber resmi, media arus utama yang terverifikasi, atau tokoh berotoritas itu sendiri yang memanipulasi data demi kepentingan politik/finansial mereka? Apakah kita tetap harus percaya hanya karena labelnya resmi?"';
const splitQ2 = doc.splitTextToSize(q2, contentWidth - 12);
doc.text(splitQ2, margin + 6, 169);

doc.setFont('helvetica', 'bold');
doc.setFontSize(9);
doc.setTextColor(...COLOR_PRIMARY);
doc.text('PANDUAN JAWABAN DETAIL & SISTEMATIS UNTUK GURU:', margin + 6, 185);

doc.setFont('helvetica', 'normal');
doc.setFontSize(8.5);
doc.setTextColor(...COLOR_DARK);

const q2Answer = [
  "1. Menolak Taklid Buta (Argumentum ad Verecundiam):",
  "   Islam dan sains menolak kepatuhan buta hanya karena jabatan seseorang. Al-Quran mencela mereka yang menelan",
  "   mentah-mentah ucapan pembesar tanpa pertimbangan bukti nyata.",
  "",
  "2. Doktrin Siber Modern: Zero Trust Architecture (ZTA):",
  "   Dalam keamanan jaringan tercanggih, berlaku doktrin 'Never Trust, Always Verify'. Berada di dalam jaringan resmi",
  "   bukan jaminan bebas anomali. Setiap transaksi data tetap wajib divalidasi checksum dan integritas isinya.",
  "",
  "3. Metodologi Ilmu Hadits: Kritik Matan (Naqd al-Matan):",
  "   Ulama hadits menolak riwayat perawi ternama sekalipun jika isi riwayatnya bertentangan dengan Al-Qur'an atau akal",
  "   sehat qath'i (diklasifikasikan sebagai hadits Syadz atau Munkar).",
  "",
  "4. Algoritma Triangulasi 3 Sumber:",
  "   Lakukan konfirmasi silang ke 3 kanal independen yang berbeda kepentingan bisnis/politik. Fakta mentah yang tetap",
  "   konsisten di ketiga kanal tersebut memiliki derajat keabsahan tertinggi."
];

ansY = 192;
q2Answer.forEach((line) => {
  doc.text(line, margin + 6, ansY);
  ansY += 4.5;
});

// ==========================================
// HALAMAN 4: PERTANYAAN 3 & SKENARIO RPP
// ==========================================
doc.addPage();

// Q3
doc.setFillColor(241, 245, 249);
doc.roundedRect(margin, 24, contentWidth, 105, 3, 3, 'F');
doc.setDrawColor(254, 202, 202);
doc.rect(margin, 24, contentWidth, 105, 'S');

doc.setFont('helvetica', 'bold');
doc.setFontSize(10);
doc.setTextColor(225, 29, 72);
doc.text('PERTANYAAN 3: KECEPATAN (LATENCY) VS INTEGRITAS DI ERA VIRAL', margin + 6, 32);

doc.setFont('helvetica', 'bolditalic');
doc.setFontSize(9);
doc.setTextColor(...COLOR_NAVY);
const q3 = '"Di medsos seperti TikTok atau X, akun yang paling cepat upload informasi mendapat views dan followers terbanyak (speed over accuracy). Kalau kita tabayyun dulu berjam-jam, bukankah kita akan selalu kalah cepat dan dicap kuper?"';
const splitQ3 = doc.splitTextToSize(q3, contentWidth - 12);
doc.text(splitQ3, margin + 6, 39);

doc.setFont('helvetica', 'bold');
doc.setFontSize(9);
doc.setTextColor(...COLOR_PRIMARY);
doc.text('PANDUAN JAWABAN DETAIL & SISTEMATIS UNTUK GURU:', margin + 6, 52);

doc.setFont('helvetica', 'normal');
doc.setFontSize(8.5);
doc.setTextColor(...COLOR_DARK);

const q3Answer = [
  "1. Membongkar Attention Economy:",
  "   Algoritma media sosial dirancang bukan untuk kebenaran, melainkan memperpanjang durasi tatap layar demi iklan.",
  "   Konten kemarahan dan skandal sengaja diviralkan. Menyebarkannya tanpa cek berarti diperbudak mesin iklan.",
  "",
  "2. Rekayasa Sistem: High Throughput vs Fault-Tolerance:",
  "   Sistem perbankan atau medis tidak pernah menggunakan protokol cepat tapi rawan korupsi. Berlaku hukum GIGO",
  "   (Garbage In, Garbage Out). Kecepatan menyebarkan sampah hanya merusak server kehidupan sosial.",
  "",
  "3. Konsekuensi Jejak Digital & Hisab Akhirat (Q.S. Qaf: 18):",
  "   Setiap ketukan jempol diawasi malaikat Raqib dan Atid. Jejak digital di internet abadi dan dapat menghancurkan",
  "   karier masa depan. Menyebarkan kepanikan ke ribuan orang berarti memikul hisab atas kesesatan mereka.",
  "",
  "4. Menjadi Firewall, Bukan Repeater:",
  "   Orang awam bersikap seperti Repeater (menerima sinyal liar lalu memantulkannya). Siswa Program Khusus harus",
  "   menjadi Firewall cerdas: hoaks diisolasi dan mati di perangkatnya."
];

ansY = 59;
q3Answer.forEach((line) => {
  doc.text(line, margin + 6, ansY);
  ansY += 4.5;
});

// BAB IV: SKENARIO RPP & RUBRIK PENILAIAN
doc.setFont('helvetica', 'bold');
doc.setFontSize(15);
doc.setTextColor(...COLOR_NAVY);
doc.text('BAB IV: SKENARIO RPP (2 x 45 MENIT) & RUBRIK PENILAIAN', margin, 138);

doc.setDrawColor(...COLOR_PRIMARY);
doc.setLineWidth(0.6);
doc.line(margin, 141, margin + 110, 141);

// Table RPP
doc.setFont('helvetica', 'bold');
doc.setFontSize(9);
doc.setTextColor(...COLOR_NAVY);

const rppRows = [
  { tahapan: 'Apersepsi & Hook (15 m)', kegiatan: 'Panggil 1 siswa menyentuh Scene 1 di TV 65". Amati reaksi jempolnya dan diskusikan mengapa dorongan emosi mendahului pertimbangan rasional.' },
  { tahapan: 'Eksplorasi Konsep (25 m)', kegiatan: 'Buka Scene 2. Bagi kelas menjadi 4 kelompok untuk membalik 4 kartu 3D dan membedah analogi komputasi vs kaidah akhlak Islam.' },
  { tahapan: 'Simulasi Flowchart (30 m)', kegiatan: 'Buka Scene 3. Perwakilan siswa merakit 5 blok algoritma ke slot diagram alir di layar sentuh besar. Manfaatkan adaptive error feedback.' },
  { tahapan: 'Sintesis & QnA (20 m)', kegiatan: 'Eksekusi stempel Scene 4. Bedah 3 Pertanyaan Kritis di atas dan simpulkan metafora Hardware vs Operating System.' }
];

let rppY = 148;
doc.setFillColor(226, 232, 240);
doc.rect(margin, rppY, contentWidth, 7, 'F');
doc.text('TAHAPAN WAKTU', margin + 3, rppY + 5);
doc.text('AKTIVITAS GURU & SISWA DI TV TOUCHSCREEN 65 INCH', margin + 50, rppY + 5);

rppY += 7;
doc.setFont('helvetica', 'normal');
doc.setFontSize(8);

rppRows.forEach((row, i) => {
  doc.setFillColor(i % 2 === 0 ? 255 : 248, 250, 252);
  doc.rect(margin, rppY, contentWidth, 12, 'F');
  doc.setDrawColor(226, 232, 240);
  doc.rect(margin, rppY, contentWidth, 12, 'S');

  doc.setFont('helvetica', 'bold');
  doc.text(row.tahapan, margin + 3, rppY + 7);
  doc.setFont('helvetica', 'normal');
  const splitKegiatan = doc.splitTextToSize(row.kegiatan, contentWidth - 54);
  doc.text(splitKegiatan, margin + 50, rppY + 5);

  rppY += 12;
});

// Rubrik Penilaian Singkat
doc.setFont('helvetica', 'bold');
doc.setFontSize(10);
doc.setTextColor(...COLOR_NAVY);
doc.text('RUBRIK PENILAIAN KOMPETENSI SISWA:', margin, rppY + 8);

doc.setFont('helvetica', 'normal');
doc.setFontSize(8.5);
doc.setTextColor(...COLOR_DARK);
doc.text('1. Nalar Algoritma (30%) : Ketepatan merangkai 5 simbol flowchart ISO (Oval, Persegi, Diamond, Jajar Genjang).', margin + 3, rppY + 15);
doc.text('2. Pemahaman Tabayyun (30%) : Kemampuan menjabarkan dalil Q.S. Al-Hujurat: 6 & kaidah penolakan mafsadat.', margin + 3, rppY + 21);
doc.text('3. Interaksi Layar TV (20%) : Ketangkasan mengoperasikan gestur sentuh drag dan tap-to-move di layar 65".', margin + 3, rppY + 27);
doc.text('4. Respon Kritis (20%) : Ketajaman argumentasi dalam memecahkan dilema moral digital.', margin + 3, rppY + 33);

// Add Header & Footers to all pages
const totalPages = doc.getNumberOfPages();
for (let i = 1; i <= totalPages; i++) {
  doc.setPage(i);
  addHeaderFooter(i, totalPages);
}

// Save PDF file to public/
const outputDir = path.resolve(__dirname, '../public');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}
const outputPath = path.join(outputDir, 'buku-panduan-guru-algoritma-tabayyun.pdf');
fs.writeFileSync(outputPath, Buffer.from(doc.output('arraybuffer')));
console.log(`PDF successfully generated at: ${outputPath}`);
