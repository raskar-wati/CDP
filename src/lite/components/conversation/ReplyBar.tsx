import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { useInbox } from '../../store/InboxContext';

export function ReplyBar() {
  const { sendMessage } = useInbox();
  const [text, setText] = useState('');

  const submit = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    sendMessage(trimmed);
    setText('');
  };

  return (
    <div className="px-4 py-3 border-t border-gray-200 bg-white shrink-0">
      <div className="flex items-end gap-3">
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); submit(); } }}
          placeholder="Type a message…"
          rows={1}
          className="flex-1 resize-none text-sm text-gray-800 border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-[#23a455] placeholder:text-gray-400 leading-relaxed"
          style={{ maxHeight: 120 }}
        />
        <button
          onClick={submit}
          disabled={!text.trim()}
          className="w-9 h-9 rounded-full bg-[#23a455] text-white flex items-center justify-center shrink-0 hover:bg-[#1d8f47] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
