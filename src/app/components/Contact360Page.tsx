import React, { useState } from 'react';
import { ChevronLeft, MoreHorizontal, Check, ArrowUp, ArrowDown, X, ArrowRight } from 'lucide-react';

const JOURNEY_STAGES = ['Inquiry', 'Interested', 'Evaluating', 'Negotiating', 'Ready', 'Converted'] as const;
type JourneyStage = typeof JOURNEY_STAGES[number];

interface Product {
  name: string;
  primary?: boolean;
  meta?: string;
}

interface Blocker {
  type: string;
  quote: string;
}

interface KeyFact {
  label: string;
  value: string;
}

interface Tag {
  label: string;
  auto?: boolean;
  source?: string;
}

interface Sentiment {
  label: 'Recovering' | 'Steady' | 'Declining';
  direction?: 'up' | 'down';
}

interface SegmentCriterion {
  label: string;
  category: 'attribute' | 'product' | 'stage' | 'behavior';
}

interface SegmentMatch {
  count: number;
  criteria: SegmentCriterion[];
}

// ── Profile tab types ──────────────────────────────────────────────────────

type SignalTone = 'amber' | 'green' | 'red' | 'purple' | 'gray' | 'plain';

/** Where a piece of data came from. Currently only 'shopify' is marked
 *  visually; the field is extensible for future connected sources
 *  (WooCommerce, Klaviyo, etc.). */
type DataSource = 'shopify';

interface AttributeField {
  key: string;
  value: string;
  source?: DataSource;
}

interface EngagementStat {
  label: string;
  value: string;
  highlight?: boolean;
}

interface EngagementField {
  label: string;
  value: string;
  highlight?: boolean;
}

interface ExtractedSignal {
  label: string;
  value: string;
  tone?: SignalTone;
  /** When true, render as plain text (e.g. lists, paragraphs) instead of a pill. */
  plain?: boolean;
  empty?: boolean;
  source?: DataSource;
}

interface SegmentEntry {
  label: string;
  enteredAt: string;
}

interface SignalHistoryEntry {
  id: string;
  field: string;
  action: string;
  badge?: { label: string; tone: 'green' | 'red' | 'gray' };
  /** Detected value, e.g. "Vitamin C Serum" — appears after the action verb. */
  detectedValue?: string;
  quote: string;
  confidence: number;
  timestamp: string;
  conversation: string;
  /** Left dot tone for the timeline. */
  dotTone?: 'green' | 'amber' | 'red' | 'gray' | 'blue';
  source?: DataSource;
}

interface ProfileTabData {
  attributes: AttributeField[];
  totalAttributes: number;
  engagement: {
    note: string;
    stats: EngagementStat[];
    fields: EngagementField[];
  };
  extractedSignals: ExtractedSignal[];
  segments: SegmentEntry[];
  signalHistory: SignalHistoryEntry[];
}

interface ContactProfile {
  name: string;
  initials: string;
  phone: string;
  source: string;
  since: string;
  conversationCount?: number;
  messageCount?: number;
  lastUpdated?: string;
  brief: string;
  journeyStage?: JourneyStage;
  urgency?: 'Low' | 'Medium' | 'High';
  sentiment?: Sentiment;
  lastActive?: string;
  products?: Product[];
  blockers?: Blocker[];
  facts?: KeyFact[];
  tags?: Tag[];
  segmentMatch?: SegmentMatch;
  profileTab?: ProfileTabData;
}

