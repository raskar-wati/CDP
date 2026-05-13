import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Minus, Plus, GripHorizontal } from 'lucide-react';

export interface DevVersion {
  id: string;
  label: string;
  description?: string;
}

interface DevVersionWidgetProps {
  versions: DevVersion[];
  activeVersion: string;
  onVersionChange: (id: string) => void;
}

export function DevVersionWidget({ versions, activeVersion, onVersionChange }: DevVersionWidgetProps) {
  const [minimised, setMinimised] = useState(false);
  const [pos, setPos] = useState({ x: window.innerWidth - 220, y: window.innerHeight - 180 });
  const dragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });
  const widgetRef = useRef<HTMLDivElement>(null);

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    dragging.current = true;
    offset.current = { x: e.clientX - pos.x, y: e.clientY - pos.y };
    e.preventDefault();
  }, [pos]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!dragging.current) return;
      const el = widgetRef.current;
      const w = el?.offsetWidth ?? 200;
      const h = el?.offsetHeight ?? 120;
      setPos({
        x: Math.max(0, Math.min(window.innerWidth - w, e.clientX - offset.current.x)),
        y: Math.max(0, Math.min(window.innerHeight - h, e.clientY - offset.current.y)),
      });
    };
    const onUp = () => { dragging.current = false; };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp); };
  }, []);

  const active = versions.find(v => v.id === activeVersion);

  return (
    <div
      ref={widgetRef}
      style={{ position: 'fixed', left: pos.x, top: pos.y, zIndex: 9999 }}
      className="select-none"
    >
      {minimised ? (
        /* Minimised pill */
        <button
          onMouseDown={onMouseDown}
          onClick={() => setMinimised(false)}
          className="flex items-center gap-1.5 bg-[#091840] text-white text-xs px-3 py-1.5 rounded-full shadow-lg hover:bg-[#0d2160] transition-colors cursor-grab active:cursor-grabbing"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#23a455]" />
          <span>{active?.label ?? '—'}</span>
          <Plus className="w-3 h-3 opacity-60" />
        </button>
      ) : (
        /* Expanded widget */
        <div className="bg-white border border-gray-200 rounded-xl shadow-xl w-48 overflow-hidden">
          {/* Drag handle / header */}
          <div
            onMouseDown={onMouseDown}
            className="flex items-center justify-between px-3 py-2 bg-[#091840] cursor-grab active:cursor-grabbing"
          >
            <div className="flex items-center gap-1.5">
              <GripHorizontal className="w-3 h-3 text-white/40" />
              <span className="text-[10px] font-semibold uppercase tracking-widest text-white/60">Versions</span>
            </div>
            <button
              onMouseDown={e => e.stopPropagation()}
              onClick={() => setMinimised(true)}
              className="text-white/40 hover:text-white/80 transition-colors"
            >
              <Minus className="w-3 h-3" />
            </button>
          </div>

          {/* Version list */}
          <div className="p-2 space-y-1">
            {versions.map(v => (
              <button
                key={v.id}
                onClick={() => onVersionChange(v.id)}
                className={`w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-left transition-colors ${
                  activeVersion === v.id
                    ? 'bg-[#ebf7f0] text-[#23a455]'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${activeVersion === v.id ? 'bg-[#23a455]' : 'bg-gray-200'}`} />
                <div className="min-w-0">
                  <p className={`text-xs truncate ${activeVersion === v.id ? 'font-semibold' : 'font-medium'}`}>{v.label}</p>
                  {v.description && <p className="text-[10px] text-gray-400 truncate">{v.description}</p>}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
