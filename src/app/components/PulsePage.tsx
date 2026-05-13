import React, { useState, useEffect, useRef } from 'react';
import { Send, X, ChevronRight, ArrowRight } from 'lucide-react';

// ── Types ──────────────────────────────────────────────────────────────────

type CardType = 'PATTERN' | 'RECURRING' | 'DIGEST';
type ActionVariant = 'primary' | 'secondary' | 'tertiary';

interface CardAction {
  label: string;
  variant: ActionVariant;
  onClick?: () => void;
}

interface PulseCardData {
  id: string;
  type: CardType;
  status: string;
  timestamp: string;
  headline: string;
  body: React.ReactNode;
  evidence?: React.ReactNode;
  actions: CardAction[];
}

interface Section {
  id: string;
  label: string;
  sublabel: string;
  cards: PulseCardData[];
}

// ── Status pill ────────────────────────────────────────────────────────────

function StatusPill({ status }: { status: string }) {
  const styles: Record<string, string> = {
    NEW: 'bg-[#EDF1FA] text-[#173DA6]',
    ACTIVE: 'bg-[#ebf7f0] text-[#23a455]',
    PAUSED: 'bg-gray-100 text-gray-500',
  };
  const cls = styles[status] ?? 'bg-gray-100 text-gray-500';
  return (
    <span className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wide ${cls}`}>
      {status}
    </span>
  );
}

// ── Card ──────────────────────────────────────────────────────────────────

function PulseCard({ type, status, timestamp, headline, body, evidence, actions }: PulseCardData) {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;
  return (
    <div className="bg-white border border-gray-200 rounded-xl px-6 py-5">
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">{type}</span>
          <span className="text-gray-300 text-[10px]">·</span>
          <StatusPill status={status} />
        </div>
        <span className="text-[11px] text-gray-400 whitespace-nowrap shrink-0">{timestamp}</span>
      </div>
      <h3 className="text-[15px] font-semibold text-gray-900 leading-snug mb-2">{headline}</h3>
      <div className="text-sm text-gray-600 leading-relaxed">{body}</div>
      {evidence && (
        <div className="mt-3 bg-gray-50 border border-gray-100 rounded-lg px-4 py-3 text-sm text-gray-600 leading-relaxed">
          {evidence}
        </div>
      )}
      <div className="flex items-center gap-5 mt-4">
        {actions.map((action) => {
          if (action.variant === 'primary') {
            return (
              <button key={action.label} onClick={action.onClick}
                className="px-3 py-1.5 bg-[#23a455] text-white text-xs rounded-md hover:bg-[#1d8f47] transition-colors">
                {action.label}
              </button>
            );
          }
          if (action.variant === 'secondary') {
            return (
              <button key={action.label} onClick={action.onClick}
                className="text-xs text-gray-700 underline underline-offset-2 hover:text-gray-900 transition-colors">
                {action.label}
              </button>
            );
          }
          return (
            <button key={action.label} onClick={() => { action.onClick?.(); setDismissed(true); }}
              className="text-xs text-gray-400 hover:text-gray-600 transition-colors">
              {action.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────

function PulseSection({ label, sublabel, cards, defaultOpen = false }: Section & { defaultOpen?: boolean }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <section className="border border-gray-200 rounded-xl bg-white overflow-hidden">
      {/* Accordion header */}
      <button
        onClick={() => setIsOpen(prev => !prev)}
        className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-gray-800">{label}</span>
          {cards.length > 0 && (
            <span className="text-[10px] font-semibold bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded-full">
              {cards.length}
            </span>
          )}
          <span className="text-[11px] text-gray-400 hidden sm:inline">{sublabel}</span>
        </div>
        <ChevronRight
          className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`}
        />
      </button>

      {/* Accordion body */}
      <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-5 pb-5 border-t border-gray-100">
          {cards.length > 0 ? (
            <div className="space-y-3 pt-4">
              {cards.map((card) => <PulseCard key={card.id} {...card} />)}
            </div>
          ) : (
            <p className="text-sm text-gray-400 italic pt-4">Nothing yet — your workforce is still learning.</p>
          )}
        </div>
      </div>
    </section>
  );
}

// ── Digest card body ──────────────────────────────────────────────────────

function DigestBody() {
  return (
    <div className="space-y-3">
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-1.5">Top questions this week</p>
        <ul className="space-y-1 text-sm text-gray-600">
          <li>• "How do I track my order?" — <strong>38</strong> times</li>
          <li>• "Can I change my delivery address?" — <strong>24</strong> times</li>
          <li>• "What's the return policy?" — <strong>19</strong> times</li>
        </ul>
      </div>
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-1.5">Trending products</p>
        <ul className="space-y-1 text-sm text-gray-600">
          <li>• Body Balm — returns up <strong>42%</strong> vs last month</li>
          <li>• Hydration Serum — mentions up <strong>31%</strong> vs last week</li>
        </ul>
      </div>
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-1.5">One opportunity</p>
        <p className="text-sm text-gray-600"><strong>14 contacts</strong> asked about bundle pricing — no response template exists yet.</p>
      </div>
    </div>
  );
}

