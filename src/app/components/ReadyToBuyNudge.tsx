import React from 'react';
import { Info, X } from 'lucide-react';

interface ReadyToBuyNudgeProps {
  /** Number of hot leads currently waiting — drives the headline. */
  leadCount: number;
  /** Pipeline value formatted for display (e.g. "₹47,000"). */
  pipelineValue: string;
  /** Fires when the user clicks the (i) info icon. */
  onInfo?: () => void;
  /** Fires when the user clicks ×. */
  onDismiss?: () => void;
  /** Fires when the user clicks "View Agent" — should open the agent in Pulse. */
  onViewAgent?: () => void;
  /** Fires when the user clicks "Edit Agent" — should open Vibe in edit mode. */
  onEditAgent?: () => void;
}

/**
 * Compact in-inbox nudge from the Ready-to-buy Agent. Appears above the
 * conversation list when the "Ready to buy" Agent View filter is active.
 *
 * Surface-specific component: this isn't the full WatcherCard — it's the
 * lean inbox-nudge layout from Figma node 37:19413.
 */
export function ReadyToBuyNudge({
  leadCount,
  pipelineValue,
  onInfo,
  onDismiss,
  onViewAgent,
  onEditAgent,
}: ReadyToBuyNudgeProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
      {/* Header — agent dot, name, info + dismiss icons */}
      <div className="flex items-center gap-2.5">
        <div className="w-6 h-6 rounded-full bg-gray-800 flex items-center justify-center gap-[3px] shrink-0">
          <span className="w-[3px] h-[3px] rounded-full bg-white" />
          <span className="w-[3px] h-[3px] rounded-full bg-white" />
        </div>
        <span className="flex-1 text-sm font-semibold text-gray-900 leading-none">
          Ready-to-buy Agent
        </span>
        <button
          type="button"
          onClick={onInfo}
          aria-label="About this agent"
          className="text-gray-400 hover:text-gray-700 transition-colors p-0.5"
        >
          <Info className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss"
          className="text-gray-400 hover:text-gray-700 transition-colors p-0.5"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Narrative */}
      <p className="text-sm text-gray-700 mt-3 leading-relaxed">
        I have identified {leadCount} hot leads ready to buy based on the chats. Together that&apos;s roughly {pipelineValue} in pipeline.
      </p>

      {/* Footer — two equal-width outlined buttons */}
      <div className="mt-4 grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={onViewAgent}
          className="px-3 py-2 rounded-md border border-gray-300 text-sm font-medium text-gray-800 bg-white hover:bg-gray-50 transition-colors"
        >
          View Agent
        </button>
        <button
          type="button"
          onClick={onEditAgent}
          className="px-3 py-2 rounded-md border border-gray-300 text-sm font-medium text-gray-800 bg-white hover:bg-gray-50 transition-colors"
        >
          Edit Agent
        </button>
      </div>
    </div>
  );
}
