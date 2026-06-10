import React, { createContext, useContext, useState, useCallback } from 'react';

export type GamePhase = 'intro' | 'name-input' | 'challenge-select' | 'quiz' | 'assembly' | 'battle' | 'victory' | 'leaderboard';
export type ChallengeCategory = 'concept' | 'app' | 'package';

export interface GameState {
  phase: GamePhase;
  playerName: string;
  completedChallenges: Set<ChallengeCategory>;
  currentChallenge: ChallengeCategory | null;
  currentQuestionIndex: number;
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  totalTimeSpent: number; // 總答題時間（秒）
}

interface GameContextType {
  gameState: GameState;
  setPhase: (phase: GamePhase) => void;
  setPlayerName: (name: string) => void;
  startGame: () => void;
  selectChallenge: (category: ChallengeCategory) => void;
  answerQuestion: (isCorrect: boolean, timeSpent?: number) => void;
  completeChallenge: () => void;
  startAssembly: () => void;
  startBattle: () => void;
  resetGame: () => void;
  addTimeSpent: (seconds: number) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [gameState, setGameState] = useState<GameState>({
    phase: 'intro',
    playerName: '',
    completedChallenges: new Set(),
    currentChallenge: null,
    currentQuestionIndex: 0,
    score: 0,
    correctAnswers: 0,
    totalQuestions: 0,
    totalTimeSpent: 0,
  });

  const setPhase = useCallback((phase: GamePhase) => {
    setGameState(prev => ({ ...prev, phase }));
  }, []);

  const setPlayerName = useCallback((name: string) => {
    setGameState(prev => ({ ...prev, playerName: name }));
  }, []);

  const startGame = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      phase: 'challenge-select',
    }));
  }, []);

  const selectChallenge = useCallback((category: ChallengeCategory) => {
    setGameState(prev => ({
      ...prev,
      phase: 'quiz',
      currentChallenge: category,
      currentQuestionIndex: 0,
    }));
  }, []);

  const answerQuestion = useCallback((isCorrect: boolean, timeSpent?: number) => {
    setGameState(prev => {
      // 計算時間獎勵分數
      const timeBonus = timeSpent !== undefined ? Math.max(0, Math.round((30 - timeSpent) / 6)) : 0;
      const scoreGain = isCorrect ? 10 + timeBonus : 0;

      return {
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1,
        correctAnswers: isCorrect ? prev.correctAnswers + 1 : prev.correctAnswers,
        score: prev.score + scoreGain,
        totalTimeSpent: prev.totalTimeSpent + (timeSpent || 0),
      };
    });
  }, []);

  const completeChallenge = useCallback(() => {
    setGameState(prev => {
      const newCompleted = new Set(prev.completedChallenges);
      if (prev.currentChallenge) {
        newCompleted.add(prev.currentChallenge);
      }

      if (newCompleted.size === 3) {
        return {
          ...prev,
          phase: 'assembly' as GamePhase,
          completedChallenges: newCompleted,
          currentChallenge: null,
        };
      }

      return {
        ...prev,
        phase: 'challenge-select' as GamePhase,
        completedChallenges: newCompleted,
        currentChallenge: null,
      };
    });
  }, []);

  const startAssembly = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      phase: 'assembly',
    }));
  }, []);

  const startBattle = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      phase: 'battle',
    }));
  }, []);

  const addTimeSpent = useCallback((seconds: number) => {
    setGameState(prev => ({
      ...prev,
      totalTimeSpent: prev.totalTimeSpent + seconds,
    }));
  }, []);

  const resetGame = useCallback(() => {
    setGameState({
      phase: 'intro',
      playerName: '',
      completedChallenges: new Set(),
      currentChallenge: null,
      currentQuestionIndex: 0,
      score: 0,
      correctAnswers: 0,
      totalQuestions: 0,
      totalTimeSpent: 0,
    });
  }, []);

  const value: GameContextType = {
    gameState,
    setPhase,
    setPlayerName,
    startGame,
    selectChallenge,
    answerQuestion,
    completeChallenge,
    startAssembly,
    startBattle,
    resetGame,
    addTimeSpent,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
