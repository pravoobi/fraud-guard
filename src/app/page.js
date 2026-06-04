'use client';

import Link from 'next/link';
import { fraudModules } from '@/data/modules';
import { useTranslation } from '@/hooks/useTranslation';
import LanguageSwitcher from '@/components/LanguageSwitcher';

const totalModules = fraudModules.length;
const totalScenarios = fraudModules.reduce((sum, m) => sum + m.scenarios.length, 0);

export default function LandingPage() {
  const { t } = useTranslation();

  const scenarios = [1, 2, 3, 4, 5, 6].map((n) => ({
    id: n,
    title: t(`landing.test.s${n}.title`),
    scenario: t(`landing.test.s${n}.scenario`),
    choices: [
      { label: 'A', text: t(`landing.test.s${n}.c_a`) },
      { label: 'B', text: t(`landing.test.s${n}.c_b`) },
      { label: 'C', text: t(`landing.test.s${n}.c_c`) },
    ],
    outcomes: [
      t(`landing.test.s${n}.o_a`),
      t(`landing.test.s${n}.o_b`),
      ...(n === 3 ? [] : [t(`landing.test.s${n}.o_c`)]),
    ],
    feedback: t(`landing.test.s${n}.feedback`),
    icon: ['💳', '🏦', '📱', '🆔', '💰', '👮'][n - 1],
    color: [
      'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800',
      'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800',
      'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800',
      'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800',
      'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800',
      'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800',
    ][n - 1],
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="text-3xl">🛡️</div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t('brand.name')}</h1>
                <p className="text-sm text-gray-600 dark:text-gray-300">{t('brand.tagline_landing')}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <LanguageSwitcher />
              <div className="hidden md:flex items-center space-x-4">
                <Link
                  href="/dashboard"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                >
                  {t('common.start_learning')}
                </Link>
                <Link
                  href="/emergency"
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                >
                  {t('common.emergency_help')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="relative mb-8">
            <div className="max-w-4xl mx-auto relative">
              <div className="bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                  <div className="text-center">
                    <div className="text-4xl mb-3">📱</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">{t('landing.hero.mobile_security')}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-6xl mb-3">🛡️</div>
                    <div className="text-lg text-blue-600 dark:text-blue-400 font-bold">{t('brand.name')}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl mb-3">💳</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">{t('landing.hero.financial_safety')}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t('landing.hero.title')}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-6 max-w-3xl mx-auto">
            {t('landing.hero.subtitle')}
          </p>

          {/* Stat strip */}
          <div className="flex justify-center gap-6 sm:gap-12 mb-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{totalModules}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">{t('landing.stats.modules')}</div>
            </div>
            <div className="w-px bg-gray-200 dark:bg-gray-700 self-stretch"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">{totalScenarios}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">{t('landing.stats.scenarios')}</div>
            </div>
            <div className="w-px bg-gray-200 dark:bg-gray-700 self-stretch"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400">1</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">{t('landing.stats.certificate')}</div>
            </div>
          </div>

          <div className="hidden md:flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/dashboard"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold text-lg transition-colors flex items-center space-x-2"
            >
              <span>🎓</span>
              <span>{t('landing.cta.start')}</span>
            </Link>
            <Link
              href="/emergency"
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold text-lg transition-colors flex items-center space-x-2"
            >
              <span>🚨</span>
              <span>{t('landing.cta.need_help')}</span>
            </Link>
          </div>
        </div>

        {/* Quick Test Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-12 border border-gray-200 dark:border-gray-700">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{t('landing.test.heading')}</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              {t('landing.test.subheading')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {scenarios.map((scenario) => (
              <div key={scenario.id} className={`${scenario.color} rounded-xl p-6 border`}>
                <div className="flex items-start space-x-4 mb-4">
                  <div className="text-3xl">{scenario.icon}</div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {scenario.title}
                    </h3>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{t('landing.test.scenario_label')}</h4>
                  <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">
                    {scenario.scenario}
                  </p>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{t('landing.test.action_label')}</h4>
                  <div className="space-y-2">
                    {scenario.choices.map((choice, choiceIndex) => (
                      <div key={choiceIndex} className="text-sm text-gray-600 dark:text-gray-400">
                        <span className="font-medium">{choice.label})</span> {choice.text}
                      </div>
                    ))}
                  </div>
                </div>

                <details className="mb-4">
                  <summary className="font-semibold text-gray-900 dark:text-white cursor-pointer hover:text-blue-600 dark:hover:text-blue-400">
                    {t('landing.test.outcomes_toggle')}
                  </summary>
                  <div className="mt-2 space-y-1">
                    {scenario.outcomes.map((outcome, outcomeIndex) => (
                      <p key={outcomeIndex} className="text-sm text-gray-600 dark:text-gray-400">
                        {outcome}
                      </p>
                    ))}
                  </div>
                </details>

                <div className="bg-blue-100 dark:bg-blue-900/30 rounded-lg p-3">
                  <h5 className="font-semibold text-blue-900 dark:text-blue-200 mb-1">{t('landing.test.learning_label')}</h5>
                  <p className="text-blue-800 dark:text-blue-300 text-sm">
                    {scenario.feedback}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 text-center group hover:shadow-xl transition-shadow">
            <div className="relative mb-6">
              <div className="bg-blue-100 dark:bg-blue-900/20 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <div className="text-4xl">🎯</div>
              </div>
              <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                {t('landing.features.scenarios.live')}
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{t('landing.features.scenarios.title')}</h3>
            <p className="text-gray-600 dark:text-gray-300">
              {t('landing.features.scenarios.desc')}
            </p>
            <div className="mt-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3 text-left">
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">{t('landing.features.scenarios.sample_label')}</div>
              <div className="text-sm text-gray-700 dark:text-gray-300">{t('landing.features.scenarios.sample_text')}</div>
              <div className="flex space-x-2 mt-2">
                <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 text-center group hover:shadow-xl transition-shadow">
            <div className="relative mb-6">
              <div className="bg-green-100 dark:bg-green-900/20 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <div className="text-4xl">📊</div>
              </div>
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
                <div className="bg-blue-500 text-white text-xs px-2 py-1 rounded">
                  85%
                </div>
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{t('landing.features.progress.title')}</h3>
            <p className="text-gray-600 dark:text-gray-300">
              {t('landing.features.progress.desc')}
            </p>
            <div className="mt-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
              <div className="flex justify-center items-center mb-2">
                <div className="relative">
                  <svg className="w-16 h-16" viewBox="0 0 42 42">
                    <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#e5e7eb" strokeWidth="3" />
                    <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#3b82f6" strokeWidth="3" strokeDasharray="75 25" strokeDashoffset="25" strokeLinecap="round" transform="rotate(-90 21 21)" />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-bold text-blue-600">75%</span>
                  </div>
                </div>
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 text-center">{t('landing.features.progress.weekly')}</div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 text-center group hover:shadow-xl transition-shadow">
            <div className="relative mb-6">
              <div className="bg-red-100 dark:bg-red-900/20 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <div className="text-4xl">🚨</div>
              </div>
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
                <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{t('landing.features.emergency.title')}</h3>
            <p className="text-gray-600 dark:text-gray-300">
              {t('landing.features.emergency.desc')}
            </p>
            <div className="mt-4 bg-red-50 dark:bg-red-900/20 rounded-lg p-3 border border-red-200 dark:border-red-800">
              <div className="flex items-center justify-center space-x-2">
                <div className="text-lg">📞</div>
                <div className="text-sm font-semibold text-red-700 dark:text-red-300">1930</div>
                <div className="text-xs text-red-600 dark:text-red-400">{t('landing.features.emergency.cyber_crime')}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white mb-12 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-4 left-4 text-6xl">🛡️</div>
            <div className="absolute top-8 right-8 text-4xl">📱</div>
            <div className="absolute bottom-8 left-8 text-4xl">💳</div>
            <div className="absolute bottom-4 right-4 text-6xl">🔒</div>
          </div>

          <div className="relative z-10">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">{t('landing.stats_section.heading')}</h2>
              <p className="text-xl opacity-90">{t('landing.stats_section.subheading')}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="relative">
                <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
                  <div className="text-5xl mb-3">📊</div>
                  <div className="text-4xl font-bold mb-2">₹1,25,000 Cr</div>
                  <div className="text-lg opacity-90">{t('landing.stats_section.lost_label')}</div>
                </div>
              </div>
              <div className="relative">
                <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
                  <div className="text-5xl mb-3">🎯</div>
                  <div className="text-4xl font-bold mb-2">95%</div>
                  <div className="text-lg opacity-90">{t('landing.stats_section.preventable_label')}</div>
                </div>
              </div>
              <div className="relative">
                <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
                  <div className="text-5xl mb-3">📈</div>
                  <div className="text-4xl font-bold mb-2">1,30,000+</div>
                  <div className="text-lg opacity-90">{t('landing.stats_section.complaints_label')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-5 dark:opacity-10">
            <div className="absolute top-4 left-4 text-8xl">🛡️</div>
            <div className="absolute bottom-4 right-4 text-8xl">🎓</div>
          </div>

          <div className="relative z-10">
            <div className="flex justify-center mb-6">
              <div className="bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900/20 dark:to-blue-900/20 rounded-full p-4">
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <div className="text-2xl">👥</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">{t('landing.cta_section.users_protected')}</div>
                  </div>
                  <div className="text-3xl">→</div>
                  <div className="text-center">
                    <div className="text-2xl">🛡️</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">{t('landing.cta_section.fraud_aware')}</div>
                  </div>
                  <div className="text-3xl">→</div>
                  <div className="text-center">
                    <div className="text-2xl">✅</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">{t('landing.cta_section.safe_secure')}</div>
                  </div>
                </div>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{t('landing.cta_section.heading')}</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              {t('landing.cta_section.subheading')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/dashboard"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold text-lg transition-colors inline-block"
              >
                {t('landing.cta.start_now')}
              </Link>
              <Link
                href="/bank-helplines"
                className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white px-8 py-3 rounded-lg font-semibold text-lg transition-colors inline-block"
              >
                {t('landing.cta.view_helplines')}
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 dark:bg-gray-800 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <div className="text-2xl">🛡️</div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">{t('brand.name')}</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {t('brand.footer_text')}
            </p>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              <Link href="/dashboard" className="text-blue-600 hover:text-blue-700 dark:text-blue-400">
                {t('common.learning_modules')}
              </Link>
              <Link href="/emergency" className="text-blue-600 hover:text-blue-700 dark:text-blue-400">
                {t('common.emergency_help')}
              </Link>
              <Link href="/bank-helplines" className="text-blue-600 hover:text-blue-700 dark:text-blue-400">
                {t('common.bank_helplines')}
              </Link>
              <Link href="/certificate" className="text-blue-600 hover:text-blue-700 dark:text-blue-400">
                {t('common.certificate')}
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
