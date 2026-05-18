import React, { useState } from 'react';
import { WatiNavigationCollapsible } from './WatiNavigationCollapsible';

interface WatiNavigationProps {
  children?: React.ReactNode;
  activeItem?: string;
  onItemClick?: (label: string) => void;
}

export function WatiNavigation({ children, activeItem, onItemClick }: WatiNavigationProps) {
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <WatiNavigationCollapsible
      isCollapsed={isCollapsed}
      onToggleCollapse={() => setIsCollapsed(prev => !prev)}
      activeItem={activeItem}
      onItemClick={onItemClick}
    />
  );
}
