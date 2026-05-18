import React, { useEffect, useState, useMemo } from 'react';
import { Send, Inbox, ChevronLeft, Rocket, Settings, Clock, Database, CheckCircle2 } from 'lucide-react';
import { WatcherCard } from './watcher/WatcherCard';
import { buildReadyToBuyWatcher } from './watcher/readyToBuyWatcher';
import { buildTopTopicsWatcher } from './watcher/topTopicsWatcher';
import { buildSpamWatcher } from './watcher/spamWatcher';
import { buildDemandSpikeWatcher } from './watcher/demandSpikeWatcher';
import { TEMPLATE_WATCHERS } from './watcher/templates';
import type { Watcher } from './watcher/types';

// ── Types ──────────────────────────────────────────────────────────────────

export type PulseTab = 'workforce' | 'insights' | 'handoffs';

export interface PulseRequest {
  tab: PulseTab;
  /** When set on a workforce-tab request, opens the detail view for this watcher. */
  watcherDetailId?: string;
}

type PatternActionVariant = 'primary' | 'secondary' | 'tertiary';

interface PatternAction {
  label: string;
  variant: PatternActionVariant;
}

interface PatternCard {
  id: string;
  status: string;
  timestamp: string;
  headline: string;
  body: React.ReactNode;
  evidence?: React.ReactNode;
  actions: PatternAction[];
}

// ── Insights: existing Pattern cards (kept as-is) ──────────────────────────

function StatusPill({ status }: { status: string }) {
  return (
    <span className="inline-block px-1.5 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wide bg-[#EDF1FA] text-[#173DA6]">
      {status}
    </span>
  );
}

