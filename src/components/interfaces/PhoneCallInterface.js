'use client';

import { useState, useEffect } from 'react';

export default function PhoneCallInterface({ stepData, onChoice, showHint, onUseHint }) {
  const [callDuration, setCallDuration] = useState(0);
  const [showDialogue, setShowDialogue] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCallDuration(prev => prev + 1);
    }, 1000);

    // Show dialogue after 2 seconds
    const dialogueTimer = setTimeout(() => {
      setShowDialogue(true);
    }, 2000);

    return () => {
      clearInterval(timer);
      clearTimeout(dialogueTimer);
    };
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-6xl mx-auto flex items-start gap-8">
      {/* Phone Frame */}
      <div className="bg-black rounded-3xl p-4 shadow-2xl flex-shrink-0">
        <div className="bg-gray-900 rounded-2xl h-[600px] w-[320px] relative overflow-hidden">
          {/* Call Screen Header */}
          <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-green-500 to-green-600 h-32 flex items-center justify-center">
            <div className="text-center text-white">
              <div className="text-sm opacity-80">Incoming call</div>
              <div className="text-lg font-semibold">{stepData.callerInfo?.name || 'Unknown'}</div>
              <div className="text-sm opacity-80">{stepData.callerInfo?.number || '+91-XXXXXXXXXX'}</div>
            </div>
          </div>

          {/* Call Duration */}
          <div className="absolute top-36 left-0 right-0 text-center">
            <div className="text-white text-lg font-mono">{formatTime(callDuration)}</div>
            <div className="text-white text-xs opacity-75 mt-1">
              {stepData.callerInfo?.isSpoof && (
                <div className="bg-red-500 px-2 py-1 rounded-full inline-block">
                  ⚠️ Spoofed Number
                </div>
              )}
            </div>
          </div>

          {/* Profile Picture */}
          <div className="absolute top-44 left-1/2 transform -translate-x-1/2">
            <div className="w-32 h-32 bg-gray-300 rounded-full flex items-center justify-center text-4xl">
              🏦
            </div>
          </div>

          {/* Dialogue Section */}
          {showDialogue && (
            <div className="absolute bottom-20 left-4 right-4">
              <div className="bg-gray-800 rounded-lg p-4 mb-4 max-h-40 overflow-y-auto">
                {stepData.dialogue?.map((line, index) => (
                  <div key={index} className="mb-3">
                    <div className={`inline-block p-3 rounded-lg max-w-xs ${
                      line.speaker === 'caller' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-600 text-white ml-auto'
                    }`}>
                      <div className="text-xs opacity-75 mb-1">
                        {line.speaker === 'caller' ? 'Caller' : 'You'}
                      </div>
                      <div className="text-sm">{line.text}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Phone Action Buttons */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-4">
            <button className="w-16 h-16 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center text-white text-xl">
              📞
            </button>
            <button className="w-12 h-12 bg-gray-600 hover:bg-gray-700 rounded-full flex items-center justify-center text-white">
              🔇
            </button>
            <button className="w-12 h-12 bg-gray-600 hover:bg-gray-700 rounded-full flex items-center justify-center text-white">
              📢
            </button>
          </div>

          {/* Hint Display */}
          {showHint && (
            <div className="absolute inset-4 bg-yellow-100 dark:bg-yellow-900/90 rounded-lg p-4 flex items-center justify-center z-10">
              <div className="text-center">
                <div className="text-3xl mb-2">💡</div>
                <div className="text-yellow-800 dark:text-yellow-200 font-semibold mb-2">Hint:</div>
                <div className="text-yellow-700 dark:text-yellow-300 text-sm">
                  {stepData.hint || 'Banks never ask for sensitive information over phone calls. Always verify independently.'}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Choice Options Panel */}
      {showDialogue && (
        <div className="flex-1 max-w-md">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              How do you respond?
            </h3>
            
            <div className="space-y-3 mb-6">
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
      )}
    </div>
  );
} 