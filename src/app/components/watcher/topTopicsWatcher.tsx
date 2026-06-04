import type { DeltaValue, TableRow, Watcher } from './types';

const PROMPT =
  'Every Monday at 9am, tell me what customers have been asking about most this past week. Flag anything new or growing fast.';

interface TopicRow extends TableRow {
  rank: number;
  topic: string;
  count: number;
  delta: DeltaValue;
  sparkline: number[];
  quote: string;
  sinceIndicator?: string;
}

function topicRows(): TopicRow[] {
  return [
    {
      id: 't1',
      rank: 1,
      topic: 'Compatibility with sensitive skin',
      count: 24,
      delta: { kind: 'new' },
      sparkline: [2, 3, 5, 24],
      quote: 'Will this work for rosacea-prone skin?',
    },
    {
      id: 't2',
      rank: 2,
      topic: 'Shipping delays',
      count: 18,
      delta: { kind: 'up', value: 45 },
      sparkline: [12, 14, 13, 18],
      quote: "It's been 6 days and my order from Mumbai hasn't arrived",
    },
    {
      id: 't3',
      rank: 3,
      topic: 'Out-of-stock alerts',
      count: 11,
      delta: { kind: 'new' },
      sparkline: [1, 2, 4, 11],
      quote: 'Can you let me know when the Calm Serum is back?',
    },
    {
      id: 't4',
      rank: 4,
      topic: 'Refund',
      count: 7,
      delta: { kind: 'down', value: 30 },
      sparkline: [10, 9, 8, 7],
      quote: 'I need to return the Body Balm — the smell is too strong',
    },
    {
      id: 't5',
      rank: 5,
      topic: 'Product pairing',
      count: 6,
      delta: { kind: 'steady' },
      sparkline: [6, 7, 5, 6],
      quote: 'What should I use with the Vitamin C Serum?',
    },
  ];
}

export interface TopTopicsOpts {
  variant?: 'full' | 'snippet' | 'preview';
  state?: 'fresh' | 'aging';
  onOpenFullDigest?: () => void;
  onRefresh?: () => void;
  onSnoozeUntilNextMonday?: () => void;
  onViewDetails?: () => void;
  onDismiss?: () => void;
}

export function buildTopTopicsWatcher(opts?: TopTopicsOpts): Watcher {
  const variant = opts?.variant ?? 'full';
  const isAging = (opts?.state ?? 'fresh') === 'aging';

  const narrative = isAging
    ? "This is from Monday — two days ago. Showing it because you didn't get to look at it. Heads up: 'Out-of-stock alerts' (rank 3 below) has since dropped 60% — looks like your restock kicked in. 'Shipping delays' is still elevated — actually slightly worse than Monday. The rest is roughly the same."
    : "Last week your customers asked about 7 main things. Top 5 here. Two are new this week — 'Compatibility with sensitive skin' came up 24 times. 'Out-of-stock alerts' came up 11 times. 'Refund' is down 30% vs last month — whatever you changed in the returns process is working. 'Shipping delays' is up 45% week-on-week, mostly from your Mumbai customers — worth a closer look.";

  // Stale state injects sinceIndicators on rows 2 and 3.
  const rows = topicRows().map((row) => {
    if (!isAging) return row;
    if (row.rank === 3) return { ...row, sinceIndicator: '▼ 60% since publication' };
    if (row.rank === 2) return { ...row, sinceIndicator: 'slightly worse since publication' };
    return row;
  });

  return {
    id: 'top-topics',
    name: 'Top topics Agent',
    prompt: PROMPT,
    freshness: isAging ? 'aging' : 'fresh',
    timestamp: isAging
      ? 'Generated Monday 9am · 2 days ago'
      : 'Generated Monday 9:00 AM',
    lastUpdated: isAging
      ? 'Last updated Monday 9:00 AM'
      : 'Last updated Monday 9:00 AM',
    narrative,
    metricCallout: {
      metrics: [{ value: '7 topics', context: 'asked about this week · top 5 below' }],
    },
    table: {
      rows,
      columns: [
        { key: 'rank', type: 'text', width: '24px' },
        // Topic primary text with the optional "since publication" note inline
        { key: 'topic', type: 'text', width: '1fr', secondaryKey: 'sinceIndicator' },
        { key: 'count', type: 'text', width: '56px' },
        { key: 'delta', type: 'delta', width: 'auto' },
        { key: 'sparkline', type: 'sparkline', width: '72px' },
        { key: 'quote', type: 'quote', indent: '36px' },
      ],
    },
    actions:
      variant === 'snippet'
        ? [
            { label: 'View details', variant: 'primary', onClick: opts?.onViewDetails },
            { label: 'Dismiss', variant: 'dismiss', onClick: opts?.onDismiss },
          ]
        : variant === 'preview'
        ? []
        : [
            { label: 'Withdraw Agent', variant: 'outlined', onClick: opts?.onDismiss },
            { label: 'Edit Agent', variant: 'outlined', onClick: opts?.onSnoozeUntilNextMonday },
          ],
  };
}
