'use client';

import { useState, useEffect, useMemo } from 'react';
import { useApp } from '@/contexts/AppContext';
import { scenarioData } from '@/data/scenarios';
import { getTranslatedScenario } from '@/data/scenariosTranslations';
import PhoneCallInterface from './interfaces/PhoneCallInterface';
import UPIInterface from './interfaces/UPIInterface';
import SMSInterface from './interfaces/SMSInterface';
import EducationInterface from './interfaces/EducationInterface';

export default function ScenarioEngine({ scenario, module, onComplete, onExit }) {
  const { state, dispatch } = useApp();
  const [currentStep, setCurrentStep] = useState(0);
  const [choices, setChoices] = useState([]);
  const [showHint, setShowHint] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [scenarioScore, setScenarioScore] = useState(0);
  const [startTime] = useState(Date.now());

  const lang = state.settings.language || 'en';
  const scenarioContent = useMemo(
    () => getTranslatedScenario(scenarioData[scenario.id], scenario.id, lang),
    [scenario.id, lang]
  );

  if (!scenarioContent) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Scenario Not Available</h1>
          <button onClick={onExit} className="text-blue-600 hover:text-blue-700">← Back to Module</button>
        </div>
      </div>
    );
  }

  const currentStepData = scenarioContent.steps[currentStep];
  
  // Build per-decision report card entries from recorded choices.
  // Only include steps that had real decisions (more than one option).
  const reportItems = choices
    .filter(c => scenarioContent?.steps[c.stepIndex]?.choices.length > 1)
    .map(c => {
      const step = scenarioContent.steps[c.stepIndex];
      const madeChoice = step.choices[c.choiceIndex];
      const bestChoice = step.choices.find(ch => ch.isCorrect);
      return {
        stepTitle: step.title || step.description || `Step ${c.stepIndex + 1}`,
        choiceText: c.choice,
        isCorrect: c.isCorrect,
        explanation: madeChoice?.explanation || '',
        betterAnswer: !c.isCorrect && bestChoice ? bestChoice.text : null,
      };
    });

  // Check if this is a failure ending (wrong final choice with consequence)
  const isFailureStep = currentStepData &&
    currentStepData.choices.length === 1 && 
    currentStepData.choices[0].nextStep === null &&
    !currentStepData.choices[0].isCorrect &&
    currentStepData.choices[0].consequence;

  // Check if this is a final step (successful ending)
  const isFinalStep = currentStepData && 
    currentStepData.choices.length === 1 && 
    currentStepData.choices[0].nextStep === null &&
    currentStepData.choices[0].isCorrect;

  const handleChoice = (choiceIndex) => {
    const choice = currentStepData.choices[choiceIndex];
    
    const newChoice = {
      stepIndex: currentStep,
      choiceIndex,
      choice: choice.text,
      isCorrect: choice.isCorrect,
      timestamp: Date.now() - startTime
    };

    const newChoices = [...choices, newChoice];
    setChoices(newChoices);

    dispatch({ type: 'MAKE_CHOICE', payload: newChoice });

    // Handle choice consequences
    if (choice.isCorrect) {
      // Correct choice - advance to next step or complete scenario
      if (choice.nextStep !== undefined && choice.nextStep !== null) {
        setCurrentStep(choice.nextStep);
      } else {
        // This is a successful completion - calculate score and show success
        const finalScore = calculateFinalScore(newChoices);
        setShowResult(true);
      }
    } else {
      // Wrong choice - handle based on the choice configuration
      if (choice.nextStep !== undefined && choice.nextStep !== null) {
        // Wrong choice but has a next step (consequence path)
        setCurrentStep(choice.nextStep);
      } else if (choice.consequence) {
        // Wrong choice with consequence - show failure state
        setCurrentStep(currentStep); // Stay on current step to show failure modal
      } else {
        // Wrong choice but can retry - show hint
        setShowHint(true);
      }
    }
  };

  const calculateFinalScore = (finalChoices) => {
    const correctChoices = finalChoices.filter(c => c.isCorrect).length;
    const totalChoices = finalChoices.length;
    const hintsUsed = state.currentSession.hints;

    let score = Math.round((correctChoices / totalChoices) * 100);
    score = Math.max(0, score - (hintsUsed * 5));

    // Bonus for fast completion (under 60 s regardless of step count)
    const elapsed = finalChoices[finalChoices.length - 1]?.timestamp ?? Infinity;
    const timeBonus = elapsed < 60000 ? 10 : 0;
    score = Math.min(100, score + timeBonus);

    setScenarioScore(score);
    setShowResult(true);
    return score;
  };

  const handleUseHint = () => {
    dispatch({ type: 'USE_HINT' });
    setShowHint(true);
  };

  // Saves the completed scenario and returns to the module page.
  // scenarioScore is already set by calculateFinalScore before this is called.
  const handleCompleteScenario = () => {
    dispatch({
      type: 'COMPLETE_SCENARIO',
      payload: {
        scenarioId: scenario.id,
        score: scenarioScore,
        timeSpent: Date.now() - startTime,
        hintsUsed: state.currentSession.hints,
        choices,
        completedAt: new Date().toISOString()
      }
    });

    onComplete({
      scenarioId: scenario.id,
      score: scenarioScore,
    });
  };

  const handleRetry = () => {
    setCurrentStep(0);
    setChoices([]);
    setShowHint(false);
    setShowResult(false);
    setScenarioScore(0);
  };

  const renderInterface = () => {
    switch (scenario.type) {
      case 'phone-call':
        return (
          <PhoneCallInterface 
            stepData={currentStepData}
            onChoice={handleChoice}
            showHint={showHint}
            onUseHint={handleUseHint}
          />
        );
      case 'upi-interface':
        return (
          <UPIInterface 
            stepData={currentStepData}
            onChoice={handleChoice}
            showHint={showHint}
            onUseHint={handleUseHint}
          />
        );
      case 'sms-interface':
        return (
          <SMSInterface 
            stepData={currentStepData}
            onChoice={handleChoice}
            showHint={showHint}
            onUseHint={handleUseHint}
          />
        );
      case 'education':
        return (
          <EducationInterface 
            stepData={currentStepData}
            onChoice={handleChoice}
            showHint={showHint}
            onUseHint={handleUseHint}
          />
        );
      default:
        return <div>Interface type not supported</div>;
    }
  };

  // Show failure modal for failed scenarios
  if (isFailureStep && !showResult) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-red-900 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-2xl w-full p-8 border border-gray-200 dark:border-gray-700">
          <div className="text-center">
            <div className="text-6xl mb-4">😔</div>
            
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Scenario Failed
            </h2>
            
            <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-6 mb-6 border border-red-200 dark:border-red-800">
              <div className="text-red-800 dark:text-red-300">
                {currentStepData.dialogue?.[0]?.text || 'Unfortunately, you fell victim to this fraud scenario.'}
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 mb-6 border border-blue-200 dark:border-blue-800">
              <h4 className="font-semibold text-blue-900 dark:text-blue-200 mb-3">💡 Learning Points:</h4>
              <div className="text-blue-800 dark:text-blue-300 text-sm">
                <p className="mb-2">{currentStepData.choices[0].explanation}</p>
                <ul className="text-left space-y-1 mt-3">
                  {scenarioContent.keyTakeaways.slice(0, 3).map((takeaway, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span>•</span>
                      <span>{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 mb-6 border border-yellow-200 dark:border-yellow-800">
              <div className="text-yellow-800 dark:text-yellow-300 text-center">
                <div className="font-semibold mb-1">Don't worry!</div>
                <div className="text-sm">Learning from mistakes makes you stronger against fraud.</div>
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={onExit}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
              >
                ← Back to Module
              </button>
              <button
                onClick={handleRetry}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
              >
                🔄 Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show success dialog for final steps instead of result screen
  if (isFinalStep && !showResult) {
    const handleSuccessfulCompletion = () => {
      // Mark scenario as completed with high score
      const completionData = {
        scenarioId: scenario.id,
        score: 100, // Full score for successful completion
        timeSpent: Date.now() - startTime,
        hintsUsed: state.currentSession.hints,
        choices: choices,
        completedAt: new Date().toISOString()
      };
      
      // Update the scenario progress in context
      dispatch({
        type: 'COMPLETE_SCENARIO',
        payload: completionData
      });

      // Use onComplete (not onExit) so ModulePage can check module completion synchronously
      onComplete({ scenarioId: scenario.id, score: 100 });
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-2xl w-full p-8 border border-gray-200 dark:border-gray-700">
          <div className="text-center">
            <div className="text-6xl mb-4">🎉</div>
            
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Scenario Successful!
            </h2>
            
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6 mb-6 border border-green-200 dark:border-green-800">
              <div className="text-green-800 dark:text-green-300">
                {currentStepData.dialogue?.[0]?.text || 'You successfully completed this fraud awareness scenario!'}
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-6 border border-blue-200 dark:border-blue-800">
              <h4 className="font-semibold text-blue-900 dark:text-blue-200 mb-2">Key Takeaways:</h4>
              <ul className="text-sm text-blue-800 dark:text-blue-300 text-left space-y-1">
                {scenarioContent.keyTakeaways.slice(0, 3).map((takeaway, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span>•</span>
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 mb-6 border border-yellow-200 dark:border-yellow-800">
              <div className="text-yellow-800 dark:text-yellow-300 text-center">
                <div className="font-semibold mb-1">Fraud Awareness +100 points</div>
                <div className="text-sm">Scenario marked as completed ✓</div>
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={handleRetry}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
              >
                🔄 Try Again
              </button>
              <button
                onClick={handleSuccessfulCompletion}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
              >
                ← Back to Module
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (showResult) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 py-8 px-4">
        <div className="max-w-2xl mx-auto space-y-6">

          {/* Score header */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-8 border border-gray-200 dark:border-gray-700 text-center">
            <div className="text-6xl mb-3">
              {scenarioScore >= 80 ? '🎉' : scenarioScore >= 60 ? '👍' : '📚'}
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">Scenario Complete!</h2>
            <div className={`text-5xl font-bold mb-4 ${scenarioScore >= 80 ? 'text-green-600' : scenarioScore >= 60 ? 'text-blue-600' : 'text-orange-600'}`}>
              {scenarioScore}%
            </div>
            <div className="grid grid-cols-3 gap-4 text-sm bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
              <div className="text-center">
                <div className="font-bold text-gray-900 dark:text-white text-lg">
                  {choices.filter(c => c.isCorrect).length}/{choices.length}
                </div>
                <div className="text-gray-500 dark:text-gray-400">Correct</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-gray-900 dark:text-white text-lg">{state.currentSession.hints}</div>
                <div className="text-gray-500 dark:text-gray-400">Hints Used</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-gray-900 dark:text-white text-lg">
                  {Math.round((Date.now() - startTime) / 1000)}s
                </div>
                <div className="text-gray-500 dark:text-gray-400">Time</div>
              </div>
            </div>
          </div>

          {/* Report card — decision breakdown */}
          {reportItems.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Your Decision Breakdown</h3>
              <div className="space-y-4">
                {reportItems.map((item, i) => (
                  <div
                    key={i}
                    className={`rounded-lg p-4 border-l-4 ${
                      item.isCorrect
                        ? 'bg-green-50 dark:bg-green-900/20 border-green-500'
                        : 'bg-red-50 dark:bg-red-900/20 border-red-500'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-xl mt-0.5">{item.isCorrect ? '✅' : '❌'}</span>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
                          {item.stepTitle}
                        </div>
                        <div className={`font-medium text-sm mb-2 ${item.isCorrect ? 'text-green-900 dark:text-green-200' : 'text-red-900 dark:text-red-200'}`}>
                          You chose: {item.choiceText}
                        </div>
                        <div className="text-sm text-gray-700 dark:text-gray-300">
                          {item.explanation}
                        </div>
                        {item.betterAnswer && (
                          <div className="mt-2 text-sm bg-white dark:bg-gray-700 rounded p-2 border border-green-200 dark:border-green-800">
                            <span className="text-green-700 dark:text-green-400 font-semibold">Better answer: </span>
                            <span className="text-gray-700 dark:text-gray-300">{item.betterAnswer}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Key takeaways */}
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
            <h4 className="font-semibold text-blue-900 dark:text-blue-200 mb-3">Key Takeaways</h4>
            <ul className="space-y-2">
              {scenarioContent.keyTakeaways.map((takeaway, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-blue-800 dark:text-blue-300">
                  <span className="text-blue-500 mt-0.5">•</span>
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <button
              onClick={handleRetry}
              className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
            >
              🔄 Try Again
            </button>
            <button
              onClick={handleCompleteScenario}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
            >
              ← Back to Module
            </button>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button 
              onClick={onExit}
              className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            >
              ← Exit
            </button>
            <div>
              <h1 className="text-lg font-bold text-gray-900 dark:text-white">{scenario.title}</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Step {currentStep + 1} of {scenarioContent.steps.length}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Hints: {state.currentSession.hints}
            </div>
            <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / scenarioContent.steps.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </header>

      {/* Scenario Interface */}
      <main className="p-4">
        {renderInterface()}
      </main>
    </div>
  );
} 