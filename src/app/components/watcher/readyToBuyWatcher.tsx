import React from 'react';
import type { Watcher, TableRow, BadgeValue } from './types';

const PROMPT =
  "Watch for customers who sound ready to buy but haven't gotten a reply. If someone says they want to order, asks for pricing or payment, or is making a final decision — and nobody's responded within 2 hours — tell me.";

interface LeadRow extends TableRow {
  name: string;
  indicator?: string;
  stage: BadgeValue;
  waiting: BadgeValue;
  askingAbout: string;
  action: React.ReactNode;
}

function leadRows(onSendReply?: (id: string) => void): LeadRow[] {
  const waitingTone = (mins: number) => (mins >= 5 * 60 ? 'red' : 'amber');
  const send = (id: string) => (
    <button
      onClick={() => onSendReply?.(id)}
      className="text-xs font-medium text-[#23a455] hover:text-[#1d8f47] transition-colors"
    >
      Send reply
    </button>
  );
  const lead = (
    id: string,
    name: string,
    waitingLabel: string,
    minutes: number,
    askingAbout: string,
    indicator?: string
  ): LeadRow => ({
    id,
    name,
    indicator,
    stage: { label: 'Ready to buy', tone: 'green', style: 'filled' },
    waiting: { label: waitingLabel, tone: waitingTone(minutes), style: 'leading-dot' },
    askingAbout,
    action: send(id),
    state: 'active',
  });
  return [
    lead('l1', 'Priya Sharma',  '5h 12m', 312, 'Vitamin C Serum', 'messaged again with no reply'),
    lead('l2', 'Anjali Mehta',  '4h 38m', 278, 'Body Balm bundle', 'messaged again with no reply'),
    lead('l3', 'Rahul Singh',   '3h 45m', 225, 'Retinol Night Oil'),
    lead('l4', 'Sneha Reddy',   '2h 50m', 170, 'Calm Serum'),
    lead('l5', 'Karan Patel',   '2h 22m', 142, 'Vitamin C Serum'),
    lead('l6', 'Divya Iyer',    '2h 05m', 125, 'Sunscreen + Toner'),
  ];
}

export interface ReadyToBuyOpts {
  variant?: 'full' | 'snippet' | 'preview';
  onSendReply?: (leadId: string) => void;
  onSendAll?: () => void;
  onSnooze?: () => void;
  onAlwaysDoThis?: () => void;
  onViewDetails?: () => void;
  onDismiss?: () => void;
}

export function buildReadyToBuyWatcher(opts?: ReadyToBuyOpts): Watcher {
  const variant = opts?.variant ?? 'full';
  return {
    id: 'ready-to-buy',
    name: 'Ready-to-buy Agent',
    prompt: PROMPT,
    freshness: 'fresh',
    timestamp: 'Updated 12 minutes ago',
    lastUpdated: 'Last updated 4 min ago',
    narrative:
      "6 hot leads are waiting past the 2-hour threshold right now. Together that's roughly ₹47,000 in pipeline. Two of them messaged again with no reply — those are the urgent ones.",
    metricCallout: {
      metrics: [
        { value: '₹47,000', context: 'Pipeline at risk · 6 active hot leads' },
      ],
    },
    table: {
      rows: leadRows(opts?.onSendReply),
      columns: [
        { key: 'name', type: 'text', width: '1.6fr', secondaryKey: 'indicator' },
        { key: 'stage', type: 'badge', width: '0.9fr' },
        { key: 'waiting', type: 'badge', width: '0.8fr' },
        { key: 'askingAbout', type: 'text', width: '1.2fr' },
        { key: 'action', type: 'action', width: '0.7fr', align: 'right' },
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
            { label: 'Bulk Reply', variant: 'outlined', onClick: opts?.onSendAll },
            { label: 'Edit Agent', variant: 'outlined', onClick: opts?.onAlwaysDoThis },
          ],
  };
}
