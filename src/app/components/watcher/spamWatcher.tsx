import type { TableRow, Watcher } from './types';

const PROMPT =
  "Watch every incoming message. If a message isn't related to my business — automated bot messages, ads, crypto/gambling promotions, suspicious links, anything that's not a real customer asking about my products — tag the chat as spam and keep it out of my inbox.";

interface SummaryRow extends TableRow {
  label: string;
  percentage: number;
  summary: string;
}

const summaryRows: SummaryRow[] = [
  {
    id: 's1',
    label: 'Crypto and trading promotions',
    percentage: 60,
    summary: '60% · 53',
  },
  {
    id: 's2',
    label: 'Bot templates',
    percentage: 25,
    summary: '25% · 22',
  },
  {
    id: 's3',
    label: 'Suspicious links',
    percentage: 15,
    summary: '15% · 14',
  },
];

export interface SpamOpts {
  variant?: 'full' | 'snippet' | 'preview';
  onBlockAllCrypto?: () => void;
  onAlwaysDoSimilar?: () => void;
  onReviewFiltered?: () => void;
  onMarkSpam?: (id: string) => void;
  onMarkNotSpam?: (id: string) => void;
  onViewDetails?: () => void;
  onDismiss?: () => void;
}

export function buildSpamWatcher(opts?: SpamOpts): Watcher {
  const variant = opts?.variant ?? 'full';
  return {
    id: 'spam',
    name: 'Spam watcher',
    prompt: PROMPT,
    freshness: 'fresh',
    timestamp: 'Updated 4 hours ago',
    lastUpdated: 'Last updated 8 min ago',
    narrative:
      "This week I scanned 1,247 messages across 312 conversations. I tagged 89 as spam and pulled them out of your inbox. Of those — about 60% were promotional (crypto and betting), 25% were bot-like automated messages with identical templates, and 15% were short messages with suspicious links. 3 borderline messages were left in your inbox but flagged for you to check.",
    metricCallout: {
      metrics: [
        {
          value: '89 filtered',
          context: 'spam conversations this week · 312 total scanned',
        },
      ],
    },
    table: {
      rows: summaryRows,
      columns: [
        { key: 'label', type: 'text', width: '1fr' },
        { key: 'percentage', type: 'progress-bar', width: '140px' },
        { key: 'summary', type: 'text', width: 'auto', align: 'right' },
      ],
    },
    reviewCallout: {
      prompt: "3 messages I wasn't sure about — your call:",
      yesLabel: 'Spam',
      noLabel: 'Not spam',
      onYes: opts?.onMarkSpam,
      onNo: opts?.onMarkNotSpam,
      items: [
        {
          id: 'b1',
          primary: 'Limited offer: 50% off all premium plans this week only',
          secondary: 'From +91-9876543210 · first message from this number',
          evidence: 'Looks promotional but mentions your product name.',
        },
        {
          id: 'b2',
          primary: 'Hi! Is this still the right number for Calm Serum orders?',
          secondary: 'From +62-812-3456-7890 · existing contact',
          evidence:
            'Existing customer, but message is unusually short and generic.',
        },
        {
          id: 'b3',
          primary: 'Earn ₹50,000 per month from home with our crypto bot',
          secondary: 'From +91-7654321098 · first message',
          evidence:
            'Strong promotional signal but mentions a specific number that could be a customer enquiry.',
        },
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
            { label: 'Always do this for similar patterns', variant: 'tertiary', onClick: opts?.onAlwaysDoSimilar },
            { label: 'Review filtered messages', variant: 'secondary', onClick: opts?.onReviewFiltered },
            { label: 'Block all crypto promos', variant: 'primary', onClick: opts?.onBlockAllCrypto },
            { label: 'Dismiss', variant: 'dismiss', onClick: opts?.onDismiss },
          ],
  };
}
