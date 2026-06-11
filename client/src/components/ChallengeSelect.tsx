import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useGame } from '@/contexts/GameContext';
import { soundManager } from '@/lib/sounds';
import Header from './Header';

// 陀螺零件圖片
const BLADE_IMG = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663579132777/FbXy3vn6WfkCXwCrMUv9po/blade-attack-ring-8vikC2g2MDTm8dU78uDdod.webp';
const ARMOR_IMG = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663579132777/FbXy3vn6WfkCXwCrMUv9po/armor-wheel-FhbxGsdtVwmYK4Mmrh6RRm.webp';
const DRIVER_IMG = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663579132777/FbXy3vn6WfkCXwCrMUv9po/driver-bottom-WGveM9DtNSdoB7kytBFif9.webp';

const ChallengeSelect: React.FC = () => {
  const { gameState, selectChallenge } = useGame();

  const challenges = [
    {
      id: 'concept',
      title: '防空避難觀念',
      subtitle: '攻擊環 (Blade)',
      description: '學習防空警報識別、避難原則與安全地點選擇',
      reward: '攻擊環',
      rewardImg: BLADE_IMG,
      gradient: 'from-blue-600 via-blue-500 to-cyan-500',
      glowColor: 'rgba(59, 130, 246, 0.4)',
      borderColor: 'border-blue-400/60',
      bgAccent: 'bg-blue-500/10',
    },
    {
      id: 'app',
      title: '防空避難處所查詢',
      subtitle: '鋼鐵輪盤 (Armor)',
      description: '掌握警政服務APP查詢避難處所的方式',
      reward: '鋼鐵輪盤',
      rewardImg: ARMOR_IMG,
      gradient: 'from-violet-600 via-purple-500 to-fuchsia-500',
      glowColor: 'rgba(139, 92, 246, 0.4)',
      borderColor: 'border-purple-400/60',
      bgAccent: 'bg-purple-500/10',
    },
    {
      id: 'package',
      title: '緊急避難包宣導',
      subtitle: '軸底 (Driver)',
      description: '了解緊急避難包的必備物品與準備原則',
      reward: '軸底',
      rewardImg: DRIVER_IMG,
      gradient: 'from-amber-500 via-orange-500 to-red-500',
      glowColor: 'rgba(245, 158, 11, 0.4)',
      borderColor: 'border-amber-400/60',
      bgAccent: 'bg-amber-500/10',
    },
  ];

  const completedCount = gameState.completedChallenges.size;

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      <Header />

      {/* 背景 */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-[#0a1628] to-slate-900" />
      <div className="absolute inset-0 particle-bg pointer-events-none" />

      {/* 雷達掃描裝飾 - 只在桌面顯示 */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-5 pointer-events-none hidden md:block">
        <div className="absolute inset-0 rounded-full border border-blue-400" />
        <div className="absolute inset-8 rounded-full border border-blue-400" />
        <div className="absolute inset-16 rounded-full border border-blue-400" />
        <div className="w-full h-full animate-radar">
          <div className="absolute top-1/2 left-1/2 w-1/2 h-0.5 bg-gradient-to-r from-blue-400 to-transparent origin-left" />
        </div>
      </div>

      {/* 主要內容：加入 pt-[110px] 避開標題被蓋住，pb-[120px] 避開 Chrome/Safari 底部工具列 */}
      <div 
        className="relative z-10 w-full h-[100dvh] flex flex-col items-center px-3 sm:px-4 pt-[110px] pb-[120px] overflow-y-auto overflow-x-hidden"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        {/* 修正語法錯誤：補回 <motion.div> 標籤 */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-4 sm:mb-8"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white mb-1 sm:mb-3"
            style={{ textShadow: '0 2px 20px rgba(59, 130, 246, 0.3)' }}
          >
            選擇挑戰主題
          </h2>
          <p className="text-blue-300/80 text-sm sm:text-base md:text-lg max-w-lg mx-auto">
            完成所有三個主題，獲得陀螺零件並組裝你的防空避難守護者
          </p>
        </motion.div>

        {/* 進度指示 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center gap-2 sm:gap-3 mb-5 sm:mb-10"
        >
          {[0, 1, 2].map((index) => (
            <React.Fragment key={index}>
              <div
                className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm transition-all duration-500 ${
                  index < completedCount
                    ? 'bg-green-500 text-white shadow-lg shadow-green-500/30 scale-110'
                    : 'bg-slate-700/80 text-slate-400 border border-slate-600'
                }`}
              >
                {index < completedCount ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : (
                  index + 1
                )}
              </div>
              {index < 2 && (
                <div className={`w-6 sm:w-8 h-0.5 transition-all duration-500 ${
                  index < completedCount - 1 ? 'bg-green-400' : 'bg-slate-700'
                }`} />
              )}
            </React.Fragment>
          ))}
        </motion.div>

        {/* 挑戰卡片 - 手機上使用垂直堆疊 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-5 md:gap-6 w-full max-w-5xl mt-2">
          {challenges.map((challenge, index) => {
            const isCompleted = gameState.completedChallenges.has(challenge.id as any);

            return (
              <motion.div
                key={challenge.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="relative group"
              >
                {/* 光暈背景 */}
                {!isCompleted && (
                  <div
                    className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
                    style={{ background: challenge.glowColor }}
                  />
                )}

                <div
                  className={`relative glass-panel rounded-xl sm:rounded-2xl p-4 sm:p-6 h-full flex flex-col transition-all duration-300 ${
                    isCompleted
                      ? 'opacity-60 border-green-500/40'
                      : `${challenge.borderColor} group-hover:scale-[1.02]`
                  }`}
                >
                  {/* 完成標記 */}
                  {isCompleted && (
                    <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-green-500 text-white rounded-full w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center shadow-lg shadow-green-500/30">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                  )}

                  {/* 手機版：水平佈局（圖片+文字並排） */}
                  <div className="flex sm:hidden items-center gap-3">
                    {/* 零件圖片 - 修復圖片跑版，固定為 w-20 h-20 shrink-0 */}
                    <div className={`relative w-20 h-20 shrink-0 flex items-center justify-center rounded-lg overflow-hidden ${challenge.bgAccent}`}>
                      <img
                        src={challenge.rewardImg}
                        alt={challenge.reward}
                        className="w-full h-full object-contain p-1.5 drop-shadow-lg"
                      />
                      {isCompleted && (
                        <div className="absolute inset-0 bg-green-500/10 flex items-center justify-center">
                          <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-xl">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* 文字內容 - 手機版 */}
                    <div className="flex-1 min-w-0">
                      <div className={`inline-block px-2 py-0.5 rounded-full bg-gradient-to-r ${challenge.gradient} bg-opacity-20 border border-white/10 mb-1`}>
                        <span className="text-[10px] font-bold text-white/90 tracking-wider">{challenge.subtitle}</span>
                      </div>
                      <h3 className="text-base font-bold text-white mb-0.5 truncate">
                        {challenge.title}
                      </h3>
                      <p className="text-slate-300/80 text-xs leading-snug line-clamp-2">
                        {challenge.description}
                      </p>
                    </div>
                  </div>

                  {/* 手機版按鈕 */}
                  <div className="sm:hidden mt-3">
                    <Button
                      onClick={() => { soundManager.playClick(); selectChallenge(challenge.id as any); }}
                      disabled={isCompleted}
                      className={`w-full font-bold py-3 rounded-lg text-sm transition-all duration-200 active:scale-[0.97] ${
                        isCompleted
                          ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                          : `bg-gradient-to-r ${challenge.gradient} text-white shadow-md hover:shadow-lg`
                      }`}
                    >
                      {isCompleted ? '✓ 已獲得零件' : '開始挑戰'}
                    </Button>
                  </div>

                  {/* 桌面版：垂直佈局 */}
                  <div className="hidden sm:flex sm:flex-col sm:flex-1">
                    {/* 零件圖片 - 桌面版較大 */}
                    <div className={`relative w-full aspect-square max-w-[180px] mx-auto mb-4 rounded-xl overflow-hidden ${challenge.bgAccent}`}>
                      <img
                        src={challenge.rewardImg}
                        alt={challenge.reward}
                        className="w-full h-full object-contain p-2 drop-shadow-lg"
                      />
                      {!isCompleted && (
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
                      )}
                      {isCompleted && (
                        <div className="absolute inset-0 bg-green-500/10 flex items-center justify-center">
                          <div className="bg-green-500 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-xl">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* 零件名稱標籤 */}
                    <div className={`text-center mb-3 px-3 py-1 rounded-full bg-gradient-to-r ${challenge.gradient} bg-opacity-20 border border-white/10 inline-block mx-auto`}>
                      <span className="text-xs font-bold text-white/90 tracking-wider">{challenge.subtitle}</span>
                    </div>

                    {/* 標題 */}
                    <h3 className="text-xl font-bold text-white mb-2 text-center">
                      {challenge.title}
                    </h3>

                    {/* 描述 */}
                    <p className="text-slate-300/80 text-sm mb-5 flex-grow leading-relaxed text-center">
                      {challenge.description}
                    </p>

                    {/* 獎勵 */}
                    <div className="bg-slate-800/60 rounded-lg p-3 mb-5 border border-slate-700/50">
                      <div className="flex items-center justify-center gap-2">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-yellow-400">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                        <span className="text-sm text-slate-400">完成獎勵：</span>
                        <span className="text-sm font-bold text-yellow-400">{challenge.reward}</span>
                      </div>
                    </div>

                    {/* 按鈕 */}
                    <Button
                      onClick={() => { soundManager.playClick(); selectChallenge(challenge.id as any); }}
                      disabled={isCompleted}
                      className={`w-full font-bold py-5 rounded-lg transition-all duration-200 active:scale-[0.97] ${
                        isCompleted
                          ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                          : `bg-gradient-to-r ${challenge.gradient} text-white shadow-md hover:shadow-lg`
                      }`}
                    >
                      {isCompleted ? '✓ 已獲得零件' : '開始挑戰'}
                    </Button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* 完成所有挑戰的提示 */}
        {completedCount === 3 && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="mt-6 sm:mt-10 w-full max-w-2xl"
          >
            <div className="glass-panel rounded-xl p-4 sm:p-6 text-center neon-border-gold">
              <div className="text-2xl sm:text-3xl mb-2 sm:mb-3">⚡</div>
              <p className="text-white text-base sm:text-lg font-bold mb-1">
                恭喜 你已收集所有零件！
              </p>
              <p className="text-blue-200/80 text-xs sm:text-sm">
                準備進入陀螺組裝階段...
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ChallengeSelect;