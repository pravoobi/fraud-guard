'use client';

import { useState } from 'react';

export default function UPIInterface({ stepData, onChoice, showHint, onUseHint }) {
  const [selectedOption, setSelectedOption] = useState(null);

  const getInterfaceContent = () => {
    switch (stepData.interface) {
      case 'upi-home':
        return (
          <div className="space-y-6">
            {/* Balance Display */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white">
              <div className="text-sm opacity-80">Total Balance</div>
              <div className="text-3xl font-bold">{stepData.balance || '₹0'}</div>
              <div className="text-sm opacity-80 mt-2">Last updated: Just now</div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => onChoice(0)}
                className="bg-green-500 hover:bg-green-600 text-white p-6 rounded-xl text-center transition-colors"
              >
                <div className="text-2xl mb-2">💸</div>
                <div className="font-semibold">Send Money</div>
                <div className="text-sm opacity-80">To friends & family</div>
              </button>

              <button 
                onClick={() => onChoice(1)}
                className="bg-orange-500 hover:bg-orange-600 text-white p-6 rounded-xl text-center transition-colors"
              >
                <div className="text-2xl mb-2">📥</div>
                <div className="font-semibold">Request Money</div>
                <div className="text-sm opacity-80">From contacts</div>
              </button>
            </div>

            {/* Other Options */}
            <div className="grid grid-cols-4 gap-3">
              <div className="text-center p-4">
                <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-xl flex items-center justify-center mb-2 mx-auto">
                  📱
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Recharge</div>
              </div>
              <div className="text-center p-4">
                <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-xl flex items-center justify-center mb-2 mx-auto">
                  💡
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Bills</div>
              </div>
              <div className="text-center p-4">
                <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-xl flex items-center justify-center mb-2 mx-auto">
                  📊
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Rewards</div>
              </div>
              <div className="text-center p-4">
                <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-xl flex items-center justify-center mb-2 mx-auto">
                  ⚙️
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Settings</div>
              </div>
            </div>
          </div>
        );

      case 'send-money':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Send Money</h3>
              <p className="text-gray-600 dark:text-gray-400">Enter recipient details</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Recipient UPI ID / Phone
                </label>
                <input 
                  type="text" 
                  placeholder="rahul@upi"
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Amount
                </label>
                <input 
                  type="number" 
                  placeholder="₹500"
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <button 
                onClick={() => onChoice(0)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-lg font-semibold"
              >
                Continue to Pay
              </button>
            </div>
          </div>
        );

      case 'request-money':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Request Money</h3>
              <p className="text-gray-600 dark:text-gray-400">Ask someone to pay you</p>
            </div>

            <div className="bg-orange-100 dark:bg-orange-900/20 p-4 rounded-lg border border-orange-200 dark:border-orange-800">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-orange-600">⚠️</span>
                <span className="font-semibold text-orange-800 dark:text-orange-200">Notice</span>
              </div>
              <p className="text-orange-700 dark:text-orange-300 text-sm">
                This will ask the recipient to send you money, not the other way around!
              </p>
            </div>

            <div className="space-y-4">
              <button 
                onClick={() => onChoice(0)}
                className="w-full bg-gray-500 hover:bg-gray-600 text-white p-4 rounded-lg font-semibold"
              >
                ← Go Back to Send Money
              </button>

              <button 
                onClick={() => onChoice(1)}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white p-4 rounded-lg font-semibold"
              >
                Continue with Request
              </button>
            </div>
          </div>
        );

      case 'payment-confirm':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Confirm Payment</h3>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Recipient:</span>
                <span className="font-semibold text-gray-900 dark:text-white">{stepData.recipient}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Amount:</span>
                <span className="font-semibold text-green-600 text-xl">{stepData.amount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Transaction:</span>
                <span className="font-semibold text-gray-900 dark:text-white">Send Money</span>
              </div>
            </div>

            <div className="text-center text-gray-500 dark:text-gray-400 text-sm">
              Use the buttons on the right to make your choice →
            </div>
          </div>
        );

      default:
        return <div>Interface not found</div>;
    }
  };

  return (
    <div className="max-w-6xl mx-auto flex items-start gap-8">
      {/* Phone Frame */}
      <div className="bg-black rounded-3xl p-4 shadow-2xl flex-shrink-0">
        <div className="bg-white dark:bg-gray-900 rounded-2xl h-[600px] w-[320px] relative overflow-hidden">
          {/* Status Bar */}
          <div className="flex justify-between items-center p-4 text-sm">
            <div className="flex items-center space-x-1">
              <span>9:41</span>
            </div>
            <div className="flex items-center space-x-1">
              <span>📶</span>
              <span>📶</span>
              <span>🔋</span>
            </div>
          </div>

          {/* App Header */}
          <div className="bg-blue-600 text-white p-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">PaymentApp</h2>
              <button className="text-white">⚙️</button>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 h-full overflow-y-auto pb-16">
            {getInterfaceContent()}
          </div>

          {/* Hint Display */}
          {showHint && (
            <div className="absolute inset-4 bg-yellow-100 dark:bg-yellow-900/90 rounded-lg p-4 flex items-center justify-center z-10">
              <div className="text-center">
                <div className="text-3xl mb-2">💡</div>
                <div className="text-yellow-800 dark:text-yellow-200 font-semibold mb-2">Hint:</div>
                <div className="text-yellow-700 dark:text-yellow-300 text-sm">
                  {stepData.hint || 'Send Money = You pay someone. Request Money = You ask someone to pay you.'}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Info Panel */}
      <div className="flex-1 max-w-md">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            📱 UPI Learning Session
          </h3>
          
          <div className="space-y-4 mb-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
              <h4 className="font-semibold text-blue-900 dark:text-blue-200 mb-2">Current Step:</h4>
              <p className="text-blue-800 dark:text-blue-300 text-sm">
                {stepData.description || 'Navigate through the UPI interface to complete the scenario.'}
              </p>
            </div>

            {stepData.interface === 'payment-confirm' ? (
              <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4 border border-orange-200 dark:border-orange-800">
                <h4 className="font-semibold text-orange-900 dark:text-orange-200 mb-3">⚠️ Payment Confirmation</h4>
                <div className="text-orange-800 dark:text-orange-300 text-sm space-y-2">
                  <p>• Double-check recipient details</p>
                  <p>• Verify the amount is correct</p>
                  <p>• Confirm this is the right transaction</p>
                </div>
                
                                 <div className="space-y-3 mt-4">
                   <h5 className="font-semibold text-orange-900 dark:text-orange-200">Choose your action:</h5>
                   {stepData.choices?.map((choice, index) => (
                     <button 
                       key={index}
                       onClick={() => onChoice(index)}
                       className={`w-full p-3 rounded-lg font-semibold text-sm transition-colors ${
                         index === 0 
                           ? 'bg-green-600 hover:bg-green-700 text-white'
                           : 'bg-gray-500 hover:bg-gray-600 text-white'
                       }`}
                       type="button"
                     >
                       {index === 0 ? '✓ ' : ''}{choice.text}
                     </button>
                   ))}
                 </div>
              </div>
            ) : (
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
                <h4 className="font-semibold text-green-900 dark:text-green-200 mb-2">💡 Remember:</h4>
                <ul className="text-green-800 dark:text-green-300 text-sm space-y-1">
                  <li>• Send Money = You pay someone</li>
                  <li>• Request Money = You ask someone to pay you</li>
                  <li>• Always verify recipient details</li>
                </ul>
              </div>
            )}
          </div>

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