'use client';

import { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { fraudModules } from '@/data/modules';
import ScenarioEngine from './ScenarioEngine';
import Link from 'next/link';

export default function ModulePage({ moduleId }) {
  const { state, dispatch } = useApp();
  const [activeScenarioId, setActiveScenarioId] = useState(null);
  
  const module = fraudModules.find(m => m.id === moduleId);
  const progress = state.progress.modulesProgress[moduleId];

  if (!module) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Module Not Found</h1>
          <Link href="/dashboard" className="text-blue-600 hover:text-blue-700">← Back to Dashboard</Link>
        </div>
      </div>
    );
  }

  const handleStartScenario = (scenarioId) => {
    dispatch({ type: 'START_SCENARIO', payload: { scenarioId } });
    setActiveScenarioId(scenarioId);
  };

  const handleCompleteScenario = (scenarioResult) => {
    dispatch({ 
      type: 'COMPLETE_SCENARIO', 
      payload: scenarioResult
    });
    setActiveScenarioId(null);
    
    // Check if all scenarios in module are completed after the state update
    setTimeout(() => {
      const updatedState = JSON.parse(sessionStorage.getItem('fraudAwarenessApp') || '{}');
      const completedScenarios = Object.keys(updatedState.progress?.scenariosProgress || {});
      const moduleScenarios = module.scenarios.map(s => s.id);
      const allCompleted = moduleScenarios.every(sid => 
        completedScenarios.includes(sid) && 
        updatedState.progress.scenariosProgress[sid].completed
      );
      
      if (allCompleted) {
        const averageScore = moduleScenarios.reduce((acc, sid) => {
          return acc + (updatedState.progress.scenariosProgress[sid]?.score || 0);
        }, 0) / moduleScenarios.length;
        
        dispatch({ 
          type: 'COMPLETE_MODULE', 
          payload: { 
            moduleId, 
            score: Math.round(averageScore) 
          } 
        });
      }
    }, 100);
  };

  if (activeScenarioId) {
    const scenario = module.scenarios.find(s => s.id === activeScenarioId);
    return (
      <ScenarioEngine 
        scenario={scenario}
        module={module}
        onComplete={handleCompleteScenario}
        onExit={() => setActiveScenarioId(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard" className="text-blue-600 hover:text-blue-700 font-medium">
                ← Back to Dashboard
              </Link>
              <div className="text-2xl">{module.icon}</div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{module.title}</h1>
                <p className="text-sm text-gray-600 dark:text-gray-300">{module.description}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600 dark:text-gray-300">
                <div>Difficulty: <span className="font-semibold">{module.difficulty}</span></div>
                <div>Duration: <span className="font-semibold">{module.estimatedTime}</span></div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Module Overview */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8 border border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Learning Objectives</h2>
              <div className="space-y-3 mb-6">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mt-0.5">
                    <span className="text-blue-600 text-sm">✓</span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">Identify common fraud patterns and red flags</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mt-0.5">
                    <span className="text-blue-600 text-sm">✓</span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">Practice safe response techniques in realistic scenarios</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mt-0.5">
                    <span className="text-blue-600 text-sm">✓</span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">Learn verification steps and safety protocols</p>
                </div>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">What You'll Learn</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                This module provides hands-on experience with real-world fraud scenarios. 
                Each interactive scenario teaches you to recognize warning signs, make safe decisions, 
                and protect yourself from common fraud techniques.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Module Progress</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
                    <span>Scenarios Completed</span>
                    <span>{Object.keys(state.progress.scenariosProgress).filter(id => 
                      module.scenarios.some(s => s.id === id) && 
                      state.progress.scenariosProgress[id]?.completed
                    ).length}/{module.scenarios.length}</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ 
                        width: `${module.scenarios.length > 0 ? 
                          (Object.keys(state.progress.scenariosProgress).filter(id => 
                            module.scenarios.some(s => s.id === id) && 
                            state.progress.scenariosProgress[id]?.completed
                          ).length / module.scenarios.length) * 100 : 0}%` 
                      }}
                    ></div>
                  </div>
                </div>
                
                {progress?.completed && (
                  <div className="bg-green-100 dark:bg-green-900/20 rounded-lg p-4 text-center">
                    <div className="text-2xl mb-2">🎉</div>
                    <div className="text-green-800 dark:text-green-400 font-semibold">
                      Module Completed!
                    </div>
                    <div className="text-green-600 dark:text-green-500 text-sm">
                      Score: {progress.score}%
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Scenarios List */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Interactive Scenarios</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {module.scenarios.map((scenario, index) => {
              const scenarioProgress = state.progress.scenariosProgress[scenario.id];
              const isCompleted = scenarioProgress?.completed || false;
              const isUnlocked = index === 0 || state.progress.scenariosProgress[module.scenarios[index - 1]?.id]?.completed;

              return (
                <div 
                  key={scenario.id}
                  className={`
                    bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6
                    transition-all duration-300 hover:shadow-xl
                    ${!isUnlocked ? 'opacity-50' : ''}
                    ${isCompleted ? 'ring-2 ring-green-500 ring-opacity-50' : ''}
                  `}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`
                        w-10 h-10 rounded-full flex items-center justify-center font-bold text-white
                        ${isCompleted ? 'bg-green-500' : isUnlocked ? 'bg-blue-500' : 'bg-gray-400'}
                      `}>
                        {isCompleted ? '✓' : index + 1}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">{scenario.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">{scenario.type.replace('-', ' ')}</p>
                        {isCompleted && (
                          <div className="flex items-center space-x-2 mt-1">
                            <span className="text-xs bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 px-2 py-0.5 rounded-full">
                              Completed
                            </span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {new Date(scenarioProgress.completedAt).toLocaleDateString()}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {isCompleted && scenarioProgress && (
                      <div className="text-center">
                        <div className="text-green-600 dark:text-green-400 font-bold text-lg">
                          {scenarioProgress.score}%
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {scenarioProgress.hintsUsed} hints used
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {Math.round(scenarioProgress.timeSpent / 1000)}s
                        </div>
                      </div>
                    )}
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm leading-relaxed">
                    {scenario.description}
                  </p>

                  <button
                    onClick={() => isUnlocked && handleStartScenario(scenario.id)}
                    disabled={!isUnlocked}
                    className={`
                      w-full py-3 px-4 rounded-lg font-semibold transition-colors text-sm
                      ${!isUnlocked 
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                        : isCompleted 
                          ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900/40' 
                          : 'bg-blue-600 hover:bg-blue-700 text-white'
                      }
                    `}
                  >
                    {!isUnlocked ? '🔒 Complete Previous Scenario' : isCompleted ? 'Review Scenario' : 'Start Scenario'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
} 