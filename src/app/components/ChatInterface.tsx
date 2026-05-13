import React, { useState, useRef, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  Phone, 
  Video, 
  MoreHorizontal, 
  Archive,
  ArrowLeft,
  PanelRightOpen,
  PanelRightClose,
  X,
  Sparkles
} from 'lucide-react';
import customerAvatar from 'figma:asset/be6e73766eeaba76cb341f8b59d8f0a454fd2458.png';
import TiTopNav from '../imports/TiTopNav';
import svgPaths from '../imports/svg-mgoudhpi27';
import Messenger from '../imports/Messenger';

interface Message {
  id: string;
  text: string;
  sender: 'customer' | 'agent';
  timestamp: string;
}

interface ChatInterfaceProps {
  selectedChat: {
    id: string;
    name: string;
    avatar: string;
    lastMessage: string;
    timestamp: string;
    status: string;
    channel: string;
    isOnline: boolean;
    unread: boolean;
    category: string;
  };
  messages: Message[];
  onSendMessage: (message: string) => void;
  onToggleContactInfo: () => void;
  isContactInfoVisible: boolean;
  isMobile: boolean;
  currentFilter?: string;
  bulkReplyMode?: boolean;
  onToggleBulkMode?: () => void;
  selectedChatsForBulk?: Set<string>;
  onSelectAllChats?: () => void;
  onDeselectAllChats?: () => void;
  onSendBulkMessage?: (message: string) => void;
  filteredChats?: Array<{
    id: string;
    name: string;
    avatar: string;
    lastMessage: string;
    timestamp: string;
    status: string;
    channel: string;
    isOnline: boolean;
    unread: boolean;
    category: string;
  }>;
}

// Simplified icon wrapper for consistent sizing
function IconWrapper({ children, size = "size-5" }: { children: React.ReactNode; size?: string }) {
  return (
    <div className={`relative shrink-0 ${size}`}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        {children}
      </svg>
    </div>
  );
}

// Individual action icons
function ChatbotIcon() {
  return (
    <IconWrapper>
      <g id="Chatbot">
        <g>
          <path
            d={svgPaths.p3098af80}
            stroke="#353735"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.2"
          />
          <path
            d={svgPaths.pa539d80}
            stroke="#353735"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.2"
          />
        </g>
        <g>
          <path
            d={svgPaths.p3c136f80}
            stroke="#353735"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="10"
            strokeWidth="1.2"
          />
          <path
            d={svgPaths.pcad0880}
            stroke="#353735"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="10"
            strokeWidth="1.2"
          />
        </g>
        <path d={svgPaths.p23acc2d0} fill="#353735" />
        <line stroke="#353735" strokeWidth="1.2" x1="10.2" x2="10.2" y1="2.4" y2="5.6" />
      </g>
    </IconWrapper>
  );
}

function QuickReplyIcon() {
  return (
    <IconWrapper>
      <path d={svgPaths.p1f302180} fill="#353735" />
    </IconWrapper>
  );
}

function TemplateIcon() {
  return (
    <IconWrapper>
      <g>
        <path
          d={svgPaths.p2c6b0400}
          stroke="#353735"
          strokeLinejoin="round"
          strokeMiterlimit="10"
        />
        <path
          d={svgPaths.p8208d00}
          stroke="#353735"
          strokeLinejoin="round"
          strokeMiterlimit="10"
        />
        <path
          d={svgPaths.p2eaa9f00}
          stroke="#353735"
          strokeLinejoin="round"
          strokeMiterlimit="10"
        />
      </g>
    </IconWrapper>
  );
}

function AttachIcon() {
  return (
    <IconWrapper>
      <path d={svgPaths.p3ef67500} fill="#353735" />
    </IconWrapper>
  );
}

