import React, { useState } from 'react';
import { Button } from './ui/button';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Calendar } from './ui/calendar';
import { Badge } from './ui/badge';
import { Calendar as CalendarIcon, X } from 'lucide-react';

export interface DateRange {
  from: Date | undefined;
  to: Date | undefined;
}

export interface DateFilterProps {
  selectedRange: DateRange;
  onRangeChange: (range: DateRange) => void;
  onClear: () => void;
}

type PresetKey = 'today' | 'yesterday' | 'last7days' | 'last30days' | 'custom';

interface DatePreset {
  key: PresetKey;
  label: string;
  getRange: () => DateRange;
  shortLabel: string;
}

const DATE_PRESETS: DatePreset[] = [
  {
    key: 'today',
    label: 'Today',
    shortLabel: 'Today',
    getRange: () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const endOfDay = new Date();
      endOfDay.setHours(23, 59, 59, 999);
      return { from: today, to: endOfDay };
    }
  },
  {
    key: 'yesterday',
    label: 'Yesterday',
    shortLabel: 'Yesterday',
    getRange: () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      yesterday.setHours(0, 0, 0, 0);
      const endOfYesterday = new Date();
      endOfYesterday.setDate(endOfYesterday.getDate() - 1);
      endOfYesterday.setHours(23, 59, 59, 999);
      return { from: yesterday, to: endOfYesterday };
    }
  },
  {
    key: 'last7days',
    label: 'Last 7 days',
    shortLabel: 'Last 7 days',
    getRange: () => {
      const from = new Date();
      from.setDate(from.getDate() - 6);
      from.setHours(0, 0, 0, 0);
      const to = new Date();
      to.setHours(23, 59, 59, 999);
      return { from, to };
    }
  },
  {
    key: 'last30days',
    label: 'Last 30 days',
    shortLabel: 'Last 30 days',
    getRange: () => {
      const from = new Date();
      from.setDate(from.getDate() - 29);
      from.setHours(0, 0, 0, 0);
      const to = new Date();
      to.setHours(23, 59, 59, 999);
      return { from, to };
    }
  }
];

export function DateFilter({ selectedRange, onRangeChange, onClear }: DateFilterProps) {
  const [isCustomPickerOpen, setIsCustomPickerOpen] = useState(false);
  const [tempRange, setTempRange] = useState<DateRange>({ from: undefined, to: undefined });

  const getActivePreset = (): PresetKey | null => {
    if (!selectedRange.from || !selectedRange.to) return null;

    for (const preset of DATE_PRESETS) {
      const presetRange = preset.getRange();
      if (presetRange.from && presetRange.to && 
          selectedRange.from.getTime() === presetRange.from.getTime() &&
          selectedRange.to.getTime() === presetRange.to.getTime()) {
        return preset.key;
      }
    }
    return 'custom';
  };

  const activePreset = getActivePreset();
  const isActive = selectedRange.from && selectedRange.to;

  const handlePresetClick = (preset: DatePreset) => {
    const range = preset.getRange();
    onRangeChange(range);
  };

  const handleCustomRangeApply = () => {
    if (tempRange.from && tempRange.to) {
      onRangeChange(tempRange);
    }
    setIsCustomPickerOpen(false);
  };

  const handleCustomRangeCancel = () => {
    setTempRange({ from: undefined, to: undefined });
    setIsCustomPickerOpen(false);
  };

  const formatDateRange = (range: DateRange): string => {
    if (!range.from || !range.to) return '';
    
    const formatDate = (date: Date) => {
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: date.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined
      });
    };

    if (range.from.toDateString() === range.to.toDateString()) {
      return formatDate(range.from);
    }
    
    return `${formatDate(range.from)} - ${formatDate(range.to)}`;
  };

  const getDisplayText = (): string => {
    if (!isActive) return 'Filter by date';
    
    if (activePreset && activePreset !== 'custom') {
      const preset = DATE_PRESETS.find(p => p.key === activePreset);
      return preset?.shortLabel || formatDateRange(selectedRange);
    }
    
    return formatDateRange(selectedRange);
  };

  return (
    <div className="px-4 py-3 border-b border-gray-200 bg-white">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 flex-1">
          {/* Quick Preset Buttons */}
          <div className="flex items-center gap-1">
            {DATE_PRESETS.map((preset) => (
              <Button
                key={preset.key}
                variant={activePreset === preset.key ? "default" : "ghost"}
                size="sm"
                onClick={() => handlePresetClick(preset)}
                className="h-8 px-3 text-xs"
              >
                {preset.label}
              </Button>
            ))}
            
            {/* Custom Date Range Picker */}
            <Popover open={isCustomPickerOpen} onOpenChange={setIsCustomPickerOpen}>
              <PopoverTrigger>
                <Button
                  variant={activePreset === 'custom' ? "default" : "ghost"}
                  size="sm"
                  className="h-8 px-3 text-xs"
                  onClick={() => setIsCustomPickerOpen(!isCustomPickerOpen)}
                >
                  <CalendarIcon className="w-3 h-3 mr-1" />
                  Custom
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-4" align="start">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Select Date Range</h4>
                    <Calendar
                      mode="range"
                      selected={tempRange}
                      onSelect={(range) => setTempRange(range || { from: undefined, to: undefined })}
                      numberOfMonths={2}
                      className="rounded-md border"
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" size="sm" onClick={handleCustomRangeCancel}>
                      Cancel
                    </Button>
                    <Button 
                      size="sm" 
                      onClick={handleCustomRangeApply}
                      disabled={!tempRange.from || !tempRange.to}
                    >
                      Apply
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Active Filter Display & Clear */}
        <div className="flex items-center gap-2">
          {isActive && (
            <>
              <Badge variant="secondary" className="text-xs">
                {getDisplayText()}
              </Badge>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClear}
                className="h-8 w-8 p-0"
              >
                <X className="w-3 h-3" />
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}