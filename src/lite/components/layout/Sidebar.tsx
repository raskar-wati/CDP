import React from 'react';
import { Inbox, MessageSquare, Instagram, Send, Phone, Zap, Sparkles } from 'lucide-react';
import { useInbox } from '../../store/InboxContext';
import { SmartFilter } from '../../types';

const FILTERS = [
  'All Chats', 'Active Chats', 'Unread', 'Assigned to me', 'Unassigned', 'Favourites',
  null, // divider
  'Sales', 'Support', 'Broadcasts', 'Expiring Soon',
];

const CHANNELS = ['All Channels', 'WhatsApp', 'Instagram', 'Messenger', 'SMS', 'RCS'];

function ChannelIcon({ channel }: { channel: string }) {
  const cls = 'w-4 h-4 shrink-0';
  if (channel === 'All Channels') return <Inbox className={cls} />;
  if (channel === 'WhatsApp')    return <Phone className={cls} />;
  if (channel === 'Instagram')   return <Instagram className={cls} />;
  if (channel === 'Messenger')   return <Send className={cls} />;
  if (channel === 'SMS')         return <MessageSquare className={cls} />;
  if (channel === 'RCS')         return <MessageSquare className={cls} />;
  return null;
}

export function Sidebar() {
  const {
    activeFilter, setFilter,
    activeChannel, setChannel,
    channelCounts,
    isSmartModeActive, toggleSmartMode,
    smartFilters, activeSmartFilter, setActiveSmartFilter,
  } = useInbox();

  return (
    <aside className="w-52 h-full bg-white border-r border-gray-200 flex flex-col overflow-y-auto shrink-0">
      {/* Smart mode toggle */}
      <div className="px-3 py-3 border-b border-gray-100">
        <button
          onClick={toggleSmartMode}
          className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
            isSmartModeActive
              ? 'bg-[#ebf7f0] text-[#23a455]'
              : 'text-gray-500 hover:bg-gray-100'
          }`}
        >
          <Sparkles className="w-4 h-4 shrink-0" />
          Smart Mode
        </button>
      </div>

      {/* Smart filters */}
      {isSmartModeActive && smartFilters.length > 0 && (
        <div className="px-2 py-2 border-b border-gray-100">
          <p className="px-2 text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-1">AI Signals</p>
          {smartFilters.map((sf: SmartFilter) => (
            <button
              key={sf.id}
              onClick={() => setActiveSmartFilter(activeSmartFilter?.id === sf.id ? null : sf)}
              className={`w-full flex items-center justify-between px-2 py-1.5 rounded-md text-sm transition-colors ${
                activeSmartFilter?.id === sf.id ? 'bg-[#ebf7f0] text-[#1d8242] font-medium' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <span className="flex items-center gap-1.5 truncate">
                <span className="text-xs">{sf.icon}</span>
                <span className="truncate">{sf.name}</span>
              </span>
              <span className="text-xs text-gray-400 shrink-0 ml-1">{sf.count}</span>
            </button>
          ))}
        </div>
      )}

      {/* Channels */}
      <div className="px-2 py-2 border-b border-gray-100">
        <p className="px-2 text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-1">Channels</p>
        {CHANNELS.map(ch => (
          <button
            key={ch}
            onClick={() => setChannel(ch)}
            className={`w-full flex items-center justify-between px-2 py-1.5 rounded-md text-sm transition-colors ${
              activeChannel === ch ? 'bg-[#ebf7f0] text-[#1d8242] font-medium' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <span className="flex items-center gap-2 truncate">
              <ChannelIcon channel={ch} />
              <span className="truncate">{ch}</span>
            </span>
            <span className="text-xs text-gray-400 shrink-0 ml-1">{channelCounts[ch] ?? ''}</span>
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="px-2 py-2">
        <p className="px-2 text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-1">Filters</p>
        {FILTERS.map((f, i) =>
          f === null
            ? <div key={i} className="my-1 mx-2 border-t border-gray-100" />
            : (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-sm transition-colors text-left ${
                  activeFilter === f && !isSmartModeActive ? 'bg-[#ebf7f0] text-[#1d8242] font-medium' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Zap className="w-3.5 h-3.5 shrink-0 opacity-40" />
                {f}
              </button>
            )
        )}
      </div>
    </aside>
  );
}
