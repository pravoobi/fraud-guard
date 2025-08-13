'use client';

export default function FraudAwarenessScore({ score }) {
  const getScoreLevel = (score) => {
    if (score >= 90) return { level: 'Expert', color: 'text-green-600', bgColor: 'bg-green-100 dark:bg-green-900/20', icon: '🛡️' };
    if (score >= 80) return { level: 'Advanced', color: 'text-blue-600', bgColor: 'bg-blue-100 dark:bg-blue-900/20', icon: '🔒' };
    if (score >= 60) return { level: 'Proficient', color: 'text-purple-600', bgColor: 'bg-purple-100 dark:bg-purple-900/20', icon: '⚡' };
    if (score >= 40) return { level: 'Learning', color: 'text-yellow-600', bgColor: 'bg-yellow-100 dark:bg-yellow-900/20', icon: '📚' };
    if (score >= 20) return { level: 'Beginner', color: 'text-orange-600', bgColor: 'bg-orange-100 dark:bg-orange-900/20', icon: '🌱' };
    return { level: 'New', color: 'text-gray-600', bgColor: 'bg-gray-100 dark:bg-gray-900/20', icon: '👶' };
  };

  const scoreInfo = getScoreLevel(score);

  return (
    <div className="flex items-center space-x-4 bg-white dark:bg-gray-800 rounded-lg px-4 py-3 shadow-md border border-gray-200 dark:border-gray-700">
      {/* Score Circle */}
      <div className="relative">
        <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
          <path
            className="text-gray-300 dark:text-gray-600"
            strokeDasharray="100, 100"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
          />
          <path
            className={scoreInfo.color}
            strokeDasharray={`${score}, 100`}
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-bold text-gray-900 dark:text-white">{score}</span>
        </div>
      </div>

      {/* Score Info */}
      <div className="flex-1">
        <div className="flex items-center space-x-2 mb-1">
          <span className="text-lg">{scoreInfo.icon}</span>
          <span className="text-sm font-semibold text-gray-900 dark:text-white">Fraud Awareness</span>
        </div>
        <div className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${scoreInfo.bgColor} ${scoreInfo.color}`}>
          {scoreInfo.level} Level
        </div>
      </div>
    </div>
  );
} 