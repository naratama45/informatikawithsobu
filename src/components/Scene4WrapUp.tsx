import React, { useEffect } from 'react';
import { RefreshCw, Download, ShieldCheck, Cpu, HardDrive, Terminal, CheckCircle2, Award } from 'lucide-react';
import { sound } from '../utils/audio';

interface Scene4WrapUpProps {
  onRestart: () => void;
  onExport: () => void;
}

export const Scene4WrapUp: React.FC<Scene4WrapUpProps> = ({ onRestart, onExport }) => {
  useEffect(() => {
    // Play the grand stamp slam audio on mount
    sound.playStampSlam();
  }, []);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-between p-6 md:p-8 overflow-y-auto select-none">
      {/* Background Cyber Glow */}
      <div className="absolute inset-0 bg-radial from-emerald-500/10 via-transparent to-transparent pointer-events-none"></div>

      {/* Top Banner */}
      <div className="text-center max-w-4xl pt-2 z-10">
        <span className="text-emerald-400 font-mono tracking-widest text-xs md:text-sm uppercase font-semibold">
          SCENE 04 // EVALUASI & VERIFIKASI SISTEM
        </span>
        <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white mt-1">
          Algoritma Berhasil Disempurnakan
        </h1>
      </div>

      {/* CENTERPIECE: GIANT ANIMATED STAMP */}
      <div className="my-auto py-6 flex flex-col items-center justify-center z-10">
        <div className="animate-stamp">
          <div className="relative px-8 md:px-14 py-5 md:py-7 rounded-3xl border-4 md:border-6 border-emerald-400 bg-emerald-950/90 text-emerald-300 shadow-2xl shadow-emerald-500/50 backdrop-blur-md flex flex-col items-center justify-center text-center">
            {/* Holographic lines */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-400/10 to-transparent pointer-events-none rounded-2xl"></div>

            <div className="flex items-center gap-3 text-emerald-400 mb-1">
              <ShieldCheck className="w-8 h-8 md:w-10 md:h-10" />
              <span className="text-xs md:text-sm font-mono tracking-widest font-black uppercase">
                SECURITY & ETHICS PROTOCOL 2026
              </span>
              <Award className="w-8 h-8 md:w-10 md:h-10" />
            </div>

            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-wider text-emerald-300 drop-shadow-[0_0_25px_rgba(16,185,129,0.8)] font-display">
              SYSTEM VERIFIED:
            </h2>
            <h3 className="text-2xl md:text-4xl lg:text-5xl font-black tracking-widest text-white mt-1">
              AKHLAK DETECTED
            </h3>

            <div className="mt-2 text-[11px] md:text-xs font-mono text-emerald-400 uppercase tracking-widest border-t border-emerald-500/40 pt-1.5 w-full">
              STATUS: ZERO HOAX // VALIDITY 100% // TABAYYUN ACTIVE
            </div>
          </div>
        </div>

        {/* THE EPIC QUOTE CARD */}
        <div className="w-full max-w-4xl mt-8 bg-slate-900/90 border-2 border-slate-700/80 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-2 h-full bg-emerald-500"></div>
          
          <p className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold mb-2">
            FILOSOFI INTEGRASI: HARDWARE &times; OPERATING SYSTEM
          </p>

          <blockquote className="text-xl md:text-3xl font-black text-white leading-relaxed tracking-tight">
            "Kecerdasan otakmu adalah <span className="text-cyan-400">Hardware</span>, tapi Akhlakmu adalah <span className="text-emerald-400">Operating System (OS)</span>. Jangan biarkan hoax menjadi virus yang merusak sistemmu."
          </blockquote>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 pt-6 border-t border-slate-800 text-sm">
            <div className="bg-slate-950/70 p-4 rounded-2xl border border-slate-800">
              <div className="flex items-center gap-2 text-cyan-400 font-bold mb-1">
                <Cpu className="w-5 h-5" />
                <span>Hardware (Informatika):</span>
              </div>
              <p className="text-slate-300 text-xs md:text-sm">
                Kemampuan analisis logika, kalkulasi data, dan sintaksis algoritma tingkat tinggi yang cerdas dan cepat.
              </p>
            </div>

            <div className="bg-slate-950/70 p-4 rounded-2xl border border-slate-800">
              <div className="flex items-center gap-2 text-emerald-400 font-bold mb-1">
                <HardDrive className="w-5 h-5" />
                <span>Operating System (Akidah Akhlak):</span>
              </div>
              <p className="text-slate-300 text-xs md:text-sm">
                Kendali nilai, nurani, dan etika tabayyun yang menyaring apa yang layak diolah dan dibagikan ke khalayak.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Action Deck */}
      <div className="w-full max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 z-10">
        <button
          onClick={onRestart}
          className="w-full sm:w-auto flex-1 py-4 px-8 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-lg md:text-xl shadow-xl shadow-emerald-500/20 flex items-center justify-center gap-3 transition-transform active:scale-95 min-h-[64px]"
        >
          <RefreshCw className="w-6 h-6" />
          <span>Ulangi Simulasi</span>
        </button>

        <button
          onClick={onExport}
          className="w-full sm:w-auto flex-1 py-4 px-8 rounded-2xl bg-slate-800 hover:bg-slate-700 border-2 border-slate-700 text-white font-bold text-base md:text-lg flex items-center justify-center gap-3 transition-all min-h-[64px]"
        >
          <Download className="w-6 h-6 text-emerald-400" />
          <span>Unduh Standalone HTML</span>
        </button>
      </div>
    </div>
  );
};
