import React from 'react';

interface CustomInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  type?: string;
}

export function CustomInput({ 
  placeholder = "", 
  value = "", 
  onChange, 
  className = "",
  type = "text"
}: CustomInputProps) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      className={`w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-sm text-gray-900 placeholder-gray-500 ${className}`}
    />
  );
}