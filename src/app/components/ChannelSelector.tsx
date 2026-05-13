import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Input } from './ui/input';
import { Checkbox } from './ui/checkbox';
import { Button } from './ui/button';
import { Search, Check } from 'lucide-react';

interface WhatsAppAccount {
  id: string;
  name: string;
  isSelected: boolean;
}

interface ChannelSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  selectedAccounts: string[];
  onAccountsChange: (accounts: string[]) => void;
}

const mockWhatsAppAccounts: WhatsAppAccount[] = [
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
];

export function ChannelSelector({ 
  isOpen, 
  onClose, 
  selectedAccounts, 
  onAccountsChange 
}: ChannelSelectorProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [accounts, setAccounts] = useState<WhatsAppAccount[]>(mockWhatsAppAccounts);
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

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>WhatsApp Accounts ({selectedCount})</span>
          </DialogTitle>
          <DialogDescription>
            Select the WhatsApp accounts you want to filter by. You can search for specific accounts or select all.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search Account"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
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
          <div className="max-h-64 overflow-y-auto space-y-1">
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
                  <Check className="w-4 h-4 text-green-600" />
                )}
              </div>
            ))}
          </div>

          {filteredAccounts.length === 0 && (
            <div className="text-center py-4 text-gray-500 text-sm">
              No accounts found
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end space-x-2 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={onClose} className="bg-green-600 hover:bg-green-700">
              Apply ({selectedCount})
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}