import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useGame } from '@/contexts/GameContext';
import { soundManager } from '@/lib/sounds';
import Header from './Header';

// 零件圖片
const BLADE_IMG = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663579132777/FbXy3vn6WfkCXwCrMUv9po/blade-attack-ring-8vikC2g2MDTm8dU78uDdod.webp';
const ARMOR_IMG = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663579132777/FbXy3vn6WfkCXwCrMUv9po/armor-wheel-FhbxGsdtVwmYK4Mmrh6RRm.webp';
const DRIVER_IMG = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663579132777/FbXy3vn6WfkCXwCrMUv9po/driver-bottom-WGveM9DtNSdoB7kytBFif9.webp';
const GUARDIAN_IMG = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663579132777/FbXy3vn6WfkCXwCrMUv9po/beyblade-guardian-new-2divrVh2tQ6XvR4F6zQEX3.webp';

const AssemblyScene: React.FC = () => {
  const { startBattle } = useGame();
  const [assemblyPhase, setAssemblyPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => { setAssemblyPhase(1); soundManager.playAssemble(); }, 800),
      setTimeout(() => { setAssemblyPhase(2); soundManager.playAssemble(); }, 2200),
      setTimeout(() => { setAssemblyPhase(3); soundManager.playAssemble(); }, 3600),
      setTimeout(() => { setAssemblyPhase(4); soundManager.playVictory(); }, 5200),
    ];

    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  const parts = [
    {
      name: '攻擊環 (Blade)',
      description: '防空避難觀念的力量',
      gradient: 'from-blue-500 to-cyan-400',
      img: BLADE_IMG,
    },
    {
      name: '鋼鐵輪盤 (Armor)',
      description: '避難處所查詢的智慧',
      gradient: 'from-violet-500 to-purple-400',
      img: ARMOR_IMG,
    },
    {
      name: '軸底 (Driver)',
      description: '緊急避難包的穩固',
      gradient: 'from-amber-500 to-orange-400',
      img: DRIVER_IMG,
    },
  ];

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      <Header />

      {/* 背景 */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-[#0a1628] to-slate-900" />
      <div className="absolute inset-0 particle-bg pointer-events-none" />

      {/* 中心光暈 */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 sm:w-96 h-64 sm:h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* 主要內容 */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-3 sm:px-4 pt-16 sm:pt-24 pb-6 sm:pb-12">
        {/* 標題 */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-5 sm:mb-10"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white mb-1 sm:mb-3"
            style={{ textShadow: '0 2px 20px rgba(59, 130, 246, 0.3)' }}
          >
            陀螺組裝階段
          </h2>
          <p className="text-blue-300/80 text-xs sm:text-base">
            你已集齊所有零件，開始組裝防空避難守護者！
          </p>
        </motion.div>

        {/* 零件展示 - 手機版水平排列 */}
        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 gap-2 sm:gap-5 w-full max-w-4xl mb-5 sm:mb-10">
          {parts.map((part, index) => (
            <AnimatePresence key={part.name}>
              {assemblyPhase > index && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5, rotateY: 90 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
                  className="relative"
                >
                  <div className="glass-panel rounded-lg sm:rounded-xl p-2 sm:p-5 text-center border-slate-600/50">
                    {/* 零件圖片 */}
                    <div className="w-16 h-16 sm:w-28 sm:h-28 mx-auto mb-2 sm:mb-4 relative">
                      <img
                        src={part.img}
                        alt={part.name}
                        className="w-full h-full object-contain drop-shadow-lg"
                      />
                    </div>

                    {/* 名稱 */}
                    <h3 className="text-[10px] sm:text-lg font-bold text-white mb-0 sm:mb-1 leading-tight">{part.name}</h3>
                    <p className="text-slate-400 text-[9px] sm:text-xs hidden sm:block">{part.description}</p>

                    {/* 完成標記 */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.3 }}
                      className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-5 h-5 sm:w-7 sm:h-7 rounded-full bg-green-500 flex items-center justify-center shadow-lg shadow-green-500/30"
                    >
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" className="sm:w-[12px] sm:h-[12px]">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          ))}
        </div>

        {/* 組裝動畫 - 零件合體 */}
        <AnimatePresence>
          {assemblyPhase >= 3 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.3 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
              className="mb-4 sm:mb-8"
            >
              <div className="relative">
                {/* 光暈 */}
                <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-3xl scale-150 animate-pulse" />
                {/* 組裝完成的陀螺 */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                  className="relative"
                >
                  <img
                    src={GUARDIAN_IMG}
                    alt="防空避難守護者"
                    className="w-32 h-32 sm:w-48 sm:h-48 md:w-56 md:h-56 object-contain drop-shadow-2xl"
                  />
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 完成訊息和按鈕 */}
        <AnimatePresence>
          {assemblyPhase >= 4 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center w-full max-w-md px-2"
            >
              <div className="glass-panel rounded-lg sm:rounded-xl p-4 sm:p-6 mb-4 sm:mb-6 neon-border-gold">
                <h3 className="text-base sm:text-xl font-bold text-yellow-300 mb-1 sm:mb-2 animate-text-glow">
                  防空避難守護者已組裝完成！
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm">
                  準備迎接最終對決，擊敗空襲威脅者！
                </p>
              </div>

              <Button
                onClick={() => { soundManager.playClick(); startBattle(); }}
                className="w-full bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-500 hover:to-orange-400 text-white font-bold text-sm sm:text-lg py-4 sm:py-6 rounded-lg sm:rounded-xl shadow-lg shadow-red-500/30 hover:shadow-red-500/50 transition-all duration-200 active:scale-[0.97]"
              >
                <span className="flex items-center justify-center gap-2">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                  </svg>
                  進入最終對決
                </span>
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AssemblyScene;