export const CONTACT_PROFILES: Record<string, ContactProfile> = {
  amira: {
    name: 'Amira Putri',
    initials: 'AP',
    phone: '(+62) 812 3456 7890',
    source: 'WhatsApp · CTWA ad',
    since: '1 Jun 2026',
    conversationCount: 3,
    messageCount: 18,
    lastUpdated: '10 min ago',
    brief:
      "Amira is evaluating the Vitamin C Serum. She came in via WhatsApp on 1 June through a CTWA ad. She's mentioned the price feels high (Rp 285k) and that she needs to check with her husband before buying. She's also indicated sensitive skin and a fragrance-free preference.\n\nHasn't responded for 3 days.",
    journeyStage: 'Evaluating',
    urgency: 'Medium',
    sentiment: { label: 'Recovering', direction: 'up' },
    lastActive: 'Last active 3 days ago',
    products: [
      { name: 'Vitamin C Serum', primary: true, meta: 'Mentioned 4 times' },
      { name: 'SPF Moisturizer', meta: 'Mentioned twice' },
      { name: 'Hydrating Toner', meta: 'Last week' },
    ],
    blockers: [
      { type: 'Price', quote: 'said Rp 285k is pricey' },
      { type: 'Decision maker', quote: 'needs to check with her husband first' },
    ],
    facts: [
      { label: 'Skin type', value: 'Sensitive' },
      { label: 'Preference', value: 'Fragrance-free' },
      { label: 'Situation', value: "Needs husband's approval before buying" },
    ],
    tags: [
      { label: 'price-sensitive', auto: true, source: 'Auto-applied — mentioned price in 2 conversations' },
      { label: 'interested-in:vitamin-c-serum', auto: true, source: 'Auto-applied — discussed in 3 conversations' },
      { label: 'sensitive-skin', auto: true, source: 'Auto-applied — mentioned in 1 conversation' },
      { label: 'VIP', source: 'Added by John Melvis' },
    ],
    segmentMatch: {
      count: 74,
      criteria: [
        { label: 'price_sensitive = true', category: 'attribute' },
        { label: 'product = Vitamin C Serum', category: 'product' },
        { label: 'stage = evaluating', category: 'stage' },
        { label: 'ghosting ≥ 3 days', category: 'behavior' },
      ],
    },
    profileTab: {
      totalAttributes: 25,
      attributes: [
        { key: 'name', value: 'Amira Al-Hassan' },
        { key: 'email', value: 'amira@email.com' },
        { key: 'lead_stage', value: 'New Lead' },
        { key: 'utm_campaign', value: 'vitamin_c_june' },
        { key: 'skin_type', value: 'sensitive' },
        { key: 'last_cart_total', value: 'Rp 285,000', source: 'shopify' },
        { key: 'order_count', value: '0', source: 'shopify' },
      ],
      engagement: {
        note: 'Derived daily',
        stats: [
          { label: 'Convos', value: '3' },
          { label: 'Messages in', value: '12' },
          { label: 'Reply rate', value: '82%', highlight: true },
        ],
        fields: [
          { label: 'Last incoming', value: '10 min ago' },
          { label: 'Last campaign click', value: '3 days ago' },
          { label: 'Avg response time', value: '4 min' },
          { label: 'Campaigns received (7d)', value: '3' },
          { label: 'Campaign read rate', value: '67%', highlight: true },
          { label: 'First message', value: 'Jun 1, 2026' },
        ],
      },
      extractedSignals: [
        { label: 'Conversation stage', value: 'Evaluating', tone: 'amber' },
        { label: 'Sentiment arc', value: 'Recovering after price objection ↑', tone: 'green' },
        { label: 'Purchase intent', value: 'Considering', tone: 'amber' },
        { label: 'Price sensitivity', value: 'Cost-conscious', tone: 'red' },
        { label: 'Timeline urgency', value: 'Medium', tone: 'amber' },
        { label: 'Blocker', value: 'Decision maker', tone: 'amber' },
        { label: 'Product interest', value: 'Vitamin C Serum, SPF Moisturizer', plain: true },
        { label: 'Customer preference', value: 'Sensitive skin, Fragrance-free', plain: true },
        { label: 'Stated context', value: "Needs husband's approval before buying", plain: true },
        { label: 'Topics', value: 'skincare, vitamin-c, ingredients', tone: 'gray' },
        { label: 'Question asked', value: "What's in it? (product_ingredients)", plain: true },
        { label: 'Cart status', value: 'Abandoned · Rp 285,000', tone: 'red', source: 'shopify' },
        { label: 'Lifetime value', value: 'Rp 0', plain: true, source: 'shopify' },
        { label: 'Browsed products', value: 'Vitamin C Serum, SPF 50, Toner', plain: true, source: 'shopify' },
        { label: 'Ghosting signal', value: 'None', plain: true },
        { label: 'Conversion event', value: '—', plain: true, empty: true },
      ],
      segments: [
        { label: 'Ghosting rescue — Vit C', enteredAt: 'entered Jun 15' },
        { label: 'High-value skincare', enteredAt: 'entered Jun 10' },
      ],
      signalHistory: [
        {
          id: 'sh0',
          field: 'cart_status',
          action: 'abandoned cart detected',
          badge: { label: 'BARRIER', tone: 'red' },
          quote: 'Rp 285,000 — Vitamin C Serum left in cart',
          confidence: 100,
          timestamp: 'Jun 15, 11:42 AM',
          conversation: 'shopify store',
          dotTone: 'red',
          source: 'shopify',
        },
        {
          id: 'sh1',
          field: 'product_interest',
          action: 'detected:',
          detectedValue: 'Vitamin C Serum',
          badge: { label: 'NEW', tone: 'green' },
          quote: 'how much is the Vitamin C Serum?',
          confidence: 92,
          timestamp: 'Jun 15, 10:05 AM',
          conversation: 'conversation #3',
          dotTone: 'blue',
        },
        {
          id: 'sh2',
          field: 'conversation_stage',
          action: 'changed: interested → evaluating',
          quote: 'oh nice, can you tell me more about the ingredients?',
          confidence: 88,
          timestamp: 'Jun 15, 10:07 AM',
          conversation: 'conversation #3',
          dotTone: 'amber',
        },
        {
          id: 'sh3',
          field: 'price_budget',
          action: 'cost-conscious',
          badge: { label: 'BARRIER', tone: 'red' },
          quote: "hmm that's a bit pricey",
          confidence: 91,
          timestamp: 'Jun 15, 10:09 AM',
          conversation: 'conversation #3',
          dotTone: 'red',
        },
        {
          id: 'sh4',
          field: 'blocker',
          action: 'decision_maker detected',
          quote: 'need to check with my husband first',
          confidence: 78,
          timestamp: 'Jun 15, 10:11 AM',
          conversation: 'conversation #3',
          dotTone: 'red',
        },
        {
          id: 'sh5',
          field: 'customer_preference',
          action: 'sensitive skin, fragrance-free',
          quote: "I have sensitive skin and I can't use anything with fragrance",
          confidence: 95,
          timestamp: 'Jun 14, 3:22 PM',
          conversation: 'conversation #2',
          dotTone: 'gray',
        },
        {
          id: 'sh6',
          field: 'product_interest',
          action: 'detected:',
          detectedValue: 'SPF Moisturizer',
          quote: 'do you also have SPF?',
          confidence: 74,
          timestamp: 'Jun 12, 11:45 AM',
          conversation: 'conversation #1',
          dotTone: 'blue',
        },
        {
          id: 'sh7',
          field: 'conversation_stage',
          action: 'set: new_inquiry (first contact)',
          quote: 'First message received via CTWA · Vitamin C Serum',
          confidence: 100,
          timestamp: 'Jun 1, 9:15 AM',
          conversation: 'conversation #1',
          dotTone: 'blue',
        },
      ],
    },
  },
  budi: {
    name: 'Budi Santoso',
    initials: 'BS',
    phone: '(+62) 819 8765 4321',
    source: 'WhatsApp',
    since: '14 Aug 2025',
    conversationCount: 5,
    messageCount: 42,
    lastUpdated: '6 days ago',
    brief: 'Budi ordered the SPF Moisturizer last week. Returning customer — third order this year.',
    journeyStage: 'Converted',
    sentiment: { label: 'Steady' },
    lastActive: 'Last active 6 days ago',
    products: [
      { name: 'SPF Moisturizer', primary: true, meta: 'Last week' },
      { name: 'Hydrating Toner', meta: 'Mar 2026' },
    ],
    tags: [
      { label: 'repeat-buyer', auto: true, source: 'Auto-applied — 3rd order this year' },
      { label: 'loyal-customer', source: 'Added by John Melvis' },
    ],
    segmentMatch: {
      count: 12,
      criteria: [
        { label: 'repeat_buyer = true', category: 'attribute' },
        { label: 'product = SPF Moisturizer', category: 'product' },
        { label: 'stage = converted', category: 'stage' },
      ],
    },
  },
  new: {
    name: 'Lia Wijaya',
    initials: 'LW',
    phone: '(+62) 811 1222 3333',
    source: 'WhatsApp',
    since: 'Today',
    brief:
      'New contact — came in 10 minutes ago via WhatsApp. One message so far asking about Vitamin C Serum pricing.',
    journeyStage: 'Inquiry',
    products: [{ name: 'Vitamin C Serum', primary: true, meta: 'Mentioned once' }],
    tags: [],
  },
};