function PatternCardView({ status, timestamp, headline, body, evidence, actions }: PatternCard) {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;
  return (
    <div className="bg-white border border-gray-200 rounded-xl px-6 py-5">
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">PATTERN</span>
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
              <button
                key={action.label}
                className="px-3 py-1.5 bg-[#23a455] text-white text-xs rounded-md hover:bg-[#1d8f47] transition-colors"
              >
                {action.label}
              </button>
            );
          }
          if (action.variant === 'secondary') {
            return (
              <button
                key={action.label}
                className="text-xs text-gray-700 underline underline-offset-2 hover:text-gray-900 transition-colors"
              >
                {action.label}
              </button>
            );
          }
          return (
            <button
              key={action.label}
              onClick={() => setDismissed(true)}
              className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
            >
              {action.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

const PATTERN_CARDS: PatternCard[] = [
  {
    id: 'p1',
    status: 'NEW',
    timestamp: 'discovered yesterday',
    headline: 'Saturday response times are your worst this week.',
    body: 'Replies on Saturday took 4× longer than weekdays. Most volume came from product enquiries that went unanswered for hours.',
    evidence: (
      <span>
        Saturday avg. response time: <strong>4h 12m</strong> · Weekday avg.: <strong>58m</strong> · Saturday volume: <strong>23 conversations</strong>
      </span>
    ),
    actions: [
      { label: 'Set up a Saturday watcher', variant: 'primary' },
      { label: 'Dismiss', variant: 'tertiary' },
    ],
  },
  {
    id: 'p2',
    status: 'NEW',
    timestamp: 'discovered 3 days ago',
    headline: 'Returns are clustered on one product.',
    body: 'Body Balm accounts for 42% of returns this month, vs 18% of sales. Three customers cited "stronger smell than expected."',
    actions: [
      { label: 'Investigate', variant: 'primary' },
      { label: 'Dismiss', variant: 'tertiary' },
    ],
  },
];

// ── Tab navigation ─────────────────────────────────────────────────────────

interface TabDef {
  id: PulseTab;
  label: string;
  count: number;
}

function TabNav({
  active,
  onChange,
  tabs,
}: {
  active: PulseTab;
  onChange: (tab: PulseTab) => void;
  tabs: TabDef[];
}) {
  return (
    <nav className="flex items-center gap-6 border-b border-gray-200">
      {tabs.map((t) => {
        const isActive = active === t.id;
        return (
          <button
            key={t.id}
            onClick={() => onChange(t.id)}
            className={`relative pb-3 pt-1 flex items-center gap-2 text-sm transition-colors ${
              isActive
                ? 'text-gray-900 font-medium'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {t.label}
            <span
              className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${
                isActive ? 'bg-[#ebf7f0] text-[#1d8242]' : 'bg-gray-100 text-gray-500'
              }`}
            >
              {t.count}
            </span>
            {isActive && (
              <span className="absolute left-0 right-0 -bottom-px h-0.5 bg-[#23a455]" />
            )}
          </button>
        );
      })}
    </nav>
  );
}

// ── Empty state for Handoffs tab ───────────────────────────────────────────

function HandoffsEmpty() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-4">
      <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
        <Inbox className="w-5 h-5 text-gray-400" strokeWidth={1.75} />
      </div>
      <h3 className="text-sm font-medium text-gray-700">No handoffs right now</h3>
      <p className="text-xs text-gray-500 mt-1 max-w-xs leading-relaxed">
        When your workforce needs your decision on something, it&apos;ll appear here.
      </p>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────

interface PulsePageProps {
  onOpenVibe?: () => void;
  /** External navigation request from elsewhere in the app (e.g. inbox snippet). */
  request?: PulseRequest | null;
  onRequestConsumed?: () => void;
  /** Opens the Vibe slider in edit-watcher mode with the prompt pre-filled. */
  onEditWatcher?: (ctx: { id: string; name: string; prompt: string }) => void;
}

// ── Section heading inside a tab ───────────────────────────────────────────

function SectionHeading({
  label,
  count,
}: {
  label: string;
  count?: number;
}) {
  return (
    <div className="flex items-baseline gap-2 mb-3">
      <h3 className="text-[11px] font-semibold uppercase tracking-wider text-gray-500">
        {label}
      </h3>
      {typeof count === 'number' && (
        <span className="text-[10px] text-gray-400">{count}</span>
      )}
    </div>
  );
}

// ── Dev-only freshness toggle for the Top Topics watcher ──────────────────

function TopTopicsDevToggle({
  state,
  onChange,
}: {
  state: 'fresh' | 'aging';
  onChange: (s: 'fresh' | 'aging') => void;
}) {
  const options: Array<'fresh' | 'aging'> = ['fresh', 'aging'];
  return (
    <div className="flex items-center gap-2 text-[11px] text-gray-500">
      <span className="uppercase tracking-wider text-[10px] text-gray-400">
        Top Topics state
      </span>
      <div className="inline-flex border border-gray-200 rounded-md overflow-hidden bg-white">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            className={`px-2.5 py-1 transition-colors ${
              state === opt
                ? 'bg-gray-100 text-gray-800 font-medium'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

// ── Suggested watcher definitions ─────────────────────────────────────────

interface ActiveStats {
  handled: { value: string; label: string };
  outcome: { value: string; label: string };
  rightNow: { value: string; label: string };
}

interface WatcherSettings {
  type: string;
  schedule: string;
  state: string;
  created: string;
}

interface SuggestedWatcherDef {
  id: string;
  name: string;
  tagline: string;
  rule: string;
  access: string[];
  stats: ActiveStats;
  settings: WatcherSettings;
  recentActivity: Array<{ time: string; text: string }>;
}

const SUGGESTED_WATCHER_DEFS: SuggestedWatcherDef[] = [
  {
    id: 'spam',
    name: 'Spam & junk filter',
    tagline: 'Silently routes spam and junk away from your team queue',
    rule: 'Detects repetitive messages, suspicious links, and known spam patterns in incoming conversations — then routes them away before they ever reach your team.',
    access: ['Incoming message content', 'Sender history', 'Contact blocklist'],
    stats: {
      handled: { value: '3,841', label: 'filtered this month' },
      outcome: { value: '0', label: 'false positives' },
      rightNow: { value: '9', label: 'caught in last hour' },
    },
    settings: { type: 'Silent', schedule: 'Continuous', state: 'Running', created: '3 weeks ago' },
    recentActivity: [
      { time: '2 min ago', text: 'Filtered "win a free iPhone" from +91 98765 43210' },
      { time: '14 min ago', text: 'Blocked repetitive promo from unknown sender' },
      { time: '1 hr ago', text: 'Caught suspicious link — routed to junk' },
    ],
  },
  {
    id: 'ready-to-buy',
    name: 'Ready-to-buy watcher',
    tagline: 'Surfaces sales leads most likely to convert right now',
    rule: 'Monitors open sales conversations and scores them for purchase intent based on message language, product questions asked, and engagement recency. Surfaces the hottest leads at the top of your inbox.',
    access: ['Conversation history', 'Contact properties', 'Product catalogue'],
    stats: {
      handled: { value: '47', label: 'leads scored this month' },
      outcome: { value: '12', label: 'converted to purchase' },
      rightNow: { value: '3', label: 'hot leads active now' },
    },
    settings: { type: 'Intelligent', schedule: 'Continuous', state: 'Running', created: '2 weeks ago' },
    recentActivity: [
      { time: '5 min ago', text: 'Priya Sharma scored 94 — asking about bulk pricing' },
      { time: '23 min ago', text: 'Omar Farooq moved to high intent after 3rd follow-up' },
      { time: '2 hr ago', text: 'Lena Fischer converted — order placed' },
    ],
  },
  {
    id: 'top-topics',
    name: 'Top topics watcher',
    tagline: 'Surfaces recurring themes across all your conversations',
    rule: 'Scans all incoming conversations every 2 hours to identify recurring themes, product mentions, and emerging complaints — so you always know what your customers are really talking about.',
    access: ['All conversation content', 'Tags & labels', 'Contact segments'],
    stats: {
      handled: { value: '283', label: 'conversations scanned today' },
      outcome: { value: '5', label: 'topics surfaced this week' },
      rightNow: { value: '18', label: 'conversations being monitored' },
    },
    settings: { type: 'Analytical', schedule: 'Every 2 hours', state: 'Running', created: '1 month ago' },
    recentActivity: [
      { time: '2 hr ago', text: '"Delivery delay" trending — 14 mentions today' },
      { time: '4 hr ago', text: 'New topic emerging: "Body Balm smell complaint"' },
      { time: '6 hr ago', text: '"Return policy" dropped 40% vs last week' },
    ],
  },
  {
    id: 'demand-spike',
    name: 'Demand spike detector',
    tagline: 'Alerts you before conversation volume overloads your team',
    rule: 'Watches conversation volume across all channels in real time. When incoming messages spike beyond your normal baseline — from a campaign, viral post, or seasonal rush — it alerts you before queues overflow.',
    access: ['Conversation volume metrics', 'Channel data', 'Historical baselines'],
    stats: {
      handled: { value: '12', label: 'spikes detected this month' },
      outcome: { value: '8', label: 'alerts sent in time' },
      rightNow: { value: 'Normal', label: 'demand — no spike active' },
    },
    settings: { type: 'Alerting', schedule: 'Continuous', state: 'Running', created: '3 weeks ago' },
    recentActivity: [
      { time: '2 days ago', text: 'Spike alert fired — 4× normal volume at 10:32 AM' },
      { time: '5 days ago', text: 'Instagram spike detected after campaign launch' },
      { time: '1 week ago', text: 'Saturday volume spike — alert sent to team' },
    ],
  },
];

// ── Suggested watcher card ─────────────────────────────────────────────────

function SuggestedWatcherCard({
  def,
  onDeploy,
}: {
  def: SuggestedWatcherDef;
  onDeploy: () => void;
}) {
  const [deploying, setDeploying] = useState(false);

  function handleDeploy() {
    setDeploying(true);
    // Brief animation before promoting
    setTimeout(() => {
      onDeploy();
    }, 600);
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="flex items-start gap-3 px-5 py-4 border-b border-gray-100">
        <div className="w-7 h-7 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center gap-[3px] shrink-0 mt-0.5">
          <span className="w-[3px] h-[3px] rounded-full bg-gray-400" />
          <span className="w-[3px] h-[3px] rounded-full bg-gray-400" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-gray-900 leading-tight">{def.name}</h4>
          <p className="text-xs text-gray-500 mt-0.5 leading-snug">{def.tagline}</p>
        </div>
        <span className="text-[10px] font-medium px-2 py-1 rounded-full bg-gray-100 text-gray-500 uppercase tracking-wide self-start shrink-0">
          Suggested
        </span>
      </div>

      {/* Body */}
      <div className="px-5 py-4 space-y-4">
        {/* Rule */}
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-1.5">The Rule</p>
          <p className="text-sm text-gray-600 leading-relaxed">{def.rule}</p>
        </div>

        {/* What it can access */}
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-2">What it can access</p>
          <div className="flex flex-wrap gap-1.5">
            {def.access.map((item) => (
              <span
                key={item}
                className="inline-flex items-center gap-1 text-xs text-gray-600 bg-gray-50 border border-gray-200 rounded-md px-2 py-1"
              >
                <Database className="w-3 h-3 text-gray-400" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-5 py-3.5 bg-gray-50 border-t border-gray-100 flex items-center justify-between gap-3">
        <p className="text-xs text-gray-400">
          Deploys instantly — you can pause or edit at any time
        </p>
        <button
          onClick={handleDeploy}
          disabled={deploying}
          className={`inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg transition-all shrink-0 ${
            deploying
              ? 'bg-[#ebf7f0] text-[#1d8242] cursor-not-allowed'
              : 'bg-[#23a455] text-white hover:bg-[#1d8f47] active:bg-[#1a7a3e]'
          }`}
        >
          <Rocket className="w-3.5 h-3.5" />
          {deploying ? 'Deploying…' : 'Deploy Watcher'}
        </button>
      </div>
    </div>
  );
}

// ── Active watcher preview card ────────────────────────────────────────────

function ActiveWatcherPreviewCard({
  def,
  onViewDetails,
}: {
  def: SuggestedWatcherDef;
  onViewDetails: () => void;
}) {
  return (
    <div
      onClick={onViewDetails}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onViewDetails(); } }}
      className="bg-white border border-gray-200 rounded-xl overflow-hidden cursor-pointer hover:border-gray-300 hover:shadow-sm transition-all group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#23a455]/30"
    >
      {/* Header */}
      <div className="flex items-start gap-3 px-5 py-4 border-b border-gray-100">
        <div className="relative w-7 h-7 shrink-0 mt-0.5">
          <div className="w-7 h-7 rounded-full bg-gray-800 flex items-center justify-center gap-[3px]">
            <span className="w-[3px] h-[3px] rounded-full bg-white" />
            <span className="w-[3px] h-[3px] rounded-full bg-white" />
          </div>
          {/* Running indicator */}
          <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#23a455] border-2 border-white" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-gray-900 leading-tight">{def.name}</h4>
          <p className="text-xs text-gray-500 mt-0.5">
            {def.settings.schedule} · {def.settings.type}
          </p>
        </div>
        <div className="flex items-center gap-2 self-start shrink-0">
          <span className="inline-flex items-center gap-1 text-[10px] font-medium px-2 py-1 rounded-full bg-[#ebf7f0] text-[#1d8242]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#23a455]" />
            {def.settings.state}
          </span>
          <ChevronLeft className="w-4 h-4 text-gray-400 rotate-180 group-hover:text-gray-600 transition-colors" />
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 divide-x divide-gray-100 border-b border-gray-100">
        {[
          { ...def.stats.handled, icon: <CheckCircle2 className="w-3.5 h-3.5 text-gray-400" />, title: 'Handled' },
          { ...def.stats.outcome, icon: <Settings className="w-3.5 h-3.5 text-gray-400" />, title: 'Outcome' },
          { ...def.stats.rightNow, icon: <Clock className="w-3.5 h-3.5 text-gray-400" />, title: 'Right Now' },
        ].map((stat) => (
          <div key={stat.title} className="px-4 py-3.5 flex flex-col gap-1">
            <div className="flex items-center gap-1.5">
              {stat.icon}
              <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">{stat.title}</span>
            </div>
            <p className="text-lg font-semibold text-gray-900 leading-none">{stat.value}</p>
            <p className="text-[11px] text-gray-500 leading-tight">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Recent activity */}
      <div className="px-5 py-3.5">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-2">Recent Activity</p>
        <div className="space-y-1.5">
          {def.recentActivity.slice(0, 2).map((item, i) => (
            <div key={i} className="flex items-start gap-2 text-xs">
              <span className="text-gray-400 whitespace-nowrap shrink-0 mt-px">{item.time}</span>
              <span className="text-gray-600">{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Workforce tab — builds the full / preview / detail views ──────────────

function WorkforceTab({
  enabledIds,
  detailId,
  onOpenDetail,
  onBackToList,
  onDeployWatcher,
  topTopicsState,
  onTopTopicsStateChange,
  onEditWatcher,
}: {
  enabledIds: Set<string>;
  detailId: string | null;
  onOpenDetail: (id: string) => void;
  onBackToList: () => void;
  onDeployWatcher: (id: string) => void;
  topTopicsState: 'fresh' | 'aging';
  onTopTopicsStateChange: (s: 'fresh' | 'aging') => void;
  onEditWatcher?: (ctx: { id: string; name: string; prompt: string }) => void;
}) {
  // Resolve a watcher id to its Watcher object (for detail view only).
  const buildWatcher = (
    id: string,
    variant: 'full' | 'preview',
    handlers?: { onViewDetails?: () => void }
  ): Watcher | null => {
    if (id === 'ready-to-buy') return buildReadyToBuyWatcher({ variant, ...handlers });
    if (id === 'top-topics') return buildTopTopicsWatcher({ variant, state: topTopicsState, ...handlers });
    if (id === 'demand-spike') return buildDemandSpikeWatcher({ variant, ...handlers });
    if (id === 'spam') return buildSpamWatcher({ variant, ...handlers });
    const template = TEMPLATE_WATCHERS.find((t) => t.id === id);
    return template ? template.build({ variant, ...handlers }) : null;
  };

  // ── Detail view ────────────────────────────────────────────────────────
  if (detailId) {
    const watcher = buildWatcher(detailId, 'full');
    if (!watcher) {
      return (
        <div className="text-sm text-gray-500">
          That watcher isn't available.
          <button onClick={onBackToList} className="ml-2 underline">Back</button>
        </div>
      );
    }
    return (
      <div className="space-y-4">
        <button
          onClick={onBackToList}
          className="inline-flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Workforce
        </button>
        {detailId === 'top-topics' && (
          <TopTopicsDevToggle state={topTopicsState} onChange={onTopTopicsStateChange} />
        )}
        <WatcherCard
          watcher={watcher}
          cardId={`watcher-${detailId}`}
          onEdit={onEditWatcher}
        />
      </div>
    );
  }

  // ── List view: Active watchers + Suggested watchers ───────────────────

  const activeWatcherDefs = SUGGESTED_WATCHER_DEFS.filter((d) => enabledIds.has(d.id));
  const suggestedWatcherDefs = SUGGESTED_WATCHER_DEFS.filter((d) => !enabledIds.has(d.id));

  return (
    <div className="space-y-8">
      {/* Dev-only freshness toggle for Top Topics (only when active) */}
      {enabledIds.has('top-topics') && (
        <TopTopicsDevToggle state={topTopicsState} onChange={onTopTopicsStateChange} />
      )}

      {/* Active Watchers — operational stats view */}
      <section>
        <SectionHeading label="Active Watchers" count={activeWatcherDefs.length} />
        {activeWatcherDefs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-center bg-white border border-dashed border-gray-200 rounded-xl">
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mb-3">
              <Rocket className="w-4 h-4 text-gray-400" strokeWidth={1.75} />
            </div>
            <p className="text-sm font-medium text-gray-700">No active watchers yet</p>
            <p className="text-xs text-gray-500 mt-1 max-w-xs leading-relaxed">
              Deploy a suggested watcher below to start monitoring your inbox automatically.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {activeWatcherDefs.map((def) => (
              <ActiveWatcherPreviewCard
                key={def.id}
                def={def}
                onViewDetails={() => onOpenDetail(def.id)}
              />
            ))}
          </div>
        )}
      </section>

      {/* Suggested Watchers — full WatcherCard demo view with Deploy CTA */}
      {suggestedWatcherDefs.length > 0 && (
        <section>
          <SectionHeading label="Suggested Watchers" count={suggestedWatcherDefs.length} />
          <p className="text-xs text-gray-500 mb-4 leading-relaxed">
            Ready-to-deploy watchers built for your inbox. Each one runs autonomously once you deploy it.
          </p>
          <div className="space-y-3">
            {suggestedWatcherDefs.map((def) => {
              // Build full watcher but replace actions with "Deploy Watcher"
              const watcher = buildWatcher(def.id, 'full');
              if (!watcher) return null;
              const deployableWatcher = {
                ...watcher,
                actions: [
                  {
                    label: 'Deploy Watcher',
                    variant: 'primary' as const,
                    onClick: () => onDeployWatcher(def.id),
                  },
                ],
              };
              return (
                <WatcherCard
                  key={def.id}
                  watcher={deployableWatcher}
                  variant="full"
                />
              );
            })}
          </div>
        </section>
      )}

      {suggestedWatcherDefs.length === 0 ? (
        <p className="text-xs text-gray-400 pt-2">
          All suggested watchers are deployed. Add a custom watcher via Vibe — type{' '}
          <span className="italic">&ldquo;watch for…&rdquo;</span>
        </p>
      ) : (
        <p className="text-xs text-gray-400 pt-2">
          Add a custom watcher via Vibe — just type{' '}
          <span className="italic">&ldquo;watch for…&rdquo;</span>
        </p>
      )}
    </div>
  );
}

export function PulsePage({
  onOpenVibe,
  request,
  onRequestConsumed,
  onEditWatcher,
}: PulsePageProps = {}) {
  const [tab, setTab] = useState<PulseTab>('workforce');
  // Active watcher ids — starts empty; watchers are promoted from
  // Suggested → Active when the user clicks "Deploy Watcher".
  const [enabledWatcherIds, setEnabledWatcherIds] = useState<Set<string>>(
    () => new Set<string>()
  );
  // The Workforce sub-view: null = list, string = detail page for that watcher
  const [workforceDetailId, setWorkforceDetailId] = useState<string | null>(null);
  // Dev-only toggle for Top Topics freshness state.
  const [topTopicsState, setTopTopicsState] = useState<'fresh' | 'aging'>('fresh');

  // React to external navigation requests (inbox snippet → Pulse)
  useEffect(() => {
    if (!request) return;
    setTab(request.tab);
    if (request.tab === 'workforce') {
      setWorkforceDetailId(request.watcherDetailId ?? null);
    }
    onRequestConsumed?.();
  }, [request]); // eslint-disable-line react-hooks/exhaustive-deps

  // When the user switches AWAY from Workforce, reset the detail view so
  // returning lands back on the list.
  useEffect(() => {
    if (tab !== 'workforce') setWorkforceDetailId(null);
  }, [tab]);

  const tabs: TabDef[] = useMemo(
    () => [
      { id: 'workforce', label: 'Workforce', count: SUGGESTED_WATCHER_DEFS.length },
      { id: 'insights', label: 'Insights', count: PATTERN_CARDS.length },
      { id: 'handoffs', label: 'Handoffs', count: 0 },
    ],
    []
  );

  return (
    <div className="flex flex-col h-full w-full bg-[#F6F7F6] overflow-hidden">
      {/* Page header */}
      <div className="px-8 pt-8 pb-4 shrink-0">
        <div className="max-w-[960px] mx-auto w-full">
          <h1 className="text-2xl font-semibold text-gray-900 leading-tight">Pulse</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Your AI workforce — what they&apos;re doing, what they noticed, what needs you
          </p>
        </div>
      </div>

      {/* Sticky Vibe + tabs region — outer gutter (px-8) lives on each row's
          wrapper, with a max-w-[960px] inner column. Same pattern as the
          page header and tab content below, so everything left-aligns. */}
      <div className="shrink-0 bg-[#F6F7F6] border-b border-gray-200">
        <div className="px-8 pt-4 pb-3">
          <div className="max-w-[960px] mx-auto w-full relative">
            <input
              type="text"
              readOnly
              onClick={() => onOpenVibe?.()}
              onFocus={() => onOpenVibe?.()}
              placeholder="Ask anything about your customers — try 'why did response times drop?' or 'who's ready to buy?'"
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 pr-11 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none cursor-pointer transition-colors hover:border-gray-300"
            />
            <button
              onClick={() => onOpenVibe?.()}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#23a455] transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="px-8">
          <div className="max-w-[960px] mx-auto w-full">
            <TabNav active={tab} onChange={setTab} tabs={tabs} />
          </div>
        </div>
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-y-auto px-8 py-6">
        <div className="max-w-[960px] mx-auto w-full">
          {tab === 'workforce' && (
            <WorkforceTab
              enabledIds={enabledWatcherIds}
              detailId={workforceDetailId}
              onOpenDetail={setWorkforceDetailId}
              onBackToList={() => setWorkforceDetailId(null)}
              onDeployWatcher={(id) =>
                setEnabledWatcherIds((prev) => {
                  const next = new Set(prev);
                  next.add(id);
                  return next;
                })
              }
              topTopicsState={topTopicsState}
              onTopTopicsStateChange={setTopTopicsState}
              onEditWatcher={onEditWatcher}
            />
          )}

          {tab === 'insights' && (
            <div className="space-y-3">
              {PATTERN_CARDS.map((card) => (
                <PatternCardView key={card.id} {...card} />
              ))}
            </div>
          )}

          {tab === 'handoffs' && <HandoffsEmpty />}
        </div>
      </div>
    </div>
  );
}
