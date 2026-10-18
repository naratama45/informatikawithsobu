import React, { useState } from 'react';
import { X, Download, Copy, Check, FileCode } from 'lucide-react';
import { sound } from '../utils/audio';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleDownload = () => {
    sound.playSelect();
    const link = document.createElement('a');
    const baseUrl = import.meta.env.BASE_URL || './';
    const cleanBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
    link.href = `${cleanBase}algoritma-tabayyun-standalone.html`;
    link.download = 'algoritma-tabayyun-tv65.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopyUrl = () => {
    sound.playSelect();
    const baseUrl = import.meta.env.BASE_URL || './';
    const cleanBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
    const targetPath = `${cleanBase}algoritma-tabayyun-standalone.html`;
    const fullUrl = new URL(targetPath, window.location.href).href;
    navigator.clipboard.writeText(fullUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-6">
      <div className="bg-slate-900 border-2 border-emerald-500/50 rounded-3xl p-6 md:p-8 max-w-2xl w-full shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-950 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
            <FileCode className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl md:text-2xl font-black text-white">
              Unduh File HTML Tunggal Mandiri
            </h3>
            <p className="text-xs md:text-sm text-slate-400">
              Satu file .html lengkap (Tailwind + React CDN) siap dijalankan di TV Touchscreen tanpa install apapun!
            </p>
          </div>
        </div>

        <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800 my-4 space-y-3 text-xs md:text-sm text-slate-300">
          <div className="flex items-start gap-2">
            <span className="text-emerald-400 font-bold">&check;</span>
            <span><strong>100% Offline Ready:</strong> Cukup salin file ke Flashdisk USB dan buka via browser TV Touchscreen 65".</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-emerald-400 font-bold">&check;</span>
            <span><strong>Audio Synthesizer Mandiri:</strong> Suara buzzer alarm dan chime terintegrasi tanpa file MP3 eksternal.</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-emerald-400 font-bold">&check;</span>
            <span><strong>Touchscreen Gestures:</strong> Mendukung sentuhan jari multi-touch dan tap-to-move stabil.</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          <button
            onClick={handleDownload}
            className="py-4 px-6 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-base flex items-center justify-center gap-2 shadow-xl shadow-emerald-500/20 active:scale-95 transition-all min-h-[56px]"
          >
            <Download className="w-5 h-5" />
            <span>Unduh File .HTML</span>
          </button>

          <button
            onClick={handleCopyUrl}
            className="py-4 px-6 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-bold text-base flex items-center justify-center gap-2 active:scale-95 transition-all min-h-[56px]"
          >
            {copied ? <Check className="w-5 h-5 text-emerald-400" /> : <Copy className="w-5 h-5" />}
            <span>{copied ? 'Tersalin ke Clipboard!' : 'Salin Tautan Langsung'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
