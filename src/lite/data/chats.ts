import { Chat } from '../types';

function d(daysAgo: number, h: number, m: number): Date {
  const dt = new Date();
  dt.setDate(dt.getDate() - daysAgo);
  dt.setHours(h, m, 0, 0);
  return dt;
}

export const CHATS: Chat[] = [
  // Today
  { id: '1',  name: 'Addison Smith',    avatar: 'AS', lastMessage: "Hi, I'm looking to book a consultation for next week. Is there a slot available?", timestamp: '5:50 PM',   date: d(0,17,50), status: 'Open',      channel: 'WhatsApp',  isOnline: true,  unread: true,  category: 'Sales'   },
  { id: '7',  name: 'Emma Rodriguez',   avatar: 'ER', lastMessage: 'Love your latest post! Where can I buy this dress?',                                timestamp: '4:32 PM',   date: d(0,16,32), status: 'Open',      channel: 'Instagram', isOnline: true,  unread: true,  category: 'Sales'   },
  { id: '19', name: 'Isabella Garcia',  avatar: 'IG', lastMessage: "Hi! I saw your Facebook ad and I'm interested in learning more",                    timestamp: '4:20 PM',   date: d(0,16,20), status: 'Open',      channel: 'Messenger', isOnline: true,  unread: true,  category: 'Sales'   },
  { id: '25', name: 'Rachel Martinez',  avatar: 'RM', lastMessage: 'Hi! I got your number from your website. Can you help me with pricing?',            timestamp: '4:15 PM',   date: d(0,16,15), status: 'Open',      channel: 'SMS',       isOnline: true,  unread: true,  category: 'Sales'   },
  { id: '31', name: 'Patricia Lopez',   avatar: 'PL', lastMessage: 'Hi! I got your number from your website. Can you help me with pricing?',            timestamp: '4:10 PM',   date: d(0,16,10), status: 'Open',      channel: 'RCS',       isOnline: true,  unread: true,  category: 'Sales'   },
  { id: '8',  name: 'Tyler Johnson',    avatar: 'TJ', lastMessage: 'Is this product still available in size M?',                                        timestamp: '3:15 PM',   date: d(0,15,15), status: 'Open',      channel: 'Instagram', isOnline: false, unread: true,  category: 'Sales'   },
  { id: '4',  name: 'April Boyer',      avatar: 'AB', lastMessage: 'Thanks for assisting me with the...',                                               timestamp: '3:05 PM',   date: d(0,15, 5), status: 'Open',      channel: 'WhatsApp',  isOnline: true,  unread: false, category: 'Support' },
  { id: '26', name: 'James Wilson',     avatar: 'JW', lastMessage: 'Thanks for the quick delivery! Everything looks perfect 👍',                        timestamp: '2:58 PM',   date: d(0,14,58), status: 'Solved',    channel: 'SMS',       isOnline: false, unread: false, category: 'Support' },
  { id: '20', name: 'Ethan Brown',      avatar: 'EB', lastMessage: 'Can you provide more details about your pricing plans?',                            timestamp: '2:20 PM',   date: d(0,14,20), status: 'Open',      channel: 'Messenger', isOnline: false, unread: true,  category: 'Sales'   },
  { id: '9',  name: 'Sofia Chen',       avatar: 'SC', lastMessage: 'Thanks for the quick response! Just placed my order 🛍️',                           timestamp: '2:28 PM',   date: d(0,14,28), status: 'Solved',    channel: 'Instagram', isOnline: true,  unread: false, category: 'Sales'   },
  { id: '27', name: 'Sarah Thompson',   avatar: 'ST', lastMessage: 'Can I change my appointment to tomorrow instead?',                                  timestamp: '11:45 AM',  date: d(0,11,45), status: 'Open',      channel: 'SMS',       isOnline: true,  unread: true,  category: 'Support' },
  { id: '2',  name: 'Marcus Allen',     avatar: 'MA', lastMessage: 'Can you resend the invoice from last week?',                                        timestamp: '10:11 AM',  date: d(0,10,11), status: 'Broadcast', channel: 'Broadcast', isOnline: false, unread: false, category: 'Support' },
  // Yesterday
  { id: '28', name: 'Michael Davis',    avatar: 'MD', lastMessage: "Is your store open today? I'd like to visit in person.",                            timestamp: 'Yesterday', date: d(1,17,30), status: 'Open',      channel: 'SMS',       isOnline: false, unread: true,  category: 'Information' },
  { id: '16', name: 'Ryan Foster',      avatar: 'RF', lastMessage: 'When will you restock this item?',                                                  timestamp: 'Yesterday', date: d(1,16,30), status: 'Open',      channel: 'Instagram', isOnline: false, unread: false, category: 'Sales'   },
  { id: '18', name: 'Noah Williams',    avatar: 'NW', lastMessage: 'I have an issue with my recent purchase',                                           timestamp: 'Yesterday', date: d(1,14,45), status: 'Open',      channel: 'Instagram', isOnline: false, unread: true,  category: 'Support' },
  { id: '3',  name: 'April Boyer',      avatar: 'AB', lastMessage: "I'm unsure which membership plan would be best for me",                             timestamp: '11:12 PM',  date: d(1,23,12), status: 'Broadcast', channel: 'Broadcast', isOnline: false, unread: false, category: 'Support' },
  // 2 days ago
  { id: '5',  name: 'Karan Sharma',     avatar: 'KS', lastMessage: "I'd like to change my appointment time",                                            timestamp: '9:19 PM',   date: d(2,21,19), status: 'Solved',    channel: 'WhatsApp',  isOnline: false, unread: false, category: 'Sales'   },
  { id: '10', name: 'Alex Thompson',    avatar: 'AT', lastMessage: 'Can you help me track my order from last week?',                                    timestamp: '1:45 PM',   date: d(2,13,45), status: 'Open',      channel: 'Instagram', isOnline: false, unread: false, category: 'Support' },
  { id: '21', name: 'Mia Davis',        avatar: 'MD', lastMessage: 'Thank you for the excellent customer service!',                                     timestamp: '1:15 PM',   date: d(2,13,15), status: 'Solved',    channel: 'Messenger', isOnline: false, unread: false, category: 'Support' },
  // 3 days ago
  { id: '6',  name: 'Prateek Singh',    avatar: 'PS', lastMessage: "I'd like to know more about the service",                                           timestamp: '2:41 PM',   date: d(3,14,41), status: 'Open',      channel: 'WhatsApp',  isOnline: false, unread: false, category: 'Sales'   },
  { id: '11', name: 'Maya Patel',       avatar: 'MP', lastMessage: 'Hey! Interested in collaborating on a campaign',                                    timestamp: '12:30 PM',  date: d(3,12,30), status: 'Open',      channel: 'Instagram', isOnline: true,  unread: true,  category: 'Partnership' },
  { id: '22', name: 'Lucas Miller',     avatar: 'LM', lastMessage: 'Is there a demo available for your product?',                                       timestamp: '12:05 PM',  date: d(3,12, 5), status: 'Open',      channel: 'Messenger', isOnline: true,  unread: false, category: 'Sales'   },
  { id: '30', name: 'Chris Johnson',    avatar: 'CJ', lastMessage: 'Hi, I need help setting up my account. Can you guide me?',                          timestamp: '11:30 AM',  date: d(3,11,30), status: 'Open',      channel: 'SMS',       isOnline: true,  unread: true,  category: 'Support' },
  // 1 week ago
  { id: '13', name: 'Luna Martinez',    avatar: 'LM', lastMessage: 'The quality is amazing! Will definitely recommend 💕',                              timestamp: '10:15 AM',  date: d(7,10,15), status: 'Solved',    channel: 'Instagram', isOnline: false, unread: false, category: 'Support' },
  { id: '23', name: 'Chloe Wilson',     avatar: 'CW', lastMessage: 'I need help setting up my account',                                                 timestamp: '11:30 AM',  date: d(7,11,30), status: 'Open',      channel: 'Messenger', isOnline: false, unread: true,  category: 'Support' },
  // 2 weeks ago
  { id: '14', name: 'David Kim',        avatar: 'DK', lastMessage: 'What are your return policies?',                                                    timestamp: '9:45 AM',   date: d(14,9,45), status: 'Open',      channel: 'Instagram', isOnline: false, unread: false, category: 'Support' },
  { id: '15', name: 'Zoe Anderson',     avatar: 'ZA', lastMessage: 'Can I get this in a different color?',                                              timestamp: '8:30 AM',   date: d(30,8,30), status: 'Open',      channel: 'Instagram', isOnline: true,  unread: true,  category: 'Sales'   },
];
