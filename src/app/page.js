'use client';

import Link from 'next/link';

export default function LandingPage() {
  const scenarios = [
    {
      id: 1,
      title: "UPI Fraud Protection",
      scenario: "You get a call claiming you've received a cashback. The caller asks you to open your UPI app and \"accept\" the cashback by entering your PIN.",
      choices: [
        { label: "A", text: "Enter the PIN as told" },
        { label: "B", text: "Refuse and hang up" },
        { label: "C", text: "Ask the caller for more details" }
      ],
      outcomes: [
        "A) You lose money instantly.",
        "B) Caller hangs up; you're safe.",
        "C) Caller pressures you; you feel uncomfortable."
      ],
      feedback: "Never share your UPI PIN or approve \"requests to pay\" from unknown sources. Cashback, refunds, etc., never need your PIN.",
      icon: "💳",
      color: "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800"
    },
    {
      id: 2,
      title: "Bank Impersonation Detection",
      scenario: "You get an urgent call: \"This is your bank; your account will be blocked unless you confirm your card number and OTP!\"",
      choices: [
        { label: "A", text: "Share your number and OTP" },
        { label: "B", text: "Politely refuse, call the bank's official helpline" },
        { label: "C", text: "Ask for their employee ID and continue the call" }
      ],
      outcomes: [
        "A) Scammers empty your account.",
        "B) You confirm it's a scam and secure your account.",
        "C) Scammer tries to convince you further."
      ],
      feedback: "No bank will ever ask for card numbers, OTPs, or passwords over phone/SMS. Always call the official number to verify.",
      icon: "🏦",
      color: "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800"
    },
    {
      id: 3,
      title: "KYC Scam Prevention",
      scenario: "You receive an SMS saying, \"Your account will be frozen. Update KYC now!\" and a link.",
      choices: [
        { label: "A", text: "Click the link and upload Aadhaar" },
        { label: "B", text: "Delete the SMS" },
        { label: "C", text: "Visit your bank app's official KYC section instead" }
      ],
      outcomes: [
        "A) Your data is stolen and misused.",
        "B/C) You avoid the scam; if more info needed, use only official channels."
      ],
      feedback: "KYC is updated only via official bank apps/branches, never from SMS or external links.",
      icon: "📱",
      color: "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
    },
    {
      id: 4,
      title: "Aadhaar/PAN Fraud Alerts",
      scenario: "You get an email (from @pan-update.org) asking you to complete \"Aadhaar-PAN Reverification\" by uploading documents.",
      choices: [
        { label: "A", text: "Upload your documents" },
        { label: "B", text: "Ignore the email, check the sender domain and government sites" },
        { label: "C", text: "Forward the email to your friend to ask" }
      ],
      outcomes: [
        "A) Identity theft; your details are sold.",
        "B) You recognize it's a scam.",
        "C) Risk spreading the scam accidentally."
      ],
      feedback: "Official government emails come from @gov.in or @nic.in only. Never upload PAN/Aadhaar to unverified links.",
      icon: "🆔",
      color: "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800"
    },
    {
      id: 5,
      title: "Loan/Credit Card Scam Detection",
      scenario: "On social media, you see \"Instant loan with no documents\" and a number to WhatsApp.",
      choices: [
        { label: "A", text: "Send your details via WhatsApp" },
        { label: "B", text: "Research the company name" },
        { label: "C", text: "Only apply for credit cards/loans via your bank's website/app" }
      ],
      outcomes: [
        "A) You're asked for \"processing fees\" and scammed.",
        "B) You find it's not registered/known.",
        "C) You stay protected and avoid scam offers."
      ],
      feedback: "Genuine loans/credit cards are never instant, never via WhatsApp, and never require advance fees.",
      icon: "💰",
      color: "bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800"
    },
    {
      id: 6,
      title: "Digital Arrest Scam Protection",
      scenario: "A caller says, \"I'm from CBI. There's a complaint against your Aadhaar. Pay a fine now or you'll be arrested!\"",
      choices: [
        { label: "A", text: "Pay immediately out of fear" },
        { label: "B", text: "Stay calm, call police on official number" },
        { label: "C", text: "Argue with the caller" }
      ],
      outcomes: [
        "A) Money lost; more demands may follow.",
        "B) You learn it's a scam and feel safe.",
        "C) Caller intimidates you more."
      ],
      feedback: "Police/CBI never threaten arrest or demand money on calls. Always verify through official police contacts.",
      icon: "👮",
      color: "bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="text-3xl">🛡️</div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">FraudGuard</h1>
                <p className="text-sm text-gray-600 dark:text-gray-300">Fraud Awareness & Protection Platform</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link 
                href="/dashboard"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
              >
                Start Learning
              </Link>
              <Link 
                href="/emergency"
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
              >
                Emergency Help
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="relative mb-8">
            {/* Hero Illustration */}
            <div className="max-w-4xl mx-auto relative">
              <div className="bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                  <div className="text-center">
                    <div className="text-4xl mb-3">📱</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">Mobile Security</div>
                  </div>
                  <div className="text-center">
                    <div className="text-6xl mb-3">🛡️</div>
                    <div className="text-lg text-blue-600 dark:text-blue-400 font-bold">FraudGuard</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl mb-3">💳</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">Financial Safety</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Protect Yourself from Digital Fraud
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Learn to recognize and defend against the most common fraud scenarios. Test your knowledge with real-world examples and stay one step ahead of scammers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="/dashboard"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold text-lg transition-colors flex items-center space-x-2"
            >
              <span>🎓</span>
              <span>Start Interactive Learning</span>
            </Link>
            <Link 
              href="/emergency"
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold text-lg transition-colors flex items-center space-x-2"
            >
              <span>🚨</span>
              <span>Need Help Now?</span>
            </Link>
          </div>
        </div>

        {/* Quick Test Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-12 border border-gray-200 dark:border-gray-700">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Test Your Fraud Awareness</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              How well can you spot these common fraud scenarios? Try these quick examples:
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {scenarios.map((scenario, index) => (
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
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Scenario:</h4>
                  <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">
                    {scenario.scenario}
                  </p>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">What would you do?</h4>
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
                    View Outcomes
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
                  <h5 className="font-semibold text-blue-900 dark:text-blue-200 mb-1">Key Learning:</h5>
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
              {/* Interactive Elements Illustration */}
              <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                Live
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Interactive Scenarios</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Practice with realistic fraud scenarios in a safe environment. Learn from your choices without real consequences.
            </p>
            {/* Mock Scenario Preview */}
            <div className="mt-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3 text-left">
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Sample Scenario:</div>
              <div className="text-sm text-gray-700 dark:text-gray-300">"Unknown caller asks for your UPI PIN..."</div>
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
              {/* Progress Visualization */}
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
                <div className="bg-blue-500 text-white text-xs px-2 py-1 rounded">
                  85%
                </div>
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Track Your Progress</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Monitor your fraud awareness score, completed modules, and learning streaks as you improve your skills.
            </p>
                         {/* Mock Progress Chart */}
             <div className="mt-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
               <div className="flex justify-center items-center mb-2">
                 <div className="relative">
                   <svg className="w-16 h-16" viewBox="0 0 42 42">
                     <circle
                       cx="21"
                       cy="21"
                       r="15.915"
                       fill="transparent"
                       stroke="#e5e7eb"
                       strokeWidth="3"
                     />
                     <circle
                       cx="21"
                       cy="21"
                       r="15.915"
                       fill="transparent"
                       stroke="#3b82f6"
                       strokeWidth="3"
                       strokeDasharray="75 25"
                       strokeDashoffset="25"
                       strokeLinecap="round"
                       transform="rotate(-90 21 21)"
                     />
                   </svg>
                   <div className="absolute inset-0 flex items-center justify-center">
                     <span className="text-xs font-bold text-blue-600">75%</span>
                   </div>
                 </div>
               </div>
               <div className="flex justify-center space-x-2 mb-2">
                 <div className="flex items-center space-x-1">
                   <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                   <span className="text-xs text-gray-600 dark:text-gray-400">M</span>
                 </div>
                 <div className="flex items-center space-x-1">
                   <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                   <span className="text-xs text-gray-600 dark:text-gray-400">T</span>
                 </div>
                 <div className="flex items-center space-x-1">
                   <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                   <span className="text-xs text-gray-600 dark:text-gray-400">W</span>
                 </div>
                 <div className="flex items-center space-x-1">
                   <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                   <span className="text-xs text-gray-600 dark:text-gray-400">T</span>
                 </div>
                 <div className="flex items-center space-x-1">
                   <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                   <span className="text-xs text-gray-600 dark:text-gray-400">F</span>
                 </div>
                 <div className="flex items-center space-x-1">
                   <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                   <span className="text-xs text-gray-600 dark:text-gray-400">S</span>
                 </div>
                 <div className="flex items-center space-x-1">
                   <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                   <span className="text-xs text-gray-600 dark:text-gray-400">S</span>
                 </div>
               </div>
               <div className="text-xs text-gray-500 dark:text-gray-400 text-center">Weekly Progress</div>
             </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 text-center group hover:shadow-xl transition-shadow">
            <div className="relative mb-6">
              <div className="bg-red-100 dark:bg-red-900/20 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <div className="text-4xl">🚨</div>
              </div>
              {/* Emergency Pulse Animation */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
                <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Emergency Resources</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Access immediate help resources, bank helplines, and step-by-step guides if you're currently experiencing fraud.
            </p>
            {/* Emergency Contact Preview */}
            <div className="mt-4 bg-red-50 dark:bg-red-900/20 rounded-lg p-3 border border-red-200 dark:border-red-800">
              <div className="flex items-center justify-center space-x-2">
                <div className="text-lg">📞</div>
                <div className="text-sm font-semibold text-red-700 dark:text-red-300">1930</div>
                <div className="text-xs text-red-600 dark:text-red-400">Cyber Crime</div>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white mb-12 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-4 left-4 text-6xl">🛡️</div>
            <div className="absolute top-8 right-8 text-4xl">📱</div>
            <div className="absolute bottom-8 left-8 text-4xl">💳</div>
            <div className="absolute bottom-4 right-4 text-6xl">🔒</div>
          </div>
          
          <div className="relative z-10">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Why Fraud Awareness Matters</h2>
              <p className="text-xl opacity-90">Stay informed about the growing threat of digital fraud</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="relative">
                <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
                  <div className="text-5xl mb-3">📊</div>
                  <div className="text-4xl font-bold mb-2">₹1,25,000 Cr</div>
                  <div className="text-lg opacity-90">Lost to digital fraud in India annually</div>
                </div>
              </div>
              <div className="relative">
                <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
                  <div className="text-5xl mb-3">🎯</div>
                  <div className="text-4xl font-bold mb-2">95%</div>
                  <div className="text-lg opacity-90">Of fraud can be prevented with awareness</div>
                </div>
              </div>
              <div className="relative">
                <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
                  <div className="text-5xl mb-3">📈</div>
                  <div className="text-4xl font-bold mb-2">1,30,000+</div>
                  <div className="text-lg opacity-90">Fraud complaints reported monthly</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700 text-center relative overflow-hidden">
          {/* Background Illustrations */}
          <div className="absolute inset-0 opacity-5 dark:opacity-10">
            <div className="absolute top-4 left-4 text-8xl">🛡️</div>
            <div className="absolute bottom-4 right-4 text-8xl">🎓</div>
          </div>
          
          <div className="relative z-10">
            {/* Success Stories Visualization */}
            <div className="flex justify-center mb-6">
              <div className="bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900/20 dark:to-blue-900/20 rounded-full p-4">
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <div className="text-2xl">👥</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">Users Protected</div>
                  </div>
                  <div className="text-3xl">→</div>
                  <div className="text-center">
                    <div className="text-2xl">🛡️</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">Fraud Aware</div>
                  </div>
                  <div className="text-3xl">→</div>
                  <div className="text-center">
                    <div className="text-2xl">✅</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">Safe & Secure</div>
                  </div>
                </div>
              </div>
            </div>
            
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Ready to Become Fraud-Proof?</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of users who have strengthened their fraud detection skills. Start your learning journey today and protect yourself and your loved ones.
            </p>
                      <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/dashboard"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold text-lg transition-colors inline-block"
              >
                Start Learning Now
              </Link>
              <Link 
                href="/bank-helplines"
                className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white px-8 py-3 rounded-lg font-semibold text-lg transition-colors inline-block"
              >
                View Bank Helplines
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
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">FraudGuard</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Empowering users with knowledge to stay safe from digital fraud
            </p>
            <div className="flex justify-center space-x-6">
              <Link href="/dashboard" className="text-blue-600 hover:text-blue-700 dark:text-blue-400">
                Learning Modules
              </Link>
              <Link href="/emergency" className="text-blue-600 hover:text-blue-700 dark:text-blue-400">
                Emergency Help
              </Link>
              <Link href="/bank-helplines" className="text-blue-600 hover:text-blue-700 dark:text-blue-400">
                Bank Helplines
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