function EmojiIcon() {
  return (
    <div className="relative shrink-0 size-5">
      <div className="absolute inset-[11.458%]">
        <div className="absolute bottom-[-4.054%] left-[-4.054%] right-[-4.054%] top-[-4.054%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
            <path
              d={svgPaths.p192eed80}
              stroke="#353735"
              strokeMiterlimit="10"
              strokeWidth="1.25"
            />
            <path
              d="M6.83333 6H5.16667"
              stroke="#353735"
              strokeLinecap="round"
              strokeMiterlimit="10"
              strokeWidth="1.25"
            />
            <path
              d="M12.25 6H10.5833"
              stroke="#353735"
              strokeLinecap="round"
              strokeMiterlimit="10"
              strokeWidth="1.25"
            />
            <path
              d={svgPaths.p1ec8f320}
              stroke="#353735"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeMiterlimit="10"
              strokeWidth="1.25"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

function StickerIcon() {
  return (
    <div className="relative shrink-0 size-5">
      <div className="absolute bottom-[11.458%] left-[13.542%] right-[9.683%] top-[11.766%]">
        <div className="absolute bottom-[-4.07%] left-[-4.07%] right-[-4.07%] top-[-4.07%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17 17">
            <path
              d={svgPaths.p28b19300}
              stroke="#353735"
              strokeMiterlimit="10"
              strokeWidth="1.25"
            />
            <path
              d={svgPaths.p395db00}
              stroke="#353735"
              strokeMiterlimit="10"
              strokeWidth="1.25"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

// Send button with channel-specific styling
function SendButtonIcon({ channel }: { channel: string }) {
  // SMS and RCS button
  if (channel === 'SMS' || channel === 'RCS') {
    return (
      <div className="bg-[#FD7000] relative rounded-[5px] shrink-0">
        <div className="flex flex-row items-center overflow-clip relative size-full">
          <div className="flex flex-row gap-1.5 items-center px-2.5 py-1.5 relative">
            <div className="relative size-4">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
                <path d="M12.3846 1L3.6154 1C3.1873 1.0012 2.7772 1.1706 2.4745 1.4712C2.1718 1.7718 2.0012 2.1791 2 2.6042L2 8.1042C2.0012 8.5292 2.1718 8.9366 2.4745 9.2371C2.7772 9.5377 3.1873 9.7071 3.6154 9.7083L4.7692 9.7083L4.7692 12L7.4727 9.7616C7.5142 9.7272 7.5666 9.7083 7.6207 9.7083L12.3846 9.7083C12.8127 9.7071 13.2228 9.5377 13.5255 9.2371C13.8282 8.9366 13.9988 8.5292 14 8.1042L14 2.6042C13.9988 2.1791 13.8282 1.7718 13.5255 1.4712C13.2228 1.1706 12.8127 1.0012 12.3846 1Z" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="font-['Inter:Semi_Bold',_sans-serif] font-semibold text-white text-[14px] leading-[20px]">
              Send
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Instagram button
  if (channel === 'Instagram') {
    return (
      <div className="bg-[#604FC6] relative rounded-[5px] shrink-0">
        <div className="flex flex-row items-center overflow-clip relative size-full">
          <div className="flex flex-row gap-1.5 items-center px-2.5 py-1.5 relative">
            <div className="relative size-4">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
                <g clipPath="url(#clip0_instagram)">
                  <path fillRule="evenodd" clipRule="evenodd" d="M7 9.75C8.933 9.75 10.5 8.183 10.5 6.25C10.5 4.317 8.933 2.75 7 2.75C5.067 2.75 3.5 4.317 3.5 6.25C3.5 8.183 5.067 9.75 7 9.75ZM7 8.5833C8.2886 8.5833 9.3333 7.5386 9.3333 6.25C9.3333 4.9613 8.2886 3.9167 7 3.9167C5.7113 3.9167 4.6667 4.9613 4.6667 6.25C4.6667 7.5386 5.7113 8.5833 7 8.5833Z" fill="white"/>
                  <path d="M10.5013 2.1666C10.1791 2.1666 9.918 2.4278 9.918 2.75C9.918 3.0721 10.1791 3.3333 10.5013 3.3333C10.8235 3.3333 11.0846 3.0721 11.0846 2.75C11.0846 2.4278 10.8235 2.1666 10.5013 2.1666Z" fill="white"/>
                  <path fillRule="evenodd" clipRule="evenodd" d="M0.96351 1.7444C0.58203 2.4931 0.58203 3.4732 0.58203 5.4334V7.0667C0.58203 9.0269 0.58203 10.007 0.96351 10.7556C1.2991 11.4142 1.8345 11.9497 2.4931 12.2852C3.2418 12.6667 4.2219 12.6667 6.182 12.6667H7.8154C9.7755 12.6667 10.7557 12.6667 11.5043 12.2852C12.1629 11.9497 12.6983 11.4142 13.0339 10.7556C13.4154 10.007 13.4154 9.0269 13.4154 7.0667V5.4334C13.4154 3.4732 13.4154 2.4931 13.0339 1.7444C12.6983 1.0858 12.1629 0.55041 11.5043 0.21485C10.7557 -0.16663 9.7755 -0.16663 7.8154 -0.16663H6.182C4.2219 -0.16663 3.2418 -0.16663 2.4931 0.21485C1.8345 0.55041 1.2991 1.0858 0.96351 1.7444ZM7.8154 1H6.182C5.1827 1 4.5033 1.001 3.9782 1.0438C3.4668 1.0856 3.2052 1.1614 3.0227 1.2544C2.5837 1.4781 2.2267 1.835 2.003 2.2741C1.91 2.4565 1.8343 2.7181 1.7925 3.2296C1.7496 3.7547 1.7487 4.434 1.7487 5.4334V7.0667C1.7487 8.0661 1.7496 8.7454 1.7925 9.2705C1.8343 9.782 1.91 10.0436 2.003 10.226C2.2267 10.6651 2.5837 11.022 3.0227 11.2457C3.2052 11.3387 3.4668 11.4145 3.9782 11.4562C4.5033 11.4991 5.1827 11.5 6.182 11.5H7.8154C8.8147 11.5 9.494 11.4991 10.0191 11.4562C10.5307 11.4145 10.7922 11.3387 10.9747 11.2457C11.4137 11.022 11.7707 10.6651 11.9944 10.226C12.0873 10.0436 12.1631 9.782 12.2049 9.2705C12.2478 8.7454 12.2487 8.0661 12.2487 7.0667V5.4334C12.2487 4.434 12.2478 3.7547 12.2049 3.2296C12.1631 2.7181 12.0873 2.4565 11.9944 2.2741C11.7707 1.835 11.4137 1.4781 10.9747 1.2544C10.7922 1.1614 10.5307 1.0856 10.0191 1.0438C9.494 1.001 8.8147 1 7.8154 1Z" fill="white"/>
                </g>
                <defs>
                  <clipPath id="clip0_instagram">
                    <rect width="14" height="14" fill="white"/>
                  </clipPath>
                </defs>
              </svg>
            </div>
            <div className="font-['Inter:Semi_Bold',_sans-serif] font-semibold text-white text-[14px] leading-[20px]">
              Send
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Messenger button
  if (channel === 'Messenger') {
    return (
      <div className="bg-[#1766D4] relative rounded-[5px] shrink-0">
        <div className="flex flex-row items-center overflow-clip relative size-full">
          <div className="flex flex-row gap-1.5 items-center px-2.5 py-1.5 relative">
            <div className="relative size-4">
              <Messenger />
            </div>
            <div className="font-['Inter:Semi_Bold',_sans-serif] font-semibold text-white text-[14px] leading-[20px]">
              Send
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default WhatsApp button
  return (
    <div className="bg-[#23a455] relative rounded-[5px] shrink-0">
      <div className="flex flex-row items-center overflow-clip relative size-full">
        <div className="flex flex-row gap-1.5 items-center px-2.5 py-1.5 relative">
          <div className="relative size-4">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
              <path d={svgPaths.p3cc4a300} fill="white" />
            </svg>
          </div>
          <div className="font-['Inter:Semi_Bold',_sans-serif] font-semibold text-white text-[14px] leading-[20px]">
            Send
          </div>
        </div>
      </div>
    </div>
  );
}

// Action buttons row
function ActionButtons({ onSendMessage, message, channel }: { onSendMessage: () => void; message: string; channel: string }) {
  return (
    <div className="flex flex-row items-center justify-between w-full">
      <div className="flex flex-row gap-3 items-center">
        <ChatbotIcon />
        <QuickReplyIcon />
        <TemplateIcon />
        <AttachIcon />
        <EmojiIcon />
        <StickerIcon />
      </div>
      <button 
        onClick={onSendMessage}
        disabled={!message.trim()}
        className="disabled:opacity-50"
      >
        <SendButtonIcon channel={channel} />
      </button>
    </div>
  );
}

// Channel indicator with WhatsApp icon and channel label
function ChannelIndicator({ channel }: { channel: string }) {
  const getChannelLabel = (channel: string) => {
    switch (channel) {
      case 'WhatsApp':
        return 'WhatsApp';
      case 'Instagram':
        return 'Instagram';
      case 'Messenger':
        return 'Messenger';
      case 'Broadcast':
        return 'Broadcast';
      default:
        return 'Chat';
    }
  };

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'WhatsApp':
        return (
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
            <g id="WhatsApp">
              <path
                clipRule="evenodd"
                d={svgPaths.p2fd5d080}
                fill="white"
                fillRule="evenodd"
              />
              <path
                clipRule="evenodd"
                d={svgPaths.p33ae7500}
                fill="white"
                fillRule="evenodd"
              />
              <path
                clipRule="evenodd"
                d={svgPaths.pabcc840}
                fill="#CFD8DC"
                fillRule="evenodd"
              />
              <path
                clipRule="evenodd"
                d={svgPaths.pa265370}
                fill="#40C351"
                fillRule="evenodd"
              />
              <path
                clipRule="evenodd"
                d={svgPaths.p3ea1cf00}
                fill="white"
                fillRule="evenodd"
              />
            </g>
          </svg>
        );
      case 'Instagram':
        return (
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
            <circle cx="8" cy="8" r="6" fill="#E4405F" />
            <circle cx="8" cy="8" r="3" fill="white" />
            <circle cx="11" cy="5" r="1" fill="white" />
          </svg>
        );
      case 'Messenger':
        return (
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
            <circle cx="8" cy="8" r="6" fill="#0084FF" />
            <path d="M5 9l2-2 2 2 3-3" stroke="white" strokeWidth="1.5" fill="none" />
          </svg>
        );
      default:
        return (
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
            <circle cx="8" cy="8" r="6" fill="#6B7280" />
            <circle cx="8" cy="8" r="2" fill="white" />
          </svg>
        );
    }
  };

  return (
    <div className="relative shrink-0">
      <div className="flex flex-row gap-0.5 items-center">
        <div className="relative size-4">
          {getChannelIcon(channel)}
        </div>
        <div className="font-['Inter:Regular',_sans-serif] font-normal text-[#353735] text-[12px] leading-[16px]">
          {getChannelLabel(channel)}
        </div>
      </div>
    </div>
  );
}

// Back arrow icon
function BackArrow() {
  return (
    <div className="flex items-center justify-center relative shrink-0">
      <div className="flex-none rotate-[180deg]">
        <div className="relative size-4">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
            <path
              d={svgPaths.p117ac380}
              stroke="#848A86"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d={svgPaths.p1a36fd80}
              stroke="#848A86"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

// AI Reply Generation Logic
const generateAIReply = (chat: any, messages: Message[]): string => {
  const lastCustomerMessage = messages.filter(msg => msg.sender === 'customer').slice(-1)[0];
  const customerName = chat.name.split(' ')[0];
  
  if (!lastCustomerMessage) {
    return `Hi ${customerName}! Thanks for reaching out. How can I help you today?`;
  }

  const messageText = lastCustomerMessage.text.toLowerCase();
  
  // Specific contextual replies based on message content and patterns
  if (messageText.includes('pricing') || messageText.includes('price') || messageText.includes('cost')) {
    if (messageText.includes('discount') || messageText.includes('first-time')) {
      return `Hi ${customerName}! Great news - we have a special 15% discount for new customers. The pricing would be reduced from our standard rates. Would you like me to send you the detailed pricing breakdown?`;
    }
    return `Hi ${customerName}! I'd be happy to help you with pricing information. Let me send you our current pricing options and any available discounts for new customers.`;
  }
  
  if (messageText.includes('appointment') || messageText.includes('meeting') || messageText.includes('schedule')) {
    if (messageText.includes('change') || messageText.includes('reschedule')) {
      return `Hello ${customerName}! Absolutely, I can help you reschedule your appointment. Let me check our availability for alternative times that work better for you.`;
    }
    return `Hello ${customerName}! I can help you schedule an appointment. We have availability this week and next week. What type of consultation are you looking for?`;
  }
  
  if (messageText.includes('order') || messageText.includes('delivery') || messageText.includes('shipping') || messageText.includes('track')) {
    return `Hi ${customerName}! I'll help you track your order right away. Let me pull up your order details and current shipping status for you.`;
  }
  
  if (messageText.includes('help') || messageText.includes('support') || messageText.includes('issue') || messageText.includes('problem')) {
    return `Hello ${customerName}! I'm here to help resolve any issues you're having. Could you please provide more details about what you're experiencing so I can assist you better?`;
  }
  
  if (messageText.includes('account') || messageText.includes('login') || messageText.includes('setup')) {
    return `Hi ${customerName}! I'd be happy to help you with your account setup. Let me guide you through the process step by step to get everything working smoothly.`;
  }
  
  if (messageText.includes('payment') || messageText.includes('pay') || messageText.includes('installment')) {
    return `Hello ${customerName}! We offer flexible payment options including installment plans. Let me share the available payment methods and help you choose the best option for your needs.`;
  }
  
  if (messageText.includes('available') || messageText.includes('stock')) {
    return `Hi ${customerName}! Let me check our current inventory for you. I'll also let you know about any similar items if your preferred option isn't available right now.`;
  }
  
  if (messageText.includes('store') || messageText.includes('visit') || messageText.includes('open')) {
    return `Hello ${customerName}! Yes, we're open today and would love to see you in person. Our store is located at 123 Main Street and we're open until 7 PM today.`;
  }
  
  if (messageText.includes('?')) {
    return `Hi ${customerName}! Great question! Let me provide you with the information you need to help you make the best decision.`;
  }
  
  // Category-based replies
  if (chat.category === 'Sales') {
    return `Thank you for your interest, ${customerName}! I'd love to help you find exactly what you're looking for. Let me provide you with more details about our offerings.`;
  }
  
  if (chat.category === 'Support') {
    return `Hello ${customerName}! I'm here to help resolve this for you quickly. Let me look into this matter and get back to you with a solution.`;
  }
  
  // Default contextual reply
  return `Thank you for your message, ${customerName}! I'll be happy to assist you with this. Let me get back to you with the right information.`;
};

// Bulk Reply Interface Component
interface BulkReplyInterfaceProps {
  selectedChatsForBulk: Set<string>;
  onSelectAllChats: () => void;
  onDeselectAllChats: () => void;
  onSendBulkMessage: (message: string) => void;
  onToggleBulkMode: () => void;
  filteredChats: Array<{
    id: string;
    name: string;
    avatar: string;
    lastMessage: string;
    timestamp: string;
    status: string;
    channel: string;
    isOnline: boolean;
    unread: boolean;
    category: string;
  }>;
}

function BulkReplyInterface({
  selectedChatsForBulk,
  onSelectAllChats,
  onDeselectAllChats,
  onSendBulkMessage,
  onToggleBulkMode,
  filteredChats
}: BulkReplyInterfaceProps) {
  const [bulkMessage, setBulkMessage] = React.useState('');
  
  const handleSendBulk = () => {
    if (bulkMessage.trim() && selectedChatsForBulk.size > 0) {
      onSendBulkMessage(bulkMessage.trim());
      setBulkMessage('');
    }
  };

  const selectedCount = selectedChatsForBulk.size;
  const allSelected = selectedCount === filteredChats.length;

  return (
    <div className="space-y-4">
      {/* Bulk Reply Header */}
      <div className="bg-white rounded-lg p-4" style={{ border: '1px solid #EDF1FA' }}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#EDF1FA' }}>
              <span style={{ color: '#173DA6' }}>🔄</span>
            </div>
            <div>
              <h3 className="font-medium" style={{ color: '#091840' }}>Bulk Reply Mode</h3>
              <p className="text-sm" style={{ color: '#173DA6' }}>
                {selectedCount} of {filteredChats.length} conversations selected
              </p>
            </div>
          </div>
          <Button
            onClick={onToggleBulkMode}
            variant="outline"
            className="text-gray-600 border-gray-300 hover:bg-gray-50"
          >
            Exit Bulk Mode
          </Button>
        </div>
        
        {/* Selection Controls */}
        <div className="flex items-center space-x-4 mb-4">
          <Button
            onClick={allSelected ? onDeselectAllChats : onSelectAllChats}
            variant="outline"
            size="sm"
            style={{ color: '#173DA6', borderColor: '#EDF1FA' }}
            className="hover:bg-[#EDF1FA]"
          >
            {allSelected ? 'Deselect All' : 'Select All'}
          </Button>
          
          {selectedCount > 0 && (
            <Badge variant="secondary" style={{ backgroundColor: '#EDF1FA', color: '#091840' }}>
              {selectedCount} selected
            </Badge>
          )}
        </div>

        {/* Bulk Message Composer */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700">
            Message to send to all selected conversations:
          </label>
          <textarea
            value={bulkMessage}
            onChange={(e) => setBulkMessage(e.target.value)}
            placeholder="Type your message here..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg resize-none"
            style={{ 
              focusRing: '2px',
              '--tw-ring-color': '#173DA6'
            } as any}
            rows={4}
          />
          
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">
              This message will be sent to {selectedCount} conversation{selectedCount !== 1 ? 's' : ''}
            </p>
            <Button
              onClick={handleSendBulk}
              disabled={!bulkMessage.trim() || selectedCount === 0}
              style={{ backgroundColor: '#173DA6' }}
              className="hover:opacity-90 text-white disabled:opacity-50"
            >
              Send to {selectedCount} conversation{selectedCount !== 1 ? 's' : ''}
            </Button>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="rounded-lg p-3" style={{ backgroundColor: '#EDF1FA', border: '1px solid #173DA6' }}>
        <p className="text-sm" style={{ color: '#091840' }}>
          💡 <strong>Tip:</strong> Go to the chat list on the left to select which conversations you want to reply to. 
          Selected conversations will have a checkmark.
        </p>
      </div>
    </div>
  );
}

export function ChatInterface({
  selectedChat,
  messages,
  onSendMessage,
  onToggleContactInfo,
  isContactInfoVisible,
  isMobile,
  currentFilter,
  bulkReplyMode = false,
  onToggleBulkMode = () => {},
  selectedChatsForBulk = new Set(),
  onSelectAllChats = () => {},
  onDeselectAllChats = () => {},
  onSendBulkMessage = () => {},
  filteredChats = []
}: ChatInterfaceProps) {
  const [message, setMessage] = useState('');
  const [aiSuggestion, setAiSuggestion] = useState<string>('');
  const [dismissedContextStrips, setDismissedContextStrips] = useState<Set<string>>(new Set());
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Generate CDP context text for the contact
  const generateCDPContext = (chat: typeof selectedChat): string => {
    const contextItems: string[] = [];

    // Mock CDP data - in a real implementation, this would come from actual CDP analysis
    // Example: "Returning contact · Interested in Vitamin C Serum · Price-sensitive · Last dropped off after negotiating"

    // Contact type
    if (chat.status === 'Open' && messages.length > 3) {
      contextItems.push('Returning contact');
    } else if (messages.length <= 2) {
      contextItems.push('New contact');
    }

    // Interest/Product (mock based on category)
    if (chat.category === 'Sales') {
      contextItems.push('Interested in premium package');
    } else if (chat.category === 'Support') {
      contextItems.push('Seeking product support');
    }

    // Behavioral signals
    if (chat.category === 'Sales') {
      contextItems.push('Price-sensitive');
    }

    // Journey stage or last interaction
    if (currentFilter === 'Negotiating') {
      contextItems.push('Currently negotiating');
    } else if (currentFilter === 'Drop off risk') {
      contextItems.push('Last dropped off after negotiating');
    } else if (currentFilter === 'Ready to buy') {
      contextItems.push('Ready to purchase');
    } else if (currentFilter === 'Evaluating') {
      contextItems.push('Evaluating options');
    }

    return contextItems.join(' · ');
  };

  const handleDismissContextStrip = () => {
    setDismissedContextStrips(prev => new Set(prev).add(selectedChat.id));
  };

  const shouldShowContextStrip = !dismissedContextStrips.has(selectedChat.id) && !bulkReplyMode;

  // Generate AI suggestion when filter is "AI Drafted Replies"
  useEffect(() => {
    if (currentFilter === 'AI Drafted Replies') {
      const suggestion = generateAIReply(selectedChat, messages);
      setAiSuggestion(suggestion);
      setMessage(suggestion);
    } else {
      setAiSuggestion('');
    }
  }, [selectedChat, messages, currentFilter]);

  const handleSendMessage = () => {
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage('');
      setAiSuggestion(''); // Clear AI suggestion after sending
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const clearAISuggestion = () => {
    setMessage('');
    setAiSuggestion('');
  };

  const getChannelColor = (channel: string) => {
    switch (channel) {
      case 'WhatsApp':
        return 'bg-green-100 text-green-800';
      case 'Instagram':
        return 'bg-pink-100 text-pink-800';
      case 'Messenger':
        return 'bg-blue-100 text-blue-800';
      case 'SMS':
      case 'RCS':
        return 'bg-orange-100 text-orange-800';
      case 'Broadcast':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open':
        return 'bg-green-100 text-green-800';
      case 'Solved':
        return 'bg-blue-100 text-blue-800';
      case 'Broadcast':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Function to get chat bubble background color based on channel
  const getChatBubbleColor = (channel: string) => {
    switch (channel) {
      case 'Instagram':
        return '#DAD4FF';
      case 'Messenger':
        return '#D9E9FF';
      case 'SMS':
      case 'RCS':
        return '#FDE4CF';
      case 'WhatsApp':
      default:
        return '#DCF0E4';
    }
  };

  // Get phone number from contact info or generate a default one
  const getPhoneNumber = () => {
    // In a real app, this would come from contact info
    // For now, generate based on chat ID for variety
    const phoneNumbers: Record<string, string> = {
      '1': '+18765432210',
      '2': '+15551234567', 
      '3': '+19876543210',
      '4': '+15557654321',
      '5': '+919876543210',
      '6': '+919123456789',
      '7': '+15559876543',
      '8': '+15557654321'
    };
    return phoneNumbers[selectedChat.id] || '+1234567890';
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="h-16 flex-shrink-0">
        {bulkReplyMode ? (
          <div className="h-16 bg-white border-b border-gray-200 flex items-center px-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#EDF1FA' }}>
                <span style={{ color: '#173DA6' }}>🔄</span>
              </div>
              <div>
                <h3 className="font-medium" style={{ color: '#091840' }}>Bulk Reply Mode</h3>
                <p className="text-sm" style={{ color: '#173DA6' }}>
                  Replying to {selectedChatsForBulk.size} selected conversation{selectedChatsForBulk.size !== 1 ? 's' : ''}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <TiTopNav 
            onToggleContactInfo={onToggleContactInfo}
            isContactInfoVisible={isContactInfoVisible}
          />
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 lg:p-6 min-h-0" style={{ backgroundColor: '#F5F6FA' }}>
        {bulkReplyMode ? (
          /* Bulk Reply Mode Interface */
          <div className="h-full flex items-center justify-center">
            <div className="max-w-2xl w-full text-center space-y-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl text-purple-600">🔄</span>
              </div>
              
              <div className="space-y-2">
                <h2 className="text-xl font-medium text-gray-900">Bulk Reply Mode Active</h2>
                <p className="text-gray-600">
                  You're now in bulk reply mode. Messages sent will go to all selected conversations.
                </p>
              </div>


            </div>
          </div>
        ) : (
          /* Regular Chat Messages */
          <div className="space-y-4">
            {messages.length > 0 ? (
              messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'agent' ? 'justify-end' : 'justify-start'}`}>
                  <div 
                    className={`max-w-xs lg:max-w-md px-3 lg:px-4 py-2 rounded-lg ${
                      msg.sender === 'agent' 
                        ? 'text-gray-900 rounded-tr-none' 
                        : 'bg-white text-gray-900 border border-gray-200 rounded-tl-none'
                    }`}
                    style={msg.sender === 'agent' ? { backgroundColor: getChatBubbleColor(selectedChat.channel), color: '#333333' } : {}}
                  >
                    <p className="text-[14px]">{msg.text}</p>
                    <p 
                      className={`text-xs mt-1 ${
                        msg.sender === 'agent' ? '' : 'text-gray-500'
                      }`}
                      style={msg.sender === 'agent' ? { color: '#333333', opacity: 0.7 } : {}}
                    >
                      {msg.timestamp}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                <div className="text-center">
                  <p className="text-lg mb-2">No messages yet</p>
                  <p className="text-sm">Start a conversation with {selectedChat.name}</p>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Bulk Reply Nudge - Above Input Area */}
      {currentFilter === 'Repeat Queries' && !bulkReplyMode && (
        <div className="flex-shrink-0 p-4 border-t" style={{ backgroundColor: '#E2EBF1', borderColor: '#173DA6' }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: 'white' }}>
                  <span style={{ color: '#173DA6' }}>🔄</span>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium" style={{ color: '#091840' }}>Bulk Reply Available</h3>
                <p className="text-sm" style={{ color: '#173DA6' }}>Reply to multiple customers with repeated queries at once</p>
              </div>
            </div>
            <Button
              onClick={onToggleBulkMode}
              style={{ backgroundColor: '#173DA6' }}
              className="hover:opacity-90 text-white text-sm px-4 py-2"
            >
              Start Bulk Reply
            </Button>
          </div>
        </div>
      )}

      {/* CDP Context Strip - Above Input Area */}
      {shouldShowContextStrip && (
        <div className="flex-shrink-0 bg-gray-50 border-t border-gray-200 px-4 py-2">
          <div className="flex items-center justify-between">
            <p className="text-xs text-gray-500">
              {generateCDPContext(selectedChat)}
            </p>
            <button
              onClick={handleDismissContextStrip}
              className="ml-3 text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
              title="Dismiss"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Input Area - Fixed to bottom */}
      <div className="flex-shrink-0 bg-white border-t border-gray-100">
        {/* Channel Header */}
        <div className="bg-white relative rounded-tl-[8px] rounded-tr-[8px] shrink-0 w-full border-b border-gray-100">
          <div className="flex flex-row items-end relative size-full">
            {selectedChat.channel !== 'Instagram' && selectedChat.channel !== 'Messenger' && selectedChat.channel !== 'SMS' && selectedChat.channel !== 'RCS' && (
              <div className="flex flex-row gap-2.5 items-end p-[8px] relative w-full">
                <div className="flex flex-row gap-1 items-center">
                  <BackArrow />
                  <div className="flex flex-row gap-1 items-center">
                    <ChannelIndicator channel={selectedChat.channel} />
                    <div className="font-['Inter:Regular',_sans-serif] font-normal text-[#848a86] text-[12px] leading-[16px]">
                      {getPhoneNumber()}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Bulk Reply Status Bar */}
        {bulkReplyMode && currentFilter === 'Repeat Queries' && (
          <div className="px-4 py-2 bg-purple-100 border-b border-purple-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">🔄</span>
                </div>
                <div>
                  <span className="text-sm font-medium text-purple-900">Bulk Reply Mode</span>
                  <span className="text-sm text-purple-700 ml-2">
                    ({selectedChatsForBulk.size} of {filteredChats.length} conversations selected)
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  onClick={selectedChatsForBulk.size === filteredChats.length ? onDeselectAllChats : onSelectAllChats}
                  variant="outline"
                  size="sm"
                  className="text-purple-600 border-purple-200 hover:bg-purple-50"
                >
                  {selectedChatsForBulk.size === filteredChats.length ? 'Deselect All' : 'Select All'}
                </Button>
                <Button
                  onClick={onToggleBulkMode}
                  variant="outline"
                  size="sm"
                  className="text-gray-600 border-gray-300 hover:bg-gray-50"
                >
                  Exit
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Text Input and Action Buttons */}
        <div className="p-4">
          <div className="flex flex-col gap-2">

            
            {/* Text Input */}
            <div className="flex items-end space-x-2">
              <div className="flex-1 relative">
                {/* AI Suggestion Indicator */}
                {!bulkReplyMode && aiSuggestion && message === aiSuggestion && (
                  <div className="absolute top-0 left-0 right-0 rounded-lg px-3 py-2 mb-1 flex items-center justify-between z-10" style={{ backgroundColor: '#E2EBF1', border: '1px solid #173DA6' }}>
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4" style={{ color: '#173DA6' }} />
                      <span className="text-sm font-medium" style={{ color: '#091840' }}>AI-drafted reply</span>
                    </div>
                    <button
                      onClick={clearAISuggestion}
                      className="transition-colors"
                      style={{ color: '#173DA6' }}
                      onMouseEnter={(e) => e.currentTarget.style.color = '#091840'}
                      onMouseLeave={(e) => e.currentTarget.style.color = '#173DA6'}
                      title="Clear AI suggestion"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
                <textarea
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    // If user starts typing something different from AI suggestion, clear the suggestion indicator
                    if (aiSuggestion && e.target.value !== aiSuggestion && e.target.value.length < aiSuggestion.length) {
                      setAiSuggestion('');
                    }
                  }}
                  onKeyPress={bulkReplyMode ? undefined : handleKeyPress}
                  placeholder={bulkReplyMode 
                    ? `Type your bulk message here (will be sent to ${selectedChatsForBulk.size} conversation${selectedChatsForBulk.size !== 1 ? 's' : ''})...`
                    : `Type your message here or press "/" key for quick replies`
                  }
                  className={`w-full px-3 py-2 rounded-lg resize-none focus:outline-none ${
                    bulkReplyMode
                      ? 'bg-purple-50 border border-purple-200 text-purple-900'
                      : aiSuggestion && message === aiSuggestion 
                        ? 'bg-blue-50 border border-blue-200 text-blue-900' 
                        : 'bg-gray-50'
                  }`}
                  rows={bulkReplyMode ? 3 : 1}
                  style={{ 
                    minHeight: bulkReplyMode ? '80px' : '40px', 
                    maxHeight: bulkReplyMode ? '150px' : '120px',
                    marginTop: !bulkReplyMode && aiSuggestion && message === aiSuggestion ? '48px' : '0'
                  }}
                />
              </div>
            </div>
            
            {/* Action Buttons */}
            {bulkReplyMode ? (
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2 text-sm text-purple-600">
                  <span>Sending to {selectedChatsForBulk.size} conversation{selectedChatsForBulk.size !== 1 ? 's' : ''}</span>
                </div>
                <Button
                  onClick={() => {
                    if (message.trim() && selectedChatsForBulk.size > 0) {
                      onSendBulkMessage(message.trim());
                      setMessage('');
                    }
                  }}
                  disabled={!message.trim() || selectedChatsForBulk.size === 0}
                  className="bg-purple-600 hover:bg-purple-700 text-white disabled:opacity-50"
                >
                  Send to {selectedChatsForBulk.size} conversation{selectedChatsForBulk.size !== 1 ? 's' : ''}
                </Button>
              </div>
            ) : (
              <ActionButtons onSendMessage={handleSendMessage} message={message} channel={selectedChat.channel} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}