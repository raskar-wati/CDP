import React, { useState } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';
import { CustomDropdown } from './CustomDropdown';
import { CustomInput } from './CustomInput';
import ModalBg from '../imports/ModalBg';
import Checkbox from '../imports/Checkbox-36-141';

interface FilterSegment {
  attribute: string;
  operation: string;
  value: string;
}

interface FilterDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: FilterSegment[], showOldChatsFirst: boolean, saveAsCustom?: boolean, customFilterName?: string) => void;
}

const ATTRIBUTE_OPTIONS = [
  { value: 'attribute', label: 'Attribute' },
  { value: 'assignee', label: 'Assignee' },
  { value: 'status', label: 'Status' },
  { value: 'team', label: 'Team' },
  { value: 'tag', label: 'Tag' }
];

const OPERATION_OPTIONS = [
  { value: 'equals', label: 'Equals' },
  { value: 'contains', label: 'Contains' },
  { value: 'starts_with', label: 'Starts with' },
  { value: 'ends_with', label: 'Ends with' },
  { value: 'not_equals', label: 'Not equals' },
  { value: 'is_empty', label: 'Is empty' },
  { value: 'is_not_empty', label: 'Is not empty' }
];

const ASSIGNEE_OPTIONS = [
  { value: 'john_doe', label: 'John Doe' },
  { value: 'jane_smith', label: 'Jane Smith' },
  { value: 'mike_wilson', label: 'Mike Wilson' },
  { value: 'sarah_johnson', label: 'Sarah Johnson' },
  { value: 'unassigned', label: 'Unassigned' }
];

const STATUS_OPTIONS = [
  { value: 'open', label: 'Open' },
  { value: 'solved', label: 'Solved' },
  { value: 'pending', label: 'Pending' },
  { value: 'closed', label: 'Closed' },
  { value: 'on_hold', label: 'On Hold' }
];

const TEAM_OPTIONS = [
  { value: 'sales', label: 'Sales Team' },
  { value: 'support', label: 'Support Team' },
  { value: 'marketing', label: 'Marketing Team' },
  { value: 'technical', label: 'Technical Team' },
  { value: 'management', label: 'Management' }
];

const TAG_OPTIONS = [
  { value: 'vip', label: 'VIP Customer' },
  { value: 'urgent', label: 'Urgent' },
  { value: 'follow_up', label: 'Follow Up' },
  { value: 'new_customer', label: 'New Customer' },
  { value: 'complaint', label: 'Complaint' },
  { value: 'feature_request', label: 'Feature Request' }
];

