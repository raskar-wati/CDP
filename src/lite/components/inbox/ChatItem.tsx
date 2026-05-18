import React from 'react';
import { Chat } from '../../types';

interface Props {
  chat: Chat;
  isSelected: boolean;
  onClick: () => void;
}

const CHANNEL_COLORS: Record<string, string> = {
  WhatsApp:  'bg-green-100 text-green-700',
  Instagram: 'bg-pink-100 text-pink-700',
  Messenger: 'bg-blue-100 text-blue-700',
  SMS:       'bg-yellow-100 text-yellow-700',
  RCS:       'bg-purple-100 text-purple-700',
  Broadcast: 'bg-gray-100 text-gray-600',
};

export function ChatItem({ chat, isSelected, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-start gap-3 px-4 py-3 text-left transition-colors border-b border-gray-100 ${
        isSelected ? 'bg-[#ebf7f0]' : 'hover:bg-gray-50'
      }`}
    >
      {/* Avatar */}
      <div className="relative shrink-0">
        <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-xs font-semibold text-gray-600">
          {chat.avatar}
        </div>
        {chat.isOnline && (
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#23a455] border-2 border-white rounded-full" />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-1 mb-0.5">
          <span className={`text-sm truncate ${chat.unread ? 'font-semibold text-gray-900' : 'font-medium text-gray-700'}`}>
            {chat.name}
          </span>
          <span className="text-[11px] text-gray-400 shrink-0">{chat.timestamp}</span>
        </div>
        <p className="text-xs text-gray-500 truncate leading-relaxed">{chat.lastMessage}</p>
        <div className="flex items-center gap-1.5 mt-1">
          <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${CHANNEL_COLORS[chat.channel] ?? 'bg-gray-100 text-gray-600'}`}>
            {chat.channel}
          </span>
          {chat.status === 'Solved' && (
            <span className="text-[10px] px-1.5 py-0.5 rounded font-medium bg-gray-100 text-gray-500">Solved</span>
          )}
          {chat.unread && (
            <span className="ml-auto w-2 h-2 rounded-full bg-[#23a455] shrink-0" />
          )}
        </div>
      </div>
    </button>
  );
}
