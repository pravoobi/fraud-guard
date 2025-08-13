'use client';

import Link from 'next/link';
import { useApp } from '@/contexts/AppContext';
import { fraudModules } from '@/data/modules';
import ModuleCard from './ModuleCard';
import ProgressOverview from './ProgressOverview';
import FraudAwarenessScore from './FraudAwarenessScore';

export default function Dashboard() {
  const { state, dispatch } = useApp();

  const handleStartModule = (moduleId) => {
    dispatch({ type: 'START_MODULE', payload: { moduleId } });
    // Navigation to module page would go here
    window.location.href = `${process.env.NODE_ENV === 'production' ? '/fraud-guard' : ''}/module/${moduleId}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-4">
              <div className="text-3xl">🛡️</div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">FraudGuard</h1>
                <p className="text-sm text-gray-600 dark:text-gray-300">Fraud Awareness eLearning Platform</p>
              </div>
            </Link>
            <div className="flex items-center space-x-6">
              <FraudAwarenessScore score={state.user.fraudAwarenessScore} />
              <div className="text-sm text-gray-600 dark:text-gray-300">
                <div>Streak: <span className="font-semibold text-orange-600">{state.user.streak} days</span></div>
                <div>Modules: <span className="font-semibold text-green-600">{state.user.completedModules.length}/6</span></div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8 border border-gray-200 dark:border-gray-700">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Welcome to Fraud Awareness Training
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            Learn to protect yourself from digital fraud, scams, and cybercrime through interactive scenarios 
            and real-world simulations. Your safety is our priority.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
              <div className="text-2xl mb-2">🎯</div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Interactive Learning</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Experience real-world fraud scenarios in a safe environment
              </p>
            </div>
            
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6 border border-green-200 dark:border-green-800">
              <div className="text-2xl mb-2">📊</div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Track Progress</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Monitor your fraud awareness score and completed modules
              </p>
            </div>
            
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6 border border-purple-200 dark:border-purple-800">
              <div className="text-2xl mb-2">🏆</div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Earn Badges</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Complete modules to earn achievements and certificates
              </p>
            </div>
          </div>
        </div>

        {/* Progress Overview */}
        <ProgressOverview />

        {/* Learning Modules */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Learning Modules</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fraudModules.map((module) => (
              <ModuleCard
                key={module.id}
                module={module}
                progress={state.progress.modulesProgress[module.id]}
                onStart={() => handleStartModule(module.id)}
              />
            ))}
          </div>
        </div>

        {/* Emergency Help Section */}
        <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-8 border border-red-200 dark:border-red-800">
          <div className="flex items-center mb-4">
            <div className="text-3xl mr-4">🚨</div>
            <div>
              <h2 className="text-xl font-bold text-red-900 dark:text-red-200">Emergency Help</h2>
              <p className="text-red-700 dark:text-red-300">If you're currently experiencing fraud</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a 
              href="tel:1930"
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center"
            >
              📞 Report Fraud: 1930
            </a>
            <Link 
              href="/bank-helplines"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center"
            >
              🏦 Bank Helplines
            </Link>
            <Link 
              href="/emergency"
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center"
            >
              📋 Step-by-Step Guide
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
} 