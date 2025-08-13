'use client';

import { useParams } from 'next/navigation';
import { AppProvider } from '@/contexts/AppContext';
import ModulePage from '@/components/ModulePage';

export default function Module() {
  const params = useParams();
  const moduleId = params.moduleId;

  return (
    <AppProvider>
      <ModulePage moduleId={moduleId} />
    </AppProvider>
  );
} 