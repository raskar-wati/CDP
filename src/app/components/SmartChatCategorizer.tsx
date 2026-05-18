// Types - simplified to avoid import issues
interface Chat {
  id: string;
  name: string;
  status: 'Open' | 'Solved' | 'Broadcast';
  channel: string;
  unread: boolean;
  category: string;
  date: Date;
}

interface Message {
  id: string;
  text: string;
  sender: 'customer' | 'agent';
  timestamp: string;
}

// Enhanced interface for smart filters
export interface SmartFilter {
  id: string;
  name: string;
  description: string;
  count: number;
  priority: number; // Higher number = higher priority
  icon: string;
  color: string;
  chatIds: string[];
}

// Highly optimized categorization logic
export class SmartChatCategorizer {
  static categorizeChats(chats: Chat[], messages: Record<string, Message[]>): SmartFilter[] {
    // Pre-initialize filters
    const filters = {
      needsAttention: { chatIds: [], count: 0 },
      aiReplies: { chatIds: [], count: 0 },
      repeatQueries: { chatIds: [], count: 0 },
      escalated: { chatIds: [], count: 0 },
      newInquiry: { chatIds: [], count: 0 },
      convert: { chatIds: [], count: 0 },
      churn: { chatIds: [], count: 0 },
      awaitingReply: { chatIds: [], count: 0 },
      likelySpam: { chatIds: [], count: 0 },
      interested: { chatIds: [], count: 0 },
      converted: { chatIds: [], count: 0 },
      uncategorised: { chatIds: [], count: 0 }
    };

    // Track all chats that have been categorized
    const categorizedChatIds = new Set<string>();

    // Single pass through chats
    chats.forEach(chat => {
      try {
        const isRecent = this.isRecentActivity(chat);
        const isSupport = chat.category === 'Support';
        const isSales = chat.category === 'Sales';
        const isOpen = chat.status === 'Open';
        let wasCategorized = false;

        // Needs Attention - unread + (support or recent)
        if (chat.unread && (isSupport || isRecent)) {
          filters.needsAttention.chatIds.push(chat.id);
          wasCategorized = true;
        }

        // AI Drafted Replies - check if has questions (limit message check)
        const chatMessages = messages[chat.id];
        if (chatMessages && chatMessages.length > 0 && this.hasQuestions(chatMessages)) {
          filters.aiReplies.chatIds.push(chat.id);
          wasCategorized = true;
        }

        // Repeat Queries - check for multiple customer questions
        if (chatMessages && chatMessages.length > 0 && this.hasRepeatQueries(chatMessages)) {
          filters.repeatQueries.chatIds.push(chat.id);
          wasCategorized = true;
        }

        // Escalated - open support issues
        if (isSupport && isOpen) {
          filters.escalated.chatIds.push(chat.id);
          wasCategorized = true;
        }

        // Likely to Convert - open sales conversations, but not stale (7+ days silent → drop off risk instead)
        const daysSilent = (Date.now() - chat.date.getTime()) / (1000 * 60 * 60 * 24);
        const isStale = daysSilent >= 7;
        if (isSales && isOpen && !isStale) {
          filters.convert.chatIds.push(chat.id);
          wasCategorized = true;
        }

        // Likely to Churn - old open support chats, OR stale Ready-to-buy that decayed
        if ((isSupport && !isRecent) || (isSales && isOpen && isStale)) {
          filters.churn.chatIds.push(chat.id);
          wasCategorized = true;
        }

        // Awaiting Reply - customer sent last message and hasn't received a response
        if (chatMessages && this.isAwaitingReply(chatMessages)) {
          filters.awaitingReply.chatIds.push(chat.id);
          wasCategorized = true;
        }

        // Likely Spam - suspicious patterns or repetitive messages
        if (chatMessages && this.isLikelySpam(chatMessages, chat)) {
          filters.likelySpam.chatIds.push(chat.id);
          wasCategorized = true;
        }

        // New inquiry - open chat with only the first customer message, no agent reply yet
        const isNewInquiry = isOpen && (!chatMessages || chatMessages.length <= 1 ||
          (chatMessages.length <= 2 && chatMessages[0]?.sender === 'customer' && chatMessages.every(m => m.sender === 'customer')));
        if (isNewInquiry) {
          filters.newInquiry.chatIds.push(chat.id);
          wasCategorized = true;
        }

        // Interested - initial engagement, asking questions, browsing (more than 1 msg but still early)
        if (isSales && chatMessages && chatMessages.length > 1 && chatMessages.length <= 3) {
          filters.interested.chatIds.push(chat.id);
          wasCategorized = true;
        }

        // Converted - solved sales chats (successful purchases)
        if (isSales && chat.status === 'Solved') {
          filters.converted.chatIds.push(chat.id);
          wasCategorized = true;
        }

        // Track categorized chats
        if (wasCategorized) {
          categorizedChatIds.add(chat.id);
        }
      } catch (error) {
        // Silently continue on error
      }
    });

    // After categorizing, find all uncategorised chats
    chats.forEach(chat => {
      if (!categorizedChatIds.has(chat.id)) {
        filters.uncategorised.chatIds.push(chat.id);
      }
    });

    // Add some mock uncategorised chats for demo (always include a few chats)
    // Pick some chats that might have been categorized and add them to uncategorised anyway
    const mockUncategorisedIds = ['2', '3', '14', '15'];
    mockUncategorisedIds.forEach(id => {
      if (!filters.uncategorised.chatIds.includes(id)) {
        filters.uncategorised.chatIds.push(id);
      }
    });

    // Build result array with strict priority ordering
    const smartFilters: SmartFilter[] = [
      // Priority 1: Urgency/Severity Signals
      {
        id: 'escalated',
        name: 'Escalated',
        description: 'Issues flagged for manager attention',
        count: filters.escalated.chatIds.length,
        priority: 100, // Highest priority
        icon: '⬆️',
        color: 'bg-orange-50 text-orange-700',
        chatIds: filters.escalated.chatIds
      },
      {
        id: 'likely-convert',
        name: 'Ready to buy',
        description: 'Sales conversations with high conversion potential',
        count: filters.convert.chatIds.length,
        priority: 99,
        icon: '💰',
        color: 'bg-green-50 text-green-700',
        chatIds: filters.convert.chatIds
      },
      {
        id: 'likely-churn',
        name: 'Drop off risk',
        description: 'Customers showing signs of dropping off',
        count: filters.churn.chatIds.length,
        priority: 98,
        icon: '⚠️',
        color: 'bg-yellow-50 text-yellow-700',
        chatIds: filters.churn.chatIds
      },
      // Priority 2: Awaiting Reply
      {
        id: 'awaiting-reply',
        name: 'Awaiting Reply',
        description: 'Customers waiting for your response',
        count: filters.awaitingReply.chatIds.length,
        priority: 50,
        icon: '⏰',
        color: 'bg-indigo-50 text-indigo-700',
        chatIds: filters.awaitingReply.chatIds
      },
      // Priority 3: Buying Journey Stages
      {
        id: 'new-inquiry',
        name: 'New inquiry',
        description: 'Fresh enquiries with no agent response yet',
        count: filters.newInquiry.chatIds.length,
        priority: 26,
        icon: '🆕',
        color: 'bg-sky-50 text-sky-700',
        chatIds: filters.newInquiry.chatIds
      },
      {
        id: 'repeat-queries',
        name: 'Negotiating',
        description: 'Customers in active negotiation or discussion',
        count: filters.repeatQueries.chatIds.length,
        priority: 30,
        icon: '🔄',
        color: 'bg-purple-50 text-purple-700',
        chatIds: filters.repeatQueries.chatIds
      },
      {
        id: 'ai-drafted-replies',
        name: 'Evaluating',
        description: 'Customers evaluating products or services',
        count: filters.aiReplies.chatIds.length,
        priority: 29,
        icon: '🤖',
        color: 'bg-blue-50 text-blue-700',
        chatIds: filters.aiReplies.chatIds
      },
      {
        id: 'interested',
        name: 'Interested',
        description: 'Initial engagement and interest',
        count: filters.interested.chatIds.length,
        priority: 28,
        icon: '👀',
        color: 'bg-cyan-50 text-cyan-700',
        chatIds: filters.interested.chatIds
      },
      {
        id: 'converted',
        name: 'Converted',
        description: 'Successfully completed purchases',
        count: filters.converted.chatIds.length,
        priority: 27,
        icon: '✅',
        color: 'bg-teal-50 text-teal-700',
        chatIds: filters.converted.chatIds
      },
      // Lower priority items
      {
        id: 'likely-spam',
        name: 'Likely Spam',
        description: 'Messages flagged as potential spam',
        count: filters.likelySpam.chatIds.length,
        priority: 2,
        icon: '🚫',
        color: 'bg-gray-50 text-gray-700',
        chatIds: filters.likelySpam.chatIds
      },
      {
        id: 'uncategorised',
        name: 'Uncategorised',
        description: 'Contacts without enough CDP data',
        count: filters.uncategorised.chatIds.length,
        priority: 1,
        icon: '❓',
        color: 'bg-gray-50 text-gray-600',
        chatIds: filters.uncategorised.chatIds
      }
    ];

    return smartFilters.filter(filter => filter.count > 0);
  }

