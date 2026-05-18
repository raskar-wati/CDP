import React, { useEffect, useRef, useState } from 'react';
import { PanelRightOpen, PanelRightClose } from 'lucide-react';
import { useInbox } from '../../store/InboxContext';
import { getMessages } from '../../data/messages';
import { MessageBubble } from './MessageBubble';
import { ReplyBar } from './ReplyBar';

interface Props {
  isContactVisible: boolean;
  onToggleContact: () => void;
}

const STATUS_COLORS: Record<string, string> = {
  Open:      'bg-[#ebf7f0] text-[#1d8242]',
  Solved:    'bg-gray-100 text-gray-500',
  Broadcast: 'bg-blue-50 text-blue-600',
};

export function ChatWindow({ isContactVisible, onToggleContact }: Props) {
  const { selectedChat, messages } = useInbox();
  const chatMessages = messages[selectedChat.id] ?? getMessages(selectedChat.id);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages.length, selectedChat.id]);

  return (
    <div className="flex flex-col h-full flex-1 min-w-0">
      {/* Header */}
      <div className="px-5 py-3 border-b border-gray-200 bg-white flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-xs font-semibold text-gray-600 shrink-0">
            {selectedChat.avatar}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-gray-900 truncate">{selectedChat.name}</p>
            <p className="text-xs text-gray-400">{selectedChat.channel}</p>
          </div>
          <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium shrink-0 ${STATUS_COLORS[selectedChat.status] ?? 'bg-gray-100 text-gray-500'}`}>
            {selectedChat.status}
          </span>
        </div>
        <button onClick={onToggleContact} className="text-gray-400 hover:text-gray-600 transition-colors shrink-0">
          {isContactVisible ? <PanelRightClose className="w-5 h-5" /> : <PanelRightOpen className="w-5 h-5" />}
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-5 py-4 bg-gray-50 space-y-3">
        {chatMessages.map(msg => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Reply */}
      <ReplyBar />
    </div>
  );
}
