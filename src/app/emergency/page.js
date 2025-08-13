'use client';

import Link from 'next/link';

export default function EmergencyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-red-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-4 hover:opacity-80 transition-opacity">
              <div className="text-3xl">🛡️</div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">FraudGuard</h1>
                <p className="text-sm text-gray-600 dark:text-gray-300">Emergency Help</p>
              </div>
            </Link>
            <div className="flex items-center space-x-4">
              <Link 
                href="/"
                className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
              >
                ← Home
              </Link>
              <Link 
                href="/dashboard"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
              >
                Dashboard
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Emergency Alert */}
        <div className="bg-red-100 dark:bg-red-900/20 border border-red-300 dark:border-red-700 rounded-xl p-6 mb-8">
          <div className="flex items-center space-x-4">
            <div className="text-4xl">🚨</div>
            <div>
              <h1 className="text-2xl font-bold text-red-900 dark:text-red-200">Emergency Fraud Assistance</h1>
              <p className="text-red-700 dark:text-red-300">If you're currently experiencing fraud, follow these steps immediately</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Immediate Actions */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">🚨 Immediate Actions</h2>
              
              <div className="space-y-4">
                <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 border border-red-200 dark:border-red-800">
                  <h3 className="font-semibold text-red-900 dark:text-red-200 mb-2">1. Stop All Transactions</h3>
                  <p className="text-red-800 dark:text-red-300 text-sm">
                    Immediately stop any ongoing transactions, especially if money is being transferred or personal information is being shared.
                  </p>
                </div>

                <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4 border border-orange-200 dark:border-orange-800">
                  <h3 className="font-semibold text-orange-900 dark:text-orange-200 mb-2">2. Contact Your Bank</h3>
                  <p className="text-orange-800 dark:text-orange-300 text-sm">
                    Call your bank's fraud helpline immediately to block your cards and accounts.
                  </p>
                </div>

                <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 border border-yellow-200 dark:border-yellow-800">
                  <h3 className="font-semibold text-yellow-900 dark:text-yellow-200 mb-2">3. Report to Authorities</h3>
                  <p className="text-yellow-800 dark:text-yellow-300 text-sm">
                    File a complaint with the National Cyber Crime Portal (1930) or your local police station.
                  </p>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                  <h3 className="font-semibold text-blue-900 dark:text-blue-200 mb-2">4. Document Everything</h3>
                  <p className="text-blue-800 dark:text-blue-300 text-sm">
                    Take screenshots, save messages, and note down all details about the incident.
                  </p>
                </div>
              </div>
            </div>

            {/* Emergency Contacts */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">📞 Emergency Contacts</h2>
              
              <div className="space-y-4">
                <div className="bg-red-100 dark:bg-red-900/20 rounded-lg p-4 border border-red-300 dark:border-red-700">
                  <h3 className="font-semibold text-red-900 dark:text-red-200 mb-2">National Cyber Crime Portal</h3>
                  <p className="text-red-800 dark:text-red-300 text-sm mb-2">Toll-free: 1930</p>
                  <p className="text-red-800 dark:text-red-300 text-sm">Website: cybercrime.gov.in</p>
                </div>

                <div className="bg-blue-100 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-300 dark:border-blue-700">
                  <h3 className="font-semibold text-blue-900 dark:text-blue-200 mb-2">Police Emergency</h3>
                  <p className="text-blue-800 dark:text-blue-300 text-sm mb-2">Dial: 100</p>
                  <p className="text-blue-800 dark:text-blue-300 text-sm">For immediate police assistance</p>
                </div>

                <div className="bg-green-100 dark:bg-green-900/20 rounded-lg p-4 border border-green-300 dark:border-green-700">
                  <h3 className="font-semibold text-green-900 dark:text-green-200 mb-2">Women Helpline</h3>
                  <p className="text-green-800 dark:text-green-300 text-sm mb-2">Toll-free: 1091</p>
                  <p className="text-green-800 dark:text-green-300 text-sm">For women in distress</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bank Helplines & Step-by-Step Guide */}
          <div className="space-y-6">
            {/* Bank Helplines */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">🏦 Bank Helplines</h2>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <span className="font-medium text-gray-900 dark:text-white">State Bank of India</span>
                  <span className="text-blue-600 dark:text-blue-400 font-semibold">1800-425-3800</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <span className="font-medium text-gray-900 dark:text-white">HDFC Bank</span>
                  <span className="text-blue-600 dark:text-blue-400 font-semibold">1800-266-4332</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <span className="font-medium text-gray-900 dark:text-white">ICICI Bank</span>
                  <span className="text-blue-600 dark:text-blue-400 font-semibold">1800-210-1004</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <span className="font-medium text-gray-900 dark:text-white">Axis Bank</span>
                  <span className="text-blue-600 dark:text-blue-400 font-semibold">1800-419-5577</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <span className="font-medium text-gray-900 dark:text-white">Kotak Mahindra</span>
                  <span className="text-blue-600 dark:text-blue-400 font-semibold">1800-419-6600</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <span className="font-medium text-gray-900 dark:text-white">Punjab National Bank</span>
                  <span className="text-blue-600 dark:text-blue-400 font-semibold">1800-180-2222</span>
                </div>
              </div>
            </div>

            {/* Step-by-Step Guide */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">📋 Step-by-Step Guide</h2>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold mt-0.5">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Assess the Situation</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Determine what type of fraud you're experiencing and how much information/money has been compromised.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold mt-0.5">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Secure Your Accounts</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Change passwords, enable 2FA, and block compromised cards immediately.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold mt-0.5">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">File Official Complaints</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Report to cybercrime portal, police, and your bank with all evidence.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold mt-0.5">
                    4
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Monitor & Follow Up</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Keep track of your complaint status and follow up regularly.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold mt-0.5">
                    5
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Learn & Prevent</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Use this experience to learn about fraud prevention and share with others.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Resources */}
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">📚 Additional Resources</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
              <h3 className="font-semibold text-blue-900 dark:text-blue-200 mb-2">🔒 Prevention Tips</h3>
              <p className="text-blue-800 dark:text-blue-300 text-sm mb-3">Learn how to protect yourself from future fraud attempts.</p>
                             <Link href="/dashboard" className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline">
                Start Learning →
              </Link>
            </div>

            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
              <h3 className="font-semibold text-green-900 dark:text-green-200 mb-2">📱 Digital Security</h3>
              <p className="text-green-800 dark:text-green-300 text-sm mb-3">Best practices for securing your digital devices and accounts.</p>
              <Link href="/dashboard" className="text-green-600 dark:text-green-400 text-sm font-medium hover:underline">
                Learn More →
              </Link>
            </div>

            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border border-purple-200 dark:border-purple-800">
              <h3 className="font-semibold text-purple-900 dark:text-purple-200 mb-2">👥 Community Support</h3>
              <p className="text-purple-800 dark:text-purple-300 text-sm mb-3">Connect with others who have experienced similar situations.</p>
              <Link href="/dashboard" className="text-purple-600 dark:text-purple-400 text-sm font-medium hover:underline">
                Join Community →
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 