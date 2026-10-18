import React, { useState, useRef, useEffect } from 'react';
import { CheckCircle2, AlertCircle, RefreshCw, Sparkles, HelpCircle, ArrowDown, ArrowRight, CornerDownLeft, CornerDownRight, X } from 'lucide-react';
import { sound } from '../utils/audio';

interface Scene3FlowchartProps {
  onSuccess: () => void;
  triggerScreenShake: () => void;
}

export interface FlowBlock {
  id: string;
  text: string;
  shape: 'oval' | 'rect' | 'diamond' | 'parallelogram';
  shapeLabel: string;
  expectedSlot: number;
  hint: string;
}

const MASTER_BLOCKS: FlowBlock[] = [
  {
    id: 'b1',
    text: 'Mulai: Terima Informasi',
    shape: 'oval',
    shapeLabel: 'Terminator (Start/End)',
    expectedSlot: 1,
    hint: 'Bentuk Oval mengawali sebuah algoritma (Input/Start point).',
  },
  {
    id: 'b2',
    text: 'Cek Validitas Sumber Info',
    shape: 'rect',
    shapeLabel: 'Proses (Processing)',
    expectedSlot: 2,
    hint: 'Bentuk Persegi Panjang menjalankan proses komputasi atau verifikasi.',
  },
  {
    id: 'b3',
    text: 'Apakah info benar & bermanfaat?',
    shape: 'diamond',
    shapeLabel: 'Decision (Kondisi If/Else)',
    expectedSlot: 3,
    hint: 'Bentuk Belah Ketupat mengevaluasi kondisi logika Benar atau Salah.',
  },
  {
    id: 'b4',
    text: 'Hapus & Abaikan',
    shape: 'parallelogram',
    shapeLabel: 'I/O Output (Cabang False)',
    expectedSlot: 4,
    hint: 'Bentuk Jajar Genjang untuk luaran saat kondisi False (Tidak Benar/Mudharat).',
  },
  {
    id: 'b5',
    text: 'Sebarkan demi Kebaikan',
    shape: 'parallelogram',
    shapeLabel: 'I/O Output (Cabang True)',
    expectedSlot: 5,
    hint: 'Bentuk Jajar Genjang untuk luaran saat kondisi True (Sah & Bermanfaat).',
  },
];

