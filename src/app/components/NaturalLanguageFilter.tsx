import React, { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Search, Sparkles } from 'lucide-react';

interface ParsedFilter {
  filter?: string;
  channel?: string;
  dateRange?: {
    from?: Date;
    to?: Date;
  };
}

interface NaturalLanguageFilterProps {
  onFilterApply: (parsedFilter: ParsedFilter) => void;
  placeholder?: string;
}

export function NaturalLanguageFilter({ onFilterApply, placeholder = "Try: 'show unread WhatsApp messages from today'" }: NaturalLanguageFilterProps) {
  const [query, setQuery] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // Natural language parsing logic
  const parseNaturalLanguage = (input: string): ParsedFilter => {
    const lowercaseInput = input.toLowerCase();
    const result: ParsedFilter = {};

    // Channel detection
    if (lowercaseInput.includes('whatsapp') || lowercaseInput.includes('wa')) {
      result.channel = 'WhatsApp';
    } else if (lowercaseInput.includes('instagram') || lowercaseInput.includes('ig')) {
      result.channel = 'Instagram';
    } else if (lowercaseInput.includes('messenger') || lowercaseInput.includes('facebook')) {
      result.channel = 'Messenger';
    } else if (lowercaseInput.includes('sms') || lowercaseInput.includes('text')) {
      result.channel = 'SMS';
    } else if (lowercaseInput.includes('rcs')) {
      result.channel = 'RCS';
    }

    // Filter/Status detection
    if (lowercaseInput.includes('unread') || lowercaseInput.includes('new')) {
      // We'll need to add an unread filter to the system
      result.filter = 'Unread';
    } else if (lowercaseInput.includes('solved') || lowercaseInput.includes('resolved') || lowercaseInput.includes('closed')) {
      result.filter = 'Solved';
    } else if (lowercaseInput.includes('open') || lowercaseInput.includes('active')) {
      result.filter = 'Active Chats';
    } else if (lowercaseInput.includes('assigned to me') || lowercaseInput.includes('my chats')) {
      result.filter = 'Assigned to me';
    } else if (lowercaseInput.includes('unassigned')) {
      result.filter = 'Unassigned';
    } else if (lowercaseInput.includes('favourites') || lowercaseInput.includes('favorites') || lowercaseInput.includes('starred')) {
      result.filter = 'Favourites';
    } else if (lowercaseInput.includes('sales')) {
      result.filter = 'Sales';
    } else if (lowercaseInput.includes('support')) {
      result.filter = 'Support';
    } else if (lowercaseInput.includes('broadcasts') || lowercaseInput.includes('broadcast')) {
      result.filter = 'Broadcasts';
    } else if (lowercaseInput.includes('expiring') || lowercaseInput.includes('expire')) {
      result.filter = 'Expiring Soon';
    }

    // Date detection
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const weekAgo = new Date(today);
    weekAgo.setDate(today.getDate() - 7);

    if (lowercaseInput.includes('today')) {
      const startOfToday = new Date(today);
      startOfToday.setHours(0, 0, 0, 0);
      const endOfToday = new Date(today);
      endOfToday.setHours(23, 59, 59, 999);
      result.dateRange = { from: startOfToday, to: endOfToday };
    } else if (lowercaseInput.includes('yesterday')) {
      const startOfYesterday = new Date(yesterday);
      startOfYesterday.setHours(0, 0, 0, 0);
      const endOfYesterday = new Date(yesterday);
      endOfYesterday.setHours(23, 59, 59, 999);
      result.dateRange = { from: startOfYesterday, to: endOfYesterday };
    } else if (lowercaseInput.includes('last week') || lowercaseInput.includes('past week')) {
      result.dateRange = { from: weekAgo, to: today };
    } else if (lowercaseInput.includes('last 24 hours') || lowercaseInput.includes('24 hours')) {
      const twentyFourHoursAgo = new Date(today.getTime() - (24 * 60 * 60 * 1000));
      result.dateRange = { from: twentyFourHoursAgo, to: today };
    }

    return result;
  };

  const handleSearch = async () => {
    if (!query.trim()) return;

    setIsProcessing(true);
    
    // Simulate processing delay for better UX
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const parsedFilter = parseNaturalLanguage(query);
    console.log('📝 Natural language query:', query);
    console.log('🎯 Parsed filters:', parsedFilter);
    
    onFilterApply(parsedFilter);
    setIsProcessing(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const exampleQueries = [
    "show unread WhatsApp messages",
    "find solved Instagram chats",
    "show me today's conversations",
    "unread messages from yesterday",
    "active support chats",
    "sales messages from last week"
  ];

  return (
    <div className="border-b border-gray-200" style={{ background: 'linear-gradient(to right, #EDF1FA, #EDF1FA)' }}>
      {/* Always visible header with toggle */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-3 flex items-center justify-between hover:bg-white/20 transition-colors"
      >
        <div className="flex items-center space-x-2">
          <Sparkles className="w-4 h-4" style={{ color: '#173DA6' }} />
          <span className="text-sm font-medium" style={{ color: '#091840' }}>Smart Filter</span>
        </div>
        <div className={`transform transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}>
          <svg className="w-4 h-4" style={{ color: '#173DA6' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {/* Collapsible content */}
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
        isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="p-4 pt-0 space-y-3">
          {/* Search Input */}
          <div className="flex space-x-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={placeholder}
                className="pl-10 bg-white border-gray-300 focus:border-[#173DA6] focus:ring-[#173DA6]"
                disabled={isProcessing}
              />
            </div>
            <Button
              onClick={handleSearch}
              disabled={!query.trim() || isProcessing}
              style={{ backgroundColor: '#173DA6' }}
              className="hover:opacity-90 text-white"
              size="sm"
            >
              {isProcessing ? (
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin" />
                  <span>Processing...</span>
                </div>
              ) : (
                'Search'
              )}
            </Button>
          </div>

          {/* Example Queries */}
          <div className="flex gap-1 overflow-x-auto scrollbar-hide pb-1">
            {exampleQueries.map((example, index) => (
              <button
                key={index}
                onClick={() => setQuery(example)}
                className="text-xs px-2 py-1 bg-white border rounded-full hover:bg-white/80 transition-colors whitespace-nowrap flex-shrink-0"
                style={{ borderColor: '#173DA6', color: '#173DA6' }}
              >
                {example}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}