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
        {tab === 'Overview' ? (
          <OverviewContent profile={profile} />
        ) : (
          <p className="mt-12 text-sm text-gray-400">Coming soon</p>
        )}

        <div className="h-12" />
      </div>
    </div>
  );
}
