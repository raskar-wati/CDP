import React, { useState, useEffect } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from './ui/sheet';
import { Switch } from './ui/switch';

const SIGNAL_GROUPS: Array<{ label: string; signals: string[] }> = [
  {
    label: 'Needs Action',
    signals: ['Escalated', 'Awaiting Reply'],
  },
  {
    label: 'Journey Stage',
    signals: ['New inquiry', 'Interested', 'Evaluating', 'Negotiating', 'Ready to buy', 'Converted', 'Churned'],
  },
  {
    label: 'At Risk',
    signals: ['Drop off risk', 'Dormant'],
  },
  {
    label: 'Unclassified',
    signals: ['Uncategorised'],
  },
];

interface SignalPreferencesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  hiddenSignals: Set<string>;
  onSave: (hidden: Set<string>) => void;
}

export function SignalPreferencesDrawer({
  isOpen,
  onClose,
  hiddenSignals,
  onSave,
}: SignalPreferencesDrawerProps) {
  const [draft, setDraft] = useState<Set<string>>(new Set(hiddenSignals));

  // Reset draft to committed state each time the drawer opens
  useEffect(() => {
    if (isOpen) setDraft(new Set(hiddenSignals));
  }, [isOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  const toggle = (signal: string) => {
    setDraft(prev => {
      const next = new Set(prev);
      if (next.has(signal)) next.delete(signal);
      else next.add(signal);
      return next;
    });
  };

  const handleSave = () => {
    onSave(draft);
    onClose();
  };

  return (
    <Sheet open={isOpen} onOpenChange={open => { if (!open) onClose(); }}>
      <SheetContent side="right" className="flex flex-col p-0 sm:max-w-sm">
        <SheetHeader className="px-5 pt-5 pb-4 border-b border-gray-100 gap-1">
          <SheetTitle className="text-base font-semibold text-gray-900 leading-tight">
            Signal preferences
          </SheetTitle>
          <SheetDescription className="text-xs text-gray-500 leading-relaxed">
            Hide signals that aren't relevant to your business. You can re-enable them anytime.
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">
          {SIGNAL_GROUPS.map(({ label, signals }) => (
            <div key={label}>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-2">
                {label}
              </p>
              <div className="divide-y divide-gray-50">
                {signals.map(signal => (
                  <div key={signal} className="flex items-center justify-between py-2.5">
                    <span className="text-sm text-gray-700">{signal}</span>
                    <Switch
                      checked={!draft.has(signal)}
                      onCheckedChange={() => toggle(signal)}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <SheetFooter className="px-5 py-4 border-t border-gray-100 flex-row items-center justify-between gap-0">
          <button
            onClick={onClose}
            className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-[#23a455] text-white text-sm font-medium rounded-md hover:bg-[#1d8f47] transition-colors"
          >
            Save
          </button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
