import type { ReactNode } from 'react';

// ── Watcher-level states ────────────────────────────────────────────────────

export type FreshnessState =
  | 'fresh'
  | 'aging'
  | 'stale'
  | 'auto-resolved'
  | 'snoozed';

// ── Action affordances (footer) ────────────────────────────────────────────

export type ActionVariant = 'primary' | 'secondary' | 'tertiary' | 'dismiss' | 'outlined';

export interface WatcherAction {
  label: string;
  variant: ActionVariant;
  onClick?: () => void;
}

// ── Metric callout ─────────────────────────────────────────────────────────

export interface Metric {
  value: string;
  context: string;
}

export interface MetricCalloutData {
  metrics: Metric[];
}

// ── Table column / row vocabulary ──────────────────────────────────────────
//
// The table is the universal list renderer for every watcher. Specialised
// list components (entity-list, ranked-items, grouped-summary,
// time-series-inline, evidence-quote) all collapse into combinations of
// these column types.

export type BadgeTone =
  | 'green'
  | 'amber'
  | 'red'
  | 'gray'
  | 'blue'
  | 'purple';

export interface BadgeValue {
  label: string;
  tone?: BadgeTone;
  /** 'filled' (default) — coloured pill background.
   *  'leading-dot' — small coloured dot followed by label, no pill. */
  style?: 'filled' | 'leading-dot';
}

export type DeltaValue =
  | { kind: 'up'; value: number }
  | { kind: 'down'; value: number }
  | { kind: 'new' }
  | { kind: 'steady' };

export type TableColumnType =
  | 'text'
  | 'badge'
  | 'sparkline'
  | 'quote'
  | 'action'
  | 'progress-bar'
  | 'delta';

export interface TableColumn {
  /** Field in the row data this column renders. */
  key: string;
  /** Header label. Hidden by default; only renders if `showHeaders` is on. */
  label?: string;
  type: TableColumnType;
  /** Horizontal alignment. 'right' wraps action content in the shared shell. */
  align?: 'left' | 'right';
  /** CSS grid track size (e.g. '1fr', '120px', '60px'). Defaults to '1fr'. */
  width?: string;
  /** Text columns only: render an inline italic note from this field. */
  secondaryKey?: string;
  /** Quote columns only: left indent (e.g. '36px') so the secondary line
   *  aligns with the column above it. */
  indent?: string;
  /** Sparkline columns: explicit width in px (default 70). */
  sparklineWidth?: number;
}

export interface TableRow {
  id: string;
  /** Optional state for future visual variants (auto-resolved, etc.). */
  state?: 'active' | 'auto-resolved' | 'went-cold' | 'new-since-alert';
  [field: string]: unknown;
}

export interface WatcherTableData {
  rows: TableRow[];
  columns: TableColumn[];
  /** Field name to group rows by. Renders a small uppercase label above
   *  each group followed by that group's rows. */
  groupBy?: string;
  /** Optional formatter for group headers. Defaults to "{value} ({count})". */
  groupLabel?: (value: unknown, count: number) => string;
  /** Field name to sort by. Currently advisory — callers should pre-sort. */
  sortBy?: string;
  /** When true, render the `label` of each column as a small uppercase
   *  header row above the first data row. Defaults to false. */
  showHeaders?: boolean;
}

// ── Review callout (conditional, replaces the old borderline-review) ──────

export interface ReviewItem {
  id: string;
  primary: string;
  secondary?: string;
  evidence?: string;
}

export interface ReviewCalloutData {
  prompt: string;
  items: ReviewItem[];
  yesLabel: string;
  noLabel: string;
  onYes?: (id: string) => void;
  onNo?: (id: string) => void;
}

// ── Watcher object — flat composition ─────────────────────────────────────

export interface Watcher {
  id: string;
  /** Display name shown in the header — e.g. "Ready-to-buy watcher". */
  name: string;
  /** Natural-language prompt that defined this watcher. Surfaced in the
   *  Edit-watcher Vibe slider. */
  prompt: string;
  freshness: FreshnessState;
  /** Pre-formatted relative timestamp for generation/update of the card.
   *  Verb convention:
   *    "Updated …"   — live monitoring watchers
   *    "Generated …" — scheduled digest watchers */
  timestamp: string;
  /** Pre-formatted relative timestamp for when the underlying data was
   *  last refreshed. May differ from `timestamp`. */
  lastUpdated: string;
  /** First-person agent paragraph. Always present. */
  narrative: string;
  metricCallout?: MetricCalloutData;
  table?: WatcherTableData;
  reviewCallout?: ReviewCalloutData;
  actions: WatcherAction[];
}

// ── Re-export helper render type for column custom-render in callers ──────

export type ColumnRenderer<T extends TableRow = TableRow> = (
  row: T,
  column: TableColumn
) => ReactNode;
