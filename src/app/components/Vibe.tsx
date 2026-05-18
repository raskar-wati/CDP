import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Users,
  Activity,
  TrendingUp,
  ChevronLeft,
  ArrowRight,
  Plus,
  PanelLeftOpen,
  PanelLeftClose,
  MessageSquare,
  Eye,
  Zap,
  Bell,
  LucideIcon,
} from 'lucide-react';
import { Sheet, SheetContent } from './ui/sheet';

// ── Data ────────────────────────────────────────────────────────────────────

interface Question {
  prompt: string;
  desc: string;
}

interface Cluster {
  id: string;
  title: string;
  subtitle: string;
  Icon: LucideIcon;
  questions: Question[];
}

const CLUSTERS: Cluster[] = [
  {
    id: 'customer',
    title: 'Customer insights',
    subtitle: 'Surface patterns about your customers',
    Icon: Users,
    questions: [
      {
        prompt: 'Who are my highest-value customers this month?',
        desc: 'Surface top spenders and engagement patterns',
      },
      {
        prompt: 'Which contacts are most likely to churn?',
        desc: 'Identify drop-off signals before they leave',
      },
      {
        prompt: 'What do customers ask about most?',
        desc: 'Summarise the top recurring questions',
      },
    ],
  },
  {
    id: 'team',
    title: 'Team performance',
    subtitle: 'Understand workload and coverage',
    Icon: Activity,
    questions: [
      {
        prompt: 'Why did response times drop this week?',
        desc: 'Pinpoint gaps in coverage or volume spikes',
      },
      {
        prompt: 'Which agent closes the most conversations?',
        desc: 'Compare resolution rates across the team',
      },
      {
        prompt: 'Show me conversations that took longer than 2 hours',
        desc: 'Spot outliers in handling time',
      },
    ],
  },
  {
    id: 'sales',
    title: 'Sales & conversion',
    subtitle: 'Track pipeline health',
    Icon: TrendingUp,
    questions: [
      {
        prompt: 'Who is ready to buy right now?',
        desc: 'Find contacts with strong buying signals',
      },
      {
        prompt: 'How many negotiations closed this week?',
        desc: 'Track deal progress across the pipeline',
      },
      {
        prompt: 'What stopped people from converting?',
        desc: 'Understand drop-off reasons in the funnel',
      },
    ],
  },
];

// ── Previous chats (mock) ───────────────────────────────────────────────────

interface ChatHistoryItem {
  id: string;
  title: string;
  group: 'Today' | 'Yesterday' | 'Earlier';
}

const HISTORY: ChatHistoryItem[] = [
  { id: 'h1', title: "Who's ready to buy this week?", group: 'Today' },
  { id: 'h2', title: 'Response time drop on Saturday', group: 'Today' },
  { id: 'h3', title: 'Top customers this month', group: 'Yesterday' },
  { id: 'h4', title: 'Contacts at risk of churn', group: 'Yesterday' },
  { id: 'h5', title: 'What stopped people from converting?', group: 'Earlier' },
  { id: 'h6', title: 'Negotiation pipeline this quarter', group: 'Earlier' },
  { id: 'h7', title: 'Saturday agent coverage gap', group: 'Earlier' },
];

const HISTORY_GROUPS: Array<ChatHistoryItem['group']> = ['Today', 'Yesterday', 'Earlier'];

// ── Animated orb with eyes that look around ─────────────────────────────────

const ORB_STYLES = `
  @keyframes vibe-eyes-look {
    0%   { transform: translate(0, 0); }
    18%  { transform: translate(2.5px, -1.5px); }
    32%  { transform: translate(2.5px, -1.5px); }
    50%  { transform: translate(-2.5px, -1px); }
    64%  { transform: translate(-2.5px, -1px); }
    80%  { transform: translate(0, 1.5px); }
    100% { transform: translate(0, 0); }
  }
  @keyframes vibe-blink {
    0%, 92%, 100% { transform: scaleY(1); }
    95%, 98% { transform: scaleY(0.1); }
  }
  @keyframes vibe-glow {
    0%, 100% { opacity: 0.55; transform: scale(1); }
    50%      { opacity: 0.85; transform: scale(1.05); }
  }
  .vibe-eyes { animation: vibe-eyes-look 7s ease-in-out infinite; }
  .vibe-eye  { animation: vibe-blink 5.5s ease-in-out infinite; transform-origin: center; }
  .vibe-glow { animation: vibe-glow 4s ease-in-out infinite; }
`;

