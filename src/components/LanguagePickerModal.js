'use client';

import { useState, useEffect } from 'react';
import { useApp } from '@/contexts/AppContext';
import { useTranslation } from '@/hooks/useTranslation';
import { supportedLanguages } from '@/translations';

export default function LanguagePickerModal() {
  const { state, dispatch } = useApp();
  const { t } = useTranslation();
  const [hydrated, setHydrated] = useState(false);
  const [selected, setSelected] = useState(state.settings.language || 'en');

  // Wait until AppContext has hydrated from localStorage before deciding to show the modal.
  // Otherwise it would flash for returning users on first paint.
  useEffect(() => {
    const id = requestAnimationFrame(() => setHydrated(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    setSelected(state.settings.language || 'en');
  }, [state.settings.language]);

  const alreadyChosen = state.settings.languageSelected === true;
  if (!hydrated || alreadyChosen) return null;

  const confirm = () => {
    dispatch({ type: 'UPDATE_SETTINGS', payload: { language: selected, languageSelected: true } });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-6 border border-gray-200 dark:border-gray-700">
        <div className="text-center mb-6">
          <div className="text-4xl mb-2" aria-hidden="true">🌐</div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">{t('picker.title')}</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{t('picker.subtitle')}</p>
        </div>

        <div className="space-y-2 mb-6">
          {supportedLanguages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setSelected(lang.code)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-lg border-2 transition-colors text-left ${
                selected === lang.code
                  ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
              aria-pressed={selected === lang.code}
            >
              <div>
                <div className="font-semibold text-gray-900 dark:text-white">{lang.native}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{lang.label}</div>
              </div>
              {selected === lang.code && (
                <span className="text-blue-600 dark:text-blue-400 text-lg" aria-hidden="true">✓</span>
              )}
            </button>
          ))}
        </div>

        <button
          onClick={confirm}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors"
        >
          {t('picker.continue')}
        </button>
      </div>
    </div>
  );
}
