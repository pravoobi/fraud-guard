'use client';

import { useApp } from '@/contexts/AppContext';

export default function ModuleCard({ module, progress, onStart }) {
  const { state } = useApp();
  
  const isCompleted = progress?.completed || false;
  const score = progress?.score || 0;
  
  // Calculate scenario progress for this module
  const moduleScenarios = module.scenarios || [];
  const completedScenarios = moduleScenarios.filter(scenario => 
    state.user.completedScenarios.includes(scenario.id)
  ).length;
  
  // Calculate average scenario score for this module
  const scenarioScores = moduleScenarios
    .map(scenario => state.progress.scenariosProgress[scenario.id]?.score || 0)
    .filter(score => score > 0);
  const averageScenarioScore = scenarioScores.length > 0 
    ? Math.round(scenarioScores.reduce((acc, score) => acc + score, 0) / scenarioScores.length)
    : 0;
  
  const difficultyColors = {
    'Beginner': 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
    'Intermediate': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
    'Advanced': 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
  };

  const handleCardClick = () => {
    if (!isCompleted) {
      onStart();
    }
  };

  return (
    <div 
      className={`
        bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 
        transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer overflow-hidden
        ${isCompleted ? 'ring-2 ring-green-500 ring-opacity-50' : ''}
      `}
      onClick={handleCardClick}
    >
      {/* Header with color accent */}
      <div className={`h-2 ${module.color}`}></div>
      
      <div className="p-6">
        {/* Module Icon and Title */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="text-3xl">{module.icon}</div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">{module.title}</h3>
              <div className="flex items-center space-x-2 mt-1">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${difficultyColors[module.difficulty]}`}>
                  {module.difficulty}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">⏱️ {module.estimatedTime}</span>
              </div>
            </div>
          </div>
          
          {isCompleted && (
            <div className="flex flex-col items-center">
              <div className="text-2xl mb-1">✅</div>
              <span className="text-xs text-green-600 dark:text-green-400 font-medium">{score}%</span>
            </div>
          )}
        </div>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm leading-relaxed">
          {module.description}
        </p>

        {/* Scenarios Preview with Progress */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Scenarios:</h4>
          <div className="space-y-1">
            {moduleScenarios.slice(0, 2).map((scenario, index) => {
              const isScenarioCompleted = state.user.completedScenarios.includes(scenario.id);
              const scenarioScore = state.progress.scenariosProgress[scenario.id]?.score || 0;
              
              return (
                <div key={scenario.id} className="flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${isScenarioCompleted ? 'bg-green-500' : 'bg-blue-500'}`}></div>
                    <span className={`text-gray-600 dark:text-gray-400 ${isScenarioCompleted ? 'line-through' : ''}`}>
                      {scenario.title}
                    </span>
                  </div>
                  {isScenarioCompleted && (
                    <span className="text-green-600 dark:text-green-400 font-medium">{scenarioScore}%</span>
                  )}
                </div>
              );
            })}
            {moduleScenarios.length > 2 && (
              <div className="text-xs text-gray-500 dark:text-gray-400 ml-4">
                +{moduleScenarios.length - 2} more scenarios
              </div>
            )}
          </div>
        </div>

        {/* Action Button */}
        <button 
          className={`
            w-full py-3 px-4 rounded-lg font-semibold transition-colors text-sm
            ${isCompleted 
              ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400 cursor-default' 
              : 'bg-blue-600 hover:bg-blue-700 text-white'
            }
          `}
          onClick={(e) => {
            e.stopPropagation();
            handleCardClick();
          }}
        >
          {isCompleted ? '✓ Completed' : 'Start Learning'}
        </button>

        {/* Progress Indicators */}
        {moduleScenarios.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400 mb-2">
              <span>Progress</span>
              <span>{completedScenarios}/{moduleScenarios.length} scenarios</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ 
                  width: `${moduleScenarios.length > 0 ? (completedScenarios / moduleScenarios.length) * 100 : 0}%` 
                }}
              ></div>
            </div>
            
            {/* Additional Progress Stats */}
            {completedScenarios > 0 && (
              <div className="mt-3 grid grid-cols-2 gap-4 text-xs">
                <div className="text-center">
                  <div className="font-semibold text-blue-600 dark:text-blue-400">
                    {averageScenarioScore}%
                  </div>
                  <div className="text-gray-500 dark:text-gray-400">Avg Score</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-green-600 dark:text-green-400">
                    {Math.round(progress?.timeSpent / 1000 / 60) || 0}m
                  </div>
                  <div className="text-gray-500 dark:text-gray-400">Time Spent</div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
} 