function Orb() {
  return (
    <div className="relative w-24 h-24 mx-auto">
      {/* soft outer glow */}
      <div className="vibe-glow absolute inset-0 rounded-full bg-gradient-to-br from-[#cfe1f8] via-[#e6eefb] to-white blur-xl" />
      {/* inner sphere */}
      <div className="absolute inset-2 rounded-full bg-gradient-to-br from-white via-[#f0f6ff] to-[#e2ecfb] border border-[#dde7f5] shadow-[inset_0_-6px_12px_rgba(180,200,230,0.25)]" />
      {/* eyes container — moves together as it looks around */}
      <div className="vibe-eyes absolute inset-0 flex items-center justify-center gap-2.5">
        <div className="vibe-eye w-1.5 h-1.5 rounded-full bg-gray-800" />
        <div
          className="vibe-eye w-1.5 h-1.5 rounded-full bg-gray-800"
          style={{ animationDelay: '0.15s' }}
        />
      </div>
    </div>
  );
}

// ── Cluster card (3-up grid) ────────────────────────────────────────────────

function ClusterCard({
  cluster,
  onClick,
}: {
  cluster: Cluster;
  onClick: () => void;
}) {
  const Icon = cluster.Icon;
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-start gap-2 p-3 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300 transition-colors text-left h-full"
    >
      <Icon className="w-4 h-4 text-gray-500 shrink-0" strokeWidth={1.75} />
      <div className="min-w-0">
        <p className="text-[13px] font-medium text-gray-900 leading-tight">
          {cluster.title}
        </p>
        <p className="text-[11px] text-gray-500 mt-1 leading-snug">
          {cluster.subtitle}
        </p>
      </div>
    </button>
  );
}

function QuestionRow({
  question,
  onClick,
}: {
  question: Question;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-start gap-3 px-3 py-2.5 rounded-md hover:bg-gray-50 transition-colors text-left group"
    >
      <ArrowRight
        className="w-3.5 h-3.5 mt-0.5 text-gray-300 group-hover:text-[#23a455] shrink-0 transition-colors"
        strokeWidth={2}
      />
      <div className="flex-1 min-w-0">
        <p className="text-[13px] text-gray-800 leading-snug">"{question.prompt}"</p>
        <p className="text-[11px] text-gray-400 mt-0.5 leading-snug">{question.desc}</p>
      </div>
    </button>
  );
}

// ── History rail (collapsible chat history on the left) ────────────────────