// ── Use cases modal ───────────────────────────────────────────────────────

const USE_CASES = [
  {
    category: 'Customer insights',
    items: [
      { prompt: 'Who are my highest-value customers this month?', desc: 'Surface top spenders and engagement patterns' },
      { prompt: 'Which contacts are most likely to churn?', desc: 'Identify drop-off signals before they leave' },
      { prompt: 'What do customers ask about most?', desc: 'Summarise the top recurring questions' },
    ],
  },
  {
    category: 'Team performance',
    items: [
      { prompt: 'Why did response times drop this week?', desc: 'Pinpoint gaps in coverage or volume spikes' },
      { prompt: 'Which agent closes the most conversations?', desc: 'Compare resolution rates across the team' },
      { prompt: 'Show me conversations that took longer than 2 hours', desc: 'Spot outliers in handling time' },
    ],
  },
  {
    category: 'Sales & conversion',
    items: [
      { prompt: 'Who is ready to buy right now?', desc: 'Find contacts with strong buying signals' },
      { prompt: 'How many negotiations closed this week?', desc: 'Track deal progress across the pipeline' },
      { prompt: 'What stopped people from converting?', desc: 'Understand drop-off reasons in the funnel' },
    ],
  },
  {
    category: 'Automation',
    items: [
      { prompt: 'Set up a follow-up for drop-off contacts', desc: 'Create a re-engagement automation in one step' },
      { prompt: 'Summarise what my workforce did this week', desc: 'Get the Monday digest on demand' },
    ],
  },
];

function UseCasesModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col">
        {/* Modal header */}
        <div className="flex items-center justify-between px-7 pt-6 pb-4 border-b border-gray-100 shrink-0">
          <h2 className="text-lg font-semibold text-gray-900">What Pulse can do for you</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal body */}
        <div className="overflow-y-auto px-7 py-5 space-y-7">
          {USE_CASES.map((group) => (
            <div key={group.category}>
              <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400 mb-3">{group.category}</p>
              <div className="grid grid-cols-1 gap-2">
                {group.items.map((item) => (
                  <button
                    key={item.prompt}
                    onClick={onClose}
                    className="w-full text-left flex items-start gap-3 px-4 py-3 rounded-lg border border-gray-100 bg-gray-50 hover:bg-[#f0faf5] hover:border-[#23a455]/20 transition-colors group"
                  >
                    <ArrowRight className="w-3.5 h-3.5 mt-0.5 text-gray-300 group-hover:text-[#23a455] shrink-0 transition-colors" />
                    <div>
                      <p className="text-sm text-gray-800 leading-snug">"{item.prompt}"</p>
                      <p className="text-xs text-gray-400 mt-0.5">{item.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Expanded Vibe overlay ─────────────────────────────────────────────────

const QUICK_OPTIONS = [
  "Why did response times drop this week?",
  "Who's ready to buy right now?",
  "Which contacts are at risk of dropping off?",
  "Show me what my team handled today",
];

function VibeOverlay({
  query,
  onChange,
  onClose,
  onOpenUseCases,
}: {
  query: string;
  onChange: (v: string) => void;
  onClose: () => void;
  onOpenUseCases: () => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-40 flex flex-col items-center justify-center px-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      {/* Panel */}
      <div className="relative w-full max-w-xl space-y-4">
        {/* Heading */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-white">Ask anything about your customers</h2>
          <p className="text-sm text-white/60 mt-1">Pulse has context across all your conversations</p>
        </div>

        {/* Input */}
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter' && query.trim()) { onChange(''); onClose(); } }}
            placeholder="Try 'why did response times drop?' or 'who's ready to buy?'"
            className="w-full bg-white border border-gray-200 rounded-xl px-5 py-3.5 pr-12 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none shadow-lg"
          />
          <button
            onClick={() => { if (query.trim()) { onChange(''); onClose(); } }}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center rounded-full bg-[#23a455] text-white hover:bg-[#1d8f47] transition-colors"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Quick options */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-lg overflow-hidden">
          {QUICK_OPTIONS.map((opt, i) => (
            <button
              key={opt}
              onClick={() => { onChange(opt); inputRef.current?.focus(); }}
              className={`w-full flex items-center justify-between px-5 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors text-left ${i < QUICK_OPTIONS.length - 1 ? 'border-b border-gray-100' : ''}`}
            >
              <span>{opt}</span>
              <ChevronRight className="w-3.5 h-3.5 text-gray-300 shrink-0" />
            </button>
          ))}
        </div>

        {/* See what Pulse can do card */}
        <button
          onClick={(e) => { e.stopPropagation(); onOpenUseCases(); }}
          className="w-full flex items-center justify-between bg-white rounded-xl border border-gray-100 shadow-lg px-5 py-4 hover:bg-gray-50 transition-colors group"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#ebf7f0] flex items-center justify-center shrink-0">
              <span className="text-[#23a455] text-sm">✦</span>
            </div>
            <div className="text-left">
              <p className="text-sm font-medium text-gray-800">See what Pulse can do for you</p>
              <p className="text-xs text-gray-400 mt-0.5">Read about the top use cases</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-gray-500 transition-colors shrink-0" />
        </button>

        {/* Esc hint */}
        <p className="text-center text-xs text-white/40">Press <kbd className="bg-white/10 text-white/60 px-1.5 py-0.5 rounded text-[10px]">Esc</kbd> to close</p>
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────

export function PulsePage() {
  const [query, setQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [showUseCasesModal, setShowUseCasesModal] = useState(false);

  const sections: Section[] = [
    {
      id: 'patterns',
      label: 'Patterns',
      sublabel: 'things the system noticed on its own',
      cards: [
        {
          id: 'p1',
          type: 'PATTERN',
          status: 'NEW',
          timestamp: 'discovered yesterday',
          headline: 'Saturday response times are your worst this week.',
          body: 'Replies on Saturday took 4× longer than weekdays. Most volume came from product enquiries that went unanswered for hours.',
          evidence: (
            <span>Saturday avg. response time: <strong>4h 12m</strong> · Weekday avg.: <strong>58m</strong> · Saturday volume: <strong>23 conversations</strong></span>
          ),
          actions: [
            { label: 'Set up a Saturday watcher', variant: 'primary' },
            { label: 'Dismiss', variant: 'tertiary' },
          ],
        },
        {
          id: 'p2',
          type: 'PATTERN',
          status: 'NEW',
          timestamp: 'discovered 3 days ago',
          headline: 'Returns are clustered on one product.',
          body: 'Body Balm accounts for 42% of returns this month, vs 18% of sales. Three customers cited "stronger smell than expected."',
          actions: [
            { label: 'Investigate', variant: 'primary' },
            { label: 'Dismiss', variant: 'tertiary' },
          ],
        },
      ],
    },
    {
      id: 'recurring',
      label: 'Recurring actions',
      sublabel: 'automations the owner has set up',
      cards: [
        {
          id: 'r1',
          type: 'RECURRING',
          status: 'ACTIVE',
          timestamp: 'active since 3 May',
          headline: 'Drop-off follow-up.',
          body: 'Automatically sends a follow-up message to contacts who go quiet for 3+ days after reaching negotiating stage.',
          evidence: (
            <span><strong>12 contacts</strong> followed up · <strong>3 re-engaged</strong> this week.</span>
          ),
          actions: [
            { label: 'Edit', variant: 'secondary' },
            { label: 'Pause', variant: 'tertiary' },
          ],
        },
      ],
    },
    {
      id: 'digest',
      label: 'Weekly digest',
      sublabel: 'the Monday summary',
      cards: [
        {
          id: 'd1',
          type: 'DIGEST',
          status: 'MON 9:00 AM',
          timestamp: 'this week',
          headline: 'Monday digest · week of 4 May.',
          body: <DigestBody />,
          actions: [
            { label: 'Open full digest', variant: 'secondary' },
            { label: 'Dismiss', variant: 'tertiary' },
          ],
        },
      ],
    },
  ];

  return (
    <div className="flex flex-col h-full bg-[#F9F9F7] overflow-hidden">
      {/* Header */}
      <div className="px-8 pt-8 pb-5 shrink-0">
        <h1 className="text-2xl font-semibold text-gray-900 leading-tight">Pulse</h1>
        <p className="text-sm text-gray-500 mt-0.5">What your workforce noticed this week.</p>
      </div>

      {/* Vibe input — clicking opens the expanded overlay */}
      <div className="px-8 pb-6 shrink-0">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsExpanded(true)}
            onClick={() => setIsExpanded(true)}
            readOnly={!isExpanded}
            placeholder="Ask anything about your customers — try 'why did response times drop?' or 'who's ready to buy?'"
            className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 pr-11 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none cursor-pointer transition-colors hover:border-gray-300"
          />
          <button
            onClick={() => setIsExpanded(true)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#23a455] transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Feed */}
      <div className="flex-1 overflow-y-auto px-8 pb-10 space-y-2">
        {sections.map((section, i) => (
          <PulseSection key={section.id} {...section} defaultOpen={i === 0} />
        ))}
      </div>

      {/* Expanded Vibe overlay */}
      {isExpanded && (
        <VibeOverlay
          query={query}
          onChange={setQuery}
          onClose={() => setIsExpanded(false)}
          onOpenUseCases={() => { setShowUseCasesModal(true); }}
        />
      )}

      {/* Use cases modal */}
      {showUseCasesModal && (
        <UseCasesModal onClose={() => setShowUseCasesModal(false)} />
      )}
    </div>
  );
}
