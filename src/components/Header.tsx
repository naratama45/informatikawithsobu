import React from 'react';
import { Volume2, VolumeX, Maximize, Minimize, Download, RefreshCw } from 'lucide-react';
import { sound } from '../utils/audio';

interface HeaderProps {
  currentScene: number;
  onSceneChange: (scene: number) => void;
  onReset: () => void;
  onExport: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentScene,
  onSceneChange,
  onReset,
  onExport,
}) => {
  const [isMuted, setIsMuted] = React.useState(false);
  const [isFullscreen, setIsFullscreen] = React.useState(false);

  const toggleSound = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
        setIsFullscreen(false);
      }
    }
  };

  const scenes = [
    { id: 1, label: '01. Uji Refleks' },
    { id: 2, label: '02. Konsep' },
    { id: 3, label: '03. Flowchart' },
    { id: 4, label: '04. Verifikasi' },
  ];

  return (
    <header className="w-full bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-6 py-3 shrink-0 flex items-center justify-between gap-6 z-30">
      {/* Zone 1: Brand Wordmark */}
      <div className="flex items-center gap-3 shrink-0">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center shadow-lg shadow-emerald-500/20 text-white font-black text-xl tracking-wider">
          AT
        </div>
        <div className="leading-tight">
          <div className="font-display font-bold text-lg md:text-xl tracking-tight text-white flex items-center gap-2">
            <span>ALGORITMA TABAYYUN</span>
            <span className="hidden sm:inline-block text-[11px] font-mono uppercase bg-emerald-950/80 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded">
              TV Touch 65"
            </span>
          </div>
          <p className="text-xs text-slate-400 hidden lg:block">
            Informatika (Berpikir Komputasional) &times; Akidah Akhlak (Etika Digital)
          </p>
        </div>
      </div>

      {/* Zone 2: Scene Navigation Tabs (Large Touch targets) */}
      <nav className="flex items-center gap-2 bg-slate-950/70 p-1.5 rounded-xl border border-slate-800 shrink-0">
        {scenes.map((s) => {
          const isActive = currentScene === s.id;
          return (
            <button
              key={s.id}
              onClick={() => {
                sound.playSelect();
                onSceneChange(s.id);
              }}
              className={`px-3 md:px-5 py-2.5 rounded-lg text-sm md:text-base font-medium tracking-tight whitespace-nowrap transition-all flex items-center gap-2 min-h-[48px] ${
                isActive
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <span>{s.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Zone 3: Interactive Affordances (Touchscreen friendly) */}
      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={toggleSound}
          title={isMuted ? 'Aktifkan Suara' : 'Bisukan Suara'}
          className={`p-3 rounded-xl border min-w-[50px] min-h-[50px] flex items-center justify-center transition-all ${
            isMuted
              ? 'bg-rose-950/40 border-rose-800/60 text-rose-400 hover:bg-rose-900/50'
              : 'bg-slate-800/80 border-slate-700 text-emerald-400 hover:bg-slate-700'
          }`}
        >
          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </button>

        <button
          onClick={toggleFullscreen}
          title="Layar Penuh TV 65 Inch"
          className="p-3 rounded-xl border border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-slate-200 min-w-[50px] min-h-[50px] flex items-center justify-center transition-all"
        >
          {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
        </button>

        <button
          onClick={onReset}
          title="Ulangi dari Awal"
          className="p-3 rounded-xl border border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-slate-200 min-w-[50px] min-h-[50px] flex items-center justify-center transition-all"
        >
          <RefreshCw className="w-5 h-5" />
        </button>

        <button
          onClick={onExport}
          title="Unduh File HTML Mandiri"
          className="hidden md:flex items-center gap-2 px-3 py-2.5 rounded-xl border border-emerald-500/40 bg-emerald-950/40 hover:bg-emerald-900/60 text-emerald-300 font-medium text-xs md:text-sm min-h-[50px] transition-all"
        >
          <Download className="w-4 h-4" />
          <span>Single HTML</span>
        </button>
      </div>
    </header>
  );
};