// ── Sub-components ──────────────────────────────────────────────────────────

function Avatar({ initials }: { initials: string }) {
  return (
    <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 text-lg font-medium flex-shrink-0">
      {initials}
    </div>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-[15px] font-semibold text-gray-900 mb-4">
      {children}
    </h2>
  );
}

function Card({ children, extraPadding = false }: { children: React.ReactNode; extraPadding?: boolean }) {
  return (
    <section
      className={`border border-gray-200 rounded-lg bg-white ${
        extraPadding ? 'px-6 py-6' : 'px-6 py-5'
      }`}
    >
      {children}
    </section>
  );
}

function Brief({ profile }: { profile: ContactProfile }) {
  const paragraphs = profile.brief.split('\n\n');
  const metaPieces: string[] = [];
  if (profile.conversationCount !== undefined) {
    metaPieces.push(
      `${profile.conversationCount} ${profile.conversationCount === 1 ? 'conversation' : 'conversations'}`
    );
  }
  if (profile.messageCount !== undefined) {
    metaPieces.push(`${profile.messageCount} messages`);
  }
  if (profile.lastUpdated) {
    metaPieces.push(`Last updated ${profile.lastUpdated}`);
  }

  return (
    <section>
      <div className="space-y-4 text-[16px] leading-[1.7] text-gray-800">
        {paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
      {metaPieces.length > 0 && (
        <p className="mt-4 text-xs text-gray-400">{metaPieces.join(' · ')}</p>
      )}
    </section>
  );
}

function JourneyTimeline({ profile }: { profile: ContactProfile }) {
  if (!profile.journeyStage) return null;
  const currentIdx = JOURNEY_STAGES.indexOf(profile.journeyStage);
  // Hide if only at Inquiry (first) AND no urgency/sentiment
  if (currentIdx === 0 && !profile.urgency && !profile.sentiment) return null;

  const sentimentArrow = (s: Sentiment) =>
    s.direction === 'up' ? (
      <ArrowUp className="w-3 h-3 inline" />
    ) : s.direction === 'down' ? (
      <ArrowDown className="w-3 h-3 inline" />
    ) : null;

  const metaItems: React.ReactNode[] = [];
  if (profile.urgency) metaItems.push(`${profile.urgency} urgency`);
  if (profile.sentiment) {
    metaItems.push(
      <span key="sent" className="inline-flex items-center gap-1">
        {profile.sentiment.label}
        {sentimentArrow(profile.sentiment)}
      </span>
    );
  }
  if (profile.lastActive) metaItems.push(profile.lastActive);

  return (
    <Card extraPadding>
      <SectionHeading>Journey</SectionHeading>
      <div className="flex items-start">
        {JOURNEY_STAGES.map((s, i) => {
          const isPast = i < currentIdx;
          const isCurrent = i === currentIdx;
          return (
            <React.Fragment key={s}>
              <div className="flex flex-col items-center flex-shrink-0" style={{ minWidth: 72 }}>
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                    isPast
                      ? 'bg-[#23a455] text-white'
                      : isCurrent
                      ? 'bg-[#23a455] text-white ring-4 ring-[#23a455]/15'
                      : 'border border-gray-300 bg-white'
                  }`}
                >
                  {isPast ? (
                    <Check className="w-3.5 h-3.5" strokeWidth={3} />
                  ) : isCurrent ? (
                    <div className="w-2 h-2 rounded-full bg-white" />
                  ) : null}
                </div>
                <span
                  className={`mt-2 text-xs whitespace-nowrap ${
                    isCurrent
                      ? 'text-gray-900 font-medium'
                      : isPast
                      ? 'text-gray-600'
                      : 'text-gray-400'
                  }`}
                >
                  {s}
                </span>
              </div>
              {i < JOURNEY_STAGES.length - 1 && (
                <div
                  className={`flex-1 h-px mt-3 ${isPast ? 'bg-[#23a455]' : 'bg-gray-200'}`}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
      {metaItems.length > 0 && (
        <p className="mt-5 text-[13px] text-gray-500 flex items-center gap-2 flex-wrap">
          {metaItems.map((item, i) => (
            <React.Fragment key={i}>
              {i > 0 && <span className="text-gray-300">·</span>}
              <span>{item}</span>
            </React.Fragment>
          ))}
        </p>
      )}
    </Card>
  );
}

function InterestedIn({ products }: { products?: Product[] }) {
  const [expanded, setExpanded] = useState(false);
  if (!products || products.length === 0) return null;
  const visible = expanded ? products : products.slice(0, 5);
  const hidden = products.length - 5;

  return (
    <Card>
      <SectionHeading>Interested in</SectionHeading>
      <ul>
        {visible.map((p, i) => (
          <li
            key={i}
            className="py-[7px] flex items-center justify-between gap-3 first:pt-0 last:pb-0"
          >
            <div className="flex items-baseline gap-2 min-w-0">
              <span className="text-sm text-gray-800 truncate">{p.name}</span>
              {p.primary && (
                <span className="text-[10px] uppercase tracking-wider text-gray-400 font-medium">
                  Primary
                </span>
              )}
            </div>
            {p.meta && <span className="text-xs text-gray-400 flex-shrink-0">{p.meta}</span>}
          </li>
        ))}
      </ul>
      {!expanded && hidden > 0 && (
        <button
          onClick={() => setExpanded(true)}
          className="mt-3 text-xs text-[#23a455] hover:text-[#1d8f47] transition-colors"
        >
          + {hidden} more
        </button>
      )}
    </Card>
  );
}

function Blockers({ blockers }: { blockers?: Blocker[] }) {
  if (!blockers || blockers.length === 0) return null;
  return (
    <Card>
      <SectionHeading>Blockers</SectionHeading>
      <ul>
        {blockers.map((b, i) => (
          <li
            key={i}
            className="py-[7px] flex items-baseline gap-3 first:pt-0 last:pb-0"
          >
            <span className="text-sm text-gray-800 flex-shrink-0 min-w-[140px]">
              {b.type}
            </span>
            <span className="text-sm italic text-gray-500">{b.quote}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}

function AboutThem({ facts }: { facts?: KeyFact[] }) {
  if (!facts || facts.length === 0) return null;
  return (
    <Card>
      <SectionHeading>About them</SectionHeading>
      <dl>
        {facts.map((f, i) => (
          <div
            key={i}
            className="py-[7px] grid grid-cols-[30%_1fr] gap-4 first:pt-0 last:pb-0"
          >
            <dt className="text-sm text-gray-500">{f.label}</dt>
            <dd className="text-sm text-gray-800">{f.value}</dd>
          </div>
        ))}
      </dl>
    </Card>
  );
}

function Tags({ tags }: { tags?: Tag[] }) {
  return (
    <Card>
      <SectionHeading>Tags</SectionHeading>
      {!tags || tags.length === 0 ? (
        <p className="text-sm text-gray-400">No tags yet.</p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {tags.map((t, i) => (
            <span
              key={i}
              title={t.source}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 border border-gray-200 rounded-full text-xs text-gray-700 bg-white hover:bg-gray-50 cursor-default transition-colors"
            >
              {t.auto && <span className="w-1.5 h-1.5 rounded-full bg-[#23a455]" />}
              {t.label}
            </span>
          ))}
        </div>
      )}
    </Card>
  );
}

const CRITERIA_PILL_STYLES: Record<SegmentCriterion['category'], string> = {
  attribute: 'bg-[#fef2f0] text-[#c0392b] border-[#f5d6d1]',
  product: 'bg-[#f1ecfa] text-[#5a3bbf] border-[#dccff0]',
  stage: 'bg-[#fef6e1] text-[#a16207] border-[#f3e0a6]',
  behavior: 'bg-[#f1f2f1] text-[#505451] border-[#dadcda]',
};

function CriteriaPill({ criterion }: { criterion: SegmentCriterion }) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs border ${CRITERIA_PILL_STYLES[criterion.category]}`}
    >
      {criterion.label}
    </span>
  );
}

function SegmentNudge({ profile }: { profile: ContactProfile }) {
  const [dismissed, setDismissed] = useState(false);
  if (!profile.segmentMatch || dismissed) return null;
  const { count, criteria } = profile.segmentMatch;
  const firstName = profile.name.split(' ')[0];

  return (
    <div className="relative bg-gradient-to-r from-[#f0f9f3] to-[#f8faf9] border border-[#d4e8db] rounded-lg px-5 py-4">
      <button
        onClick={() => setDismissed(true)}
        className="absolute top-2.5 right-2.5 text-gray-400 hover:text-gray-600 transition-colors"
        aria-label="Dismiss"
      >
        <X className="w-3.5 h-3.5" />
      </button>
      <div className="flex items-center gap-5 flex-wrap">
        <span className="text-3xl font-semibold text-[#23a455] leading-none">{count}</span>
        <div className="flex-1 min-w-0">
          <p className="text-sm text-gray-800 pr-6 leading-snug">
            contacts match {firstName}'s exact profile — this is a segment, not a one-off.
          </p>
          <div className="flex flex-wrap gap-1.5 mt-2.5">
            {criteria.map((c, i) => (
              <CriteriaPill key={i} criterion={c} />
            ))}
          </div>
        </div>
        <button className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#23a455] text-white text-sm font-medium rounded-md hover:bg-[#1d8f47] transition-colors flex-shrink-0">
          Build segment
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

// ── Profile tab sub-components ─────────────────────────────────────────────

/** Small Shopify-green shopping bag with an "S" — marks data sourced
 *  from a connected Shopify store so users can tell at a glance which
 *  signals came from order/cart data vs. conversation extraction. */
function ShopifyMark({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <span
      title="From Shopify"
      aria-label="From Shopify"
      className="inline-flex items-center justify-center flex-shrink-0"
    >
      <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
        <path d="M12.4055 3.92732C12.3978 3.85698 12.3351 3.82565 12.2885 3.82565C12.2418 3.82565 11.2185 3.74765 11.2185 3.74765C11.2185 3.74765 10.5078 3.03698 10.4218 2.96665C10.3438 2.88865 10.1951 2.91198 10.1328 2.92765C10.1251 2.92765 9.97646 2.97465 9.73446 3.05265C9.49246 2.35732 9.07846 1.72465 8.33646 1.72465H8.26613C8.06246 1.45898 7.79713 1.33398 7.57846 1.33398C5.86013 1.33398 5.03213 3.48198 4.77446 4.57565C4.1028 4.78665 3.62613 4.92698 3.57146 4.95065C3.19646 5.06765 3.1888 5.07565 3.1418 5.42698C3.1028 5.69265 2.12646 13.2457 2.12646 13.2457L9.72646 14.6673L13.8508 13.777C13.8585 13.7613 12.4135 3.99765 12.4055 3.92732ZM9.31246 3.16165C9.12513 3.21632 8.89846 3.28665 8.67213 3.36465V3.22432C8.67213 2.80265 8.61747 2.45898 8.5158 2.18532C8.90613 2.23232 9.14846 2.66198 9.31246 3.16165ZM8.03913 2.27132C8.1408 2.53698 8.21113 2.91198 8.21113 3.42732V3.50532C7.78946 3.63798 7.34413 3.77098 6.88313 3.91932C7.1408 2.93532 7.63313 2.45098 8.03913 2.27132ZM7.53913 1.78698C7.61713 1.78698 7.69546 1.81832 7.7578 1.86498C7.20313 2.12265 6.61746 2.77098 6.37513 4.08332C6.00813 4.20032 5.65646 4.30198 5.3208 4.41132C5.60213 3.41165 6.30513 1.78698 7.53913 1.78698Z" fill="#7CB342"/>
        <path d="M12.2882 3.8103C12.2412 3.8103 11.2182 3.7323 11.2182 3.7323C11.2182 3.7323 10.5075 3.02163 10.4215 2.9513C10.3898 2.91996 10.3508 2.9043 10.3198 2.9043L9.74951 14.6676L13.8738 13.7773C13.8738 13.7773 12.4288 3.99796 12.4208 3.92763C12.3895 3.8573 12.3348 3.82596 12.2882 3.8103Z" fill="#558B2F"/>
        <path d="M8.2643 6.19776L7.77263 7.68076C7.77263 7.68076 7.32696 7.44243 6.79696 7.44243C6.00563 7.44243 5.9673 7.94176 5.9673 8.06476C5.9673 8.74076 7.7343 9.00209 7.7343 10.5924C7.7343 11.8448 6.94297 12.6514 5.87497 12.6514C4.5843 12.6514 3.93896 11.8524 3.93896 11.8524L4.28463 10.7154C4.28463 10.7154 4.96063 11.2994 5.5293 11.2994C5.90563 11.2994 6.0593 11.0074 6.0593 10.7924C6.0593 9.90876 4.61496 9.87043 4.61496 8.41076C4.61496 7.18909 5.49096 6.00609 7.26563 6.00609C7.92596 5.99809 8.2643 6.19776 8.2643 6.19776Z" fill="white"/>
      </svg>
    </span>
  );
}

const SIGNAL_PILL_STYLES: Record<SignalTone, string> = {
  amber: 'bg-[#fef6e1] text-[#a16207] border-[#f3e0a6]',
  green: 'bg-[#e6f5ec] text-[#1d8242] border-[#cde9d6]',
  red: 'bg-[#fef2f0] text-[#c0392b] border-[#f5d6d1]',
  purple: 'bg-[#f1ecfa] text-[#5a3bbf] border-[#dccff0]',
  gray: 'bg-[#f1f2f1] text-[#505451] border-[#dadcda]',
  plain: '',
};

function SignalPill({ tone, children }: { tone: SignalTone; children: React.ReactNode }) {
  if (tone === 'plain') {
    return <span className="text-sm text-gray-800">{children}</span>;
  }
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs border ${SIGNAL_PILL_STYLES[tone]}`}
    >
      {children}
    </span>
  );
}

function CardHeader({ title, note }: { title: string; note?: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3 mb-4">
      <h2 className="text-[15px] font-semibold text-gray-900">{title}</h2>
      {note && <span className="text-xs text-gray-400">{note}</span>}
    </div>
  );
}

function ContactAttributes({ data }: { data: ProfileTabData }) {
  const [expanded, setExpanded] = useState(false);
  const remaining = data.totalAttributes - data.attributes.length;
  return (
    <Card>
      <CardHeader title="Contact Attributes" note={`${data.totalAttributes} fields`} />
      <dl>
        {data.attributes.map((a) => (
          <div
            key={a.key}
            className="py-[7px] grid grid-cols-[40%_1fr] gap-4 items-center first:pt-0 last:pb-0"
          >
            <dt className="text-sm text-gray-500 flex items-center gap-1.5">
              <span className="truncate">{a.key}</span>
              {a.source === 'shopify' && <ShopifyMark />}
            </dt>
            <dd className="text-sm text-gray-800 text-right truncate">{a.value}</dd>
          </div>
        ))}
      </dl>
      {!expanded && remaining > 0 && (
        <button
          onClick={() => setExpanded(true)}
          className="mt-3 text-xs text-[#23a455] hover:text-[#1d8f47] transition-colors"
        >
          Show all {data.totalAttributes} ▾
        </button>
      )}
    </Card>
  );
}

function Engagement({ data }: { data: ProfileTabData['engagement'] }) {
  return (
    <Card>
      <CardHeader title="Engagement" note={data.note} />
      <div className="grid grid-cols-3 gap-3 mb-5">
        {data.stats.map((s) => (
          <div
            key={s.label}
            className="border border-gray-200 rounded-lg bg-white px-4 py-3 text-center"
          >
            <p
              className={`text-2xl font-semibold leading-none ${
                s.highlight ? 'text-[#23a455]' : 'text-gray-900'
              }`}
            >
              {s.value}
            </p>
            <p className="mt-2 text-[10px] uppercase tracking-wider text-gray-400">
              {s.label}
            </p>
          </div>
        ))}
      </div>
      <dl>
        {data.fields.map((f) => (
          <div
            key={f.label}
            className="py-[7px] flex items-baseline justify-between gap-4 first:pt-0 last:pb-0"
          >
            <dt className="text-sm text-gray-500">{f.label}</dt>
            <dd
              className={`text-sm ${
                f.highlight ? 'text-[#23a455]' : 'text-gray-800'
              }`}
            >
              {f.value}
            </dd>
          </div>
        ))}
      </dl>
    </Card>
  );
}

function ExtractedSignals({ signals }: { signals: ExtractedSignal[] }) {
  return (
    <Card>
      <div className="flex items-baseline justify-between gap-3 mb-4">
        <h2 className="text-[15px] font-semibold text-gray-900">All extracted signals</h2>
        <button className="text-xs text-[#23a455] hover:text-[#1d8f47] transition-colors">
          Full signal list
        </button>
      </div>
      <dl>
        {signals.map((s) => {
          // Topics renders as multiple gray chips
          const isTopicList = s.label === 'Topics' && s.tone === 'gray';
          return (
            <div
              key={s.label}
              className="py-[9px] grid grid-cols-[40%_1fr] gap-4 items-center first:pt-0 last:pb-0"
            >
              <dt className="text-sm text-gray-500 flex items-center gap-1.5">
                <span className="truncate">{s.label}</span>
                {s.source === 'shopify' && <ShopifyMark />}
              </dt>
              <dd className="text-right">
                {s.empty ? (
                  <span className="text-sm text-gray-300">—</span>
                ) : isTopicList ? (
                  <div className="flex flex-wrap gap-1.5 justify-end">
                    {s.value.split(',').map((t) => (
                      <span
                        key={t.trim()}
                        className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-[#f1f2f1] text-[#505451] border border-[#dadcda]"
                      >
                        {t.trim()}
                      </span>
                    ))}
                  </div>
                ) : s.plain || !s.tone ? (
                  <span className="text-sm text-gray-800">{s.value}</span>
                ) : (
                  <SignalPill tone={s.tone}>{s.value}</SignalPill>
                )}
              </dd>
            </div>
          );
        })}
      </dl>
    </Card>
  );
}

function Segments({ segments }: { segments: SegmentEntry[] }) {
  return (
    <Card>
      <SectionHeading>Segments</SectionHeading>
      {segments.length === 0 ? (
        <p className="text-sm text-gray-400">No segments yet.</p>
      ) : (
        <ul>
          {segments.map((seg) => (
            <li
              key={seg.label}
              className="py-[9px] flex items-baseline justify-between gap-4 first:pt-0 last:pb-0"
            >
              <span className="text-sm text-gray-800">{seg.label}</span>
              <span className="text-xs text-gray-400 flex-shrink-0">{seg.enteredAt}</span>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}

const HISTORY_DOT_STYLES: Record<NonNullable<SignalHistoryEntry['dotTone']>, string> = {
  green: 'bg-[#23a455]',
  amber: 'bg-[#f59e0b]',
  red: 'bg-[#c0392b]',
  gray: 'bg-gray-400',
  blue: 'bg-[#3b82f6]',
};

const HISTORY_BADGE_STYLES: Record<'green' | 'red' | 'gray', string> = {
  green: 'bg-[#e6f5ec] text-[#1d8242]',
  red: 'bg-[#fef2f0] text-[#c0392b]',
  gray: 'bg-gray-100 text-gray-600',
};

function SignalHistory({ entries }: { entries: SignalHistoryEntry[] }) {
  const [filter, setFilter] = useState<'all' | string>('all');
  const fieldOptions = Array.from(new Set(entries.map((e) => e.field)));
  const filtered = filter === 'all' ? entries : entries.filter((e) => e.field === filter);

  return (
    <Card>
      <div className="flex items-baseline justify-between gap-3 mb-4">
        <h2 className="text-[15px] font-semibold text-gray-900">Signal History</h2>
        <div className="flex items-center gap-3">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="text-xs border border-gray-200 rounded px-2 py-1 bg-white text-gray-700 focus:outline-none focus:border-gray-400"
          >
            <option value="all">All signals</option>
            {fieldOptions.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
          <button className="text-xs text-gray-400 hover:text-gray-600 transition-colors">
            ▴ Hide
          </button>
        </div>
      </div>
      <ul className="space-y-5">
        {filtered.map((e) => (
          <li key={e.id} className="flex gap-3">
            <span
              className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ${
                HISTORY_DOT_STYLES[e.dotTone ?? 'gray']
              }`}
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline flex-wrap gap-x-2 gap-y-1">
                <span className="text-sm font-semibold text-gray-900 inline-flex items-center gap-1.5">
                  {e.field}
                  {e.source === 'shopify' && <ShopifyMark />}
                </span>
                {e.badge && (
                  <span
                    className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider ${
                      HISTORY_BADGE_STYLES[e.badge.tone]
                    }`}
                  >
                    {e.badge.label}
                  </span>
                )}
                <span className="text-sm text-gray-600">{e.action}</span>
                {e.detectedValue && (
                  <span className="text-sm text-gray-800">"{e.detectedValue}"</span>
                )}
              </div>
              <div className="mt-2 bg-gray-50 border border-gray-100 rounded-md px-3 py-2">
                <p className="text-[13px] italic text-gray-600 leading-snug">
                  "{e.quote}" <span className="text-gray-400 not-italic">— {e.confidence}% confidence</span>
                </p>
              </div>
              <p className="mt-1.5 text-[11px] text-gray-400">
                {e.timestamp} · {e.conversation}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}

function ProfileContent({ profile }: { profile: ContactProfile }) {
  if (!profile.profileTab) {
    return (
      <p className="mt-12 text-sm text-gray-400">
        No extracted profile data yet for this contact.
      </p>
    );
  }
  const data = profile.profileTab;
  return (
    <div className="mt-7 space-y-4">
      <ContactAttributes data={data} />
      <Engagement data={data.engagement} />
      <ExtractedSignals signals={data.extractedSignals} />
      <Tags tags={profile.tags} />
      <Segments segments={data.segments} />
      <SignalHistory entries={data.signalHistory} />
    </div>
  );
}

function OverviewContent({ profile }: { profile: ContactProfile }) {
  return (
    <div className="mt-7">
      <Brief profile={profile} />
      <div className="mt-8 space-y-4">
        <JourneyTimeline profile={profile} />
        <InterestedIn products={profile.products} />
        <Blockers blockers={profile.blockers} />
        <AboutThem facts={profile.facts} />
        <Tags tags={profile.tags} />
        <SegmentNudge profile={profile} />
      </div>
    </div>
  );
}

// ── Page ────────────────────────────────────────────────────────────────────

interface Contact360PageProps {
  profileKey: string;
  onBack: () => void;
}

export function Contact360Page({ profileKey, onBack }: Contact360PageProps) {
  const profile = CONTACT_PROFILES[profileKey] ?? CONTACT_PROFILES.new;
  const [tab, setTab] = useState<'Overview' | 'Profile' | 'Observations'>('Overview');

  return (
    <div className="flex flex-col w-full h-full bg-white overflow-y-auto">
      <div className="w-full max-w-[880px] mx-auto px-6 sm:px-10 lg:px-12 py-6">
        {/* Back */}
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Contacts
        </button>

        {/* Header */}
        <div className="mt-5 flex items-start gap-5">
          <Avatar initials={profile.initials} />
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-semibold text-gray-900">{profile.name}</h1>
            <p className="mt-1 text-sm text-gray-500">
              {profile.phone} · {profile.source} · Since {profile.since}
            </p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button className="px-4 py-2 bg-[#23a455] text-white text-sm font-medium rounded-md hover:bg-[#1d8f47] transition-colors">
              Message
            </button>
            <button className="w-9 h-9 flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-md transition-colors">
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <nav className="mt-8 flex items-center gap-6 border-b border-gray-200">
          {(['Overview', 'Profile', 'Observations'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`pb-3 text-sm transition-colors relative ${
                tab === t
                  ? 'text-gray-900 font-medium'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {t}
              {tab === t && (
                <span className="absolute left-0 right-0 -bottom-px h-0.5 bg-[#23a455]" />
              )}
            </button>
          ))}
        </nav>

        {/* Tab content */}
        {tab === 'Overview' && <OverviewContent profile={profile} />}
        {tab === 'Profile' && <ProfileContent profile={profile} />}
        {tab === 'Observations' && (
          <p className="mt-12 text-sm text-gray-400">Coming soon</p>
        )}

        <div className="h-12" />
      </div>
    </div>
  );
}
