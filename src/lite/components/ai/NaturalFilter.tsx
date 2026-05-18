import React, { useState } from 'react';
import { Sparkles, ChevronDown } from 'lucide-react';
import { ParsedFilter } from '../../types';
import { useInbox } from '../../store/InboxContext';

const EXAMPLES = [
  'show unread WhatsApp messages',
  'find solved Instagram chats',
  "show today's conversations",
  'active support chats',
];

function parse(input: string): ParsedFilter {
  const s = input.toLowerCase();
  const result: ParsedFilter = {};

  if (s.includes('whatsapp') || s.includes('wa'))           result.channel = 'WhatsApp';
  else if (s.includes('instagram') || s.includes('ig'))     result.channel = 'Instagram';
  else if (s.includes('messenger') || s.includes('facebook')) result.channel = 'Messenger';
  else if (s.includes('sms') || s.includes('text'))         result.channel = 'SMS';
  else if (s.includes('rcs'))                               result.channel = 'RCS';

  if (s.includes('unread') || s.includes('new'))            result.filter = 'Unread';
  else if (s.includes('solved') || s.includes('resolved'))  result.filter = 'Solved';
  else if (s.includes('open') || s.includes('active'))      result.filter = 'Active Chats';
  else if (s.includes('unassigned'))                        result.filter = 'Unassigned';
  else if (s.includes('support'))                           result.filter = 'Support';
  else if (s.includes('sales'))                             result.filter = 'Sales';
  else if (s.includes('broadcast'))                         result.filter = 'Broadcasts';

  return result;
}

export function NaturalFilter() {
  const { applyNaturalFilter } = useInbox();
  const [query, setQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const run = async (q = query) => {
    if (!q.trim()) return;
    setIsProcessing(true);
    await new Promise(r => setTimeout(r, 400));
    applyNaturalFilter(parse(q));
    setIsProcessing(false);
  };

  return (
    <div className="border-b border-gray-200 bg-[#EDF1FA]">
      <button onClick={() => setIsExpanded(v => !v)} className="w-full px-3 py-2.5 flex items-center justify-between hover:bg-white/20 transition-colors">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#173DA6]" />
          <span className="text-sm font-medium text-[#091840]">Smart Filter</span>
        </div>
        <ChevronDown className={`w-4 h-4 text-[#173DA6] transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
      </button>

      <div className={`overflow-hidden transition-all duration-300 ${isExpanded ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-3 pb-3 space-y-2">
          <div className="flex gap-2">
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && run()}
              placeholder="Try: 'show unread WhatsApp messages'"
              className="flex-1 text-sm px-3 py-1.5 border border-gray-300 rounded-md bg-white focus:outline-none focus:border-[#173DA6]"
              disabled={isProcessing}
            />
            <button
              onClick={() => run()}
              disabled={!query.trim() || isProcessing}
              className="px-3 py-1.5 bg-[#173DA6] text-white text-xs rounded-md disabled:opacity-50"
            >
              {isProcessing ? '…' : 'Go'}
            </button>
          </div>
          <div className="flex flex-wrap gap-1">
            {EXAMPLES.map(ex => (
              <button key={ex} onClick={() => { setQuery(ex); run(ex); }}
                className="text-xs px-2 py-0.5 bg-white border border-[#173DA6] text-[#173DA6] rounded-full whitespace-nowrap hover:bg-white/80">
                {ex}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
