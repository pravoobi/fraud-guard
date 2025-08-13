'use client';

import Link from 'next/link';

export default function BankHelplinesPage() {
  const banks = [
    {
      name: "State Bank of India",
      number: "1800-425-3800",
      website: "sbi.co.in",
      features: ["24/7 Support", "Card Blocking", "Account Freezing"]
    },
    {
      name: "HDFC Bank",
      number: "1800-266-4332",
      website: "hdfcbank.com",
      features: ["Fraud Reporting", "Card Replacement", "Account Security"]
    },
    {
      name: "ICICI Bank",
      number: "1800-210-1004",
      website: "icicibank.com",
      features: ["Cyber Security", "Transaction Monitoring", "Fraud Alerts"]
    },
    {
      name: "Axis Bank",
      number: "1800-419-5577",
      website: "axisbank.com",
      features: ["24/7 Helpline", "Card Blocking", "Account Protection"]
    },
    {
      name: "Kotak Mahindra Bank",
      number: "1800-419-6600",
      website: "kotak.com",
      features: ["Fraud Prevention", "Security Alerts", "Account Recovery"]
    },
    {
      name: "Punjab National Bank",
      number: "1800-180-2222",
      website: "pnb.co.in",
      features: ["Emergency Support", "Card Services", "Account Security"]
    },
    {
      name: "Bank of Baroda",
      number: "1800-102-4455",
      website: "bankofbaroda.in",
      features: ["24/7 Customer Care", "Fraud Reporting", "Account Management"]
    },
    {
      name: "Canara Bank",
      number: "1800-425-0018",
      website: "canarabank.com",
      features: ["Emergency Helpline", "Card Blocking", "Account Security"]
    },
    {
      name: "Union Bank of India",
      number: "1800-222-224",
      website: "unionbankofindia.co.in",
      features: ["Fraud Prevention", "24/7 Support", "Account Protection"]
    },
    {
      name: "Bank of India",
      number: "1800-220-229",
      website: "bankofindia.co.in",
      features: ["Emergency Services", "Card Management", "Account Security"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-4 hover:opacity-80 transition-opacity">
              <div className="text-3xl">🛡️</div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">FraudGuard</h1>
                <p className="text-sm text-gray-600 dark:text-gray-300">Bank Helplines</p>
              </div>
            </Link>
            <div className="flex items-center space-x-4">
              <Link 
                href="/emergency"
                className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
              >
                ← Emergency Help
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
        {/* Header Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8 border border-gray-200 dark:border-gray-700">
          <div className="text-center">
            <div className="text-4xl mb-4">🏦</div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Bank Helplines Directory</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              Contact your bank immediately if you suspect fraud or need to block your cards
            </p>
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
              <p className="text-blue-800 dark:text-blue-300 text-sm">
                <strong>Important:</strong> Call your bank's helpline immediately if you notice any suspicious activity on your account.
              </p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-6 border border-red-200 dark:border-red-800">
            <div className="text-2xl mb-3">🚨</div>
            <h3 className="font-semibold text-red-900 dark:text-red-200 mb-2">Emergency Blocking</h3>
            <p className="text-red-800 dark:text-red-300 text-sm">
              Call your bank immediately to block cards and freeze accounts if fraud is suspected.
            </p>
          </div>

          <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-6 border border-orange-200 dark:border-orange-800">
            <div className="text-2xl mb-3">📞</div>
            <h3 className="font-semibold text-orange-900 dark:text-orange-200 mb-2">24/7 Support</h3>
            <p className="text-orange-800 dark:text-orange-300 text-sm">
              Most banks offer round-the-clock customer support for fraud-related issues.
            </p>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6 border border-green-200 dark:border-green-800">
            <div className="text-2xl mb-3">🔒</div>
            <h3 className="font-semibold text-green-900 dark:text-green-200 mb-2">Account Security</h3>
            <p className="text-green-800 dark:text-green-300 text-sm">
              Banks can help secure your accounts and prevent further unauthorized access.
            </p>
          </div>
        </div>

        {/* Bank Directory */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Major Indian Banks</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {banks.map((bank, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6 border border-gray-200 dark:border-gray-600">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white text-lg">{bank.name}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{bank.website}</p>
                  </div>
                  <div className="text-right">
                    <a 
                      href={`tel:${bank.number}`}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-colors"
                    >
                      📞 Call Now
                    </a>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                    {bank.number}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Toll-free number</p>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Services Available:</h4>
                  <div className="flex flex-wrap gap-2">
                    {bank.features.map((feature, featureIndex) => (
                      <span 
                        key={featureIndex}
                        className="bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 text-xs px-2 py-1 rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Information */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          {/* What to Do When Calling */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">📋 What to Do When Calling</h3>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold mt-0.5">
                  1
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Have Your Details Ready</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Keep your account number, card details, and recent transaction history handy.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold mt-0.5">
                  2
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Explain the Situation</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Clearly describe what happened and when you noticed the suspicious activity.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold mt-0.5">
                  3
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Request Immediate Action</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Ask for card blocking, account freezing, and fraud investigation.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold mt-0.5">
                  4
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Get Reference Number</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Always get a complaint reference number for follow-up.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Common Fraud Types */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">⚠️ Common Fraud Types</h3>
            
            <div className="space-y-3">
              <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-3 border border-red-200 dark:border-red-800">
                <h4 className="font-semibold text-red-900 dark:text-red-200 text-sm">Card Skimming</h4>
                <p className="text-red-800 dark:text-red-300 text-xs">Unauthorized card cloning at ATMs or POS machines</p>
              </div>

              <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-3 border border-orange-200 dark:border-orange-800">
                <h4 className="font-semibold text-orange-900 dark:text-orange-200 text-sm">Phishing Scams</h4>
                <p className="text-orange-800 dark:text-orange-300 text-xs">Fake emails/SMS asking for banking credentials</p>
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-3 border border-yellow-200 dark:border-yellow-800">
                <h4 className="font-semibold text-yellow-900 dark:text-yellow-200 text-sm">UPI Fraud</h4>
                <p className="text-yellow-800 dark:text-yellow-300 text-xs">Unauthorized UPI transactions or fake payment requests</p>
              </div>

              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3 border border-purple-200 dark:border-purple-800">
                <h4 className="font-semibold text-purple-900 dark:text-purple-200 text-sm">SIM Swap</h4>
                <p className="text-purple-800 dark:text-purple-300 text-xs">Fraudsters taking control of your phone number</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">🔗 Quick Links</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link 
              href="/emergency"
              className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 border border-red-200 dark:border-red-800 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
            >
              <div className="text-2xl mb-2">🚨</div>
              <h4 className="font-semibold text-red-900 dark:text-red-200">Emergency Help</h4>
              <p className="text-red-800 dark:text-red-300 text-sm">Complete emergency assistance guide</p>
            </Link>

            <Link 
              href="/dashboard"
              className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
            >
              <div className="text-2xl mb-2">🎓</div>
              <h4 className="font-semibold text-blue-900 dark:text-blue-200">Learn Prevention</h4>
              <p className="text-blue-800 dark:text-blue-300 text-sm">Fraud awareness training modules</p>
            </Link>

            <Link 
              href="/emergency"
              className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800 hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
            >
              <div className="text-2xl mb-2">📋</div>
              <h4 className="font-semibold text-green-900 dark:text-green-200">Step-by-Step Guide</h4>
              <p className="text-green-800 dark:text-green-300 text-sm">Detailed fraud recovery process</p>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
} 