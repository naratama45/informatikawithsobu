import React, { useState } from 'react';
import { ArrowRight, Binary, HeartHandshake, RotateCw, CheckCircle, Sparkles, Cpu, Layers, GitBranch, Terminal } from 'lucide-react';
import { sound } from '../utils/audio';

interface Scene2ConceptProps {
  onProceed: () => void;
}

interface ConceptCard {
  id: number;
  inforTitle: string;
  inforDesc: string;
  inforCode: string;
  inforIcon: React.ReactNode;
  akhlakTitle: string;
  akhlakDesc: string;
  akhlakDalil: string;
  akhlakIcon: React.ReactNode;
}

export const Scene2Concept: React.FC<Scene2ConceptProps> = ({ onProceed }) => {
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());

  const cards: ConceptCard[] = [
    {
      id: 1,
      inforTitle: 'Input Data',
      inforDesc: 'Penerimaan sinyal mentah atau data stream eksternal melalui sensor atau input pengguna.',
      inforCode: 'cin >> rawMessage;',
      inforIcon: <Terminal className="w-8 h-8 text-cyan-400" />,
      akhlakTitle: 'Menerima Informasi',
      akhlakDesc: 'Mendengar atau membaca kabar dari media sosial/obrolan tanpa langsung membenarkannya (Wurudul Khabar).',
      akhlakDalil: 'Q.S. Al-Hujurat: 6 (Perintah Tabayyun saat berita datang)',
      akhlakIcon: <Layers className="w-8 h-8 text-emerald-400" />,
    },
    {
      id: 2,
      inforTitle: 'Processing',
      inforDesc: 'Pembersihan data, sanitasi input dari kode berbahaya (SQL Injection/Malware), dan uji validitas.',
      inforCode: 'sanitize(input).validateChecksum();',
      inforIcon: <Cpu className="w-8 h-8 text-cyan-400" />,
      akhlakTitle: 'Cek Sanad / Sumber (Tabayyun)',
      akhlakDesc: 'Memeriksa kredibilitas penyampai berita, keaslian fakta, dan mencari konfirmasi dari otoritas terpercaya.',
      akhlakDalil: 'Metode Takhrij Hadits (Verifikasi Keshahihan Sanad & Matan)',
      akhlakIcon: <Sparkles className="w-8 h-8 text-emerald-400" />,
    },
    {
      id: 3,
      inforTitle: 'Decision (If / Else)',
      inforDesc: 'Struktur logika percabangan kondisi Boolean untuk menentukan jalur eksekusi sistem berikutnya.',
      inforCode: 'if (isTruth && isBeneficial)',
      inforIcon: <GitBranch className="w-8 h-8 text-cyan-400" />,
      akhlakTitle: 'Bermanfaat atau Mudharat?',
      akhlakDesc: 'Menimbang dampak moral: Meski berita itu benar, apakah membawa faedah atau justru merusak ukhuwah?',
      akhlakDalil: 'Kaidah Fiqih: Dar\'ul Mafasid Muqaddamun \'ala Jalbil Mashalih',
      akhlakIcon: <HeartHandshake className="w-8 h-8 text-emerald-400" />,
    },
    {
      id: 4,
      inforTitle: 'Output',
      inforDesc: 'Pengiriman hasil olahan sistem ke memori publik, transmisi jaringan, atau penghapusan memori.',
      inforCode: 'broadcastPayload() : dropPacket();',
      inforIcon: <Binary className="w-8 h-8 text-cyan-400" />,
      akhlakTitle: 'Diam atau Bagikan',
      akhlakDesc: 'Jika benar dan bermanfaat, sebarkan untuk kebaikan. Jika hoaks atau menyakiti, kubur dan jangan bagikan!',
      akhlakDalil: 'HR. Bukhari & Muslim: "Berkata baik atau diamlah."',
      akhlakIcon: <CheckCircle className="w-8 h-8 text-emerald-400" />,
    },
  ];

  const toggleFlip = (id: number) => {
    sound.playCardFlip();
    setFlippedCards((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const flipAll = () => {
    sound.playCardFlip();
    if (flippedCards.size === cards.length) {
      setFlippedCards(new Set());
    } else {
      setFlippedCards(new Set(cards.map((c) => c.id)));
    }
  };

  const isReady = flippedCards.size >= 2;

  return (
    <div className="relative w-full h-full flex flex-col justify-between p-6 md:p-8 overflow-y-auto select-none">
      {/* Header & Pillar Split Legend */}
      <div className="w-full max-w-6xl mx-auto flex flex-col items-center text-center">
        <span className="text-emerald-400 font-mono tracking-widest text-xs md:text-sm uppercase font-semibold">
          SCENE 02 // PEMETAAN KONSEP KOMPUTASIONAL & AKIDAH
        </span>
        <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white mt-1">
          Algoritma &times; Tabayyun: Dua Sisi Satu Mata Uang
        </h1>
        <p className="text-slate-300 text-base md:text-lg mt-2 max-w-3xl">
          Sentuh setiap kartu di bawah untuk membuka padanan matematis-logika dengan adab digital Islami.
        </p>

        {/* Dual Pillar Legend Bar */}
        <div className="w-full max-w-4xl grid grid-cols-2 gap-4 mt-4 bg-slate-900/80 p-2.5 rounded-2xl border border-slate-800">
          <div className="flex items-center justify-center gap-3 py-2 px-4 rounded-xl bg-cyan-950/40 border border-cyan-800/40 text-cyan-300">
            <Binary className="w-5 h-5 text-cyan-400 shrink-0" />
            <span className="font-bold text-sm md:text-base tracking-wide">
              SISI DEPAN: Informatika (Algoritma)
            </span>
          </div>
          <div className="flex items-center justify-center gap-3 py-2 px-4 rounded-xl bg-emerald-950/40 border border-emerald-800/40 text-emerald-300">
            <HeartHandshake className="w-5 h-5 text-emerald-400 shrink-0" />
            <span className="font-bold text-sm md:text-base tracking-wide">
              SISI BELAKANG: Akidah Akhlak (Tabayyun)
            </span>
          </div>
        </div>
      </div>

      {/* 4 Interactive Flashcards Grid (Touch targets large for 65" TV) */}
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-6">
        {cards.map((card) => {
          const isFlipped = flippedCards.has(card.id);
          return (
            <div
              key={card.id}
              onClick={() => toggleFlip(card.id)}
              className="group min-h-[320px] md:min-h-[380px] perspective-1000 cursor-pointer"
            >
              <div
                className={`relative w-full h-full duration-500 transform-style-3d transition-transform ${
                  isFlipped ? 'rotate-y-180' : ''
                }`}
              >
                {/* FRONT: Informatika (Algoritma) */}
                <div className="absolute inset-0 w-full h-full backface-hidden rounded-3xl bg-gradient-to-b from-slate-900 via-slate-850 to-slate-950 border-2 border-cyan-500/40 p-6 flex flex-col justify-between shadow-xl shadow-cyan-950/30 hover:border-cyan-400 transition-colors">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="w-10 h-10 rounded-xl bg-cyan-950 border border-cyan-500/40 flex items-center justify-center text-cyan-400 font-black font-mono text-base">
                        0{card.id}
                      </span>
                      {card.inforIcon}
                    </div>
                    <span className="text-cyan-400 font-mono text-xs uppercase tracking-wider font-semibold">
                      KOMPONEN ALGORITMA
                    </span>
                    <h3 className="text-2xl font-black text-white mt-1 mb-3">
                      {card.inforTitle}
                    </h3>
                    <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                      {card.inforDesc}
                    </p>
                  </div>

                  <div>
                    <div className="bg-slate-950/90 rounded-xl p-3 border border-cyan-900/60 font-mono text-xs md:text-sm text-cyan-300 mb-3 truncate">
                      <code>{card.inforCode}</code>
                    </div>
                    <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800">
                      <span className="text-cyan-400 flex items-center gap-1 font-semibold">
                        <RotateCw className="w-3.5 h-3.5" /> Tap untuk Balik
                      </span>
                      <span className="text-slate-500 font-mono">&rarr; Akidah Akhlak</span>
                    </div>
                  </div>
                </div>

                {/* BACK: Akidah Akhlak (Tabayyun) */}
                <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-3xl bg-gradient-to-b from-emerald-950 via-slate-900 to-slate-950 border-2 border-emerald-500/60 p-6 flex flex-col justify-between shadow-2xl shadow-emerald-950/40">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-black font-mono text-base">
                        0{card.id}
                      </span>
                      {card.akhlakIcon}
                    </div>
                    <span className="text-emerald-400 font-mono text-xs uppercase tracking-wider font-semibold">
                      PRINSIP AKIDAH AKHLAK
                    </span>
                    <h3 className="text-2xl font-black text-emerald-300 mt-1 mb-3">
                      {card.akhlakTitle}
                    </h3>
                    <p className="text-slate-200 text-sm md:text-base leading-relaxed">
                      {card.akhlakDesc}
                    </p>
                  </div>

                  <div>
                    <div className="bg-emerald-950/80 rounded-xl p-3 border border-emerald-500/40 text-emerald-200 text-xs md:text-sm italic mb-3">
                      {card.akhlakDalil}
                    </div>
                    <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-emerald-900/50">
                      <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> Dipahami
                      </span>
                      <span className="text-slate-400 font-mono">&larr; Kembali</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Action Deck */}
      <div className="w-full max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-slate-800">
        <div className="flex items-center gap-3">
          <button
            onClick={flipAll}
            className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-sm md:text-base flex items-center gap-2 border border-slate-700 transition-all min-h-[52px]"
          >
            <RotateCw className="w-4 h-4 text-emerald-400" />
            <span>{flippedCards.size === cards.length ? 'Tutup Semua Kartu' : 'Balik Semua Kartu'}</span>
          </button>
          <span className="text-xs md:text-sm text-slate-400 font-mono">
            {flippedCards.size} dari {cards.length} kartu dipelajari
          </span>
        </div>

        <button
          onClick={onProceed}
          className={`py-4 px-8 rounded-2xl font-black text-lg md:text-xl shadow-xl flex items-center gap-3 transition-all min-h-[60px] ${
            isReady
              ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/30 scale-105 animate-glow-green cursor-pointer'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
          }`}
        >
          <span>Mulai Tantangan (Scene 3)</span>
          <ArrowRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};
