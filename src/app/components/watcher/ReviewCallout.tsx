import React from 'react';
import { RowAction } from './RowAction';
import type { ReviewCalloutData } from './types';

interface ReviewCalloutProps {
  data: ReviewCalloutData;
}

/**
 * Conditional callout above the footer. Surfaces items that need a yes/no
 * decision from the operator. Soft warm tint sets it apart from the
 * card background — same row rhythm as the table.
 *
 * The whole callout is hidden by the parent when `items` is empty;
 * this component renders nothing in that case as a safety net.
 */
export function ReviewCallout({ data }: ReviewCalloutProps) {
  if (!data.items.length) return null;
  return (
    <div className="-mx-4 px-4 py-4 bg-[#fdf8ef] border-y border-[#f5e2c1]">
      <p className="text-sm text-gray-800 mb-3 leading-snug">{data.prompt}</p>
      <ul>
        {data.items.map((item) => (
          <li
            key={item.id}
            className="grid grid-cols-[1fr_auto] items-center gap-4 py-3 border-b border-[#f5e2c1] last:border-b-0 min-h-[72px]"
          >
            <div className="min-w-0">
              <p className="text-sm text-gray-900 leading-snug">
                {item.primary}
              </p>
              {item.secondary && (
                <p className="text-xs text-gray-500 mt-1 leading-snug">
                  {item.secondary}
                </p>
              )}
              {item.evidence && (
                <p className="text-xs italic text-gray-400 mt-1 leading-snug">
                  {item.evidence}
                </p>
              )}
            </div>
            <RowAction>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => data.onYes?.(item.id)}
                  className="px-2.5 py-1 text-xs font-medium text-[#c0392b] hover:bg-white rounded-md transition-colors"
                >
                  {data.yesLabel}
                </button>
                <button
                  onClick={() => data.onNo?.(item.id)}
                  className="px-2.5 py-1 text-xs font-medium text-gray-600 hover:bg-white rounded-md transition-colors"
                >
                  {data.noLabel}
                </button>
              </div>
            </RowAction>
          </li>
        ))}
      </ul>
    </div>
  );
}
