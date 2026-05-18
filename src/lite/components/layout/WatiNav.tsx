import React from 'react';
import { Inbox, Sparkles, Users, Settings } from 'lucide-react';
import { useInbox } from '../../store/InboxContext';
import { View } from '../../types';

const NAV_ITEMS: { icon: React.ElementType; view: View | null; label: string }[] = [
  { icon: Inbox,    view: 'inbox', label: 'Inbox'    },
  { icon: Sparkles, view: 'pulse', label: 'Pulse'    },
  { icon: Users,    view: null,    label: 'Contacts' },
  { icon: Settings, view: null,    label: 'Settings' },
];

export function WatiNav() {
  const { activeView, setActiveView } = useInbox();

  return (
    <nav className="w-14 h-full bg-white border-r border-gray-200 flex flex-col items-center py-4 gap-1 shrink-0">
      {/* Logo mark */}
      <div className="w-8 h-8 rounded-lg bg-[#23a455] flex items-center justify-center mb-4 shrink-0">
        <span className="text-white font-bold text-xs">W</span>
      </div>

      {NAV_ITEMS.map(({ icon: Icon, view, label }) => {
        const isActive = view !== null && activeView === view;
        return (
          <button
            key={label}
            onClick={() => view && setActiveView(view)}
            title={label}
            className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
              isActive
                ? 'bg-[#ebf7f0] text-[#23a455]'
                : 'text-gray-400 hover:bg-gray-100 hover:text-gray-600'
            }`}
          >
            <Icon className="w-5 h-5" />
          </button>
        );
      })}
    </nav>
  );
}
