import React from 'react';
import { InboxProvider } from './store/InboxContext';
import { AppShell } from './components/layout/AppShell';

export default function App() {
  return (
    <InboxProvider>
      <AppShell />
    </InboxProvider>
  );
}
