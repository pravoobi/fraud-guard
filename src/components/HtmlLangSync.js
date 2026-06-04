'use client';

import { useEffect } from 'react';
import { useApp } from '@/contexts/AppContext';

export default function HtmlLangSync() {
  const { state } = useApp();
  const lang = state.settings.language || 'en';

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return null;
}