export function FilterDialog({ isOpen, onClose, onApply }: FilterDialogProps) {
  const [segments, setSegments] = useState<FilterSegment[]>([
    { attribute: 'attribute', operation: '', value: '' }
  ]);
  const [showOldChatsFirst, setShowOldChatsFirst] = useState(false);
  const [saveAsCustomFilter, setSaveAsCustomFilter] = useState(false);
  const [customFilterName, setCustomFilterName] = useState('');

  if (!isOpen) return null;

  const handleAddSegment = () => {
    setSegments([...segments, { attribute: 'attribute', operation: '', value: '' }]);
  };

  const handleDeleteSegment = (index: number) => {
    if (segments.length > 1) {
      const newSegments = segments.filter((_, i) => i !== index);
      setSegments(newSegments);
    }
  };

  const handleSegmentChange = (index: number, field: keyof FilterSegment, value: string) => {
    const newSegments = [...segments];
    newSegments[index] = { ...newSegments[index], [field]: value };
    
    // Reset operation and value when attribute changes to non-attribute
    if (field === 'attribute' && value !== 'attribute') {
      newSegments[index].operation = '';
      newSegments[index].value = '';
    }
    
    setSegments(newSegments);
  };

  const handleApply = () => {
    onApply(segments, showOldChatsFirst, saveAsCustomFilter, customFilterName);
    onClose();
  };

  const handleReset = () => {
    const resetSegments = [{ attribute: 'attribute', operation: '', value: '' }];
    setSegments(resetSegments);
    setShowOldChatsFirst(false);
    setSaveAsCustomFilter(false);
    setCustomFilterName('');
    // Apply the reset state to the parent component
    onApply(resetSegments, false, false, '');
  };

  const getSecondaryOptions = (attributeType: string) => {
    switch (attributeType) {
      case 'assignee':
        return ASSIGNEE_OPTIONS;
      case 'status':
        return STATUS_OPTIONS;
      case 'team':
        return TEAM_OPTIONS;
      case 'tag':
        return TAG_OPTIONS;
      default:
        return [];
    }
  };

  const getSecondaryPlaceholder = (attributeType: string) => {
    switch (attributeType) {
      case 'assignee':
        return 'Select Assignee';
      case 'status':
        return 'Select Status';
      case 'team':
        return 'Select Team';
      case 'tag':
        return 'Select Tag';
      default:
        return 'Select Value';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop using ModalBg component */}
      <div 
        className="absolute inset-0"
        onClick={onClose}
      >
        <ModalBg />
      </div>
      
      {/* Dialog */}
      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-2xl mx-4">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Filter Conversations</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-md transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-4 space-y-4">
          {segments.map((segment, index) => (
            <div key={index} className="space-y-3">
              {/* Conditional field layout based on attribute selection */}
              <div className="flex items-center gap-3">
                {segment.attribute === 'attribute' ? (
                  // Show all four fields when "Attribute" is selected
                  <div className="grid grid-cols-4 gap-3 flex-1">
                    <div>
                      <CustomDropdown
                        placeholder="Attribute"
                        options={ATTRIBUTE_OPTIONS}
                        value={segment.attribute}
                        onChange={(value) => handleSegmentChange(index, 'attribute', value)}
                      />
                    </div>
                    <div>
                      <CustomDropdown
                        placeholder="Operation"
                        options={OPERATION_OPTIONS}
                        value={segment.operation}
                        onChange={(value) => handleSegmentChange(index, 'operation', value)}
                      />
                    </div>
                    <div>
                      <CustomInput
                        placeholder="Value"
                        value={segment.value}
                        onChange={(value) => handleSegmentChange(index, 'value', value)}
                      />
                    </div>
                    <div>
                      <CustomDropdown
                        placeholder="Condition"
                        options={[
                          { value: 'and', label: 'AND' },
                          { value: 'or', label: 'OR' }
                        ]}
                        value=""
                        onChange={() => {}}
                      />
                    </div>
                  </div>
                ) : (
                  // Show only two fields when other options are selected - first dropdown same width as in grid, second dropdown full width
                  <div className="flex gap-3 flex-1">
                    <div className="w-1/4 min-w-0">
                      <CustomDropdown
                        placeholder="Attribute"
                        options={ATTRIBUTE_OPTIONS}
                        value={segment.attribute}
                        onChange={(value) => handleSegmentChange(index, 'attribute', value)}
                      />
                    </div>
                    <div className="w-3/4 min-w-0">
                      <CustomDropdown
                        placeholder={getSecondaryPlaceholder(segment.attribute)}
                        options={getSecondaryOptions(segment.attribute)}
                        value={segment.operation} // Using operation field to store the secondary value
                        onChange={(value) => handleSegmentChange(index, 'operation', value)}
                      />
                    </div>
                  </div>
                )}
                
                {/* Delete button - only show if more than one segment */}
                {segments.length > 1 && (
                  <button
                    onClick={() => handleDeleteSegment(index)}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors flex-shrink-0"
                    title="Delete segment"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))}

          {/* Add new Segment button */}
          <button
            onClick={handleAddSegment}
            className="flex items-center space-x-2 text-sm text-green-600 hover:text-green-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add new Segment</span>
          </button>

          {/* Show old chats first checkbox */}
          <div className="flex items-center space-x-2 pt-2">
            <div 
              className="w-4 h-4 cursor-pointer"
              onClick={() => setShowOldChatsFirst(!showOldChatsFirst)}
            >
              {showOldChatsFirst ? (
                <Checkbox />
              ) : (
                <div className="w-4 h-4 border border-gray-300 rounded bg-white" />
              )}
            </div>
            <label 
              htmlFor="showOldChats" 
              className="text-sm text-gray-700 cursor-pointer"
              onClick={() => setShowOldChatsFirst(!showOldChatsFirst)}
            >
              Show old chats first
            </label>
          </div>

          {/* Save as custom filter checkbox */}
          <div className="flex flex-col space-y-2 pt-2">
            <div className="flex items-center space-x-2">
              <div 
                className="w-4 h-4 cursor-pointer"
                onClick={() => setSaveAsCustomFilter(!saveAsCustomFilter)}
              >
                {saveAsCustomFilter ? (
                  <Checkbox />
                ) : (
                  <div className="w-4 h-4 border border-gray-300 rounded bg-white" />
                )}
              </div>
              <label 
                htmlFor="saveCustomFilter" 
                className="text-sm text-gray-700 cursor-pointer"
                onClick={() => setSaveAsCustomFilter(!saveAsCustomFilter)}
              >
                Save this as custom filter
              </label>
            </div>
            
            {/* Custom filter name input - only show when checkbox is checked */}
            {saveAsCustomFilter && (
              <div className="ml-6">
                <CustomInput
                  placeholder="Enter filter name"
                  value={customFilterName}
                  onChange={setCustomFilterName}
                />
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end px-6 py-4 border-t border-gray-200 space-x-3">
          <button
            onClick={handleReset}
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md transition-colors"
          >
            Reset
          </button>
          <button
            onClick={handleApply}
            className="px-6 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition-colors"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}