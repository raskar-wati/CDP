import React, { useState } from 'react';
import { Check, Search } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

export interface FilterOption {
  name: string;
  count: number;
}

interface FilterPopoverProps {
  title: string;
  searchPlaceholder: string;
  options: FilterOption[];
  defaultLabel: string;
  totalCount: number;
  value: string | null;
  onChange: (value: string | null) => void;
  children: React.ReactNode;
}

export function FilterPopover({
  title,
  searchPlaceholder,
  options,
  defaultLabel,
  totalCount,
  value,
  onChange,
  children,
}: FilterPopoverProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');

  const filtered = query
    ? options.filter(o => o.name.toLowerCase().includes(query.toLowerCase()))
    : options;

  const handleSelect = (name: string | null) => {
    onChange(name);
    setOpen(false);
    setQuery('');
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="w-64 p-0" align="end" sideOffset={6}>
        {/* Header + search */}
        <div className="px-3 pt-3 pb-2 border-b border-gray-100">
          <p className="text-xs font-semibold text-gray-700 mb-2">{title}</p>
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder={searchPlaceholder}
              className="w-full pl-7 pr-3 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#23a455] focus:border-[#23a455] bg-white text-gray-800 placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* Options list */}
        <div className="max-h-60 overflow-y-auto">
          {/* "All" row — only shown when search is empty */}
          {!query && (
            <button
              onClick={() => handleSelect(null)}
              className="w-full flex items-center justify-between px-3 py-2 text-sm hover:bg-gray-50 transition-colors"
            >
              <span className={value === null ? 'font-medium text-gray-900' : 'text-gray-700'}>
                {defaultLabel}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400">{totalCount}</span>
                {value === null && <Check className="w-3.5 h-3.5 text-[#23a455]" />}
              </div>
            </button>
          )}

          {filtered.map(option => (
            <button
              key={option.name}
              onClick={() => handleSelect(option.name)}
              className="w-full flex items-center justify-between px-3 py-2 text-sm hover:bg-gray-50 transition-colors"
            >
              <span className={value === option.name ? 'font-medium text-gray-900' : 'text-gray-700'}>
                {option.name}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400">{option.count}</span>
                {value === option.name && <Check className="w-3.5 h-3.5 text-[#23a455]" />}
              </div>
            </button>
          ))}

          {filtered.length === 0 && query && (
            <div className="px-3 py-4 text-sm text-gray-400 text-center">
              No results for "{query}"
            </div>
          )}
        </div>

        {/* Clear link — only shown when a specific option is selected */}
        {value !== null && (
          <div className="px-3 py-2 border-t border-gray-100">
            <button
              onClick={() => handleSelect(null)}
              className="text-xs text-gray-500 hover:text-gray-700 transition-colors"
            >
              Clear
            </button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
