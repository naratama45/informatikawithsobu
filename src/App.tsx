/**
 * Algoritma Tabayyun - Media Pembelajaran Interaktif TV Touchscreen 65"
 * Mata Pelajaran: Informatika (Berpikir Komputasional) x Akidah Akhlak (Tabayyun & Etika Digital)
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Scene1Hook } from './components/Scene1Hook';
import { Scene2Concept } from './components/Scene2Concept';
import { Scene3Flowchart } from './components/Scene3Flowchart';
import { Scene4WrapUp } from './components/Scene4WrapUp';
import { ExportModal } from './components/ExportModal';
import { sound } from './utils/audio';

export default function App() {
  const [currentScene, setCurrentScene] = useState<number>(1);
  const [isShaking, setIsShaking] = useState<boolean>(false);
  const [isExportOpen, setIsExportOpen] = useState<boolean>(false);

  const triggerScreenShake = () => {
    setIsShaking(true);
    setTimeout(() => {
      setIsShaking(false);
    }, 550);
  };

  const handleReset = () => {
    sound.playSelect();
    setCurrentScene(1);
  };

  // Keyboard navigation shortcuts for teacher/demonstrator
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' && currentScene < 4) {
        sound.playSelect();
        setCurrentScene((prev) => prev + 1);
      } else if (e.key === 'ArrowLeft' && currentScene > 1) {
        sound.playSelect();
        setCurrentScene((prev) => prev - 1);
      } else if (e.key.toLowerCase() === 'm') {
        sound.toggleMute();
      } else if (e.key.toLowerCase() === 'r') {
        handleReset();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentScene]);

  return (
    <div
      className={`w-screen h-screen bg-cyber-grid text-slate-100 flex flex-col justify-between overflow-hidden relative select-none ${
        isShaking ? 'animate-screen-shake' : ''
      }`}
    >
      {/* Top Header */}
      <Header
        currentScene={currentScene}
        onSceneChange={(scene) => setCurrentScene(scene)}
        onReset={handleReset}
        onExport={() => setIsExportOpen(true)}
      />

      {/* Main Interactive Stage for 65" 16:9 Viewport */}
      <main className="flex-1 w-full h-[calc(100vh-76px)] overflow-y-auto relative flex flex-col items-center justify-center">
        {currentScene === 1 && (
          <Scene1Hook
            onProceed={() => {
              sound.playSuccess();
              setCurrentScene(2);
            }}
            triggerScreenShake={triggerScreenShake}
          />
        )}

        {currentScene === 2 && (
          <Scene2Concept
            onProceed={() => {
              sound.playSuccess();
              setCurrentScene(3);
            }}
          />
        )}

        {currentScene === 3 && (
          <Scene3Flowchart
            onSuccess={() => {
              setCurrentScene(4);
            }}
            triggerScreenShake={triggerScreenShake}
          />
        )}

        {currentScene === 4 && (
          <Scene4WrapUp
            onRestart={handleReset}
            onExport={() => setIsExportOpen(true)}
          />
        )}
      </main>

      {/* Standalone HTML File Export Modal */}
      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
      />
    </div>
  );
}
