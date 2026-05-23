import { useRef, useState, useCallback, type PointerEvent } from 'react';
import { ChevronsRight } from 'lucide-react';

interface SlideToUnlockProps {
  label: string;
  onUnlock: () => void;
  disabled?: boolean;
}

const THUMB_W = 52;
const UNLOCK_RATIO = 0.88;

export default function SlideToUnlock({ label, onUnlock, disabled = false }: SlideToUnlockProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  const [dragging, setDragging] = useState(false);
  const dragStartX = useRef(0);
  const dragStartOffset = useRef(0);

  const getMaxOffset = useCallback(() => {
    const w = trackRef.current?.offsetWidth ?? 0;
    return Math.max(0, w - THUMB_W - 4);
  }, []);

  const snapBack = useCallback(() => {
    setOffset(0);
    setDragging(false);
  }, []);

  const completeUnlock = useCallback(() => {
    const max = getMaxOffset();
    setOffset(max);
    setDragging(false);
    if (navigator.vibrate) navigator.vibrate(12);
    onUnlock();
  }, [getMaxOffset, onUnlock]);

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (disabled) return;
    e.preventDefault();
    setDragging(true);
    dragStartX.current = e.clientX;
    dragStartOffset.current = offset;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!dragging || disabled) return;
    const max = getMaxOffset();
    const delta = e.clientX - dragStartX.current;
    const next = Math.max(0, Math.min(max, dragStartOffset.current + delta));
    setOffset(next);
    if (next >= max * UNLOCK_RATIO) {
      completeUnlock();
    }
  };

  const onPointerUp = () => {
    if (!dragging) return;
    const max = getMaxOffset();
    if (offset < max * UNLOCK_RATIO) {
      snapBack();
    }
  };

  return (
    <div
      ref={trackRef}
      className={`relative h-14 w-full border border-[#0B0D10]/15 bg-white/90 overflow-hidden select-none touch-none ${
        disabled ? 'opacity-50 pointer-events-none' : ''
      }`}
      aria-label={label}
    >
      <div
        className="absolute inset-y-0 left-0 bg-[#7A3A2E]/12 pointer-events-none"
        style={{
          width: offset + THUMB_W / 2,
          transition: dragging ? 'none' : 'width 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      />

      <div
        role="slider"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round((offset / Math.max(getMaxOffset(), 1)) * 100)}
        tabIndex={disabled ? -1 : 0}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={snapBack}
        onKeyDown={(e) => {
          if (disabled) return;
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            completeUnlock();
          }
        }}
        className="absolute top-1 z-10 flex h-12 w-[52px] cursor-grab active:cursor-grabbing items-center justify-center bg-[#0B0D10] text-[#F5F1EA] shadow-md active:scale-[0.98]"
        style={{
          left: offset + 2,
          transition: dragging ? 'none' : 'left 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
          touchAction: 'none',
        }}
      >
        <ChevronsRight size={20} strokeWidth={2} />
      </div>

      <span className="absolute inset-0 flex items-center justify-center pointer-events-none pl-14 pr-3 text-[9px] font-mono tracking-[0.18em] text-[#0B0D10]/75 uppercase font-bold">
        {label}
      </span>
    </div>
  );
}
