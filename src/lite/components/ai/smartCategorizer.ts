import { Chat, Message, SmartFilter } from '../../types';

export function categorizeChats(chats: Chat[], messages: Record<string, Message[]>): SmartFilter[] {
  const buckets = {
    escalated:     [] as string[],
    readyToBuy:    [] as string[],
    dropOffRisk:   [] as string[],
    awaitingReply: [] as string[],
    negotiating:   [] as string[],
    evaluating:    [] as string[],
    interested:    [] as string[],
    converted:     [] as string[],
    likelySpam:    [] as string[],
    uncategorised: [] as string[],
  };

  const categorised = new Set<string>();

  chats.forEach(chat => {
    const msgs = messages[chat.id] ?? [];
    const isOpen = chat.status === 'Open';
    const isSupport = chat.category === 'Support';
    const isSales = chat.category === 'Sales';
    const isRecent = (Date.now() - chat.date.getTime()) / 36e5 <= 24;
    let tagged = false;

    if (isSupport && isOpen)                              { buckets.escalated.push(chat.id);     tagged = true; }
    if (isSales && isOpen)                                { buckets.readyToBuy.push(chat.id);    tagged = true; }
    if (isSupport && !isRecent)                           { buckets.dropOffRisk.push(chat.id);   tagged = true; }
    if (msgs.length > 0 && lastSender(msgs) === 'customer') { buckets.awaitingReply.push(chat.id); tagged = true; }
    if (hasRepeatQueries(msgs))                           { buckets.negotiating.push(chat.id);   tagged = true; }
    if (hasQuestions(msgs))                               { buckets.evaluating.push(chat.id);    tagged = true; }
    if (isSales && msgs.length <= 3)                      { buckets.interested.push(chat.id);    tagged = true; }
    if (isSales && chat.status === 'Solved')              { buckets.converted.push(chat.id);     tagged = true; }
    if (isSpam(msgs))                                     { buckets.likelySpam.push(chat.id);    tagged = true; }

    if (tagged) categorised.add(chat.id);
  });

  chats.forEach(c => { if (!categorised.has(c.id)) buckets.uncategorised.push(c.id); });

  const filters: SmartFilter[] = [
    { id: 'escalated',      name: 'Escalated',      description: 'Issues flagged for manager attention',           count: buckets.escalated.length,     priority: 100, icon: '⬆️', color: 'bg-orange-50 text-orange-700', chatIds: buckets.escalated     },
    { id: 'ready-to-buy',   name: 'Ready to buy',   description: 'Sales conversations with high conversion potential', count: buckets.readyToBuy.length, priority: 99,  icon: '💰', color: 'bg-green-50 text-green-700',  chatIds: buckets.readyToBuy    },
    { id: 'drop-off-risk',  name: 'Drop off risk',  description: 'Customers showing signs of dropping off',        count: buckets.dropOffRisk.length,   priority: 98,  icon: '⚠️', color: 'bg-yellow-50 text-yellow-700',chatIds: buckets.dropOffRisk   },
    { id: 'awaiting-reply', name: 'Awaiting Reply', description: 'Customers waiting for your response',            count: buckets.awaitingReply.length, priority: 50,  icon: '⏰', color: 'bg-indigo-50 text-indigo-700',chatIds: buckets.awaitingReply },
    { id: 'negotiating',    name: 'Negotiating',    description: 'Customers in active negotiation or discussion',  count: buckets.negotiating.length,   priority: 30,  icon: '🔄', color: 'bg-purple-50 text-purple-700',chatIds: buckets.negotiating   },
    { id: 'evaluating',     name: 'Evaluating',     description: 'Customers evaluating products or services',      count: buckets.evaluating.length,    priority: 29,  icon: '🤖', color: 'bg-blue-50 text-blue-700',   chatIds: buckets.evaluating    },
    { id: 'interested',     name: 'Interested',     description: 'Initial engagement and interest',                count: buckets.interested.length,    priority: 28,  icon: '👀', color: 'bg-cyan-50 text-cyan-700',   chatIds: buckets.interested    },
    { id: 'converted',      name: 'Converted',      description: 'Successfully completed purchases',               count: buckets.converted.length,     priority: 27,  icon: '✅', color: 'bg-teal-50 text-teal-700',   chatIds: buckets.converted     },
    { id: 'likely-spam',    name: 'Likely Spam',    description: 'Messages flagged as potential spam',             count: buckets.likelySpam.length,    priority: 2,   icon: '🚫', color: 'bg-gray-50 text-gray-700',   chatIds: buckets.likelySpam    },
    { id: 'uncategorised',  name: 'Uncategorised',  description: 'Contacts without enough CDP data',               count: buckets.uncategorised.length, priority: 1,   icon: '❓', color: 'bg-gray-50 text-gray-600',   chatIds: buckets.uncategorised },
  ];

  return filters.filter(f => f.count > 0);
}

function lastSender(msgs: Message[]): string {
  return msgs[msgs.length - 1]?.sender ?? '';
}

function hasQuestions(msgs: Message[]): boolean {
  return msgs.slice(-3).some(m => m.text.includes('?') && m.sender === 'customer');
}

function hasRepeatQueries(msgs: Message[]): boolean {
  const customerMsgs = msgs.filter(m => m.sender === 'customer');
  if (customerMsgs.length < 2) return false;
  return customerMsgs.filter(m => m.text.includes('?')).length >= 2;
}

function isSpam(msgs: Message[]): boolean {
  if (!msgs.length) return false;
  const text = msgs.filter(m => m.sender === 'customer').map(m => m.text.toLowerCase()).join(' ');
  const keywords = ['win', 'winner', 'prize', 'lottery', 'click here', 'urgent', 'free money', 'earn', 'loan', 'credit'];
  return keywords.filter(k => text.includes(k)).length >= 2;
}