  private static hasQuestions(messages: Message[]): boolean {
    // Check only last 3 messages for performance
    const recentMessages = messages.slice(-3);
    return recentMessages.some(msg => msg.text.includes('?') && msg.sender === 'customer');
  }

  private static hasRepeatQueries(messages: Message[]): boolean {
    try {
      const customerMessages = messages.filter(msg => msg.sender === 'customer');
      
      // Need at least 2 customer messages
      if (customerMessages.length < 2) return false;
      
      // Check for multiple questions
      const questionMessages = customerMessages.filter(msg => msg.text.includes('?'));
      if (questionMessages.length >= 2) return true;
      
      // Check for follow-up patterns (limit to recent messages for performance)
      const recentCustomerMessages = customerMessages.slice(-4);
      
      // Keywords that indicate follow-up or repeat queries
      const followUpPatterns = [
        'can you', 'could you', 'would you', 'will you',
        'what about', 'how about', 'also', 'and',
        'still', 'again', 'more', 'another',
        'clarify', 'explain', 'understand', 'confused',
        'wait', 'but', 'however', 'actually'
      ];
      
      // Check for similar topics or follow-up patterns
      let hasFollowUpPattern = false;
      for (let i = 1; i < recentCustomerMessages.length; i++) {
        const currentMsg = recentCustomerMessages[i].text.toLowerCase();
        const prevMsg = recentCustomerMessages[i-1].text.toLowerCase();
        
        // Check for follow-up patterns in current message
        if (followUpPatterns.some(pattern => currentMsg.includes(pattern))) {
          hasFollowUpPattern = true;
          break;
        }
        
        // Check for repeated keywords (simple similarity check)
        const currentWords = currentMsg.split(' ').filter(word => word.length > 3);
        const prevWords = prevMsg.split(' ').filter(word => word.length > 3);
        
        const commonWords = currentWords.filter(word => prevWords.includes(word));
        if (commonWords.length >= 2) {
          hasFollowUpPattern = true;
          break;
        }
      }
      
      return hasFollowUpPattern;
    } catch (error) {
      return false;
    }
  }

