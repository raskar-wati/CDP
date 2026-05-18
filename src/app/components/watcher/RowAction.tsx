import React from 'react';

interface RowActionProps {
  children: React.ReactNode;
}

/**
 * Shell for the per-row action affordance used by list-style blocks
 * (EntityListBlock, RankedItemsBlock). Owns positioning + vertical
 * centring; the *content* (text link, dropdown trigger, icon button)
 * is up to the caller.
 *
 * All list blocks must wrap their per-row action with this so the
 * right-edge alignment is consistent across every watcher.
 */
export function RowAction({ children }: RowActionProps) {
  return (
    <div className="flex items-center justify-end">{children}</div>
  );
}
