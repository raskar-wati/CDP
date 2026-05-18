import React from 'react';
import { X, Phone, Globe, Tag } from 'lucide-react';
import { useInbox } from '../../store/InboxContext';

interface Props {
  onClose: () => void;
}

export function ContactPanel({ onClose }: Props) {
  const { selectedChat } = useInbox();

  const fields = [
    { label: 'Phone',    value: '+1 (555) 000-0000', icon: Phone  },
    { label: 'Channel',  value: selectedChat.channel, icon: Globe  },
    { label: 'Category', value: selectedChat.category, icon: Tag   },
  ];

  return (
    <aside className="w-72 h-full bg-white border-l border-gray-200 flex flex-col shrink-0">
      {/* Header */}
      <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between shrink-0">
        <h3 className="text-sm font-semibold text-gray-800">Contact info</h3>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Avatar + name */}
      <div className="px-5 py-5 border-b border-gray-100 flex flex-col items-center gap-2 shrink-0">
        <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center text-lg font-semibold text-gray-600">
          {selectedChat.avatar}
        </div>
        <p className="text-sm font-semibold text-gray-900">{selectedChat.name}</p>
        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${selectedChat.isOnline ? 'bg-[#ebf7f0] text-[#1d8242]' : 'bg-gray-100 text-gray-500'}`}>
          {selectedChat.isOnline ? 'Online' : 'Offline'}
        </span>
      </div>

      {/* Fields */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
        {fields.map(({ label, value, icon: Icon }) => (
          <div key={label}>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-1">{label}</p>
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <Icon className="w-3.5 h-3.5 text-gray-400 shrink-0" />
              <span>{value}</span>
            </div>
          </div>
        ))}

        {/* Attributes */}
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-2">Attributes</p>
          <div className="space-y-2">
            {[
              { key: 'Last seen', value: selectedChat.timestamp },
              { key: 'Status', value: selectedChat.status },
              { key: 'Source', value: 'Website' },
            ].map(({ key, value }) => (
              <div key={key} className="flex justify-between text-xs">
                <span className="text-gray-400">{key}</span>
                <span className="text-gray-700 font-medium">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
