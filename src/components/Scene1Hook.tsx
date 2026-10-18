import React, { useState, useRef } from 'react';
import { AlertTriangle, ShieldCheck, Share2, ArrowRight, RefreshCw, Send, CheckCircle2 } from 'lucide-react';
import { sound } from '../utils/audio';

interface Scene1HookProps {
  onProceed: () => void;
  triggerScreenShake: () => void;
}

export const Scene1Hook: React.FC<Scene1HookProps> = ({ onProceed, triggerScreenShake }) => {
  const [outcome, setOutcome] = useState<'idle' | 'danger' | 'success'>('idle');
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [activeZone, setActiveZone] = useState<'none' | 'left' | 'right'>('none');
  const [selectedForTap, setSelectedForTap] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);
  const startPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const handlePointerDown = (e: React.PointerEvent) => {
    if (outcome !== 'idle') return;
    setIsDragging(true);
    startPos.current = { x: e.clientX, y: e.clientY };
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    sound.playSelect();
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || outcome !== 'idle') return;
    const deltaX = e.clientX - startPos.current.x;
    const deltaY = (e.clientY - startPos.current.y) * 0.3; // Damp vertical movement

    setDragOffset({ x: deltaX, y: deltaY });

    // Threshold detection based on viewport width
    const threshold = Math.min(window.innerWidth * 0.18, 160);
    if (deltaX < -threshold) {
      setActiveZone('left');
    } else if (deltaX > threshold) {
      setActiveZone('right');
    } else {
      setActiveZone('none');
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging) return;
    setIsDragging(false);
    (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);

    const threshold = Math.min(window.innerWidth * 0.18, 160);
    if (dragOffset.x < -threshold) {
      executeAction('danger');
    } else if (dragOffset.x > threshold) {
      executeAction('success');
    } else {
      // Snap back
      setDragOffset({ x: 0, y: 0 });
      setActiveZone('none');
    }
  };

  const executeAction = (result: 'danger' | 'success') => {
    setOutcome(result);
    setDragOffset({ x: 0, y: 0 });
    setActiveZone('none');
    setSelectedForTap(false);

    if (result === 'danger') {
      sound.playDanger();
      triggerScreenShake();
    } else {
      sound.playSuccess();
    }
  };

  const resetHook = () => {
    setOutcome('idle');
    setDragOffset({ x: 0, y: 0 });
    setActiveZone('none');
    setSelectedForTap(false);
    sound.playSelect();
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-between p-6 md:p-8 overflow-hidden select-none">
      {/* Scene Header */}
      <div className="text-center max-w-4xl pt-2">
        <span className="text-emerald-400 font-mono tracking-widest text-xs md:text-sm uppercase font-semibold">
          SCENE 01 // TAHAP HOOK & SIKAP SPONTAN
        </span>
        <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white mt-1 drop-shadow-md">
          Uji Refleks Jari: Pesan Diterima!
        </h1>
        <p className="text-slate-300 text-base md:text-xl mt-2 font-normal">
          Sebuah pesan panas mendarat di layar ponselmu. Sentuh dan geser kartu ke arah keputusanmu!
        </p>
      </div>

      {/* Main Interactive Stage: 3-Column Layout (Left Drop, Center Message, Right Drop) */}
      <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-12 gap-6 items-center my-auto py-4">
        {/* Drop Zone KIRI: LANGSUNG SEBARKAN (Merah) */}
        <div
          onClick={() => executeAction('danger')}
          className={`md:col-span-3 min-h-[220px] md:min-h-[340px] rounded-3xl border-3 flex flex-col items-center justify-center p-6 text-center transition-all duration-200 cursor-pointer ${
            activeZone === 'left'
              ? 'bg-rose-950/80 border-rose-500 scale-105 shadow-2xl shadow-rose-600/50 animate-glow-red'
              : 'bg-slate-900/60 border-rose-900/40 hover:border-rose-600/70 hover:bg-rose-950/30'
          }`}
        >
          <div className="w-16 h-16 rounded-2xl bg-rose-900/60 border border-rose-500/50 flex items-center justify-center text-rose-400 mb-4 shadow-lg">
            <Share2 className="w-9 h-9" />
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-rose-400 tracking-wide">
            LANGSUNG SEBARKAN
          </h2>
          <p className="text-slate-400 text-sm md:text-base mt-2">
            Forward ke semua grup WhatsApp sekarang juga tanpa mikir
          </p>
          <div className="mt-4 px-4 py-2 rounded-xl bg-rose-950/70 border border-rose-700/50 text-rose-300 text-xs md:text-sm font-mono uppercase font-bold flex items-center gap-1.5">
            <span>&larr; GESER KE SINI</span>
          </div>
        </div>

        {/* Center Card: The Provocative WhatsApp Message */}
        <div className="md:col-span-6 flex flex-col items-center justify-center relative min-h-[360px]">
          {outcome === 'idle' ? (
            <div
              ref={cardRef}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onClick={() => setSelectedForTap(!selectedForTap)}
              style={{
                transform: `translate3d(${dragOffset.x}px, ${dragOffset.y}px, 0) rotate(${dragOffset.x * 0.04}deg)`,
                transition: isDragging ? 'none' : 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                touchAction: 'none',
              }}
              className={`w-full max-w-md bg-gradient-to-b from-slate-800 to-slate-900 rounded-3xl border-2 p-6 shadow-2xl cursor-grab active:cursor-grabbing relative overflow-hidden ${
                selectedForTap
                  ? 'border-emerald-400 shadow-emerald-500/30 ring-4 ring-emerald-500/20'
                  : 'border-slate-700 hover:border-slate-500'
              }`}
            >
              {/* WhatsApp Mock Header */}
              <div className="flex items-center justify-between border-b border-slate-700/80 pb-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold text-lg shadow-md">
                    <Send className="w-6 h-6 rotate-45" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base md:text-lg flex items-center gap-2">
                      <span>Grup Angkatan X-Akademik</span>
                      <span className="text-[11px] font-mono bg-rose-500 text-white px-2 py-0.5 rounded-full font-bold">
                        VIRAL
                      </span>
                    </h3>
                    <p className="text-xs text-emerald-400 font-medium">Pengirim: +62 812-XXXX-9921</p>
                  </div>
                </div>
                <span className="text-xs text-slate-400 font-mono">06:45 WIB</span>
              </div>

              {/* Message Content Bubble */}
              <div className="bg-emerald-950/50 border border-emerald-500/30 rounded-2xl p-5 mb-5 shadow-inner">
                <div className="flex items-center gap-2 text-rose-400 font-extrabold text-sm uppercase tracking-wide mb-2">
                  <AlertTriangle className="w-5 h-5 shrink-0" />
                  <span>KONTEN SANGAT MENDESAK</span>
                </div>
                <p className="text-white text-xl md:text-2xl font-black leading-snug tracking-tight">
                  "BOCORAN KUNCI JAWABAN UJIAN BESOK! Klik link ini sekarang sebelum server dihapus!"
                </p>
                <div className="mt-3 p-3 rounded-xl bg-slate-900/90 border border-emerald-500/20 text-emerald-400 text-sm font-mono truncate underline">
                  https://bit.ly/kunci-rahasia-akademik-2026
                </div>
              </div>

              {/* Bottom Drag Instruction */}
              <div className="flex items-center justify-between text-xs md:text-sm text-slate-400 pt-2 border-t border-slate-800">
                <span className="font-mono flex items-center gap-1 text-rose-400 font-bold">
                  &larr; Sebarkan
                </span>
                <span className="bg-slate-800 text-slate-300 px-3 py-1 rounded-full font-medium">
                  Sentuh & Geser Jari
                </span>
                <span className="font-mono flex items-center gap-1 text-emerald-400 font-bold">
                  Tabayyun &rarr;
                </span>
              </div>
            </div>
          ) : outcome === 'danger' ? (
            /* Danger Alert State */
            <div className="w-full max-w-lg bg-gradient-to-b from-rose-950 to-slate-950 border-3 border-rose-500 rounded-3xl p-8 text-center shadow-2xl shadow-rose-900/60 animate-glow-red">
              <div className="w-20 h-20 rounded-full bg-rose-900/80 border-2 border-rose-400 text-rose-300 flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-12 h-12" />
              </div>
              <span className="text-xs font-mono uppercase bg-rose-900 text-rose-200 px-3 py-1 rounded-full font-bold">
                LOGIKA CRASH // ERROR AKHLAK
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-rose-400 mt-3">
                DANGER: Anda Menyebarkan Hoax!
              </h2>
              <div className="bg-slate-900/80 border border-rose-900/60 rounded-2xl p-4 my-4 text-left">
                <p className="text-rose-200 text-sm md:text-base leading-relaxed">
                  Refleks jempol tanpa validasi telah memicu fitnah digital dan kepanikan massal di sekolah.
                </p>
                <p className="text-slate-300 text-xs md:text-sm mt-3 italic border-t border-slate-800 pt-2">
                  "Wahai orang-orang yang beriman! Jika seseorang yang fasik datang kepadamu membawa suatu berita, maka telitilah kebenarannya (tabayyun)..." (Q.S. Al-Hujurat: 6)
                </p>
              </div>
              <button
                onClick={resetHook}
                className="w-full py-4 px-6 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-lg md:text-xl shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-3 min-h-[64px]"
              >
                <RefreshCw className="w-6 h-6" />
                <span>Ulangi Refleks Jari</span>
              </button>
            </div>
          ) : (
            /* Success / Tabayyun Verified State */
            <div className="w-full max-w-lg bg-gradient-to-b from-emerald-950 to-slate-950 border-3 border-emerald-500 rounded-3xl p-8 text-center shadow-2xl shadow-emerald-900/60 animate-glow-green">
              <div className="w-20 h-20 rounded-full bg-emerald-900/80 border-2 border-emerald-400 text-emerald-300 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-12 h-12" />
              </div>
              <span className="text-xs font-mono uppercase bg-emerald-900 text-emerald-200 px-3 py-1 rounded-full font-bold">
                REFLEKS BENAR // FILTER AKTIF
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-emerald-400 mt-3">
                Sikap Kritis: TABAYYUN!
              </h2>
              <div className="bg-slate-900/80 border border-emerald-900/60 rounded-2xl p-4 my-4 text-left">
                <p className="text-emerald-200 text-sm md:text-base leading-relaxed">
                  Luar biasa! Siswa cerdas tidak langsung tergiur oleh umpan klik (*clickbait*). Menahan jempol adalah bentuk kecerdasan emosional dan etika digital tertinggi.
                </p>
              </div>
              <button
                onClick={onProceed}
                className="w-full py-4 px-6 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-lg md:text-xl shadow-xl shadow-emerald-500/30 transition-transform active:scale-95 flex items-center justify-center gap-3 min-h-[64px]"
              >
                <span>Lanjut ke Konsep (Scene 2)</span>
                <ArrowRight className="w-6 h-6" />
              </button>
            </div>
          )}
        </div>

        {/* Drop Zone KANAN: TAHAN & CEK (TABAYYUN) (Hijau) */}
        <div
          onClick={() => executeAction('success')}
          className={`md:col-span-3 min-h-[220px] md:min-h-[340px] rounded-3xl border-3 flex flex-col items-center justify-center p-6 text-center transition-all duration-200 cursor-pointer ${
            activeZone === 'right'
              ? 'bg-emerald-950/80 border-emerald-400 scale-105 shadow-2xl shadow-emerald-600/50 animate-glow-green'
              : 'bg-slate-900/60 border-emerald-900/40 hover:border-emerald-600/70 hover:bg-emerald-950/30'
          }`}
        >
          <div className="w-16 h-16 rounded-2xl bg-emerald-900/60 border border-emerald-500/50 flex items-center justify-center text-emerald-400 mb-4 shadow-lg">
            <ShieldCheck className="w-9 h-9" />
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-emerald-400 tracking-wide">
            TAHAN & CEK (TABAYYUN)
          </h2>
          <p className="text-slate-400 text-sm md:text-base mt-2">
            Verifikasi sumber resmi sekolah & cari tahu siapa pembuatnya
          </p>
          <div className="mt-4 px-4 py-2 rounded-xl bg-emerald-950/70 border border-emerald-700/50 text-emerald-300 text-xs md:text-sm font-mono uppercase font-bold flex items-center gap-1.5">
            <span>GESER KE SINI &rarr;</span>
          </div>
        </div>
      </div>

      {/* Quick Tap Buttons on TV Screen (Fail-safe for Touchscreen) */}
      <div className="w-full max-w-2xl flex items-center justify-center gap-4 pt-2">
        <button
          onClick={() => executeAction('danger')}
          className="flex-1 py-3 px-5 rounded-2xl bg-rose-950/50 hover:bg-rose-900/60 border border-rose-800/60 text-rose-300 font-bold text-sm md:text-base flex items-center justify-center gap-2 min-h-[56px] transition-all"
        >
          <Share2 className="w-5 h-5 text-rose-400" />
          <span>Tap: Sebarkan</span>
        </button>

        <button
          onClick={() => executeAction('success')}
          className="flex-1 py-3 px-5 rounded-2xl bg-emerald-950/50 hover:bg-emerald-900/60 border border-emerald-800/60 text-emerald-300 font-bold text-sm md:text-base flex items-center justify-center gap-2 min-h-[56px] transition-all"
        >
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          <span>Tap: Tahan & Tabayyun</span>
        </button>
      </div>
    </div>
  );
};
