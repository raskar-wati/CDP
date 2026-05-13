import React, { useState, useEffect } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Input } from './ui/input';
import { Checkbox } from './ui/checkbox';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Search, Check } from 'lucide-react';

interface Account {
  id: string;
  name: string;
  isSelected: boolean;
}

interface ChannelPopoverProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedAccounts: string[];
  onAccountsChange: (accounts: string[]) => void;
  children: React.ReactNode;
  selectedChannel: string;
  channelCount: number;
  channelType: 'WhatsApp' | 'Instagram' | 'Messenger' | 'SMS';
}

const mockAccounts = {
  WhatsApp: [
    { id: 'term-insurance', name: 'Term insurance', isSelected: false },
    { id: 'health-insurance', name: 'Health insurance', isSelected: false },
    { id: 'motor-insurance', name: 'Motor insurance', isSelected: false },
    { id: 'general-support', name: 'General Support', isSelected: false },
    { id: 'post-insurance-followup', name: 'Post-insurance follow up', isSelected: false },
    { id: 'claim-status-inquiry', name: 'Claim status inquiry', isSelected: false },
    { id: 'policy-renewal-reminder', name: 'Policy renewal reminder', isSelected: false },
    { id: 'coverage-explanation-call', name: 'Coverage explanation call', isSelected: false },
    { id: 'premium-payment-assistance', name: 'Premium payment assistance', isSelected: false },
    { id: 'customer-feedback-survey', name: 'Customer feedback survey', isSelected: false }
  ],
  Instagram: [
    { id: 'lifestyle-brand', name: 'Lifestyle Brand', isSelected: false },
    { id: 'fashion-store', name: 'Fashion Store', isSelected: false },
    { id: 'tech-reviews', name: 'Tech Reviews', isSelected: false },
    { id: 'food-blog', name: 'Food Blog', isSelected: false },
    { id: 'fitness-coach', name: 'Fitness Coach', isSelected: false },
    { id: 'travel-guide', name: 'Travel Guide', isSelected: false },
    { id: 'beauty-tips', name: 'Beauty Tips', isSelected: false },
    { id: 'photography', name: 'Photography', isSelected: false }
  ],
  Messenger: [
    { id: 'customer-support', name: 'Customer Support', isSelected: false },
    { id: 'sales-inquiries', name: 'Sales Inquiries', isSelected: false },
    { id: 'product-updates', name: 'Product Updates', isSelected: false },
    { id: 'booking-service', name: 'Booking Service', isSelected: false },
    { id: 'technical-help', name: 'Technical Help', isSelected: false },
    { id: 'feedback-collection', name: 'Feedback Collection', isSelected: false }
  ],
  SMS: [
    { id: 'appointment-reminders', name: 'Appointment Reminders', isSelected: false },
    { id: 'order-notifications', name: 'Order Notifications', isSelected: false },
    { id: 'payment-alerts', name: 'Payment Alerts', isSelected: false },
    { id: 'delivery-updates', name: 'Delivery Updates', isSelected: false },
    { id: 'customer-verification', name: 'Customer Verification', isSelected: false }
  ]
};

const channelColors = {
  WhatsApp: { indicator: 'bg-green-500', text: 'text-green-600' },
  Instagram: { indicator: 'bg-purple-500', text: 'text-purple-600' },
  Messenger: { indicator: 'bg-blue-500', text: 'text-blue-600' },
  SMS: { indicator: 'bg-orange-500', text: 'text-orange-600' }
};

export function ChannelPopover({ 
  isOpen,
  onOpenChange,
  selectedAccounts, 
  onAccountsChange,
  children,
  selectedChannel,
  channelCount,
  channelType
}: ChannelPopoverProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [accounts, setAccounts] = useState<Account[]>(mockAccounts[channelType]);
  const [allSelected, setAllSelected] = useState(false);

  // Update accounts based on selectedAccounts prop
  useEffect(() => {
    setAccounts(prev => 
      prev.map(account => ({
        ...account,
        isSelected: selectedAccounts.includes(account.id)
      }))
    );
  }, [selectedAccounts]);

  // Reset accounts when channel type changes
  useEffect(() => {
    setAccounts(mockAccounts[channelType]);
    setSearchTerm('');
  }, [channelType]);

  // Update allSelected state based on current selections
  useEffect(() => {
    const filteredAccounts = accounts.filter(account => 
      account.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const selectedFiltered = filteredAccounts.filter(account => account.isSelected);
    setAllSelected(filteredAccounts.length > 0 && selectedFiltered.length === filteredAccounts.length);
  }, [accounts, searchTerm]);

  const filteredAccounts = accounts.filter(account =>
    account.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAccountToggle = (accountId: string) => {
    const newSelectedAccounts = selectedAccounts.includes(accountId)
      ? selectedAccounts.filter(id => id !== accountId)
      : [...selectedAccounts, accountId];
    
    onAccountsChange(newSelectedAccounts);
  };

  const handleAllAccountsToggle = () => {
    const filteredAccountIds = filteredAccounts.map(account => account.id);
    
    if (allSelected) {
      // Deselect all filtered accounts
      const newSelectedAccounts = selectedAccounts.filter(id => !filteredAccountIds.includes(id));
      onAccountsChange(newSelectedAccounts);
    } else {
      // Select all filtered accounts
      const newSelectedAccounts = [...new Set([...selectedAccounts, ...filteredAccountIds])];
      onAccountsChange(newSelectedAccounts);
    }
  };

  const selectedCount = selectedAccounts.length;
  const colors = channelColors[channelType];

  return (
    <Popover open={isOpen} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        {children}
      </PopoverTrigger>
      <PopoverContent 
        className="w-80 p-0" 
        side="right" 
        align="start"
        sideOffset={8}
      >
        <div className="p-4 space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 ${colors.indicator} rounded-full`} />
              <span className="font-medium">
                {channelType}
                {selectedCount > 0 && ` (${selectedCount})`}
              </span>
            </div>
          </div>

          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search Account"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-8"
            />
          </div>

          {/* All Accounts Option */}
          <div className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-md">
            <Checkbox
              id="all-accounts"
              checked={allSelected}
              onCheckedChange={handleAllAccountsToggle}
            />
            <label
              htmlFor="all-accounts"
              className="text-sm font-medium cursor-pointer flex-1"
            >
              All Accounts
            </label>
          </div>

          {/* Account List */}
          <div className="max-h-64 overflow-y-auto space-y-1 border-t pt-2">
            {filteredAccounts.map((account) => (
              <div
                key={account.id}
                className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-md"
              >
                <Checkbox
                  id={account.id}
                  checked={account.isSelected}
                  onCheckedChange={() => handleAccountToggle(account.id)}
                />
                <label
                  htmlFor={account.id}
                  className="text-sm cursor-pointer flex-1"
                >
                  {account.name}
                </label>
                {account.isSelected && (
                  <Check className={`w-4 h-4 ${colors.text}`} />
                )}
              </div>
            ))}
          </div>

          {filteredAccounts.length === 0 && (
            <div className="text-center py-4 text-gray-500 text-sm">
              No accounts found
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}