export const Scene3Flowchart: React.FC<Scene3FlowchartProps> = ({
  onSuccess,
  triggerScreenShake,
}) => {
  // Slots: 1: Mulai, 2: Proses, 3: Decision, 4: Branch False, 5: Branch True
  const [slots, setSlots] = useState<{ [key: number]: FlowBlock | null }>({
    1: null,
    2: null,
    3: null,
    4: null,
    5: null,
  });

  // Available blocks in bottom bank
  const [bankBlocks, setBankBlocks] = useState<FlowBlock[]>([]);
  // Selected block for Tap-to-Move
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  // Feedback status
  const [verificationError, setVerificationError] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [showGuideModal, setShowGuideModal] = useState(false);

  // Initialize blocks shuffled once
  useEffect(() => {
    // Shuffled initial bank
    const shuffled = [...MASTER_BLOCKS].sort(() => Math.random() - 0.5);
    setBankBlocks(shuffled);
  }, []);

  // Helper to place block into slot
  const placeBlockIntoSlot = (block: FlowBlock, slotNum: number) => {
    sound.playSelect();
    setSlots((prev) => {
      const currentInSlot = prev[slotNum];
      const newSlots = { ...prev, [slotNum]: block };

      // If another slot had this block, vacate it
      Object.keys(newSlots).forEach((k) => {
        const keyNum = parseInt(k, 10);
        if (keyNum !== slotNum && newSlots[keyNum]?.id === block.id) {
          newSlots[keyNum] = null;
        }
      });

      return newSlots;
    });

    // Remove from bank if it was in bank
    setBankBlocks((prev) => {
      const filtered = prev.filter((b) => b.id !== block.id);
      // If there was an existing block in this slot, return it to bank
      const currentInSlot = slots[slotNum];
      if (currentInSlot && currentInSlot.id !== block.id) {
        return [...filtered, currentInSlot];
      }
      return filtered;
    });

    setSelectedBlockId(null);
    setVerificationError(null);
  };

  // Remove block from slot back to bank
  const removeBlockFromSlot = (slotNum: number) => {
    const block = slots[slotNum];
    if (!block) return;
    sound.playSelect();

    setSlots((prev) => ({ ...prev, [slotNum]: null }));
    setBankBlocks((prev) => [...prev, block]);
    setSelectedBlockId(null);
    setVerificationError(null);
  };

  // Reset everything
  const resetFlowchart = () => {
    sound.playSelect();
    setSlots({ 1: null, 2: null, 3: null, 4: null, 5: null });
    const shuffled = [...MASTER_BLOCKS].sort(() => Math.random() - 0.5);
    setBankBlocks(shuffled);
    setSelectedBlockId(null);
    setVerificationError(null);
  };

  // Tap-to-move handling
  const handleBankBlockTap = (block: FlowBlock) => {
    sound.playSelect();
    if (selectedBlockId === block.id) {
      setSelectedBlockId(null);
    } else {
      setSelectedBlockId(block.id);
    }
  };

  const handleSlotTap = (slotNum: number) => {
    if (selectedBlockId) {
      const blockToPlace = MASTER_BLOCKS.find((b) => b.id === selectedBlockId);
      if (blockToPlace) {
        placeBlockIntoSlot(blockToPlace, slotNum);
        return;
      }
    }

    // If slot has a block and no block is selected, selecting it allows moving or removing
    if (slots[slotNum]) {
      removeBlockFromSlot(slotNum);
    }
  };

  // Native Drag and Drop HTML5 / Pointer Drag Handler
  const handleDragStart = (e: React.DragEvent, block: FlowBlock) => {
    e.dataTransfer.setData('text/plain', block.id);
    sound.playSelect();
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, slotNum: number) => {
    e.preventDefault();
    const blockId = e.dataTransfer.getData('text/plain');
    const block = MASTER_BLOCKS.find((b) => b.id === blockId);
    if (block) {
      placeBlockIntoSlot(block, slotNum);
    }
  };

  // Verification check
  const allSlotsFilled = Object.values(slots).every((s) => s !== null);

  const verifyAlgorithm = () => {
    setIsVerifying(true);
    sound.playSelect();

    setTimeout(() => {
      setIsVerifying(false);

      // Check slot correctness
      const isS1Correct = slots[1]?.id === 'b1';
      const isS2Correct = slots[2]?.id === 'b2';
      const isS3Correct = slots[3]?.id === 'b3';
      const isS4Correct = slots[4]?.id === 'b4';
      const isS5Correct = slots[5]?.id === 'b5';

      if (isS1Correct && isS2Correct && isS3Correct && isS4Correct && isS5Correct) {
        sound.playSuccess();
        onSuccess();
      } else {
        sound.playDanger();
        triggerScreenShake();

        // Informative guidance based on mistake
        if (!isS1Correct) {
          setVerificationError('Slot 1 belum tepat! Simbol Terminator (Oval) wajib memulai aliran algoritma.');
        } else if (!isS2Correct) {
          setVerificationError('Slot 2 belum tepat! Proses verifikasi sumber (Persegi Panjang) harus dilakukan sebelum pengambilan keputusan.');
        } else if (!isS3Correct) {
          setVerificationError('Slot 3 belum tepat! Simbol Decision (Belah Ketupat) harus berada di simpul percabangan!');
        } else if (!isS4Correct || !isS5Correct) {
          setVerificationError('Arah cabang belum tepat! Cabang TIDAK/MUDHARAT harus menuju "Hapus & Abaikan", sedangkan cabang YA/BERMANFAAT menuju "Sebarkan".');
        }
      }
    }, 400);
  };

  // Render shapes helper
  const renderShapeVisual = (
    shape: 'oval' | 'rect' | 'diamond' | 'parallelogram',
    text: string,
    isSlot: boolean = false,
    slotNum?: number
  ) => {
    switch (shape) {
      case 'oval':
        return (
          <div
            className={`w-full h-full rounded-full border-2 flex items-center justify-center p-3 text-center transition-all ${
              isSlot
                ? 'border-emerald-500/50 bg-emerald-950/20'
                : 'border-cyan-400 bg-gradient-to-r from-cyan-900 to-slate-900 shadow-lg shadow-cyan-900/40 text-cyan-200'
            }`}
          >
            <span className="font-bold text-sm md:text-base leading-tight">{text}</span>
          </div>
        );
      case 'rect':
        return (
          <div
            className={`w-full h-full rounded-xl border-2 flex items-center justify-center p-3 text-center transition-all ${
              isSlot
                ? 'border-emerald-500/50 bg-emerald-950/20'
                : 'border-blue-400 bg-gradient-to-r from-blue-900 to-slate-900 shadow-lg shadow-blue-900/40 text-blue-200'
            }`}
          >
            <span className="font-bold text-sm md:text-base leading-tight">{text}</span>
          </div>
        );
      case 'diamond':
        return (
          <div className="relative w-full h-full flex items-center justify-center">
            <div
              className={`w-28 h-28 md:w-32 md:h-32 rotate-45 border-2 transition-all flex items-center justify-center ${
                isSlot
                  ? 'border-amber-500/50 bg-amber-950/20'
                  : 'border-amber-400 bg-gradient-to-br from-amber-900 via-slate-900 to-amber-950 shadow-lg shadow-amber-900/40'
              }`}
            ></div>
            <span className="absolute inset-0 flex items-center justify-center p-3 text-center font-bold text-xs md:text-sm text-amber-200 leading-tight">
              {text}
            </span>
          </div>
        );
      case 'parallelogram':
        const isBranchLeft = slotNum === 4;
        return (
          <div
            className={`w-full h-full border-2 shape-parallelogram flex items-center justify-center p-3 text-center transition-all rounded-md ${
              isSlot
                ? isBranchLeft
                  ? 'border-rose-500/50 bg-rose-950/20'
                  : 'border-emerald-500/50 bg-emerald-950/20'
                : text.includes('Hapus')
                ? 'border-rose-400 bg-gradient-to-r from-rose-950 to-slate-900 shadow-lg shadow-rose-950/40 text-rose-200'
                : 'border-emerald-400 bg-gradient-to-r from-emerald-950 to-slate-900 shadow-lg shadow-emerald-950/40 text-emerald-200'
            }`}
          >
            <span className="shape-parallelogram-content font-bold text-xs md:text-sm leading-tight">
              {text}
            </span>
          </div>
        );
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-between p-4 md:p-6 select-none overflow-y-auto">
      {/* Header & Controls */}
      <div className="w-full max-w-6xl mx-auto flex items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-emerald-400 font-mono tracking-widest text-xs uppercase font-semibold">
              SCENE 03 // TANTANGAN LOGIKA ALGORITMA TABAYYUN
            </span>
            <button
              onClick={() => setShowGuideModal(true)}
              className="text-slate-400 hover:text-white p-1 rounded-md"
              title="Panduan Simbol Flowchart"
            >
              <HelpCircle className="w-4 h-4 text-emerald-400" />
            </button>
          </div>
          <h1 className="text-2xl md:text-4xl font-black tracking-tight text-white mt-0.5">
            Susun Flowchart: Dari Input Menuju Output Berakhlak
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={resetFlowchart}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-xs md:text-sm flex items-center gap-2 border border-slate-700 transition-all min-h-[46px]"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Reset Posisi</span>
          </button>
        </div>
      </div>

      {/* Adaptive Error Toast */}
      {verificationError && (
        <div className="w-full max-w-3xl mx-auto mt-2 p-3.5 rounded-2xl bg-rose-950/80 border-2 border-rose-500 text-rose-200 flex items-center justify-between gap-3 shadow-lg animate-glow-red">
          <div className="flex items-center gap-3 text-sm md:text-base">
            <AlertCircle className="w-6 h-6 text-rose-400 shrink-0" />
            <span>{verificationError}</span>
          </div>
          <button
            onClick={() => setVerificationError(null)}
            className="p-1 hover:bg-rose-900 rounded-lg text-rose-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* FLOWCHART CANVAS (The connected slots) */}
      <div className="w-full max-w-5xl mx-auto my-auto py-2 flex flex-col items-center">
        {/* SLOT 1: TERMINATOR (OVAL) */}
        <div className="flex flex-col items-center w-full">
          <div
            onClick={() => handleSlotTap(1)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, 1)}
            className={`w-72 md:w-80 h-16 rounded-full border-2 border-dashed flex items-center justify-center p-1.5 cursor-pointer transition-all ${
              slots[1]
                ? 'border-solid border-cyan-400 bg-cyan-950/40'
                : selectedBlockId
                ? 'border-emerald-400 bg-emerald-950/30 scale-105 animate-pulse'
                : 'border-slate-600 bg-slate-900/60 hover:border-slate-400'
            }`}
          >
            {slots[1] ? (
              <div className="w-full h-full relative group">
                {renderShapeVisual('oval', slots[1].text)}
                <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-slate-800 text-slate-300 border border-slate-600 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                  &times;
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-slate-400 font-mono text-xs md:text-sm">
                <span>[Slot 1: Terminator Mulai]</span>
              </div>
            )}
          </div>

          {/* Connected Arrow 1 -> 2 */}
          <div className="flex flex-col items-center my-1 text-emerald-400">
            <div className="w-0.5 h-6 bg-gradient-to-b from-cyan-400 to-emerald-400"></div>
            <ArrowDown className="w-5 h-5 -mt-1 text-emerald-400 animate-bounce" />
          </div>
        </div>

        {/* SLOT 2: PROCESS (RECTANGLE) */}
        <div className="flex flex-col items-center w-full">
          <div
            onClick={() => handleSlotTap(2)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, 2)}
            className={`w-72 md:w-80 h-16 rounded-xl border-2 border-dashed flex items-center justify-center p-1.5 cursor-pointer transition-all ${
              slots[2]
                ? 'border-solid border-blue-400 bg-blue-950/40'
                : selectedBlockId
                ? 'border-emerald-400 bg-emerald-950/30 scale-105 animate-pulse'
                : 'border-slate-600 bg-slate-900/60 hover:border-slate-400'
            }`}
          >
            {slots[2] ? (
              <div className="w-full h-full relative group">
                {renderShapeVisual('rect', slots[2].text)}
                <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-slate-800 text-slate-300 border border-slate-600 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                  &times;
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-slate-400 font-mono text-xs md:text-sm">
                <span>[Slot 2: Proses Verifikasi]</span>
              </div>
            )}
          </div>

          {/* Connected Arrow 2 -> 3 */}
          <div className="flex flex-col items-center my-1 text-emerald-400">
            <div className="w-0.5 h-6 bg-gradient-to-b from-blue-400 to-amber-400"></div>
            <ArrowDown className="w-5 h-5 -mt-1 text-amber-400" />
          </div>
        </div>

        {/* SLOT 3: DECISION (DIAMOND) */}
        <div className="flex flex-col items-center w-full relative">
          <div
            onClick={() => handleSlotTap(3)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, 3)}
            className={`w-36 h-36 md:w-40 md:h-40 flex items-center justify-center p-2 cursor-pointer transition-all relative ${
              slots[3]
                ? ''
                : selectedBlockId
                ? 'scale-105'
                : 'hover:scale-102'
            }`}
          >
            {slots[3] ? (
              <div className="w-full h-full relative group flex items-center justify-center">
                {renderShapeVisual('diamond', slots[3].text)}
                <span className="absolute top-1 right-1 w-6 h-6 rounded-full bg-slate-800 text-slate-300 border border-slate-600 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity z-10">
                  &times;
                </span>
              </div>
            ) : (
              <div className="relative w-full h-full flex items-center justify-center">
                <div
                  className={`w-28 h-28 md:w-32 md:h-32 rotate-45 border-2 border-dashed flex items-center justify-center ${
                    selectedBlockId
                      ? 'border-amber-400 bg-amber-950/30 animate-pulse'
                      : 'border-slate-600 bg-slate-900/60'
                  }`}
                ></div>
                <span className="absolute inset-0 flex items-center justify-center text-slate-400 font-mono text-xs text-center p-2">
                  [Slot 3: Decision Diamond]
                </span>
              </div>
            )}
          </div>

          {/* BRANCH ARROWS: LEFT (FALSE/TIDAK) & RIGHT (TRUE/YA) */}
          <div className="w-full max-w-3xl flex items-center justify-between px-8 md:px-16 -mt-2 mb-2">
            {/* Left Branch Arrow */}
            <div className="flex flex-col items-center">
              <span className="text-xs md:text-sm font-mono font-bold text-rose-400 bg-rose-950/80 px-2 py-0.5 rounded border border-rose-800/60">
                TIDAK (Hoaks / Mudharat)
              </span>
              <div className="flex items-center text-rose-400 mt-1">
                <CornerDownLeft className="w-6 h-6" />
                <ArrowDown className="w-5 h-5 -ml-1 text-rose-400" />
              </div>
            </div>

            {/* Right Branch Arrow */}
            <div className="flex flex-col items-center">
              <span className="text-xs md:text-sm font-mono font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/60">
                YA (Valid & Bermanfaat)
              </span>
              <div className="flex items-center text-emerald-400 mt-1">
                <CornerDownRight className="w-6 h-6" />
                <ArrowDown className="w-5 h-5 -ml-1 text-emerald-400" />
              </div>
            </div>
          </div>
        </div>

        {/* BRANCH OUTPUT SLOTS: SLOT 4 & SLOT 5 */}
        <div className="w-full max-w-4xl grid grid-cols-2 gap-8 md:gap-16 mt-1">
          {/* SLOT 4: FALSE (PARALLELOGRAM) */}
          <div className="flex flex-col items-center">
            <div
              onClick={() => handleSlotTap(4)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, 4)}
              className={`w-64 md:w-72 h-16 border-2 border-dashed flex items-center justify-center p-1.5 cursor-pointer transition-all shape-parallelogram ${
                slots[4]
                  ? 'border-solid border-rose-400 bg-rose-950/40'
                  : selectedBlockId
                  ? 'border-rose-400 bg-rose-950/30 scale-105 animate-pulse'
                  : 'border-slate-600 bg-slate-900/60 hover:border-slate-400'
              }`}
            >
              {slots[4] ? (
                <div className="w-full h-full relative group">
                  {renderShapeVisual('parallelogram', slots[4].text, false, 4)}
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-slate-800 text-slate-300 border border-slate-600 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity shape-parallelogram-content">
                    &times;
                  </span>
                </div>
              ) : (
                <span className="shape-parallelogram-content text-slate-400 font-mono text-xs md:text-sm">
                  [Slot 4: Output False]
                </span>
              )}
            </div>
          </div>

          {/* SLOT 5: TRUE (PARALLELOGRAM) */}
          <div className="flex flex-col items-center">
            <div
              onClick={() => handleSlotTap(5)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, 5)}
              className={`w-64 md:w-72 h-16 border-2 border-dashed flex items-center justify-center p-1.5 cursor-pointer transition-all shape-parallelogram ${
                slots[5]
                  ? 'border-solid border-emerald-400 bg-emerald-950/40'
                  : selectedBlockId
                  ? 'border-emerald-400 bg-emerald-950/30 scale-105 animate-pulse'
                  : 'border-slate-600 bg-slate-900/60 hover:border-slate-400'
              }`}
            >
              {slots[5] ? (
                <div className="w-full h-full relative group">
                  {renderShapeVisual('parallelogram', slots[5].text, false, 5)}
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-slate-800 text-slate-300 border border-slate-600 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity shape-parallelogram-content">
                    &times;
                  </span>
                </div>
              ) : (
                <span className="shape-parallelogram-content text-slate-400 font-mono text-xs md:text-sm">
                  [Slot 5: Output True]
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM BANK: 5 BLOCKS & VERIFY BUTTON */}
      <div className="w-full max-w-6xl mx-auto pt-3 border-t border-slate-800">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs md:text-sm text-slate-400 font-mono flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>PILIH BLOK DI BAWAH (Sentuh blok &rarr; Sentuh slot tujuan):</span>
          </span>
          <span className="text-xs text-slate-500 font-mono">
            {Object.values(slots).filter((s) => s !== null).length} / 5 Slot Terpasang
          </span>
        </div>

        {/* The 5 Draggable / Clickable Blocks */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {bankBlocks.length > 0 ? (
            bankBlocks.map((block) => {
              const isSelected = selectedBlockId === block.id;
              return (
                <div
                  key={block.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, block)}
                  onClick={() => handleBankBlockTap(block)}
                  className={`p-3 rounded-2xl border-2 flex flex-col items-center justify-center text-center cursor-pointer transition-all min-h-[75px] ${
                    isSelected
                      ? 'border-emerald-400 bg-emerald-950/80 ring-4 ring-emerald-500/30 scale-105 shadow-xl shadow-emerald-500/20'
                      : 'border-slate-700 bg-slate-900/90 hover:border-slate-500 hover:bg-slate-850'
                  }`}
                >
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1">
                    {block.shapeLabel}
                  </span>
                  <span className="font-bold text-xs md:text-sm text-white leading-tight">
                    {block.text}
                  </span>
                </div>
              );
            })
          ) : (
            <div className="col-span-5 py-3 text-center text-emerald-400 font-mono text-sm bg-emerald-950/30 rounded-2xl border border-emerald-500/30">
              Semua blok telah terpasang di diagram! Tekan tombol Verifikasi Sistem di bawah.
            </div>
          )}
        </div>

        {/* SYSTEM VERIFICATION ACTION BUTTON */}
        <div className="mt-4 flex items-center justify-center">
          <button
            onClick={verifyAlgorithm}
            disabled={!allSlotsFilled || isVerifying}
            className={`w-full max-w-md py-4 px-8 rounded-2xl font-black text-lg md:text-xl shadow-2xl flex items-center justify-center gap-3 transition-all min-h-[64px] ${
              allSlotsFilled
                ? 'bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500 text-slate-950 shadow-emerald-500/40 animate-glow-green scale-102 cursor-pointer'
                : 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed opacity-60'
            }`}
          >
            {isVerifying ? (
              <RefreshCw className="w-6 h-6 animate-spin" />
            ) : (
              <CheckCircle2 className="w-7 h-7 text-slate-950" />
            )}
            <span>VERIFIKASI SISTEM (CEK AKHLAK)</span>
          </button>
        </div>
      </div>

      {/* Guide Modal for Flowchart Symbols */}
      {showGuideModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-6">
          <div className="bg-slate-900 border-2 border-emerald-500/50 rounded-3xl p-6 md:p-8 max-w-xl w-full shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
              <h3 className="font-black text-xl text-white">Panduan Simbol Standar Flowchart</h3>
              <button
                onClick={() => setShowGuideModal(false)}
                className="p-1 rounded-lg hover:bg-slate-800 text-slate-400"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4 text-sm text-slate-300">
              <div className="flex items-center gap-3">
                <span className="w-20 py-1 text-center font-bold text-xs rounded-full bg-cyan-900 text-cyan-200 border border-cyan-400">
                  Oval
                </span>
                <span><strong>Terminator:</strong> Menandakan awal (Mulai) atau akhir (Selesai) aliran program.</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-20 py-1 text-center font-bold text-xs rounded-lg bg-blue-900 text-blue-200 border border-blue-400">
                  Persegi
                </span>
                <span><strong>Process:</strong> Menjalankan tindakan/proses pemrosesan (verifikasi sanad, sanitasi data).</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-20 py-1 text-center font-bold text-xs rotate-12 bg-amber-900 text-amber-200 border border-amber-400">
                  Diamond
                </span>
                <span><strong>Decision:</strong> Titik percabangan logika Boolean (Benar/Salah, Maslahat/Mudharat).</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-20 py-1 text-center font-bold text-xs shape-parallelogram bg-emerald-900 text-emerald-200 border border-emerald-400">
                  Paralel
                </span>
                <span><strong>Input/Output:</strong> Transmisi data ke luar (Hapus pesan atau Sebarkan).</span>
              </div>
            </div>
            <button
              onClick={() => setShowGuideModal(false)}
              className="mt-6 w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-base"
            >
              Saya Mengerti
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
