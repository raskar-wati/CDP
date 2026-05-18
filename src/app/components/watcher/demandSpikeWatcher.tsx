import type { BadgeValue, TableRow, Watcher } from './types';

const PROMPT =
  'Tell me when interest in a specific product suddenly jumps — more people than usual asking about it, mentioning it, or comparing it to other options.';

interface DemandLead extends TableRow {
  name: string;
  intent: BadgeValue;
  intentSort: number;
  askingAbout: string;
}

const INTENT_BADGES: Record<'High' | 'Mid' | 'Low', BadgeValue> = {
  High: { label: 'High', tone: 'green', style: 'filled' },
  Mid: { label: 'Mid', tone: 'amber', style: 'filled' },
  Low: { label: 'Low', tone: 'gray', style: 'filled' },
};

const SORT_RANK = { High: 3, Mid: 2, Low: 1 } as const;

function leadRows(): DemandLead[] {
  const make = (
    id: string,
    name: string,
    intent: 'High' | 'Mid' | 'Low',
    askingAbout: string
  ): DemandLead => ({
    id,
    name,
    intent: INTENT_BADGES[intent],
    // Used for grouping/sorting — table groups by `intent.label`.
    intentSort: SORT_RANK[intent],
    askingAbout,
    state: 'active',
    // Plain string version of intent for groupBy.
    intentLabel: intent,
  });
  return [
    make('d1', 'Meera Krishnan', 'High', 'Stock + price + delivery time'),
    make('d2', 'Anjali Nair',    'High', 'Stock + can pay now'),
    make('d3', 'Vikram Joshi',   'High', 'Stock + which Instagram ad'),
    make('d4', 'Sara Mohamed',   'Mid',  'Stock + ingredients'),
    make('d5', 'Tom Lee',        'Mid',  'Price comparison vs The Ordinary'),
    make('d6', 'Diya Pillai',    'Low',  "Just asking if it's vegan"),
  ];
}

export interface DemandSpikeOpts {
  variant?: 'full' | 'snippet' | 'preview';
  onBroadcastAll?: () => void;
  onSendToHighIntent?: () => void;
  onAlwaysDraftStockUpdate?: () => void;
  onViewDetails?: () => void;
  onDismiss?: () => void;
}

export function buildDemandSpikeWatcher(opts?: DemandSpikeOpts): Watcher {
  const variant = opts?.variant ?? 'full';
  return {
    id: 'demand-spike',
    name: 'Demand spike watcher',
    prompt: PROMPT,
    freshness: 'fresh',
    timestamp: 'Updated 2 hours ago',
    lastUpdated: 'Last updated 12 min ago',
    narrative:
      "Spike detected — 'Vitamin C Serum 30ml' is being mentioned 4× your normal rate. In the last 24 hours, 31 customers asked about it (your typical is around 7 per day). Looking at messages — most are 'is it in stock' and price questions. Three customers mentioned seeing your Instagram ad from yesterday, likely the driver. At this rate you'll sell out in about 36 hours.",
    metricCallout: {
      metrics: [
        { value: '31 mentions', context: 'Last 24h · 4× typical day (~7)' },
        { value: '~36 hours', context: 'Estimated time to sellout at current rate' },
      ],
    },
    table: {
      rows: leadRows(),
      groupBy: 'intentLabel',
      groupLabel: (value, count) => `${String(value)} intent · ${count}`,
      columns: [
        { key: 'name', type: 'text', width: '1.2fr' },
        { key: 'intent', type: 'badge', width: '80px' },
        { key: 'askingAbout', type: 'text', width: '1.5fr' },
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
            { label: 'Always draft a stock update on future 4× spikes', variant: 'tertiary', onClick: opts?.onAlwaysDraftStockUpdate },
            { label: 'Send only to 3 high-intent', variant: 'secondary', onClick: opts?.onSendToHighIntent },
            { label: 'Send stock-status broadcast to 31 contacts', variant: 'primary', onClick: opts?.onBroadcastAll },
            { label: 'Dismiss', variant: 'dismiss', onClick: opts?.onDismiss },
          ],
  };
}
