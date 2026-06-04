'use client';

import { AppProvider } from '@/contexts/AppContext';
import LanguagePickerModal from '@/components/LanguagePickerModal';
import HtmlLangSync from '@/components/HtmlLangSync';

export default function Providers({ children }) {
  return (
    <AppProvider>
      <HtmlLangSync />
      {children}
      <LanguagePickerModal />
    </AppProvider>
  );
}
