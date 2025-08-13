'use client';

import { useApp } from '@/contexts/AppContext';
import { fraudModules } from '@/data/modules';

export default function ProgressOverview() {
  const { state } = useApp();
  
  const totalModules = fraudModules.length;
  const completedModules = state.user.completedModules.length;
  const progressPercentage = (completedModules / totalModules) * 100;
  
  const totalScenarios = fraudModules.reduce((acc, module) => acc + module.scenarios.length, 0);
  // Calculate completed scenarios by counting actual completed scenarios in progress
  const completedScenarios = Object.keys(state.progress.scenariosProgress).filter(
    scenarioId => state.progress.scenariosProgress[scenarioId]?.completed
  ).length;
  const scenariosProgressPercentage = (completedScenarios / totalScenarios) * 100;
  
  const getProgressLevel = (score) => {
    if (score >= 80) return { level: 'Expert', color: 'text-green-600', bgColor: 'bg-green-100 dark:bg-green-900/20' };
    if (score >= 60) return { level: 'Advanced', color: 'text-blue-600', bgColor: 'bg-blue-100 dark:bg-blue-900/20' };
    if (score >= 40) return { level: 'Intermediate', color: 'text-yellow-600', bgColor: 'bg-yellow-100 dark:bg-yellow-900/20' };
    if (score >= 20) return { level: 'Beginner', color: 'text-orange-600', bgColor: 'bg-orange-100 dark:bg-orange-900/20' };
    return { level: 'New Learner', color: 'text-gray-600', bgColor: 'bg-gray-100 dark:bg-gray-900/20' };
  };

  const currentLevel = getProgressLevel(state.user.fraudAwarenessScore);

  // Calculate today's progress
  const today = new Date().toDateString();
  const todayProgress = state.progress.dailyProgress[today] || { scenariosCompleted: 0, totalScore: 0, timeSpent: 0 };

  // Calculate weekly progress
  const getWeekProgress = () => {
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    let weeklyScenarios = 0;
    let weeklyScore = 0;
    let weeklyTime = 0;
    
    Object.keys(state.progress.dailyProgress).forEach(date => {
      const progressDate = new Date(date);
      if (progressDate >= weekAgo) {
        const dayProgress = state.progress.dailyProgress[date];
        weeklyScenarios += dayProgress.scenariosCompleted || 0;
        weeklyScore += dayProgress.totalScore || 0;
        weeklyTime += dayProgress.timeSpent || 0;
      }
    });
    
    return { scenarios: weeklyScenarios, score: weeklyScore, time: weeklyTime };
  };

  const weeklyProgress = getWeekProgress();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8 border border-gray-200 dark:border-gray-700">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Your Progress Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {/* Fraud Awareness Score */}
        <div className="text-center">
          <div className="relative inline-flex items-center justify-center w-20 h-20 mb-3">
            <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-gray-300 dark:text-gray-600"
                strokeDasharray="100, 100"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                className={currentLevel.color}
                strokeDasharray={`${state.user.fraudAwarenessScore}, 100`}
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <span className="absolute text-lg font-bold text-gray-900 dark:text-white">
              {state.user.fraudAwarenessScore}
            </span>
          </div>
          <h3 className="font-semibold text-gray-900 dark:text-white">Awareness Score</h3>
          <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${currentLevel.bgColor} ${currentLevel.color}`}>
            {currentLevel.level}
          </span>
        </div>

        {/* Modules Completed */}
        <div className="text-center">
          <div className="text-3xl font-bold text-blue-600 mb-2">{completedModules}</div>
          <h3 className="font-semibold text-gray-900 dark:text-white">Modules</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">of {totalModules} completed</p>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Scenarios Completed */}
        <div className="text-center">
          <div className="text-3xl font-bold text-green-600 mb-2">{completedScenarios}</div>
          <h3 className="font-semibold text-gray-900 dark:text-white">Scenarios</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">of {totalScenarios} completed</p>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
            <div 
              className="bg-green-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${scenariosProgressPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Learning Streak */}
        <div className="text-center">
          <div className="text-3xl font-bold text-orange-600 mb-2">{state.user.streak}</div>
          <h3 className="font-semibold text-gray-900 dark:text-white">Day Streak</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Keep learning daily!</p>
          <div className="flex justify-center mt-2">
            {[...Array(7)].map((_, i) => (
              <div 
                key={i} 
                className={`w-2 h-2 mx-0.5 rounded-full ${
                  i < state.user.streak ? 'bg-orange-500' : 'bg-gray-300 dark:bg-gray-600'
                }`}
              ></div>
            ))}
          </div>
        </div>
      </div>

      {/* Detailed Progress Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Today's Progress */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
          <h3 className="font-semibold text-blue-900 dark:text-blue-200 mb-3">Today's Progress</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-blue-800 dark:text-blue-300 text-sm">Scenarios:</span>
              <span className="font-semibold text-blue-900 dark:text-blue-200">{todayProgress.scenariosCompleted}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-blue-800 dark:text-blue-300 text-sm">Score:</span>
              <span className="font-semibold text-blue-900 dark:text-blue-200">{todayProgress.totalScore}</span>
            </div>
          </div>
        </div>

        {/* Weekly Progress */}
        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
          <h3 className="font-semibold text-green-900 dark:text-green-200 mb-3">This Week</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-green-800 dark:text-green-300 text-sm">Scenarios:</span>
              <span className="font-semibold text-green-900 dark:text-green-200">{weeklyProgress.scenarios}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-green-800 dark:text-green-300 text-sm">Score:</span>
              <span className="font-semibold text-green-900 dark:text-green-200">{weeklyProgress.score}</span>
            </div>
          </div>
        </div>

        {/* Average Performance */}
        <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border border-purple-200 dark:border-purple-800">
          <h3 className="font-semibold text-purple-900 dark:text-purple-200 mb-3">Performance</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-purple-800 dark:text-purple-300 text-sm">Avg Score:</span>
              <span className="font-semibold text-purple-900 dark:text-purple-200">{state.user.averageScenarioScore}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-purple-800 dark:text-purple-300 text-sm">Badges:</span>
              <span className="font-semibold text-purple-900 dark:text-purple-200">{state.user.badges.length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Achievements */}
      <div>
        <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Recent Achievements</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {state.user.badges.length > 0 ? (
            state.user.badges.slice(-3).map((badge, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 text-center">
                <div className="text-2xl mb-2">{badge.icon}</div>
                <h4 className="font-medium text-gray-900 dark:text-white text-sm">{badge.name}</h4>
                <p className="text-xs text-gray-600 dark:text-gray-400">{badge.description}</p>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                  {new Date(badge.earnedAt).toLocaleDateString()}
                </p>
              </div>
            ))
          ) : (
            <>
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 text-center opacity-50">
                <div className="text-2xl mb-2">🏆</div>
                <h4 className="font-medium text-gray-500 dark:text-gray-400 text-sm">First Module</h4>
                <p className="text-xs text-gray-400 dark:text-gray-500">Complete your first module</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 text-center opacity-50">
                <div className="text-2xl mb-2">🎯</div>
                <h4 className="font-medium text-gray-500 dark:text-gray-400 text-sm">Perfect Score</h4>
                <p className="text-xs text-gray-400 dark:text-gray-500">Score 100% on any scenario</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 text-center opacity-50">
                <div className="text-2xl mb-2">🔥</div>
                <h4 className="font-medium text-gray-500 dark:text-gray-400 text-sm">Week Streak</h4>
                <p className="text-xs text-gray-400 dark:text-gray-500">Learn for 7 days straight</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
} 