'use client';

import { AppProvider } from '@/contexts/AppContext';
import Dashboard from '@/components/Dashboard';

export default function DashboardPage() {
  return (
    <AppProvider>
      <Dashboard />
    </AppProvider>
  );
} 