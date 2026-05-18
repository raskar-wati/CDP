import React from 'react';
import type { LucideIcon } from 'lucide-react';
import type { Watcher } from './types';

// ── Template registry ──────────────────────────────────────────────────────
//
// All four starter watchers (Ready-to-buy, Top Topics, Demand Spike, Spam)
// are now first-class active watchers with their own factories. This list
// is intentionally empty — it stays so future watcher *concepts* that
// don't yet have a real implementation can be advertised as templates.

export interface TemplateWatcher {
  id: string;
  name: string;
  description: string;
  Icon: LucideIcon;
  /** Builds a Watcher when the template is enabled. */
  build: (opts?: {
    variant?: 'full' | 'snippet' | 'preview';
    onViewDetails?: () => void;
    onDismiss?: () => void;
  }) => Watcher;
}

export const TEMPLATE_WATCHERS: TemplateWatcher[] = [];

// ── Template card UI ───────────────────────────────────────────────────────

interface TemplateCardProps {
  template: TemplateWatcher;
  onEnable: () => void;
}

export function TemplateCard({ template, onEnable }: TemplateCardProps) {
  const Icon = template.Icon;
  return (
    <div className="border border-gray-200 rounded-lg bg-white px-4 py-3.5 flex items-start gap-3">
      <div className="w-7 h-7 rounded-md bg-gray-50 border border-gray-200 flex items-center justify-center shrink-0">
        <Icon className="w-3.5 h-3.5 text-gray-600" strokeWidth={1.75} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 leading-tight">{template.name}</p>
        <p className="text-xs text-gray-500 mt-1 leading-snug">{template.description}</p>
      </div>
      <button
        onClick={onEnable}
        className="text-xs font-medium text-[#23a455] hover:text-[#1d8f47] transition-colors shrink-0 self-start mt-0.5"
      >
        Enable
      </button>
    </div>
  );
}
