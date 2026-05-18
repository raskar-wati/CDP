import React from 'react';
import { Message } from '../../types';

export function MessageBubble({ message }: { message: Message }) {
  const isAgent = message.sender === 'agent';
  return (
    <div className={`flex ${isAgent ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[70%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
          isAgent
            ? 'bg-[#23a455] text-white rounded-br-sm'
            : 'bg-white border border-gray-200 text-gray-800 rounded-bl-sm shadow-sm'
        }`}
      >
        <p>{message.text}</p>
        <p className={`text-[10px] mt-1 ${isAgent ? 'text-white/60' : 'text-gray-400'}`}>
          {message.timestamp}
        </p>
      </div>
    </div>
  );
}
