import React, { useState } from 'react';
import { X, BookOpen, Printer, Copy, Check, HelpCircle, GraduationCap, Cpu, ShieldCheck, ChevronRight } from 'lucide-react';
import { sound } from '../utils/audio';

interface TeacherGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TeacherGuideModal: React.FC<TeacherGuideModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'filosofi' | 'scenes' | 'qna' | 'rpp'>('qna');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    sound.playSelect();
    const textToCopy = `BUKU PANDUAN GURU: INTEGRASI INFORMATIKA & AKIDAH AKHLAK (ALGORITMA TABAYYUN)\n\nSilakan merujuk file PANDUAN_GURU_ALGORITMA_TABAYYUN.md di repositori untuk teks lengkap kurikulum modul ini.`;
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleDownloadPdf = () => {
    sound.playSelect();
    const link = document.createElement('a');
    const baseUrl = import.meta.env.BASE_URL || './';
    const cleanBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
    link.href = `${cleanBase}buku-panduan-guru-algoritma-tabayyun.pdf`;
    link.download = 'buku-panduan-guru-algoritma-tabayyun.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    sound.playSelect();
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 md:p-8 select-text">
      <div className="bg-slate-900 border-2 border-emerald-500/50 rounded-3xl w-full max-w-6xl h-[90vh] flex flex-col shadow-2xl overflow-hidden relative">
        {/* Top Header of Modal */}
        <div className="bg-slate-950/90 border-b border-slate-800 px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-950 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <GraduationCap className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono uppercase bg-emerald-950 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded font-bold">
                  DOKUMEN PEGANGAN GURU
                </span>
                <span className="text-xs text-slate-400 font-mono hidden sm:inline">Kelas X Program Khusus</span>
              </div>
              <h2 className="text-xl md:text-2xl font-black text-white font-display">
                Buku Panduan Guru: Algoritma Tabayyun
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadPdf}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs md:text-sm font-bold shadow-lg shadow-emerald-600/30 transition-transform active:scale-95"
              title="Unduh Berkas PDF Buku Panduan Guru"
            >
              <Printer className="w-4 h-4" />
              <span>Unduh File PDF</span>
            </button>
            <button
              onClick={handlePrint}
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs md:text-sm font-medium border border-slate-700"
              title="Cetak Langsung dari Browser"
            >
              <span>Cetak Browser</span>
            </button>
            <button
              onClick={handleCopy}
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs md:text-sm font-medium border border-slate-700"
              title="Salin Rangkuman"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Disalin' : 'Salin Catatan'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs for Chapters */}
        <div className="bg-slate-900 border-b border-slate-800 px-6 py-2.5 flex items-center gap-2 overflow-x-auto shrink-0">
          {[
            { id: 'qna', label: '3 Pertanyaan Kritis Siswa (Paling Penting)', icon: <HelpCircle className="w-4 h-4 text-amber-400" /> },
            { id: 'filosofi', label: 'Bab I: Rasionalitas & Metafora OS', icon: <Cpu className="w-4 h-4 text-cyan-400" /> },
            { id: 'scenes', label: 'Bab II: Bedah 4 Scene Interaktif', icon: <ShieldCheck className="w-4 h-4 text-emerald-400" /> },
            { id: 'rpp', label: 'Bab III: Skenario RPP & Rubrik', icon: <BookOpen className="w-4 h-4 text-purple-400" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                sound.playSelect();
                setActiveTab(tab.id as typeof activeTab);
              }}
              className={`px-4 py-2.5 rounded-xl text-xs md:text-sm font-bold flex items-center gap-2 whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-emerald-500 text-slate-950 shadow-md'
                  : 'bg-slate-950/60 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Modal Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 text-slate-200 text-sm md:text-base leading-relaxed">
          {/* TAB 1: 3 PERTANYAAN KRITIS SISWA */}
          {activeTab === 'qna' && (
            <div className="space-y-8 max-w-4xl mx-auto">
              <div className="bg-amber-950/40 border-2 border-amber-500/50 rounded-2xl p-5 text-amber-200">
                <div className="flex items-center gap-2 font-black text-base md:text-lg mb-1">
                  <HelpCircle className="w-6 h-6 text-amber-400 shrink-0" />
                  <span>Pedoman Menghadapi Nalar Kritis Siswa Kelas X Program Khusus</span>
                </div>
                <p className="text-xs md:text-sm text-slate-300">
                  Siswa cerdas tidak akan puas dengan jawaban klise "karena agama melarang". Mereka membutuhkan dekonstruksi berbasis <strong>logika komputasi</strong>, <strong>kaidah ushul fiqih</strong>, dan <strong>realitas hukum siber modern</strong>.
                </p>
              </div>

              {/* PERTANYAAN 1 */}
              <div className="bg-slate-950 rounded-3xl border border-slate-800 p-6 md:p-8 space-y-4 shadow-xl">
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-lg bg-cyan-950 text-cyan-400 font-mono font-bold flex items-center justify-center text-sm border border-cyan-500/40">
                    Q1
                  </span>
                  <span className="text-xs font-mono uppercase text-cyan-400 font-bold">
                    Dilema Kebenaran vs Kemaslahatan (Ghibah & Privasi)
                  </span>
                </div>

                <div className="bg-slate-900 border-l-4 border-cyan-400 p-4 rounded-r-2xl italic text-white text-base md:text-lg">
                  "Pak/Bu Guru, bagaimana jika suatu berita itu 100% fakta (bukan hoaks, ada rekaman videonya), tapi berita itu membongkar aib masa lalu teman sekelas atau aib guru? Apakah secara algoritma kita tetap boleh menyebarkannya karena datanya True?"
                </div>

                <div className="space-y-3 pt-2 text-slate-300">
                  <p className="font-bold text-emerald-400 text-base">Panduan Jawaban Guru:</p>
                  
                  <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-2">
                    <p>
                      <strong>1. Dekonstruksi Logika Operator Boolean AND (&amp;&amp;):</strong><br />
                      Ingatkan siswa bahwa kondisi di Decision Diamond Scene 3 berbunyi:
                      <code className="text-amber-300 bg-slate-950 px-2 py-0.5 rounded font-mono text-xs mx-1">
                        if (isTrue &amp;&amp; isBeneficial)
                      </code>.
                      Jika <code className="text-cyan-300">isTrue == 1</code>, namun <code className="text-rose-300">isBeneficial == 0</code> (karena membuka aib pribadi dan memicu perundungan), maka hasil ekspresi logika secara matematis bernilai <strong>0 (FALSE)</strong>. Maka alur program wajib berbelok ke <strong>Hapus &amp; Abaikan</strong>!
                    </p>
                    <p>
                      <strong>2. Tinjauan Hadits Nabi SAW tentang Ghibah:</strong><br />
                      Dalam HR. Muslim No. 2589, Rasulullah SAW menegaskan bahwa membicarakan keburukan saudaramu yang <em>benar-benar ada</em> adalah <strong>Ghibah</strong>, sedangkan jika itu tidak benar barulah menjadi <strong>Fitnah</strong>. Keduanya dosa besar.
                    </p>
                    <p>
                      <strong>3. Tinjauan Hukum Siber Modern:</strong><br />
                      Dalam UU No. 27 Tahun 2022 (UU Perlindungan Data Pribadi / PDP) maupun regulasi GDPR internasional, menyebarkan data pribadi (*doxxing*) tanpa persetujuan subjek adalah kejahatan siber yang diancam pidana, terlepas faktual atau tidaknya data tersebut.
                    </p>
                  </div>
                </div>
              </div>

              {/* PERTANYAAN 2 */}
              <div className="bg-slate-950 rounded-3xl border border-slate-800 p-6 md:p-8 space-y-4 shadow-xl">
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-lg bg-amber-950 text-amber-400 font-mono font-bold flex items-center justify-center text-sm border border-amber-500/40">
                    Q2
                  </span>
                  <span className="text-xs font-mono uppercase text-amber-400 font-bold">
                    Validasi Otoritas &amp; Bias Institusional
                  </span>
                </div>

                <div className="bg-slate-900 border-l-4 border-amber-400 p-4 rounded-r-2xl italic text-white text-base md:text-lg">
                  "Bagaimana jika sumber resmi, media arus utama yang terverifikasi, atau tokoh berotoritas itu sendiri yang menyebarkan berita yang bias atau memanipulasi data demi kepentingan mereka? Apakah kita tetap harus percaya hanya karena mereka 'resmi'?"
                </div>

                <div className="space-y-3 pt-2 text-slate-300">
                  <p className="font-bold text-emerald-400 text-base">Panduan Jawaban Guru:</p>
                  
                  <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-2">
                    <p>
                      <strong>1. Prinsip Keamanan Siber "Zero Trust Architecture (ZTA)":</strong><br />
                      Dalam arsitektur siber canggih, doktrin utamanya adalah <em>"Never Trust, Always Verify"</em>. Berada di dalam jaringan resmi (*internal network*) bukan jaminan paket data bebas dari anomali. Setiap paket tetap harus diuji validitas dan integritasnya (*checksum*).
                    </p>
                    <p>
                      <strong>2. Metodologi Ilmu Hadits (Kritik Sanad &amp; Kritik Matan):</strong><br />
                      Ulama hadits tidak taklid buta pada figur otoritas. Jika seorang perawi adil meriwayatkan hadits yang isinya (*matan*) bertentangan dengan Al-Qur'an atau akal sehat yang qath'i, hadits tersebut diklasifikasikan sebagai <em>Syadz</em> atau tertolak.
                    </p>
                    <p>
                      <strong>3. Solusi Algoritmik: Triangulasi 3 Sumber Independen:</strong><br />
                      Ajari siswa melakukan konfirmasi silang minimal ke 3 kanal berita dengan garis kepentingan politik/bisnis yang saling bertolak belakang. Fakta mentah yang konsisten di ketiga kanal tersebut memiliki derajat keabsahan tertinggi.
                    </p>
                  </div>
                </div>
              </div>

              {/* PERTANYAAN 3 */}
              <div className="bg-slate-950 rounded-3xl border border-slate-800 p-6 md:p-8 space-y-4 shadow-xl">
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-lg bg-rose-950 text-rose-400 font-mono font-bold flex items-center justify-center text-sm border border-rose-500/40">
                    Q3
                  </span>
                  <span className="text-xs font-mono uppercase text-rose-400 font-bold">
                    Kecepatan (Latency) vs Integritas Data di Era Algoritma Viral
                  </span>
                </div>

                <div className="bg-slate-900 border-l-4 border-rose-400 p-4 rounded-r-2xl italic text-white text-base md:text-lg">
                  "Di TikTok dan media sosial, akun yang paling cepat upload informasi mendapat engagement dan followers terbanyak. Kalau kita tabayyun dulu berjam-jam atau berhari-hari, bukankah kita akan selalu kalah cepat dan ketinggalan zaman?"
                </div>

                <div className="space-y-3 pt-2 text-slate-300">
                  <p className="font-bold text-emerald-400 text-base">Panduan Jawaban Guru:</p>
                  
                  <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-2">
                    <p>
                      <strong>1. Membongkar Attention Economy:</strong><br />
                      Algoritma medsos komersial dirancang untuk memaksimalkan <em>durasi tatap layar</em>, bukan kebenaran data. Konten yang memicu kemarahan (*outrage*) sengaja diviralkan oleh platform demi iklan. Menyebarkannya tanpa cek berarti kita sekadar menjadi komoditas mesin iklan.
                    </p>
                    <p>
                      <strong>2. Sistem Komputasi: High Throughput vs High Fault-Tolerance:**</strong><br />
                      Sistem perbankan, satelit, dan kedokteran tidak pernah memprioritaskan "asal cepat tapi korup". Mereka menggunakan protokol dengan <em>error-correcting code</em>. Hukum komputasi menyatakan: <strong>GIGO (Garbage In, Garbage Out)</strong>. Kecepatan menyebarkan sampah hanya merusak jaringan.
                    </p>
                    <p>
                      <strong>3. Menjadi "Firewall", Bukan "Repeater":</strong><br />
                      Orang awam bersikap seperti <em>Repeater</em> (menerima sinyal liar lalu menguatkan pancarannya). Siswa Program Khusus harus menjadi <strong>Firewall</strong> yang mengisolasi dan mematikan virus hoaks di perangkatnya. Jejak digital kita abadi di dunia dan dihisab di akhirat (Q.S. Qaf: 18).
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: FILOSOFI & METAFORA OS */}
          {activeTab === 'filosofi' && (
            <div className="space-y-6 max-w-4xl mx-auto">
              <h3 className="text-2xl font-black text-white">Landasan Filosofis: Hardware vs Operating System</h3>
              <p>
                Kecerdasan komputasional yang dipelajari siswa Kelas X (algoritma, efisiensi logika, pemodelan matematis) dianalogikan sebagai <strong>Hardware</strong>. Prosesor bertenaga tinggi mampu mengeksekusi milyaran siklus instruksi per detik.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
                <div className="bg-slate-950 p-5 rounded-2xl border border-cyan-500/30">
                  <h4 className="text-lg font-bold text-cyan-400 flex items-center gap-2 mb-2">
                    <Cpu className="w-5 h-5" /> Hardware (Informatika)
                  </h4>
                  <ul className="text-xs md:text-sm text-slate-300 space-y-1.5 list-disc pl-4">
                    <li>Kecerdasan kognitif &amp; nalar analisis data</li>
                    <li>Kecepatan eksekusi pemecahan masalah</li>
                    <li>Sintaksis pemrograman &amp; struktur alur kontrol</li>
                    <li><strong>Kelemahan:</strong> Tidak memiliki kesadaran moral atas dampak sosial dari instruksi yang dieksekusi.</li>
                  </ul>
                </div>

                <div className="bg-slate-950 p-5 rounded-2xl border border-emerald-500/30">
                  <h4 className="text-lg font-bold text-emerald-400 flex items-center gap-2 mb-2">
                    <ShieldCheck className="w-5 h-5" /> Operating System (Akidah Akhlak)
                  </h4>
                  <ul className="text-xs md:text-sm text-slate-300 space-y-1.5 list-disc pl-4">
                    <li>Kernel sistem nilai &amp; kontrol privilege I/O</li>
                    <li>Filter integritas data (Q.S. Al-Hujurat: 6)</li>
                    <li>Pertimbangan kemaslahatan publik (Maqashid Syariah)</li>
                    <li><strong>Kekuatan:</strong> Mencegah sistem crash dan infeksi virus hoaks di ekosistem peradaban.</li>
                  </ul>
                </div>
              </div>

              <blockquote className="bg-slate-950 p-6 rounded-2xl border-l-4 border-emerald-400 text-lg font-bold text-white italic">
                "Kecerdasan otakmu adalah Hardware, tapi Akhlakmu adalah Operating System (OS). Jangan biarkan hoax menjadi virus yang merusak sistemmu."
              </blockquote>
            </div>
          )}

          {/* TAB 3: BEDAH 4 SCENE */}
          {activeTab === 'scenes' && (
            <div className="space-y-6 max-w-4xl mx-auto">
              <h3 className="text-2xl font-black text-white">Panduan Pengoperasian 4 Scene di TV Touchscreen 65"</h3>
              
              <div className="space-y-4">
                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800">
                  <span className="text-xs font-mono uppercase text-emerald-400 font-bold">Scene 01 // Uji Refleks Jari</span>
                  <h4 className="text-lg font-black text-white mt-1">Mengaktifkan Kesadaran Spontan Siswa</h4>
                  <p className="text-xs md:text-sm text-slate-300 mt-2">
                    Minta seorang siswa maju menyentuh kartu WhatsApp di TV 65". Tunjukkan bagaimana pesan berbau emosional (*FOMO*) menguji impulsivitas jempol. Efek getar layar (*screen-shake*) dan alarm merah saat digeser ke kiri menjadi media refleksi nyata atas bahaya menyebarkan berita tanpa cek.
                  </p>
                </div>

                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800">
                  <span className="text-xs font-mono uppercase text-cyan-400 font-bold">Scene 02 // Flashcard Analogi 3D</span>
                  <h4 className="text-lg font-black text-white mt-1">Jembatan Analogi Komputasi &amp; Syariat</h4>
                  <p className="text-xs md:text-sm text-slate-300 mt-2">
                    Bagi kelas menjadi 4 kelompok. Setiap kelompok menyentuh kartu di TV untuk membalik animasi 3D dan membedah: (1) Input vs Wurudul Khabar, (2) Processing vs Cek Sanad, (3) Decision vs Maslahat/Mudharat, (4) Output vs Berkata Baik atau Diam.
                  </p>
                </div>

                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800">
                  <span className="text-xs font-mono uppercase text-amber-400 font-bold">Scene 03 // Praktik Flowchart Standar ISO</span>
                  <h4 className="text-lg font-black text-white mt-1">Konstruksi Algoritma Logis di Layar Kaca</h4>
                  <p className="text-xs md:text-sm text-slate-300 mt-2">
                    Tantang perwakilan siswa merakit 5 blok ke slot flowchart. Ingatkan bentuk standar: Oval (Mulai), Persegi Panjang (Proses Cek Sumber), Belah Ketupat (Keputusan Maslahat), dan Jajar Genjang (Cabang Output). Gunakan mode Tap-to-Place jika layar sentuh memiliki gesekan.
                  </p>
                </div>

                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800">
                  <span className="text-xs font-mono uppercase text-purple-400 font-bold">Scene 04 // Stempel Verifikasi Sistem</span>
                  <h4 className="text-lg font-black text-white mt-1">Afirmasi Identitas Akademisi Berakhlak</h4>
                  <p className="text-xs md:text-sm text-slate-300 mt-2">
                    Stempel berdentum <em>"SYSTEM VERIFIED: AKHLAK DETECTED"</em> menjadi puncak pembelajaran. Tutup sesi dengan mengikhtiarkan bahwa integritas data adalah cerminan keshalihan digital.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: RPP & RUBRIK */}
          {activeTab === 'rpp' && (
            <div className="space-y-6 max-w-4xl mx-auto">
              <h3 className="text-2xl font-black text-white">Matriks Rubrik Penilaian &amp; Alokasi Waktu (2 x 45 Menit)</h3>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs md:text-sm border border-slate-800 rounded-2xl overflow-hidden">
                  <thead className="bg-slate-950 text-slate-300 font-mono uppercase border-b border-slate-800">
                    <tr>
                      <th className="p-3">Dimensi Kompetensi</th>
                      <th className="p-3">Kriteria Mahir (Skor 4)</th>
                      <th className="p-3">Kriteria Berkembang (Skor 2-3)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 bg-slate-900/60">
                    <tr>
                      <td className="p-3 font-bold text-cyan-400">1. Logika Komputasional</td>
                      <td className="p-3">Mampu menyusun 5 simbol flowchart ISO dengan akurat dan menjelaskan hubungan sekuensial dengan percabangan logika Boolean.</td>
                      <td className="p-3">Mampu merangkai flowchart setelah petunjuk korektif sistem; sesekali tertukar antara simbol proses dan decision.</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-emerald-400">2. Pemahaman Tabayyun</td>
                      <td className="p-3">Menguraikan dalil Q.S. Al-Hujurat: 6, kaidah pencegahan mafsadat, dan metode verifikasi sanad informasi digital secara mendalam.</td>
                      <td className="p-3">Memahami larangan hoaks secara umum namun belum mampu merumuskan tahapan verifikasi terstruktur.</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-amber-400">3. Keterampilan Interaksi TV</td>
                      <td className="p-3">Terampil berinteraksi di layar sentuh 65" dengan gestur drag maupun tap-to-move, serta mampu memimpin simulasi kelompok.</td>
                      <td className="p-3">Mampu berinteraksi dengan bantuan arahan teknis dari guru.</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-purple-400">4. Argumentasi Kritis</td>
                      <td className="p-3">Memecahkan dilema moral digital (fakta vs aib, bias otoritas) dengan sintesis logika matematis dan kaidah fiqih.</td>
                      <td className="p-3">Menjawab dengan sudut pandang normatif singkat tanpa elaborasi komparatif.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Bar */}
        <div className="bg-slate-950/90 border-t border-slate-800 px-6 py-3 flex items-center justify-between shrink-0 text-xs text-slate-400">
          <span>Tersedia dokumen lengkap file markdown di: <code className="text-emerald-400 font-mono">/PANDUAN_GURU_ALGORITMA_TABAYYUN.md</code></span>
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm"
          >
            Tutup Panduan
          </button>
        </div>
      </div>
    </div>
  );
};