  private static isRecentActivity(chat: Chat): boolean {
    try {
      const now = Date.now();
      const chatTime = chat.date.getTime();
      const hoursDiff = (now - chatTime) / (1000 * 60 * 60);
      return hoursDiff <= 24;
    } catch (error) {
      return false;
    }
  }

  private static isAwaitingReply(messages: Message[]): boolean {
    try {
      if (!messages || messages.length === 0) return false;
      
      // Get the last message
      const lastMessage = messages[messages.length - 1];
      
      // If last message is from customer, they're awaiting a reply
      if (lastMessage.sender === 'customer') {
        // Check if it's been more than 1 hour since the last customer message
        // For demo purposes, we'll consider all customer-last messages as awaiting reply
        return true;
      }
      
      return false;
    } catch (error) {
      return false;
    }
  }

  private static isLikelySpam(messages: Message[], chat: Chat): boolean {
    try {
      if (!messages || messages.length === 0) return false;
      
      const customerMessages = messages.filter(msg => msg.sender === 'customer');
      if (customerMessages.length === 0) return false;
      
      // Spam indicators
      let spamScore = 0;
      
      // 1. Very short conversation with no agent response
      if (customerMessages.length === 1 && messages.length === 1) {
        spamScore += 2;
      }
      
      // 2. Repetitive messages
      const messageTexts = customerMessages.map(msg => msg.text.toLowerCase().trim());
      const uniqueTexts = new Set(messageTexts);
      if (messageTexts.length > 1 && uniqueTexts.size < messageTexts.length * 0.7) {
        spamScore += 3;
      }
      
      // 3. Suspicious patterns in text
      const spamKeywords = [
        'win', 'winner', 'congratulations', 'prize', 'lottery',
        'click here', 'urgent', 'act now', 'limited time',
        'free money', 'cash', 'earn', 'make money',
        'viagra', 'pills', 'medication', 'pharmacy',
        'loan', 'credit', 'debt', 'investment',
        'scam', 'fraud', 'phishing'
      ];
      
      const allText = customerMessages.map(msg => msg.text.toLowerCase()).join(' ');
      const foundSpamKeywords = spamKeywords.filter(keyword => allText.includes(keyword));
      spamScore += foundSpamKeywords.length;
      
      // 4. Multiple exclamation marks or all caps
      if (allText.includes('!!!') || allText === allText.toUpperCase()) {
        spamScore += 2;
      }
      
      // 5. Very short messages with links or suspicious patterns
      const hasLinks = customerMessages.some(msg => 
        msg.text.includes('http') || msg.text.includes('www.') || msg.text.includes('.com')
      );
      if (hasLinks && customerMessages.length === 1) {
        spamScore += 3;
      }
      
      // 6. Random character sequences or gibberish
      const hasGibberish = customerMessages.some(msg => {
        const text = msg.text.replace(/[^a-zA-Z]/g, '');
        return text.length > 10 && text.match(/[a-z]{10,}/) === null;
      });
      if (hasGibberish) {
        spamScore += 2;
      }
      
      // Consider it spam if score is 4 or higher
      return spamScore >= 4;
    } catch (error) {
      return false;
    }
  }
}