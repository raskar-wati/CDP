import React from 'react';

interface NarrativeBlockProps {
  text: string;
}

/**
 * First-person agent text. Looser line height than body copy
 * to read like a paragraph the agent just said.
 *
 * Horizontal padding is provided by the WatcherCard body — this block
 * renders flush so the left edge aligns with every other block.
 */
export function NarrativeBlock({ text }: NarrativeBlockProps) {
  return (
    <p className="text-sm text-gray-800 leading-[1.55]">{text}</p>
  );
}