function HistoryRail({
  expanded,
  onToggle,
  onNewChat,
  onSelectChat,
  activeChatId,
}: {
  expanded: boolean;
  onToggle: () => void;
  onNewChat: () => void;
  onSelectChat: (item: ChatHistoryItem) => void;
  activeChatId: string | null;
}) {
  return (
    <aside
      className={`shrink-0 flex flex-col bg-[#fafaf9] border-r border-gray-100 transition-[width] duration-200 ease-out ${
        expanded ? 'w-[200px]' : 'w-[44px]'
      }`}
    >
      {/* Rail header — toggle + new chat */}
      <div className={`flex items-center shrink-0 ${expanded ? 'justify-between px-2.5 pt-2.5 pb-2' : 'flex-col gap-1 pt-2.5'}`}>
        <button
          onClick={onToggle}
          aria-label={expanded ? 'Collapse history' : 'Expand history'}
          title={expanded ? 'Collapse' : 'Expand history'}
          className="w-8 h-8 flex items-center justify-center rounded-md text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition-colors"
        >
          {expanded ? (
            <PanelLeftClose className="w-4 h-4" />
          ) : (
            <PanelLeftOpen className="w-4 h-4" />
          )}
        </button>
        <button
          onClick={onNewChat}
          aria-label="New chat"
          title="New chat"
          className="w-8 h-8 flex items-center justify-center rounded-md text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition-colors"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* History list */}
      <div className="flex-1 overflow-y-auto px-1.5 pb-3">
        {expanded ? (
          <div className="space-y-3">
            {HISTORY_GROUPS.map((group) => {
              const items = HISTORY.filter((h) => h.group === group);
              if (items.length === 0) return null;
              return (
                <div key={group}>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 px-2 mb-1">
                    {group}
                  </p>
                  <div className="flex flex-col">
                    {items.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => onSelectChat(item)}
                        className={`px-2 py-1.5 rounded-md text-xs leading-snug text-left truncate transition-colors ${
                          activeChatId === item.id
                            ? 'bg-gray-200 text-gray-900'
                            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
                        }`}
                      >
                        {item.title}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          // Collapsed: show only icon stubs (recent few)
          <div className="flex flex-col items-center gap-1 mt-1">
            {HISTORY.slice(0, 5).map((item) => (
              <button
                key={item.id}
                onClick={() => onSelectChat(item)}
                title={item.title}
                aria-label={item.title}
                className={`w-8 h-8 flex items-center justify-center rounded-md transition-colors ${
                  activeChatId === item.id
                    ? 'bg-gray-200 text-gray-800'
                    : 'text-gray-400 hover:text-gray-700 hover:bg-gray-100'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5" />
              </button>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
}

// ── Automation context view ─────────────────────────────────────────────────

export interface AutomationContext {
  filterName: string;
  trigger: string;
  action: string;
}

function AutomationActiveView({ context }: { context: AutomationContext }) {
  const steps: Array<{ Icon: LucideIcon; title: string; detail: string }> = [
    {
      Icon: Eye,
      title: 'Watch',
      detail: context.trigger,
    },
    {
      Icon: Zap,
      title: 'Respond automatically',
      detail: context.action,
    },
    {
      Icon: Bell,
      title: 'Notify you',
      detail: "You'll see each handled conversation in Pulse so you can review or pause anytime.",
    },
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-200">
      {/* Active badge */}
      <div className="flex items-center gap-2 mb-4">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#e8f5ee] text-[#1d8242] text-xs font-medium border border-[#c6e9d3]">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-[#23a455] opacity-75 animate-ping" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#23a455]" />
          </span>
          Active
        </span>
        <span className="text-xs text-gray-500">just now</span>
      </div>

      <h3 className="text-sm font-semibold text-gray-900 leading-snug">
        I'll handle "{context.filterName}" conversations from now on
      </h3>
      <p className="text-xs text-gray-500 mt-1 leading-relaxed">
        Here's how Vibe will run this automation.
      </p>

      {/* Steps */}
      <ol className="mt-5 space-y-3">
        {steps.map((step, i) => {
          const Icon = step.Icon;
          return (
            <li
              key={i}
              className="flex items-start gap-3 rounded-lg border border-gray-200 bg-white px-3.5 py-3"
            >
              <div className="w-7 h-7 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center shrink-0">
                <Icon className="w-3.5 h-3.5 text-gray-600" strokeWidth={1.75} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-medium text-gray-900 leading-tight">
                  {i + 1}. {step.title}
                </p>
                <p className="text-xs text-gray-500 mt-1 leading-snug">{step.detail}</p>
              </div>
            </li>
          );
        })}
      </ol>

      <p className="mt-5 text-[11px] text-gray-400 leading-relaxed">
        You can pause or edit this automation anytime from Pulse.
      </p>
    </div>
  );
}

// ── Edit-watcher context view ──────────────────────────────────────────────

export interface EditWatcherContext {
  id: string;
  name: string;
  prompt: string;
}

function EditWatcherView({
  context,
  onCancel,
}: {
  context: EditWatcherContext;
  onCancel: () => void;
}) {
  const [draft, setDraft] = useState(context.prompt);

  // Reset the draft whenever a different watcher is opened.
  useEffect(() => {
    setDraft(context.prompt);
  }, [context.id, context.prompt]);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-200">
      <p className="text-[11px] uppercase tracking-wider text-gray-500 mb-2">
        Edit watcher
      </p>
      <h3 className="text-sm font-semibold text-gray-900 mb-4">
        {context.name}
      </h3>
      <textarea
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        rows={7}
        className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-gray-300 transition-colors resize-y leading-relaxed"
      />
      <p className="text-[11px] text-gray-400 mt-2 leading-relaxed">
        Describe what you want this watcher to do in plain language.
      </p>
      <div className="flex items-center gap-3 mt-5">
        <button
          onClick={onCancel}
          className="px-3.5 py-2 bg-[#23a455] text-white text-sm font-medium rounded-md hover:bg-[#1d8f47] transition-colors"
        >
          Save changes
        </button>
        <button
          onClick={onCancel}
          className="text-sm text-gray-500 hover:text-gray-800 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

// ── Main panel ──────────────────────────────────────────────────────────────

interface VibeProps {
  isOpen: boolean;
  onClose: () => void;
  automationContext?: AutomationContext | null;
  onClearAutomationContext?: () => void;
  editWatcherContext?: EditWatcherContext | null;
  onClearEditWatcherContext?: () => void;
}

export function Vibe({
  isOpen,
  onClose,
  automationContext = null,
  onClearAutomationContext,
  editWatcherContext = null,
  onClearEditWatcherContext,
}: VibeProps) {
  const [query, setQuery] = useState('');
  const [activeCluster, setActiveCluster] = useState<Cluster | null>(null);
  const [isThinking, setIsThinking] = useState(false);
  const [answer, setAnswer] = useState<string | null>(null);
  const [isHistoryExpanded, setIsHistoryExpanded] = useState(false);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleNewChat = () => {
    setQuery('');
    setAnswer(null);
    setActiveCluster(null);
    setActiveChatId(null);
    onClearAutomationContext?.();
    onClearEditWatcherContext?.();
    inputRef.current?.focus();
  };

  const handleSelectChat = (item: ChatHistoryItem) => {
    setActiveChatId(item.id);
    setQuery(item.title);
    setAnswer(null);
    setActiveCluster(null);
    inputRef.current?.focus();
  };

  // Autofocus input when opened
  useEffect(() => {
    if (isOpen) {
      const t = setTimeout(() => inputRef.current?.focus(), 80);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  // Esc — close the popover first, then close the panel on second press
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeCluster) {
        e.preventDefault();
        e.stopPropagation();
        setActiveCluster(null);
      }
    };
    window.addEventListener('keydown', handler, true);
    return () => window.removeEventListener('keydown', handler, true);
  }, [isOpen, activeCluster]);

  const handleSubmit = () => {
    if (!query.trim()) return;
    setIsThinking(true);
    setAnswer(null);
    setActiveCluster(null);
    setTimeout(() => {
      setIsThinking(false);
      setAnswer(
        'Vibe is thinking — this is a prototype answer. Real query handling lands in the next iteration.'
      );
    }, 1000);
  };

  const selectQuestion = (q: string) => {
    setQuery(q);
    setActiveCluster(null);
    inputRef.current?.focus();
  };

  return (
    <Sheet open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
      <SheetContent
        side="right"
        className={`flex flex-row p-0 w-full transition-[max-width] duration-200 ease-out ${
          isHistoryExpanded ? 'sm:max-w-[680px]' : 'sm:max-w-[524px]'
        }`}
      >
        <style>{ORB_STYLES}</style>

        {/* Left rail — history */}
        <HistoryRail
          expanded={isHistoryExpanded}
          onToggle={() => setIsHistoryExpanded((v) => !v)}
          onNewChat={handleNewChat}
          onSelectChat={handleSelectChat}
          activeChatId={activeChatId}
        />

        {/* Main column */}
        <div className="flex-1 min-w-0 flex flex-col">
          {/* Orb area — centred in the top region of the panel */}
          <div className={`shrink-0 flex flex-col items-center ${automationContext || editWatcherContext ? 'px-5 pt-6 pb-3' : 'px-5 pt-10 pb-6'}`}>
            <div className={automationContext || editWatcherContext ? 'scale-75 origin-top' : ''}>
              <Orb />
            </div>
            <h2 className="text-base font-medium text-gray-800 mt-5">Vibe</h2>
            <p className="text-xs text-gray-500 mt-1">
              {automationContext
                ? 'Automation set up — running now'
                : editWatcherContext
                ? 'Edit watcher prompt'
                : 'Ask anything about your customers'}
            </p>
          </div>

          {/* Body — automation view OR edit-watcher view OR cards / popover / answer */}
          <div className="flex-1 overflow-y-auto px-5 pb-4 relative">
            {automationContext ? (
              <AutomationActiveView context={automationContext} />
            ) : editWatcherContext ? (
              <EditWatcherView
                context={editWatcherContext}
                onCancel={() => {
                  onClearEditWatcherContext?.();
                  onClose();
                }}
              />
            ) : (
            <>
            {/* Thinking / answer state */}
            {isThinking && (
              <div className="rounded-lg border border-gray-200 bg-white px-4 py-3 mb-3">
                <p className="text-sm text-gray-500">Vibe is thinking…</p>
              </div>
            )}
            {!isThinking && answer && (
              <div className="rounded-lg border border-gray-200 bg-white px-4 py-3 mb-3">
                <p className="text-sm text-gray-800 leading-snug">{answer}</p>
              </div>
            )}

            {/* 3-card cluster row */}
            <div className="grid grid-cols-3 gap-2">
              {CLUSTERS.map((c) => (
                <ClusterCard
                  key={c.id}
                  cluster={c}
                  onClick={() => setActiveCluster(c)}
                />
              ))}
            </div>

            {/* Popover — pops out above the cards when a cluster is selected */}
            {activeCluster && (
              <>
                <div
                  className="absolute inset-0 bg-white/60 backdrop-blur-[1px] animate-in fade-in duration-150"
                  onClick={() => setActiveCluster(null)}
                />
                <div
                  key={activeCluster.id}
                  className="absolute left-5 right-5 bottom-2 origin-bottom rounded-xl border border-gray-200 bg-white shadow-lg p-2 animate-in zoom-in-95 fade-in slide-in-from-bottom-2 duration-200"
                >
                  <div className="flex items-center justify-between px-2 py-1.5">
                    <button
                      onClick={() => setActiveCluster(null)}
                      className="inline-flex items-center gap-1 text-xs text-gray-500 hover:text-gray-800 transition-colors"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                      {activeCluster.title}
                    </button>
                  </div>
                  <div className="flex flex-col">
                    {activeCluster.questions.map((q) => (
                      <QuestionRow
                        key={q.prompt}
                        question={q}
                        onClick={() => selectQuestion(q.prompt)}
                      />
                    ))}
                  </div>
                </div>
              </>
            )}
            </>
            )}
          </div>

          {/* Input pinned to the bottom */}
          <div className="px-5 pt-3 pb-2 shrink-0 border-t border-gray-100 bg-white">
            <div className="relative">
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') handleSubmit(); }}
                placeholder="Try 'why did response times drop?' or 'who's ready to buy?'"
                className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 pr-11 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-gray-300 transition-colors"
              />
              <button
                onClick={handleSubmit}
                disabled={!query.trim()}
                aria-label="Submit"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center rounded-md text-[#23a455] hover:bg-[#ebf7f0] disabled:text-gray-300 disabled:hover:bg-transparent transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Esc hint */}
          <div className="px-5 pb-3 shrink-0 bg-white">
            <p className="text-[11px] text-gray-400">
              Press{' '}
              <kbd className="font-mono text-[10px] text-gray-500 bg-gray-100 border border-gray-200 rounded px-1.5 py-0.5">
                Esc
              </kbd>{' '}
              to close
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
