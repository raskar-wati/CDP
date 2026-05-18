import React, { useState } from 'react';
import { useInbox } from '../../store/InboxContext';
import { WatiNav } from './WatiNav';
import { Sidebar } from './Sidebar';
import { ChatList } from '../inbox/ChatList';
import { ChatWindow } from '../conversation/ChatWindow';
import { ContactPanel } from '../contact/ContactPanel';
import { PulsePage } from '../ai/PulsePage';

export function AppShell() {
  const { activeView } = useInbox();
  const [isContactVisible, setIsContactVisible] = useState(true);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-gray-50">
      <WatiNav />
      <Sidebar />

      {activeView === 'inbox' ? (
        <>
          <ChatList />
          <ChatWindow
            isContactVisible={isContactVisible}
            onToggleContact={() => setIsContactVisible(v => !v)}
          />
          {isContactVisible && <ContactPanel onClose={() => setIsContactVisible(false)} />}
        </>
      ) : (
        <div className="flex-1 min-w-0 overflow-hidden">
          <PulsePage />
        </div>
      )}
    </div>
  );
}
