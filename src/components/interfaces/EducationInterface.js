'use client';

import { useEffect } from 'react';

export default function EducationInterface({ stepData, onChoice, showHint, onUseHint }) {
  
  // Remove auto-advance functionality
  // useEffect(() => {
  //   if (stepData.choices && stepData.choices.length === 1 && stepData.choices[0].isCorrect) {
  //     const timer = setTimeout(() => {
  //       onChoice(0);
  //     }, 2000); // Auto-advance after 2 seconds
  //     
  //     return () => clearTimeout(timer);
  //   }
  // }, [stepData.choices, onChoice]);
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-4xl mb-4">🎓</div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {stepData.title}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {stepData.description}
          </p>
        </div>

        {/* Educational Content */}
        <div className="space-y-6 mb-8">
          
          {/* Content Sections */}
          {stepData.content && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white text-center">
                {stepData.content.title}
              </h3>
              {stepData.content.sections?.map((section, index) => (
                <div key={index} className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
                  <div className="flex items-start space-x-4">
                    <div className="text-3xl">{section.image}</div>
                    <div>
                      <h4 className="font-semibold text-blue-900 dark:text-blue-200 mb-2">
                        {section.heading}
                      </h4>
                      <p className="text-blue-800 dark:text-blue-300">{section.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Examples/Comparison Screen */}
          {stepData.examples && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white text-center mb-4">
                Real Examples
              </h3>
              <div className="grid grid-cols-1 gap-4">
                {stepData.examples.map((example, index) => (
                  <div key={index} className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Original</div>
                        <div className="font-mono text-lg font-bold text-green-600 dark:text-green-400">
                          {example.original}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Spoofed</div>
                        <div className="font-mono text-lg font-bold text-red-600 dark:text-red-400">
                          {example.spoofed}
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 text-center">
                      <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">{example.description}</p>
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                        example.risk === 'Very High' ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-200' :
                        example.risk === 'High' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-200' :
                        'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-200'
                      }`}>
                        Risk: {example.risk}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Verification Methods */}
          {stepData.verificationMethods && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white text-center mb-4">
                How to Verify Calls
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {stepData.verificationMethods.map((method, index) => (
                  <div key={index} className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
                    <div className="flex items-start space-x-3">
                      <div className="text-2xl">{method.icon}</div>
                      <div>
                        <h4 className="font-semibold text-green-900 dark:text-green-200 mb-2">
                          {method.method}
                        </h4>
                        <p className="text-green-800 dark:text-green-300 text-sm">{method.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Key Points Summary */}
          {stepData.keyPoints && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white text-center mb-4">
                Key Takeaways
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {stepData.keyPoints.map((point, index) => (
                  <div key={index} className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold mt-0.5">
                        {index + 1}
                      </div>
                      <div className="text-blue-800 dark:text-blue-300">{point}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Main Content */}
          {stepData.situation && (
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
              <h3 className="font-semibold text-blue-900 dark:text-blue-200 mb-3">Situation:</h3>
              <p className="text-blue-800 dark:text-blue-300">{stepData.situation}</p>
            </div>
          )}

          {/* Key Points */}
          {stepData.keyPoints && !stepData.keyPoints.every(point => typeof point === 'string') && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {stepData.keyPoints.map((point, index) => (
                <div key={index} className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold mt-0.5">
                      ✓
                    </div>
                    <div>
                      <h4 className="font-semibold text-green-900 dark:text-green-200 mb-1">{point.title}</h4>
                      <p className="text-green-800 dark:text-green-300 text-sm">{point.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Warning Signs */}
          {stepData.warningSigns && (
            <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-6 border border-red-200 dark:border-red-800">
              <h3 className="font-semibold text-red-900 dark:text-red-200 mb-3 flex items-center">
                <span className="mr-2">⚠️</span>
                Warning Signs to Watch For:
              </h3>
              <div className="space-y-2">
                {stepData.warningSigns.map((sign, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <span className="text-red-500 mt-1">•</span>
                    <span className="text-red-800 dark:text-red-300 text-sm">{sign}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Comparison Table */}
          {stepData.comparison && (
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4 text-center">
                {stepData.comparison.title}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-green-100 dark:bg-green-900/20 rounded-lg p-4">
                  <h4 className="font-semibold text-green-900 dark:text-green-200 mb-3 text-center">
                    ✅ {stepData.comparison.legitimate.title}
                  </h4>
                  <ul className="space-y-2">
                    {stepData.comparison.legitimate.points.map((point, index) => (
                      <li key={index} className="text-green-800 dark:text-green-300 text-sm flex items-start">
                        <span className="mr-2">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-red-100 dark:bg-red-900/20 rounded-lg p-4">
                  <h4 className="font-semibold text-red-900 dark:text-red-200 mb-3 text-center">
                    ❌ {stepData.comparison.fraudulent.title}
                  </h4>
                  <ul className="space-y-2">
                    {stepData.comparison.fraudulent.points.map((point, index) => (
                      <li key={index} className="text-red-800 dark:text-red-300 text-sm flex items-start">
                        <span className="mr-2">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Action Steps */}
          {stepData.actionSteps && (
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6 border border-purple-200 dark:border-purple-800">
              <h3 className="font-semibold text-purple-900 dark:text-purple-200 mb-4">
                What Should You Do?
              </h3>
              <div className="space-y-3">
                {stepData.actionSteps.map((step, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold mt-0.5">
                      {index + 1}
                    </div>
                    <p className="text-purple-800 dark:text-purple-300 text-sm">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Dialogue Section */}
          {stepData.dialogue && (
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6">
              <div className="space-y-4">
                {stepData.dialogue.map((line, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                      line.speaker === 'caller' ? 'bg-blue-500' : 
                      line.speaker === 'user' ? 'bg-green-500' : 'bg-gray-500'
                    }`}>
                      {line.speaker === 'caller' ? '📞' : 
                       line.speaker === 'user' ? '👤' : '📢'}
                    </div>
                    <div className="flex-1">
                      <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                        {line.speaker === 'caller' ? 'Caller' : 
                         line.speaker === 'user' ? 'You' : 'Narrator'}
                      </div>
                      <div className="text-gray-900 dark:text-white">{line.text}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Interactive Choices */}
        {stepData.choices && stepData.choices.length > 1 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white text-center">
              {stepData.interface === 'summary-screen' ? 'Scenario completed successfully!' : 'Test Your Understanding:'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {stepData.choices.map((choice, index) => (
                <button
                  key={index}
                  onClick={() => onChoice(index)}
                  className="p-4 border-2 border-gray-300 dark:border-gray-600 rounded-lg hover:border-blue-500 dark:hover:border-blue-400 transition-colors text-left"
                >
                  <div className="font-semibold text-gray-900 dark:text-white mb-2">
                    Option {index + 1}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400 text-sm">
                    {choice.text}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Next Button for Single Choice */}
        {stepData.choices && stepData.choices.length === 1 && stepData.choices[0].isCorrect && (
          <div className="flex justify-center mt-6">
            <button 
              onClick={() => onChoice(0)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center space-x-2"
            >
              <span>Next</span>
              <span>→</span>
            </button>
          </div>
        )}

        {/* Hint Button */}
        {stepData.choices && stepData.choices.length > 1 && (
          <div className="flex justify-center mt-6">
            <button 
              onClick={onUseHint}
              className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-3 rounded-lg font-semibold"
            >
              💡 Need a Hint?
            </button>
          </div>
        )}

        {/* Hint Display */}
        {showHint && (
          <div className="mt-6 bg-yellow-100 dark:bg-yellow-900/90 rounded-lg p-6 border border-yellow-300 dark:border-yellow-700">
            <div className="flex items-start space-x-3">
              <div className="text-2xl">💡</div>
              <div>
                <div className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">Hint:</div>
                <div className="text-yellow-700 dark:text-yellow-300">
                  {stepData.hint || 'Think about the key differences between legitimate and fraudulent communications. What verification steps can you take?'}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 