export type Channel = 'WhatsApp' | 'Instagram' | 'Messenger' | 'SMS' | 'RCS' | 'Broadcast';
export type Status = 'Open' | 'Solved' | 'Broadcast';
export type View = 'inbox' | 'pulse';

export interface Chat {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  date: Date;
  status: Status;
  channel: Channel;
  isOnline: boolean;
  unread: boolean;
  category: string;
}

export interface Message {
  id: string;
  text: string;
  sender: 'customer' | 'agent';
  timestamp: string;
}

export interface SmartFilter {
  id: string;
  name: string;
  description: string;
  count: number;
  priority: number;
  icon: string;
  color: string;
  chatIds: string[];
}

export interface ParsedFilter {
  filter?: string;
  channel?: string;
  dateRange?: { from?: Date; to?: Date };
}
