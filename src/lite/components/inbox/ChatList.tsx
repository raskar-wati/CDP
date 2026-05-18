import React from 'react';
import { useInbox } from '../../store/InboxContext';
import { ChatItem } from './ChatItem';
import { NaturalFilter } from '../ai/NaturalFilter';
import { AutomationStrip } from '../ai/AutomationStrip';

export function ChatList() {
  const {
    filteredChats, selectedChat, selectChat,
    isSmartModeActive, activeSmartFilter,
  } = useInbox();

  const stripFilter = activeSmartFilter?.name ?? '';
  const totalCount = activeSmartFilter?.count ?? 0;

  return (
    <div className="flex flex-col h-full border-r border-gray-200 bg-white" style={{ width: 300 }}>
      {/* Natural language filter */}
      <NaturalFilter />

      {/* Automation suggestion strip */}
      <AutomationStrip
        filterName={stripFilter}
        totalCount={totalCount}
        handledCount={Math.floor(totalCount * 0.4)}
        isSmartModeActive={isSmartModeActive}
      />

      {/* Chat rows */}
      <div className="flex-1 overflow-y-auto">
        {filteredChats.length === 0 ? (
          <p className="px-4 py-8 text-sm text-gray-400 text-center">No conversations match this filter.</p>
        ) : (
          filteredChats.map(chat => (
            <ChatItem
              key={chat.id}
              chat={chat}
              isSelected={selectedChat.id === chat.id}
              onClick={() => selectChat(chat)}
            />
          ))
        )}
      </div>

      {/* Footer count */}
      <div className="px-4 py-2 border-t border-gray-100 shrink-0">
        <p className="text-[11px] text-gray-400">{filteredChats.length} conversations</p>
      </div>
    </div>
  );
}
