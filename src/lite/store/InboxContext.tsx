import React, { createContext, useContext, useMemo, useState, useCallback } from 'react';
import { Chat, Message, SmartFilter, ParsedFilter, View } from '../types';
import { CHATS } from '../data/chats';
import { MESSAGES, getMessages } from '../data/messages';
import { categorizeChats } from '../components/ai/smartCategorizer';

interface InboxState {
  // Data
  filteredChats: Chat[];
  messages: Record<string, Message[]>;
  selectedChat: Chat;
  // Filters
  activeFilter: string;
  activeChannel: string;
  // Smart mode
  isSmartModeActive: boolean;
  smartFilters: SmartFilter[];
  activeSmartFilter: SmartFilter | null;
  // View
  activeView: View;
  // Counts
  channelCounts: Record<string, number>;
}

interface InboxActions {
  selectChat: (chat: Chat) => void;
  setFilter: (filter: string) => void;
  setChannel: (channel: string) => void;
  sendMessage: (text: string) => void;
  toggleSmartMode: () => void;
  setActiveSmartFilter: (f: SmartFilter | null) => void;
  setActiveView: (view: View) => void;
  applyNaturalFilter: (parsed: ParsedFilter) => void;
}

const InboxContext = createContext<(InboxState & InboxActions) | null>(null);

export function InboxProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<Record<string, Message[]>>(MESSAGES);
  const [selectedChat, setSelectedChat] = useState<Chat>(CHATS[0]);
  const [activeFilter, setActiveFilter] = useState('All Chats');
  const [activeChannel, setActiveChannel] = useState('All Channels');
  const [isSmartModeActive, setIsSmartModeActive] = useState(false);
  const [activeSmartFilter, setActiveSmartFilter] = useState<SmartFilter | null>(null);
  const [activeView, setActiveView] = useState<View>('inbox');

  const smartFilters = useMemo(
    () => categorizeChats(CHATS, messages),
    [messages]
  );

  const channelCounts = useMemo(() => ({
    'All Channels': CHATS.length,
    WhatsApp:  CHATS.filter(c => c.channel === 'WhatsApp').length,
    Instagram: CHATS.filter(c => c.channel === 'Instagram').length,
    Messenger: CHATS.filter(c => c.channel === 'Messenger').length,
    SMS:       CHATS.filter(c => c.channel === 'SMS').length,
    RCS:       CHATS.filter(c => c.channel === 'RCS').length,
  }), []);

  const filteredChats = useMemo(() => {
    let list = CHATS.slice().sort((a, b) => b.date.getTime() - a.date.getTime());

    if (isSmartModeActive && activeSmartFilter) {
      const ids = new Set(activeSmartFilter.chatIds);
      list = list.filter(c => ids.has(c.id));
      return list;
    }

    if (activeChannel !== 'All Channels') {
      list = list.filter(c => c.channel === activeChannel);
    }

    switch (activeFilter) {
      case 'Active Chats':   list = list.filter(c => c.status === 'Open'); break;
      case 'Unread':         list = list.filter(c => c.unread); break;
      case 'Assigned to me': list = list.filter(c => c.category === 'Support'); break;
      case 'Unassigned':     list = list.filter(c => !c.category || c.category === 'Information'); break;
      case 'Favourites':     list = list.filter(c => c.isOnline); break;
      case 'Sales':          list = list.filter(c => c.category === 'Sales'); break;
      case 'Support':        list = list.filter(c => c.category === 'Support'); break;
      case 'Broadcasts':     list = list.filter(c => c.status === 'Broadcast'); break;
      case 'Expiring Soon':  list = list.filter(c => c.status === 'Open' && c.unread); break;
    }

    return list;
  }, [activeFilter, activeChannel, isSmartModeActive, activeSmartFilter]);

  const selectChat = useCallback((chat: Chat) => {
    setSelectedChat(chat);
    if (!messages[chat.id]) {
      setMessages(prev => ({ ...prev, [chat.id]: getMessages(chat.id) }));
    }
  }, [messages]);

  const sendMessage = useCallback((text: string) => {
    const msg: Message = {
      id: Date.now().toString(),
      text,
      sender: 'agent',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages(prev => ({
      ...prev,
      [selectedChat.id]: [...(prev[selectedChat.id] ?? getMessages(selectedChat.id)), msg],
    }));
  }, [selectedChat.id]);

  const toggleSmartMode = useCallback(() => {
    setIsSmartModeActive(prev => {
      if (prev) setActiveSmartFilter(null);
      return !prev;
    });
  }, []);

  const applyNaturalFilter = useCallback((parsed: ParsedFilter) => {
    if (parsed.filter) setActiveFilter(parsed.filter);
    if (parsed.channel) setActiveChannel(parsed.channel);
  }, []);

  const value: InboxState & InboxActions = {
    filteredChats,
    messages,
    selectedChat,
    activeFilter,
    activeChannel,
    isSmartModeActive,
    smartFilters,
    activeSmartFilter,
    activeView,
    channelCounts,
    selectChat,
    setFilter: setActiveFilter,
    setChannel: setActiveChannel,
    sendMessage,
    toggleSmartMode,
    setActiveSmartFilter,
    setActiveView,
    applyNaturalFilter,
  };

  return <InboxContext.Provider value={value}>{children}</InboxContext.Provider>;
}

export function useInbox() {
  const ctx = useContext(InboxContext);
  if (!ctx) throw new Error('useInbox must be used within InboxProvider');
  return ctx;
}
