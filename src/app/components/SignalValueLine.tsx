import React from 'react';

interface SignalValueLineProps {
  label: string;
  values: string[];
  /** How many values to show inline before collapsing to "+N more". Default: 2. */
  maxInline?: number;
}

/**
 * Renders a compact "[Label]: val1, val2" line for any list-shaped signal.
 * Used for product interest, blockers, tags, etc.
 *
 * Overflow rules:
 *   1 value  → "label: val"
 *   2 values → "label: val1, val2"
 *   3+       → "label: val1 +N more"  (always shows 1 inline + overflow count)
 */
export function SignalValueLine({ label, values, maxInline = 2 }: SignalValueLineProps) {
  if (!values || values.length === 0) return null;

  let display: string;
  if (values.length <= maxInline) {
    display = values.join(', ');
  } else {
    display = `${values[0]} +${values.length - 1} more`;
  }

  return (
    <p className="text-[11px] text-gray-400 leading-none w-full truncate">
      <span className="text-gray-400">{label}:</span>{' '}
      <span className="text-gray-500">{display}</span>
    </p>
  );
}
