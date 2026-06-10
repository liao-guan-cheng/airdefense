import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useGame } from '@/contexts/GameContext';
import { getLeaderboard } from '@/lib/leaderboard';
import Header from './Header';

const LeaderboardScene: React.FC = () => {
  const { resetGame } = useGame();
  const leaderboard = getLeaderboard();

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      <Header />

      {/* 背景 */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-[#0a1628] to-slate-900" />
      <div className="absolute inset-0 particle-bg pointer-events-none" />

      {/* 主要內容 */}
      <div className="relative z-10 min-h-screen flex flex-col px-3 sm:px-4 pt-14 sm:pt-20 pb-4 sm:pb-8">
        <div className="max-w-2xl mx-auto w-full">
          {/* 標題 */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-4 sm:mb-6"
          >
            <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-white mb-1 sm:mb-2">
              <span className="text-yellow-400">🏆</span> 排行榜
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm">根據得分與答題速度排名</p>
          </motion.div>

          {/* 排行榜列表 */}
          <div className="space-y-2 sm:space-y-2.5">
            {leaderboard.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="glass-panel rounded-lg sm:rounded-xl p-5 sm:p-8 text-center border-slate-600/50"
              >
                <p className="text-slate-400 text-base sm:text-lg">目前還沒有紀錄</p>
                <p className="text-slate-500 text-xs sm:text-sm mt-1 sm:mt-2">完成挑戰後你的成績將會顯示在這裡</p>
              </motion.div>
            ) : (
              leaderboard.map((entry, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`glass-panel rounded-lg sm:rounded-xl p-3 sm:p-4 border ${
                    index === 0
                      ? 'border-yellow-500/50 bg-yellow-500/5'
                      : index === 1
                      ? 'border-slate-400/50 bg-slate-400/5'
                      : index === 2
                      ? 'border-amber-600/50 bg-amber-600/5'
                      : 'border-slate-600/50'
                  }`}
                >
                  <div className="flex items-center gap-2 sm:gap-3">
                    {/* 排名 */}
                    <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-md sm:rounded-lg flex items-center justify-center font-bold text-sm sm:text-lg flex-shrink-0 ${
                      index === 0
                        ? 'bg-yellow-500/20 text-yellow-400'
                        : index === 1
                        ? 'bg-slate-400/20 text-slate-300'
                        : index === 2
                        ? 'bg-amber-600/20 text-amber-400'
                        : 'bg-slate-700/50 text-slate-400'
                    }`}>
                      {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}`}
                    </div>

                    {/* 名字和日期 */}
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-bold text-xs sm:text-sm truncate">{entry.name}</p>
                      <p className="text-slate-500 text-[10px] sm:text-xs">{entry.date}</p>
                    </div>

                    {/* 統計 - 手機版精簡顯示 */}
                    <div className="flex items-center gap-2 sm:gap-3 text-right">
                      <div className="hidden sm:block">
                        <p className="text-green-400 text-xs">{entry.correctCount}/{entry.totalQuestions}</p>
                        <p className="text-slate-500 text-[10px]">正確</p>
                      </div>
                      <div className="hidden sm:block">
                        <p className="text-cyan-400 text-xs">{entry.averageTime.toFixed(1)}s</p>
                        <p className="text-slate-500 text-[10px]">平均</p>
                      </div>
                      <div className="min-w-[40px] sm:min-w-[50px]">
                        <p className="text-yellow-400 font-bold text-sm sm:text-base">{entry.score}</p>
                        <p className="text-slate-500 text-[9px] sm:text-[10px]">得分</p>
                      </div>
                    </div>
                  </div>

                  {/* 手機版：額外統計行 */}
                  <div className="flex sm:hidden items-center gap-3 mt-1.5 pl-10">
                    <span className="text-green-400/80 text-[10px]">正確 {entry.correctCount}/{entry.totalQuestions}</span>
                    <span className="text-slate-600">|</span>
                    <span className="text-cyan-400/80 text-[10px]">平均 {entry.averageTime.toFixed(1)}s</span>
                  </div>
                </motion.div>
              ))
            )}
          </div>

          {/* 計分說明 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-4 sm:mt-6 glass-panel rounded-lg sm:rounded-xl p-3 sm:p-4 border-slate-600/50"
          >
            <h3 className="text-white font-bold text-xs sm:text-sm mb-1.5 sm:mb-2">計分規則</h3>
            <ul className="text-slate-400 text-[10px] sm:text-xs space-y-0.5 sm:space-y-1">
              <li>• 每答對一題：基礎 10 分</li>
              <li>• 時間獎勵：答題越快，額外加分越多（每快6秒加1分）</li>
              <li>• 答錯或超時：不得分</li>
              <li>• 排名依據：總分高者優先，同分則平均答題時間短者優先</li>
            </ul>
          </motion.div>

          {/* 返回按鈕 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-4 sm:mt-5"
          >
            <Button
              onClick={resetGame}
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold py-4 sm:py-5 rounded-lg sm:rounded-xl shadow-lg shadow-blue-500/20 transition-all duration-200 active:scale-[0.97] text-sm sm:text-base"
            >
              重新挑戰
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardScene;
