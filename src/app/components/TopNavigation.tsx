import React from 'react';
import Header from '../imports/Header';

export default function TopNavigation() {
  return (
    <div className="w-full h-[50px] flex-shrink-0 overflow-hidden border-b border-gray-200">
      <div className="w-full h-full relative">
        <Header />
      </div>
    </div>
  );
}