'use client';

import { useState } from 'react';
import { AppProvider } from '@/contexts/AppContext';
import { useApp } from '@/contexts/AppContext';
import { fraudModules } from '@/data/modules';
import Link from 'next/link';

function CertificateContent() {
  const { state, dispatch } = useApp();
  const [editing, setEditing] = useState(false);
  const [nameInput, setNameInput] = useState('');

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

  const displayName = state.user.name || 'Your Name';

  const saveName = () => {
    if (nameInput.trim()) {
      dispatch({ type: 'SET_USER', payload: { name: nameInput.trim() } });
      setEditing(false);
    }
  };

  if (!allComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 max-w-md w-full text-center border border-gray-200 dark:border-gray-700">
          <div className="text-5xl mb-4">🏆</div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Earn Your Certificate</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Complete all {fraudModules.length} modules to earn your Fraud Awareness certificate.
          </p>
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 mb-6 text-left">
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
              <span>Progress</span>
              <span>{completedModules.length}/{fraudModules.length} modules</span>
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
                      {m.title}
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
            Continue Learning →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 py-8 px-4">

      {/* Actions bar — hidden on print */}
      <div className="max-w-3xl mx-auto mb-6 flex justify-between items-center print:hidden">
        <Link href="/dashboard" className="text-blue-600 hover:text-blue-700 font-medium">
          ← Dashboard
        </Link>
        <button
          onClick={() => window.print()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-semibold transition-colors"
        >
          🖨️ Print / Save as PDF
        </button>
      </div>

      {/* Certificate */}
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden border-4 border-blue-600 print:shadow-none">

        {/* Header band */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-700 py-10 px-8 text-center text-white">
          <div className="text-5xl mb-3">🛡️</div>
          <div className="text-xs font-bold tracking-widest uppercase opacity-80 mb-1">
            Certificate of Completion
          </div>
          <h1 className="text-4xl font-bold">FraudGuard</h1>
          <div className="text-sm opacity-80 mt-1">Fraud Awareness Training Program</div>
        </div>

        {/* Body */}
        <div className="px-10 py-8 text-center">

          <p className="text-gray-500 text-lg mb-3">This certifies that</p>

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
                  Save
                </button>
                <button
                  onClick={() => setEditing(false)}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-1.5 rounded-lg text-sm font-semibold transition-colors"
                >
                  Cancel
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
            has successfully completed the <strong>FraudGuard Fraud Awareness</strong> training
            program, demonstrating proficiency in identifying and responding to digital fraud,
            scams, and cybercrime.
          </p>

          {/* Score band */}
          <div className="bg-blue-50 rounded-xl p-6 mb-8 inline-block min-w-[300px]">
            <div className="text-5xl font-bold text-blue-700 mb-1">{overallScore}%</div>
            <div className="text-gray-500 text-sm mb-3">Overall Score</div>
            <div className="grid grid-cols-3 gap-4 text-sm text-gray-500">
              <div>
                <div className="font-bold text-gray-800 text-lg">{fraudModules.length}</div>
                Modules
              </div>
              <div>
                <div className="font-bold text-gray-800 text-lg">{state.user.totalScenariosCompleted}</div>
                Scenarios
              </div>
              <div>
                <div className="font-bold text-gray-800 text-lg">{state.user.badges.length}</div>
                Badges
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
                <span className="text-sm text-gray-700 font-medium leading-tight">{m.title}</span>
              </div>
            ))}
          </div>

          {/* Footer row */}
          <div className="flex justify-between items-end pt-6 border-t border-gray-200 text-sm">
            <div className="text-left">
              <div className="text-gray-400 text-xs mb-0.5">Completed on</div>
              <div className="text-gray-700 font-semibold">{completionDate}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-0.5">🛡️</div>
              <div className="text-xs text-gray-400">FraudGuard</div>
            </div>
            <div className="text-right">
              <div className="text-gray-400 text-xs mb-0.5">Issued by</div>
              <div className="text-gray-700 font-semibold">FraudGuard</div>
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
  return (
    <AppProvider>
      <CertificateContent />
    </AppProvider>
  );
}
