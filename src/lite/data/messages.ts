import { Message } from '../types';

export const MESSAGES: Record<string, Message[]> = {
  '1': [
    { id: '1', text: "Hi, I'm looking to book a consultation for next week. Is there a slot available?", sender: 'customer', timestamp: '5:45 PM' },
    { id: '2', text: "Hello! I'd be happy to help. Let me check availability for next week.", sender: 'agent', timestamp: '5:46 PM' },
    { id: '3', text: "I have openings on Tuesday at 2 PM, Wednesday at 10 AM, or Friday at 3 PM. Which works best for you?", sender: 'agent', timestamp: '5:47 PM' },
    { id: '4', text: "Tuesday at 2 PM would be perfect! What information do you need from me?", sender: 'customer', timestamp: '5:48 PM' },
    { id: '5', text: "Great! I'll need your full name, phone number, and a brief description of what you'd like to discuss.", sender: 'agent', timestamp: '5:49 PM' },
  ],
  '7': [
    { id: '1', text: 'Love your latest post! Where can I buy this dress?', sender: 'customer', timestamp: '4:30 PM' },
    { id: '2', text: "Thank you! That dress is from our Summer Collection. You can shop it at the link in our bio 💚", sender: 'agent', timestamp: '4:31 PM' },
    { id: '3', text: 'Is it available in size S?', sender: 'customer', timestamp: '4:32 PM' },
  ],
  '19': [
    { id: '1', text: "Hi! I saw your Facebook ad and I'm interested in learning more", sender: 'customer', timestamp: '4:18 PM' },
    { id: '2', text: "Hi Isabella! Thanks for reaching out. What would you like to know?", sender: 'agent', timestamp: '4:19 PM' },
    { id: '3', text: 'Can you provide more details about your pricing plans?', sender: 'customer', timestamp: '4:20 PM' },
  ],
  '25': [
    { id: '1', text: "Hi! I got your number from your website. Can you help me with pricing?", sender: 'customer', timestamp: '4:12 PM' },
    { id: '2', text: "Hello Rachel! I'd be happy to help with pricing. What service are you interested in?", sender: 'agent', timestamp: '4:13 PM' },
    { id: '3', text: "I'm looking at your premium package. Is there a discount for first-time customers?", sender: 'customer', timestamp: '4:14 PM' },
    { id: '4', text: "Yes! We have a 15% discount for new customers. That brings the premium package to $425. Want more details?", sender: 'agent', timestamp: '4:15 PM' },
  ],
  '4': [
    { id: '1', text: "I'm having trouble with my order", sender: 'customer', timestamp: '2:50 PM' },
    { id: '2', text: "Hi April, I'm sorry to hear that! What seems to be the issue?", sender: 'agent', timestamp: '2:52 PM' },
    { id: '3', text: 'Thanks for assisting me with the...', sender: 'customer', timestamp: '3:05 PM' },
  ],
  '26': [
    { id: '1', text: "I just received my order! Opening it now...", sender: 'customer', timestamp: '2:55 PM' },
    { id: '2', text: "Wonderful! I hope everything arrived in perfect condition.", sender: 'agent', timestamp: '2:56 PM' },
    { id: '3', text: "Thanks for the quick delivery! Everything looks perfect 👍", sender: 'customer', timestamp: '2:58 PM' },
  ],
  '20': [
    { id: '1', text: "Hi! I saw your Facebook ad and I'm interested", sender: 'customer', timestamp: '2:18 PM' },
    { id: '2', text: "Hi Ethan! Great to hear. What would you like to know?", sender: 'agent', timestamp: '2:19 PM' },
    { id: '3', text: 'Can you provide more details about your pricing plans?', sender: 'customer', timestamp: '2:20 PM' },
  ],
  '8': [
    { id: '1', text: 'Is this product still available in size M?', sender: 'customer', timestamp: '3:14 PM' },
    { id: '2', text: "Hi Tyler! Let me check stock for you.", sender: 'agent', timestamp: '3:15 PM' },
  ],
  '27': [
    { id: '1', text: 'I have an appointment booked for tomorrow at 3 PM', sender: 'customer', timestamp: '11:40 AM' },
    { id: '2', text: "Hi Sarah! I can see your booking. How can I help?", sender: 'agent', timestamp: '11:42 AM' },
    { id: '3', text: 'Can I change my appointment to tomorrow instead?', sender: 'customer', timestamp: '11:45 AM' },
  ],
  '6': [
    { id: '1', text: "I'd like to know more about the service", sender: 'customer', timestamp: '2:40 PM' },
    { id: '2', text: "Hi Prateek! Happy to help. Which service are you interested in?", sender: 'agent', timestamp: '2:41 PM' },
  ],
  '11': [
    { id: '1', text: 'Hey! Interested in collaborating on a campaign', sender: 'customer', timestamp: '12:28 PM' },
    { id: '2', text: "Hi Maya! That sounds exciting. Tell me more about what you have in mind.", sender: 'agent', timestamp: '12:29 PM' },
    { id: '3', text: "We're looking for brand partners for our summer launch next month", sender: 'customer', timestamp: '12:30 PM' },
  ],
  '22': [
    { id: '1', text: "Is there a demo available for your product?", sender: 'customer', timestamp: '12:03 PM' },
    { id: '2', text: "Hi Lucas! Yes, we offer free 30-minute demos. When works for you?", sender: 'agent', timestamp: '12:04 PM' },
    { id: '3', text: 'How about next Tuesday afternoon?', sender: 'customer', timestamp: '12:05 PM' },
  ],
  '18': [
    { id: '1', text: 'I have an issue with my recent purchase', sender: 'customer', timestamp: '2:44 PM' },
    { id: '2', text: "Hi Noah! I'm sorry to hear that. What's the issue?", sender: 'agent', timestamp: '2:45 PM' },
    { id: '3', text: 'The item arrived damaged. I need a replacement.', sender: 'customer', timestamp: '2:46 PM' },
    { id: '4', text: "I sincerely apologize. I'll arrange a replacement immediately.", sender: 'agent', timestamp: '2:47 PM' },
  ],
};

export function getMessages(chatId: string): Message[] {
  return MESSAGES[chatId] ?? [
    { id: '1', text: 'Hello! How can I help you today?', sender: 'agent', timestamp: '—' },
  ];
}
