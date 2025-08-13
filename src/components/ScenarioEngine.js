'use client';

import { useState, useEffect } from 'react';
import { useApp } from '@/contexts/AppContext';
import { scenarioData } from '@/data/scenarios';
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

  const scenarioContent = scenarioData[scenario.id];

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
    
    // Base score calculation
    let score = Math.round((correctChoices / totalChoices) * 100);
    
    // Penalty for hints
    score = Math.max(0, score - (hintsUsed * 5));
    
    // Bonus for speed (if completed quickly)
    const timeBonus = totalChoices < 3 && finalChoices[finalChoices.length - 1].timestamp < 60000 ? 10 : 0;
    score = Math.min(100, score + timeBonus);

    setScenarioScore(score);
    setShowResult(true);
    return score;
  };

  const handleUseHint = () => {
    dispatch({ type: 'USE_HINT' });
    setShowHint(true);
  };

  const handleCompleteScenario = () => {
    // Calculate final score
    const finalScore = calculateFinalScore(choices);
    
    // Dispatch scenario completion
    dispatch({
      type: 'COMPLETE_SCENARIO',
      payload: {
        scenarioId: scenario.id,
        score: finalScore,
        timeSpent: Date.now() - startTime,
        hintsUsed: state.currentSession.hints,
        choices: choices,
        completedAt: new Date().toISOString()
      }
    });
    
    // Check if all scenarios in the module are completed
    const moduleScenarios = module.scenarios || [];
    const completedScenarios = moduleScenarios.filter(scenario => 
      state.progress.scenariosProgress[scenario.id]?.completed
    ).length;
    
    // If all scenarios are completed, mark module as complete
    if (completedScenarios === moduleScenarios.length && moduleScenarios.length > 0) {
      const moduleScore = Math.round(
        moduleScenarios.reduce((acc, scenario) => 
          acc + (state.progress.scenariosProgress[scenario.id]?.score || 0), 0
        ) / moduleScenarios.length
      );
      
      dispatch({
        type: 'COMPLETE_MODULE',
        payload: {
          moduleId: module.id,
          score: moduleScore,
          scenarios: moduleScenarios.map(s => s.id)
        }
      });
    }
    
    onComplete({
      scenarioId: scenario.id,
      score: finalScore,
      choices,
      timeSpent: Date.now() - startTime,
      hintsUsed: state.currentSession.hints
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
      
      // Return to module
      onExit();
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-2xl w-full p-8 border border-gray-200 dark:border-gray-700">
          <div className="text-center">
            <div className="text-6xl mb-4">
              {scenarioScore >= 80 ? '🎉' : scenarioScore >= 60 ? '👍' : '📚'}
            </div>
            
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Scenario Complete!
            </h2>
            
            <div className="text-4xl font-bold mb-4">
              <span className={`${scenarioScore >= 80 ? 'text-green-600' : scenarioScore >= 60 ? 'text-blue-600' : 'text-orange-600'}`}>
                {scenarioScore}%
              </span>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6 mb-6 text-left">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Performance Summary</h3>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600 dark:text-gray-400">Correct Choices:</span>
                  <span className="font-semibold text-gray-900 dark:text-white ml-2">
                    {choices.filter(c => c.isCorrect).length}/{choices.length}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600 dark:text-gray-400">Hints Used:</span>
                  <span className="font-semibold text-gray-900 dark:text-white ml-2">
                    {state.currentSession.hints}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600 dark:text-gray-400">Time Taken:</span>
                  <span className="font-semibold text-gray-900 dark:text-white ml-2">
                    {Math.round((Date.now() - startTime) / 1000)}s
                  </span>
                </div>
                <div>
                  <span className="text-gray-600 dark:text-gray-400">Fraud Awareness:</span>
                  <span className="font-semibold text-green-600 ml-2">
                    +{scenarioScore} points
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                <h4 className="font-semibold text-blue-900 dark:text-blue-200 mb-2">Key Takeaways:</h4>
                <ul className="text-sm text-blue-800 dark:text-blue-300 text-left space-y-1">
                  {scenarioContent.keyTakeaways.map((takeaway, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span>•</span>
                      <span>{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={handleRetry}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
                >
                  🔄 Try Again
                </button>
                <button
                  onClick={onExit}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
                >
                  ← Back to Module
                </button>
              </div>
            </div>
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