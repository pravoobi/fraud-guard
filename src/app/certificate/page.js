'use client';

import { useState, useRef, useCallback } from 'react';
import { useApp } from '@/contexts/AppContext';
import { useTranslation } from '@/hooks/useTranslation';
import { fraudModules } from '@/data/modules';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import Link from 'next/link';

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function TwitterXIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

function CopyIcon({ success }) {
  if (success) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-green-600">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function CertificateContent() {
  const { state, dispatch } = useApp();
  const { t } = useTranslation();
  const [editing, setEditing] = useState(false);
  const [nameInput, setNameInput] = useState('');
  const [capturing, setCapturing] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const certRef = useRef(null);

  const completedModules = fraudModules.filter(
    m => state.progress.modulesProgress[m.id]?.completed
  );
  const allComplete = completedModules.length === fraudModules.length;

  const overallScore = allComplete
    ? Math.round(
        fraudModules.reduce(
          (acc, m) => acc + (state.progress.modulesProgress[m.id]?.score || 0),
          0
        ) / fraudModules.length
      )
    : 0;

  const completionDate = allComplete
    ? new Date(
        Math.max(
          ...fraudModules.map(m =>
            new Date(state.progress.modulesProgress[m.id]?.completedAt || 0).getTime()
          )
        )
      ).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
    : '';

  const displayName = state.user.name || t('certificate.your_name');

  const saveName = () => {
    if (nameInput.trim()) {
      dispatch({ type: 'SET_USER', payload: { name: nameInput.trim() } });
      setEditing(false);
    }
  };

  const captureDataUrl = useCallback(async () => {
    if (!certRef.current) return null;
    setCapturing(true);
    try {
      const { toPng } = await import('html-to-image');
      const node = certRef.current;
      // margin:0 prevents mx-auto offset from shifting content inside the SVG foreignObject
      const opts = { pixelRatio: 2, backgroundColor: '#ffffff', style: { margin: '0' } };
      await toPng(node, opts); // first pass warms up fonts
      return await toPng(node, opts);
    } finally {
      setCapturing(false);
    }
  }, []);

  function dataUrlToBlob(dataUrl) {
    const [header, data] = dataUrl.split(',');
    const mime = header.match(/:(.*?);/)[1];
    const binary = atob(data);
    const arr = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) arr[i] = binary.charCodeAt(i);
    return new Blob([arr], { type: mime });
  }

  const handleDownload = async () => {
    const dataUrl = await captureDataUrl();
    if (!dataUrl) return;
    const link = document.createElement('a');
    link.download = `fraudguard-certificate-${displayName.replace(/\s+/g, '-').toLowerCase()}.png`;
    link.href = dataUrl;
    link.click();
  };

  const handleCopy = async () => {
    const dataUrl = await captureDataUrl();
    if (!dataUrl) return;
    const blob = dataUrlToBlob(dataUrl);
    try {
      await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch {
      handleDownload();
    }
  };

  const shareText = t('certificate.share_text', { score: overallScore });

  const handleShare = async (platform) => {
    if (platform === 'native') {
      const dataUrl = await captureDataUrl();
      if (!dataUrl) return;
      const blob = dataUrlToBlob(dataUrl);
      const file = new File([blob], 'fraudguard-certificate.png', { type: 'image/png' });
      if (navigator.share && navigator.canShare?.({ files: [file] })) {
        try { await navigator.share({ files: [file], title: 'FraudGuard Certificate', text: shareText }); }
        catch { /* dismissed */ }
      } else {
        handleDownload();
      }
      return;
    }
    const urls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`,
      linkedin: `https://www.linkedin.com/shareArticle?mini=true&title=${encodeURIComponent('FraudGuard Fraud Awareness Certificate')}&summary=${encodeURIComponent(shareText)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(shareText)}`,
    };
    window.open(urls[platform], '_blank', 'noopener,noreferrer,width=620,height=520');
  };

  if (!allComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 max-w-md w-full text-center border border-gray-200 dark:border-gray-700">
          <div className="flex justify-end mb-2"><LanguageSwitcher /></div>
          <div className="text-5xl mb-4">🏆</div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{t('certificate.earn_title')}</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {t('certificate.earn_text', { count: fraudModules.length })}
          </p>
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 mb-6 text-left">
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
              <span>{t('certificate.progress_label')}</span>
              <span>{t('certificate.modules_unit', { done: completedModules.length, total: fraudModules.length })}</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-3 mb-4">
              <div
                className="bg-blue-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${(completedModules.length / fraudModules.length) * 100}%` }}
              />
            </div>
            <div className="space-y-2">
              {fraudModules.map(m => {
                const done = state.progress.modulesProgress[m.id]?.completed;
                return (
                  <div key={m.id} className="flex items-center gap-2 text-sm">
                    <span className={done ? 'text-green-600' : 'text-gray-400'}>
                      {done ? '✓' : '○'}
                    </span>
                    <span className={done ? 'text-gray-700 dark:text-gray-300' : 'text-gray-400 dark:text-gray-500'}>
                      {t(`modules.${m.id}.title`)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
          <Link
            href="/dashboard"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold inline-block transition-colors"
          >
            {t('common.continue_learning')} →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 py-8 px-4">

      {/* Actions bar */}
      <div className="max-w-3xl mx-auto mb-4 flex justify-between items-center print:hidden">
        <Link href="/dashboard" className="text-blue-600 hover:text-blue-700 font-medium">
          {t('common.back_to_dashboard')}
        </Link>
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <button
            onClick={() => window.print()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-semibold transition-colors"
          >
            {t('common.print_pdf')}
          </button>
        </div>
      </div>

      {/* Share bar */}
      <div className="max-w-3xl mx-auto mb-6 print:hidden">
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 px-5 py-4">
          <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-3 text-center">
            {t('certificate.share_heading')}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => handleShare('linkedin')}
              disabled={capturing}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0A66C2] hover:bg-[#004182] text-white text-sm font-semibold transition-colors disabled:opacity-50"
            >
              <LinkedInIcon />
              LinkedIn
            </button>
            <button
              onClick={() => handleShare('twitter')}
              disabled={capturing}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-black hover:bg-gray-800 text-white text-sm font-semibold transition-colors disabled:opacity-50"
            >
              <TwitterXIcon />
              X / Twitter
            </button>
            <button
              onClick={() => handleShare('whatsapp')}
              disabled={capturing}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#25D366] hover:bg-[#128C7E] text-white text-sm font-semibold transition-colors disabled:opacity-50"
            >
              <WhatsAppIcon />
              WhatsApp
            </button>
            <button
              onClick={handleCopy}
              disabled={capturing}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 text-sm font-semibold transition-colors disabled:opacity-50"
            >
              <CopyIcon success={copySuccess} />
              {copySuccess ? t('certificate.share_copied') : t('certificate.share_copy')}
            </button>
            <button
              onClick={handleDownload}
              disabled={capturing}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 text-sm font-semibold transition-colors disabled:opacity-50"
            >
              <DownloadIcon />
              {capturing ? t('certificate.share_generating') : t('certificate.share_download')}
            </button>
          </div>
        </div>
      </div>

      {/* Certificate */}
      <div
        ref={certRef}
        className="max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden border-4 border-blue-600 print:shadow-none"
      >
        {/* Header band */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-700 py-10 px-8 text-center text-white">
          <div className="text-5xl mb-3">🛡️</div>
          <div className="text-xs font-bold tracking-widest uppercase opacity-80 mb-1">
            {t('certificate.heading')}
          </div>
          <h1 className="text-4xl font-bold">{t('brand.name')}</h1>
          <div className="text-sm opacity-80 mt-1">{t('certificate.subheading')}</div>
        </div>

        {/* Body */}
        <div className="px-10 py-8 text-center">
          <p className="text-gray-500 text-lg mb-3">{t('certificate.this_certifies')}</p>

          {/* Recipient name */}
          {editing ? (
            <div className="mb-6">
              <input
                type="text"
                value={nameInput}
                onChange={e => setNameInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && saveName()}
                placeholder="Enter your full name"
                autoFocus
                className="text-center text-2xl font-bold text-gray-900 border-b-2 border-blue-600 focus:outline-none w-full max-w-sm py-1 bg-transparent"
              />
              <div className="mt-3 flex justify-center gap-2">
                <button
                  onClick={saveName}
                  disabled={!nameInput.trim()}
                  className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-4 py-1.5 rounded-lg text-sm font-semibold transition-colors"
                >
                  {t('common.save')}
                </button>
                <button
                  onClick={() => setEditing(false)}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-1.5 rounded-lg text-sm font-semibold transition-colors"
                >
                  {t('common.cancel')}
                </button>
              </div>
            </div>
          ) : (
            <div className="mb-6 inline-flex items-center gap-2">
              <span className="text-3xl font-bold text-gray-900 border-b-2 border-blue-600 pb-0.5">
                {displayName}
              </span>
              <button
                onClick={() => { setNameInput(state.user.name || ''); setEditing(true); }}
                className="text-gray-400 hover:text-blue-600 transition-colors print:hidden"
                aria-label="Edit name"
              >
                ✏️
              </button>
            </div>
          )}

          <p className="text-gray-600 text-base mb-8 max-w-lg mx-auto leading-relaxed">
            {t('certificate.body_text')}
          </p>

          {/* Score band */}
          <div className="bg-blue-50 rounded-xl p-6 mb-8 inline-block min-w-[300px]">
            <div className="text-5xl font-bold text-blue-700 mb-1">{overallScore}%</div>
            <div className="text-gray-500 text-sm mb-3">{t('certificate.overall_score')}</div>
            <div className="grid grid-cols-3 gap-4 text-sm text-gray-500">
              <div>
                <div className="font-bold text-gray-800 text-lg">{fraudModules.length}</div>
                {t('common.modules')}
              </div>
              <div>
                <div className="font-bold text-gray-800 text-lg">{state.user.totalScenariosCompleted}</div>
                {t('common.scenarios')}
              </div>
              <div>
                <div className="font-bold text-gray-800 text-lg">{state.user.badges.length}</div>
                {t('common.badges')}
              </div>
            </div>
          </div>

          {/* Module completion grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8 text-left">
            {fraudModules.map(m => (
              <div
                key={m.id}
                className="flex items-center gap-2 bg-green-50 rounded-lg px-3 py-2 border border-green-100"
              >
                <span className="text-green-600 font-bold">✓</span>
                <span className="text-sm text-gray-700 font-medium leading-tight">{t(`modules.${m.id}.title`)}</span>
              </div>
            ))}
          </div>

          {/* Footer row */}
          <div className="flex justify-between items-end pt-6 border-t border-gray-200 text-sm">
            <div className="text-left">
              <div className="text-gray-400 text-xs mb-0.5">{t('certificate.completed_on')}</div>
              <div className="text-gray-700 font-semibold">{completionDate}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-0.5">🛡️</div>
              <div className="text-xs text-gray-400">{t('brand.name')}</div>
            </div>
            <div className="text-right">
              <div className="text-gray-400 text-xs mb-0.5">{t('certificate.issued_by')}</div>
              <div className="text-gray-700 font-semibold">{t('brand.name')}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Print styles */}
      <style>{`
        @media print {
          body { background: white; }
          .print\\:hidden { display: none !important; }
          .print\\:shadow-none { box-shadow: none !important; }
        }
      `}</style>
    </div>
  );
}

export default function CertificatePage() {
  return <CertificateContent />;
}
