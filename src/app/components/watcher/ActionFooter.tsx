import React from 'react';
import { X } from 'lucide-react';
import type { WatcherAction } from './types';

interface ActionFooterProps {
  actions: WatcherAction[];
}

/**
 * A horizontal row of action affordances at the foot of a WatcherCard.
 *
 * Variants:
 *   - 'primary'   → solid Wati-green button
 *   - 'secondary' → muted text link
 *   - 'tertiary'  → smaller muted text link
 *   - 'dismiss'   → × icon at the far right
 */
export function ActionFooter({ actions }: ActionFooterProps) {
  const primary = actions.filter((a) => a.variant === 'primary');
  const secondary = actions.filter((a) => a.variant === 'secondary');
  const tertiary = actions.filter((a) => a.variant === 'tertiary');
  const outlined = actions.filter((a) => a.variant === 'outlined');
  const dismiss = actions.filter((a) => a.variant === 'dismiss');

  return (
    <div className="flex items-center justify-end gap-3 px-4 py-4 border-t border-gray-100">
      {tertiary.map((a) => (
        <button
          key={a.label}
          onClick={a.onClick}
          className="text-xs text-gray-500 hover:text-gray-800 transition-colors"
        >
          {a.label}
        </button>
      ))}
      {secondary.map((a) => (
        <button
          key={a.label}
          onClick={a.onClick}
          className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
        >
          {a.label}
        </button>
      ))}
      {outlined.map((a) => (
        <button
          key={a.label}
          onClick={a.onClick}
          className="px-3.5 py-1.5 bg-white border border-[#23a455] text-[#23a455] text-sm font-medium rounded-md hover:bg-[#ebf7f0] transition-colors"
        >
          {a.label}
        </button>
      ))}
      {primary.map((a) => (
        <button
          key={a.label}
          onClick={a.onClick}
          className="px-3.5 py-1.5 bg-[#23a455] text-white text-sm font-medium rounded-md hover:bg-[#1d8f47] transition-colors"
        >
          {a.label}
        </button>
      ))}
      {dismiss.map((a) => (
        <button
          key={a.label}
          onClick={a.onClick}
          aria-label={a.label}
          title={a.label}
          className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      ))}
    </div>
  );
}
