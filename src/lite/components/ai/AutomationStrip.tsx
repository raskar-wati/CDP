import React, { useState, useEffect, useCallback, useRef } from 'react';
import { X } from 'lucide-react';

const SIGNAL_FILTERS = ['Evaluating', 'Negotiating', 'Awaiting Reply', 'Escalated', 'Ready to buy', 'Drop off risk'];
const DISMISSED_KEY = 'wati_lite_dismissed_filters';
const THRESHOLD_VOLUME = 5;
const THRESHOLD_HANDLED = 2;

const DESCRIPTIONS: Record<string, string> = {
  'Escalated':     'Send an immediate acknowledgment, flag the conversation for a senior agent, and notify the team.',
  'Ready to buy':  'Send a personalised closing message with product details and a direct call-to-action.',
  'Drop off risk': 'Send a re-engagement message with a limited-time offer to bring them back.',
  'Negotiating':   'Send a follow-up with updated pricing options and a soft deadline.',
  'Evaluating':    'Send helpful product comparison information and invite them to a demo.',
  'Awaiting Reply':'Send a gentle follow-up after 24 hours of no customer response.',
};

const TRIGGERS: Record<string, string> = {
  'Escalated':     'Immediately when a conversation is marked Escalated',
  'Ready to buy':  'When a conversation has been in "Ready to buy" for more than 2 hours',
  'Drop off risk': 'When a conversation enters "Drop off risk" with no reply in 12 hours',
  'Negotiating':   'After 24 hours in "Negotiating" with no price agreement reached',
  'Evaluating':    'After 48 hours in "Evaluating" with no demo booked',
  'Awaiting Reply':'After 24 hours with no customer response',
};

interface Props {
  filterName: string;
  totalCount: number;
  handledCount: number;
  isSmartModeActive: boolean;
}

export function AutomationStrip({ filterName, totalCount, handledCount, isSmartModeActive }: Props) {
  const [dismissed, setDismissed] = useState<Set<string>>(() => {
    try { return new Set(JSON.parse(localStorage.getItem(DISMISSED_KEY) ?? '[]')); } catch { return new Set(); }
  });
  const [isDismissing, setIsDismissing] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editDesc, setEditDesc] = useState('');
  const [editTrigger, setEditTrigger] = useState('');
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isSignal = SIGNAL_FILTERS.includes(filterName);
  const meetsThreshold = totalCount >= THRESHOLD_VOLUME && handledCount >= THRESHOLD_HANDLED;
  const shouldShow = isSmartModeActive && isSignal && meetsThreshold && !dismissed.has(filterName);

  useEffect(() => {
    setIsDismissing(false); setIsRemoved(false); setIsConfirmed(false);
    setIsDrawerOpen(false);
    setEditDesc(DESCRIPTIONS[filterName] ?? '');
    setEditTrigger(TRIGGERS[filterName] ?? '');
    if (timerRef.current) clearTimeout(timerRef.current);
  }, [filterName]);

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  const dismiss = useCallback((save = true) => {
    setIsDismissing(true);
    if (save) {
      const next = new Set(dismissed); next.add(filterName);
      setDismissed(next);
      try { localStorage.setItem(DISMISSED_KEY, JSON.stringify([...next])); } catch {}
    }
    setTimeout(() => setIsRemoved(true), 320);
  }, [dismissed, filterName]);

  const confirmSetup = useCallback(() => {
    setIsConfirmed(true);
    timerRef.current = setTimeout(() => dismiss(true), 4000);
  }, [dismiss]);

  if (!shouldShow || isRemoved) return null;

  const label = filterName.toLowerCase();

  return (
    <>
      <div className={`mx-3 transition-all duration-300 ease-in-out overflow-hidden ${isDismissing ? 'max-h-0 opacity-0 my-0' : 'max-h-56 opacity-100 my-2'}`}>
        <div className="relative bg-[#FAFAF9] border border-gray-200 rounded-lg px-4 py-3 shadow-sm">
          <button onClick={() => dismiss(true)} className="absolute top-2.5 right-2.5 text-gray-400 hover:text-gray-600">
            <X className="w-3.5 h-3.5" />
          </button>
          {!isConfirmed ? (
            <>
              <p className="text-sm text-gray-800 pr-5 leading-snug">
                You've handled <strong>{handledCount}</strong> of <strong>{totalCount}</strong> {label} conversations this week.
              </p>
              <p className="text-sm text-gray-500 mt-0.5">Want me to handle the next one automatically?</p>
              <div className="flex items-center gap-2 mt-3">
                <button onClick={confirmSetup} className="px-3 py-1.5 bg-[#23a455] text-white text-xs rounded-md hover:bg-[#1d8f47]">One-click set up</button>
                <button onClick={() => setIsDrawerOpen(true)} className="px-3 py-1.5 border border-gray-300 text-xs text-gray-600 rounded-md hover:bg-gray-50">Show me how it works</button>
              </div>
            </>
          ) : (
            <p className="text-sm text-gray-700 pr-5">
              Got it. I'll handle {label} conversations from now on. Review in{' '}
              <button className="text-[#23a455] underline underline-offset-2">Insights</button>.
            </p>
          )}
        </div>
      </div>

      {isDrawerOpen && (
        <>
          <div className="fixed inset-0 z-40 bg-black/20" onClick={() => setIsDrawerOpen(false)} />
          <div className="fixed top-0 right-0 h-full w-[400px] max-w-[90vw] z-50 bg-white border-l border-gray-200 shadow-xl flex flex-col">
            <div className="px-6 py-5 border-b border-gray-100 flex items-start justify-between">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Signal</p>
                <h3 className="text-base font-medium text-gray-900">{filterName}</h3>
              </div>
              <button onClick={() => setIsDrawerOpen(false)} className="text-gray-400 hover:text-gray-600 mt-0.5"><X className="w-4 h-4" /></button>
            </div>
            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
              <div>
                <label className="text-xs text-gray-500 font-medium uppercase tracking-wide block mb-2">What it will do</label>
                <textarea value={editDesc} onChange={e => setEditDesc(e.target.value)} rows={3} className="w-full text-sm text-gray-800 border border-gray-200 rounded-md px-3 py-2 resize-none focus:outline-none focus:ring-1 focus:ring-[#23a455] focus:border-[#23a455]" />
              </div>
              <div>
                <label className="text-xs text-gray-500 font-medium uppercase tracking-wide block mb-2">When it triggers</label>
                <input type="text" value={editTrigger} onChange={e => setEditTrigger(e.target.value)} className="w-full text-sm text-gray-800 border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#23a455] focus:border-[#23a455]" />
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-100 flex items-center gap-4">
              <button onClick={() => { setIsDrawerOpen(false); confirmSetup(); }} className="px-4 py-2 bg-[#23a455] text-white text-sm rounded-md hover:bg-[#1d8f47]">Save</button>
              <button onClick={() => setIsDrawerOpen(false)} className="text-sm text-gray-500 hover:text-gray-700">Cancel</button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
