import React from 'react';
import { Pencil } from 'lucide-react';
import type { FreshnessState, Watcher } from './types';
import { NarrativeBlock } from './NarrativeBlock';
import { MetricCalloutBlock } from './MetricCalloutBlock';
import { WatcherTable } from './WatcherTable';
import { ReviewCallout } from './ReviewCallout';
import { ActionFooter } from './ActionFooter';

// ── Agent identity ─────────────────────────────────────────────────────────

function AgentIndicator() {
  return (
    <div className="w-6 h-6 rounded-full bg-gray-800 flex items-center justify-center gap-[3px] shrink-0">
      <span className="w-[3px] h-[3px] rounded-full bg-white" />
      <span className="w-[3px] h-[3px] rounded-full bg-white" />
    </div>
  );
}

// ── Freshness badge ────────────────────────────────────────────────────────

function FreshnessBadge({ state }: { state: FreshnessState }) {
  const dotByState: Partial<Record<FreshnessState, string>> = {
    fresh: 'bg-[#23a455]',
    aging: 'bg-[#f59e0b]',
    stale: 'bg-gray-400',
    'auto-resolved': 'bg-gray-300',
    snoozed: 'bg-gray-300',
  };
  const dotClass = dotByState[state];
  if (!dotClass) return null;
  return (
    <span className="inline-flex items-center gap-1 text-xs text-gray-500">
      <span className={`w-1.5 h-1.5 rounded-full ${dotClass}`} />
      {state}
    </span>
  );
}

// ── Props ──────────────────────────────────────────────────────────────────

interface WatcherCardProps {
  watcher: Watcher;
  /**
   * 'full'    (default) — header + every section + footer.
   * 'snippet' — header + narrative + the primary/dismiss footer only.
   *             Used by the inbox surface.
   * 'preview' — header + narrative only, no footer. Used by the
   *             Workforce active list (whole card clickable).
   */
  variant?: 'full' | 'snippet' | 'preview';
  cardId?: string;
  highlight?: boolean;
  /** If provided, whole card becomes clickable (Workforce previews). */
  onCardClick?: () => void;
  /** If provided, the header renders an "Edit watcher" affordance that
   *  fires this callback with the watcher's id, name, and prompt. */
  onEdit?: (args: { id: string; name: string; prompt: string }) => void;
}

// ── Card ──────────────────────────────────────────────────────────────────

export function WatcherCard({
  watcher,
  variant = 'full',
  cardId,
  highlight = false,
  onCardClick,
  onEdit,
}: WatcherCardProps) {
  const isSnippet = variant === 'snippet';
  const isPreview = variant === 'preview';

  // Snippet and preview hide the metric/table/review sections.
  const showSections = !isSnippet && !isPreview;

  const visibleActions =
    isSnippet
      ? watcher.actions.filter(
          (a) => a.variant === 'primary' || a.variant === 'dismiss'
        )
      : isPreview
      ? []
      : watcher.actions;

  return (
    <div
      id={cardId}
      onClick={onCardClick}
      role={onCardClick ? 'button' : undefined}
      tabIndex={onCardClick ? 0 : undefined}
      onKeyDown={
        onCardClick
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onCardClick();
              }
            }
          : undefined
      }
      className={`bg-white border border-gray-200 rounded-lg overflow-hidden transition-colors duration-200 ${
        highlight ? 'bg-[#ebf7f0]' : ''
      } ${
        onCardClick
          ? 'cursor-pointer hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#23a455]/30'
          : ''
      }`}
    >
      {/*
        Header — agent identity, name, freshness chip, timestamp, edit
        affordance, and the "Last updated" sub-line. Timestamp verb
        convention is documented on the Watcher type.
      */}
      <div className="flex items-start gap-2.5 px-4 py-3 border-b border-gray-100">
        <AgentIndicator />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2.5 flex-wrap">
            <h3 className="text-sm font-semibold text-gray-900 leading-none">
              {watcher.name}
            </h3>
            <FreshnessBadge state={watcher.freshness} />
          </div>
          <p className="text-[11px] text-gray-400 mt-1.5 leading-none">
            {watcher.lastUpdated}
          </p>
        </div>
        {onEdit && !isPreview && !isSnippet && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit({
                id: watcher.id,
                name: watcher.name,
                prompt: watcher.prompt,
              });
            }}
            aria-label="Edit watcher"
            title="Edit watcher"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-700 border border-gray-200 bg-white px-2.5 py-1.5 rounded-md hover:bg-gray-50 hover:border-gray-300 transition-colors"
          >
            <Pencil className="w-3 h-3" />
            Edit
          </button>
        )}
        <span className="text-xs text-gray-400 leading-none whitespace-nowrap self-center">
          {watcher.timestamp}
        </span>
      </div>

      {/* Body — narrative first, then optional metric / table.
          24px gap between sections, 16px horizontal padding. */}
      <div className="flex flex-col px-4 pt-6 pb-4 gap-6">
        <NarrativeBlock text={watcher.narrative} />
        {showSections && watcher.metricCallout && (
          <MetricCalloutBlock data={watcher.metricCallout} />
        )}
        {showSections && watcher.table && (
          <WatcherTable data={watcher.table} />
        )}
        {showSections && watcher.reviewCallout && (
          <ReviewCallout data={watcher.reviewCallout} />
        )}
      </div>

      {/* Footer */}
      {visibleActions.length > 0 && <ActionFooter actions={visibleActions} />}
    </div>
  );
}
