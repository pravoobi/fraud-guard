'use client';

import { createContext, useContext, useReducer, useEffect } from 'react';

const AppContext = createContext();

const initialState = {
  user: {
    name: '',
    fraudAwarenessScore: 0,
    completedModules: [],
    completedScenarios: [],
    currentModule: null,
    currentScenario: null,
    streak: 0,
    lastActivityDate: null,
    badges: [],
    totalTimeSpent: 0,
    totalScenariosCompleted: 0,
    averageScenarioScore: 0
  },
  progress: {
    modulesProgress: {},
    scenariosProgress: {},
    overallProgress: 0,
    dailyProgress: {},
    weeklyProgress: {}
  },
  currentSession: {
    moduleId: null,
    scenarioId: null,
    choices: [],
    startTime: null,
    hints: 0
  },
  settings: {
    language: 'en',
    darkMode: false,
    soundEnabled: true,
    hintsEnabled: true
  }
};

function appReducer(state, action) {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: { ...state.user, ...action.payload }
      };
    
    case 'START_MODULE':
      return {
        ...state,
        currentSession: {
          ...state.currentSession,
          moduleId: action.payload.moduleId,
          scenarioId: null,
          choices: [],
          startTime: Date.now(),
          hints: 0
        }
      };
    
    case 'START_SCENARIO':
      return {
        ...state,
        currentSession: {
          ...state.currentSession,
          scenarioId: action.payload.scenarioId,
          choices: [],
          startTime: Date.now(),
          hints: 0
        }
      };
    
    case 'MAKE_CHOICE':
      return {
        ...state,
        currentSession: {
          ...state.currentSession,
          choices: [...state.currentSession.choices, action.payload]
        }
      };
    
    case 'USE_HINT':
      return {
        ...state,
        currentSession: {
          ...state.currentSession,
          hints: state.currentSession.hints + 1
        }
      };
    
    case 'COMPLETE_SCENARIO':
      const scenarioScore = action.payload.score;
      const timeSpent = Date.now() - state.currentSession.startTime;
      const hintsUsed = state.currentSession.hints;
      
      // Calculate new average score
      const totalScenarios = state.user.totalScenariosCompleted + 1;
      const newAverageScore = ((state.user.averageScenarioScore * state.user.totalScenariosCompleted) + scenarioScore) / totalScenarios;
      
      // Update streak
      const today = new Date().toDateString();
      const lastActivity = state.user.lastActivityDate ? new Date(state.user.lastActivityDate).toDateString() : null;
      const newStreak = lastActivity === today ? state.user.streak : 
                       lastActivity === new Date(Date.now() - 24 * 60 * 60 * 1000).toDateString() ? state.user.streak + 1 : 1;
      
      const newScenarioProgress = {
        ...state.progress.scenariosProgress,
        [action.payload.scenarioId]: {
          completed: true,
          score: scenarioScore,
          timeSpent: timeSpent,
          hintsUsed: hintsUsed,
          choices: state.currentSession.choices,
          completedAt: new Date().toISOString(),
          moduleId: state.currentSession.moduleId
        }
      };
      
      // Update daily progress
      const todayKey = new Date().toDateString();
      const dailyProgress = {
        ...state.progress.dailyProgress,
        [todayKey]: {
          scenariosCompleted: (state.progress.dailyProgress[todayKey]?.scenariosCompleted || 0) + 1,
          totalScore: (state.progress.dailyProgress[todayKey]?.totalScore || 0) + scenarioScore,
          timeSpent: (state.progress.dailyProgress[todayKey]?.timeSpent || 0) + timeSpent
        }
      };
      
      return {
        ...state,
        progress: {
          ...state.progress,
          scenariosProgress: newScenarioProgress,
          dailyProgress: dailyProgress
        },
        user: {
          ...state.user,
          fraudAwarenessScore: Math.min(100, state.user.fraudAwarenessScore + Math.floor(scenarioScore / 10)),
          completedScenarios: [...state.user.completedScenarios, action.payload.scenarioId],
          totalScenariosCompleted: totalScenarios,
          averageScenarioScore: Math.round(newAverageScore),
          streak: newStreak,
          lastActivityDate: new Date().toISOString(),
          totalTimeSpent: state.user.totalTimeSpent + timeSpent
        }
      };
    
    case 'COMPLETE_MODULE':
      const moduleScore = action.payload.score;
      const moduleScenarios = action.payload.scenarios || [];
      
      const newModuleProgress = {
        ...state.progress.modulesProgress,
        [action.payload.moduleId]: {
          completed: true,
          score: moduleScore,
          completedAt: new Date().toISOString(),
          scenariosCompleted: moduleScenarios.length,
          averageScenarioScore: moduleScenarios.length > 0 ? 
            Math.round(moduleScenarios.reduce((acc, scenarioId) => 
              acc + (state.progress.scenariosProgress[scenarioId]?.score || 0), 0) / moduleScenarios.length) : 0
        }
      };
      
      // Check for badges
      const newBadges = [...state.user.badges];
      if (!state.user.completedModules.includes(action.payload.moduleId)) {
        newBadges.push({
          id: `module-${action.payload.moduleId}`,
          name: `Module Master`,
          description: `Completed ${action.payload.moduleId} module`,
          icon: '🏆',
          earnedAt: new Date().toISOString()
        });
      }
      
      // Check for streak badges
      if (state.user.streak >= 7 && !state.user.badges.find(b => b.id === 'week-streak')) {
        newBadges.push({
          id: 'week-streak',
          name: 'Week Warrior',
          description: '7-day learning streak',
          icon: '🔥',
          earnedAt: new Date().toISOString()
        });
      }
      
      return {
        ...state,
        progress: {
          ...state.progress,
          modulesProgress: newModuleProgress
        },
        user: {
          ...state.user,
          completedModules: [...state.user.completedModules, action.payload.moduleId],
          fraudAwarenessScore: Math.min(100, state.user.fraudAwarenessScore + Math.floor(moduleScore / 5)),
          badges: newBadges
        }
      };
    
    case 'UPDATE_SETTINGS':
      return {
        ...state,
        settings: { ...state.settings, ...action.payload }
      };
    
    case 'RESET_PROGRESS':
      return initialState;
    
    case 'UPDATE_STREAK':
      return {
        ...state,
        user: {
          ...state.user,
          streak: action.payload.streak,
          lastActivityDate: action.payload.lastActivityDate
        }
      };
    
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load saved state from sessionStorage on mount
  useEffect(() => {
    const savedState = sessionStorage.getItem('fraudAwarenessApp');
    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState);
        // Merge saved state with initial state
        dispatch({ type: 'SET_USER', payload: parsedState.user || {} });
        
        if (parsedState.progress) {
          // Restore module progress
          Object.keys(parsedState.progress.modulesProgress || {}).forEach(moduleId => {
            const moduleData = parsedState.progress.modulesProgress[moduleId];
            dispatch({ 
              type: 'COMPLETE_MODULE', 
              payload: { 
                moduleId, 
                score: moduleData.score || 0,
                scenarios: moduleData.scenarios || []
              } 
            });
          });
          
          // Restore scenario progress
          Object.keys(parsedState.progress.scenariosProgress || {}).forEach(scenarioId => {
            const scenarioData = parsedState.progress.scenariosProgress[scenarioId];
            dispatch({
              type: 'COMPLETE_SCENARIO',
              payload: {
                scenarioId,
                score: scenarioData.score || 0,
                timeSpent: scenarioData.timeSpent || 0,
                hintsUsed: scenarioData.hintsUsed || 0,
                choices: scenarioData.choices || [],
                completedAt: scenarioData.completedAt
              }
            });
          });
        }
        
        // Restore progress data
        if (parsedState.progress) {
          dispatch({ type: 'SET_PROGRESS', payload: parsedState.progress });
        }
      } catch (error) {
        console.error('Error loading saved state:', error);
      }
    }
  }, []);

  // Save state to sessionStorage whenever it changes
  useEffect(() => {
    sessionStorage.setItem('fraudAwarenessApp', JSON.stringify(state));
  }, [state]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
} 