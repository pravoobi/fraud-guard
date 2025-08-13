'use client';

export default function SMSInterface({ stepData, onChoice, showHint, onUseHint }) {
  
  const getSMSContent = () => {
    switch (stepData.interface) {
      case 'sms-analysis':
        return (
          <div className="space-y-4">
            {/* Original SMS */}
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
              <div className="font-semibold text-gray-900 dark:text-white mb-2">
                Analyzing SMS for Red Flags:
              </div>
              <div className="text-gray-800 dark:text-gray-200 text-sm leading-relaxed">
                {stepData.smsData?.message}
              </div>
            </div>
          </div>
        );

      case 'fake-banking-site':
        return (
          <div className="space-y-4">
            {/* Browser Bar */}
            <div className="bg-gray-200 dark:bg-gray-700 p-2 rounded-t-lg">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="flex-1 bg-white dark:bg-gray-600 rounded px-2 py-1 text-xs text-gray-700 dark:text-gray-300">
                  🔓 suspicious-bank-site.com/kyc-update
                </div>
              </div>
            </div>

            {/* Fake Banking Site */}
            <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-b-lg p-4">
              <div className="text-center mb-4">
                <div className="text-blue-600 text-2xl font-bold">State Bank</div>
                <div className="text-red-600 text-sm font-semibold">⚠️ URGENT: KYC UPDATE REQUIRED</div>
              </div>

              <div className="space-y-3">
                <input 
                  type="text" 
                  placeholder="Username"
                  className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-700"
                  disabled
                />
                <input 
                  type="password" 
                  placeholder="Password"
                  className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-700"
                  disabled
                />
                <input 
                  type="text" 
                  placeholder="Debit Card Number"
                  className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-700"
                  disabled
                />
                <input 
                  type="text" 
                  placeholder="CVV"
                  className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-700"
                  disabled
                />
              </div>

              <div className="bg-red-100 dark:bg-red-900/20 p-3 rounded mt-4 border border-red-300 dark:border-red-800">
                <div className="text-red-800 dark:text-red-200 text-sm">
                  🚨 This is a FAKE banking website designed to steal your credentials!
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return <div>Interface content loading...</div>;
    }
  };

  return (
    <div className="max-w-6xl mx-auto flex items-start gap-8">
      {/* Phone Frame */}
      <div className="bg-black rounded-3xl p-4 shadow-2xl flex-shrink-0">
        <div className="bg-white dark:bg-gray-900 rounded-2xl h-[600px] w-[320px] relative overflow-hidden">
          {/* Status Bar */}
          <div className="flex justify-between items-center p-4 text-sm bg-gray-50 dark:bg-gray-800">
            <div className="flex items-center space-x-1">
              <span>9:41</span>
            </div>
            <div className="flex items-center space-x-1">
              <span>📶</span>
              <span>🔋</span>
            </div>
          </div>

          {/* App Header */}
          <div className="bg-green-600 text-white p-4">
            <div className="flex items-center justify-between">
              <button className="text-white">←</button>
              <h2 className="text-lg font-bold">Messages</h2>
              <button className="text-white">⋮</button>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 h-full overflow-y-auto pb-16">
            {stepData.interface === 'sms-screen' ? (
              <div className="space-y-4">
                {/* SMS Message Display Only */}
                <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {stepData.smsData?.sender || 'Unknown'}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {stepData.smsData?.time || 'Now'}
                    </div>
                  </div>
                  <div className="text-gray-800 dark:text-gray-200 text-sm leading-relaxed">
                    {stepData.smsData?.message || 'SMS content not available'}
                  </div>
                </div>
              </div>
            ) : (
              getSMSContent()
            )}
          </div>

          {/* Hint Display */}
          {showHint && (
            <div className="absolute inset-4 bg-yellow-100 dark:bg-yellow-900/90 rounded-lg p-4 flex items-center justify-center z-10">
              <div className="text-center">
                <div className="text-3xl mb-2">💡</div>
                <div className="text-yellow-800 dark:text-yellow-200 font-semibold mb-2">Hint:</div>
                <div className="text-yellow-700 dark:text-yellow-300 text-sm">
                  {stepData.hint || 'Look for red flags: urgent language, shortened URLs, and generic greetings. Banks never send KYC links via SMS.'}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Options Panel */}
      <div className="flex-1 max-w-md">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            📱 SMS Analysis
          </h3>
          
          {stepData.interface === 'sms-screen' && (
            <div className="space-y-3 mb-6">
              <h4 className="font-semibold text-gray-900 dark:text-white">What should you do?</h4>
              {stepData.choices?.map((choice, index) => (
                <button
                  key={index}
                  onClick={() => onChoice(index)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-lg text-sm text-left transition-colors"
                >
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5">
                      {index + 1}
                    </div>
                    <div>{choice.text}</div>
                  </div>
                </button>
              ))}
            </div>
          )}

          {stepData.interface === 'sms-analysis' && stepData.redFlags && (
            <div className="space-y-4 mb-6">
              <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 border border-red-200 dark:border-red-800">
                <h4 className="font-semibold text-red-900 dark:text-red-200 mb-3">🚩 Red Flags Detected:</h4>
                {stepData.redFlags.map((flag, index) => (
                  <div key={index} className="bg-red-100 dark:bg-red-900/40 p-2 rounded border-l-4 border-red-500 mb-2">
                    <span className="text-red-700 dark:text-red-300 text-sm">• {flag}</span>
                  </div>
                ))}
              </div>
              
              <div className="space-y-3">
                {stepData.choices?.map((choice, index) => (
                  <button
                    key={index}
                    onClick={() => onChoice(index)}
                    className={`w-full p-4 rounded-lg text-sm text-left transition-colors ${
                      choice.isCorrect 
                        ? 'bg-green-600 hover:bg-green-700 text-white'
                        : 'bg-red-600 hover:bg-red-700 text-white'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5 ${
                        choice.isCorrect ? 'bg-green-500' : 'bg-red-500'
                      }`}>
                        {index + 1}
                      </div>
                      <div>{choice.text}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {stepData.interface === 'fake-banking-site' && (
            <div className="space-y-4 mb-6">
              <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 border border-red-200 dark:border-red-800">
                <h4 className="font-semibold text-red-900 dark:text-red-200 mb-2">🚨 Warning!</h4>
                <p className="text-red-800 dark:text-red-300 text-sm">
                  This is a FAKE banking website designed to steal your credentials!
                </p>
              </div>
              
              <div className="space-y-3">
                {stepData.choices?.map((choice, index) => (
                  <button
                    key={index}
                    onClick={() => onChoice(index)}
                    className={`w-full p-4 rounded-lg text-sm text-left transition-colors ${
                      choice.isCorrect 
                        ? 'bg-green-600 hover:bg-green-700 text-white'
                        : 'bg-red-600 hover:bg-red-700 text-white'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5 ${
                        choice.isCorrect ? 'bg-green-500' : 'bg-red-500'
                      }`}>
                        {index + 1}
                      </div>
                      <div>{choice.text}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-center">
            <button 
              onClick={onUseHint}
              className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-3 rounded-lg font-semibold"
            >
              💡 Need a Hint?
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 