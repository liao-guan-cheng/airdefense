import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useGame } from '@/contexts/GameContext';
import { questions, getCategoryName } from '@/data/questions';
import { soundManager } from '@/lib/sounds';
import Header from './Header';

const TIMER_SECONDS = 30; // 每題30秒

const QuizScene: React.FC = () => {
  const { gameState, answerQuestion, completeChallenge } = useGame();
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);
  const [localIndex, setLocalIndex] = useState(0);
  const [localScore, setLocalScore] = useState(0);
  const [localCorrect, setLocalCorrect] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TIMER_SECONDS);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef<number>(Date.now());

  const categoryQuestions = useMemo(() => {
    return questions.filter(q => q.category === gameState.currentChallenge);
  }, [gameState.currentChallenge]);

  const totalQuestions = categoryQuestions.length;
  const currentQuestion = categoryQuestions[localIndex];
  const isLastQuestion = localIndex === totalQuestions - 1;
  const isCorrect = selectedAnswer === currentQuestion?.correctAnswer;

  // 計時器邏輯
  const startTimer = useCallback(() => {
    setTimeLeft(TIMER_SECONDS);
    startTimeRef.current = Date.now();
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          return 0;
        }
        if (prev <= 6) {
          soundManager.playTick();
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  // 時間到自動處理
  useEffect(() => {
    if (timeLeft === 0 && !isAnswered) {
      handleTimeUp();
    }
  }, [timeLeft, isAnswered]);

  // 每題開始時重置計時器
  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [localIndex, startTimer]);

  const handleTimeUp = () => {
    if (isAnswered) return;
    setIsAnswered(true);
    setShowFeedback(true);
    setSelectedAnswer(-1);
    soundManager.playWrong();
    const timeSpent = TIMER_SECONDS;
    answerQuestion(false, timeSpent);
  };

  const handleAnswer = (answerIndex: number) => {
    if (isAnswered) return;

    if (timerRef.current) clearInterval(timerRef.current);
    const timeSpent = (Date.now() - startTimeRef.current) / 1000;

    setSelectedAnswer(answerIndex);
    setShowFeedback(true);
    setIsAnswered(true);

    const correct = answerIndex === currentQuestion.correctAnswer;
    answerQuestion(correct, timeSpent);

    if (correct) {
      soundManager.playCorrect();
      const timeBonus = Math.max(0, Math.round((30 - timeSpent) / 6));
      setLocalScore(prev => prev + 10 + timeBonus);
      setLocalCorrect(prev => prev + 1);
    } else {
      soundManager.playWrong();
    }
  };

  const handleNext = () => {
    soundManager.playClick();
    if (isLastQuestion) {
      completeChallenge();
    } else {
      setLocalIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
      setIsAnswered(false);
    }
  };

  if (!currentQuestion) {
    return null;
  }

  const progressPercent = ((localIndex + 1) / totalQuestions) * 100;
  const optionLabels = ['A', 'B', 'C', 'D'];
  const timerPercent = (timeLeft / TIMER_SECONDS) * 100;
  const isTimerDanger = timeLeft <= 5;

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      <Header />

      {/* 背景 */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-[#0a1628] to-slate-900" />
      <div className="absolute inset-0 particle-bg pointer-events-none" />

      {/* 主要內容 */}
      <div className="relative z-10 min-h-screen flex flex-col px-3 sm:px-4 pt-16 sm:pt-20 pb-4 sm:pb-6">
        {/* 頂部資訊列 */}
        <div className="max-w-3xl mx-auto w-full mb-3 sm:mb-4">
          {/* 主題名稱和得分 */}
          <div className="flex items-center justify-between mb-1.5 sm:mb-2">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className="w-1 h-5 sm:h-6 bg-blue-500 rounded-full" />
              <h2 className="text-base sm:text-xl font-bold text-white truncate">
                {getCategoryName(gameState.currentChallenge || 'concept')}
              </h2>
            </div>
            <div className="text-right flex-shrink-0">
              <span className="text-slate-400 text-xs sm:text-sm">得分 </span>
              <span className="text-xl sm:text-2xl font-bold text-yellow-400">{localScore}</span>
            </div>
          </div>

          {/* 進度條 */}
          <div className="flex items-center gap-2 sm:gap-3 mb-1.5 sm:mb-2">
            <span className="text-slate-400 text-[10px] sm:text-xs whitespace-nowrap">
              {localIndex + 1}/{totalQuestions}
            </span>
            <div className="flex-1 h-1.5 sm:h-2 bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <span className="text-green-400 text-[10px] sm:text-xs whitespace-nowrap">
              正確 {localCorrect}
            </span>
          </div>

          {/* 計時器 */}
          <div className="relative h-2.5 sm:h-3 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
            <motion.div
              className={`h-full rounded-full transition-colors duration-300 ${
                isTimerDanger
                  ? 'bg-gradient-to-r from-red-600 to-red-400'
                  : 'bg-gradient-to-r from-green-500 to-emerald-400'
              }`}
              style={{ width: `${timerPercent}%` }}
              transition={{ duration: 0.3 }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className={`text-[9px] sm:text-[10px] font-bold ${isTimerDanger ? 'text-red-200' : 'text-white'}`}>
                {timeLeft}s
              </span>
            </div>
          </div>
          {isTimerDanger && !isAnswered && (
            <motion.p
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 0.5, repeat: Infinity }}
              className="text-red-400 text-[10px] sm:text-xs text-center mt-0.5 sm:mt-1 font-medium"
            >
              時間即將結束！
            </motion.p>
          )}
        </div>

        {/* 題目區域 */}
        <div className="max-w-3xl mx-auto w-full flex-1 flex flex-col overflow-y-auto">
          <motion.div
            key={localIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            className="glass-panel rounded-lg sm:rounded-xl p-3 sm:p-5 md:p-6 mb-3 sm:mb-4 border-slate-600/50"
          >
            <div className="flex items-start gap-2 sm:gap-3">
              <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-md sm:rounded-lg bg-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs sm:text-sm font-bold">Q</span>
              </div>
              <h3 className="text-sm sm:text-base md:text-lg font-bold text-white leading-relaxed">
                {currentQuestion.question}
              </h3>
            </div>
          </motion.div>

          {/* 選項 */}
          <div className="space-y-2 sm:space-y-2.5 mb-3 sm:mb-4">
            {currentQuestion.options.map((option, index) => {
              let optionStyle = 'glass-panel border-slate-600/50 hover:border-blue-500/50 hover:bg-blue-500/10';
              if (showFeedback) {
                if (index === currentQuestion.correctAnswer) {
                  optionStyle = 'bg-green-500/20 border-green-500/60';
                } else if (index === selectedAnswer && !isCorrect) {
                  optionStyle = 'bg-red-500/20 border-red-500/60';
                } else {
                  optionStyle = 'glass-panel border-slate-700/50 opacity-50';
                }
              }

              return (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  onClick={() => handleAnswer(index)}
                  disabled={isAnswered}
                  className={`w-full p-2.5 sm:p-3.5 md:p-4 rounded-lg sm:rounded-xl border text-left transition-all duration-200 ${optionStyle} ${!isAnswered ? 'active:scale-[0.98]' : ''}`}
                >
                  <div className="flex items-start gap-2 sm:gap-3">
                    <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-md sm:rounded-lg flex items-center justify-center flex-shrink-0 font-bold text-xs sm:text-sm ${
                      showFeedback && index === currentQuestion.correctAnswer
                        ? 'bg-green-500 text-white'
                        : showFeedback && index === selectedAnswer && !isCorrect
                        ? 'bg-red-500 text-white'
                        : 'bg-slate-700 text-slate-300'
                    }`}>
                      {showFeedback && index === currentQuestion.correctAnswer ? '✓' :
                       showFeedback && index === selectedAnswer && !isCorrect ? '✗' :
                       optionLabels[index]}
                    </div>
                    <span className="text-xs sm:text-sm md:text-base text-slate-200 leading-relaxed pt-0.5">
                      {option}
                    </span>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* 回饋訊息 */}
          <AnimatePresence>
            {showFeedback && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className={`rounded-lg sm:rounded-xl p-3 sm:p-4 mb-3 sm:mb-4 border ${
                  selectedAnswer === -1
                    ? 'bg-orange-500/10 border-orange-500/30'
                    : isCorrect
                    ? 'bg-green-500/10 border-green-500/30'
                    : 'bg-red-500/10 border-red-500/30'
                }`}
              >
                <div className="flex items-start gap-2">
                  <span className="text-base sm:text-lg flex-shrink-0">
                    {selectedAnswer === -1 ? '⏰' : isCorrect ? '🎉' : '❌'}
                  </span>
                  <div className="min-w-0">
                    <p className={`font-bold text-xs sm:text-sm mb-0.5 sm:mb-1 ${
                      selectedAnswer === -1
                        ? 'text-orange-300'
                        : isCorrect ? 'text-green-300' : 'text-red-300'
                    }`}>
                      {selectedAnswer === -1 ? '時間到！' : isCorrect ? '答對了！' : '答錯了！'}
                    </p>
                    <p className="text-slate-400 text-[11px] sm:text-xs leading-relaxed">
                      {currentQuestion.explanation}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 下一題按鈕 */}
          <AnimatePresence>
            {showFeedback && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="mt-auto"
              >
                <Button
                  onClick={handleNext}
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold py-4 sm:py-5 rounded-lg sm:rounded-xl shadow-lg shadow-blue-500/20 transition-all duration-200 active:scale-[0.97] text-sm sm:text-base"
                >
                  {isLastQuestion ? '完成挑戰 →' : '下一題 →'}
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default QuizScene;
