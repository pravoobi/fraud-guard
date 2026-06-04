'use client';

import { useApp } from '@/contexts/AppContext';
import { translations } from '@/translations';

export function useTranslation() {
  const { state } = useApp();
  const lang = state.settings.language || 'en';
  const dict = translations[lang] || translations.en;

  const t = (key, vars) => {
    let str = dict[key];
    if (str === undefined) str = translations.en[key];
    if (str === undefined) return key;
    if (vars) {
      Object.keys(vars).forEach((k) => {
        str = str.replace(new RegExp(`{{\\s*${k}\\s*}}`, 'g'), vars[k]);
      });
    }
    return str;
  };

  return { t, lang };
}
