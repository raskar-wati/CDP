import React from 'react';
import type { MetricCalloutData } from './types';

interface MetricCalloutBlockProps {
  data: MetricCalloutData;
}

/**
 * One or more headline metrics rendered side by side inside a single
 * callout block.
 *
 * Visual treatment — subtle Wati-green left accent + very faint green
 * background tint — applies to the WHOLE block, not to individual
 * metrics within it.
 *
 * Single metric (Ready-to-buy, Spam, Top Topics, Demand Spike's
 * "~36 hours") renders as one column.
 * Multiple metrics (Demand Spike: "31 mentions" + "~36 hours")
 * render as a horizontal row separated by spacing.
 */
export function MetricCalloutBlock({ data }: MetricCalloutBlockProps) {
  return (
    <div className="border-l-2 border-[#23a455]/40 bg-[#23a455]/[0.03] pl-4 pr-3 py-3 flex flex-wrap gap-x-10 gap-y-3">
      {data.metrics.map((m, i) => (
        <div key={i} className="min-w-0">
          <p className="text-[28px] font-semibold text-gray-900 leading-none tracking-tight">
            {m.value}
          </p>
          <p className="text-sm text-gray-500 mt-2 leading-snug">{m.context}</p>
        </div>
      ))}
    </div>
  );
}
