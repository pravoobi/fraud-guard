'use client';

import { useState, useRef, useEffect } from 'react';
import { useApp } from '@/contexts/AppContext';
import { supportedLanguages } from '@/translations';

export default function LanguageSwitcher({ compact = true }) {
  const { state, dispatch } = useApp();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const current = state.settings.language || 'en';
  const currentLang = supportedLanguages.find((l) => l.code === current) || supportedLanguages[0];

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const setLanguage = (code) => {
    dispatch({ type: 'UPDATE_SETTINGS', payload: { language: code, languageSelected: true } });
    setOpen(false);
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600 transition-colors"
        aria-label="Change language"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span aria-hidden="true">🌐</span>
        <span>{compact ? currentLang.code.toUpperCase() : currentLang.native}</span>
        <svg className="w-3 h-3 opacity-60" viewBox="0 0 12 12" fill="currentColor">
          <path d="M3 4.5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" fill="none" />
        </svg>
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute right-0 mt-2 w-44 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 overflow-hidden"
        >
          {supportedLanguages.map((lang) => (
            <li key={lang.code}>
              <button
                onClick={() => setLanguage(lang.code)}
                className={`w-full text-left px-4 py-2.5 text-sm flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                  current === lang.code ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 font-semibold' : 'text-gray-700 dark:text-gray-200'
                }`}
                role="option"
                aria-selected={current === lang.code}
              >
                <span>{lang.native}</span>
                {current === lang.code && <span className="text-blue-600">✓</span>}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
